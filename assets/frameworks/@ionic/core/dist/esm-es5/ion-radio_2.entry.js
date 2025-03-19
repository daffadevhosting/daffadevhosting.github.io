import{__awaiter,__generator}from"tslib";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */import{r as registerInstance,c as createEvent,h,e as Host,f as getElement}from"./index-527b9e34.js";import{a as addEventListener,b as removeEventListener,d as renderHiddenInput}from"./helpers-e48b0397.js";import{i as isOptionSelected}from"./compare-with-utils-a96ff2ea.js";import{h as hostContext,c as createColorClasses}from"./theme-01f3f29c.js";import{b as getIonMode}from"./ionic-global-ca86cf32.js";var radioIosCss=':host{--inner-border-radius:50%;display:inline-block;position:relative;max-width:100%;min-height:inherit;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;contain:layout size style}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host(:focus){outline:none}:host(.in-item){-ms-flex:1 1 0px;flex:1 1 0;width:100%;height:100%}:host([slot=start]),:host([slot=end]){-ms-flex:initial;flex:initial;width:auto}.radio-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:inherit;min-height:inherit;cursor:inherit}.label-text-wrapper{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host(.in-item) .label-text-wrapper{margin-top:10px;margin-bottom:10px}:host(.in-item.radio-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.radio-label-placement-stacked) .native-wrapper{margin-bottom:10px}.label-text-wrapper-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host(.radio-justify-space-between) .radio-wrapper{-ms-flex-pack:justify;justify-content:space-between}:host(.radio-justify-start) .radio-wrapper{-ms-flex-pack:start;justify-content:start}:host(.radio-justify-end) .radio-wrapper{-ms-flex-pack:end;justify-content:end}:host(.radio-alignment-start) .radio-wrapper{-ms-flex-align:start;align-items:start}:host(.radio-alignment-center) .radio-wrapper{-ms-flex-align:center;align-items:center}:host(.radio-justify-space-between),:host(.radio-justify-start),:host(.radio-justify-end),:host(.radio-alignment-start),:host(.radio-alignment-center){display:block}:host(.radio-label-placement-start) .radio-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.radio-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.radio-label-placement-end) .radio-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.radio-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}:host(.radio-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.radio-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px}:host(.radio-label-placement-stacked) .radio-wrapper{-ms-flex-direction:column;flex-direction:column}:host(.radio-label-placement-stacked) .label-text-wrapper{-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host(.radio-label-placement-stacked.radio-alignment-start) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]):host(.radio-label-placement-stacked.radio-alignment-start) .label-text-wrapper,:host-context([dir=rtl]).radio-label-placement-stacked.radio-alignment-start .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.radio-label-placement-stacked.radio-alignment-start:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.radio-label-placement-stacked.radio-alignment-center) .label-text-wrapper{-webkit-transform-origin:center top;transform-origin:center top}:host-context([dir=rtl]):host(.radio-label-placement-stacked.radio-alignment-center) .label-text-wrapper,:host-context([dir=rtl]).radio-label-placement-stacked.radio-alignment-center .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}@supports selector(:dir(rtl)){:host(.radio-label-placement-stacked.radio-alignment-center:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}}:host{--color-checked:var(--ion-color-primary, #0054e9)}:host(.ion-color.radio-checked) .radio-inner{border-color:var(--ion-color-base)}.item-radio.item-ios ion-label{-webkit-margin-start:0;margin-inline-start:0}.radio-inner{width:33%;height:50%}:host(.radio-checked) .radio-inner{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:0.125rem;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--color-checked)}:host(.radio-disabled){opacity:0.3}:host(.ion-focused) .radio-icon::after{border-radius:var(--inner-border-radius);top:-8px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #1a65eb);content:"";opacity:0.2}:host(.ion-focused) .radio-icon::after{inset-inline-start:-9px}.native-wrapper .radio-icon{width:0.9375rem;height:1.5rem}';var IonRadioIosStyle0=radioIosCss;var radioMdCss=':host{--inner-border-radius:50%;display:inline-block;position:relative;max-width:100%;min-height:inherit;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;contain:layout size style}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host(:focus){outline:none}:host(.in-item){-ms-flex:1 1 0px;flex:1 1 0;width:100%;height:100%}:host([slot=start]),:host([slot=end]){-ms-flex:initial;flex:initial;width:auto}.radio-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:inherit;min-height:inherit;cursor:inherit}.label-text-wrapper{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host(.in-item) .label-text-wrapper{margin-top:10px;margin-bottom:10px}:host(.in-item.radio-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.radio-label-placement-stacked) .native-wrapper{margin-bottom:10px}.label-text-wrapper-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host(.radio-justify-space-between) .radio-wrapper{-ms-flex-pack:justify;justify-content:space-between}:host(.radio-justify-start) .radio-wrapper{-ms-flex-pack:start;justify-content:start}:host(.radio-justify-end) .radio-wrapper{-ms-flex-pack:end;justify-content:end}:host(.radio-alignment-start) .radio-wrapper{-ms-flex-align:start;align-items:start}:host(.radio-alignment-center) .radio-wrapper{-ms-flex-align:center;align-items:center}:host(.radio-justify-space-between),:host(.radio-justify-start),:host(.radio-justify-end),:host(.radio-alignment-start),:host(.radio-alignment-center){display:block}:host(.radio-label-placement-start) .radio-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.radio-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.radio-label-placement-end) .radio-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.radio-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}:host(.radio-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.radio-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px}:host(.radio-label-placement-stacked) .radio-wrapper{-ms-flex-direction:column;flex-direction:column}:host(.radio-label-placement-stacked) .label-text-wrapper{-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host(.radio-label-placement-stacked.radio-alignment-start) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]):host(.radio-label-placement-stacked.radio-alignment-start) .label-text-wrapper,:host-context([dir=rtl]).radio-label-placement-stacked.radio-alignment-start .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.radio-label-placement-stacked.radio-alignment-start:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.radio-label-placement-stacked.radio-alignment-center) .label-text-wrapper{-webkit-transform-origin:center top;transform-origin:center top}:host-context([dir=rtl]):host(.radio-label-placement-stacked.radio-alignment-center) .label-text-wrapper,:host-context([dir=rtl]).radio-label-placement-stacked.radio-alignment-center .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}@supports selector(:dir(rtl)){:host(.radio-label-placement-stacked.radio-alignment-center:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}}:host{--color:rgb(var(--ion-text-color-rgb, 0, 0, 0), 0.6);--color-checked:var(--ion-color-primary, #0054e9);--border-width:0.125rem;--border-style:solid;--border-radius:50%}:host(.ion-color) .radio-inner{background:var(--ion-color-base)}:host(.ion-color.radio-checked) .radio-icon{border-color:var(--ion-color-base)}.radio-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:var(--border-radius);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--color)}.radio-inner{border-radius:var(--inner-border-radius);width:calc(50% + var(--border-width));height:calc(50% + var(--border-width));-webkit-transform:scale3d(0, 0, 0);transform:scale3d(0, 0, 0);-webkit-transition:-webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:-webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);background:var(--color-checked)}:host(.radio-checked) .radio-icon{border-color:var(--color-checked)}:host(.radio-checked) .radio-inner{-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}:host(.radio-disabled) .label-text-wrapper{opacity:0.38}:host(.radio-disabled) .native-wrapper{opacity:0.63}:host(.ion-focused) .radio-icon::after{border-radius:var(--inner-border-radius);display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #1a65eb);content:"";opacity:0.2}.native-wrapper .radio-icon{width:1.25rem;height:1.25rem}';var IonRadioMdStyle0=radioMdCss;var Radio=function(){function e(e){var t=this;registerInstance(this,e);this.ionFocus=createEvent(this,"ionFocus",7);this.ionBlur=createEvent(this,"ionBlur",7);this.inputId="ion-rb-".concat(radioButtonIds++);this.radioGroup=null;this.updateState=function(){if(t.radioGroup){var e=t.radioGroup,r=e.compareWith,i=e.value;t.checked=isOptionSelected(i,t.value,r)}};this.onClick=function(){var e=t,r=e.radioGroup,i=e.checked,a=e.disabled;if(a){return}if(i&&(r===null||r===void 0?void 0:r.allowEmptySelection)){t.checked=false}else{t.checked=true}};this.onFocus=function(){t.ionFocus.emit()};this.onBlur=function(){t.ionBlur.emit()};this.checked=false;this.buttonTabindex=-1;this.color=undefined;this.name=this.inputId;this.disabled=false;this.value=undefined;this.labelPlacement="start";this.justify=undefined;this.alignment=undefined}e.prototype.valueChanged=function(){this.updateState()};e.prototype.componentDidLoad=function(){this.updateState()};e.prototype.setFocus=function(e){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){if(e!==undefined){e.stopPropagation();e.preventDefault()}this.el.focus();return[2]}))}))};e.prototype.setButtonTabindex=function(e){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.buttonTabindex=e;return[2]}))}))};e.prototype.connectedCallback=function(){if(this.value===undefined){this.value=this.inputId}var e=this.radioGroup=this.el.closest("ion-radio-group");if(e){this.updateState();addEventListener(e,"ionValueChange",this.updateState)}};e.prototype.disconnectedCallback=function(){var e=this.radioGroup;if(e){removeEventListener(e,"ionValueChange",this.updateState);this.radioGroup=null}};Object.defineProperty(e.prototype,"hasLabel",{get:function(){return this.el.textContent!==""},enumerable:false,configurable:true});e.prototype.renderRadioControl=function(){return h("div",{class:"radio-icon",part:"container"},h("div",{class:"radio-inner",part:"mark"}),h("div",{class:"radio-ripple"}))};e.prototype.render=function(){var e;var t=this,r=t.checked,i=t.disabled,a=t.color,o=t.el,n=t.justify,s=t.labelPlacement,l=t.hasLabel,d=t.buttonTabindex,c=t.alignment;var p=getIonMode(this);var f=hostContext("ion-item",o);return h(Host,{key:"8badd4aec277addc0793e14df21f73bb345e99b7",onFocus:this.onFocus,onBlur:this.onBlur,onClick:this.onClick,class:createColorClasses(a,(e={},e[p]=true,e["in-item"]=f,e["radio-checked"]=r,e["radio-disabled"]=i,e["radio-justify-".concat(n)]=n!==undefined,e["radio-alignment-".concat(c)]=c!==undefined,e["radio-label-placement-".concat(s)]=true,e["ion-activatable"]=!f,e["ion-focusable"]=!f,e)),role:"radio","aria-checked":r?"true":"false","aria-disabled":i?"true":null,tabindex:d},h("label",{key:"8765b847edc93a1b5a16506e155ed03da807bb10",class:"radio-wrapper"},h("div",{key:"3d568a0192a32d4f0b8a920019c79ff02639b5c9",class:{"label-text-wrapper":true,"label-text-wrapper-hidden":!l},part:"label"},h("slot",{key:"331f3dc2ce5f6ed8f124fc4560f92e0f7c668a85"})),h("div",{key:"473bd4aaf448753e385f2dda3fddc9f56379aa19",class:"native-wrapper"},this.renderRadioControl())))};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{value:["valueChanged"]}},enumerable:false,configurable:true});return e}();var radioButtonIds=0;Radio.style={ios:IonRadioIosStyle0,md:IonRadioMdStyle0};var radioGroupIosCss="ion-radio-group{vertical-align:top}.radio-group-wrapper{display:inline}.radio-group-top{line-height:1.5}.radio-group-top .error-text{display:none;color:var(--ion-color-danger, #c5000f)}.radio-group-top .helper-text{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}.ion-touched.ion-invalid .radio-group-top .error-text{display:block}.ion-touched.ion-invalid .radio-group-top .helper-text{display:none}ion-list .radio-group-top{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}";var IonRadioGroupIosStyle0=radioGroupIosCss;var radioGroupMdCss="ion-radio-group{vertical-align:top}.radio-group-wrapper{display:inline}.radio-group-top{line-height:1.5}.radio-group-top .error-text{display:none;color:var(--ion-color-danger, #c5000f)}.radio-group-top .helper-text{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}.ion-touched.ion-invalid .radio-group-top .error-text{display:block}.ion-touched.ion-invalid .radio-group-top .helper-text{display:none}ion-list .radio-group-top{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}";var IonRadioGroupMdStyle0=radioGroupMdCss;var RadioGroup=function(){function e(e){var t=this;registerInstance(this,e);this.ionChange=createEvent(this,"ionChange",7);this.ionValueChange=createEvent(this,"ionValueChange",7);this.inputId="ion-rg-".concat(radioGroupIds++);this.helperTextId="".concat(this.inputId,"-helper-text");this.errorTextId="".concat(this.inputId,"-error-text");this.labelId="".concat(this.inputId,"-lbl");this.setRadioTabindex=function(e){var r=t.getRadios();var i=r.find((function(e){return!e.disabled}));var a=r.find((function(t){return t.value===e&&!t.disabled}));if(!i&&!a){return}var o=a||i;for(var n=0,s=r;n<s.length;n++){var l=s[n];var d=l===o?0:-1;l.setButtonTabindex(d)}};this.onClick=function(e){e.preventDefault();var r=e.target&&e.target.closest("ion-radio");if(r&&!r.disabled){var i=t.value;var a=r.value;if(a!==i){t.value=a;t.emitValueChange(e)}else if(t.allowEmptySelection){t.value=undefined;t.emitValueChange(e)}}};this.allowEmptySelection=false;this.compareWith=undefined;this.name=this.inputId;this.value=undefined;this.helperText=undefined;this.errorText=undefined}e.prototype.valueChanged=function(e){this.setRadioTabindex(e);this.ionValueChange.emit({value:e})};e.prototype.componentDidLoad=function(){this.valueChanged(this.value)};e.prototype.connectedCallback=function(){return __awaiter(this,void 0,void 0,(function(){var e,t;return __generator(this,(function(r){e=this.el.querySelector("ion-list-header")||this.el.querySelector("ion-item-divider");if(e){t=this.label=e.querySelector("ion-label");if(t){this.labelId=t.id=this.name+"-lbl"}}return[2]}))}))};e.prototype.getRadios=function(){return Array.from(this.el.querySelectorAll("ion-radio"))};e.prototype.emitValueChange=function(e){var t=this.value;this.ionChange.emit({value:t,event:e})};e.prototype.onKeydown=function(e){var t=!!this.el.closest("ion-select-popover")||!!this.el.closest("ion-select-modal");if(e.target&&!this.el.contains(e.target)){return}var r=this.getRadios().filter((function(e){return!e.disabled}));if(e.target&&r.includes(e.target)){var i=r.findIndex((function(t){return t===e.target}));var a=r[i];var o=void 0;if(["ArrowDown","ArrowRight"].includes(e.key)){o=i===r.length-1?r[0]:r[i+1]}if(["ArrowUp","ArrowLeft"].includes(e.key)){o=i===0?r[r.length-1]:r[i-1]}if(o&&r.includes(o)){o.setFocus(e);if(!t){this.value=o.value;this.emitValueChange(e)}}if([" "].includes(e.key)){var n=this.value;this.value=this.allowEmptySelection&&this.value!==undefined?undefined:a.value;if(n!==this.value||this.allowEmptySelection){this.emitValueChange(e)}e.preventDefault()}}};e.prototype.setFocus=function(){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(t){e=this.getRadios().find((function(e){return e.tabIndex!==-1}));e===null||e===void 0?void 0:e.setFocus();return[2]}))}))};e.prototype.renderHintText=function(){var e=this,t=e.helperText,r=e.errorText,i=e.helperTextId,a=e.errorTextId;var o=!!t||!!r;if(!o){return}return h("div",{class:"radio-group-top"},h("div",{id:i,class:"helper-text"},t),h("div",{id:a,class:"error-text"},r))};e.prototype.getHintTextID=function(){var e=this,t=e.el,r=e.helperText,i=e.errorText,a=e.helperTextId,o=e.errorTextId;if(t.classList.contains("ion-touched")&&t.classList.contains("ion-invalid")&&i){return o}if(r){return a}return undefined};e.prototype.render=function(){var e=this,t=e.label,r=e.labelId,i=e.el,a=e.name,o=e.value;var n=getIonMode(this);renderHiddenInput(true,i,a,o,false);return h(Host,{key:"cac92777297029d7fd1b6af264d92850e35dfbba",role:"radiogroup","aria-labelledby":t?r:null,"aria-describedby":this.getHintTextID(),"aria-invalid":this.getHintTextID()===this.errorTextId,onClick:this.onClick,class:n},this.renderHintText(),h("div",{key:"6b5c634dba30d54eedc031b077863f3d6a9d9e9b",class:"radio-group-wrapper"},h("slot",{key:"443edb3ff6f4c59d4c4324c8a19f2d6def47a322"})))};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{value:["valueChanged"]}},enumerable:false,configurable:true});return e}();var radioGroupIds=0;RadioGroup.style={ios:IonRadioGroupIosStyle0,md:IonRadioGroupMdStyle0};export{Radio as ion_radio,RadioGroup as ion_radio_group};