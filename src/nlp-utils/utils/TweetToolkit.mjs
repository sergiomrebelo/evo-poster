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

    getReTweetData = (remove = false) => {
        // remove retweet data
        const rtExp = /RT\s*@[^:]*:/gm;
        const rtMatch = this.text.match(rtExp);
        let rtInfo = rtMatch !== null ? rtMatch : []; // retweet data
        if (remove) this.text = this.text.replace(rtExp, "");
        return rtInfo;
    }

    getURLs = (remove = false) => {
        // remove URLs (hardwired method)
        const urlExp = /(https?:\/\/)(\s)*(www\.)?(\s)*((\w|\s)+\.)*([\w\-\s]+\/)*([\w\-]+)((\?)?[\w\s]*=\s*[\w&]*)*/gm;
        const urlsMatch = this.text.match(urlExp);
        if (remove) this.text = this.text.replace(urlExp, "");
        return urlsMatch !== null ? urlsMatch : [];
    }

    getMentions = (remove = false) => {
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

        return {
            mentions: mentionsNative,
            working: mentions
        }
    }

    getHashtags = (remove = false) => {
        // remove hashtags
        const htgExp = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/gi;
        const htgMatch = this.text.match(htgExp);
        if (remove) this.text = this.text.replace(htgMatch, "");
        return htgMatch !== null ? htgMatch : [];
    }

    getEmojis = (remove = false) => {
        // get emojis
        let emojis = [];
        Emoji.replace(this.text, (e) => {
            emojis.push(e);
            if (remove) return ``;
        }, true);
        return emojis;
    }
}