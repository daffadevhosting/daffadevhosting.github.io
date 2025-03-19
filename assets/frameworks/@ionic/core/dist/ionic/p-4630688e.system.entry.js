/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
System.register(["./p-f11a9436.system.js","./p-0ec5b7cf.system.js","./p-4609d030.system.js","./p-1e955a45.system.js","./p-f201b53a.system.js"],(function(t){"use strict";var e,n,i,o,s,r,u,a,c;return{setters:[function(t){e=t.r;n=t.h;i=t.e;o=t.f},function(t){s=t.p},function(t){r=t.c},function(t){u=t.x;a=t.y},function(t){c=t.b}],execute:function(){var f="";var d=f;var l="";var p=l;var h=t("ion_input_password_toggle",function(){function t(t){var n=this;e(this,t);this.togglePasswordVisibility=function(){var t=n.inputElRef;if(!t){return}t.type=t.type==="text"?"password":"text"};this.color=undefined;this.showIcon=undefined;this.hideIcon=undefined;this.type="password"}t.prototype.onTypeChange=function(t){if(t!=="text"&&t!=="password"){s('ion-input-password-toggle only supports inputs of type "text" or "password". Input of type "'.concat(t,'" is not compatible.'),this.el);return}};t.prototype.connectedCallback=function(){var t=this.el;var e=this.inputElRef=t.closest("ion-input");if(!e){s("No ancestor ion-input found for ion-input-password-toggle. This component must be slotted inside of an ion-input.",t);return}this.type=e.type};t.prototype.disconnectedCallback=function(){this.inputElRef=null};t.prototype.render=function(){var t;var e,o;var s=this,f=s.color,d=s.type;var l=c(this);var p=(e=this.showIcon)!==null&&e!==void 0?e:u;var h=(o=this.hideIcon)!==null&&o!==void 0?o:a;var b=d==="text";return n(i,{key:"d9811e25bfeb2aa197352bb9be852e9e420739d5",class:r(f,(t={},t[l]=true,t))},n("ion-button",{key:"1eaea1442b248fb2b8d61538b27274e647a07804",mode:l,color:f,fill:"clear",shape:"round","aria-checked":b?"true":"false","aria-label":"show password",role:"switch",type:"button",onPointerDown:function(t){t.preventDefault()},onClick:this.togglePasswordVisibility},n("ion-icon",{key:"9c88de8f4631d9bde222ce2edf6950d639e04773",slot:"icon-only","aria-hidden":"true",icon:b?h:p})))};Object.defineProperty(t.prototype,"el",{get:function(){return o(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{type:["onTypeChange"]}},enumerable:false,configurable:true});return t}());h.style={ios:d,md:p}}}}));