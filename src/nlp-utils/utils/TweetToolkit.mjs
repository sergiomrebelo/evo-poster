import Emoji from "node-emoji";

export class TweetToolkit {
    constructor(text, rawText, lang = `en`) {
        this.text = text;
        this.rawText = rawText;
        this.lang = lang;
    }

    run = (remove = false) => {
        const res = {
            info : {},
            txt : null
        };
        // remove retweet data
        res.info.rtInfo = this.getReTweetData (remove);
        res.info.urls = this.getURLs(remove);
        res.info.mentions = this.getMentions(remove);
        res.info.hashtags = this.getHashtags(remove);
        res.info.emojis = this.getEmojis(remove);
        // save txt
        res.txt = this.text;
        return res;
    }

    getReTweetData = (remove = false, history = null) => {
        // remove retweet data
        const rtExp = /RT\s*@[^:]*:/gm;
        const rtMatch = this.text.match(rtExp);
        let rtInfo = rtMatch !== null ? rtMatch : []; // retweet data
        if (remove) {
            this.text = this.text.replace(rtExp, "");
            if (history) history.remove(rtInfo);
        }
        return rtInfo;

    }

    getURLs = (remove = false, history = null) => {
        // remove URLs (hardwired method)
        const urlExp = /(https?:\/\/)(\s)*(www\.)?(\s)*((\w|\s)+\.)*([\w\-\s]+\/)*([\w\-]+)((\?)?[\w\s]*=\s*[\w&]*)*/gm;
        const urlsMatch = this.text.match(urlExp);
        const urls =  urlsMatch !== null ? urlsMatch : [];
        if (remove) {
            this.text = this.text.replace(urlExp, "");
            // update history
            if (history) history.remove(urls);
        }
        return urls;
    }

    getMentions = (remove = false, removeSymbol =  false, history = null) => {
        // remove of mentions
        const mentionExp = /\B@[a-z0-9_-]+/gi;
        const mentionMatch = this.text.match(mentionExp);
        const mentions = mentionMatch !== null ? mentionMatch : [];
        let mentionsNative = mentions;
        if (remove) this.text = this.text.replace(mentionExp, "");
        if (this.lang !== 'en') {
            const mentionsNativeMatch = this.rawText.match(mentionExp, '');
            mentionsNative = mentionsNativeMatch !== null ? mentionsNativeMatch : [];
            if (remove) this.rawText = this.rawText.replace(mentionExp, "");
        }

        // remove the symbol from the string but maintain the word
        if (removeSymbol) this.removeFirstSymbol(mentions);
        // update history
        if (history) {
            for (let mention of mentions) {
                history.update(mention, mention.substring(1, mention.length - 1));
            }
        }

        return {
            mentions: mentionsNative,
            working: mentions
        }
    }

    getHashtags = (remove = false, removeSymbol = false, history) => {
        // remove hashtags
        const htgExp = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/gi;
        const htgMatch = this.text.match(htgExp);
        if (remove) this.text = this.text.replace(htgMatch, "");
        const hashtags = htgMatch !== null ? htgMatch : [];

        // save hashtags in native language (if not english)
        let hashtagsNative = htgMatch;
        if (this.lang !== 'en') {
            const htgNativeMatch = this.rawText.match(htgExp);
            hashtagsNative = htgNativeMatch !== null ? htgNativeMatch : [];
        }

        if (removeSymbol) this.removeFirstSymbol(hashtags);

        if (history) {
            for (let hash of hashtags) {
                history.update(hash, hash.substring(1, hash.length));
            }
        }

        return {
            hashtags : hashtagsNative,
            working : hashtags
        }
    }

    getEmojis = async (replace = true, remove = false, history = null) => {
        // get emojis
        let emojis = [];

        this.text = Emoji.replace(this.text, (emoji) => {
            emojis.push(emoji);
            if (replace) {
                let value = ` ${emoji.key.replace(/(_)|(-)/g, " ")} `;
                // update history
                if (history !== null) history.update(emoji.emoji, value);
                return value;
            }  else if (remove) {
                // update history
                if (history !== null) history.remove(emoji.emoji);
                return ``;
            }
            }, true);

        return emojis;
    }

    getText = () => {
        return this.text;
    }

    removeFirstSymbol = (words) => {
        // remove the symbol from the string but maintain the word, e.g. @ or #
        for (let mention of words) {
            // remove the symbol from the string but maintain the word
            this.text = this.text.replace(mention, `${mention.substring(1, mention.length)}`);
        }
    }
}