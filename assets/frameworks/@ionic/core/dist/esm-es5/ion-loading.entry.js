import{__awaiter,__generator}from"tslib";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */import{r as registerInstance,c as createEvent,h,e as Host,f as getElement}from"./index-527b9e34.js";import{E as ENABLE_HTML_CONTENT_DEFAULT,a as sanitizeDOMString}from"./config-49c88215.js";import{r as raf}from"./helpers-e48b0397.js";import{c as createLockController}from"./lock-controller-316928be.js";import{d as createDelegateController,e as createTriggerController,B as BACKDROP,j as prepareOverlay,k as setOverlayId,f as present,g as dismiss,h as eventMethod}from"./overlays-7579a420.js";import{g as getClassMap}from"./theme-01f3f29c.js";import{c as config,b as getIonMode}from"./ionic-global-ca86cf32.js";import{c as createAnimation}from"./animation-eab5a4ca.js";import"./index-a5d50daf.js";import"./hardware-back-button-864101a3.js";import"./framework-delegate-c7d92b77.js";import"./gesture-controller-314a54f6.js";import"./index-738d7504.js";var iosEnterAnimation=function(i){var e=createAnimation();var n=createAnimation();var t=createAnimation();n.addElement(i.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]);t.addElement(i.querySelector(".loading-wrapper")).keyframes([{offset:0,opacity:.01,transform:"scale(1.1)"},{offset:1,opacity:1,transform:"scale(1)"}]);return e.addElement(i).easing("ease-in-out").duration(200).addAnimation([n,t])};var iosLeaveAnimation=function(i){var e=createAnimation();var n=createAnimation();var t=createAnimation();n.addElement(i.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0);t.addElement(i.querySelector(".loading-wrapper")).keyframes([{offset:0,opacity:.99,transform:"scale(1)"},{offset:1,opacity:0,transform:"scale(0.9)"}]);return e.addElement(i).easing("ease-in-out").duration(200).addAnimation([n,t])};var mdEnterAnimation=function(i){var e=createAnimation();var n=createAnimation();var t=createAnimation();n.addElement(i.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]);t.addElement(i.querySelector(".loading-wrapper")).keyframes([{offset:0,opacity:.01,transform:"scale(1.1)"},{offset:1,opacity:1,transform:"scale(1)"}]);return e.addElement(i).easing("ease-in-out").duration(200).addAnimation([n,t])};var mdLeaveAnimation=function(i){var e=createAnimation();var n=createAnimation();var t=createAnimation();n.addElement(i.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0);t.addElement(i.querySelector(".loading-wrapper")).keyframes([{offset:0,opacity:.99,transform:"scale(1)"},{offset:1,opacity:0,transform:"scale(0.9)"}]);return e.addElement(i).easing("ease-in-out").duration(200).addAnimation([n,t])};var loadingIosCss=".sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-ios-h{display:none}.loading-wrapper.sc-ion-loading-ios{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}ion-spinner.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-overlay-background-color, var(--ion-color-step-100, var(--ion-background-color-step-100, #f9f9f9)));--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));--backdrop-opacity:var(--ion-backdrop-opacity, 0.3);color:var(--ion-text-color, #000);font-size:0.875rem}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;-webkit-padding-start:34px;padding-inline-start:34px;-webkit-padding-end:34px;padding-inline-end:34px;padding-top:24px;padding-bottom:24px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.loading-translucent.sc-ion-loading-ios-h .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.loading-content.sc-ion-loading-ios{font-weight:bold}.loading-spinner.sc-ion-loading-ios+.loading-content.sc-ion-loading-ios{-webkit-margin-start:16px;margin-inline-start:16px}";var IonLoadingIosStyle0=loadingIosCss;var loadingMdCss=".sc-ion-loading-md-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-md-h{display:none}.loading-wrapper.sc-ion-loading-md{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}ion-spinner.sc-ion-loading-md{color:var(--spinner-color)}.sc-ion-loading-md-h{--background:var(--ion-color-step-50, var(--ion-background-color-step-50, #f2f2f2));--max-width:280px;--max-height:90%;--spinner-color:var(--ion-color-primary, #0054e9);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32);color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));font-size:0.875rem}.loading-wrapper.sc-ion-loading-md{border-radius:2px;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px;padding-top:24px;padding-bottom:24px;-webkit-box-shadow:0 16px 20px rgba(0, 0, 0, 0.4);box-shadow:0 16px 20px rgba(0, 0, 0, 0.4)}.loading-spinner.sc-ion-loading-md+.loading-content.sc-ion-loading-md{-webkit-margin-start:16px;margin-inline-start:16px}";var IonLoadingMdStyle0=loadingMdCss;var Loading=function(){function i(i){var e=this;registerInstance(this,i);this.didPresent=createEvent(this,"ionLoadingDidPresent",7);this.willPresent=createEvent(this,"ionLoadingWillPresent",7);this.willDismiss=createEvent(this,"ionLoadingWillDismiss",7);this.didDismiss=createEvent(this,"ionLoadingDidDismiss",7);this.didPresentShorthand=createEvent(this,"didPresent",7);this.willPresentShorthand=createEvent(this,"willPresent",7);this.willDismissShorthand=createEvent(this,"willDismiss",7);this.didDismissShorthand=createEvent(this,"didDismiss",7);this.delegateController=createDelegateController(this);this.lockController=createLockController();this.triggerController=createTriggerController();this.customHTMLEnabled=config.get("innerHTMLTemplatesEnabled",ENABLE_HTML_CONTENT_DEFAULT);this.presented=false;this.onBackdropTap=function(){e.dismiss(undefined,BACKDROP)};this.overlayIndex=undefined;this.delegate=undefined;this.hasController=false;this.keyboardClose=true;this.enterAnimation=undefined;this.leaveAnimation=undefined;this.message=undefined;this.cssClass=undefined;this.duration=0;this.backdropDismiss=false;this.showBackdrop=true;this.spinner=undefined;this.translucent=false;this.animated=true;this.htmlAttributes=undefined;this.isOpen=false;this.trigger=undefined}i.prototype.onIsOpenChange=function(i,e){if(i===true&&e===false){this.present()}else if(i===false&&e===true){this.dismiss()}};i.prototype.triggerChanged=function(){var i=this,e=i.trigger,n=i.el,t=i.triggerController;if(e){t.addClickListener(n,e)}};i.prototype.connectedCallback=function(){prepareOverlay(this.el);this.triggerChanged()};i.prototype.componentWillLoad=function(){var i;if(this.spinner===undefined){var e=getIonMode(this);this.spinner=config.get("loadingSpinner",config.get("spinner",e==="ios"?"lines":"crescent"))}if(!((i=this.htmlAttributes)===null||i===void 0?void 0:i.id)){setOverlayId(this.el)}};i.prototype.componentDidLoad=function(){var i=this;if(this.isOpen===true){raf((function(){return i.present()}))}this.triggerChanged()};i.prototype.disconnectedCallback=function(){this.triggerController.removeClickListener()};i.prototype.present=function(){return __awaiter(this,void 0,void 0,(function(){var i;var e=this;return __generator(this,(function(n){switch(n.label){case 0:return[4,this.lockController.lock()];case 1:i=n.sent();return[4,this.delegateController.attachViewToDom()];case 2:n.sent();return[4,present(this,"loadingEnter",iosEnterAnimation,mdEnterAnimation)];case 3:n.sent();if(this.duration>0){this.durationTimeout=setTimeout((function(){return e.dismiss()}),this.duration+10)}i();return[2]}}))}))};i.prototype.dismiss=function(i,e){return __awaiter(this,void 0,void 0,(function(){var n,t;return __generator(this,(function(a){switch(a.label){case 0:return[4,this.lockController.lock()];case 1:n=a.sent();if(this.durationTimeout){clearTimeout(this.durationTimeout)}return[4,dismiss(this,i,e,"loadingLeave",iosLeaveAnimation,mdLeaveAnimation)];case 2:t=a.sent();if(t){this.delegateController.removeViewFromDom()}n();return[2,t]}}))}))};i.prototype.onDidDismiss=function(){return eventMethod(this.el,"ionLoadingDidDismiss")};i.prototype.onWillDismiss=function(){return eventMethod(this.el,"ionLoadingWillDismiss")};i.prototype.renderLoadingMessage=function(i){var e=this,n=e.customHTMLEnabled,t=e.message;if(n){return h("div",{class:"loading-content",id:i,innerHTML:sanitizeDOMString(t)})}return h("div",{class:"loading-content",id:i},t)};i.prototype.render=function(){var i;var e=this,n=e.message,t=e.spinner,a=e.htmlAttributes,o=e.overlayIndex;var r=getIonMode(this);var s="loading-".concat(o,"-msg");var d=n!==undefined?s:null;return h(Host,Object.assign({key:"d6066c8b56b1fe4b597a243a7dab191ef0d21286",role:"dialog","aria-modal":"true","aria-labelledby":d,tabindex:"-1"},a,{style:{zIndex:"".concat(4e4+this.overlayIndex)},onIonBackdropTap:this.onBackdropTap,class:Object.assign(Object.assign({},getClassMap(this.cssClass)),(i={},i[r]=true,i["overlay-hidden"]=true,i["loading-translucent"]=this.translucent,i))}),h("ion-backdrop",{key:"2431eda00a2a3f510f5dfc39b7c7d47c056dfa3d",visible:this.showBackdrop,tappable:this.backdropDismiss}),h("div",{key:"cf210aaf5e754e4eccdb49cf7ead4647b3f9b2d1",tabindex:"0","aria-hidden":"true"}),h("div",{key:"fa9375143d391656d70e181d25b952c77c2fc6ec",class:"loading-wrapper ion-overlay-wrapper"},t&&h("div",{key:"8e4a4ed994f7f62df86b03696ac95162df41f52d",class:"loading-spinner"},h("ion-spinner",{key:"e5b323c272d365853ba92bd211e390b4fd4751d2",name:t,"aria-hidden":"true"})),n!==undefined&&this.renderLoadingMessage(s)),h("div",{key:"cae35ec8c34800477bff3ebcec8010e632158233",tabindex:"0","aria-hidden":"true"}))};Object.defineProperty(i.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(i,"watchers",{get:function(){return{isOpen:["onIsOpenChange"],trigger:["triggerChanged"]}},enumerable:false,configurable:true});return i}();Loading.style={ios:IonLoadingIosStyle0,md:IonLoadingMdStyle0};export{Loading as ion_loading};