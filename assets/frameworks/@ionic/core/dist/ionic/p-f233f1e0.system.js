/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
System.register([],(function(r){"use strict";return{execute:function(){var n=r("a",(function(r){try{if(r instanceof u){return r.value}if(!a()||typeof r!=="string"||r===""){return r}if(r.includes("onload=")){return""}var n=document.createDocumentFragment();var i=document.createElement("div");n.appendChild(i);i.innerHTML=r;v.forEach((function(r){var a=n.querySelectorAll(r);for(var i=a.length-1;i>=0;i--){var v=a[i];if(v.parentNode){v.parentNode.removeChild(v)}else{n.removeChild(v)}var u=t(v);for(var o=0;o<u.length;o++){e(u[o])}}}));var o=t(n);for(var f=0;f<o.length;f++){e(o[f])}var c=document.createElement("div");c.appendChild(n);var d=c.querySelector("div");return d!==null?d.innerHTML:c.innerHTML}catch(r){console.error(r);return""}}));var e=function(r){if(r.nodeType&&r.nodeType!==1){return}if(typeof NamedNodeMap!=="undefined"&&!(r.attributes instanceof NamedNodeMap)){r.remove();return}for(var n=r.attributes.length-1;n>=0;n--){var a=r.attributes.item(n);var v=a.name;if(!i.includes(v.toLowerCase())){r.removeAttribute(v);continue}var u=a.value;var o=r[v];if(u!=null&&u.toLowerCase().includes("javascript:")||o!=null&&o.toLowerCase().includes("javascript:")){r.removeAttribute(v)}}var f=t(r);for(var n=0;n<f.length;n++){e(f[n])}};var t=function(r){return r.children!=null?r.children:r.childNodes};var a=function(){var r;var n=window;var e=(r=n===null||n===void 0?void 0:n.Ionic)===null||r===void 0?void 0:r.config;if(e){if(e.get){return e.get("sanitizerEnabled",true)}else{return e.sanitizerEnabled===true||e.sanitizerEnabled===undefined}}return true};var i=["class","id","href","src","name","slot"];var v=["script","style","iframe","meta","link","object","embed"];var u=function(){function r(r){this.value=r}return r}();r("I",u);var o=r("s",(function(r){var n=window;var e=n.Ionic;if(e&&e.config&&e.config.constructor.name!=="Object"){return}n.Ionic=n.Ionic||{};n.Ionic.config=Object.assign(Object.assign({},n.Ionic.config),r);return n.Ionic.config}));var f=r("g",(function(){var r;var n=window;var e=(r=n===null||n===void 0?void 0:n.Ionic)===null||r===void 0?void 0:r.config;if(e){if(e.mode){return e.mode}else{return e.get("mode")}}return"md"}));var c=r("E",false)}}}));