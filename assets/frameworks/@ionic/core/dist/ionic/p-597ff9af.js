/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{g as t,a as o}from"./p-66a5d6a8.js";class e{constructor(){this.m=new Map}reset(t){this.m=new Map(Object.entries(t))}get(t,o){const e=this.m.get(t);return void 0!==e?e:o}getBoolean(t,o=!1){const e=this.m.get(t);return void 0===e?o:"string"==typeof e?"true"===e:!!e}getNumber(t,o){const e=parseFloat(this.m.get(t));return isNaN(e)?void 0!==o?o:NaN:e}set(t,o){this.m.set(t,o)}}const n=new e,i="ionic:",r="ionic-persist-config",s=t=>d(t),a=(t,o)=>("string"==typeof t&&(o=t,t=void 0),s(t).includes(o)),d=(t=window)=>{if(void 0===t)return[];t.Ionic=t.Ionic||{};let o=t.Ionic.platforms;return null==o&&(o=t.Ionic.platforms=c(t),o.forEach((o=>t.document.documentElement.classList.add(`plt-${o}`)))),o},c=t=>{const o=n.get("platform");return Object.keys(w).filter((e=>{const n=null==o?void 0:o[e];return"function"==typeof n?n(t):w[e](t)}))},u=t=>!!b(t,/iPad/i)||!(!b(t,/Macintosh/i)||!p(t)),l=t=>b(t,/android|sink/i),p=t=>f(t,"(any-pointer:coarse)"),m=t=>v(t)||h(t),v=t=>!!(t.cordova||t.phonegap||t.PhoneGap),h=t=>{const o=t.Capacitor;return!!((null==o?void 0:o.isNative)||(null==o?void 0:o.isNativePlatform)&&o.isNativePlatform())},b=(t,o)=>o.test(t.navigator.userAgent),f=(t,o)=>{var e;return null===(e=t.matchMedia)||void 0===e?void 0:e.call(t,o).matches},w={ipad:u,iphone:t=>b(t,/iPhone/i),ios:t=>b(t,/iPhone|iPod/i)||u(t),android:l,phablet:t=>{const o=t.innerWidth,e=t.innerHeight,n=Math.min(o,e),i=Math.max(o,e);return n>390&&n<520&&i>620&&i<800},tablet:t=>{const o=t.innerWidth,e=t.innerHeight,n=Math.min(o,e),i=Math.max(o,e);return u(t)||(t=>l(t)&&!b(t,/mobile/i))(t)||n>460&&n<820&&i>780&&i<1400},cordova:v,capacitor:h,electron:t=>b(t,/electron/i),pwa:t=>{var o;return!(!(null===(o=t.matchMedia)||void 0===o?void 0:o.call(t,"(display-mode: standalone)").matches)&&!t.navigator.standalone)},mobile:p,mobileweb:t=>p(t)&&!m(t),desktop:t=>!p(t),hybrid:m};let g;const y=o=>o&&t(o)||g,O=(t={})=>{if("undefined"==typeof window)return;const e=window.document,s=window,c=s.Ionic=s.Ionic||{},u=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},(t=>{try{const o=t.sessionStorage.getItem(r);return null!==o?JSON.parse(o):{}}catch(t){return{}}})(s)),{persistConfig:!1}),c.config),(t=>{const o={};return t.location.search.slice(1).split("&").map((t=>t.split("="))).map((([t,o])=>{try{return[decodeURIComponent(t),decodeURIComponent(o)]}catch(t){return["",""]}})).filter((([t])=>{return t.substr(0,(o=i).length)===o;var o})).map((([t,o])=>[t.slice(6),o])).forEach((([t,e])=>{o[t]=e})),o})(s)),t);n.reset(u),n.getBoolean("persistConfig")&&((t,o)=>{try{t.sessionStorage.setItem(r,JSON.stringify(o))}catch(t){return}})(s,u),d(s),c.config=n,c.mode=g=n.get("mode",e.documentElement.getAttribute("mode")||(a(s,"ios")?"ios":"md")),n.set("mode",g),e.documentElement.setAttribute("mode",g),e.documentElement.classList.add(g),n.getBoolean("_testing")&&n.set("animated",!1);const l=t=>{var o;return null===(o=t.tagName)||void 0===o?void 0:o.startsWith("ION-")},p=t=>["ios","md"].includes(t);o((t=>{for(;t;){const o=t.mode||t.getAttribute("mode");if(o){if(p(o))return o;l(t)&&console.warn('Invalid ionic mode: "'+o+'", expected: "ios" or "md"')}t=t.parentElement}return g}))};export{a,y as b,n as c,s as g,O as i}