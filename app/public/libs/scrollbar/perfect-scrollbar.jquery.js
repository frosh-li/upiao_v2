/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */

(function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var s=typeof require=="function"&&require;for(var o=0;o<r.length;o++)i(r[o]);return i})({1:[function(e,t,n){function s(e){e.fn.perfectScrollbar=function(t){return this.each(function(){if(typeof t=="object"||typeof t=="undefined"){var n=t;i.get(this)||r.initialize(this,n)}else{var s=t;s==="update"?r.update(this):s==="destroy"&&r.destroy(this)}return e(this)})}}var r=e("../main"),i=e("../plugin/instances");if(typeof define=="function"&&define.amd)define(["jquery"],s);else{var o=window.jQuery?window.jQuery:window.$;typeof o!="undefined"&&s(o)}t.exports=s},{"../main":7,"../plugin/instances":18}],2:[function(e,t,n){function r(e,t){var n=e.className.split(" ");n.indexOf(t)<0&&n.push(t),e.className=n.join(" ")}function i(e,t){var n=e.className.split(" "),r=n.indexOf(t);r>=0&&n.splice(r,1),e.className=n.join(" ")}n.add=function(e,t){e.classList?e.classList.add(t):r(e,t)},n.remove=function(e,t){e.classList?e.classList.remove(t):i(e,t)},n.list=function(e){return e.classList?Array.prototype.slice.apply(e.classList):e.className.split(" ")}},{}],3:[function(e,t,n){function i(e,t){return window.getComputedStyle(e)[t]}function s(e,t,n){return typeof n=="number"&&(n=n.toString()+"px"),e.style[t]=n,e}function o(e,t){for(var n in t){var r=t[n];typeof r=="number"&&(r=r.toString()+"px"),e.style[n]=r}return e}var r={};r.e=function(e,t){var n=document.createElement(e);return n.className=t,n},r.appendTo=function(e,t){return t.appendChild(e),e},r.css=function(e,t,n){return typeof t=="object"?o(e,t):typeof n=="undefined"?i(e,t):s(e,t,n)},r.matches=function(e,t){if(typeof e.matches!="undefined")return e.matches(t);if(typeof e.matchesSelector!="undefined")return e.matchesSelector(t);if(typeof e.webkitMatchesSelector!="undefined")return e.webkitMatchesSelector(t);if(typeof e.mozMatchesSelector!="undefined")return e.mozMatchesSelector(t);if(typeof e.msMatchesSelector!="undefined")return e.msMatchesSelector(t)},r.remove=function(e){typeof e.remove!="undefined"?e.remove():e.parentNode&&e.parentNode.removeChild(e)},r.queryChildren=function(e,t){return Array.prototype.filter.call(e.childNodes,function(e){return r.matches(e,t)})},t.exports=r},{}],4:[function(e,t,n){var r=function(e){this.element=e,this.events={}};r.prototype.bind=function(e,t){typeof this.events[e]=="undefined"&&(this.events[e]=[]),this.events[e].push(t),this.element.addEventListener(e,t,!1)},r.prototype.unbind=function(e,t){var n=typeof t!="undefined";this.events[e]=this.events[e].filter(function(r){return n&&r!==t?!0:(this.element.removeEventListener(e,r,!1),!1)},this)},r.prototype.unbindAll=function(){for(var e in this.events)this.unbind(e)};var i=function(){this.eventElements=[]};i.prototype.eventElement=function(e){var t=this.eventElements.filter(function(t){return t.element===e})[0];return typeof t=="undefined"&&(t=new r(e),this.eventElements.push(t)),t},i.prototype.bind=function(e,t,n){this.eventElement(e).bind(t,n)},i.prototype.unbind=function(e,t,n){this.eventElement(e).unbind(t,n)},i.prototype.unbindAll=function(){for(var e=0;e<this.eventElements.length;e++)this.eventElements[e].unbindAll()},i.prototype.once=function(e,t,n){var r=this.eventElement(e),i=function(e){r.unbind(t,i),n(e)};r.bind(t,i)},t.exports=i},{}],5:[function(e,t,n){t.exports=function(){function e(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return function(){return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}}()},{}],6:[function(e,t,n){var r=e("./class"),i=e("./dom");n.toInt=function(e){return parseInt(e,10)||0},n.clone=function(e){if(e===null)return null;if(typeof e=="object"){var t={};for(var n in e)t[n]=this.clone(e[n]);return t}return e},n.extend=function(e,t){var n=this.clone(e);for(var r in t)n[r]=this.clone(t[r]);return n},n.isEditable=function(e){return i.matches(e,"input,[contenteditable]")||i.matches(e,"select,[contenteditable]")||i.matches(e,"textarea,[contenteditable]")||i.matches(e,"button,[contenteditable]")},n.removePsClasses=function(e){var t=r.list(e);for(var n=0;n<t.length;n++){var i=t[n];i.indexOf("ps-")===0&&r.remove(e,i)}},n.outerWidth=function(e){return this.toInt(i.css(e,"width"))+this.toInt(i.css(e,"paddingLeft"))+this.toInt(i.css(e,"paddingRight"))+this.toInt(i.css(e,"borderLeftWidth"))+this.toInt(i.css(e,"borderRightWidth"))},n.startScrolling=function(e,t){r.add(e,"ps-in-scrolling"),typeof t!="undefined"?r.add(e,"ps-"+t):(r.add(e,"ps-x"),r.add(e,"ps-y"))},n.stopScrolling=function(e,t){r.remove(e,"ps-in-scrolling"),typeof t!="undefined"?r.remove(e,"ps-"+t):(r.remove(e,"ps-x"),r.remove(e,"ps-y"))},n.env={isWebKit:"WebkitAppearance"in document.documentElement.style,supportsTouch:"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,supportsIePointer:window.navigator.msMaxTouchPoints!==null}},{"./class":2,"./dom":3}],7:[function(e,t,n){var r=e("./plugin/destroy"),i=e("./plugin/initialize"),s=e("./plugin/update");t.exports={initialize:i,update:s,destroy:r}},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":21}],8:[function(e,t,n){t.exports={maxScrollbarLength:null,minScrollbarLength:null,scrollXMarginOffset:0,scrollYMarginOffset:0,stopPropagationOnClick:!0,suppressScrollX:!1,suppressScrollY:!1,swipePropagation:!0,useBothWheelAxes:!1,useKeyboard:!0,useSelectionScroll:!1,wheelPropagation:!1,wheelSpeed:1}},{}],9:[function(e,t,n){var r=e("../lib/dom"),i=e("../lib/helper"),s=e("./instances");t.exports=function(e){var t=s.get(e);if(!t)return;t.event.unbindAll(),r.remove(t.scrollbarX),r.remove(t.scrollbarY),r.remove(t.scrollbarXRail),r.remove(t.scrollbarYRail),i.removePsClasses(e),s.remove(e)}},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(e,t,n){function u(e,t){function n(e){return e.getBoundingClientRect()}var i=window.Event.prototype.stopPropagation.bind;t.settings.stopPropagationOnClick&&t.event.bind(t.scrollbarY,"click",i),t.event.bind(t.scrollbarYRail,"click",function(i){var u=r.toInt(t.scrollbarYHeight/2),a=t.railYRatio*(i.pageY-window.pageYOffset-n(t.scrollbarYRail).top-u),f=t.railYRatio*(t.railYHeight-t.scrollbarYHeight),l=a/f;l<0?l=0:l>1&&(l=1),o(e,"top",(t.contentHeight-t.containerHeight)*l),s(e),i.stopPropagation()}),t.settings.stopPropagationOnClick&&t.event.bind(t.scrollbarX,"click",i),t.event.bind(t.scrollbarXRail,"click",function(i){var u=r.toInt(t.scrollbarXWidth/2),a=t.railXRatio*(i.pageX-window.pageXOffset-n(t.scrollbarXRail).left-u),f=t.railXRatio*(t.railXWidth-t.scrollbarXWidth),l=a/f;l<0?l=0:l>1&&(l=1),o(e,"left",(t.contentWidth-t.containerWidth)*l-t.negativeScrollAdjustment),s(e),i.stopPropagation()})}var r=e("../../lib/helper"),i=e("../instances"),s=e("../update-geometry"),o=e("../update-scroll");t.exports=function(e){var t=i.get(e);u(e,t)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],11:[function(e,t,n){function a(e,t){function a(r){var s=n+r*t.railXRatio,o=Math.max(0,t.scrollbarXRail.getBoundingClientRect().left)+t.railXRatio*(t.railXWidth-t.scrollbarXWidth);s<0?t.scrollbarXLeft=0:s>o?t.scrollbarXLeft=o:t.scrollbarXLeft=s;var a=i.toInt(t.scrollbarXLeft*(t.contentWidth-t.containerWidth)/(t.containerWidth-t.railXRatio*t.scrollbarXWidth))-t.negativeScrollAdjustment;u(e,"left",a)}var n=null,s=null,f=function(t){a(t.pageX-s),o(e),t.stopPropagation(),t.preventDefault()},l=function(){i.stopScrolling(e,"x"),t.event.unbind(t.ownerDocument,"mousemove",f)};t.event.bind(t.scrollbarX,"mousedown",function(o){s=o.pageX,n=i.toInt(r.css(t.scrollbarX,"left"))*t.railXRatio,i.startScrolling(e,"x"),t.event.bind(t.ownerDocument,"mousemove",f),t.event.once(t.ownerDocument,"mouseup",l),o.stopPropagation(),o.preventDefault()})}function f(e,t){function a(r){var s=n+r*t.railYRatio,o=Math.max(0,t.scrollbarYRail.getBoundingClientRect().top)+t.railYRatio*(t.railYHeight-t.scrollbarYHeight);s<0?t.scrollbarYTop=0:s>o?t.scrollbarYTop=o:t.scrollbarYTop=s;var a=i.toInt(t.scrollbarYTop*(t.contentHeight-t.containerHeight)/(t.containerHeight-t.railYRatio*t.scrollbarYHeight));u(e,"top",a)}var n=null,s=null,f=function(t){a(t.pageY-s),o(e),t.stopPropagation(),t.preventDefault()},l=function(){i.stopScrolling(e,"y"),t.event.unbind(t.ownerDocument,"mousemove",f)};t.event.bind(t.scrollbarY,"mousedown",function(o){s=o.pageY,n=i.toInt(r.css(t.scrollbarY,"top"))*t.railYRatio,i.startScrolling(e,"y"),t.event.bind(t.ownerDocument,"mousemove",f),t.event.once(t.ownerDocument,"mouseup",l),o.stopPropagation(),o.preventDefault()})}var r=e("../../lib/dom"),i=e("../../lib/helper"),s=e("../instances"),o=e("../update-geometry"),u=e("../update-scroll");t.exports=function(e){var t=s.get(e);a(e,t),f(e,t)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],12:[function(e,t,n){function u(e,t){function u(n,r){var i=e.scrollTop;if(n===0){if(!t.scrollbarYActive)return!1;if(i===0&&r>0||i>=t.contentHeight-t.containerHeight&&r<0)return!t.settings.wheelPropagation}var s=e.scrollLeft;if(r===0){if(!t.scrollbarXActive)return!1;if(s===0&&n<0||s>=t.contentWidth-t.containerWidth&&n>0)return!t.settings.wheelPropagation}return!0}var n=!1;t.event.bind(e,"mouseenter",function(){n=!0}),t.event.bind(e,"mouseleave",function(){n=!1});var i=!1;t.event.bind(t.ownerDocument,"keydown",function(a){if(a.isDefaultPrevented&&a.isDefaultPrevented())return;if(!n)return;var f=document.activeElement?document.activeElement:t.ownerDocument.activeElement;if(f){while(f.shadowRoot)f=f.shadowRoot.activeElement;if(r.isEditable(f))return}var l=0,c=0;switch(a.which){case 37:l=-30;break;case 38:c=30;break;case 39:l=30;break;case 40:c=-30;break;case 33:c=90;break;case 32:a.shiftKey?c=90:c=-90;break;case 34:c=-90;break;case 35:a.ctrlKey?c=-t.contentHeight:c=-t.containerHeight;break;case 36:a.ctrlKey?c=e.scrollTop:c=t.containerHeight;break;default:return}o(e,"top",e.scrollTop-c),o(e,"left",e.scrollLeft+l),s(e),i=u(l,c),i&&a.preventDefault()})}var r=e("../../lib/helper"),i=e("../instances"),s=e("../update-geometry"),o=e("../update-scroll");t.exports=function(e){var t=i.get(e);u(e,t)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],13:[function(e,t,n){function o(e,t){function r(n,r){var i=e.scrollTop;if(n===0){if(!t.scrollbarYActive)return!1;if(i===0&&r>0||i>=t.contentHeight-t.containerHeight&&r<0)return!t.settings.wheelPropagation}var s=e.scrollLeft;if(r===0){if(!t.scrollbarXActive)return!1;if(s===0&&n<0||s>=t.contentWidth-t.containerWidth&&n>0)return!t.settings.wheelPropagation}return!0}function o(e){var t=e.deltaX,n=-1*e.deltaY;if(typeof t=="undefined"||typeof n=="undefined")t=-1*e.wheelDeltaX/6,n=e.wheelDeltaY/6;return e.deltaMode&&e.deltaMode===1&&(t*=10,n*=10),t!==t&&n!==n&&(t=0,n=e.wheelDelta),[t,n]}function u(t,n){var r=e.querySelector("textarea:hover");if(r){var i=r.scrollHeight-r.clientHeight;if(i>0&&!(r.scrollTop===0&&n>0||r.scrollTop===i&&n<0))return!0;var s=r.scrollLeft-r.clientWidth;if(s>0&&!(r.scrollLeft===0&&t<0)&&!(r.scrollLeft===s&&t>0))return!0}return!1}function a(a){var f=o(a),l=f[0],c=f[1];if(u(l,c))return;n=!1,t.settings.useBothWheelAxes?t.scrollbarYActive&&!t.scrollbarXActive?(c?s(e,"top",e.scrollTop-c*t.settings.wheelSpeed):s(e,"top",e.scrollTop+l*t.settings.wheelSpeed),n=!0):t.scrollbarXActive&&!t.scrollbarYActive&&(l?s(e,"left",e.scrollLeft+l*t.settings.wheelSpeed):s(e,"left",e.scrollLeft-c*t.settings.wheelSpeed),n=!0):(s(e,"top",e.scrollTop-c*t.settings.wheelSpeed),s(e,"left",e.scrollLeft+l*t.settings.wheelSpeed)),i(e),n=n||r(l,c),n&&(a.stopPropagation(),a.preventDefault())}var n=!1;typeof window.onwheel!="undefined"?t.event.bind(e,"wheel",a):typeof window.onmousewheel!="undefined"&&t.event.bind(e,"mousewheel",a)}var r=e("../instances"),i=e("../update-geometry"),s=e("../update-scroll");t.exports=function(e){var t=r.get(e);o(e,t)}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],14:[function(e,t,n){function s(e,t){t.event.bind(e,"scroll",function(){i(e)})}var r=e("../instances"),i=e("../update-geometry");t.exports=function(e){var t=r.get(e);s(e,t)}},{"../instances":18,"../update-geometry":19}],15:[function(e,t,n){function u(e,t){function n(){var e=window.getSelection?window.getSelection():document.getSelection?document.getSelection():"";return e.toString().length===0?null:e.getRangeAt(0).commonAncestorContainer}function f(){u||(u=setInterval(function(){if(!i.get(e)){clearInterval(u);return}o(e,"top",e.scrollTop+a.top),o(e,"left",e.scrollLeft+a.left),s(e)},50))}function l(){u&&(clearInterval(u),u=null),r.stopScrolling(e)}var u=null,a={top:0,left:0},c=!1;t.event.bind(t.ownerDocument,"selectionchange",function(){e.contains(n())?c=!0:(c=!1,l())}),t.event.bind(window,"mouseup",function(){c&&(c=!1,l())}),t.event.bind(window,"mousemove",function(t){if(c){var n={x:t.pageX,y:t.pageY},i={left:e.offsetLeft,right:e.offsetLeft+e.offsetWidth,top:e.offsetTop,bottom:e.offsetTop+e.offsetHeight};n.x<i.left+3?(a.left=-5,r.startScrolling(e,"x")):n.x>i.right-3?(a.left=5,r.startScrolling(e,"x")):a.left=0,n.y<i.top+3?(i.top+3-n.y<5?a.top=-5:a.top=-20,r.startScrolling(e,"y")):n.y>i.bottom-3?(n.y-i.bottom+3<5?a.top=5:a.top=20,r.startScrolling(e,"y")):a.top=0,a.top===0&&a.left===0?l():f()}})}var r=e("../../lib/helper"),i=e("../instances"),s=e("../update-geometry"),o=e("../update-scroll");t.exports=function(e){var t=i.get(e);u(e,t)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],16:[function(e,t,n){function o(e,t,n,o){function u(n,r){var i=e.scrollTop,s=e.scrollLeft,o=Math.abs(n),u=Math.abs(r);if(u>o){if(r<0&&i===t.contentHeight-t.containerHeight||r>0&&i===0)return!t.settings.swipePropagation}else if(o>u)if(n<0&&s===t.contentWidth-t.containerWidth||n>0&&s===0)return!t.settings.swipePropagation;return!0}function a(t,n){s(e,"top",e.scrollTop-n),s(e,"left",e.scrollLeft-t),i(e)}function v(){p=!0}function m(){p=!1}function g(e){return e.targetTouches?e.targetTouches[0]:e}function y(e){return e.targetTouches&&e.targetTouches.length===1?!0:e.pointerType&&e.pointerType!=="mouse"&&e.pointerType!==e.MSPOINTER_TYPE_MOUSE?!0:!1}function b(e){if(y(e)){d=!0;var t=g(e);f.pageX=t.pageX,f.pageY=t.pageY,l=(new Date).getTime(),h!==null&&clearInterval(h),e.stopPropagation()}}function w(e){if(!p&&d&&y(e)){var t=g(e),n={pageX:t.pageX,pageY:t.pageY},r=n.pageX-f.pageX,i=n.pageY-f.pageY;a(r,i),f=n;var s=(new Date).getTime(),o=s-l;o>0&&(c.x=r/o,c.y=i/o,l=s),u(r,i)&&(e.stopPropagation(),e.preventDefault())}}function E(){!p&&d&&(d=!1,clearInterval(h),h=setInterval(function(){if(!r.get(e)){clearInterval(h);return}if(Math.abs(c.x)<.01&&Math.abs(c.y)<.01){clearInterval(h);return}a(c.x*30,c.y*30),c.x*=.8,c.y*=.8},10))}var f={},l=0,c={},h=null,p=!1,d=!1;n&&(t.event.bind(window,"touchstart",v),t.event.bind(window,"touchend",m),t.event.bind(e,"touchstart",b),t.event.bind(e,"touchmove",w),t.event.bind(e,"touchend",E)),o&&(window.PointerEvent?(t.event.bind(window,"pointerdown",v),t.event.bind(window,"pointerup",m),t.event.bind(e,"pointerdown",b),t.event.bind(e,"pointermove",w),t.event.bind(e,"pointerup",E)):window.MSPointerEvent&&(t.event.bind(window,"MSPointerDown",v),t.event.bind(window,"MSPointerUp",m),t.event.bind(e,"MSPointerDown",b),t.event.bind(e,"MSPointerMove",w),t.event.bind(e,"MSPointerUp",E)))}var r=e("../instances"),i=e("../update-geometry"),s=e("../update-scroll");t.exports=function(e,t,n){var i=r.get(e);o(e,i,t,n)}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],17:[function(e,t,n){var r=e("../lib/class"),i=e("../lib/helper"),s=e("./instances"),o=e("./update-geometry"),u=e("./handler/click-rail"),a=e("./handler/drag-scrollbar"),f=e("./handler/keyboard"),l=e("./handler/mouse-wheel"),c=e("./handler/native-scroll"),h=e("./handler/selection"),p=e("./handler/touch");t.exports=function(e,t){t=typeof t=="object"?t:{},r.add(e,"ps-container");var n=s.add(e);n.settings=i.extend(n.settings,t),u(e),a(e),l(e),c(e),n.settings.useSelectionScroll&&h(e),(i.env.supportsTouch||i.env.supportsIePointer)&&p(e,i.env.supportsTouch,i.env.supportsIePointer),n.settings.useKeyboard&&f(e),o(e)}},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(e,t,n){function f(e){var t=this;t.settings=u.clone(i),t.containerWidth=null,t.containerHeight=null,t.contentWidth=null,t.contentHeight=null,t.isRtl=r.css(e,"direction")==="rtl",t.isNegativeScroll=function(){var t=e.scrollLeft,n=null;return e.scrollLeft=-1,n=e.scrollLeft<0,e.scrollLeft=t,n}(),t.negativeScrollAdjustment=t.isNegativeScroll?e.scrollWidth-e.clientWidth:0,t.event=new s,t.ownerDocument=e.ownerDocument||document,t.scrollbarXRail=r.appendTo(r.e("div","ps-scrollbar-x-rail"),e),t.scrollbarX=r.appendTo(r.e("div","ps-scrollbar-x"),t.scrollbarXRail),t.scrollbarX.setAttribute("tabindex",0),t.scrollbarXActive=null,t.scrollbarXWidth=null,t.scrollbarXLeft=null,t.scrollbarXBottom=u.toInt(r.css(t.scrollbarXRail,"bottom")),t.isScrollbarXUsingBottom=t.scrollbarXBottom===t.scrollbarXBottom,t.scrollbarXTop=t.isScrollbarXUsingBottom?null:u.toInt(r.css(t.scrollbarXRail,"top")),t.railBorderXWidth=u.toInt(r.css(t.scrollbarXRail,"borderLeftWidth"))+u.toInt(r.css(t.scrollbarXRail,"borderRightWidth")),r.css(t.scrollbarXRail,"display","block"),t.railXMarginWidth=u.toInt(r.css(t.scrollbarXRail,"marginLeft"))+u.toInt(r.css(t.scrollbarXRail,"marginRight")),r.css(t.scrollbarXRail,"display",""),t.railXWidth=null,t.railXRatio=null,t.scrollbarYRail=r.appendTo(r.e("div","ps-scrollbar-y-rail"),e),t.scrollbarY=r.appendTo(r.e("div","ps-scrollbar-y"),t.scrollbarYRail),t.scrollbarY.setAttribute("tabindex",0),t.scrollbarYActive=null,t.scrollbarYHeight=null,t.scrollbarYTop=null,t.scrollbarYRight=u.toInt(r.css(t.scrollbarYRail,"right")),t.isScrollbarYUsingRight=t.scrollbarYRight===t.scrollbarYRight,t.scrollbarYLeft=t.isScrollbarYUsingRight?null:u.toInt(r.css(t.scrollbarYRail,"left")),t.scrollbarYOuterWidth=t.isRtl?u.outerWidth(t.scrollbarY):null,t.railBorderYWidth=u.toInt(r.css(t.scrollbarYRail,"borderTopWidth"))+u.toInt(r.css(t.scrollbarYRail,"borderBottomWidth")),r.css(t.scrollbarYRail,"display","block"),t.railYMarginHeight=u.toInt(r.css(t.scrollbarYRail,"marginTop"))+u.toInt(r.css(t.scrollbarYRail,"marginBottom")),r.css(t.scrollbarYRail,"display",""),t.railYHeight=null,t.railYRatio=null}function l(e){return typeof e.dataset=="undefined"?e.getAttribute("data-ps-id"):e.dataset.psId}function c(e,t){typeof e.dataset=="undefined"?e.setAttribute("data-ps-id",t):e.dataset.psId=t}function h(e){typeof e.dataset=="undefined"?e.removeAttribute("data-ps-id"):delete e.dataset.psId}var r=e("../lib/dom"),i=e("./default-setting"),s=e("../lib/event-manager"),o=e("../lib/guid"),u=e("../lib/helper"),a={};n.add=function(e){var t=o();return c(e,t),a[t]=new f(e),a[t]},n.remove=function(e){delete a[l(e)],h(e)},n.get=function(e){return a[l(e)]}},{"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,"../lib/helper":6,"./default-setting":8}],19:[function(e,t,n){function a(e,t){return e.settings.minScrollbarLength&&(t=Math.max(t,e.settings.minScrollbarLength)),e.settings.maxScrollbarLength&&(t=Math.min(t,e.settings.maxScrollbarLength)),t}function f(e,t){var n={width:t.railXWidth};t.isRtl?n.left=t.negativeScrollAdjustment+e.scrollLeft+t.containerWidth-t.contentWidth:n.left=e.scrollLeft,t.isScrollbarXUsingBottom?n.bottom=t.scrollbarXBottom-e.scrollTop:n.top=t.scrollbarXTop+e.scrollTop,i.css(t.scrollbarXRail,n);var r={top:e.scrollTop,height:t.railYHeight};t.isScrollbarYUsingRight?t.isRtl?r.right=t.contentWidth-(t.negativeScrollAdjustment+e.scrollLeft)-t.scrollbarYRight-t.scrollbarYOuterWidth:r.right=t.scrollbarYRight-e.scrollLeft:t.isRtl?r.left=t.negativeScrollAdjustment+e.scrollLeft+t.containerWidth*2-t.contentWidth-t.scrollbarYLeft-t.scrollbarYOuterWidth:r.left=t.scrollbarYLeft+e.scrollLeft,i.css(t.scrollbarYRail,r),i.css(t.scrollbarX,{left:t.scrollbarXLeft,width:t.scrollbarXWidth-t.railBorderXWidth}),i.css(t.scrollbarY,{top:t.scrollbarYTop,height:t.scrollbarYHeight-t.railBorderYWidth})}var r=e("../lib/class"),i=e("../lib/dom"),s=e("../lib/helper"),o=e("./instances"),u=e("./update-scroll");t.exports=function(e){var t=o.get(e);t.containerWidth=e.clientWidth,t.containerHeight=e.clientHeight,t.contentWidth=e.scrollWidth,t.contentHeight=e.scrollHeight;var n;e.contains(t.scrollbarXRail)||(n=i.queryChildren(e,".ps-scrollbar-x-rail"),n.length>0&&n.forEach(function(e){i.remove(e)}),i.appendTo(t.scrollbarXRail,e)),e.contains(t.scrollbarYRail)||(n=i.queryChildren(e,".ps-scrollbar-y-rail"),n.length>0&&n.forEach(function(e){i.remove(e)}),i.appendTo(t.scrollbarYRail,e)),!t.settings.suppressScrollX&&t.containerWidth+t.settings.scrollXMarginOffset<t.contentWidth?(t.scrollbarXActive=!0,t.railXWidth=t.containerWidth-t.railXMarginWidth,t.railXRatio=t.containerWidth/t.railXWidth,t.scrollbarXWidth=a(t,s.toInt(t.railXWidth*t.containerWidth/t.contentWidth)),t.scrollbarXLeft=s.toInt((t.negativeScrollAdjustment+e.scrollLeft)*(t.railXWidth-t.scrollbarXWidth)/(t.contentWidth-t.containerWidth))):t.scrollbarXActive=!1,!t.settings.suppressScrollY&&t.containerHeight+t.settings.scrollYMarginOffset<t.contentHeight?(t.scrollbarYActive=!0,t.railYHeight=t.containerHeight-t.railYMarginHeight,t.railYRatio=t.containerHeight/t.railYHeight,t.scrollbarYHeight=a(t,s.toInt(t.railYHeight*t.containerHeight/t.contentHeight)),t.scrollbarYTop=s.toInt(e.scrollTop*(t.railYHeight-t.scrollbarYHeight)/(t.contentHeight-t.containerHeight))):t.scrollbarYActive=!1,t.scrollbarXLeft>=t.railXWidth-t.scrollbarXWidth&&(t.scrollbarXLeft=t.railXWidth-t.scrollbarXWidth),t.scrollbarYTop>=t.railYHeight-t.scrollbarYHeight&&(t.scrollbarYTop=t.railYHeight-t.scrollbarYHeight),f(e,t),t.scrollbarXActive?r.add(e,"ps-active-x"):(r.remove(e,"ps-active-x"),t.scrollbarXWidth=0,t.scrollbarXLeft=0,u(e,"left",0)),t.scrollbarYActive?r.add(e,"ps-active-y"):(r.remove(e,"ps-active-y"),t.scrollbarYHeight=0,t.scrollbarYTop=0,u(e,"top",0))}},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-scroll":20}],20:[function(e,t,n){var r=e("./instances"),i=document.createEvent("Event"),s=document.createEvent("Event"),o=document.createEvent("Event"),u=document.createEvent("Event"),a=document.createEvent("Event"),f=document.createEvent("Event"),l=document.createEvent("Event"),c=document.createEvent("Event"),h=document.createEvent("Event"),p=document.createEvent("Event"),d,v;i.initEvent("ps-scroll-up",!0,!0),s.initEvent("ps-scroll-down",!0,!0),o.initEvent("ps-scroll-left",!0,!0),u.initEvent("ps-scroll-right",!0,!0),a.initEvent("ps-scroll-y",!0,!0),f.initEvent("ps-scroll-x",!0,!0),l.initEvent("ps-x-reach-start",!0,!0),c.initEvent("ps-x-reach-end",!0,!0),h.initEvent("ps-y-reach-start",!0,!0),p.initEvent("ps-y-reach-end",!0,!0),t.exports=function(e,t,n){if(typeof e=="undefined")throw"You must provide an element to the update-scroll function";if(typeof t=="undefined")throw"You must provide an axis to the update-scroll function";if(typeof n=="undefined")throw"You must provide a value to the update-scroll function";if(t==="top"&&n<=0){e.scrollTop=0,e.dispatchEvent(h);return}if(t==="left"&&n<=0){e.scrollLeft=0,e.dispatchEvent(l);return}var m=r.get(e);if(t==="top"&&n>=m.contentHeight-m.containerHeight){e.scrollTop=m.contentHeight-m.containerHeight,e.dispatchEvent(p);return}if(t==="left"&&n>=m.contentWidth-m.containerWidth){e.scrollLeft=m.contentWidth-m.containerWidth,e.dispatchEvent(c);return}d||(d=e.scrollTop),v||(v=e.scrollLeft),t==="top"&&n<d&&e.dispatchEvent(i),t==="top"&&n>d&&e.dispatchEvent(s),t==="left"&&n<v&&e.dispatchEvent(o),t==="left"&&n>v&&e.dispatchEvent(u),t==="top"&&(e.scrollTop=d=n,e.dispatchEvent(a)),t==="left"&&(e.scrollLeft=v=n,e.dispatchEvent(f))}},{"./instances":18}],21:[function(e,t,n){var r=e("../lib/dom"),i=e("../lib/helper"),s=e("./instances"),o=e("./update-geometry"),u=e("./update-scroll");t.exports=function(e){var t=s.get(e);if(!t)return;t.negativeScrollAdjustment=t.isNegativeScroll?e.scrollWidth-e.clientWidth:0,r.css(t.scrollbarXRail,"display","block"),r.css(t.scrollbarYRail,"display","block"),t.railXMarginWidth=i.toInt(r.css(t.scrollbarXRail,"marginLeft"))+i.toInt(r.css(t.scrollbarXRail,"marginRight")),t.railYMarginHeight=i.toInt(r.css(t.scrollbarYRail,"marginTop"))+i.toInt(r.css(t.scrollbarYRail,"marginBottom")),r.css(t.scrollbarXRail,"display","none"),r.css(t.scrollbarYRail,"display","none"),o(e),u(e,"top",e.scrollTop),u(e,"left",e.scrollLeft),r.css(t.scrollbarXRail,"display",""),r.css(t.scrollbarYRail,"display","")}},{"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-geometry":19,"./update-scroll":20}]},{},[1]);