import{__awaiter,__generator}from"tslib";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */import{r as registerInstance,h,e as Host,f as getElement,c as createEvent}from"./index-527b9e34.js";import{c as createColorClasses}from"./theme-01f3f29c.js";import{b as getIonMode}from"./ionic-global-ca86cf32.js";import{p as isEndSide}from"./helpers-e48b0397.js";import{f as findClosestIonContent,d as disableContentScrollY,r as resetContentScrollY}from"./index-933ca126.js";import{w as watchForOptions}from"./watch-options-c2911ace.js";import"./index-738d7504.js";var itemOptionIosCss=":host{--background:var(--ion-color-primary, #0054e9);--color:var(--ion-color-primary-contrast, #fff);background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit)}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-padding-start:0.7em;padding-inline-start:0.7em;-webkit-padding-end:0.7em;padding-inline-end:0.7em;padding-top:0;padding-bottom:0;display:inline-block;position:relative;width:100%;height:100%;border:0;outline:none;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}.button-inner{display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.horizontal-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%}::slotted(*){-ms-flex-negative:0;flex-shrink:0}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}::slotted([slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px;margin-top:0;margin-bottom:0;min-width:0.9em;font-size:1.8em}:host(.item-option-expandable){-ms-flex-negative:0;flex-shrink:0;-webkit-transition-duration:0;transition-duration:0;-webkit-transition-property:none;transition-property:none;-webkit-transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1);transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1)}:host(.item-option-disabled){pointer-events:none}:host(.item-option-disabled) .button-native{cursor:default;opacity:0.5;pointer-events:none}:host{font-size:clamp(16px, 1rem, 35.2px)}:host(.ion-activated){background:var(--ion-color-primary-shade, #004acd)}:host(.ion-color.ion-activated){background:var(--ion-color-shade)}";var IonItemOptionIosStyle0=itemOptionIosCss;var itemOptionMdCss=":host{--background:var(--ion-color-primary, #0054e9);--color:var(--ion-color-primary-contrast, #fff);background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit)}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-padding-start:0.7em;padding-inline-start:0.7em;-webkit-padding-end:0.7em;padding-inline-end:0.7em;padding-top:0;padding-bottom:0;display:inline-block;position:relative;width:100%;height:100%;border:0;outline:none;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}.button-inner{display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.horizontal-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%}::slotted(*){-ms-flex-negative:0;flex-shrink:0}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}::slotted([slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px;margin-top:0;margin-bottom:0;min-width:0.9em;font-size:1.8em}:host(.item-option-expandable){-ms-flex-negative:0;flex-shrink:0;-webkit-transition-duration:0;transition-duration:0;-webkit-transition-property:none;transition-property:none;-webkit-transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1);transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1)}:host(.item-option-disabled){pointer-events:none}:host(.item-option-disabled) .button-native{cursor:default;opacity:0.5;pointer-events:none}:host{font-size:0.875rem;font-weight:500;text-transform:uppercase}";var IonItemOptionMdStyle0=itemOptionMdCss;var ItemOption=function(){function t(t){registerInstance(this,t);this.onClick=function(t){var i=t.target.closest("ion-item-option");if(i){t.preventDefault()}};this.color=undefined;this.disabled=false;this.download=undefined;this.expandable=false;this.href=undefined;this.rel=undefined;this.target=undefined;this.type="button"}t.prototype.render=function(){var t;var i=this,e=i.disabled,n=i.expandable,o=i.href;var s=o===undefined?"button":"a";var r=getIonMode(this);var a=s==="button"?{type:this.type}:{download:this.download,href:this.href,target:this.target};return h(Host,{key:"1b7708dd178dc2c9280652ca3da38c84ba7b767f",onClick:this.onClick,class:createColorClasses(this.color,(t={},t[r]=true,t["item-option-disabled"]=e,t["item-option-expandable"]=n,t["ion-activatable"]=true,t))},h(s,Object.assign({key:"d9f899f5425ad6b97071494485aa3ca90bc89d30"},a,{class:"button-native",part:"native",disabled:e}),h("span",{key:"adc2cf72b4363be9b9eeb3584723e2bfc862af20",class:"button-inner"},h("slot",{key:"e668fe8e655a74e6a35e979e0cd488506b962dbf",name:"top"}),h("div",{key:"2ddcdb92b6b19c3cc549a7aee2400d1a6eeb51f1",class:"horizontal-wrapper"},h("slot",{key:"441f13df18b72e5ed6bb51b157722e065b5847d2",name:"start"}),h("slot",{key:"425d815874b49e1628880160d7175ed3ca36ca39",name:"icon-only"}),h("slot",{key:"27437d3fa3365b12bc030704e18481fdfb14aebb"}),h("slot",{key:"bd39330771c7f85c6df10f7f9050335ee7f14ff0",name:"end"})),h("slot",{key:"440cb6dc7743d50b261d4bf61d2c24e24b89e58c",name:"bottom"})),r==="md"&&h("ion-ripple-effect",{key:"29632941464bbb34551cf64961187643f62bf755"})))};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return t}();ItemOption.style={ios:IonItemOptionIosStyle0,md:IonItemOptionMdStyle0};var itemOptionsIosCss="ion-item-options{top:0;right:0;-ms-flex-pack:end;justify-content:flex-end;display:none;position:absolute;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}:host-context([dir=rtl]) ion-item-options{-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}[dir=rtl] ion-item-options{-ms-flex-pack:start;justify-content:flex-start}[dir=rtl] ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}@supports selector(:dir(rtl)){ion-item-options:dir(rtl){-ms-flex-pack:start;justify-content:flex-start}ion-item-options:dir(rtl):not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}}.item-options-start{right:auto;left:0;-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) .item-options-start{-ms-flex-pack:end;justify-content:flex-end}[dir=rtl] .item-options-start{-ms-flex-pack:end;justify-content:flex-end}@supports selector(:dir(rtl)){.item-options-start:dir(rtl){-ms-flex-pack:end;justify-content:flex-end}}[dir=ltr] .item-options-start ion-item-option:first-child,[dir=rtl] .item-options-start ion-item-option:last-child{padding-left:var(--ion-safe-area-left)}[dir=ltr] .item-options-end ion-item-option:last-child,[dir=rtl] .item-options-end ion-item-option:first-child{padding-right:var(--ion-safe-area-right)}:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}@supports selector(:dir(rtl)){.item-sliding-active-slide:dir(rtl).item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}}.item-sliding-active-slide ion-item-options{display:-ms-flexbox;display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-start .item-options-start,.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start){width:100%;visibility:visible}.item-options-ios{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, var(--ion-background-color-step-250, #c8c7cc))))}.item-options-ios.item-options-end{border-bottom-width:0.55px}.list-ios-lines-none .item-options-ios{border-bottom-width:0}.list-ios-lines-full .item-options-ios,.list-ios-lines-inset .item-options-ios.item-options-end{border-bottom-width:0.55px}";var IonItemOptionsIosStyle0=itemOptionsIosCss;var itemOptionsMdCss="ion-item-options{top:0;right:0;-ms-flex-pack:end;justify-content:flex-end;display:none;position:absolute;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}:host-context([dir=rtl]) ion-item-options{-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}[dir=rtl] ion-item-options{-ms-flex-pack:start;justify-content:flex-start}[dir=rtl] ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}@supports selector(:dir(rtl)){ion-item-options:dir(rtl){-ms-flex-pack:start;justify-content:flex-start}ion-item-options:dir(rtl):not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}}.item-options-start{right:auto;left:0;-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) .item-options-start{-ms-flex-pack:end;justify-content:flex-end}[dir=rtl] .item-options-start{-ms-flex-pack:end;justify-content:flex-end}@supports selector(:dir(rtl)){.item-options-start:dir(rtl){-ms-flex-pack:end;justify-content:flex-end}}[dir=ltr] .item-options-start ion-item-option:first-child,[dir=rtl] .item-options-start ion-item-option:last-child{padding-left:var(--ion-safe-area-left)}[dir=ltr] .item-options-end ion-item-option:last-child,[dir=rtl] .item-options-end ion-item-option:first-child{padding-right:var(--ion-safe-area-right)}:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}@supports selector(:dir(rtl)){.item-sliding-active-slide:dir(rtl).item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}}.item-sliding-active-slide ion-item-options{display:-ms-flexbox;display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-start .item-options-start,.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start){width:100%;visibility:visible}.item-options-md{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))))}.list-md-lines-none .item-options-md{border-bottom-width:0}.list-md-lines-full .item-options-md,.list-md-lines-inset .item-options-md.item-options-end{border-bottom-width:1px}";var IonItemOptionsMdStyle0=itemOptionsMdCss;var ItemOptions=function(){function t(t){registerInstance(this,t);this.ionSwipe=createEvent(this,"ionSwipe",7);this.side="end"}t.prototype.fireSwipeEvent=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.ionSwipe.emit({side:this.side});return[2]}))}))};t.prototype.render=function(){var t;var i=getIonMode(this);var e=isEndSide(this.side);return h(Host,{key:"7df4b71547524bf359c48e1b40ccbc44e850f632",class:(t={},t[i]=true,t["item-options-".concat(i)]=true,t["item-options-start"]=!e,t["item-options-end"]=e,t)})};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return t}();ItemOptions.style={ios:IonItemOptionsIosStyle0,md:IonItemOptionsMdStyle0};var itemSlidingCss="ion-item-sliding{display:block;position:relative;width:100%;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-item-sliding .item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.item-sliding-active-slide .item{position:relative;-webkit-transition:-webkit-transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);transition:-webkit-transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);transition:transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);transition:transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1), -webkit-transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);opacity:1;z-index:2;pointer-events:none;will-change:transform}.item-sliding-closing ion-item-options{pointer-events:none}.item-sliding-active-swipe-end .item-options-end .item-option-expandable{padding-left:100%;-ms-flex-order:1;order:1;-webkit-transition-duration:0.6s;transition-duration:0.6s;-webkit-transition-property:padding-left;transition-property:padding-left}:host-context([dir=rtl]) .item-sliding-active-swipe-end .item-options-end .item-option-expandable{-ms-flex-order:-1;order:-1}[dir=rtl] .item-sliding-active-swipe-end .item-options-end .item-option-expandable{-ms-flex-order:-1;order:-1}@supports selector(:dir(rtl)){.item-sliding-active-swipe-end .item-options-end .item-option-expandable:dir(rtl){-ms-flex-order:-1;order:-1}}.item-sliding-active-swipe-start .item-options-start .item-option-expandable{padding-right:100%;-ms-flex-order:-1;order:-1;-webkit-transition-duration:0.6s;transition-duration:0.6s;-webkit-transition-property:padding-right;transition-property:padding-right}:host-context([dir=rtl]) .item-sliding-active-swipe-start .item-options-start .item-option-expandable{-ms-flex-order:1;order:1}[dir=rtl] .item-sliding-active-swipe-start .item-options-start .item-option-expandable{-ms-flex-order:1;order:1}@supports selector(:dir(rtl)){.item-sliding-active-swipe-start .item-options-start .item-option-expandable:dir(rtl){-ms-flex-order:1;order:1}}";var IonItemSlidingStyle0=itemSlidingCss;var SWIPE_MARGIN=30;var ELASTIC_FACTOR=.55;var openSlidingItem;var ItemSliding=function(){function t(t){registerInstance(this,t);this.ionDrag=createEvent(this,"ionDrag",7);this.item=null;this.openAmount=0;this.initialOpenAmount=0;this.optsWidthRightSide=0;this.optsWidthLeftSide=0;this.sides=0;this.optsDirty=true;this.contentEl=null;this.initialContentScrollY=true;this.state=2;this.disabled=false}t.prototype.disabledChanged=function(){if(this.gesture){this.gesture.enable(!this.disabled)}};t.prototype.connectedCallback=function(){return __awaiter(this,void 0,void 0,(function(){var t,i;var e=this;return __generator(this,(function(n){switch(n.label){case 0:t=this.el;this.item=t.querySelector("ion-item");this.contentEl=findClosestIonContent(t);this.mutationObserver=watchForOptions(t,"ion-item-option",(function(){return __awaiter(e,void 0,void 0,(function(){return __generator(this,(function(t){switch(t.label){case 0:return[4,this.updateOptions()];case 1:t.sent();return[2]}}))}))}));return[4,this.updateOptions()];case 1:n.sent();i=this;return[4,import("./index-39782642.js")];case 2:i.gesture=n.sent().createGesture({el:t,gestureName:"item-swipe",gesturePriority:100,threshold:5,canStart:function(t){return e.canStart(t)},onStart:function(){return e.onStart()},onMove:function(t){return e.onMove(t)},onEnd:function(t){return e.onEnd(t)}});this.disabledChanged();return[2]}}))}))};t.prototype.disconnectedCallback=function(){if(this.gesture){this.gesture.destroy();this.gesture=undefined}this.item=null;this.leftOptions=this.rightOptions=undefined;if(openSlidingItem===this.el){openSlidingItem=undefined}if(this.mutationObserver){this.mutationObserver.disconnect();this.mutationObserver=undefined}};t.prototype.getOpenAmount=function(){return Promise.resolve(this.openAmount)};t.prototype.getSlidingRatio=function(){return Promise.resolve(this.getSlidingRatioSync())};t.prototype.open=function(t){return __awaiter(this,void 0,void 0,(function(){var i,e,n,o,s;var r=this;return __generator(this,(function(a){e=this.item=(i=this.item)!==null&&i!==void 0?i:this.el.querySelector("ion-item");if(e===null){return[2]}n=this.getOptions(t);if(!n){return[2]}if(t===undefined){t=n===this.leftOptions?"start":"end"}t=isEndSide(t)?"end":"start";o=this.openAmount<0;s=this.openAmount>0;if(o&&n===this.leftOptions){return[2]}if(s&&n===this.rightOptions){return[2]}this.closeOpened();this.state=4;requestAnimationFrame((function(){r.calculateOptsWidth();var i=t==="end"?r.optsWidthRightSide:-r.optsWidthLeftSide;openSlidingItem=r.el;r.setOpenAmount(i,false);r.state=t==="end"?8:16}));return[2]}))}))};t.prototype.close=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.setOpenAmount(0,true);return[2]}))}))};t.prototype.closeOpened=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(openSlidingItem!==undefined){openSlidingItem.close();openSlidingItem=undefined;return[2,true]}return[2,false]}))}))};t.prototype.getOptions=function(t){if(t===undefined){return this.leftOptions||this.rightOptions}else if(t==="start"){return this.leftOptions}else{return this.rightOptions}};t.prototype.updateOptions=function(){return __awaiter(this,void 0,void 0,(function(){var t,i,e,n,o,s,r;return __generator(this,(function(a){switch(a.label){case 0:t=this.el.querySelectorAll("ion-item-options");i=0;this.leftOptions=this.rightOptions=undefined;e=0;a.label=1;case 1:if(!(e<t.length))return[3,6];n=t.item(e);if(!(n.componentOnReady!==undefined))return[3,3];return[4,n.componentOnReady()];case 2:s=a.sent();return[3,4];case 3:s=n;a.label=4;case 4:o=s;r=isEndSide(o.side)?"end":"start";if(r==="start"){this.leftOptions=o;i|=1}else{this.rightOptions=o;i|=2}a.label=5;case 5:e++;return[3,1];case 6:this.optsDirty=true;this.sides=i;return[2]}}))}))};t.prototype.canStart=function(t){var i=document.dir==="rtl";var e=i?window.innerWidth-t.startX<15:t.startX<15;if(e){return false}var n=openSlidingItem;if(n&&n!==this.el){this.closeOpened()}return!!(this.rightOptions||this.leftOptions)};t.prototype.onStart=function(){this.item=this.el.querySelector("ion-item");var t=this.contentEl;if(t){this.initialContentScrollY=disableContentScrollY(t)}openSlidingItem=this.el;if(this.tmr!==undefined){clearTimeout(this.tmr);this.tmr=undefined}if(this.openAmount===0){this.optsDirty=true;this.state=4}this.initialOpenAmount=this.openAmount;if(this.item){this.item.style.transition="none"}};t.prototype.onMove=function(t){if(this.optsDirty){this.calculateOptsWidth()}var i=this.initialOpenAmount-t.deltaX;switch(this.sides){case 2:i=Math.max(0,i);break;case 1:i=Math.min(0,i);break;case 3:break;case 0:return;default:console.warn("invalid ItemSideFlags value",this.sides);break}var e;if(i>this.optsWidthRightSide){e=this.optsWidthRightSide;i=e+(i-e)*ELASTIC_FACTOR}else if(i<-this.optsWidthLeftSide){e=-this.optsWidthLeftSide;i=e+(i-e)*ELASTIC_FACTOR}this.setOpenAmount(i,false)};t.prototype.onEnd=function(t){var i=this,e=i.contentEl,n=i.initialContentScrollY;if(e){resetContentScrollY(e,n)}var o=t.velocityX;var s=this.openAmount>0?this.optsWidthRightSide:-this.optsWidthLeftSide;var r=this.openAmount>0===!(o<0);var a=Math.abs(o)>.3;var l=Math.abs(this.openAmount)<Math.abs(s/2);if(swipeShouldReset(r,a,l)){s=0}var d=this.state;this.setOpenAmount(s,true);if((d&32)!==0&&this.rightOptions){this.rightOptions.fireSwipeEvent()}else if((d&64)!==0&&this.leftOptions){this.leftOptions.fireSwipeEvent()}};t.prototype.calculateOptsWidth=function(){this.optsWidthRightSide=0;if(this.rightOptions){this.rightOptions.style.display="flex";this.optsWidthRightSide=this.rightOptions.offsetWidth;this.rightOptions.style.display=""}this.optsWidthLeftSide=0;if(this.leftOptions){this.leftOptions.style.display="flex";this.optsWidthLeftSide=this.leftOptions.offsetWidth;this.leftOptions.style.display=""}this.optsDirty=false};t.prototype.setOpenAmount=function(t,i){var e=this;if(this.tmr!==undefined){clearTimeout(this.tmr);this.tmr=undefined}if(!this.item){return}var n=this.el;var o=this.item.style;this.openAmount=t;if(i){o.transition=""}if(t>0){this.state=t>=this.optsWidthRightSide+SWIPE_MARGIN?8|32:8}else if(t<0){this.state=t<=-this.optsWidthLeftSide-SWIPE_MARGIN?16|64:16}else{n.classList.add("item-sliding-closing");if(this.gesture){this.gesture.enable(false)}this.tmr=setTimeout((function(){e.state=2;e.tmr=undefined;if(e.gesture){e.gesture.enable(!e.disabled)}n.classList.remove("item-sliding-closing")}),600);openSlidingItem=undefined;o.transform="";return}o.transform="translate3d(".concat(-t,"px,0,0)");this.ionDrag.emit({amount:t,ratio:this.getSlidingRatioSync()})};t.prototype.getSlidingRatioSync=function(){if(this.openAmount>0){return this.openAmount/this.optsWidthRightSide}else if(this.openAmount<0){return this.openAmount/this.optsWidthLeftSide}else{return 0}};t.prototype.render=function(){var t;var i=getIonMode(this);return h(Host,{key:"22f83febcbc1bc27e4ddbd7fcbe590de60a10e89",class:(t={},t[i]=true,t["item-sliding-active-slide"]=this.state!==2,t["item-sliding-active-options-end"]=(this.state&8)!==0,t["item-sliding-active-options-start"]=(this.state&16)!==0,t["item-sliding-active-swipe-end"]=(this.state&32)!==0,t["item-sliding-active-swipe-start"]=(this.state&64)!==0,t)})};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{disabled:["disabledChanged"]}},enumerable:false,configurable:true});return t}();var swipeShouldReset=function(t,i,e){return!i&&e||t&&i};ItemSliding.style=IonItemSlidingStyle0;export{ItemOption as ion_item_option,ItemOptions as ion_item_options,ItemSliding as ion_item_sliding};