/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{r as t,h as i,e as o,f as e}from"./p-66a5d6a8.js";import{h as n}from"./p-b9ea58ef.js";import{c as a}from"./p-47794def.js";import{b as r}from"./p-597ff9af.js";const l=class{constructor(i){t(this,i),this.pickerColumn=null,this.ariaLabel=null,this.disabled=!1,this.value=void 0,this.color="primary"}onAriaLabelChange(t){this.ariaLabel=t}componentWillLoad(){const t=n(this.el,["aria-label"]);this.ariaLabel=t["aria-label"]||null}connectedCallback(){this.pickerColumn=this.el.closest("ion-picker-column")}disconnectedCallback(){this.pickerColumn=null}componentDidLoad(){const{pickerColumn:t}=this;null!==t&&t.scrollActiveItemIntoView()}onClick(){const{pickerColumn:t}=this;null!==t&&t.setValue(this.value)}render(){const{color:t,disabled:e,ariaLabel:n}=this,l=r(this);return i(o,{key:"c1353e99c2aa19c0e3ddbe433557ed18e72e1c66",class:a(t,{[l]:!0,"option-disabled":e})},i("button",{key:"b4ee62ecf7458a07a56e8aa494485766a87a3fcb",tabindex:"-1","aria-label":n,disabled:e,onClick:()=>this.onClick()},i("slot",{key:"9ab1e4700c27103b676670a4b3521c183c6ab83d"})))}get el(){return e(this)}static get watchers(){return{"aria-label":["onAriaLabelChange"]}}};l.style={ios:"button{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden}:host(.option-disabled){opacity:0.4}:host(.option-disabled) button{cursor:default}",md:"button{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden}:host(.option-disabled){opacity:0.4}:host(.option-disabled) button{cursor:default}:host(.option-active){color:var(--ion-color-base)}"};export{l as ion_picker_column_option}