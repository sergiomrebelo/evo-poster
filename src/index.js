import express from 'express'
import dotenv from 'dotenv'

import cors from 'cors'
import * as nlp from '@evoposter/nlp'

const APP = express()
const PORT = process.env.PORT || '8000'

dotenv.config()
APP.use(cors())
APP.use(express.json())
APP.use(express.urlencoded({ extended: true }))
// TODO: change the root src
APP.use(express.static('src/rollup-project'))
APP.use("/browserify", express.static('src/public'))


APP.listen(PORT, async () => {
  await nlp.setup(process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY, process.env.LANGUAGE_TRANSLATOR_URL, process.env.MW_API_KEY)
  console.info(`👂at port ${PORT}`)
})

APP.get('/lines/:delimiter/:lang/:input/', async (req, res) => {
  const delimiter = req.params.delimiter
  const text = req.params.input
  const sentences = text.split(delimiter)
  const lang = req.params.lang
  const results = await analysis(sentences, lang)
  res.status(results[0]).send(JSON.stringify(results[1]))
})

APP.get('/text/:lang/:input', async (req, res) => {
  const text = req.params.input
  const lang = req.params.lang
  const sentences = (await _sentenceTokenizer(text)).flat()
  const results = await analysis(sentences, lang)
  res.status(results[0]).send(JSON.stringify(results[1]))
})

APP.get('*', (req, res) => {
  res.status(404).send(errHandler(404, `Error in invocation of API: /${req.url}`))
})

const errHandler = (code, msg) => {
  return {
    success: false,
    message: `${msg} (code ${code})`
  }
}

const _sentenceTokenizer = async (text) => {
  return nlp.sentenceTokenizer(text)
}

const _lexiconGlobalResults = async (sentences) => {
  // compute global lexicon value
  const emotions = {}
  for (const i in sentences) {
    const current = sentences[i].emotions.data.recognisedEmotions
    for (const e of current) {
      const name = e[0]
      if (Object.keys(emotions).includes(name)) {
        emotions[name] = emotions[name] + e[1]
      } else {
        emotions[name] = e[1]
      }
    }
  }

  const res = Object.entries(emotions).sort(([, a], [, b]) => b - a)

  return res.length === 0 ? [['neutral', 1]] : res
}

const analysis = async (sentences = [], lang) => {
  const text = sentences.flat().join(' ')
  // classification analysis
  const classificationResults = await nlp.classification(text, lang)
  if (!classificationResults.success) return [400, errHandler(400, 'Error in the classification method')]

  // lexicon-based analysis
  const lexiconResults = { global: null, sentences: [] }
  for (const sentence of sentences) {
    const res = await nlp.lexicon(sentence, lang, false)
    lexiconResults.sentences.push(res)
    if (!res.success) return [400, errHandler(400, `Error in the lexicon-based method (msg: ${res.msg})`)]
  }
  // global lexicon-based result
  lexiconResults.global = await _lexiconGlobalResults(lexiconResults.sentences)

  return [200, {
    success: true,
    sentences,
    automatic: true,
    text,
    lang,
    classification: classificationResults,
    lexicon: lexiconResults
  }]
}
