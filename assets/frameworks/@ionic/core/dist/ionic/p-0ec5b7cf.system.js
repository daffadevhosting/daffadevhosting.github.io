var __spreadArray=this&&this.__spreadArray||function(r,e,n){if(n||arguments.length===2)for(var a=0,o=e.length,s;a<o;a++){if(s||!(a in e)){if(!s)s=Array.prototype.slice.call(e,0,a);s[a]=e[a]}}return r.concat(s||Array.prototype.slice.call(e))};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-f201b53a.system.js"],(function(r){"use strict";var e;return{setters:[function(r){e=r.c}],execute:function(){var n=r("p",(function(r){var n=[];for(var a=1;a<arguments.length;a++){n[a-1]=arguments[a]}var o=e.get("logLevel","WARN");if(["WARN"].includes(o)){return console.warn.apply(console,__spreadArray(["[Ionic Warning]: ".concat(r)],n,false))}}));var a=r("a",(function(r){var n=[];for(var a=1;a<arguments.length;a++){n[a-1]=arguments[a]}var o=e.get("logLevel","ERROR");if(["ERROR","WARN"].includes(o)){return console.error.apply(console,__spreadArray(["[Ionic Error]: ".concat(r)],n,false))}}));var o=r("b",(function(r){var e=[];for(var n=1;n<arguments.length;n++){e[n-1]=arguments[n]}return console.error("<".concat(r.tagName.toLowerCase(),"> must be used inside ").concat(e.join(" or "),"."))}))}}}));