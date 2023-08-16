/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window,e$6=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$4=Symbol(),n$4=new WeakMap;let o$5 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$4.set(s,t));}return t}toString(){return this.cssText}};const r$3=t=>new o$5("string"==typeof t?t:t+"",void 0,s$4),S$2=(s,n)=>{e$6?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$2=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$3;const e$5=window,r$2=e$5.trustedTypes,h$2=r$2?r$2.emptyScript:"",o$4=e$5.reactiveElementPolyfillSupport,n$3={toAttribute(t,i){switch(i){case Boolean:t=t?h$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$2=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:n$3,reflect:!1,hasChanged:a$2},d$2="finalized";let u$2 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty(d$2))return !1;this[d$2]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$2(i));}else void 0!==i&&s.push(c$2(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$3){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$3).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$3;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$2[d$2]=!0,u$2.elementProperties=new Map,u$2.elementStyles=[],u$2.shadowRootOptions={mode:"open"},null==o$4||o$4({ReactiveElement:u$2}),(null!==(s$3=e$5.reactiveElementVersions)&&void 0!==s$3?s$3:e$5.reactiveElementVersions=[]).push("1.6.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$2=window,s$2=i$2.trustedTypes,e$4=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$3="$lit$",n$2=`lit$${(Math.random()+"").slice(9)}$`,l$2="?"+n$2,h$1=`<${l$2}>`,r$1=document,d$1=()=>r$1.createComment(""),u$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$1=Array.isArray,v$1=t=>c$1(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$1="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_$1=/-->/g,m$1=/>/g,p$1=RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g$1=/'/g,$$1=/"/g,y$1=/^(?:script|style|textarea|title)$/i,w$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x$1=w$1(1),T$1=Symbol.for("lit-noChange"),A$1=Symbol.for("lit-nothing"),E$1=new WeakMap,C$1=r$1.createTreeWalker(r$1,129,null,!1),P$1=(t,i)=>{const s=t.length-1,l=[];let r,d=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let e,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$1?"!--"===c[1]?u=_$1:void 0!==c[1]?u=m$1:void 0!==c[2]?(y$1.test(c[2])&&(r=RegExp("</"+c[2],"g")),u=p$1):void 0!==c[3]&&(u=p$1):u===p$1?">"===c[0]?(u=null!=r?r:f$1,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,e=c[1],u=void 0===c[3]?p$1:'"'===c[3]?$$1:g$1):u===$$1||u===g$1?u=p$1:u===_$1||u===m$1?u=f$1:(u=p$1,r=void 0);const w=u===p$1&&t[i+1].startsWith("/>")?" ":"";d+=u===f$1?s+h$1:v>=0?(l.push(e),s.slice(0,v)+o$3+s.slice(v)+n$2+w):s+n$2+(-2===v?(l.push(void 0),i):w);}const c=d+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$4?e$4.createHTML(c):c,l]};let V$1 = class V{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,u=0;const c=t.length-1,v=this.parts,[a,f]=P$1(t,i);if(this.el=V.createElement(a,e),C$1.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C$1.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$3)||i.startsWith(n$2)){const s=f[u++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$3).split(n$2),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?k$1:"?"===i[1]?I$1:"@"===i[1]?L$1:R$1});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y$1.test(h.tagName)){const t=h.textContent.split(n$2),i=t.length-1;if(i>0){h.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],d$1()),C$1.nextNode(),v.push({type:2,index:++r});h.append(t[i],d$1());}}}else if(8===h.nodeType)if(h.data===l$2)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$2,t+1));)v.push({type:7,index:r}),t+=n$2.length-1;}r++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}};function N$1(t,i,s=t,e){var o,n,l,h;if(i===T$1)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const d=u$1(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==d&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===d?r=void 0:(r=new d(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=N$1(t,r._$AS(t,i.values),r,e)),i}let S$1 = class S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$1).importNode(s,!0);C$1.currentNode=o;let n=C$1.nextNode(),l=0,h=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new M$1(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new z$1(n,this,t)),this._$AV.push(i),d=e[++h];}l!==(null==d?void 0:d.index)&&(n=C$1.nextNode(),l++);}return C$1.currentNode=r$1,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}};let M$1 = class M{constructor(t,i,s,e){var o;this.type=2,this._$AH=A$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N$1(this,t,i),u$1(t)?t===A$1||null==t||""===t?(this._$AH!==A$1&&this._$AR(),this._$AH=A$1):t!==this._$AH&&t!==T$1&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v$1(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A$1&&u$1(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$1.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=V$1.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new S$1(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E$1.get(t.strings);return void 0===i&&E$1.set(t.strings,i=new V$1(t)),i}T(t){c$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new M(this.k(d$1()),this.k(d$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}};let R$1 = class R{constructor(t,i,s,e,o){this.type=1,this._$AH=A$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A$1;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=N$1(this,t,i,0),n=!u$1(t)||t!==this._$AH&&t!==T$1,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=N$1(this,e[s+l],i,l),h===T$1&&(h=this._$AH[l]),n||(n=!u$1(h)||h!==this._$AH[l]),h===A$1?t=A$1:t!==A$1&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}};let k$1 = class k extends R$1{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A$1?void 0:t;}};const H$1=s$2?s$2.emptyScript:"";let I$1 = class I extends R$1{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A$1?this.element.setAttribute(this.name,H$1):this.element.removeAttribute(this.name);}};let L$1 = class L extends R$1{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=N$1(this,t,i,0))&&void 0!==s?s:A$1)===T$1)return;const e=this._$AH,o=t===A$1&&e!==A$1||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A$1&&(e===A$1||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}};let z$1 = class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){N$1(this,t);}};const j$1=i$2.litHtmlPolyfillSupport;null==j$1||j$1(V$1,M$1),(null!==(t$2=i$2.litHtmlVersions)&&void 0!==t$2?t$2:i$2.litHtmlVersions=[]).push("2.7.4");const B$1=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new M$1(i.insertBefore(d$1(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o$2;let s$1 = class s extends u$2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B$1(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T$1}};s$1.finalized=!0,s$1._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:s$1});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s$1});(null!==(o$2=globalThis.litElementVersions)&&void 0!==o$2?o$2:globalThis.litElementVersions=[]).push("3.3.2");

const TYPEFACES$2 = {
    Amstelvar: {
        leading: 1.05,
        tags: [`serif`],
        axes: [`wght`, `wdth`, `opsz`],
        url: `https://github.com/googlefonts/amstelvar`,
        category: `serif`,
        path: `./assets/Amstelvar-Roman[wdth,wght,opsz].ttf`,
        format: `truetype-variations`,
        weight: {
            min: 100,
            max: 900
        },
        stretch: {
            min: 50,
            max: 125,
        }
    },
    Anybody: {
        leading: 1.05,
        tags: [`sans-serif`, `90s`, `europe`],
        axes: [`wght`, `wdth`],
        url: `https://github.com/Etcetera-Type-Co/Anybody`,
        category: `sans-serif`,
    },
    Barlow: {
        leading: 1.05,
        tags: [`sans-serif`, `gothic`, `monoline`, `neo-grotesque`],
        axes: [`wght`, `wdth`],
        url: `https://tribby.com/fonts/barlow/`,
        category: `sans-serif`,
    },
    Cabin: {
        leading: 1.05,
        tags: [`sans-serif`, `gothic`, `soft-corners`],
        axes: [`wght`],
        url: `https://fonts.google.com/specimen/Cabin`,
        category: `sans-serif`,
    },
    Emberly: {
        leading: 1.05,
        tags: [`serif`, `didone`],
        axes: [`wght`, `wdth`],
        url: `https://www.behance.net/gallery/87667103/Emberly-Free-Typeface-54-Styles`,
        category: `serif`,
    },
    Epilogue: {
        leading: 1.05,
        tags: [`sans-serif`],
        axes: [`wght`, `wdth`],
        url: `https://etceteratype.co/epilogue`,
        category: `sans-serif`,
    },
    IBMPlexSans: {
        leading: 1.05,
        tags: [`sans-serif`],
        axes: [`wght`, `wdth`],
        url: `https://fonts.google.com/specimen/IBM+Plex+Sans`,
        category: `sans-serif`,
    },
    Inconsolata: {
        leading: 1.05,
        tags: [`sans-serif`, `mono`],
        axes: [`wght`, `wdth`],
        url: `https://fonts.google.com/specimen/Inconsolata`,
        category: `nonospace`,

    }
};
const COLOR = {
    MIN_CONTRAST: 2.5,
    MAX_COLOR_SCHEME_ATTEMPT: 200,

    BACKGROUND: {
        AVAILABLE_STYLES: [ ["Random", 2], [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]],
        DEFAULT_COLORS: [`#ffffff`, `#000000`]
    }
};
const EVALUATION = {
    GLOBAL_WEIGHTS: {
        SEMANTICS: 0.5,
        AESTHETICS: 0.5
    },
    MODES: {
        SEMANTICS_VISUALS: `FIXED`
    },
    SEMANTICS_WEIGHTS: {
        EMPHASIS: 0.5,
        LAYOUT: 0.5,
        VISUALS: 0
    },
    AESTHETICS_WEIGHTS: {
        ALIGNMENT: 0.1,
        REGULARITY: 0.1,
        JUSTIFICATION: 0.3,
        TYPEFACE_PARING: 0.1,
        WHITE_BALANCE_FRACTION: 0.2,
        BALANCE: 0.2
    }
};
const EVO = {
    POP_SIZE: 30,
    NO_GEN: 400,
    CROSSOVER_PROB: 0.9,
    MUTATION_PROB: 0.1,
    ELITE_SIZE: 1,
    SIZE_MUTATION_ADJUST: 5,
    TOURNAMENT_SIZE: 10
};
const IBM_AVAILABLE_LANGUAGES = [
    'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
    'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
    'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
    'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
    'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
];
const SIZE$2 = {
    HEIGHT: 282,
    WIDTH: 200,
    MARGINS: [.05, .05, .05, .05],
};
const TYPOGRAPHY$3 = {
    DEFAULT_COLOR: `#000000`,
    RANGE: 0.05,
    SIZE: {
        MAX: 0.95,
        MIN: 0.05
    },
    TEXT_ALIGNMENT: {
        GLOBAL: [[`Random`],[`Top`],[`Middle`],["Bottom"]],
        TEXTBOXES: [[`Random`],[`LEFT`],[`CENTER`],[`RIGHT`]]
    }
};


// check if size is used

var evoPoster_config = {
    typography: TYPOGRAPHY$3 !== undefined ? TYPOGRAPHY$3 : {},
    typefaces: TYPEFACES$2 !== undefined ? TYPEFACES$2 : {},
    color: COLOR !== undefined ? COLOR : {},
    size: SIZE$2 !== undefined ? SIZE$2 : {},
    evaluation: EVALUATION !== undefined ? EVALUATION : {},
    display: {
        GRID: true,
        MARGIN_Y: 10,
        VISIBLE_POSTERS: 30,
        AVAILABLE_LANGUAGES: IBM_AVAILABLE_LANGUAGES !== undefined ? IBM_AVAILABLE_LANGUAGES : [`en`],
        MAX_IMAGE_SIZE: 1024
    },
    evo: EVO !== undefined ? EVO : {},
    log: {
        SAVE_LOG: true,
        SAVE_IMAGES: `NO` // `GENERATION`, `END`, `BEST-GENERATION`, `NO`
    }
};

class Divider extends s$1 {
    static get = () => {
        return new Divider();
    }

    constructor() {
        super();
    }

    render(){
        return x$1`<div class="my-3"></div>`;
    }
    createRenderRoot() {
        return this;
    }
}

customElements.define('section-divider', Divider);

const AVAILABLE_LANGUAGES = evoPoster_config["display"] !== undefined ? evoPoster_config["display"]["AVAILABLE_LANGUAGES"] : [`en`];
const MAX_IMAGE_SIZE = evoPoster_config["display"] !== undefined ? evoPoster_config["display"]["MAX_IMAGE_SIZE"] : 1024;


class InputForm extends s$1 {
    static properties = {
        images: {}
    }
    constructor(onSubmit, container, errHandler) {
        super();
        this.images = {
            "imageRandomPlacement": true,
            "hasImages": false,
            "blobs": [],
            "amount": 0,
            "loading": false,
            "randomPlacement": false
        };
        this.disable = false;
        this._resultsContainer = container;
        this._errHandlerRef = errHandler;
        this._onSubmit = async (e) => {
            e.preventDefault();
            await onSubmit();
        };
    }

    _toggleVisibility = (e) => {
        const related = e.target.dataset.related;
        // this.renderRoot
        const el = document.getElementById(related);
        if (e.target.checked && el !== null) {
            el.classList.add('d-none');
        } else {
            el.classList.remove('d-none');
        }
    }

    dis = () => {
        this.disable = true;
        document.querySelector(`fieldset`).disabled = this.disable;
    }

    data = () => {
        return {
            "textContent": encodeURIComponent(document.getElementById('formControlTextarea').value),
            "shouldDivide": document.getElementById('lineDivisionCheck').checked,
            "lang": encodeURIComponent(document.getElementById('formControlLang').value),
            "delimiter": encodeURIComponent(document.getElementById('formControlTextDelimiter').value),
            "images": this.images
        }
    }

    _uploadImages = async (e) => {
        this.images.blobs = [];
        this.images.hasImages = true;
        this.images.loading = true;
        this.images.amount = e.target.files.length;

        this.images.blobs = await this._readImages(e.target.files).catch((err) => {
            this._errHandlerRef.set({message: `not possible to load the image ${err}`});
        });


        this.images.loading = false;

        this._resultsContainer.displayImages(this.images.blobs);
    }

    _readImages = async (files) => {
        const res = [];
        let err = [];
        const getBase64 = (file) => {
            const reader = new FileReader();
            return new Promise(resolve => {
                reader.onload = (ev) => {
                    resolve(ev.target.result);
                };
                reader.readAsDataURL(file);
            });
        };

        for (let i = 0; i < files.length; i++) {
            if (files[i].size/1024 < MAX_IMAGE_SIZE) {
                if (files[i].type.includes('image')) {
                    res.push(getBase64(files[i]));
                } else {
                    err.push(`error loading the following image(s): ${files[i].name}.`);
                }
            } else {
                err.push(`${files[i].name} size bigger than ${MAX_IMAGE_SIZE} kb. (size: ${files[i].size})`);
            }
        }

        if (err.length > 0) {
            let msg = "";
            for (let i=0; i<err.length; i++) {
                msg += err[i];
                if (i !== err.length-1) {
                    msg += "<br>";
                }
            }
            this._errHandlerRef.set({message: msg});
        }
        return await Promise.all(res);
    }

    render() {
        return x$1`
            <div class="container-fluid" id="input-form-section">
                <section class="input-form-outer row mt-3">
                    <form id="input-form" class="input-form-inner" @submit=${this._onSubmit}>
                        <fieldset class="col-10">
                            <div class="form-group mb-2">
                                <label for="formControlTextarea" class="col-sm-6 col-form-label-sm">Input Text</label>
                                <textarea id="formControlTextarea" class="form-control col-sm-10" required rows=6></textarea>
                            </div>
                            <div class="form-group mb-2 col-sm-3">
                                <label for="formControlLang" class="col-sm-6 col-form-label-sm">Language</label>
                                <select class="form-control custom-select mr-sm-2" id="formControlLang" type="text">
                                    ${AVAILABLE_LANGUAGES.map((lang) => {
                                        let opt = x$1`
                                            <option value=${lang}>${lang}</option>`;
                                        if (lang === 'en') {
                                            opt = x$1`
                                                <option selected=true value=${lang}>${lang}</option>`;
                                        }
                                        return opt;
                                    })
                                    }
                                </select>
                            </div>
                            ${Divider.get()}
                            <div class="form-check form-check-inline mb-2" id="lineDivisionField">
                                <label for="lineDivisionCheck" class="col-form-label-sm">
                                    Automatic line division
                                </label>
                                <input
                                        type="checkbox" @change="${this._toggleVisibility}"
                                        class="form-check-input" value="1" id="lineDivisionCheck"
                                        data-related="textDelimiterField" checked>
                            </div>
                            <div class="form-group mb-2 d-none col-sm-3" id="textDelimiterField">
                                <label for="formControlTextDelimiter" class="col-form-label-sm">Text Line delimiter</label>
                                <input type="text" value="¶" class="form-control" id="formControlTextDelimiter">
                            </div>
                            ${Divider.get()}
                            <div class="form-group mb-2 col-sm-6">
                                <label for="formControlImages" class="col-form-label-sm">Images</label><br/>
                                <input type="file" class="form-control-file col-form-label-sm" id="formControlImages"
                                       @change="${this._uploadImages}"
                                       checked="files[]" accept="image/jpeg, image/png, image/jpg" multiple>
                            </div>
                            ${Divider.get()}
                            <div class="form-check form-check-inline mb-2 disabled disabled-inputs" id="imagePlacementField">
                                <label for="form-check-label" class="col-form-label-sm" id="imagePlacementCheck">Image Random Placement</label>
                                <input type="checkbox" value="1" @change="${this._toggleVisibility}"
                                       class="form-check-input disabled readonly" id="imagePlacementCheck" data-related="imageAnchorField" checked readonly>
                            </div>
                            <div class="form-group mb-2 d-none col-sm-3" id="imageAnchorField">
                                <label for="formControlImagePlaceholderDelimiter" class="col-form-label-sm" checked=${false}>Image
                                    Placement Anchor</label>
                                <input type="text" value=${null} class="form-control"
                                       id="formControlImagePlaceholderDelimiter" value="∑">
                            </div>
                            ${Divider.get()}
                            <div class="col-auto">
                                <button type="submit" class="btn btn-primary mb-2">Submit</button>
                            </div>
                        </fieldset>
                    </form>
                </section>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('input-form', InputForm);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$3=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let e$2 = class e extends i$1{constructor(i){if(super(i),this.et=A$1,i.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A$1||null==r)return this.ft=void 0,this.et=r;if(r===T$1)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.et)return this.ft;this.et=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}};e$2.directiveName="unsafeHTML",e$2.resultType=1;const o$1=e$3(e$2);

class ResultsContainer extends s$1 {
    static properties = {
        _available: false,
        _data: {},
        _images: [],
        _imagesAvailable: false };

    constructor() {
        super();

        this._available = false;
        this._data = {
            text: `inside`,
            lang: `en`
        };

        this._images =  [];
        this._imagesAvailable = false;
    }

    _pTitle = (titleContent, textContent="", id) => {
        return x$1`<div class="my-4">
            <h3 class="d-inline">${titleContent}</h3>
            <p class="d-inline" id=${id}>${textContent}</p>
        </div>`;
    }

    set = (res) => {
        this._available = true;
        let lexiconLines = `<span>`;
        for (let i in res.lexicon.sentences) {
            const sentence = res.lexicon.sentences[i];
            lexiconLines += `[${i}] ${sentence.text} (${sentence.emotions.data.predominant.emotion}, ${sentence.emotions.data.predominant.weight}) <br>`;
        }
        lexiconLines +=`</span>`;

        this._data = {
            text: res.text,
            lang: res.lang,
            sentences: res.sentences,
            classification: {
                predominant: res.classification.emotions.data.predominant.emotion,
                score: res.classification.emotions.data.predominant.weight
            },
            lexicon: {
                lines: lexiconLines,
                global: `<b>global lexicon</b>: ${res.lexicon.global[0][0]} (${res.lexicon.global[0][1]})`
            }
        };
    }

    displayImages = (files) => {
        this._imagesAvailable = files.length > 0;
        this._images = [];
        for (let i = 0; i<files.length; i++) {
            const img = x$1`<img src="${files[i]}" class="d-inline-block mr-2" height="100px" width="auto"/>`;
            this._images.push(img);
        }
    }

    render() {
        let imagesContainer = x$1``;
        if (this._imagesAvailable) {
            imagesContainer =
                x$1`<div>
                    ${Divider.get()}
                    ${Divider.get()}
                    <h3 id="input-images-headline">Input Images</h3>
                    <div id="input-images">${this._images}</div>
                </div>`;
        }

        return this._available
        ? x$1`
            <div class="temp-results container-fluid" id="temp-info">
                <div class="row">
                    <section class="col-10">
                        <div class="results-info my-4" id="info-results-section">
                            <p class="d-inline" id="temp-res-text">${this._data.text} (${this._data.lang})</p>
                        </div>
                        ${this._pTitle("Sentences: ", `${this._data.sentences.flat()} (${this._data.sentences.flat().length})}`, "temp-res-sentences")}
                        ${this._pTitle("Classification results: ",  `${this._data.classification.predominant} (${this._data.classification.score})`, "temp-res-classification")}
                        ${Divider.get()}
                        <div id="input-lexicon-results my-4">
                            <h3 class="d-block my-0">Lexicon results:</h3>
                            <div id="temp-res-lexicon-lines">
                                ${o$1(this._data.lexicon.lines)}
                                <p id="temp-res-lexicon-global" class="my-2">${o$1(this._data.lexicon.global)}</p>
                            </div>
                        </div>
                        ${imagesContainer}
                    </section>
                </div>
            </div>`
        : x$1`<div class="temp-results container-fluid" id="temp-info">
                    ${imagesContainer}
                </div>`;

    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('results-container', ResultsContainer);

class ErrHandler extends s$1 {
    static properties = {
        _content: undefined,
        visible: false,
        msg: ``
    };

    constructor() {
        super();
        this.visible = false;
        this._content = {};
        this.msg = undefined;
    }

    add = (content) => {
        const msg = (content.message !== null) ? content.message : content.msg;
        this.msg +=`<br>${msg}`;
        this._content = x$1`<p id="err-message">${o$1(this.msg)}</p>`;
        this.visible = true;
    }

    set = (content) => {
        this.msg = (content.message !== null) ? content.message : content.msg;
        this._content = x$1`<p id="err-message">${o$1(this.msg)}</p>`;
        this.visible = true;
        console.error(this.msg);
    }

    clear = () => {
        this.msg = undefined;
        this._content = {};
        this.visible = false;
    }


    render(){
       return x$1`
            <div class="position-relative temp-results container-fluid bg-light ${this.visible ? "d-block" : "d-none"} z-3" id="error-handle">
                <div class="row bg-warning">
                    <section class="col-11 p-3" id="error-handle-inner">
                        ${this._content}
                    </section>
                    <div class="col-1 p-3"  @click="${() => {
                        this.visible = false;
                    }}"><span role="button">&times;</span></div>
                </div>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('err-handler', ErrHandler);

class TextInput extends s$1 {
    static properties = {
        label: "label",
        showLabel: true,
        value: 1,
        onChange: () => {},
    }

    // col-${this.size} mb-2
    constructor(label, value, id, onChange = () => {}, classList = [], mirror = null) {
        super();
        this.classList.add(...classList);
        this.value = value;
        this.id = id;
        this.showLabel = label !== null;
        this.label = this.showLabel ? label : null;
        this.onChange = onChange;
        this.mirror = mirror;
    }

    getValue = () => {
        return this.value;
    }

    render() {
        return x$1`<div>
            <div class="input-group input-group-sm" id="${this.id}-inner">
                ${this.showLabel ? x$1`<span class="input-group-text" id="${this.id}-input-label">${this.label}</span>` : A$1}
                <input type="text" class="form-control" id="${this.id}-input"
                       placeholder="${this.showLabel ? this.label : A$1}"
                       data-mirror="${this.mirror !== null ? this.mirror : A$1}"
                       value="${this.value}"
                       @change="${this.onChange}">
            </div>
        </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('text-input', TextInput);

const validateNumberInput = (value, defaultValue = 1) => {
    value = parseFloat(value.replace(",", "."));
    return isNaN(value) || value === undefined || value === null ? defaultValue : value;
};

const swap = (arr, i, j) => {
    const tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
    return arr;
};

const sumArr = (arr) => {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
};

const sus = (probs, max=1) => {
    const r = Math.random()*max;
    let c = 0;
    for (let i in probs) {
        c += probs[i];
        if (r < c) {
            return i;
        }
    }

};

const shuffleArr = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const sumProduct = (arr, weights) => {
    return arr.reduce((s, v, i) => s + v * weights[i], 0);
};

class EvolutionPanel extends s$1 {
    static properties = {
        generations: 0,
    }

    constructor(params, restart, errorMessage, pop) {
        super();

        console.log ("POP", params["evo"]);

        this.params = params;
        this.restart = restart;
        this.errorMessage = errorMessage;

        // this.generations = pop.generations;

        this.fields = {
            populationSize: new TextInput("Population size", params["evo"] ? params["evo"]["popSize"] : 0, `pop-size`, (e) => {
                if (params["evo"]) {
                    params["evo"]["popSize"] = this.#validateValue(e.target.value, this.params["evo"]["popSize"], 2);
                    e.target.value = params["evo"]["popSize"];
                    this.restart();
                }
            }, ["col-12", "evolution-locked"]),
            numberOfGenerations: new TextInput("No. generations", params["evo"] ? params["evo"]["noGen"] : 0, "no-gen", (e) => {
                if (params["evo"]) {
                    params["evo"]["noGen"] = this.#validateValue(e.target.value, this.params["evo"]["noGen"], 2);
                    e.target.value = params["evo"]["popSize"];
                }
            }, ["col-12", "my-2"]),
            eliteSize: new TextInput("Elite size", params["evo"] ? params["evo"]["eliteSize"] : 0, "elite-size", (e) => {
                if (params["evo"]) {
                    let max = Math.round(parseInt(params["evo"]["popSize"]) / 2);
                    params["evo"]["eliteSize"] = this.#validateValue(e.target.value, this.params["evo"]["eliteSize"], 0, max);
                    if (parseInt(e.target.value) > max) {
                        this.errorMessage.set({message: `elite size must be in the maximum half of the full population`});
                    }
                    e.target.value = params["evo"]["eliteSize"];
                }
            }, ["col-12", "my-2"]),
            crossoverProbability: new TextInput("Crossover probability", params["evo"] ? params["evo"]["crossoverProb"] : 1, "crossover-probability", (e) => {
                if (params["evo"]) {
                    params["evo"]["crossoverProb"] = this.#validateValue(e.target.value, params["evo"]["crossoverProb"], 0, 1);
                    e.target.value = params["evo"]["crossoverProb"];
                }
            }, ["col-12", "my-2"]),
            mutationProbability: new TextInput("Mutation probability", params["evo"] ? params["evo"]["mutationProb"] : 0, "mutation-probability", (e) => {
                if (params["evo"]) {
                    params["evo"]["mutationProb"] = this.#validateValue(e.target.value, params["evo"]["mutationProb"], 0, 1);
                    e.target.value = params["evo"]["mutationProb"];
                }
            }, ["col-12", "my-2"]),
            fitness: {
                general: {
                    semanticPart: new TextInput(`Semantics`, params["evaluation"]["weights"][0], "evaluation-semantic-weight",
                        (e) => {
                            params["evaluation"]["weights"][0] = this.#validateValue(e.target.value, params["evaluation"]["weights"][0], 0, 1);
                            e.target.value = params["evaluation"]["weights"][0];
                            this.restart();
                        }, ["col-12", "evolution-locked"]),
                    aestheticPart: new TextInput(`Aesthetics`, params["evaluation"]["weights"][1], "evaluation-aesthetics-weight",
                        (e) => {
                            params["evaluation"]["weights"][1] = this.#validateValue(e.target.value, params["evaluation"]["weights"][1], 0, 1);
                            e.target.value = params["evaluation"]["weights"][1];
                            this.restart();
                        }, ["col-12", "my-2", "evolution-locked"]),
                },
                semantics: {
                    emphasis: new TextInput(`Semantic Emphasis`, params["evaluation"]["semanticsWeights"][0], "evaluation-semantics-emphasis-weight",
                        (e) => {
                            params["evaluation"]["semanticsWeights"][0] = this.#validateValue(e.target.value, params["evaluation"]["semanticsWeights"][0], 0, 1);
                            e.target.value = params["evaluation"]["semanticsWeights"][0];
                            this.restart();
                        }, ["col-12", "evolution-locked"]),
                    layout: new TextInput(`Semantic Layout`, params["evaluation"]["semanticsWeights"][1], "evaluation-semantics-layout-weight",
                        (e) => {
                            params["evaluation"]["semanticsWeights"][1]= this.#validateValue(e.target.value, params["evaluation"]["semanticsWeights"][1], 0, 1);
                            e.target.value = params["evaluation"]["semanticsWeights"][1];
                            this.restart();
                        }, ["col-12", "my-2", "evolution-locked"]),
                    visuals: new TextInput(`Semantic Visuals`, params["evaluation"]["semanticsWeights"][2], "evaluation-semantics-visuals-weight",
                        (e) => {
                            params["evaluation"]["semanticsWeights"][2]= this.#validateValue(e.target.value, params["evaluation"]["semanticsWeights"][2], 0, 1);
                            e.target.value = params["evaluation"]["semanticsWeights"][2];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                },
                aesthetics: {
                    alignment: new TextInput(`Alignment`, params["evaluation"]["aestheticsWeights"][0], "evaluation-aesthetics-alignment-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][0] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][0], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][0];
                            this.restart();
                        }, ["col-12", "evolution-locked"]),
                    regularity: new TextInput(`Regularity`, params["evaluation"]["aestheticsWeights"][1], "evaluation-aesthetics-regularity-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][1] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][1], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][1];
                            this.restart();
                        }, ["col-12", "evolution-locked", "my-2"]),
                    justification: new TextInput(`Justification`, params["evaluation"]["aestheticsWeights"][2], "evaluation-aesthetics-justification-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][2] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][2], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][2];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                    typefaceParing: new TextInput(`Typeface Paring`, params["evaluation"]["aestheticsWeights"][3], "evaluation-aesthetics-type-paring-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][3] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][3], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][3];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                    whiteSpace: new TextInput(`White Space Fraction`, params["evaluation"]["aestheticsWeights"][4], "evaluation-aesthetics-white-space-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][4] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][4], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][4];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                    balance: new TextInput(`Balance`, params["evaluation"]["aestheticsWeights"][5], "evaluation-aesthetics-balance-weight",
                        (e) => {
                            params["evaluation"]["aestheticsWeights"][5] = this.#validateValue(e.target.value, params["evaluation"]["aestheticsWeights"][5], 0, 1);
                            e.target.value = params["evaluation"]["aestheticsWeights"][5];
                            this.restart();
                        }, ["col-12", "evolution-locked", "mb-2"]),
                }
            }
        };
    }

    // global ev

    #validateValue = (value, current, min, max = null) => {
        let v = validateNumberInput(value, current);
        if (current !== v) {
            if (max !== null) {
                value = Math.min(max, value);
            }

            current = Math.max(min, value);
        }
        return current;
    }

    render() {
        return x$1`
            <div id="evolution-panel-inner">
                <div class="row mb-2">
                    <div class="col-12">
                        <p>generation no. <span class="fw-bold" id="generation-number">0</span></p>
                    </div>
                    <hr>
                </div>
                <h3>Evolutionary Setup</h3>
                ${Divider.get()}
                <div class="row">
                    ${this.fields.populationSize}
                    ${this.fields.numberOfGenerations}
                    ${this.fields.eliteSize}
                    ${this.fields.crossoverProbability}
                    ${this.fields.mutationProbability}
                </div>
                <hr>
                <h3>Evolution Setup</h3>
                ${Divider.get()}
                <div class="row">
                    <p class="fw-bold small">Fitness Assignment Scheme Weights</p>
                    ${this.fields.fitness.general.semanticPart}
                    ${this.fields.fitness.general.aestheticPart}
                </div>
                ${Divider.get()}
                <div class="row">
                    <p class="fw-bold small">Semantics Metrics</p>
                    ${this.fields.fitness.semantics.emphasis}
                    ${this.fields.fitness.semantics.layout}
                    ${this.fields.fitness.semantics.visuals}
                </div>
                ${Divider.get()}
                <div class="row">
                    <p class="fw-bold small">Aesthetics Metrics</p>
                    ${this.fields.fitness.aesthetics.alignment}
                    ${this.fields.fitness.aesthetics.regularity}
                    ${this.fields.fitness.aesthetics.balance}
                    ${this.fields.fitness.aesthetics.whiteSpace}
                    ${this.fields.fitness.aesthetics.justification}
                    ${this.fields.fitness.aesthetics.typefaceParing}
                </div>
                ${Divider.get()}
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('evo-panel', EvolutionPanel);

class ColorInput extends s$1 {
    static properties = {
        label: "label",
        showLabel: true,
        colorA: `#fff`,
        colorB: `#000`,
        onChange: () => {},
    }

    constructor(label, colorA, colorB = null, id, onChange = () => {}, classList = []) {
        super();
        this.classList.add(...classList);
        this.colorA = colorA;
        this.colorB = colorB;
        this.id = id;
        this.disable = true;
        this.showLabel = label !== null;
        this.label = this.showLabel ? label : null;
        this.onChange = onChange;
    }

    render() {
        return x$1`<div>
            <div class="input-group input-group-sm" id="${this.id}-inner">
                ${this.showLabel ? x$1`<span class="input-group-text" id="${this.id}-colour-picker-label">${this.label}</span>` : A$1}
                <input type="color"
                       class="form-control form-control-color colour-picker mr-2 d-inline-flex ${this.id}-colour-picker"
                       id="${this.id}-colour-picker-1"
                       value="${this.colorA}"
                       title="colour-typography" data-param="valueA"
                       disabled
                       @change="${this.onChange}">
                ${this.colorB !== null ? x$1`<input type="color"
                       class="form-control form-control-color colour-picker mr-2 d-inline-flex ${this.id}-colour-picker"
                       id="${this.id}-colour-picker-2"
                       value="${this.colorB}"
                       title="colour-typography" data-param="valueB"
                       disabled
                       @change="${this.onChange}">` : A$1}
            </div>
        </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('color-input', ColorInput);

class Checkbox extends s$1 {
    static properties = {
        label: "label",
        showLabel: true,
        checked: true,
        onChange: () => {},
    }

    constructor(label, checked = true, id,  onChange = () => {},  classList = []) {
        super();
        this.id = id;
        this.label = label;
        this.checked = checked;
        this.classList.add(...classList);
        this.onChange = onChange;
    }

    render() {
        return x$1`<div>
            <input class="form-check-input" type="checkbox"
                   id="${this.id}-check" ?checked="${this.checked}"
                   @change="${this.onChange}">
            <label class="form-check-label small px-2" for="${this.id}-check">${this.label}</label>
        </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('checkbox-input', Checkbox);

class Slider extends s$1 {
    static properties = {
        label: "label",
        min: 0,
        max: 100,
        step: 1,
        value: 50,
        onChange: () => {}
    }

    constructor(label, value, min, max, step, id, onChange = () => {}, classList = []) {
        super();
        this.label = label;
        this.min = min;
        this.max = max;
        this.step = step;
        this.id = id;
        this.value = value;
        this.classList.add(...classList);
        this.onChange = (e) => {
            this.#mirrorUpdate(e);
            onChange(e);
        };

        this.textField = new TextInput(this.label, this.value, `${this.id}-text`, (e) => {
            this.#mirrorUpdate(e);
            onChange(e);
        }, [], `${this.id}-slider`);
    }

    #mirrorUpdate = (e) => {
        const mirrorElement = document.getElementById(e.target.getAttribute(`data-mirror`));
        if (mirrorElement) {
            mirrorElement.value = parseInt(e.target.value);
        }
    }

    render() {
        return x$1`<div class="row">
            <div class="col-8">
                <input type="range" class="form-range" id="${this.id}-slider"
                       min="${this.min}" max="${this.max}" step=${this.step} value="${this.value}"
                       @change="${this.onChange}"
                       data-mirror="${this.id}-text"
                />
            </div>
            <div class="col-4">
                ${this.textField}
            </div>
            </div> `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('slider-input', Slider);

class DropDownList extends s$1 {
    static properties = {
        label: "label"
    }

    constructor(label = null, options = [["default", 0]], init = 0, id, onChange = () => {}, classList = []) {
        super();
        this.label = label;
        this.id = id;
        this.options = options;
        this.init = init;
        this.onChange = onChange;
        this.classList.add(...classList);
    }

    render() {
        return x$1`<div class="row">
            <small class="fw-bold col-12">${this.label}</small>
            <div class="col-12 my-2">
                <select class="form-select form-select-sm" id="${this.id}-list" @change="${this.onChange}">
                    ${this.options.map ((x, i) => {
                        return x$1`<option value=${i} ${(this.init === i) ? `selected` : A$1 }>${x[0]}</option>`;
                    })}´
                </select>
            </div>
        </div> `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('dropdown-input', DropDownList);

class TextArea extends s$1 {
    static properties = {
        label: "label",
        content: [],
        onChange: () => {},
    }

    constructor(label, content = [],  id, onChange = () => {},  classList = []) {
        super();
        this.id = id;
        this.content = content;
        if (this.content === null) this.content = [];
        this.label = label;
        this.classList.add(...classList);
        this.onChange = onChange;
    }

    set = (content) => {
        this.content = content;
    }

    render() {
        return x$1`<div class="row">
            <small class="my-2 col-12" id="${this.id}-label">${o$1(this.label)}</small>
            <div class="col-12">
                <textarea class="form-control my-2" id="${this.id}-input" rows="${this.content.length}" 
                          @change="${this.onChange}">${this.content.join(`¶`)}</textarea>
            </div>
        </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('textarea-input', TextArea);

const TYPEFACES$1 = evoPoster_config["typefaces"];
const BACKGROUND$2 = evoPoster_config["color"]["BACKGROUND"];
const SIZE$1 = evoPoster_config["size"];
const TYPOGRAPHY$2 = evoPoster_config["typography"];

class GenerationPanel extends s$1 {
    static properties = {
        params: {},
        changesInTypefaces: 0

    }
    constructor(params, restart, errorMessage, id = "poster-features") {
        super();

        this.id = id;
        // configuration params
        this.params = params;

        // restart pop
        this.restart = restart;

        // available fonts
        // this.fonts = this.#getAvailableTypefaces();
        /* if (this.params) {
            if (this.params["typography"]) {
                this.params["typography"]["weight"] && (this.params["typography"]["weight"] = this.fonts["weight"]);
                this.params["typography"]["stretch"] && (this.params["typography"]["stretch"]  = this.fonts["stretch"] );
                this.params["typography"]["typefaces"] && (this.params["typography"]["typefaces"]  = this.fonts["typefaces"] );
            }
        }*/
        this.changesInTypefaces = 0;

        // error handler
        this.errorMessage = errorMessage;

        // input fields
        const sentences = this.params ? this.params["sentences"] : [];
        this.fields = {
            content: new TextArea(`<b>Content</b> The text lines are defined by pilcrows (¶)`,
                sentences, `text-area-content`, (e) => {
                    const textContent = e.target.value.split("¶");
                    this.params["sentences"] && (this.params["sentences"] = textContent.map(t => t.trim()));
                    this.restart();
                }),
            size: {
                width: new TextInput("Width", 1, `size-x`, this.#updateSize, ["col-8", "mb-2"]),
                height: new TextInput("Height", Math.round(this.params["size"]["height"] / this.params["size"]["width"] * 100) / 100, `size-y`, this.#updateSize, ["col-8", "mb-2"]),
                margins: {
                    left: new TextInput("Margins (ltrb)", this.params.size.margin[0], `size-mg-l`, this.#updateSize, ["col-8", "my-2"]),
                    top: new TextInput(null, this.params.size.margin[1], `size-mg-t`, this.#updateSize, ["col-4", "my-2"]),
                    right: new TextInput(null, this.params.size.margin[2], `size-mg-r`, this.#updateSize, ["col-4"]),
                    bottom: new TextInput(null, this.params.size.margin[3], `size-mg-b`, this.#updateSize, ["col-4"])
                }
            },
            typography: {
                color: new ColorInput(
                    "Main Colour", this.params.typography.color.value, null,
                    "typography", (e) => {
                        if (this.params.typography.color.value !== e.target.value) {
                            this.params.typography.color.value = e.target.value;
                            this.restart();
                        }
                    },
                    ["col-8", "my-2"]),
                random: new Checkbox(`Random`, true, `random-colour-typo`, async (e) => {
                    const el = document.getElementById(`typography-colour-picker-1`);
                    this.params.typography.color.random = e.target.checked;
                    el.disabled = e.target.checked;
                    this.params.typography.lock[1] = !e.target.checked;
                    this.restart();
                }, ["col-4"]),
                weight: {
                    min: new Slider(`Min`, this.params["typography"]["weight"]["min"], this.params["typography"]["weight"]["min"], this.params["typography"]["weight"]["max"], 1, `typeface-weight-min`, (e) => {
                        this.params["typography"]["weight"]["min"] = parseInt(e.target.value);
                        if (this.params["typography"]["weight"]["min"] > this.params["typography"]["weight"]["max"]) {
                            this.params["typography"]["weight"]["min"] = this.params["typography"]["weight"]["max"];
                            e.target.value = this.params["typography"]["weight"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                    max: new Slider(`Max`, this.params["typography"]["weight"]["max"], this.params["typography"]["weight"]["min"], this.params["typography"]["weight"]["max"], 1, `typeface-weight-max`, (e) => {
                        this.params["typography"]["weight"]["max"] = parseInt(e.target.value);
                        if (this.params["typography"]["weight"]["max"] < this.params["typography"]["weight"]["min"]) {
                            this.params["typography"]["weight"]["max"] = this.params["typography"]["weight"]["min"];
                            e.target.value = this.params["typography"]["weight"]["min"];
                        }
                        this.restart();
                    }, ["my-2"])
                },
                stretch: {
                    min: new Slider(`Min`, this.params["typography"]["stretch"]["min"], this.params["typography"]["stretch"]["min"], this.params["typography"]["stretch"]["max"], 1, `typeface-stretch-min`, (e) => {
                        this.params["typography"]["stretch"]["min"] = parseInt(e.target.value);
                        if (this.params["typography"]["stretch"]["min"] > this.params["typography"]["stretch"]["max"]) {
                            this.params["typography"]["stretch"]["min"] = this.params["typography"]["stretch"]["max"];
                            e.target.value = this.params["typography"]["stretch"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                    max: new Slider(`Max`, this.params["typography"]["stretch"]["max"], this.params["typography"]["stretch"]["min"], this.params["typography"]["stretch"]["max"], 1, `typeface-stretch-max`, (e) => {
                        this.params["typography"]["stretch"]["max"] = parseInt(e.target.value);
                        if (this.params["typography"]["stretch"]["max"] < this.params["typography"]["stretch"]["min"]) {
                            this.params["typography"]["stretch"]["max"] = this.params["typography"]["stretch"]["min"];
                            e.target.value = this.params["typography"]["stretch"]["max"];
                        }
                        this.restart();
                    }, ["my-2"]),
                },
                verticalAlignment: new DropDownList(`Vertical alignment`, TYPOGRAPHY$2["TEXT_ALIGNMENT"]["GLOBAL"], 0, `vertical-align`, (e) => {
                    this.params.typography.verticalAlignment = parseInt(e.target.value);
                    this.restart();
                }, ["mb-2"]),
                typefaces: new TextInput(`Add Typeface`, "", `typefaces-add`, (e) => {
                    const name = e.target.value;
                    const current = this.params.typography.typefaces.map(e => e.family);
                    if (Object.keys(TYPEFACES$1).includes(name) && !current.includes(name)) {
                        for (let f of Array.from(document.fonts)) {
                            if (f.family === name) {
                                let stretch = f.stretch.replaceAll(`%`, ``);
                                let stretchValues = stretch.split(" ").map((x) => parseInt(x));
                                let weightValues = f.weight.split(" ").map((x) => parseInt(x));
                                const features = TYPEFACES$1[name];
                                const fontData = {
                                    family: f.family,
                                    weight: weightValues,
                                    stretch: stretchValues,
                                    category: features["category"],
                                    tags: features["tags"],
                                    leading: features["leading"]
                                };
                                this.params["typography"]["typefaces"].push(fontData);
                                break;
                            }
                        }
                        this.restart();
                        this.changesInTypefaces++;
                    } else {
                        this.errorMessage.set({message: `Typeface ${name} is not available<br>available typefaces: ${TYPEFACES$1}`});
                        this.numberOfTypeface += 1;
                    }
                }, ["mb-2"])
            },
            textboxes: {
                align: new DropDownList(`Texbox alignment`, TYPOGRAPHY$2["TEXT_ALIGNMENT"]["TEXTBOXES"], 0, `texbox-align`, (e) => {
                    this.params.typography.textAlignment = parseInt(e.target.value);
                    this.params.typography.lock[7] = e.target.value !== 0;
                    this.restart();
                }, ["mb-2"]),
                uppercase: new Checkbox(`Uppercase`, this.params.typography.uppercase, `case`, (e) => {
                    this.params.typography.uppercase = e.target.checked;
                    this.restart();
                })
            },
            background: {
                style: new DropDownList(`Background Style`, BACKGROUND$2["AVAILABLE_STYLES"], 0, `background-style`, (e) => {
                    const els = document.querySelectorAll(`.background-colour-picker`);
                    const isRandom = document.getElementById(`bk-color-check`).checked;
                    this.params.background.color.random = isRandom;
                    this.params.background.style = parseInt(e.target.value);
                    this.params.background.lock[0] = (this.params.background.style !== 0);
                    if (!isRandom) {
                        const numberOfColours = BACKGROUND$2["AVAILABLE_STYLES"][parseInt(e.target.value)][1];
                        els.forEach((el, i) => {
                            if (i < numberOfColours) {
                                el.disabled = false;
                            } else {
                                el.disabled = true;
                            }
                        });
                    }
                    this.restart();
                }, ["mb-2"]),
                colors: new ColorInput(`Color`, this.params.background.color.valueA, this.params.background.color.valueB, `background`, (e) => {
                    const attr = e.target.getAttribute("data-param");
                    if (this.params["background"]["color"][attr] !== e.target.value) {
                        this.params["background"]["color"][attr] = e.target.value;
                    }
                    this.restart();
                }),
                random: new Checkbox(`Random`, true, `bk-color`, (e) => {
                    const els = document.querySelectorAll(`.background-colour-picker`);
                    const isRandom = e.target.checked;
                    this.params.background.color.random = isRandom;
                    this.params.background.lock[1] = !isRandom;
                    if (!isRandom) {
                        const style = document.getElementById(`background-style-list`).value;
                        const numberOfColours = BACKGROUND$2["AVAILABLE_STYLES"][parseInt(style)][1];
                        els.forEach((el, i) => {
                            if (i < numberOfColours) {
                                el.disabled = false;
                                this.params.background.color.random = false;
                            } else {
                                el.disabled = true;
                            }
                        });
                    } else {
                        els.forEach((el) => el.disabled = true);
                    }
                    this.restart();
                })
            }
        };
    }



    #updateSize = () => {
        let width = validateNumberInput(document.getElementById(`size-x-input`).value);
        let height = validateNumberInput(document.getElementById(`size-y-input`).value);
        let ml = validateNumberInput(document.getElementById(`size-mg-l-input`).value, this.params.size.margin[0]);
        let mt = validateNumberInput(document.getElementById(`size-mg-t-input`).value, this.params.size.margin[1]);
        let mr = validateNumberInput(document.getElementById(`size-mg-r-input`).value, this.params.size.margin[2]);
        let mb = validateNumberInput(document.getElementById(`size-mg-b-input`).value, this.params.size.margin[3]);

        if (width !== 1) {
            height = Math.round(parseFloat(height / width) * 100) / 100;
            width = 1;
        }

        this.params.size.width = SIZE$1["WIDTH"] * width;
        this.params.size.height = SIZE$1["WIDTH"] * height;
        this.params.size.margin = [ml, mt, mr, mb];

        document.getElementById(`size-x-input`).value = width;
        document.getElementById(`size-y-input`).value = height;
        document.getElementById(`size-mg-l-input`).value = ml;
        document.getElementById(`size-mg-t-input`).value = mt;
        document.getElementById(`size-mg-r-input`).value = mr;
        document.getElementById(`size-mg-b-input`).value = mb;

        this.restart(true);
    }

    #tag = (value = "", i) => {
        return x$1`<span class="badge text-bg-secondary mr-2 typeface-badge-${value}"
                          id="typeface-badge-${value}">${value}
            <span role="button" @click="${() => {
            if (this.params.typography.typefaces.length > 1) {
                this.params.typography.typefaces = this.params.typography.typefaces.filter((el) => {
                    return el.family !== value;
                });
                this.changesInTypefaces++;
                this.restart();
            } else {
                this.errorMessage.set({message: "You must select, at least, one typeface"});
            }
        }}">&times</span>
        </span>`;
    }

    #getTypefaceTags = () => {
        let tags = [];
        if (this.params !== undefined) {
            for (let i = 0; i < this.params.typography.typefaces.length; i++) {
                let f = this.params.typography.typefaces[i];
                const tag = this.#tag(f.family, i);
                tags.push(tag);
            }
        }
        return tags;
    }

    // panel sections
    #posterSizeFeatures = () => {
        return x$1`
            <div class="form-group row">
                <h3 class="fw-bold col-12">Posters size</h3>
                ${this.fields.size.width}
                ${this.fields.size.height}
                <div class="row mt-2 mb-4">
                    ${this.fields.size.margins.left}
                    ${this.fields.size.margins.top}
                    ${this.fields.size.margins.right}
                    ${this.fields.size.margins.bottom}
                </div>
                <hr>
            </div>`;
    }

    #posterTypographyFeatures = () => {
        return x$1`
            <div class="form-group row">
                <h3 class="mb-3 fw-bold col-12">Typography</h3>
                <div class="row form-group my-2" id="typeface-selector">
                    <small class="fw-bold col-12">Typeface</small>
                    <div class="typefaces-input my-2 bootstrap-tagsinput" id="typeface-tags-${this.numberOfTypeface}">
                        ${this.#getTypefaceTags()}
                    </div>
                    ${this.fields.typography.typefaces}
                </div>
                <div class="row d-flex align-items-center">
                    ${this.fields.typography.color}
                    ${this.fields.typography.random}
                </div>
                <div class="row mt-2">
                    <small class="fw-bold col-12">Weight</small>
                    ${this.fields.typography.weight.min}
                    ${this.fields.typography.weight.max}
                </div>
                <div class="row my-2">
                    <small class="fw-bold col-12">Horizontal Motion</small>
                    ${this.fields.typography.stretch.min}
                    ${this.fields.typography.stretch.max}
                </div>
                ${this.fields.typography.verticalAlignment}
                <hr>
            </div>`;
    }

    #textBoxesFeatures = () => {
        return x$1`
            <div class="form-group row">
                <h3 class="mb-3 fw-bold col-12">Text box features</h3>
                ${this.fields.textboxes.align}
                ${this.fields.textboxes.uppercase}
                <hr class="mt-4">
            </div>`
    }

    #contentFeatures = () => {
        this.fields.content.set(this.params.sentences);

        return x$1`<div class="form-group row">
            ${this.fields.content}
            <hr class="mt-4">
        </div>`;
    }

    #backgroundFeatures = () => {
        return x$1`<div class="form-group row">
            <h3 class="mb-3 fw-bold col-12">Background features</h3>
            ${this.fields.background.style}
            <div class="row d-flex align-items-center">
                <div class="col-8">
                    ${this.fields.background.colors}
                </div>
                <div class="col-4">
                    ${this.fields.background.random}
                </div>
            </div>
            <hr class="mt-4">
        </div>`;
    }

    render() {

        return x$1`
            <div class="row form-group my-2 init-selector">
                <form>
                    ${this.#contentFeatures()}
                    ${Divider.get()}
                    ${this.#posterSizeFeatures()}
                    ${Divider.get()}
                    ${this.#posterTypographyFeatures()}
                    ${Divider.get()}
                    ${this.#textBoxesFeatures()}
                    ${Divider.get()}
                    ${this.#backgroundFeatures()}
                </form>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('generation-panel', GenerationPanel);

class Interface extends s$1 {
    static properties = {
        evolving: false
    }

    constructor(params, initFunction, pop, errorMessage, initEvolution) {
        super();
        this.params = params;
        this.restart = initFunction;
        this.pop = pop;
        this.errorMessage = errorMessage;
        this.initEvolution = initEvolution;
        this.evolving = false;

        // ui
        this.generationPanelID = "poster-tab";
        this.evolutionPanelID = "evolution-tab";
        this.refinePanelID = "refine-tab";
        // tabs
        this.tabGeneration = this.#createTab(`General`, this.generationPanelID, true);
        this.tabEvolution = this.#createTab(`Evolution`, this.evolutionPanelID, false);
        this.tabRefine = this.#createTab(`Refine`, this.refinePanelID, false);
        // panels
        this.generationPanel = new GenerationPanel(this.params, this.restart, this.errorMessage);
        this.evolutionPanel = new EvolutionPanel(this.params, this.restart, this.errorMessage, this.pop);
    }

    #createTab = (name, id, active = false) => {
        const c = active ? `nav-link active` : `nav-link disabled`;
        return x$1`<li class="nav-item" role="presentation">
            <button class="${c}" id="${id}" data-bs-toggle="tab"  data-bs-target="#${id}-panel"
                    type="button" role="tab" aria-controls="${id}-pane" aria-selected="true">${name}</button></li>`;
    }

    render() {
        return x$1`
            <div class="backdrop z-1 opacity-fade show" id="evo-interface-backdrop"></div>
            <div class="wrapper initial-form-outer container-fluid show z-2" id="evo-interface-outer">
                <section id="initialForm" class="initial-form-inner row">
                    <div class="offset-sm-6 col-12 col-sm-6 p-3 pt-5 collapse-horizontal collapse show" id="evo-interface-inner">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            ${this.tabGeneration}
                            ${this.tabEvolution}
                            ${this.tabRefine}
                        </ul>
                        <div class="tab-content m-3" id="tabs-contents">
                            <div class="tab-pane fade show active" id="${this.generationPanelID}-panel" role="tabpanel" aria-labelledby="${this.generationPanelID}" tabindex="0">
                                ${this.generationPanel}
                            </div>
                            <div class="tab-pane fade" id="${this.evolutionPanelID}-panel" role="tabpanel" aria-labelledby="${this.evolutionPanelID}" tabindex="1">
                               ${this.evolutionPanel}
                            </div>
                            <div class="tab-pane fade" id="${this.refinePanelID}-panel" role="tabpanel" aria-labelledby="${this.refinePanelID}" tabindex="2">
                                <p>TBD</p>
                            </div>
                        </div>
                        <div class="m-3">
                            <div class="row">
                                <div class="col-12 px-2">
                                    ${new Checkbox(`Show grid`, this.params.display.grid, `grid-display`, (e) => {
                                        this.params.display.grid = e.target.checked;
                                        this.pop.toggleGrid(this.params.display.grid);
                                    })}
                                </div>
                                ${Divider.get()}
                                <div class="col-12 mb-3">
                                    <button type="button" id="evolve-bt" class="btn btn-primary mb-2" @click="${(e) => {
                                        // lock interface evo
                                        document.querySelectorAll(`.init-selector`).forEach((el) => {
                                            el.classList.add("disabled-inputs");
                                        });
                                        // disable evolutionary tab
                                        document.getElementById(this.generationPanelID).classList.remove(`active`);
                                        document.getElementById(this.evolutionPanelID).classList.remove(`disabled`);
                                        document.getElementById(this.evolutionPanelID).classList.add(`active`);
                                        // show evolutionary tab
                                        document.getElementById(`${this.generationPanelID}-panel`).classList.remove(...[`active`, `show`]);
                                        document.getElementById(`${this.evolutionPanelID}-panel`).classList.add(...[`active`, `show`]);
                                        
                                        // show new bts
                                        e.target.style.display = `none`;
                                        document.querySelectorAll(`.evo-bts`).forEach((el) => {
                                            el.classList.remove("d-none");
                                        });
                                        
                                    }}">Evolve</button>
                                    <button type="button" id="start-bt" class="btn btn-primary mb-2 d-none evo-bts" ?disabled="${this.evolving}"
                                            @click="${(e) => {
                                                this.pop.evolving = true;
                                                this.pop.evolve();
                                                this.evolving = true;
                                                this.pop.pause = false;
                                                document.querySelectorAll(`.evolution-locked`).forEach((el) => {
                                                    el.disabled = true;
                                                    el.classList.add("disabled-inputs");
                                                });
                                                e.target.disabled = true;
                                    }}">Start</button>
                                    <button type="button" id="stop-evolving" class="btn btn-primary mx-2 mb-2 d-none evo-bts" ?disabled="${!this.evolving}"
                                            @click="${(e) => {
                                                this.pop.evolving = false;
                                                this.pop.pause = true;
                                                this.evolving = false;
                                    }}">Stop</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>`;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('init-form', Interface);

class Header extends s$1 {
    static properties = {
        evolutionaryInterface: false
    }

    constructor(controller= false) {
        super();
        this.evolutionaryInterface = controller;
    }

    showControls = () => {
        this.evolutionaryInterface = true;
    }

    render() {
        return x$1`<nav class="container-fluid z-3 position-sticky top-0" id="header-container">
            <header class="navbar justify-content-center align-items-start">
                <div class="${this.evolutionaryInterface ? `col-10` :  `col-12`} mt-2">
                    <a class="navbar-brand m-0 p-0" href="#">
                        <h1 class="m-0 p-0">Evolving Posters</h1>
                    </a>
                </div>
                ${this.evolutionaryInterface ? x$1`<div class="col-2 d-flex justify-content-end mt-2 d-block">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-toggle="collapse" 
                            data-target="#evo-interface-inner" data-bs-target="#evo-interface-inner" aria-controls="evo-interface-inner" 
                            aria-expanded="false" aria-label="Toggle navigation" 
                            @click="${(e) => {
                                const divs = document.querySelectorAll('.opacity-fade');
                                divs.forEach((el) => {
                                    el.classList.toggle('show');
                                });
                            }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>`: A$1}
            </header>
            <hr>
        </nav>`;
    }


    createRenderRoot() {
        return this;
    }
}

customElements.define('header-section', Header);

const t=(t,e,r,l,n)=>l+(t-e)/(r-e)*(n-l),e$1=(t,e,r)=>Math.min(r,Math.max(e,t)),r=t=>t.reduce(((t,e)=>t+e),0)/t.length||0,l=t=>t.reduce(((t,e)=>t+e),0),n=t=>Math.max(...t),a=t=>Math.min(...t),o=t=>t.filter(((t,e,r)=>r.indexOf(t)===e)),s=t=>{if(t.levels)return {r:parseInt(t.levels[0]),g:parseInt(t.levels[1]),b:parseInt(t.levels[2])};let e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},i=(t,e)=>Math.sqrt(Math.pow(t.r-e.r,2)+Math.pow(t.g-e.g,2)+Math.pow(t.b-e.b,2)),f=10,h=[.8,.2],u={MAX_CONSTRAINT:1,WHITE_SPACE_FACTOR:3,MODES:["OVERSET","JUSTIFY","ATTEMPT_JUSTIFY"],DEFAULT_MAX_LIMIT_SCALE:1},c={MIN_RANGE:50,THRESHOLD_VALID:.2,MODES:["DIF","MIN"]},p={MODES:["BOTH","TYPE_FAMILY","CATEGORY"]},g={VISUAL_CENTER_FT:20,MODES:["CENTER","LEFT-CENTER","RIGHT-CENTER","LEFT-TOP","RIGHT-TOP","LEFT-BOTTOM","RIGHT-BOTTOM"]},d=.5,E=10;const T=u.MAX_CONSTRAINT,M=u.WHITE_SPACE_FACTOR,I=u.DEFAULT_MAX_LIMIT_SCALE,O=u.MODES,A=(e,r)=>t(e=(e=e>=0?0:e)<=-r?-r:e,-r,0,T,0),b=(e,r)=>(e=Math.abs(e),t(e=e>r?r:e,r,0,T,0)),y=(t,e)=>b(t=t>=0?t/M:t,e),_={MODES:["RELATIVE","FIXED"]}.MODES;let m=c.MIN_RANGE,R=c.THRESHOLD_VALID,S=c.MODES;const x=(e,r)=>{const l=r.filter(((t,e,r)=>r.indexOf(t)===e)),n=[];for(let t of l)for(let l=0;l<r.length;l++)if(r[l]===t){n.push(e[l]);break}const a=n.filter(((t,e)=>n.indexOf(t)!==e));let o=1;if(!a.length>=1){let a=0;for(let t in r){let o=r[t],s=e[t],i=l.indexOf(o);s!==n[i]&&a++;}o=t(a,0,e.length,0,1);}return o},F=(l,o,s="DIF")=>{S.includes(s)||(s="DIF");const i=n(l),f=a(l);let h=Math.abs(i-f);if(h<m)return 1;const u=n(o),c=a(o);let p=f;if("DIF"===s)for(let t in o)if(o[t]===c){p=l[t];break}const g=o.map((r=>{let l=t(r,c,u,0,h);return l=e$1(l,0,h),l})),d=[];for(let t in l){let e=l[t],r=Math.abs(e-p),n=Math.abs(r-g[t]);d.push(n);}let E=t(r(d),0,h,1,0);return e$1(E,0,1)};var L={anger:{color:{typography:["#ff0000","#00ff00"],background:["#ff0000"]},typefaces:["sans-serif","neo-grotesque"]},joy:{color:{typography:[],background:["#ffff00","#00ff00"]},typefaces:["sans-serif","serif"]},trust:{color:{typography:[],background:["#0000ff","#00ff00"]},typefaces:["neo-grotesque"]},sadness:{color:{typography:[],background:["#0071b6"]},typefaces:[]},disgust:{color:{typography:["#800080"],background:[]},typefaces:[]}},D=Object.freeze({__proto__:null,default:L});const C=441.67,N=f,w=h,v=d,G=E,H=(t,e,r=1)=>{let l=0,n=t.width*r*t.height*r;t.loadPixels();for(let r=0;r<4*n;r+=4){let n={r:t.pixels[r],g:t.pixels[r+1],b:t.pixels[r+2]};i(n,e)<G&&l++;}return l/n},V=p.MODES,Y=g.VISUAL_CENTER_FT,P=g.MODES,k=(t,e,r,n)=>{const a=[];for(let e in n)a.push(U(t,r[e],n[e]));let o=0,s=0;const i=l(e);for(let t in e)o+=a[t].x*e[t],s+=a[t].y*e[t];return o/=i,s/=i,{x:o,y:s}},U=(t,e,r,l=[0,0,0,0])=>{const n=(t=String(t)).includes("LEFT")?1:t.includes("RIGHT")?2:0,a=t.includes("TOP")?1:t.includes("BOTTOM")?2:0;return {x:0===n?e/2:1===n?e*l[0]:e*(1-l[2]),y:0===a?r/2-r/Y:1===a?r*l[1]:r-r*l[3]}},$=async(t,e,r,l)=>{let n=[],a=[];for(let o in r){n.push(r[o]*l[o]);const s=await t.get(0,t.height/2+e.center[o],t.width,e.l[o]);await s.loadPixels();let i=0,f=0,h=0;const u=s.pixels.length/4;for(let t=0;t<s.pixels.length;t+=4)i+=s.pixels[t],f+=s.pixels[t+1],h+=s.pixels[t+2];i=Math.round(i/u),f=Math.round(f/u),h=Math.round(h/u);const c=(.2126*i+.7152*f+.0722*h)/255;a.push(-Math.log10(c));}return n.map(((t,e)=>t*a[e]))},X=(t=[],e,l="OVERSET",n=I)=>{O.includes(l)||(l="OVERSET");let a=[],o=e*n;for(let r of t){let t=e-r,n=T;switch(l){case"JUSTIFY":n=b(t,o);break;case"ATTEMPT_JUSTIFY":n=y(t,o);break;default:n=A(t,o);}a.push(n);}return r([...a])},B=(t,e,r=[],l=[],n={left:0,top:0,right:0,bottom:0})=>{let a=!1,o="",s=Math.abs(n.top)+Math.abs(n.bottom);for(let t of r)s+=parseFloat(t);let i=Math.abs(n.left)+Math.abs(n.right);for(let t of l)i+=parseFloat(t);return i=Math.round(i),s=Math.round(s),s>e?(a=!0,o+=`Grid height is bigger than container (grid:${s}, container:${e}). `):s<e&&(o+=`Grid and container height are not the same (grid:${s}, container:${e}). `),i>t?(a=!0,o+=`Grid width is bigger than container (grid:${i}, container:${t}). `):i<t&&(o+=`Grid and container width are not the same (grid:${i}, container:${t}). `),a?1:0},J=(t=[],e=null,n="RELATIVE",a={height:100,margin:[0,0,0,0]})=>{_.includes(n)||(n="RELATIVE");let o=0;"RELATIVE"===n?o=l(t):"FIXED"===n&&(o=a.height-(a.height*a.margin[1]+a.height*a.margin[3]));const s=t.map((t=>t/o));let i=[];for(let t in e){const r=Math.abs(e[t][3]-s[t]);i.push(r);}return 1-r(i)},q=(t,e,r=1,a=!0,o=[.4,.3,.3])=>{const s=e.map((t=>t[3]));let i,f=[F(t.map((t=>t.weight)),s),F(t.map((t=>t["font-stretch"])),s),r>1?x(t.map((t=>t["font-stretch"])),s):0],h=f.map(((t,e)=>t*o[e]));if(a)i=l(h);else {let t=f.map((t=>t>R)),e=0;for(let r of t)r&&e++;i=n(f)/e;}return i},j=async(t,l,n,a,o=D)=>{let f=t.predominant.emotion;if(void 0===o.default[f])return 1;const h=o.default[f].color.typography,u=o.default[f].color.background,c=o.default[f].typefaces;let p=1;if(void 0!==h&&h.length>0){let t=[];for(let e of l){let r=s(e.color),l=Number.MAX_VALUE;for(let t of h){t=s(t);let e=i(r,t);e<l&&(l=e);}t.push(l);}p=t.length<1?1:r(t),p/=C,p=e$1(1-p,0,1);}let g=1;if(void 0!==u&&0!==u.length){let t=[];g=0;for(let e of n){e=s(e);let r=Number.MAX_VALUE;for(let t of u){t=s(t);let l=i(e,t);l<r&&(r=l);}t.push(r);}g=g.length<1?1:r(t),g/=C,g=e$1(1-g,0,1);}let d=1;if(void 0!==c&&c.length>0){let t=[];for(let e of l){let r=0;const l=a.map((t=>t.family)).indexOf(e.typeface),n=a[l].tags;for(let t of c)n.includes(t)&&(r+=1/c.length);t.push(r);}d=t.length<1?1:r(t),d=e$1(d,0,1);}return (p+g+d)/3},W=(t,e,l=w)=>{if(t.length<2)return 1;let n=t,a=[];for(let t=0;t<n.length-1;t++){let e=Math.abs(n[t]-n[t+1]),r=N/(N+e);a.push(r);}let s=((t,e)=>t.reduce(((t,r,l)=>t+r*e[l]),0))([r(a),1/o(e).length],l);return s},z=t=>{if(t.length<2)return 1;const e=t;let l=[];for(let t=0;t<e.length-1;t++){let r=10/(10+Math.abs(e[t]-e[t+1]));l.push(r);}return r(l)},K=(t,e,r=null,l=v)=>{null===r&&(e=s(e),r=H(t,e,t.pixelDensity()));return 1-4*Math.pow(r-l,2)},Q=(t,e,r="BOTH")=>{V.includes(r)||(r="BOTH");let l=[.5,.5];"TYPE_FAMILY"===r?l=[1,0]:"CATEGORY"===r&&(l=[0,1]);let n=[],a=o(t),s=0,i=0;if("TYPE_FAMILY"!==r){const t=e.map((t=>t.family)),r=e.map((t=>t.category));for(let e of a){const l=t.indexOf(e);-1===l?n.push("undefined"):n.push(r[l]);}n=o(n),s=1/n.length;}"CATEGORY"!==r&&(i=1/a.length);return [i,s].reduce(((t,e,r)=>t+e*l[r]),0)},Z=async(t=null,r,l,n,a,o="CENTER",s=null)=>{const i=r.width,f=r.height;P.includes(o)||(o="CENTER");const h=null===s?await $(t,l,n,a):s,u=k(o,h,n,a);let c=U(o,i,f,r.margin),p=Math.pow((u.x-c.x)/i,2)+Math.pow((u.y-c.y)/f,2);return p=1-Math.pow(Math.abs(p/2),.5),e$1(p,0,1)};

var backgroundStyles = {
    solid: (pg, color) => {
        pg.background(color);
    },
    gradient: (pg, colorA, colorB) => {
        push();
        const ctx = pg.drawingContext;
        pg.background(colorA);
        let gradientHeight = pg.height;
        const gradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);
        gradient.addColorStop(0.0, colorA);
        gradient.addColorStop(0.25, colorA);
        gradient.addColorStop(0.75, colorB);
        gradient.addColorStop(1, colorB);
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0, pg.width, gradientHeight);
        pop();
    },
    triangle: (pg, colorA, colorB) => {
        push();
        pg.background(colorA);
        pg.noStroke();
        pg.fill(colorB);
        pg.triangle(
            0, 0,
            0, pg.height,
            pg.width, pg.height
        );
        pop();
    }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function toDegrees(angle, unit) {
  var _a;

  const multiplier = {
    rad: 180 / Math.PI,
    grad: 0.9,
    turn: 360
  };
  return angle * ((_a = multiplier[unit.toLowerCase()]) !== null && _a !== void 0 ? _a : 1);
}
function normalizeAngle(degrees) {
  return (degrees % 360 + 360) % 360;
}
function angle(str) {
  var _a, _b;

  const num = parseFloat(str);
  const unit = (_b = (_a = str.match(/deg|rad|grad|turn/i)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 'deg';
  return normalizeAngle(toDegrees(num, unit));
}

function exact(regex) {
  return new RegExp(`^${regex.source}$`, regex.flags);
}
function extractValuesFromMatch(match) {
  return match.slice(1).filter(val => val !== undefined);
}
const cssNumberMatcher = /[+-]?(?=\.\d|\d)\d*(?:\.\d+)?(?:[eE][+-]?\d+)?/;
const separatorMatcher = /(?=[,\s])\s*(?:,\s*)?/;
const alphaSeparatorMatcher = /\s*[,\/]\s*/;

const num$1 = cssNumberMatcher.source;
const sep$1 = separatorMatcher.source;
const asep$1 = alphaSeparatorMatcher.source;
const hslMatcher = new RegExp(`hsla?\\(\\s*(${num$1}(?:deg|rad|grad|turn)?)${sep$1}(${num$1})%${sep$1}(${num$1})%(?:${asep$1}(${num$1}%?))?\\s*\\)`, 'i');
function matchHslString(colorString) {
  const match = exact(hslMatcher).exec(colorString);
  return match ? extractValuesFromMatch(match) : null;
}

const namedColors = {
  aliceblue: '#F0F8FF',
  antiquewhite: '#FAEBD7',
  aqua: '#00FFFF',
  aquamarine: '#7FFFD4',
  azure: '#F0FFFF',
  beige: '#F5F5DC',
  bisque: '#FFE4C4',
  black: '#000000',
  blanchedalmond: '#FFEBCD',
  blue: '#0000FF',
  blueviolet: '#8A2BE2',
  brown: '#A52A2A',
  burlywood: '#DEB887',
  cadetblue: '#5F9EA0',
  chartreuse: '#7FFF00',
  chocolate: '#D2691E',
  coral: '#FF7F50',
  cornflowerblue: '#6495ED',
  cornsilk: '#FFF8DC',
  crimson: '#DC143C',
  cyan: '#00FFFF',
  darkblue: '#00008B',
  darkcyan: '#008B8B',
  darkgoldenrod: '#B8860B',
  darkgray: '#A9A9A9',
  darkgreen: '#006400',
  darkgrey: '#A9A9A9',
  darkkhaki: '#BDB76B',
  darkmagenta: '#8B008B',
  darkolivegreen: '#556B2F',
  darkorange: '#FF8C00',
  darkorchid: '#9932CC',
  darkred: '#8B0000',
  darksalmon: '#E9967A',
  darkseagreen: '#8FBC8F',
  darkslateblue: '#483D8B',
  darkslategray: '#2F4F4F',
  darkslategrey: '#2F4F4F',
  darkturquoise: '#00CED1',
  darkviolet: '#9400D3',
  deeppink: '#FF1493',
  deepskyblue: '#00BFFF',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1E90FF',
  firebrick: '#B22222',
  floralwhite: '#FFFAF0',
  forestgreen: '#228B22',
  fuchsia: '#FF00FF',
  gainsboro: '#DCDCDC',
  ghostwhite: '#F8F8FF',
  goldenrod: '#DAA520',
  gold: '#FFD700',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#ADFF2F',
  grey: '#808080',
  honeydew: '#F0FFF0',
  hotpink: '#FF69B4',
  indianred: '#CD5C5C',
  indigo: '#4B0082',
  ivory: '#FFFFF0',
  khaki: '#F0E68C',
  lavenderblush: '#FFF0F5',
  lavender: '#E6E6FA',
  lawngreen: '#7CFC00',
  lemonchiffon: '#FFFACD',
  lightblue: '#ADD8E6',
  lightcoral: '#F08080',
  lightcyan: '#E0FFFF',
  lightgoldenrodyellow: '#FAFAD2',
  lightgray: '#D3D3D3',
  lightgreen: '#90EE90',
  lightgrey: '#D3D3D3',
  lightpink: '#FFB6C1',
  lightsalmon: '#FFA07A',
  lightseagreen: '#20B2AA',
  lightskyblue: '#87CEFA',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#B0C4DE',
  lightyellow: '#FFFFE0',
  lime: '#00FF00',
  limegreen: '#32CD32',
  linen: '#FAF0E6',
  magenta: '#FF00FF',
  maroon: '#800000',
  mediumaquamarine: '#66CDAA',
  mediumblue: '#0000CD',
  mediumorchid: '#BA55D3',
  mediumpurple: '#9370DB',
  mediumseagreen: '#3CB371',
  mediumslateblue: '#7B68EE',
  mediumspringgreen: '#00FA9A',
  mediumturquoise: '#48D1CC',
  mediumvioletred: '#C71585',
  midnightblue: '#191970',
  mintcream: '#F5FFFA',
  mistyrose: '#FFE4E1',
  moccasin: '#FFE4B5',
  navajowhite: '#FFDEAD',
  navy: '#000080',
  oldlace: '#FDF5E6',
  olive: '#808000',
  olivedrab: '#6B8E23',
  orange: '#FFA500',
  orangered: '#FF4500',
  orchid: '#DA70D6',
  palegoldenrod: '#EEE8AA',
  palegreen: '#98FB98',
  paleturquoise: '#AFEEEE',
  palevioletred: '#DB7093',
  papayawhip: '#FFEFD5',
  peachpuff: '#FFDAB9',
  peru: '#CD853F',
  pink: '#FFC0CB',
  plum: '#DDA0DD',
  powderblue: '#B0E0E6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#FF0000',
  rosybrown: '#BC8F8F',
  royalblue: '#4169E1',
  saddlebrown: '#8B4513',
  salmon: '#FA8072',
  sandybrown: '#F4A460',
  seagreen: '#2E8B57',
  seashell: '#FFF5EE',
  sienna: '#A0522D',
  silver: '#C0C0C0',
  skyblue: '#87CEEB',
  slateblue: '#6A5ACD',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#FFFAFA',
  springgreen: '#00FF7F',
  steelblue: '#4682B4',
  tan: '#D2B48C',
  teal: '#008080',
  thistle: '#D8BFD8',
  tomato: '#FF6347',
  turquoise: '#40E0D0',
  violet: '#EE82EE',
  wheat: '#F5DEB3',
  white: '#FFFFFF',
  whitesmoke: '#F5F5F5',
  yellow: '#FFFF00',
  yellowgreen: '#9ACD32'
};
function named(colorName) {
  return namedColors[colorName.toLowerCase()];
}

const hex = /[0-9a-fA-F]/.source;
const hexColorMatcher = new RegExp(`#(${hex}{2})(${hex}{2})(${hex}{2})(${hex}{2})?`);
const shortHexColorMatcher = new RegExp(`#(${hex})(${hex})(${hex})(${hex})?`);
function matchHexString(colorString) {
  var _a;

  const match = (_a = exact(hexColorMatcher).exec(colorString)) !== null && _a !== void 0 ? _a : exact(shortHexColorMatcher).exec(colorString);
  return match ? extractValuesFromMatch(match) : null;
}

const num = cssNumberMatcher.source;
const sep = separatorMatcher.source;
const asep = alphaSeparatorMatcher.source;
const rgbMatcher = new RegExp(`rgba?\\(\\s*(${num}%?)${sep}(${num}%?)${sep}(${num}%?)(?:${asep}(${num}%?))?\\s*\\)`, 'i');
function matchRgbString(colorString) {
  const match = exact(rgbMatcher).exec(colorString);
  return match ? extractValuesFromMatch(match) : null;
}

function hslToRgb(hsl) {
  const {
    h,
    s,
    l,
    a
  } = normalizeHsl(hsl);
  const hue = h || 0;
  const sat = s / 100;
  const light = l / 100;

  function f(n) {
    const k = (n + hue / 30) % 12;
    const a = sat * Math.min(light, 1 - light);
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  }

  return {
    r: f(0) * 255,
    g: f(8) * 255,
    b: f(4) * 255,
    a
  };
}

function normalizeRgb(rgb) {
  return {
    r: clamp(rgb.r, 0, 255),
    g: clamp(rgb.g, 0, 255),
    b: clamp(rgb.b, 0, 255),
    a: clamp(rgb.a, 0, 1)
  };
}

function rgbFromParsedHexString(match) {
  var _a;

  const rgbValues = match.map(val => {
    if (val.length === 1) {
      val = `${val}${val}`;
    }

    return parseInt(val, 16);
  });
  const alpha = ((_a = rgbValues[3]) !== null && _a !== void 0 ? _a : 255) / 255;
  return {
    r: rgbValues[0],
    g: rgbValues[1],
    b: rgbValues[2],
    a: alpha
  };
}

function rgbFromParsedRgbString(match) {
  var _a;

  const rgbValues = match.map((val, index) => {
    let num = parseFloat(val);

    if (val.indexOf('%') > -1) {
      num *= 0.01;

      if (index < 3) {
        num *= 255;
      }
    }

    return num;
  });
  return normalizeRgb({
    r: rgbValues[0],
    g: rgbValues[1],
    b: rgbValues[2],
    a: (_a = rgbValues[3]) !== null && _a !== void 0 ? _a : 1
  });
}

function rgbFromColorString(colorString) {
  colorString = colorString.trim();
  if (colorString.toLowerCase() === 'transparent') return {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  };
  const hexFromName = named(colorString);

  if (hexFromName) {
    colorString = hexFromName;
  }

  let match;
  if ((match = matchHexString(colorString)) !== null) return rgbFromParsedHexString(match);else if ((match = matchRgbString(colorString)) !== null) return rgbFromParsedRgbString(match);
  return null;
}

function rgbToHsl(rgb) {
  const {
    r,
    g,
    b,
    a
  } = normalizeRgb(rgb);
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const d = max - min;
  const light = (min + max) / 2;
  let hue = NaN;
  let sat = 0;

  if (d !== 0) {
    sat = (max - light) / Math.min(light, 1 - light);

    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0);
        break;

      case green:
        hue = (blue - red) / d + 2;
        break;

      case blue:
        hue = (red - green) / d + 4;
    }

    hue *= 60;
  }

  return {
    h: hue,
    s: sat * 100,
    l: light * 100,
    a
  };
}

function isHsl(color) {
  return typeof color.h === 'number' && typeof color.s === 'number' && typeof color.l === 'number' && typeof color.a === 'number';
}
function normalizeHsl(hsl) {
  return {
    h: normalizeAngle(hsl.h),
    s: clamp(hsl.s, 0, 100),
    l: clamp(hsl.l, 0, 100),
    a: clamp(hsl.a, 0, 1)
  };
}

function hslFromParsedHslString(match) {
  var _a, _b;

  const hslValues = match.map(val => parseFloat(val));
  let alpha = (_a = hslValues[3]) !== null && _a !== void 0 ? _a : 1;

  if (((_b = match[3]) === null || _b === void 0 ? void 0 : _b.indexOf('%')) > -1) {
    alpha *= 0.01;
  }

  return normalizeHsl({
    h: angle(match[0]),
    s: hslValues[1],
    l: hslValues[2],
    a: alpha
  });
}

function hslFromRgbString(colorString) {
  const rgbColor = rgbFromColorString(colorString);
  return rgbColor ? rgbToHsl(rgbColor) : null;
}

function hslFromColorString(colorString) {
  colorString = colorString.trim();
  let match;
  if ((match = matchHslString(colorString)) !== null) return hslFromParsedHslString(match);
  return null;
}
function hsl(colorString) {
  var _a;

  const hslObj = (_a = hslFromColorString(colorString)) !== null && _a !== void 0 ? _a : hslFromRgbString(colorString);
  if (hslObj === null) throw new Error('Invalid color string');
  return hslObj;
}

function roundRgb(rgb) {
  return {
    r: Math.round(rgb.r),
    g: Math.round(rgb.g),
    b: Math.round(rgb.b),
    a: rgb.a
  };
}

function rgbToHexString(rgb) {
  const int = ((Math.round(rgb.r) & 0xff) << 16) + ((Math.round(rgb.g) & 0xff) << 8) + (Math.round(rgb.b) & 0xff);
  const str = int.toString(16).toUpperCase();
  const padLeft = '000000'.substring(str.length);
  return `#${padLeft}${str}`;
}

function rgbToRgbaString(rgb) {
  rgb = roundRgb(rgb);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
}

function colorString(color) {
  const rgbColor = isHsl(color) ? hslToRgb(color) : normalizeRgb(color);
  return rgbColor.a === 1 ? rgbToHexString(rgbColor) : rgbToRgbaString(rgbColor);
}

const rotation = (baseColor, key) => {
  if (typeof key !== 'number' || key === 0) return baseColor;
  const base = hsl(baseColor);
  const targetH = (base.h + key) % 360;
  return colorString(Object.assign(Object.assign({}, base), {
    h: targetH
  }));
};

var rotation$1 = rotation;

const analogue = (baseColor, key) => {
  if (typeof key !== 'number' || key === 0) return baseColor;
  return rotation$1(baseColor, 30 * key);
};

var analogue$1 = analogue;

const complement = (baseColor, key) => {
  if (typeof key !== 'number' || key === 0) return baseColor;
  let angle = 0;
  let direction = key < 0 ? -1 : 1;
  let i = 0;

  while (i !== key) {
    i += direction;
    if (i % 2 !== 0) angle += 180 * direction;else angle += 30 * direction;
  }

  return rotation$1(baseColor, angle);
};

var complement$1 = complement;

const MIN_CONTRAST = evoPoster_config.color !== null ? evoPoster_config.color.MIN_CONTRAST : 10;

const randomScheme = () => {
    const baseColour = randomColour();
    return complementAndAnalogueScheme(baseColour);
};

const contrastChecker = (baseColor, colorA, colorB) => {
    const baseColorLuminance = luminance(baseColor);
    const colorALuminance = luminance(colorA);
    const colorBLuminance = luminance(colorB);
    const min = Math.min(contrastRatio(baseColorLuminance, colorALuminance), contrastRatio(baseColorLuminance, colorBLuminance));
    return min > MIN_CONTRAST;
};

const complementAndAnalogueScheme = (baseColour) => {
    const colorA = complement$1(baseColour, 1);

    const colorB = analogue$1(colorA, Math.round(-2+(Math.random()*4)));
    return {
        baseColour: baseColour,
        colorA: colorA,
        colorB: colorB
    }
};

const randomColour = () => {
    let color = [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)];
    const hex = color.map ((v) => v.toString(16).padStart(2, '0'));
    return `#${hex.join("")}`;
};



const hexToRGB = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const luminance = (c) => {
    c = hexToRGB(c);
    let [lumR, lumG, lumB] = Object.keys(c).map(key => {
        let proportion = c[key] / 255;
        return proportion <= 0.03928
            ? proportion / 12.92
            : Math.pow((proportion + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * lumR + 0.7152 * lumG + 0.0722 * lumB;
};

const contrastRatio = (luminance1, luminance2) => {
    let lighterLum = Math.max(luminance1, luminance2);
    let darkerLum = Math.min(luminance1, luminance2);

    return (lighterLum + 0.05) / (darkerLum + 0.05);
};

const MAX_COLOR_SCHEME_ATTEMPT$1 = evoPoster_config["color"] !== undefined ? evoPoster_config["color"]["MAX_COLOR_SCHEME_ATTEMPT"] : 200;
const BACKGROUND$1 = evoPoster_config["color"]["BACKGROUND"];
const TYPOGRAPHY$1 = evoPoster_config["typography"];

class Poster {
    #showGrid = false;
    #debug = false;
    constructor(n, generation, params = null, genotype = null) {
        this.id = `${generation}-${n}`;
        this.n = n;
        this.generation = generation;
        this.ready = false;
        // ensure we use a deep copy of params
        // this.params = JSON.parse(JSON.stringify(params));
        this.params = params;

        this.fitness = 1;
        this.constraint = 0;

        this.metrics = {
            weights: [0,0],
            constraints: {
                legibility: 0,
                gridAppropriateness: 0,
                general: 0
            },
            aesthetics: {
                alignment: 0,
                regularity: 0,
                justification: 0,
                typefaceParing: 0,
                whiteSpace: 0,
                balance: 0,
                general: 0,
                weights: 0
            },
            semantics: {
                emphasis: 0,
                layout: 0,
                visuals: 0,
                general: 0,
                weights: [0,0,0]
            }
        };

        this.sentencesLength = [];

        const h = (genotype === null) ? params["size"]["height"] : genotype["size"]["height"];
        this.maxFontSize = TYPOGRAPHY$1["SIZE"]["MAX"] * h;
        this.minFontSize = TYPOGRAPHY$1["SIZE"]["MIN"] * h;

        this.genotype = (genotype === null) ? this.#generateGenotype(params) : genotype;

        this.#showGrid = false;
        if (params !== null) {
            this.#showGrid = this.params["display"]["grid"];
        }

        this.phenotype = null;
    }

    copy = () => {
        const gridData = this.genotype["grid"];
        const grid = new Grid(
            JSON.parse(JSON.stringify(gridData.size)),
            JSON.parse(JSON.stringify(gridData.v)),
            JSON.parse(JSON.stringify(gridData.h)),
            JSON.parse(JSON.stringify(gridData.defaultMargins)),
            JSON.parse(JSON.stringify(gridData.gwper)),
            JSON.parse(JSON.stringify(gridData.ghper)),
        );
        const size = JSON.parse(JSON.stringify(this.genotype["size"]));
        const textboxes = JSON.parse(JSON.stringify(this.genotype["textboxes"]));
        for (let i in textboxes) {
            textboxes[i]["color"] = color(this.genotype["textboxes"][i]["color"]);
        }
        const background = JSON.parse(JSON.stringify(this.genotype["background"]));
        background["colors"][0] = color(this.genotype["background"]["colors"][0]);
        background["colors"][1] = color(this.genotype["background"]["colors"][1]);
        let images = [];
        for (let img of this.genotype["images"]) {
            const p = {
                "scale": img["scale"],
                "src": img["src"],
                "x": img["x"],
                "y": img["y"]
            };
            images.push(p);
        }
        const typography = JSON.parse(JSON.stringify(this.genotype["typography"]));
        const genotypeCopy = {
            grid: grid,
            textboxes: textboxes,
            size: size,
            background: background,
            typography: typography,
            images: images
        };
        return new Poster(this.n, this.generation, this.params, genotypeCopy);
    }

    #generateGenotype = (params, ) => {
        // generate scheme
        let colorContrast = false;
        let colorScheme;
        let colorAttempt = 0;
        while (!colorContrast || colorAttempt > MAX_COLOR_SCHEME_ATTEMPT$1) {
            colorScheme = randomScheme();
            colorContrast = contrastChecker(colorScheme["baseColour"], colorScheme["colorA"], colorScheme["colorB"]);
            colorAttempt++;
        }

        // define grid
        const grid = new Grid(
            {
                width: params.size.width,
                height: params.size.height,
                margin: params.size.margin
            },
            2,
            params.sentences.length,
            JSON.parse(JSON.stringify(params.size.margin))
        );

        // define textboxes
        const textboxes = [];

        const alignment = params.typography.verticalAlignment === 0 ?
            Math.round(Math.random() * (TYPOGRAPHY$1["TEXT_ALIGNMENT"].length - 2) + 1) :
            params.typography.verticalAlignment;

        for (let i in params["sentences"]) {
            const sentence = params["sentences"][i];
            const selectedTypeface = Math.round(Math.random()*(params["typography"]["typefaces"].length-1));
            // stretch values
            let stretchDefaultParams = params["typography"]["typefaces"][selectedTypeface]["stretch"];
            stretchDefaultParams.map((v) => !isNaN(v) ? parseInt(v) : 100);
            if (stretchDefaultParams.length < 2) {
                stretchDefaultParams.push(100);
            }
            // weight valuers
            let weightDefaultParams = params["typography"]["typefaces"][selectedTypeface]["weight"];
            // selected values
            let selectedWeight = Math.round((Math.random() * (params["typography"]["weight"]["max"] - params["typography"]["weight"]["min"])) + params["typography"]["weight"]["min"]);
            selectedWeight = Math.max(weightDefaultParams[0], Math.min(selectedWeight, weightDefaultParams[1]));
            let selectedStretch = Math.round((Math.random() * (params["typography"]["stretch"]["max"] - params["typography"]["stretch"]["min"])) + params["typography"]["stretch"]["min"]);
            selectedStretch = Math.max(stretchDefaultParams[0], Math.min(selectedStretch, stretchDefaultParams[1]));

            // define initial size
            const leading = this.params.typography.typefaces[selectedTypeface]["leading"];
            let size = Math.round(grid.rows.l[0]) / leading;
            size += Math.round(-(size * TYPOGRAPHY$1["RANGE"])+(Math.random()*(size * TYPOGRAPHY$1["RANGE"])));
            size = Math.max(

                Math.round(params.size.height * TYPOGRAPHY$1["SIZE"]["MIN"]),
                Math.min(Math.round(params.size.height *  TYPOGRAPHY$1["SIZE"]["MAX"]), size)
            );
            grid.defineRow(i, size * leading, alignment);



            const alignmentLine = params.typography.textAlignment === 0 ?
                Math.round(Math.random() * (TYPOGRAPHY$1["TEXT_ALIGNMENT"]["TEXTBOXES"].length-2) + 1) :
                params.typography.textAlignment;

            textboxes.push({
                "content": sentence,
                "weight": selectedWeight,
                "font-stretch": selectedStretch,
                "alignment": alignmentLine,
                "size": size,
                "typeface": params["typography"]["typefaces"][selectedTypeface]["family"],
                "color": params.typography.color.random ? colorScheme.baseColour : color(params.typography.color.value),
                "uppercase": params.typography.uppercase
            });
        }

        const images = [];
        for (let input of params.images) {
            const src = input.src;
            const img = loadImage(src, async (img) => {
                // resize image
                await img.resize(0, params.size.height);
                img.ready = true;
            });
            images.push({
                x: Math.random(),
                y: Math.random(),
                scale: Math.random(),
                src: img
            });
        }

        // create genotype
        return {
            grid: grid,
            textboxes: textboxes,
            size: {
                width: params.size.width,
                height: params.size.height,
                margin: params.size.margin,
            },
            background: {
                // HERE
                style: params.background.style === 0 ? Math.round(1+Math.random()*(BACKGROUND$1["AVAILABLE_STYLES"].length-2)) : params.background.style,
                colors: [
                    params.background.color.random ? colorScheme.colorA : color(params.background.color.valueA),
                    params.background.color.random ? colorScheme.colorB : color(params.background.color.valueB)
                ]
            },
            typography: {
                verticalAlignment: alignment
            },
            images: images
        }
    }

    // generate phenotype
    draw = async () => {
        this.ready = true;
        this.phenotype = createGraphics(this.genotype.size.width, this.genotype.size.height);
        this.phenotype.id = this.n;

        // background
        const backgroundStyleKey = Object.keys(backgroundStyles)[this.genotype.background.style-1];
        const backgroundFunction =  backgroundStyles[backgroundStyleKey];
        backgroundFunction(this.phenotype, this.genotype.background.colors[0], this.genotype.background.colors[1]);

        // place images
        this.ready = await this.#placeImages(this.phenotype);

        // typesetting typography on poster
        await this.typeset(this.phenotype);

        if (this.#showGrid || this.#debug) {
            // GRID
            this.genotype.grid.display(this.phenotype);
        }

        // place graphics
        // const sideX = width / Math.floor(width/Params.visualisationGrid.width);
        // const sideY = this.genotype.grid.size.height + Params.visualisationGrid.marginY;
        // const x = posX * sideX + sideX/2;
        // const y = posY * sideY + sideY/2;
        // imageMode(CENTER);
        // image(pg, x, y);
        // pop();

        return this.phenotype;
    }

    evaluate = async (dist, emotionalData = {predominant: []}) => {
        this.phenotype = await this.draw();
        const noCurrentTypefaces = this.params["typography"]["typefaces"].length;

        // restrict the weight array values to sum up to a total of 1 (100%).
        let weightSum = sumArr(this.params["evaluation"]["weights"]);
        if (weightSum !== 1) {
            this.params["evaluation"]["weights"] = this.params["evaluation"]["weights"].map(x => x/weightSum);
        }

        let weights = this.params["evaluation"]["weights"];
        this.metrics["weights"] = weights;


        let semantics = 0; // semantic part of fitness
        let aesthetics = 0; // aesthetics part of fitness

        if (weights[0] > 0) {
            // restrict the weight array values to sum up to a total of 1 (100%).
            let semanticsWeightSum = sumArr(this.params["evaluation"]["semanticsWeights"]);
            if (semanticsWeightSum !== 1) {
                this.params["evaluation"]["semanticsWeights"] = this.params["evaluation"]["semanticsWeights"].map(x => x/semanticsWeightSum);
            }
            const semanticsWeights = this.params["evaluation"]["semanticsWeights"];
            const emphasis = (semanticsWeights[0] > 0) ? q(this.genotype["textboxes"], dist, noCurrentTypefaces) : 0;
            const layoutMode = this.params["evaluation"]["modes"]["semanticsVisuals"] !== undefined ? this.params["evaluation"]["modes"]["semanticsVisuals"] : `FIXED`;
            const layout = (semanticsWeights[1] > 0) ? J(this.genotype["grid"]["rows"]["l"], dist, layoutMode, this.genotype["size"]) : 0;
            const visuals = (semanticsWeights[2] > 0) ? await j(emotionalData, this.genotype["textboxes"], this.genotype.background.colors, this.params.typography.typefaces) : 0;
            semantics = sumProduct( [emphasis, layout, visuals], semanticsWeights);

            // save info
            this.metrics["semantics"]["emphasis"] = emphasis;
            this.metrics["semantics"]["layout"] = layout;
            this.metrics["semantics"]["visuals"] = visuals;
            this.metrics["semantics"]["general"] = semantics;
            this.metrics["semantics"]["weights"] = semanticsWeights;
        }

        if (weights[1] > 0) {
            // restrict the weight array values to sum up to a total of 1 (100%).
            let aestheticsWeightsSum = sumArr(this.params["evaluation"]["aestheticsWeights"]);
            if (aestheticsWeightsSum !== 1) {
                this.params["evaluation"]["aestheticsWeights"] = this.params["evaluation"]["aestheticsWeights"].map(x => x/aestheticsWeightsSum);
            }
            const aestheticsWeights = this.params["evaluation"]["aestheticsWeights"];
            const alignment = (aestheticsWeights[0] > 0) ? W(this.sentencesLength, this.genotype["textboxes"].map(tb => tb["alignment"])) : 0;
            const regularity = (aestheticsWeights[1] > 0) ? z(this.genotype["grid"]["rows"]["l"]) : 0;
            const justification = (aestheticsWeights[2] > 0) ? X(this.sentencesLength, this.genotype["grid"].getAvailableWidth(), `JUSTIFY`) : 0;
            const typefaceParing = (aestheticsWeights[3] > 0) ? Q(this.genotype["textboxes"].map(gene => gene["typeface"]), this.params["typography"]["typefaces"]) : 0;
            const whiteSpace = (aestheticsWeights[4] > 0) ? K(this.phenotype, this.genotype["textboxes"][0]["color"]) : 0;
            let balanceMode = this.genotype["textboxes"][0]["alignment"] === 0 ? `LEFT` : this.genotype["textboxes"][0]["alignment"] === 1 ? `CENTER` : `RIGHT`;
            balanceMode += this.genotype["typography"]["verticalAlignment"] === 0 ? `-TOP` : this.genotype["typography"]["verticalAlignment"] === 1 ? `-CENTER` : `-BOTTOM`;
            const balance = (aestheticsWeights[5] > 0) ? await Z(this.phenotype, this.genotype["size"], this.genotype["grid"]["rows"], this.genotype["textboxes"].map(tb => tb.size), this.sentencesLength, balanceMode) : 0;
            aesthetics = sumProduct([alignment, regularity, justification, typefaceParing, whiteSpace, balance], aestheticsWeights);

            // save info
            this.metrics["aesthetics"]["alignment"] = alignment;
            this.metrics["aesthetics"]["regularity"] = regularity;
            this.metrics["aesthetics"]["justification"] = justification;
            this.metrics["aesthetics"]["typefaceParing"] = typefaceParing;
            this.metrics["aesthetics"]["whiteSpace"] = whiteSpace;
            this.metrics["aesthetics"]["balance"] = balance;
            this.metrics["aesthetics"]["general"] = aesthetics;
            this.metrics["aesthetics"]["weights"] = aestheticsWeights;
        }


        // constraints
        const legibility = X(this.sentencesLength, this.genotype["grid"].getAvailableWidth(), `OVERSET`);
        const gridAppropriateness = B(
            this.genotype["size"].width, this.genotype["size"].height,
            this.genotype["grid"].rows.l, this.genotype["grid"].columns.l, this.genotype["grid"].marginsPos
        );

        this.fitness = sumProduct([semantics, aesthetics], weights);
        this.constraint = legibility + gridAppropriateness;

        this.metrics["constraints"]["legibility"] = legibility;
        this.metrics["constraints"]["gridAppropriateness"] = gridAppropriateness;
        this.metrics["constraints"]["general"] = this.constraint;

        return {
            "fitness": this.fitness,
            "constraints": this.constraint
        }
    }

    typeset = async(pg) => {
        this.sentencesLength = [];

        pg.push();
        pg.translate(pg.width/2, pg.height/2);
        const ctx = pg.drawingContext;

        for (let i in this.genotype.textboxes) {
            const tb = this.genotype.textboxes[i];

            // define text align
            let col = tb["alignment"];
            let align = LEFT;
            if (col === 2) {
                align = CENTER;
            } else if (col === 3) {
                align = RIGHT;
            }
            pg.textAlign(align, BASELINE);

            // position of text
            let xPos =  this.genotype.grid.col(col-1, false);
            let yPos = this.genotype.grid.row(parseInt(i)+1, false);

            // color
            pg.fill(tb["color"]);

            // typeface
            ctx.font = `${tb["weight"]} ${getFontStretchName(tb['font-stretch'])} ${tb["size"]}px ${tb["typeface"]}`;
            drawingContext.font = `${tb["weight"]} ${getFontStretchName(tb['font-stretch'])} ${tb["size"]}px ${tb["typeface"]}`;
            let content = tb["uppercase"] === true ? tb["content"].toUpperCase() : tb["content"];
            pg.text(content, xPos, yPos);

            // const sentenceWidth = pg.textWidth (content);
            const sentenceWidth = ctx.measureText(content).width;

            // debug
            // pg.textSize(10);
            // pg.fill (0)
            // pg.text(sentenceWidth, xPos, yPos+15);
            this.sentencesLength.push(sentenceWidth);
        }
        pg.pop();
    }

    #placeImages = async (pg) => {
        let ready = true;
        for (let img of this.genotype["images"]) {
            if (img["src"] !== undefined && img["src"].hasOwnProperty("ready")) {
                if (img["src"]["ready"]) {
                    let x = pg.width * img.x;
                    let y = pg.height * img.y;
                    pg.imageMode(CENTER);
                    pg.image (img.src,
                        x, y,
                        (img.src.width * img.scale), (img.src.height * img.scale)
                    );
                }
            }  else {
                ready = false;
            }
        }
        return ready;
    }

    toggleGrid = (show = null) => {
        if (show === null) {
            show = !this.#showGrid;
            this.params["display"]["grid"] = show;
        }
        this.#showGrid = show;
        this.draw();
    }
}

const getFontStretchName = (value) => {
    if (value > -10 && value <= 50) {
        return 'ultra-condensed';
    } else if (value > 50 && value <= 62.5) {
        return 'extra-condensed';
    } else if (value > 62.5 && value <= 75) {
        return 'condensed';
    } else if (value > 75 && value <= 87.5) {
        return 'semi-condensed';
    } else if (value > 87.5 && value <= 100) {
        return 'normal';
    } else if  (value > 100 && value <= 112.5) {
        return 'semi-expanded';
    }  else if  (value > 112.5 && value <= 125) {
        return 'expanded';
    } else if  (value > 125 && value <= 150) {
        return 'extra-expanded';
    } else {
        return `ultra-expanded`;
    }
};

class Grid {
    constructor(size, v = 12, h = 24, defaultMargins, gwper = 0.03, ghper = null) {
        if (ghper === null) {
            ghper = gwper;
        }
        this.pos = createVector(size.width/2,size.height/2);
        this.size = JSON.parse(JSON.stringify(size));
        this.defaultMargins = defaultMargins;
        this.v = v;
        this.h = h;
        this.gwper = gwper;
        this.ghper = ghper;
        this.gapw = this.size.width * this.gwper;
        this.gaph = this.size.height * this.ghper;

        this.regular = true;
        this.verticalSpace = [];

        this.marginsPos = {};

        this.columns = {};
        this.columns.y = {};
        this.columns.center = {};
        this.columns.gap = {};

        this.rows = {};
        this.rows.x = {};
        this.rows.center = {};
        this.rows.gap = {};

        this.def();
    }

    export = () => {
        return {
            pos: [this.pos.x, this.pos.y, this.pos.z],
            size: this.size,
            defaultMargins: this.defaultMargins,
            v: this.v,
            h: this.h,
            gapw: this.gapw,
            gaph: this.gaph,
            marginsPos: this.marginsPos,
            columns: this.columns,
            rows: this.rows
        }
    }

    copy = () => {
        return new Grid (
            JSON.parse(JSON.stringify(this.size)),
            JSON.parse(JSON.stringify(this.v)),
            JSON.parse(JSON.stringify(this.h)),
            JSON.parse(JSON.stringify(this.defaultMargins)),
            JSON.parse(JSON.stringify(this.gwper)),
            JSON.parse(JSON.stringify(this.ghper))
        );
    }

    updateMarginsBasedOnSize = (updateDirection = 0, size = 1, nLines, max = this.size.height) => {
        const targetSize = size * nLines;
        let margins = this.size.height - targetSize;
        if (updateDirection === 0) margins = margins / 2;
        if ((updateDirection === 0 || updateDirection === 1) && this.size.margin[1] < max) {
            this.size.margin[1] = margins;
        }
        if ((updateDirection === 0 || updateDirection === 2) && this.size.margin[3] < max) {
            this.size.margin[3] = margins;
        }
        this.def();
    }

    updateMargins = (updateDirection = 0, inc = 1, max = this.size.height) => { //max = this.size.height*.8
        if (updateDirection === 0) inc = inc / 2;
        if ((updateDirection === 0 || updateDirection === 1) && this.size.margin[1] < max) {
            this.size.margin[1] = this.size.margin[1] + inc;
        }
        if ((updateDirection === 0 || updateDirection === 2) && this.size.margin[3] < max) {
            this.size.margin[3] = this.size.margin[3] + inc;
        }
        this.def();
    }

    resetMargins = () => {
        this.size.margin = this.defaultMargins;
        this.marginsPos.left = this.size.margin[0] * this.size.width;
        this.marginsPos.top = this.size.margin[1] * this.size.height;
        this.marginsPos.right = this.size.margin[2] * this.size.width;
        this.marginsPos.bottom = this.size.margin[3] * this.size.height;
        this.def();
    }

    def = () => {
        this.#defMargins();
        this.#defVertical();
        this.#defHorizontal();
    }

    update = (rows = null) => {
        if ((rows !== null) && (rows !== this.v)) {
            console.log(`grid updated from ${this.v} to ${rows}`);
        }
    }

    defineRow = (id, size, align) => {
        this.regular = false;
        const init = this.rows.l[id];
        this.rows.l[id] = size;
        let dif = this.rows.l[id]-init;
        // center: update the two margins
        dif = (align === 2) ? dif/2 : dif;
        // const percent = (this.marginsPos.bottom - dif) / this.size.height;
        if (align <= 2) {
            // top and center
            this.size.margin[3] = (this.marginsPos.bottom - dif) / this.size.height;
        }
        if (align >= 2){
            // button and center
            this.size.margin[1] = (this.marginsPos.top - dif) / this.size.height;
        }

        this.def();
    }

    #defMargins = () => {
        this.marginsPos.left = this.size.margin[0] * this.size.width;
        this.marginsPos.top = this.size.margin[1] * this.size.height;
        this.marginsPos.right = this.size.margin[2] * this.size.width;
        this.marginsPos.bottom = this.size.margin[3] * this.size.height;
    }

    getSpace = () => {
        const meanRows = this.rows.l.reduce((a, b) => a + b, 0) / this.rows.l.length;
        return {
            "centre": {
                col: this.columns.l,
                row: meanRows
            },
            "gap": {
                col: (this.columns.l - (this.gapw / 2)),
                row: (meanRows - (this.gaph / 2))
            }

        }
    }

    #defVertical = () => {
        this.columns.y.top = -(this.size.height / 2) + this.marginsPos.top; //(this.marginsPos.top
        this.columns.y.bottom = (this.size.height / 2) - (this.marginsPos.bottom);

        const inc = (this.size.width - (this.marginsPos.left + this.marginsPos.right)) / this.v;
        let horizontalSpace = [];
        for (let i=0; i<this.v; i++) {
            horizontalSpace.push(inc);
        }
        this.columns.l = horizontalSpace;

        // start cod of x
        let x = -(this.size.width / 2) + this.marginsPos.left;

        for (let y = 0; y < (this.v + 1); y++) {
            // center ruler
            this.columns.center[y] = x + (inc * y);

            // gap
            this.columns.gap[y] = {};

            if (y > 0 && y < (this.v)) {
                this.columns.gap[y].right = this.columns.center[y] + (this.gapw / 2);
                this.columns.gap[y].left = this.columns.center[y] - (this.gapw / 2);
            } else {
                this.columns.gap[y].right = this.columns.center[y];
                this.columns.gap[y].left = this.columns.center[y];
            }
        }
    }

    defHorizontalUsingSize = (size) => {
        this.rows.x.left = -(this.size.width / 2) + this.marginsPos.left;
        this.rows.x.right = (this.size.width / 2) - this.marginsPos.right;
        const inc = size;
        this.rows.l = inc;
        let y = -(this.size.height / 2) + this.marginsPos.top;
        for (let x = 0; x < (this.h + 1); x++) {
            // center rulers
            this.rows.center[x] = y + (inc * x);
            // gap
            this.rows.gap[x] = {};
            if (x > 0 && x < (this.h)) {
                this.rows.gap[x].bottom = this.rows.center[x] + (this.gaph / 2);
                this.rows.gap[x].top = this.rows.center[x] - (this.gaph / 2);
            } else {
                this.rows.gap[x].bottom = this.rows.center[x];
                this.rows.gap[x].top = this.rows.center[x];
            }
        }
    }

    #defHorizontal = () => {
        // horizontal margins
        this.rows.x.left = -(this.size.width / 2) + this.marginsPos.left;
        this.rows.x.right = (this.size.width / 2) - this.marginsPos.right;
        const inc = (this.size.height - (this.marginsPos.top + this.marginsPos.bottom)) / this.h;
        if (this.verticalSpace === null || this.verticalSpace.length !== this.h || this.regular) {
            this.verticalSpace = [];
            for (let i = 0; i < this.h; i++) {
                this.verticalSpace.push(inc);
            }
        }
        this.rows.l = this.verticalSpace;
        let y = -(this.size.height / 2) + this.marginsPos.top;
        let value = 0;
        for (let x = 0; x < (this.h + 1); x++) {
            // center rulers
            if (isNaN(value)) value = 0;
            this.rows.center[x] = y + value;
            if (x > this.h) {
                value += parseInt(this.rows.l[x - 1]);
            } else {
                value += parseInt(this.rows.l[x]);
            }
            // gap
            this.rows.gap[x] = {};
            if (x > 0 && x < (this.h)) {
                this.rows.gap[x].bottom = this.rows.center[x] + (this.gaph / 2);
                this.rows.gap[x].top = this.rows.center[x] - (this.gaph / 2);
            } else {
                this.rows.gap[x].bottom = this.rows.center[x];
                this.rows.gap[x].top = this.rows.center[x];
            }
        }
    }

    col = (n, center = false) => {
        if (n < (this.v + 1) && n >= 0) {
            if (center) {
                return this.columns.center[n];
            } else {
                return this.columns.gap[n].right;
            }
        }
        console.error(`this col dod not exists in grid. requested number ${n}`);
        return 0;
    }

    row = (n, center = false) => {
        if (n < (this.h + 1) && n >= 0) {
            if (center) {
                return this.rows.center[n];
            } else {
                return this.rows.gap[n].top;
            }
        }
        console.error(`this row do not exists in grid. requested number ${n}`);
        return 0;
    }

    getAvailableWidth = (margins = true) => {
        if (margins) {
            return this.size.width - (this.size.width * this.size.margin[0]) - (this.size.width * this.size.margin[2]);
        } else {
            return this.size.width;
        }
    }

    width = (n, center = false, inMargin = false) => {
        if (n < (this.v + 1) && n > 0) {
            if (center) {
                return (this.columns.l * n);
            } else {
                if (n === (this.v)) {
                    return (this.columns.l * n);
                } else if (inMargin) {
                    return (this.columns.l * n) - (this.gapw / 2);
                }

                return (this.columns.l * n) - (this.gapw);
            }
        }

        console.error(`side bigger than grid. requested side ${n}`);
        return 0;
    }

    height = (n, center = false, inMargin = false) => {
        if (n < (this.h + 1) && n > 0) {
            if (center) {
                return (this.rows.l * n);
            } else {
                if (n === (this.h)) {
                    return (this.rows.l * n);
                } else if (inMargin) {
                    return (this.rows.l * n) - (this.gaph / 2);
                }

                return (this.rows.l * n) - (this.gaph);
            }
        }

        console.error(`side bigger than row grid. requested side ${n}`);
        return 0;
    }

    display = (pg, margins = true, cols = true, rows = true) => {
        pg.push();
        pg.translate(this.size.width/2, this.size.height/2);
        // columns
        if (cols) this.#displayCols(pg);
        // rows
        if (rows) this.#displayRows(pg);
        // display margins
        if (margins) this.#displayMargins(pg);
        pg.pop();
    }

    #displayMargins = (pg, c = '#0000ff') => {
        pg.push();
        pg.stroke(c);
        pg.rectMode(CORNER);
        pg.noFill();
        /*pg.rect(
            this.rows.x.left,
            this.columns.y.top,
            (this.size.width - (this.marginsPos.left + this.marginsPos.right)),
            (this.size.height - (this.marginsPos.top + this.marginsPos.bottom))
        );*/
        pg.rect(
            this.rows.x.left,
            this.columns.y.top,
            (this.size.width - (this.marginsPos.left + this.marginsPos.right)),
            (this.size.height - (this.marginsPos.top + this.marginsPos.bottom))
        );
        pg.pop();
    }

    #displayCols = (pg, ccenter = '#ff00ff', cgap = '#009800') => {
        pg.push();
        pg.stroke(ccenter);
        for (let key of Object.keys(this.columns.center)) {
            const col = this.columns.center[key];
            pg.line(col, this.columns.y.top, col, this.columns.y.bottom);
        }
        pg.stroke(cgap);
        for (let key of Object.keys(this.columns.gap)) {
            const col = this.columns.gap[key];
            if (key !== '0' && key !== "" + this.v) {
                pg.line(col.left, this.columns.y.top, col.left, this.columns.y.bottom);
                pg.line(col.right, this.columns.y.top, col.right, this.columns.y.bottom);
            }
        }
        pg.pop();
    }

    #displayRows = (pg, ccenter = '#ff00ff', cgap = '#009800') => {
        pg.push();
        pg.stroke(ccenter);

        for (let key of Object.keys(this.rows.center)) {
            const row = this.rows.center[key];
            pg.line(this.rows.x.left, row, this.rows.x.right, row);
        }
        pg.stroke(cgap);
        for (let key of Object.keys(this.rows.gap)) {
            key = parseInt(key);
            const row = this.rows.gap[key];
            if (key !== 0 && key !== this.h) {
                pg.text(key, this.rows.x.left+this.rows.x.right/2, row.top);
                pg.line(this.rows.x.left, row.top, this.rows.x.right, row.top);
                pg.line(this.rows.x.left, row.bottom, this.rows.x.right, row.bottom);
            }
        }
        pg.pop();
    }

}

const SIZE_MUTATION_ADJUST = evoPoster_config["evo"] !== undefined ? evoPoster_config["evo"]["SIZE_MUTATION_ADJUST"] : 5;
const TOURNAMENT_SIZE = evoPoster_config["evo"] !== undefined ? evoPoster_config["evo"]["TOURNAMENT_SIZE"] : 10;
const MAX_COLOR_SCHEME_ATTEMPT = evoPoster_config["color"] !== undefined ? evoPoster_config["color"]["MAX_COLOR_SCHEME_ATTEMPT"] : 200;
const SAVE_LOG = evoPoster_config["log"] !== undefined ? evoPoster_config["log"]["SAVE_LOG"] : true;
const SAVE_IMAGES = evoPoster_config["log"] !== undefined ? evoPoster_config["log"]["SAVE_IMAGES"] : `NO`;
const VISIBLE_POSTERS$1 = evoPoster_config["display"] !== undefined ? evoPoster_config["display"]["VISIBLE_POSTERS"] : 10;
const MARGIN_Y$1 = evoPoster_config["display"] !== undefined ? evoPoster_config["display"]["MARGIN_Y"] : 10;
const WIDTH = evoPoster_config["size"] !== undefined ?  evoPoster_config["size"]["WIDTH"] : 100;

class Population {
    #typefaces;
    #data;
    constructor(params, data) {
        this.size = params["evo"]["popSize"];
        this.params = params;
        this.population = [];
        this.generations = 0;
        this.id = Date.now();
        this.ready = false;
        this.evolving = false;
        this.pause = false;
        this.#data = data;
        this.targetSemanticLayout = this.#calculateSemanticTargetLayout(this.#data);
        this.emotionaData = this.#data["classification"]["emotions"]["data"];

        this.#typefaces = [];
        this.updated = true;

        this.log = {
            config: this.params,
            generations: []
        };

        this.initialisation();
    }

    initialisation = async () => {
        this.updated = true;
        this.generations = 0;

        this.#cleanGraphics();

        // init individuals
        for (let i=0; i<this.size; i++) {
            const poster = new Poster(i, this.generations, this.params);
            this.population.push(poster);
            // save typefaces used
            const posterFonts = poster.genotype.textboxes.map((t) => t.typeface);
            for (const f of posterFonts){
                if (this.#typefaces.indexOf(f) === -1) {
                    this.#typefaces.push(f);
                }
            }
        }

        // evaluate
        await this.evaluate();
        this.updated = true;
    }

    evolve = async () => {
        const offspring = [];

        // clean graphics hidden on canvas
        await this.#cleanGraphics();
        document.getElementById(`generation-number`).textContent=this.generations;


        // copy the elite to next generation
        const eliteSize = parseInt(this.params["evo"]["eliteSize"]);
        for (let i=0; i<eliteSize; i++) {
            offspring.push(this.population[i].copy());
        }

        let fitness = this.population.map((ind) => ind.fitness);
        let constraints = this.population.map((ind) => ind.constraint);

        // select the indices using Stochastic Ranking
        const rank = await this.#stochasticRanking(fitness, constraints);

        // crossover
        for (let i = eliteSize; i < this.params["evo"]["popSize"]; i++) {
            if (Math.random() <= this.params["evo"]["crossoverProb"]) {
                const parents = this.#rankingTournament(rank, TOURNAMENT_SIZE, 2);
                // crossover method
                const child = await this.uniformCrossover(this.population[parents[0]], this.population[parents[1]]);
                offspring.push(child);
            } else {
                const ind = this.#rankingTournament(rank, TOURNAMENT_SIZE, 1);
                offspring.push(this.population[ind[0]].copy());
            }
        }

        // mutation
        for (let i = eliteSize; i < offspring.length; i++) {
            await this.mutate(offspring[i]);
        }

        // replace the individuals in the population with the new offspring
        this.population = offspring;

        // evaluate
        await this.evaluate();

        // log config data to file
        if (this.generations === 0)  {
            this.log["config"] = this.params;
        }

        // log population stats
        const genData = [];
        for (let ind of this.population) {
            genData.push({
                genotype: {
                    background: ind["genotype"]["background"],
                    size: ind["genotype"]["size"],
                    textboxes: ind["genotype"]["textboxes"],
                    typography: ind["genotype"]["typography"]
                },
                fitness: ind.fitness,
                constraint: ind.constraint,
                metrics: ind.metrics
            });
        }
        this.log["generations"].push({
            gen: this.generations,
            data: genData
        });

        this.generations++;
        this.updated = true;

        if(this.generations < this.params["evo"]["noGen"] && !this.pause) {
            let ms = 100;

            if (SAVE_IMAGES === `GENERATION` &&  SAVE_LOG) {
                console.log (`this.population size`, this.population.length);
                this.saveRaster(this.population.length);
                ms = 2000;
            } else if (SAVE_IMAGES === `BEST-GENERATION` &&  SAVE_LOG) {
                this.saveRaster(1);
            }
            // need to possible to visualise the posters evolving
            setTimeout(() => {
                this.evolve();
            }, ms);
        } else {
            this.evolving = false;
            if (!this.pause && SAVE_LOG) {
                if (SAVE_IMAGES === `END`) {
                    this.saveRaster(this.population.length);
                }
                await fetch(`/insert`, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(this.log),
                }).then((data) => {
                    console.log(`log data saved to file`);
                }).catch((err) => console.error(err));
            }


            console.group (`stats`);
            console.log (this.log);
            console.groupEnd();
        }
    }

    uniformCrossover = (parentA, parentB) => {
        const child = parentA.copy();
        parentB = parentB.copy();
        // text align
        if (Math.random() > 0.5) {
            // child.genotype["grid"] = parentB.genotype["grid"];
            // grid is defined based on the verticalAlignment
            child.genotype["typography"]["verticalAlignment"] = parentB.genotype["typography"]["verticalAlignment"];
        }
        // textboxes
        for (const i in child.genotype["textboxes"]) {
            if (Math.random() > 0.5) {
                child.genotype["textboxes"][i] = parentB.genotype["textboxes"][i];
            }
        }
        // force update size
        // child.genotype["grid"].resetMargins();
        child.genotype["grid"] = new Grid(this.params.size, 2, this.params.sentences.length, this.params.size.margin);
        for (const i in child.genotype["textboxes"]) {
            const tb = child.genotype["textboxes"][i];
            const typefaceIndex = this.params["typography"]["typefaces"].map(t => t.family).indexOf(tb["typeface"]);
            const leading = this.params["typography"]["typefaces"][typefaceIndex]["leading"];
            child.genotype["grid"].defineRow(i, (tb["size"] * leading), child.genotype["typography"]["verticalAlignment"]);
        }
        // background
        // style
        if (Math.random() > 0.5) {
            child.genotype["background"]["style"] = parentB.genotype["background"]["style"];
        }
        // colours
        // designed to maintain the colour scheme
        if (Math.random() > 0.5) {
            child.genotype["background"]["colors"][0] = parentB.genotype["background"]["colors"][0];
            child.genotype["background"]["colors"][1] = parentB.genotype["background"]["colors"][1];
            for (const i in child.genotype["textboxes"]) {
               child.genotype["textboxes"][i]["color"] = parentB.genotype["textboxes"][i]["color"];
            }
        } else {
            // designed to maintain the colour scheme
            let original = parentA.genotype["textboxes"][0]["color"];
            let c = original["levels"] ? color(original["levels"][0],original["levels"][1], original["levels"][2]) : color(original);
            for (const i in child.genotype["textboxes"]) {
                child.genotype["textboxes"][i]["color"] = c;
            }
        }
        //images
        for (const i in child.genotype["images"]) {
            if (Math.random() > 0.5) {
                child.genotype["images"][i] = parentB.genotype["images"][i];
            }
        }
        return child;
    }

    mutate = (ind) => {
        // mutate background style
        let prob = this.params["evo"]["mutationProb"];

        // colours scheme
        if (Math.random() < prob) {
            let colorContrast = false;
            let colorScheme;
            let colorAttempt = 0;
            while (!colorContrast || colorAttempt > MAX_COLOR_SCHEME_ATTEMPT) {
                colorScheme = randomScheme();
                colorContrast = contrastChecker(colorScheme["baseColour"], colorScheme["colorA"], colorScheme["colorB"]);
                colorAttempt++;
            }

            // mutate background colours
            if (!this.params["background"]["lock"][1]) {
                ind.genotype["background"]["colors"][0] = colorScheme.colorA;
                ind.genotype["background"]["colors"][1] = colorScheme.colorB;
            }
            // typography colour
            if (!this.params["typography"]["lock"][1]) {
                for (let tb of ind.genotype.textboxes) {
                    tb["color"] = colorScheme.baseColour;
                }
            }
        }

        // background style
        if (Math.random() < prob && !this.params["background"]["lock"][0]) {
            ind.genotype["background"]["style"] = Math.round(1+Math.random()*2);
        }

        // vertical alignment
        if (Math.random() < prob) {
            ind.genotype["typography"]["verticalAlignment"] = Math.round(1+Math.random()*2);
        }

        // textboxes
        let sizeChanged = false;
        for (let i in ind.genotype.textboxes) {
            let tb = ind.genotype.textboxes[i];

            // textAlignment
            if (Math.random() < prob && !this.params["typography"]["lock"][7]) {
                tb["textAlignment"] = Math.round(1+Math.random()*2);
            }

            // get current typeface
            let selectedTypeface = 0;
            for (let i = 0; i<this.params["typography"]["typefaces"].length; i++) {
                if (tb["typeface"] === this.params["typography"]["typefaces"][i].family) {
                    selectedTypeface = i;
                    break;
                }
            }

            // typeface
            if (Math.random() < prob && this.params["typography"]["typefaces"].length > 1) {
                const r = Math.round(Math.random()*(this.params["typography"]["typefaces"].length-1));
                selectedTypeface = r;
                tb["typeface"] = this.params["typography"]["typefaces"][r]["family"];
            }

            if (Math.random() < prob) {
                let size = Math.round(tb["size"] + -SIZE_MUTATION_ADJUST+(Math.random()*SIZE_MUTATION_ADJUST));
                // check if inside typeface min and max thresholds
                size = Math.min(Math.max(size, ind.minFontSize), ind.maxFontSize);
                tb["size"] = size;
                sizeChanged = true;
            }

            // weight
            if (Math.random() < prob) {
                const availableWeights = this.params["typography"]["typefaces"][selectedTypeface]["weight"];
                const minWeight = Math.max(parseInt(availableWeights[0]), this.params["typography"]["weight"]["min"]);
                const maxWeight = Math.min(parseInt(availableWeights[1]), this.params["typography"]["weight"]["max"]);
                tb["weight"] = Math.round(Math.random() * (maxWeight - minWeight) + minWeight);
            }

            // stretch
            if (Math.random() < prob) {
                let availableStretch = this.params["typography"]["typefaces"][selectedTypeface]["stretch"];
                const minStretch = Math.max(parseInt(availableStretch[0]), this.params["typography"]["stretch"]["min"]);
                const maxStretch = Math.min(parseInt(availableStretch[1]), this.params["typography"]["stretch"]["max"]);
                tb["stretch"] = Math.round(Math.random() * (maxStretch - minStretch) + minStretch);
            }
            // uppercase not mutates*/
        }

        // reset grid
        if (sizeChanged) {
            // ind.genotype["grid"].resetMargins();
            ind.genotype["grid"] = new Grid(this.params.size, 2, this.params.sentences.length, this.params.size.margin);
            for (let i in ind.genotype["textboxes"]) {
                const tb = ind.genotype["textboxes"][i];
                const typefaceIndex = this.params["typography"]["typefaces"].map(t => t.family).indexOf(tb["typeface"]);
                const leading = this.params["typography"]["typefaces"][typefaceIndex]["leading"];
                ind.genotype["grid"].defineRow(i, (tb["size"] * leading), ind.genotype["typography"]["verticalAlignment"]);
            }
        }


        for (let img of ind.genotype["images"]) {
            if (Math.random() < prob) {
                img["scale"] = Math.random();
                img["x"] = Math.random();
                img["y"] = Math.random();
            }
        }
    }

    toggleGrid = (show) => {
        for (let poster of this.population) {
           poster.toggleGrid(show);
        }
        this.updated = true;
    }

    evaluate = async () => {
        // force evaluation of individuals
        for (let individual of this.population) {
            await individual.evaluate(this.targetSemanticLayout, this.emotionaData);
        }


        // sort the population based on staticPenalty
        // enables visualisation and elite
        // sort individuals in the population by fitness (the fittest first)
        await this.#staticPenalty();
    }

    #stochasticRanking = async (fitness, constraints, pF= 0.45) => { //0.45
        let populationSize = this.population.length;
        let indices = Array.from(Array(populationSize).keys());

        for (let i=0; i<populationSize; i++) {
            let noSwap = true;
            for (let j=0; j<populationSize-1; j++) {
                let u = Math.random();
                if ((constraints[indices[j]] === 0 && constraints[indices[j + 1]] === 0) || u <= pF) {
                    if (fitness[indices[j]] > fitness[indices[j + 1]]) {
                        swap(indices, j, j + 1);
                        noSwap = false;
                    } else {
                        if (constraints[indices[j]] > constraints[indices[j + 1]]) {
                            swap(indices, j, j + 1);
                            noSwap = false;
                        }
                    }
                }
            }
            if (noSwap) {
                break;
            } else {
                noSwap = true;
            }
        }
        return indices;
    }

    #staticPenalty = async () => {
        this.population = this.population.sort((a,b) => (b.fitness-b.constraint) - (a.fitness-a.constraint));
    }

    copy = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }

    // ranking based
    // return n individuals
    // More the selection pressure more will be the Convergence rate
    #rankingTournament = (rank, tournamentSize = 5, parentSize = 2, sp = 2) => {
        // check the tournament size and parentSize
        tournamentSize = tournamentSize < parentSize ? parentSize : tournamentSize;
        let parents = [];
        // select the pool of parents
        let pool = [];
        for (let i = 0; i < tournamentSize; i++) {
            const r = Math.round(Math.random() * (rank.length - 1));
            pool.push(r);
        }
        // sort by ranking
        pool.sort((a, b) => a - b);
        // define the probability based on ranking fitness
        let probabilities = pool.map((ind) => {
            return sp - (2 * ind * (sp - 1.0)) / (this.population.length - 1);
        });
        // normalize to sum up to 1
        const probabilitiesSum = sumArr(probabilities);
        probabilities = probabilities.map((p) => p / probabilitiesSum);
        probabilities = shuffleArr(probabilities);
        for (let j = 0; j < parentSize; j++) {
            let ix = sus(probabilities);
            // sus
            parents.push(parseInt(ix));
        }
        return parents;
    }

    // draw aux function
    // verify if the necessary fonts are loaded
    #checkTypeface = () => {
        for (let font of this.#typefaces) {
            const isLoaded = document.fonts.check(`12px ${font}`);
            if (!isLoaded) {
                return false;
            }
        }
        return true;
    }

    // draw aux function
    // clean old files
    #cleanGraphics = () => {
        const graphics = document.querySelectorAll(`canvas:not(#defaultCanvas0)`);
        graphics.forEach((el) => {
            el.remove();
        });
    }

    draw = async () => {
        this.updated = false;
        // commented by dev purposes
        /* const typefacesLoaded = this.#checkTypeface();
        if (!typefacesLoaded || (typefacesLoaded && !this.ready)) {
            this.updated = true;
            await this.evaluate();
            this.ready = typefacesLoaded;
        } */

        const n = this.population.length < VISIBLE_POSTERS$1 ? this.population.length : VISIBLE_POSTERS$1;
        let posX = 0, posY = 0;
        for (let i=0; i<this.population.length; i++) {
            const ind = this.population[i];
            if (!ind.ready) {
                this.updated = true;
            }

            // ensure that phenotype is created
            if (ind.phenotype === null) {
                this.updated = true;
                await ind.evaluate(this.targetSemanticLayout, this.emotionaData);
            }

            // display
            if (i < n) {
                // get phenotype
                let pg = ind.phenotype;
                const sideX = width / Math.floor(width / WIDTH);
                const sideY = ind.genotype.grid.size.height + MARGIN_Y$1;
                const x = posX * sideX + sideX / 2;
                const y = posY * sideY + sideY / 2;

                // draw posters on canvas
                push();
                // translate(-width / 2, -height / 2);
                imageMode(CENTER);
                image(pg, x, y);
                textSize(10);
                pop();

                // remove the graphics from canvas and free the resources
                // pg.remove();

                posX += 1;
                if (posX % Math.floor(width / WIDTH) === 0) {
                    posX = 0;
                    posY += 1;
                }
            }
        }

    }

    saveRaster = async (size = this.population.length) => {
        for (let i=0; i<size; i++) {
            const ind = this.population[i];
            await save(ind.phenotype, `${this.id}-${this.generations}-${i}`);
        }
    }

    #calculateSemanticTargetLayout = (data, emphasis= 0.1) => {
        // emphasis is the min importance in layout of neutrals (between 0.1 and 1)
        // emotional score is added to the emphasis
        let dist = [];
        for (let sentence of data["lexicon"]["sentences"]) {
            let amount = sentence["emotions"]["data"]["recognisedEmotions"].length;
            let emotions = sentence["emotions"]["data"]["recognisedEmotions"].map((e) => e[0]);
            let score = sentence["emotions"]["data"]["recognisedEmotions"].reduce((accumulator, a) => {
                return accumulator + a[1];
            }, 0);
            score +=emphasis;
            dist.push([amount, emotions, score]);
        }
        const sum = sumArr(dist.map((d) => d[2]));
        // normalised value
        dist = dist.map((d) => {
            return [d[0],d[1],d[2],Math.round(d[2]/sum*100)/100];
        });
        return dist;
    }
}

const VISIBLE_POSTERS =  evoPoster_config["display"] !== undefined ? evoPoster_config["display"]["VISIBLE_POSTERS"] : 10;
const MARGIN_Y =  evoPoster_config["display"] !== undefined ? evoPoster_config["display"]["MARGIN_Y"] : 10;
const POP_SIZE = evoPoster_config["evo"]["POP_SIZE"];
const SIZE = evoPoster_config["size"];
const BACKGROUND = evoPoster_config["color"]["BACKGROUND"];
const TYPOGRAPHY = evoPoster_config["typography"];
const TYPEFACES = evoPoster_config["typefaces"];
const EVAL_WEIGHTS = [evoPoster_config["evaluation"]["GLOBAL_WEIGHTS"]["SEMANTICS"], evoPoster_config["evaluation"]["GLOBAL_WEIGHTS"]["AESTHETICS"]];
const SEMANTICS_WEIGHTS = [evoPoster_config["evaluation"]["SEMANTICS_WEIGHTS"]["EMPHASIS"],
    evoPoster_config["evaluation"]["SEMANTICS_WEIGHTS"]["LAYOUT"], evoPoster_config["evaluation"]["SEMANTICS_WEIGHTS"]["VISUALS"]];
const AESTHETICS_WEIGHTS = [evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["ALIGNMENT"], evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["REGULARITY"],
    evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["JUSTIFICATION"], evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["TYPEFACE_PARING"],
    evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["WHITE_BALANCE_FRACTION"], evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["BALANCE"]];



class App extends s$1 {
    static properties = {
        screen: 0,
        results: {},
        evolving: false
    }

    constructor() {
        super();
        this.results = null;
        this.screen = 0;
        this.evolving = false;

        const fonts = this.#getAvailableTypefaces();

        // evolution controllers
        this.config = {
            evo: {
                popSize: POP_SIZE,
                noGen: evoPoster_config["evo"]["NO_GEN"],
                crossoverProb: evoPoster_config["evo"]["CROSSOVER_PROB"],
                mutationProb: evoPoster_config["evo"]["MUTATION_PROB"],
                eliteSize: evoPoster_config["evo"]["ELITE_SIZE"]
            },
            evaluation: {
                weights: EVAL_WEIGHTS.map((x) => x/sumArr(EVAL_WEIGHTS)),
                aestheticsWeights: AESTHETICS_WEIGHTS.map ((x) => x/sumArr(AESTHETICS_WEIGHTS)),
                semanticsWeights: SEMANTICS_WEIGHTS.map((x) => x/sumArr(SEMANTICS_WEIGHTS)),
                modes: {
                    semanticsVisuals: evoPoster_config["evaluation"]["MODES"]["SEMANTICS_VISUALS"]
                }
            },
            size: {
                width: SIZE.WIDTH,
                height: SIZE.HEIGHT,
                margin: SIZE.MARGINS
            },
            images: [],
            sentences: null,
            background: {
                style: 0,
                color: {
                    random: true,
                    valueA: BACKGROUND["DEFAULT_COLORS"][0],
                    valueB: BACKGROUND["DEFAULT_COLORS"][1],
                },
                lock: [false, false]
            },
            typography: {
                verticalAlignment: 0,
                color:  {
                    random: true,
                    value: TYPOGRAPHY["DEFAULT_COLOR"],
                },
                textAlignment: 0,
                typefaces: fonts.typefaces,
                weight: fonts.weight,
                stretch: fonts.stretch,
                uppercase: false,
                lock: [false, false, false, false, false, false, false, false]
            },
            display: {
                grid: evoPoster_config["display"]["GRID"] !== undefined ? evoPoster_config["display"]["GRID"] : true
            }
        };


        this.population = null;

        // ui components
        this.errorMessage = new ErrHandler();
        this.resultsContainer = new ResultsContainer();
        this.inputForm = new InputForm(this.analyse, this.resultsContainer,  this.errorMessage);
        this.header = new Header();
        this.initPopForm = new Interface(this.config, this.#initPopulation, this.population, this.errorMessage);

        // misc
        document.getElementById(`defaultCanvas0`).style.visibility = "visible";
        this.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
    }

    #getAvailableTypefaces = () => {
        const fonts = {
            typefaces: [],
            weight: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            },
            stretch: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            }
        };

        for (let font of Array.from(document.fonts)) {
            if (Object.keys(TYPEFACES).includes(font.family)) {
                let stretch = font.stretch.replaceAll(`%`, ``);
                let stretchValues = [100, 100];
                if (stretch !== `normal`) {
                    stretchValues = stretch.split(" ").map((x) => parseInt(x));
                }

                if (fonts.stretch.min > stretchValues[0]) {
                    fonts.stretch.min = stretchValues[0];
                }
                if (fonts.stretch.max < stretchValues[1]) {
                    fonts.stretch.max = stretchValues[1];
                }
                let weightValues = font.weight.split(" ").map((x) => parseInt(x));
                if (fonts.weight.min > weightValues[0]) {
                    fonts.weight.min = weightValues[0];
                }
                if (fonts.weight.max < weightValues[1]) {
                    fonts.weight.max = weightValues[1];
                }
                font.load();
                fonts.typefaces.push({
                    family: font.family,
                    weight: weightValues,
                    stretch: stretchValues,
                    tags: TYPEFACES[font.family]["tags"],
                    category: TYPEFACES[font.family]["category"],
                    leading: TYPEFACES[font.family]["leading"]
                });
            }
        }
        return fonts;
    }

    analyse = async () => {
        const formData = this.inputForm.data();
        let params = formData.shouldDivide ? `text` : `lines/${formData.delimiter}`;
        let req = `/${params}/${formData.lang}/${formData.textContent}`;

        fetch(req).then((response) => response.json()).then((res) => {
           this.results = res;
           if (res.success === false) {
               this.errorMessage.set(res);
           }
            this.resultsContainer.set(this.results);
            this.inputForm.dis();
            this.screen = 1;
        }).catch((err) => {
            this.errorMessage.set(err);
        });
    }

    setupEvolution = (e) => {
        e.preventDefault();
        this.screen = 2;
        // get images
        this.config.images = Array.from(document.querySelectorAll(`#input-images img`));


        this.#initCanvas();
        this.#initPopulation();


        // check initialisation of population
        /* setInterval(()=> {
            console.log(`init new pop`);
            this.#initPopulation();
        }, 2000) */
    }


    #initPopulation = (size = false) => {
        if (size) {
            this.#initCanvas();
        }

        // clean the display old population
        background(this.backgroundColor);

        if (this.results !== null) {
            if (this.config["sentences"] == null) {
                this.config["sentences"] = this.results.sentences;
            }
            this.population = new Population(this.config, this.results);
            // this.population.initialisation();
            this.initPopForm.pop = this.population;
            this.screen = 3;
            this.header.showControls();

        } else {
            this.errorMessage.set({msg: "text input not defined. Not possible to init population"});
        }
    }

    #initCanvas = () => {
        // calculate the height of canvas
        let numberOfPosters = VISIBLE_POSTERS > POP_SIZE ? POP_SIZE : VISIBLE_POSTERS;
        let h = Math.ceil(numberOfPosters / Math.floor(windowWidth/this.config.size.width));
        h *= this.config.size.height + MARGIN_Y * 2;
        createCanvas(windowWidth, h); // WEBGL
        loop();
    }

    #nextBts = () => {
        return x$1`
            <div class="container-fluid">
                <button type="button" id="btReload" @click="${() => {window.location.reload();}}"
                                class="btn btn-secondary my-2 nextBts">
                    New Analysis
                </button>
                <button type="button" @click="${this.setupEvolution}" id="bt-start-evo"
                    class="btn btn-primary my-2 nextBts mx-3">
                    Next
                </button>
            </div>`;
    }

    save () {
        this.population.saveRaster();
    }

    render() {
        return x$1`
            ${this.errorMessage}
            ${this.header}
            ${this.screen === 3 ? this.initPopForm : A$1}
            ${this.screen < 2 ? 
                x$1`<div id="input-module" class="container-fluid">
                    ${this.resultsContainer}
                    ${this.inputForm}
                    ${this.screen === 1 ? this.#nextBts() : A$1}
                </div>` :
            A$1 }
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('app-evo', App);

/*!
  * Bootstrap v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core')) :
  typeof define === 'function' && define.amd ? define(['@popperjs/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory(global.Popper));
})(undefined, (function (Popper) {
  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Popper__namespace = /*#__PURE__*/_interopNamespaceDefault(Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }
      const instanceMap = elementMap.get(element);

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);

      // free up element references if there are no instances left for an element
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend';

  /**
   * Properly escape IDs selectors to handle weird IDs
   * @param {string} selector
   * @returns {string}
   */
  const parseSelector = selector => {
    if (selector && window.CSS && window.CSS.escape) {
      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };

  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  /**
   * Public Util API
   */

  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    }

    // Get transition-duration of the element
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  const isElement = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }
    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }
    return typeof object.nodeType !== 'undefined';
  };
  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
    // Handle `details` element as its content may falsie appear visible when it is closed
    const closedDetails = element.closest('details:not([open])');
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest('summary');
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains('disabled')) {
      return true;
    }
    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }
    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };
  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  const noop = () => {};

  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */
  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }
    return null;
  };
  const DOMContentLoadedCallbacks = [];
  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  const isRTL = () => document.documentElement.dir === 'rtl';
  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
  };
  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */
  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);

    // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage
  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, {
            delegateTarget: target
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string';
    // TODO: tooltip passes `false` instead of selector, so we need to check
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }
  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');
      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, {
        bubbles,
        cancelable: true
      }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === '' || value === 'null') {
      return null;
    }
    if (typeof value !== 'string') {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }
  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return {
        ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement(value) ? 'element' : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const VERSION = '5.3.0';

  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }

    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');
    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href');

      // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273
      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      }

      // Just in case some CMS puts out a full URL with the anchor appended
      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }
    return parseSelector(selector);
  };
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);

      // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$f = 'alert';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';

  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    }

    // Public
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }

    // Private
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Alert, 'close');

  /**
   * jQuery
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$e = 'button';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

  /**
   * Class definition
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    }

    // Public
    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);
        if (config === 'toggle') {
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/swipe.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$d = 'swipe';
  const EVENT_KEY$9 = '.bs.swipe';
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  const DefaultType$c = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  };

  /**
   * Class definition
   */

  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;
      if (!element || !Swipe.isSupported()) {
        return;
      }
      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);
      this._initEvents();
    }

    // Getters
    static get Default() {
      return Default$c;
    }
    static get DefaultType() {
      return DefaultType$c;
    }
    static get NAME() {
      return NAME$d;
    }

    // Public
    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    }

    // Private
    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }
    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      execute(this._config.endCallback);
    }
    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
      }
    }
    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }

    // Static
    static isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$c = 'carousel';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const ARROW_LEFT_KEY$1 = 'ArrowLeft';
  const ARROW_RIGHT_KEY$1 = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
  };
  const DefaultType$b = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  };

  /**
   * Class definition
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._addEventListeners();
      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    }

    // Getters
    static get Default() {
      return Default$b;
    }
    static get DefaultType() {
      return DefaultType$b;
    }
    static get NAME() {
      return NAME$c;
    }

    // Public
    next() {
      this._slide(ORDER_NEXT);
    }
    nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
    prev() {
      this._slide(ORDER_PREV);
    }
    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    }
    cycle() {
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }
      this.cycle();
    }
    to(index) {
      const items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }
      const activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order, items[index]);
    }
    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }
    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
      }
      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }
    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
      }
      const endCallBack = () => {
        if (this._config.pause !== 'hover') {
          return;
        }

        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };
      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    }
    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }
    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    }
    _updateInterval() {
      const element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }
    _slide(order, element = null) {
      if (this._isSliding) {
        return;
      }
      const activeElement = this._getActive();
      const isNext = order === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      const nextElementIndex = this._getItemIndex(nextElement);
      const triggerEvent = eventName => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      const slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // TODO: change tests that use empty divs to avoid this check
        return;
      }
      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }
    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }
    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }
    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
    _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Carousel.getOrCreateInstance(this, config);
        if (typeof config === 'number') {
          data.to(config);
          return;
        }
        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-bs-slide-to');
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$b = 'collapse';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true
  };
  const DefaultType$a = {
    parent: '(null|element)',
    toggle: 'boolean'
  };

  /**
   * Class definition
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
      for (const elem of toggleList) {
        const selector = SelectorEngine.getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }

    // Getters
    static get Default() {
      return Default$a;
    }
    static get DefaultType() {
      return DefaultType$a;
    }
    static get NAME() {
      return NAME$b;
    }

    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];

      // find active children
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        this._element.style[dimension] = '';
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      for (const trigger of this._triggerArray) {
        const element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };
      this._element.style[dimension] = '';
      this._queueCallback(complete, this._element, true);
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }

    // Private
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
      for (const element of children) {
        const selected = SelectorEngine.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      // remove children if greater depth
      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    }

    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }
    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Collapse);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$a = 'dropdown';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$2 = 'Escape';
  const TAB_KEY$1 = 'Tab';
  const ARROW_UP_KEY$1 = 'ArrowUp';
  const ARROW_DOWN_KEY$1 = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  const PLACEMENT_TOPCENTER = 'top';
  const PLACEMENT_BOTTOMCENTER = 'bottom';
  const Default$9 = {
    autoClose: true,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  };
  const DefaultType$9 = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  };

  /**
   * Class definition
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }

    // Getters
    static get Default() {
      return Default$9;
    }
    static get DefaultType() {
      return DefaultType$9;
    }
    static get NAME() {
      return NAME$a;
    }

    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      this._element.focus();
      this._element.setAttribute('aria-expanded', true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }

    // Private
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute('aria-expanded', 'false');
      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }
      let referenceElement = this._element;
      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }

      // We need to trim the value because custom properties can also include spaces
      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      };

      // Disable Popper if we have a static display or Dropdown is in Navbar
      if (this._inNavbar || this._config.display === 'static') {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
      if (!items.length) {
        return;
      }

      // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
        return;
      }
      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        }

        // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = {
          relatedTarget: context._element
        };
        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command

      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();

      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$9 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements
  };

  const DefaultType$8 = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };

  /**
   * Class definition
   */

  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    // Getters
    static get Default() {
      return Default$8;
    }
    static get DefaultType() {
      return DefaultType$8;
    }
    static get NAME() {
      return NAME$9;
    }

    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }

    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$8 = 'focustrap';
  const DATA_KEY$5 = 'bs.focustrap';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';
  const Default$7 = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of
  };

  const DefaultType$7 = {
    autofocus: 'boolean',
    trapElement: 'element'
  };

  /**
   * Class definition
   */

  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }

    // Getters
    static get Default() {
      return Default$7;
    }
    static get DefaultType() {
      return DefaultType$7;
    }
    static get NAME() {
      return NAME$8;
    }

    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
      EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    }

    // Private
    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';
  const PROPERTY_PADDING = 'padding-right';
  const PROPERTY_MARGIN = 'margin-right';

  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }

    // Public
    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      // give padding to element to balance the hidden scrollbar width
      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, 'overflow');
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }

    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');
      this._element.style.overflow = 'hidden';
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProperty);
        // We only want to remove the property if the value is `null`; the value can also be zero
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$7 = 'modal';
  const DATA_KEY$4 = 'bs.modal';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  const DefaultType$6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
  };

  /**
   * Class definition
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$6;
    }
    static get DefaultType() {
      return DefaultType$6;
    }
    static get NAME() {
      return NAME$7;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }
    dispose() {
      EventHandler.off(window, EVENT_KEY$4);
      EventHandler.off(this._dialog, EVENT_KEY$4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }

    // Private
    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _showElement(relatedTarget) {
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW$4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }
          if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }
    _hideModal() {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY;
      // return if the following background transition hasn't yet completed
      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }

    /**
     * The following methods are used to handle overflowing modals
     */

    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    // Static
    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });

    // avoid conflict when clicking modal toggler while another one is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);

  /**
   * jQuery
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$6 = 'offcanvas';
  const DATA_KEY$3 = 'bs.offcanvas';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = '.data-api';
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = 'Escape';
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_SHOWING$1 = 'showing';
  const CLASS_NAME_HIDING = 'hiding';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };

  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$5;
    }
    static get DefaultType() {
      return DefaultType$5;
    }
    static get NAME() {
      return NAME$6;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.classList.add(CLASS_NAME_SHOWING$1);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW$3);
        this._element.classList.remove(CLASS_NAME_SHOWING$1);
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }

    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === 'static') {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }
        this.hide();
      };

      // 'static' option will be translated to true, and booleans will keep their value
      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      });
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    });

    // avoid conflict when clicking a toggler of an offcanvas, while another is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);

  /**
   * jQuery
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  // js-docs-start allow-list
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  // js-docs-end allow-list

  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

  /**
   * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
   * contexts.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
   */
  // eslint-disable-next-line unicorn/better-regex
  const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }

    // Check if a regular expression validates the attribute.
    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
      return sanitizeFunction(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }
    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$5 = 'TemplateFactory';
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  const DefaultType$4 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };

  /**
   * Class definition
   */

  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    }

    // Getters
    static get Default() {
      return Default$4;
    }
    static get DefaultType() {
      return DefaultType$4;
    }
    static get NAME() {
      return NAME$5;
    }

    // Public
    getContent() {
      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(content) {
      this._checkContent(content);
      this._config.content = {
        ...this._config.content,
        ...content
      };
      return this;
    }
    toHtml() {
      const templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }
      const template = templateWrapper.children[0];
      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        template.classList.add(...extraClass.split(' '));
      }
      return template;
    }

    // Private
    _typeCheckConfig(config) {
      super._typeCheckConfig(config);
      this._checkContent(config.content);
    }
    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }
    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this]);
    }
    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$4 = 'tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  const EVENT_HIDE$2 = 'hide';
  const EVENT_HIDDEN$2 = 'hidden';
  const EVENT_SHOW$2 = 'show';
  const EVENT_SHOWN$2 = 'shown';
  const EVENT_INSERTED = 'inserted';
  const EVENT_CLICK$1 = 'click';
  const EVENT_FOCUSIN$1 = 'focusin';
  const EVENT_FOCUSOUT$1 = 'focusout';
  const EVENT_MOUSEENTER = 'mouseenter';
  const EVENT_MOUSELEAVE = 'mouseleave';
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 6],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  const DefaultType$3 = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };

  /**
   * Class definition
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }
      super(element, config);

      // Private
      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null;

      // Protected
      this.tip = null;
      this._setListeners();
      if (!this._config.selector) {
        this._fixTitle();
      }
    }

    // Getters
    static get Default() {
      return Default$3;
    }
    static get DefaultType() {
      return DefaultType$3;
    }
    static get NAME() {
      return NAME$4;
    }

    // Public
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (!this._isEnabled) {
        return;
      }
      this._activeTrigger.click = !this._activeTrigger.click;
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      // TODO: v6 remove this or make it optional
      this._disposePopper();
      const tip = this._getTipElement();
      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
      const {
        container
      } = this._config;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
        if (this._isHovered === false) {
          this._leave();
        }
        this._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    hide() {
      if (!this._isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
      if (hideEvent.defaultPrevented) {
        return;
      }
      const tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (!this._isHovered) {
          this._disposePopper();
        }
        this._element.removeAttribute('aria-describedby');
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    update() {
      if (this._popper) {
        this._popper.update();
      }
    }

    // Protected
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml();

      // TODO: remove this check in v6
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      // TODO: v6 the following can be achieved with CSS only
      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      return tip;
    }
    setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({
          ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }
      return this._templateFactory;
    }
    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    }

    // Private
    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }
    _createPopper(tip) {
      const placement = execute(this._config.placement, [this, tip, this._element]);
      const attachment = AttachmentMap[placement.toUpperCase()];
      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this._element]);
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: data => {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _setListeners() {
      const triggers = this._config.trigger.split(' ');
      for (const trigger of triggers) {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
    _fixTitle() {
      const title = this._element.getAttribute('title');
      if (!title) {
        return;
      }
      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }
      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
      this._element.removeAttribute('title');
    }
    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }
    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }
    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = {
        ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const [key, value] of Object.entries(this._config)) {
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = 'manual';

      // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`
      return config;
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$3 = 'popover';
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  const Default$2 = {
    ...Tooltip.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
    trigger: 'click'
  };
  const DefaultType$2 = {
    ...Tooltip.DefaultType,
    content: '(null|string|element|function)'
  };

  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }
    static get DefaultType() {
      return DefaultType$2;
    }
    static get NAME() {
      return NAME$3;
    }

    // Overrides
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }

    // Private
    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = '[href]';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  const DefaultType$1 = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  };

  /**
   * Class definition
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config);

      // this._element is the observablesContainer and config.target the menu links wrapper
      this._targetLinks = new Map();
      this._observableSections = new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh(); // initialize
    }

    // Getters
    static get Default() {
      return Default$1;
    }
    static get DefaultType() {
      return DefaultType$1;
    }
    static get NAME() {
      return NAME$2;
    }

    // Public
    refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }
    dispose() {
      this._observer.disconnect();
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body;

      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
      }
      return config;
    }
    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      }

      // unregister any previous listeners
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
        const observableSection = this._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          }

          // Chrome 60 doesn't support `scrollTo`
          root.scrollTop = height;
        }
      });
    }
    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(entries => this._observerCallback(entries), options);
    }

    // The logic of selection
    _observerCallback(entries) {
      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
      const activate = entry => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        this._process(targetElement(entry));
      };
      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        // if we are scrolling down, pick the bigger offsetTop
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
          if (!parentScrollTop) {
            return;
          }
          continue;
        }

        // if we are scrolling up, pick the smallest offsetTop
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (const anchor of targetLinks) {
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }
        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

        // ensure that the observableSection exists & is visible
        if (isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }
    _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }
      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }
    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_DROPDOWN = 'dropdown';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = '.nav-item, .list-group-item';
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

  /**
   * Class definition
   */

  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
        // TODO: should throw exception in v6
        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
      }

      // Set up initial aria attributes
      this._setInitialAttributes(this._parent, this._getChildren());
      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    }

    // Getters
    static get NAME() {
      return NAME$1;
    }

    // Public
    show() {
      // Shows this elem and deactivate the active sibling if exists
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }

      // Search for active tab on same parent to deactivate it
      const active = this._getActiveElem();
      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }

    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }
        element.removeAttribute('tabindex');
        element.setAttribute('aria-selected', true);
        this._toggleDropDown(element, true);
        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }
        element.setAttribute('aria-selected', false);
        element.setAttribute('tabindex', '-1');
        this._toggleDropDown(element, false);
        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
      event.preventDefault();
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      const nextActiveElement = getNextActiveElement(this._getChildren().filter(element => !isDisabled(element)), event.target, isNext, true);
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find(child => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, 'role', 'tablist');
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute('aria-selected', isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
      }
      if (!isActive) {
        child.setAttribute('tabindex', '-1');
      }
      this._setAttributeIfNotExists(child, 'role', 'tab');

      // set attributes to the related panel too
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = SelectorEngine.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
      if (child.id) {
        this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element = SelectorEngine.findOne(selector, outerElem);
        if (element) {
          element.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute('aria-expanded', open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }

    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    }

    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });

  /**
   * Initialize on focus
   */
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };

  /**
   * Class definition
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;
      this._setListeners();
    }

    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }

    // Public
    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(this._element, EVENT_SHOWN);
        this._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    hide() {
      if (!this.isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      super.dispose();
    }
    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }

    // Private

    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }
    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }
        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      const nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Toast);

  /**
   * jQuery
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };

  return index_umd;

}));

/*! p5.js v1.6.0 February 22, 2023 */

window.preload = () => {};

window.setup = () => {
    window.app = document.createElement(`app-evo`); // create app
    document.querySelector(`main`).appendChild(app);
    noCanvas();
    noLoop();
    frameRate(25);
};

window.draw = () => {
    if (window.app.screen < 3) return null;
    if (window.app.population.updated) {
        push();
        background(window.app.backgroundColor);
        window.app.population.draw();
        pop();
    }

};

window.windowResized = () => {
    if (window.app.screen < 2) return null;
};