/*!
 * VERSION: 0.1.1
 * DATE: 2013-03-27
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * Physics2DPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";var t=Math.PI/180,e=function(t,e,i,s,r){this.p=e,this.f="function"==typeof t[e],this.start=this.value=this.f?t[e.indexOf("set")||"function"!=typeof t["get"+e.substr(3)]?e:"get"+e.substr(3)]():parseFloat(t[e]),this.velocity=i||0,this.v=this.velocity/r,s||0===s?(this.acceleration=s,this.a=this.acceleration/(r*r)):this.acceleration=this.a=0},i=Math.random(),s=window._gsDefine.globals.com.greensock.core.Animation._rootFramesTimeline,r=window._gsDefine.plugin({propName:"physics2D",API:2,init:function(i,r,n){this._target=i,this._tween=n,this._runBackwards=n.vars.runBackwards===!0,this._step=0;for(var a,o=n._timeline,l=Number(r.angle)||0,h=Number(r.velocity)||0,u=Number(r.acceleration)||0,_=r.xProp||"x",p=r.yProp||"y",f=r.accelerationAngle||0===r.accelerationAngle?Number(r.accelerationAngle):l;o._timeline;)o=o._timeline;return this._stepsPerTimeUnit=a=o===s?1:30,r.gravity&&(u=Number(r.gravity),f=90),l*=t,f*=t,this._friction=1-Number(r.friction||0),this._overwriteProps.push(_),this._overwriteProps.push(p),this._x=new e(i,_,Math.cos(l)*h,Math.cos(f)*u,a),this._y=new e(i,p,Math.sin(l)*h,Math.sin(f)*u,a),this._skipX=this._skipY=!1,!0},set:function(){var t,e,i,s,r,n,a=this._tween._time,o=this._x,l=this._y;if(this._runBackwards===!0&&(a=this._tween._duration-a),1===this._friction)i=.5*a*a,t=o.start+(o.velocity*a+o.acceleration*i),e=l.start+(l.velocity*a+l.acceleration*i);else{if(a*=this._stepsPerTimeUnit,s=n=(0|a)-this._step,r=a%1,n>=0)for(;--n>-1;)o.v+=o.a,l.v+=l.a,o.v*=this._friction,l.v*=this._friction,o.value+=o.v,l.value+=l.v;else for(n=-n;--n>-1;)o.value-=o.v,l.value-=l.v,o.v/=this._friction,l.v/=this._friction,o.v-=o.a,l.v-=l.a;t=o.value+o.v*r,e=l.value+l.v*r,this._step+=s}this._skipX||(o.r&&(t=0|t+(0>t?-.5:.5)),o.f?this._target[o.p](t):this._target[o.p]=t),this._skipY||(l.r&&(e=0|e+(0>e?-.5:.5)),l.f?this._target[l.p](e):this._target[l.p]=e)}}),n=r.prototype;n._kill=function(t){return null!=t[this._x.p]&&(this._skipX=!0),null!=t[this._y.p]&&(this._skipY=!0),this._super._kill(t)},n._roundProps=function(t,e){(t.physics2D||t[this._x.p])&&(this._x.r=e),(t.physics2D||t[this._y.p])&&(this._y.r=e)},r._autoCSS=!0,r._cssRegister=function(){var t=window._gsDefine.globals.CSSPlugin;if(t){var e=t._internals,s=e._parseToProxy,n=e._setPluginRatio,a=e.CSSPropTween;e._registerComplexSpecialProp("physics2D",{parser:function(t,e,o,l,h,u){u=new r;var _,p=e.xProp||"x",f=e.yProp||"y",c={};return c[p]=c[f]=i++,_=s(t,c,l,h,u),h=new a(t,"physics2D",0,0,_.pt,2),h.data=_,h.plugin=u,h.setRatio=n,u._onInitTween(_.proxy,e,l._tween),h}})}}}),window._gsDefine&&window._gsQueue.pop()();