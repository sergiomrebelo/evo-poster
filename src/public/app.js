/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window,e$5=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$4=Symbol(),n$4=new WeakMap;let o$5 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$4.set(s,t));}return t}toString(){return this.cssText}};const r$3=t=>new o$5("string"==typeof t?t:t+"",void 0,s$4),S$2=(s,n)=>{e$5?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$2=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$3;const e$4=window,r$2=e$4.trustedTypes,h$2=r$2?r$2.emptyScript:"",o$4=e$4.reactiveElementPolyfillSupport,n$3={toAttribute(t,i){switch(i){case Boolean:t=t?h$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$2=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:n$3,reflect:!1,hasChanged:a$2},d$2="finalized";let u$2 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty(d$2))return !1;this[d$2]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$2(i));}else void 0!==i&&s.push(c$2(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$3){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$3).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$3;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$2[d$2]=!0,u$2.elementProperties=new Map,u$2.elementStyles=[],u$2.shadowRootOptions={mode:"open"},null==o$4||o$4({ReactiveElement:u$2}),(null!==(s$3=e$4.reactiveElementVersions)&&void 0!==s$3?s$3:e$4.reactiveElementVersions=[]).push("1.6.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$2=window,s$2=i$2.trustedTypes,e$3=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$3="$lit$",n$2=`lit$${(Math.random()+"").slice(9)}$`,l$2="?"+n$2,h$1=`<${l$2}>`,r$1=document,d$1=()=>r$1.createComment(""),u$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$1=Array.isArray,v$1=t=>c$1(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$1="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_$1=/-->/g,m$1=/>/g,p$1=RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g$1=/'/g,$$1=/"/g,y$1=/^(?:script|style|textarea|title)$/i,w$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x$1=w$1(1),T$1=Symbol.for("lit-noChange"),A$1=Symbol.for("lit-nothing"),E$1=new WeakMap,C$1=r$1.createTreeWalker(r$1,129,null,!1),P$1=(t,i)=>{const s=t.length-1,l=[];let r,d=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let e,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$1?"!--"===c[1]?u=_$1:void 0!==c[1]?u=m$1:void 0!==c[2]?(y$1.test(c[2])&&(r=RegExp("</"+c[2],"g")),u=p$1):void 0!==c[3]&&(u=p$1):u===p$1?">"===c[0]?(u=null!=r?r:f$1,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,e=c[1],u=void 0===c[3]?p$1:'"'===c[3]?$$1:g$1):u===$$1||u===g$1?u=p$1:u===_$1||u===m$1?u=f$1:(u=p$1,r=void 0);const w=u===p$1&&t[i+1].startsWith("/>")?" ":"";d+=u===f$1?s+h$1:v>=0?(l.push(e),s.slice(0,v)+o$3+s.slice(v)+n$2+w):s+n$2+(-2===v?(l.push(void 0),i):w);}const c=d+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$3?e$3.createHTML(c):c,l]};let V$1 = class V{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,u=0;const c=t.length-1,v=this.parts,[a,f]=P$1(t,i);if(this.el=V.createElement(a,e),C$1.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C$1.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$3)||i.startsWith(n$2)){const s=f[u++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$3).split(n$2),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?k$1:"?"===i[1]?I$1:"@"===i[1]?L$1:R$1});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y$1.test(h.tagName)){const t=h.textContent.split(n$2),i=t.length-1;if(i>0){h.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],d$1()),C$1.nextNode(),v.push({type:2,index:++r});h.append(t[i],d$1());}}}else if(8===h.nodeType)if(h.data===l$2)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$2,t+1));)v.push({type:7,index:r}),t+=n$2.length-1;}r++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}};function N$1(t,i,s=t,e){var o,n,l,h;if(i===T$1)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const d=u$1(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==d&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===d?r=void 0:(r=new d(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=N$1(t,r._$AS(t,i.values),r,e)),i}let S$1 = class S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$1).importNode(s,!0);C$1.currentNode=o;let n=C$1.nextNode(),l=0,h=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new M$1(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new z$1(n,this,t)),this._$AV.push(i),d=e[++h];}l!==(null==d?void 0:d.index)&&(n=C$1.nextNode(),l++);}return C$1.currentNode=r$1,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}};let M$1 = class M{constructor(t,i,s,e){var o;this.type=2,this._$AH=A$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N$1(this,t,i),u$1(t)?t===A$1||null==t||""===t?(this._$AH!==A$1&&this._$AR(),this._$AH=A$1):t!==this._$AH&&t!==T$1&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v$1(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A$1&&u$1(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$1.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=V$1.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new S$1(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E$1.get(t.strings);return void 0===i&&E$1.set(t.strings,i=new V$1(t)),i}T(t){c$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new M(this.k(d$1()),this.k(d$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}};let R$1 = class R{constructor(t,i,s,e,o){this.type=1,this._$AH=A$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A$1;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=N$1(this,t,i,0),n=!u$1(t)||t!==this._$AH&&t!==T$1,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=N$1(this,e[s+l],i,l),h===T$1&&(h=this._$AH[l]),n||(n=!u$1(h)||h!==this._$AH[l]),h===A$1?t=A$1:t!==A$1&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}};let k$1 = class k extends R$1{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A$1?void 0:t;}};const H$1=s$2?s$2.emptyScript:"";let I$1 = class I extends R$1{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A$1?this.element.setAttribute(this.name,H$1):this.element.removeAttribute(this.name);}};let L$1 = class L extends R$1{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=N$1(this,t,i,0))&&void 0!==s?s:A$1)===T$1)return;const e=this._$AH,o=t===A$1&&e!==A$1||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A$1&&(e===A$1||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}};let z$1 = class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){N$1(this,t);}};const j$1=i$2.litHtmlPolyfillSupport;null==j$1||j$1(V$1,M$1),(null!==(t$2=i$2.litHtmlVersions)&&void 0!==t$2?t$2:i$2.litHtmlVersions=[]).push("2.7.4");const B$1=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new M$1(i.insertBefore(d$1(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o$2;let s$1 = class s extends u$2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B$1(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T$1}};s$1.finalized=!0,s$1._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:s$1});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s$1});(null!==(o$2=globalThis.litElementVersions)&&void 0!==o$2?o$2:globalThis.litElementVersions=[]).push("3.3.2");

const TYPEFACES = {
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
    NO_GEN: 10,
    CROSSOVER_PROB: 0.9,
    MUTATION_PROB: 0.1,
    ELITE_SIZE: 1
};

var evoPoster_config = {
    typography: TYPEFACES !== undefined ? TYPEFACES : {},
    color: COLOR !== undefined ? COLOR : {},
    evaluation: EVALUATION !== undefined ? EVALUATION : {},
    display: {
        GRID: true,
        VISIBLE_POSTERS: 30
    },
    evo: EVO !== undefined ? EVO : {},
    log: {
        SAVE_LOG: true,
        SAVE_IMAGES: `END` // `GENERATION`, `END`, `BEST-GENERATION`, `NO`
    }
};

class Params {
    /* TODO: create evo.config.js */
    static  availableLanguages = [
        'ar', 'bn', 'bs', 'bg', 'zh', 'hr', 'cs', 'da', 'nl', 'en',
        'et', 'fi', 'fr', 'de', 'el', 'gu', 'he', 'hi', 'hu', 'ga',
        'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'ml', 'mt', 'ne',
        'nb', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'es', 'sv',
        'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'
    ];


    static visualisationGrid = {
        height: 141,
        width: 100,
        marginY: 10,
        posterMargins: [.05, .05, .05, .05],
    }

    static imageMaxSize = 1024;

    // REMOVE
    static evolution = {
        popSize: 30,
        noGen: 400,
        crossoverProb: 0.90,
        mutationProb: 0.10,
        eliteSize: 1
    }

    static visiblePosters = 10;




    static backgroundStyleOptions = [ [`Random`,0], [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]];
    static textAlignmentOptions = [ [`Random`], [`Top`], [`Middle`],  ["Bottom"]];
    static textAlignmentTbOptions = [ [`Random`], [`LEFT`], [`CENTER`],  [`RIGHT`]];

    static typography = {
        defaultColor: `#000000`,
        range: 0.05,
        maxSize: 0.95,
        minSize: 0.05
    }

    static background = {
        availableStyles: [ ["Random", 2], [`Solid`, 1], [`Gradient`,2], [`Triangle`,2]],
        defaultColors: [`#ffffff`, `#000000`]
    };
}

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
            if (files[i].size/1024 < Params.imageMaxSize) {
                if (files[i].type.includes('image')) {
                    res.push(getBase64(files[i]));
                } else {
                    err.push(`error loading the following image(s): ${files[i].name}.`);
                }
            } else {
                err.push(`${files[i].name} size bigger than ${Params.imageMaxSize} kb. (size: ${files[i].size})`);
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
                                    ${Params.availableLanguages.map((lang) => {
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
                            <div class="form-check form-check-inline mb-2" id="imagePlacementField">
                                <label for="form-check-label" class="col-form-label-sm" id="imagePlacementCheck">Image Random Placement</label>
                                <input type="checkbox" value="1" @change="${this._toggleVisibility}"
                                       class="form-check-input" id="imagePlacementCheck" data-related="imageAnchorField" checked>
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
const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$2=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let e$1 = class e extends i$1{constructor(i){if(super(i),this.et=A$1,i.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A$1||null==r)return this.ft=void 0,this.et=r;if(r===T$1)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.et)return this.ft;this.et=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}};e$1.directiveName="unsafeHTML",e$1.resultType=1;const o$1=e$2(e$1);

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
                verticalAlignment: new DropDownList(`Vertical alignment`, Params.textAlignmentOptions, 0, `vertical-align`, (e) => {
                    this.params.typography.verticalAlignment = parseInt(e.target.value);
                    this.restart();
                }, ["mb-2"]),
                typefaces: new TextInput(`Add Typeface`, "", `typefaces-add`, (e) => {
                    const name = e.target.value;
                    const current = this.params.typography.typefaces.map(e => e.family);
                    if (Object.keys(TYPEFACES).includes(name) && !current.includes(name)) {
                        for (let f of Array.from(document.fonts)) {
                            if (f.family === name) {
                                let stretch = f.stretch.replaceAll(`%`, ``);
                                let stretchValues = stretch.split(" ").map((x) => parseInt(x));
                                let weightValues = f.weight.split(" ").map((x) => parseInt(x));
                                const features = TYPEFACES[name];
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
                        this.errorMessage.set({message: `Typeface ${name} is not available<br>available typefaces: ${Params.availableTypefaces}`});
                        this.numberOfTypeface += 1;
                    }
                }, ["mb-2"])
            },
            textboxes: {
                align: new DropDownList(`Texbox alignment`, Params.textAlignmentTbOptions, 0, `texbox-align`, (e) => {
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
                style: new DropDownList(`Background Style`, Params.background.availableStyles, 0, `background-style`, (e) => {
                    const els = document.querySelectorAll(`.background-colour-picker`);
                    const isRandom = document.getElementById(`bk-color-check`).checked;
                    this.params.background.color.random = isRandom;
                    this.params.background.style = parseInt(e.target.value);
                    this.params.background.lock[0] = (this.params.background.style !== 0);
                    if (!isRandom) {
                        const numberOfColours = Params.background.availableStyles[parseInt(e.target.value)][1];
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
                        const numberOfColours = Params.background.availableStyles[parseInt(style)][1];
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

        this.params.size.width = Params.visualisationGrid.width * width;
        this.params.size.height = Params.visualisationGrid.width * height;
        this.params.size.margin = [ml, mt, mr, mb];

        // console.log(`margins=[${ml} | ${mt} | ${mr} | ${mb}]`);
        // console.log(`width=${width}. height=${height}`);

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

const t=(t,e,r,l,n)=>l+(t-e)/(r-e)*(n-l),e=(t,e,r)=>Math.min(r,Math.max(e,t)),r=t=>t.reduce(((t,e)=>t+e),0)/t.length||0,l=t=>t.reduce(((t,e)=>t+e),0),n=t=>Math.max(...t),a=t=>Math.min(...t),o=t=>t.filter(((t,e,r)=>r.indexOf(t)===e)),s=t=>{if(t.levels)return {r:parseInt(t.levels[0]),g:parseInt(t.levels[1]),b:parseInt(t.levels[2])};let e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},i=(t,e)=>Math.sqrt(Math.pow(t.r-e.r,2)+Math.pow(t.g-e.g,2)+Math.pow(t.b-e.b,2)),f=10,h=[.8,.2],u={MAX_CONSTRAINT:1,WHITE_SPACE_FACTOR:3,MODES:["OVERSET","JUSTIFY","ATTEMPT_JUSTIFY"],DEFAULT_MAX_LIMIT_SCALE:1},c={MIN_RANGE:50,THRESHOLD_VALID:.2,MODES:["DIF","MIN"]},p={MODES:["BOTH","TYPE_FAMILY","CATEGORY"]},g={VISUAL_CENTER_FT:20,MODES:["CENTER","LEFT-CENTER","RIGHT-CENTER","LEFT-TOP","RIGHT-TOP","LEFT-BOTTOM","RIGHT-BOTTOM"]},d=.5,E=10;const T=u.MAX_CONSTRAINT,M=u.WHITE_SPACE_FACTOR,I=u.DEFAULT_MAX_LIMIT_SCALE,O=u.MODES,A=(e,r)=>t(e=(e=e>=0?0:e)<=-r?-r:e,-r,0,T,0),b=(e,r)=>(e=Math.abs(e),t(e=e>r?r:e,r,0,T,0)),y=(t,e)=>b(t=t>=0?t/M:t,e),_={MODES:["RELATIVE","FIXED"]}.MODES;let m=c.MIN_RANGE,R=c.THRESHOLD_VALID,S=c.MODES;const x=(e,r)=>{const l=r.filter(((t,e,r)=>r.indexOf(t)===e)),n=[];for(let t of l)for(let l=0;l<r.length;l++)if(r[l]===t){n.push(e[l]);break}const a=n.filter(((t,e)=>n.indexOf(t)!==e));let o=1;if(!a.length>=1){let a=0;for(let t in r){let o=r[t],s=e[t],i=l.indexOf(o);s!==n[i]&&a++;}o=t(a,0,e.length,0,1);}return o},F=(l,o,s="DIF")=>{S.includes(s)||(s="DIF");const i=n(l),f=a(l);let h=Math.abs(i-f);if(h<m)return 1;const u=n(o),c=a(o);let p=f;if("DIF"===s)for(let t in o)if(o[t]===c){p=l[t];break}const g=o.map((r=>{let l=t(r,c,u,0,h);return l=e(l,0,h),l})),d=[];for(let t in l){let e=l[t],r=Math.abs(e-p),n=Math.abs(r-g[t]);d.push(n);}let E=t(r(d),0,h,1,0);return e(E,0,1)};var L={anger:{color:{typography:["#ff0000","#00ff00"],background:["#ff0000"]},typefaces:["sans-serif","neo-grotesque"]},joy:{color:{typography:[],background:["#ffff00","#00ff00"]},typefaces:["sans-serif","serif"]},trust:{color:{typography:[],background:["#0000ff","#00ff00"]},typefaces:["neo-grotesque"]},sadness:{color:{typography:[],background:["#0071b6"]},typefaces:[]},disgust:{color:{typography:["#800080"],background:[]},typefaces:[]}},D=Object.freeze({__proto__:null,default:L});const C=441.67,N=f,w=h,v=d,G=E,H=(t,e,r=1)=>{let l=0,n=t.width*r*t.height*r;t.loadPixels();for(let r=0;r<4*n;r+=4){let n={r:t.pixels[r],g:t.pixels[r+1],b:t.pixels[r+2]};i(n,e)<G&&l++;}return l/n},V=p.MODES,Y=g.VISUAL_CENTER_FT,P=g.MODES,k=(t,e,r,n)=>{const a=[];for(let e in n)a.push(U(t,r[e],n[e]));let o=0,s=0;const i=l(e);for(let t in e)o+=a[t].x*e[t],s+=a[t].y*e[t];return o/=i,s/=i,{x:o,y:s}},U=(t,e,r,l=[0,0,0,0])=>{const n=(t=String(t)).includes("LEFT")?1:t.includes("RIGHT")?2:0,a=t.includes("TOP")?1:t.includes("BOTTOM")?2:0;return {x:0===n?e/2:1===n?e*l[0]:e*(1-l[2]),y:0===a?r/2-r/Y:1===a?r*l[1]:r-r*l[3]}},$=async(t,e,r,l)=>{let n=[],a=[];for(let o in r){n.push(r[o]*l[o]);const s=await t.get(0,t.height/2+e.center[o],t.width,e.l[o]);await s.loadPixels();let i=0,f=0,h=0;const u=s.pixels.length/4;for(let t=0;t<s.pixels.length;t+=4)i+=s.pixels[t],f+=s.pixels[t+1],h+=s.pixels[t+2];i=Math.round(i/u),f=Math.round(f/u),h=Math.round(h/u);const c=(.2126*i+.7152*f+.0722*h)/255;a.push(-Math.log10(c));}return n.map(((t,e)=>t*a[e]))},X=(t=[],e,l="OVERSET",n=I)=>{O.includes(l)||(l="OVERSET");let a=[],o=e*n;for(let r of t){let t=e-r,n=T;switch(l){case"JUSTIFY":n=b(t,o);break;case"ATTEMPT_JUSTIFY":n=y(t,o);break;default:n=A(t,o);}a.push(n);}return r([...a])},B=(t,e,r=[],l=[],n={left:0,top:0,right:0,bottom:0})=>{let a=!1,o="",s=Math.abs(n.top)+Math.abs(n.bottom);for(let t of r)s+=parseFloat(t);let i=Math.abs(n.left)+Math.abs(n.right);for(let t of l)i+=parseFloat(t);return i=Math.round(i),s=Math.round(s),s>e?(a=!0,o+=`Grid height is bigger than container (grid:${s}, container:${e}). `):s<e&&(o+=`Grid and container height are not the same (grid:${s}, container:${e}). `),i>t?(a=!0,o+=`Grid width is bigger than container (grid:${i}, container:${t}). `):i<t&&(o+=`Grid and container width are not the same (grid:${i}, container:${t}). `),a?1:0},J=(t=[],e=null,n="RELATIVE",a={height:100,margin:[0,0,0,0]})=>{_.includes(n)||(n="RELATIVE");let o=0;"RELATIVE"===n?o=l(t):"FIXED"===n&&(o=a.height-(a.height*a.margin[1]+a.height*a.margin[3]));const s=t.map((t=>t/o));let i=[];for(let t in e){const r=Math.abs(e[t][3]-s[t]);i.push(r);}return 1-r(i)},q=(t,e,r=1,a=!0,o=[.4,.3,.3])=>{const s=e.map((t=>t[3]));let i,f=[F(t.map((t=>t.weight)),s),F(t.map((t=>t["font-stretch"])),s),r>1?x(t.map((t=>t["font-stretch"])),s):0],h=f.map(((t,e)=>t*o[e]));if(a)i=l(h);else {let t=f.map((t=>t>R)),e=0;for(let r of t)r&&e++;i=n(f)/e;}return i},j=async(t,l,n,a,o=D)=>{let f=t.predominant.emotion;if(void 0===o.default[f])return 1;const h=o.default[f].color.typography,u=o.default[f].color.background,c=o.default[f].typefaces;let p=1;if(void 0!==h&&h.length>0){let t=[];for(let e of l){let r=s(e.color),l=Number.MAX_VALUE;for(let t of h){t=s(t);let e=i(r,t);e<l&&(l=e);}t.push(l);}p=t.length<1?1:r(t),p/=C,p=e(1-p,0,1);}let g=1;if(void 0!==u&&0!==u.length){let t=[];g=0;for(let e of n){e=s(e);let r=Number.MAX_VALUE;for(let t of u){t=s(t);let l=i(e,t);l<r&&(r=l);}t.push(r);}g=g.length<1?1:r(t),g/=C,g=e(1-g,0,1);}let d=1;if(void 0!==c&&c.length>0){let t=[];for(let e of l){let r=0;const l=a.map((t=>t.family)).indexOf(e.typeface),n=a[l].tags;for(let t of c)n.includes(t)&&(r+=1/c.length);t.push(r);}d=t.length<1?1:r(t),d=e(d,0,1);}return (p+g+d)/3},W=(t,e,l=w)=>{if(t.length<2)return 1;let n=t,a=[];for(let t=0;t<n.length-1;t++){let e=Math.abs(n[t]-n[t+1]),r=N/(N+e);a.push(r);}let s=((t,e)=>t.reduce(((t,r,l)=>t+r*e[l]),0))([r(a),1/o(e).length],l);return s},z=t=>{if(t.length<2)return 1;const e=t;let l=[];for(let t=0;t<e.length-1;t++){let r=10/(10+Math.abs(e[t]-e[t+1]));l.push(r);}return r(l)},K=(t,e,r=null,l=v)=>{null===r&&(e=s(e),r=H(t,e,t.pixelDensity()));return 1-4*Math.pow(r-l,2)},Q=(t,e,r="BOTH")=>{V.includes(r)||(r="BOTH");let l=[.5,.5];"TYPE_FAMILY"===r?l=[1,0]:"CATEGORY"===r&&(l=[0,1]);let n=[],a=o(t),s=0,i=0;if("TYPE_FAMILY"!==r){const t=e.map((t=>t.family)),r=e.map((t=>t.category));for(let e of a){const l=t.indexOf(e);-1===l?n.push("undefined"):n.push(r[l]);}n=o(n),s=1/n.length;}"CATEGORY"!==r&&(i=1/a.length);return [i,s].reduce(((t,e,r)=>t+e*l[r]),0)},Z=async(t=null,r,l,n,a,o="CENTER",s=null)=>{const i=r.width,f=r.height;P.includes(o)||(o="CENTER");const h=null===s?await $(t,l,n,a):s,u=k(o,h,n,a);let c=U(o,i,f,r.margin),p=Math.pow((u.x-c.x)/i,2)+Math.pow((u.y-c.y)/f,2);return p=1-Math.pow(Math.abs(p/2),.5),e(p,0,1)};

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

const arrSum = (arr) => {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
};

const MAX_COLOR_SCHEME_ATTEMPT$1 = evoPoster_config["COLOR"] !== undefined ? evoPoster_config["COLOR"]["MAX_COLOR_SCHEME_ATTEMPT"] : 200;

class Poster {
    #showGrid = false;
    #debug = false;
    constructor(n, generation, params = null, genotype = null) {
        this.id = `${generation}-${n}`;
        this.n = n;
        this.generation = generation;
        this.ready = false;
        // ensure we use a deep copy of params
        // this.params = JSON.parse(JSON.stringif(pyarams));
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
        this.maxFontSize = Params.typography.maxSize * h;
        this.minFontSize = Params.typography.minSize * h;

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
            Math.round(Math.random() * (Params.textAlignmentOptions.length-2) + 1) :
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
            size += Math.round(-(size*Params.typography.range)+(Math.random()*(size*Params.typography.range)));
            size = Math.max(
                Math.round(params.size.height * Params.typography.minSize),
                Math.min(Math.round(params.size.height * Params.typography.maxSize), size)
            );
            grid.defineRow(i, size * leading, alignment);

            const alignmentLine = params.typography.textAlignment === 0 ?
                Math.round(Math.random() * (Params.textAlignmentTbOptions.length-2) + 1) :
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
                style: params.background.style === 0 ? Math.round(1+Math.random()*(Params.background.availableStyles.length-2)) : params.background.style,
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
        let weightSum = arrSum(this.params["evaluation"]["weights"]);
        if (weightSum !== 1) {
            this.params["evaluation"]["weights"] = this.params["evaluation"]["weights"].map(x => x/weightSum);
        }

        let weights = this.params["evaluation"]["weights"];
        this.metrics["weights"] = weights;


        let semantics = 0; // semantic part of fitness
        let aesthetics = 0; // aesthetics part of fitness

        if (weights[0] > 0) {
            // restrict the weight array values to sum up to a total of 1 (100%).
            let semanticsWeightSum = arrSum(this.params["evaluation"]["semanticsWeights"]);
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
            let aestheticsWeightsSum = arrSum(this.params["evaluation"]["aestheticsWeights"]);
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

    update = (rows = null, cols = null) => {
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
        (this.marginsPos.bottom - dif) / this.size.height;
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
            let availableWidth = this.size.width - (this.size.width * this.size.margin[0]) - (this.size.width * this.size.margin[2]);
            return availableWidth;
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

const SIZE_MUTATION_ADJUST = 5;
const TOURNAMENT_SIZE = 10;
const MAX_COLOR_SCHEME_ATTEMPT = evoPoster_config["color"] !== undefined ? evoPoster_config["color"]["MAX_COLOR_SCHEME_ATTEMPT"] : 200;
const SAVE_LOG = evoPoster_config["log"] !== undefined ? evoPoster_config["log"]["SAVE_LOG"] : true;
const SAVE_IMAGES = evoPoster_config["log"] !== undefined ? evoPoster_config["log"]["SAVE_IMAGES"] : `NO`;
const VISIBLE_POSTERS$1 = evoPoster_config["display"] !== undefined ? evoPoster_config["display"]["VISIBLE_POSTERS"] : 10;

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
                const sideX = width / Math.floor(width / Params.visualisationGrid.width);
                const sideY = ind.genotype.grid.size.height + Params.visualisationGrid.marginY;
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
                if (posX % Math.floor(width / Params.visualisationGrid.width) === 0) { // (Params.visualisationGrid.cols-1)
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
const POP_SIZE = evoPoster_config["evo"]["POP_SIZE"];


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
        this.params = evoPoster_config;

        const fonts = this.#getAvailableTypefaces();


        let evaluationWeights = [
            evoPoster_config["evaluation"]["GLOBAL_WEIGHTS"]["SEMANTICS"],
            evoPoster_config["evaluation"]["GLOBAL_WEIGHTS"]["AESTHETICS"]
        ];

        let semanticsWeights = [
            evoPoster_config["evaluation"]["SEMANTICS_WEIGHTS"]["EMPHASIS"],
            evoPoster_config["evaluation"]["SEMANTICS_WEIGHTS"]["LAYOUT"],
            evoPoster_config["evaluation"]["SEMANTICS_WEIGHTS"]["VISUALS"]
        ];

        let aestheticsWeights = [
            evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["ALIGNMENT"],
            evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["REGULARITY"],
            evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["JUSTIFICATION"],
            evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["TYPEFACE_PARING"],
            evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["WHITE_BALANCE_FRACTION"],
            evoPoster_config["evaluation"]["AESTHETICS_WEIGHTS"]["BALANCE"]
        ];

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
                weights: evaluationWeights.map((x) => x/sumArr(evaluationWeights)),
                aestheticsWeights: aestheticsWeights.map ((x) => x/sumArr(aestheticsWeights)),
                semanticsWeights: semanticsWeights.map((x) => x/sumArr(semanticsWeights)),
                modes: {
                    semanticsVisuals: evoPoster_config["evaluation"]["MODES"]["SEMANTICS_VISUALS"]
                }
            },
            size: {
                width: Params.visualisationGrid.width,
                height: Params.visualisationGrid.height,
                margin: Params.visualisationGrid.posterMargins
            },
            images: [],
            sentences: null,
            background: {
                style: 0,
                color: {
                    random: true,
                    valueA: Params.background.defaultColors[0],
                    valueB: Params.background.defaultColors[1]
                },
                lock: [false, false]
            },
            typography: {
                verticalAlignment: 0,
                color:  {
                    random: true,
                    value: Params.typography.defaultColor,
                },
                textAlignment: 0,
                typefaces: fonts.typefaces,
                weight: fonts.weight,
                stretch: fonts.stretch,
                uppercase: false,
                texboxAlignment: 0,
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
            if (Object.keys(this.params.typography).includes(font.family)) {
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
                    tags: this.params.typography[font.family]["tags"],
                    category: this.params.typography[font.family]["category"],
                    leading: this.params.typography[font.family]["leading"]
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

        console.log(`VISIBLE_POSTERS`, VISIBLE_POSTERS, POP_SIZE);

        let numberOfPosters = VISIBLE_POSTERS > POP_SIZE ? POP_SIZE : VISIBLE_POSTERS;
        let h = Math.ceil(numberOfPosters / Math.floor(windowWidth/this.config.size.width));
        h *= (this.config.size.height + (Params.visualisationGrid.marginY*2));
        createCanvas(windowWidth, h); //WEBGL
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

export { App };
