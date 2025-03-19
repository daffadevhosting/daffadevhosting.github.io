/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{w as writeTask}from"./index-527b9e34.js";import{h as hapticSelectionEnd,a as hapticSelectionStart,b as hapticSelectionChanged}from"./haptic-ac164e4c.js";import{createGesture}from"./index-39782642.js";var createButtonActiveGesture=function(t,e){var n;var r;var i=function(t,r,i){if(typeof document==="undefined"){return}var o=document.elementFromPoint(t,r);if(!o||!e(o)||o.disabled){c();return}if(o!==n){c();a(o,i)}};var a=function(t,e){n=t;if(!r){r=n}var i=n;writeTask((function(){return i.classList.add("ion-activated")}));e()};var c=function(t){if(t===void 0){t=false}if(!n){return}var e=n;writeTask((function(){return e.classList.remove("ion-activated")}));if(t&&r!==n){n.click()}n=undefined};return createGesture({el:t,gestureName:"buttonActiveDrag",threshold:0,onStart:function(t){return i(t.currentX,t.currentY,hapticSelectionStart)},onMove:function(t){return i(t.currentX,t.currentY,hapticSelectionChanged)},onEnd:function(){c(true);hapticSelectionEnd();r=undefined}})};export{createButtonActiveGesture as c};