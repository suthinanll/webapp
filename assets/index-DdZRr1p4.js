(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function El(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const Pe={},Pr=[],zt=()=>{},Pm=()=>!1,_o=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Tl=n=>n.startsWith("onUpdate:"),lt=Object.assign,wl=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},km=Object.prototype.hasOwnProperty,be=(n,e)=>km.call(n,e),ae=Array.isArray,kr=n=>yo(n)==="[object Map]",Df=n=>yo(n)==="[object Set]",ce=n=>typeof n=="function",je=n=>typeof n=="string",Kn=n=>typeof n=="symbol",Oe=n=>n!==null&&typeof n=="object",Of=n=>(Oe(n)||ce(n))&&ce(n.then)&&ce(n.catch),Nf=Object.prototype.toString,yo=n=>Nf.call(n),Dm=n=>yo(n).slice(8,-1),Vf=n=>yo(n)==="[object Object]",Il=n=>je(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,As=El(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),vo=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Om=/-(\w)/g,Ct=vo(n=>n.replace(Om,(e,t)=>t?t.toUpperCase():"")),Nm=/\B([A-Z])/g,gr=vo(n=>n.replace(Nm,"-$1").toLowerCase()),Eo=vo(n=>n.charAt(0).toUpperCase()+n.slice(1)),la=vo(n=>n?`on${Eo(n)}`:""),Nn=(n,e)=>!Object.is(n,e),ca=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},xf=(n,e,t,r=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:r,value:t})},Vm=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let du;const To=()=>du||(du=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Al(n){if(ae(n)){const e={};for(let t=0;t<n.length;t++){const r=n[t],s=je(r)?Fm(r):Al(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(je(n)||Oe(n))return n}const xm=/;(?![^(]*\))/g,Mm=/:([^]+)/,Lm=/\/\*[^]*?\*\//g;function Fm(n){const e={};return n.replace(Lm,"").split(xm).forEach(t=>{if(t){const r=t.split(Mm);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function bl(n){let e="";if(je(n))e=n;else if(ae(n))for(let t=0;t<n.length;t++){const r=bl(n[t]);r&&(e+=r+" ")}else if(Oe(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Um="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Bm=El(Um);function Mf(n){return!!n||n===""}const Lf=n=>!!(n&&n.__v_isRef===!0),wr=n=>je(n)?n:n==null?"":ae(n)||Oe(n)&&(n.toString===Nf||!ce(n.toString))?Lf(n)?wr(n.value):JSON.stringify(n,Ff,2):String(n),Ff=(n,e)=>Lf(e)?Ff(n,e.value):kr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[r,s],i)=>(t[ua(r,i)+" =>"]=s,t),{})}:Df(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>ua(t))}:Kn(e)?ua(e):Oe(e)&&!ae(e)&&!Vf(e)?String(e):e,ua=(n,e="")=>{var t;return Kn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Tt;class jm{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Tt,!e&&Tt&&(this.index=(Tt.scopes||(Tt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=Tt;try{return Tt=this,e()}finally{Tt=t}}}on(){Tt=this}off(){Tt=this.parent}stop(e){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function $m(){return Tt}let Ce;const ha=new WeakSet;class Uf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Tt&&Tt.active&&Tt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ha.has(this)&&(ha.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||jf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,pu(this),$f(this);const e=Ce,t=Vt;Ce=this,Vt=!0;try{return this.fn()}finally{Hf(this),Ce=e,Vt=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Cl(e);this.deps=this.depsTail=void 0,pu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ha.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Va(this)&&this.run()}get dirty(){return Va(this)}}let Bf=0,bs,Rs;function jf(n,e=!1){if(n.flags|=8,e){n.next=Rs,Rs=n;return}n.next=bs,bs=n}function Rl(){Bf++}function Sl(){if(--Bf>0)return;if(Rs){let e=Rs;for(Rs=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;bs;){let e=bs;for(bs=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){n||(n=r)}e=t}}if(n)throw n}function $f(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Hf(n){let e,t=n.depsTail,r=t;for(;r;){const s=r.prevDep;r.version===-1?(r===t&&(t=s),Cl(r),Hm(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}n.deps=e,n.depsTail=t}function Va(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(qf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function qf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Fs))return;n.globalVersion=Fs;const e=n.dep;if(n.flags|=2,e.version>0&&!n.isSSR&&n.deps&&!Va(n)){n.flags&=-3;return}const t=Ce,r=Vt;Ce=n,Vt=!0;try{$f(n);const s=n.fn(n._value);(e.version===0||Nn(s,n._value))&&(n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Ce=t,Vt=r,Hf(n),n.flags&=-3}}function Cl(n,e=!1){const{dep:t,prevSub:r,nextSub:s}=n;if(r&&(r.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=r,n.nextSub=void 0),t.subs===n&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let i=t.computed.deps;i;i=i.nextDep)Cl(i,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Hm(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Vt=!0;const zf=[];function Gn(){zf.push(Vt),Vt=!1}function Wn(){const n=zf.pop();Vt=n===void 0?!0:n}function pu(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Ce;Ce=void 0;try{e()}finally{Ce=t}}}let Fs=0;class qm{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Pl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!Ce||!Vt||Ce===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Ce)t=this.activeLink=new qm(Ce,this),Ce.deps?(t.prevDep=Ce.depsTail,Ce.depsTail.nextDep=t,Ce.depsTail=t):Ce.deps=Ce.depsTail=t,Kf(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=Ce.depsTail,t.nextDep=void 0,Ce.depsTail.nextDep=t,Ce.depsTail=t,Ce.deps===t&&(Ce.deps=r)}return t}trigger(e){this.version++,Fs++,this.notify(e)}notify(e){Rl();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Sl()}}}function Kf(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)Kf(r)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const xa=new WeakMap,ar=Symbol(""),Ma=Symbol(""),Us=Symbol("");function nt(n,e,t){if(Vt&&Ce){let r=xa.get(n);r||xa.set(n,r=new Map);let s=r.get(t);s||(r.set(t,s=new Pl),s.map=r,s.key=t),s.track()}}function an(n,e,t,r,s,i){const a=xa.get(n);if(!a){Fs++;return}const l=c=>{c&&c.trigger()};if(Rl(),e==="clear")a.forEach(l);else{const c=ae(n),h=c&&Il(t);if(c&&t==="length"){const d=Number(r);a.forEach((p,m)=>{(m==="length"||m===Us||!Kn(m)&&m>=d)&&l(p)})}else switch((t!==void 0||a.has(void 0))&&l(a.get(t)),h&&l(a.get(Us)),e){case"add":c?h&&l(a.get("length")):(l(a.get(ar)),kr(n)&&l(a.get(Ma)));break;case"delete":c||(l(a.get(ar)),kr(n)&&l(a.get(Ma)));break;case"set":kr(n)&&l(a.get(ar));break}}Sl()}function Tr(n){const e=Ae(n);return e===n?e:(nt(e,"iterate",Us),St(n)?e:e.map(rt))}function wo(n){return nt(n=Ae(n),"iterate",Us),n}const zm={__proto__:null,[Symbol.iterator](){return fa(this,Symbol.iterator,rt)},concat(...n){return Tr(this).concat(...n.map(e=>ae(e)?Tr(e):e))},entries(){return fa(this,"entries",n=>(n[1]=rt(n[1]),n))},every(n,e){return nn(this,"every",n,e,void 0,arguments)},filter(n,e){return nn(this,"filter",n,e,t=>t.map(rt),arguments)},find(n,e){return nn(this,"find",n,e,rt,arguments)},findIndex(n,e){return nn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return nn(this,"findLast",n,e,rt,arguments)},findLastIndex(n,e){return nn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return nn(this,"forEach",n,e,void 0,arguments)},includes(...n){return da(this,"includes",n)},indexOf(...n){return da(this,"indexOf",n)},join(n){return Tr(this).join(n)},lastIndexOf(...n){return da(this,"lastIndexOf",n)},map(n,e){return nn(this,"map",n,e,void 0,arguments)},pop(){return ms(this,"pop")},push(...n){return ms(this,"push",n)},reduce(n,...e){return gu(this,"reduce",n,e)},reduceRight(n,...e){return gu(this,"reduceRight",n,e)},shift(){return ms(this,"shift")},some(n,e){return nn(this,"some",n,e,void 0,arguments)},splice(...n){return ms(this,"splice",n)},toReversed(){return Tr(this).toReversed()},toSorted(n){return Tr(this).toSorted(n)},toSpliced(...n){return Tr(this).toSpliced(...n)},unshift(...n){return ms(this,"unshift",n)},values(){return fa(this,"values",rt)}};function fa(n,e,t){const r=wo(n),s=r[e]();return r!==n&&!St(n)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=t(i.value)),i}),s}const Km=Array.prototype;function nn(n,e,t,r,s,i){const a=wo(n),l=a!==n&&!St(n),c=a[e];if(c!==Km[e]){const p=c.apply(n,i);return l?rt(p):p}let h=t;a!==n&&(l?h=function(p,m){return t.call(this,rt(p),m,n)}:t.length>2&&(h=function(p,m){return t.call(this,p,m,n)}));const d=c.call(a,h,r);return l&&s?s(d):d}function gu(n,e,t,r){const s=wo(n);let i=t;return s!==n&&(St(n)?t.length>3&&(i=function(a,l,c){return t.call(this,a,l,c,n)}):i=function(a,l,c){return t.call(this,a,rt(l),c,n)}),s[e](i,...r)}function da(n,e,t){const r=Ae(n);nt(r,"iterate",Us);const s=r[e](...t);return(s===-1||s===!1)&&Ol(t[0])?(t[0]=Ae(t[0]),r[e](...t)):s}function ms(n,e,t=[]){Gn(),Rl();const r=Ae(n)[e].apply(n,t);return Sl(),Wn(),r}const Gm=El("__proto__,__v_isRef,__isVue"),Gf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Kn));function Wm(n){Kn(n)||(n=String(n));const e=Ae(this);return nt(e,"has",n),e.hasOwnProperty(n)}class Wf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,r){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return i;if(t==="__v_raw")return r===(s?i?s_:Yf:i?Xf:Jf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const a=ae(e);if(!s){let c;if(a&&(c=zm[t]))return c;if(t==="hasOwnProperty")return Wm}const l=Reflect.get(e,t,at(e)?e:r);return(Kn(t)?Gf.has(t):Gm(t))||(s||nt(e,"get",t),i)?l:at(l)?a&&Il(t)?l:l.value:Oe(l)?s?ed(l):Io(l):l}}class Qf extends Wf{constructor(e=!1){super(!1,e)}set(e,t,r,s){let i=e[t];if(!this._isShallow){const c=ur(i);if(!St(r)&&!ur(r)&&(i=Ae(i),r=Ae(r)),!ae(e)&&at(i)&&!at(r))return c?!1:(i.value=r,!0)}const a=ae(e)&&Il(t)?Number(t)<e.length:be(e,t),l=Reflect.set(e,t,r,at(e)?e:s);return e===Ae(s)&&(a?Nn(r,i)&&an(e,"set",t,r):an(e,"add",t,r)),l}deleteProperty(e,t){const r=be(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&r&&an(e,"delete",t,void 0),s}has(e,t){const r=Reflect.has(e,t);return(!Kn(t)||!Gf.has(t))&&nt(e,"has",t),r}ownKeys(e){return nt(e,"iterate",ae(e)?"length":ar),Reflect.ownKeys(e)}}class Qm extends Wf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Jm=new Qf,Xm=new Qm,Ym=new Qf(!0);const La=n=>n,bi=n=>Reflect.getPrototypeOf(n);function Zm(n,e,t){return function(...r){const s=this.__v_raw,i=Ae(s),a=kr(i),l=n==="entries"||n===Symbol.iterator&&a,c=n==="keys"&&a,h=s[n](...r),d=t?La:e?Fa:rt;return!e&&nt(i,"iterate",c?Ma:ar),{next(){const{value:p,done:m}=h.next();return m?{value:p,done:m}:{value:l?[d(p[0]),d(p[1])]:d(p),done:m}},[Symbol.iterator](){return this}}}}function Ri(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function e_(n,e){const t={get(s){const i=this.__v_raw,a=Ae(i),l=Ae(s);n||(Nn(s,l)&&nt(a,"get",s),nt(a,"get",l));const{has:c}=bi(a),h=e?La:n?Fa:rt;if(c.call(a,s))return h(i.get(s));if(c.call(a,l))return h(i.get(l));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!n&&nt(Ae(s),"iterate",ar),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,a=Ae(i),l=Ae(s);return n||(Nn(s,l)&&nt(a,"has",s),nt(a,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const a=this,l=a.__v_raw,c=Ae(l),h=e?La:n?Fa:rt;return!n&&nt(c,"iterate",ar),l.forEach((d,p)=>s.call(i,h(d),h(p),a))}};return lt(t,n?{add:Ri("add"),set:Ri("set"),delete:Ri("delete"),clear:Ri("clear")}:{add(s){!e&&!St(s)&&!ur(s)&&(s=Ae(s));const i=Ae(this);return bi(i).has.call(i,s)||(i.add(s),an(i,"add",s,s)),this},set(s,i){!e&&!St(i)&&!ur(i)&&(i=Ae(i));const a=Ae(this),{has:l,get:c}=bi(a);let h=l.call(a,s);h||(s=Ae(s),h=l.call(a,s));const d=c.call(a,s);return a.set(s,i),h?Nn(i,d)&&an(a,"set",s,i):an(a,"add",s,i),this},delete(s){const i=Ae(this),{has:a,get:l}=bi(i);let c=a.call(i,s);c||(s=Ae(s),c=a.call(i,s)),l&&l.call(i,s);const h=i.delete(s);return c&&an(i,"delete",s,void 0),h},clear(){const s=Ae(this),i=s.size!==0,a=s.clear();return i&&an(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Zm(s,n,e)}),t}function kl(n,e){const t=e_(n,e);return(r,s,i)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?r:Reflect.get(be(t,s)&&s in r?t:r,s,i)}const t_={get:kl(!1,!1)},n_={get:kl(!1,!0)},r_={get:kl(!0,!1)};const Jf=new WeakMap,Xf=new WeakMap,Yf=new WeakMap,s_=new WeakMap;function i_(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function o_(n){return n.__v_skip||!Object.isExtensible(n)?0:i_(Dm(n))}function Io(n){return ur(n)?n:Dl(n,!1,Jm,t_,Jf)}function Zf(n){return Dl(n,!1,Ym,n_,Xf)}function ed(n){return Dl(n,!0,Xm,r_,Yf)}function Dl(n,e,t,r,s){if(!Oe(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const i=s.get(n);if(i)return i;const a=o_(n);if(a===0)return n;const l=new Proxy(n,a===2?r:t);return s.set(n,l),l}function Dr(n){return ur(n)?Dr(n.__v_raw):!!(n&&n.__v_isReactive)}function ur(n){return!!(n&&n.__v_isReadonly)}function St(n){return!!(n&&n.__v_isShallow)}function Ol(n){return n?!!n.__v_raw:!1}function Ae(n){const e=n&&n.__v_raw;return e?Ae(e):n}function a_(n){return!be(n,"__v_skip")&&Object.isExtensible(n)&&xf(n,"__v_skip",!0),n}const rt=n=>Oe(n)?Io(n):n,Fa=n=>Oe(n)?ed(n):n;function at(n){return n?n.__v_isRef===!0:!1}function Ss(n){return td(n,!1)}function l_(n){return td(n,!0)}function td(n,e){return at(n)?n:new c_(n,e)}class c_{constructor(e,t){this.dep=new Pl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Ae(e),this._value=t?e:rt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,r=this.__v_isShallow||St(e)||ur(e);e=r?e:Ae(e),Nn(e,t)&&(this._rawValue=e,this._value=r?e:rt(e),this.dep.trigger())}}function Or(n){return at(n)?n.value:n}const u_={get:(n,e,t)=>e==="__v_raw"?n:Or(Reflect.get(n,e,t)),set:(n,e,t,r)=>{const s=n[e];return at(s)&&!at(t)?(s.value=t,!0):Reflect.set(n,e,t,r)}};function nd(n){return Dr(n)?n:new Proxy(n,u_)}class h_{constructor(e,t,r){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Pl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Fs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Ce!==this)return jf(this,!0),!0}get value(){const e=this.dep.track();return qf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function f_(n,e,t=!1){let r,s;return ce(n)?r=n:(r=n.get,s=n.set),new h_(r,s,t)}const Si={},Gi=new WeakMap;let nr;function d_(n,e=!1,t=nr){if(t){let r=Gi.get(t);r||Gi.set(t,r=[]),r.push(n)}}function p_(n,e,t=Pe){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:l,call:c}=t,h=z=>s?z:St(z)||s===!1||s===0?Sn(z,1):Sn(z);let d,p,m,E,k=!1,N=!1;if(at(n)?(p=()=>n.value,k=St(n)):Dr(n)?(p=()=>h(n),k=!0):ae(n)?(N=!0,k=n.some(z=>Dr(z)||St(z)),p=()=>n.map(z=>{if(at(z))return z.value;if(Dr(z))return h(z);if(ce(z))return c?c(z,2):z()})):ce(n)?e?p=c?()=>c(n,2):n:p=()=>{if(m){Gn();try{m()}finally{Wn()}}const z=nr;nr=d;try{return c?c(n,3,[E]):n(E)}finally{nr=z}}:p=zt,e&&s){const z=p,he=s===!0?1/0:s;p=()=>Sn(z(),he)}const L=$m(),K=()=>{d.stop(),L&&L.active&&wl(L.effects,d)};if(i&&e){const z=e;e=(...he)=>{z(...he),K()}}let B=N?new Array(n.length).fill(Si):Si;const q=z=>{if(!(!(d.flags&1)||!d.dirty&&!z))if(e){const he=d.run();if(s||k||(N?he.some((fe,I)=>Nn(fe,B[I])):Nn(he,B))){m&&m();const fe=nr;nr=d;try{const I=[he,B===Si?void 0:N&&B[0]===Si?[]:B,E];c?c(e,3,I):e(...I),B=he}finally{nr=fe}}}else d.run()};return l&&l(q),d=new Uf(p),d.scheduler=a?()=>a(q,!1):q,E=z=>d_(z,!1,d),m=d.onStop=()=>{const z=Gi.get(d);if(z){if(c)c(z,4);else for(const he of z)he();Gi.delete(d)}},e?r?q(!0):B=d.run():a?a(q.bind(null,!0),!0):d.run(),K.pause=d.pause.bind(d),K.resume=d.resume.bind(d),K.stop=K,K}function Sn(n,e=1/0,t){if(e<=0||!Oe(n)||n.__v_skip||(t=t||new Set,t.has(n)))return n;if(t.add(n),e--,at(n))Sn(n.value,e,t);else if(ae(n))for(let r=0;r<n.length;r++)Sn(n[r],e,t);else if(Df(n)||kr(n))n.forEach(r=>{Sn(r,e,t)});else if(Vf(n)){for(const r in n)Sn(n[r],e,t);for(const r of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,r)&&Sn(n[r],e,t)}return n}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ys(n,e,t,r){try{return r?n(...r):n()}catch(s){Ao(s,e,t)}}function Jt(n,e,t,r){if(ce(n)){const s=Ys(n,e,t,r);return s&&Of(s)&&s.catch(i=>{Ao(i,e,t)}),s}if(ae(n)){const s=[];for(let i=0;i<n.length;i++)s.push(Jt(n[i],e,t,r));return s}}function Ao(n,e,t,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||Pe;if(e){let l=e.parent;const c=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${t}`;for(;l;){const d=l.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](n,c,h)===!1)return}l=l.parent}if(i){Gn(),Ys(i,null,10,[n,c,h]),Wn();return}}g_(n,t,s,r,a)}function g_(n,e,t,r=!0,s=!1){if(s)throw n;console.error(n)}const dt=[];let Ut=-1;const Nr=[];let An=null,Ir=0;const rd=Promise.resolve();let Wi=null;function sd(n){const e=Wi||rd;return n?e.then(this?n.bind(this):n):e}function m_(n){let e=Ut+1,t=dt.length;for(;e<t;){const r=e+t>>>1,s=dt[r],i=Bs(s);i<n||i===n&&s.flags&2?e=r+1:t=r}return e}function Nl(n){if(!(n.flags&1)){const e=Bs(n),t=dt[dt.length-1];!t||!(n.flags&2)&&e>=Bs(t)?dt.push(n):dt.splice(m_(e),0,n),n.flags|=1,id()}}function id(){Wi||(Wi=rd.then(ad))}function __(n){ae(n)?Nr.push(...n):An&&n.id===-1?An.splice(Ir+1,0,n):n.flags&1||(Nr.push(n),n.flags|=1),id()}function mu(n,e,t=Ut+1){for(;t<dt.length;t++){const r=dt[t];if(r&&r.flags&2){if(n&&r.id!==n.uid)continue;dt.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function od(n){if(Nr.length){const e=[...new Set(Nr)].sort((t,r)=>Bs(t)-Bs(r));if(Nr.length=0,An){An.push(...e);return}for(An=e,Ir=0;Ir<An.length;Ir++){const t=An[Ir];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}An=null,Ir=0}}const Bs=n=>n.id==null?n.flags&2?-1:1/0:n.id;function ad(n){try{for(Ut=0;Ut<dt.length;Ut++){const e=dt[Ut];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ys(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ut<dt.length;Ut++){const e=dt[Ut];e&&(e.flags&=-2)}Ut=-1,dt.length=0,od(),Wi=null,(dt.length||Nr.length)&&ad()}}let Nt=null,ld=null;function Qi(n){const e=Nt;return Nt=n,ld=n&&n.type.__scopeId||null,e}function Ua(n,e=Nt,t){if(!e||n._n)return n;const r=(...s)=>{r._d&&Su(-1);const i=Qi(e);let a;try{a=n(...s)}finally{Qi(i),r._d&&Su(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function er(n,e,t,r){const s=n.dirs,i=e&&e.dirs;for(let a=0;a<s.length;a++){const l=s[a];i&&(l.oldValue=i[a].value);let c=l.dir[r];c&&(Gn(),Jt(c,t,8,[n.el,l,n,e]),Wn())}}const y_=Symbol("_vte"),v_=n=>n.__isTeleport;function Vl(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Vl(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}/*! #__NO_SIDE_EFFECTS__ */function cd(n,e){return ce(n)?lt({name:n.name},e,{setup:n}):n}function ud(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Ji(n,e,t,r,s=!1){if(ae(n)){n.forEach((k,N)=>Ji(k,e&&(ae(e)?e[N]:e),t,r,s));return}if(Cs(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Ji(n,e,t,r.component.subTree);return}const i=r.shapeFlag&4?Ll(r.component):r.el,a=s?null:i,{i:l,r:c}=n,h=e&&e.r,d=l.refs===Pe?l.refs={}:l.refs,p=l.setupState,m=Ae(p),E=p===Pe?()=>!1:k=>be(m,k);if(h!=null&&h!==c&&(je(h)?(d[h]=null,E(h)&&(p[h]=null)):at(h)&&(h.value=null)),ce(c))Ys(c,l,12,[a,d]);else{const k=je(c),N=at(c);if(k||N){const L=()=>{if(n.f){const K=k?E(c)?p[c]:d[c]:c.value;s?ae(K)&&wl(K,i):ae(K)?K.includes(i)||K.push(i):k?(d[c]=[i],E(c)&&(p[c]=d[c])):(c.value=[i],n.k&&(d[n.k]=c.value))}else k?(d[c]=a,E(c)&&(p[c]=a)):N&&(c.value=a,n.k&&(d[n.k]=a))};a?(L.id=-1,Et(L,t)):L()}}}To().requestIdleCallback;To().cancelIdleCallback;const Cs=n=>!!n.type.__asyncLoader,hd=n=>n.type.__isKeepAlive;function E_(n,e){fd(n,"a",e)}function T_(n,e){fd(n,"da",e)}function fd(n,e,t=it){const r=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(bo(e,r,t),t){let s=t.parent;for(;s&&s.parent;)hd(s.parent.vnode)&&w_(r,e,t,s),s=s.parent}}function w_(n,e,t,r){const s=bo(e,n,r,!0);pd(()=>{wl(r[e],s)},t)}function bo(n,e,t=it,r=!1){if(t){const s=t[n]||(t[n]=[]),i=e.__weh||(e.__weh=(...a)=>{Gn();const l=Zs(t),c=Jt(e,t,n,a);return l(),Wn(),c});return r?s.unshift(i):s.push(i),i}}const gn=n=>(e,t=it)=>{(!$s||n==="sp")&&bo(n,(...r)=>e(...r),t)},I_=gn("bm"),dd=gn("m"),A_=gn("bu"),b_=gn("u"),R_=gn("bum"),pd=gn("um"),S_=gn("sp"),C_=gn("rtg"),P_=gn("rtc");function k_(n,e=it){bo("ec",n,e)}const D_="components";function _u(n,e){return N_(D_,n,!0,e)||n}const O_=Symbol.for("v-ndc");function N_(n,e,t=!0,r=!1){const s=Nt||it;if(s){const i=s.type;{const l=wy(i,!1);if(l&&(l===e||l===Ct(e)||l===Eo(Ct(e))))return i}const a=yu(s[n]||i[n],e)||yu(s.appContext[n],e);return!a&&r?i:a}}function yu(n,e){return n&&(n[e]||n[Ct(e)]||n[Eo(Ct(e))])}function V_(n,e,t,r){let s;const i=t,a=ae(n);if(a||je(n)){const l=a&&Dr(n);let c=!1;l&&(c=!St(n),n=wo(n)),s=new Array(n.length);for(let h=0,d=n.length;h<d;h++)s[h]=e(c?rt(n[h]):n[h],h,void 0,i)}else if(typeof n=="number"){s=new Array(n);for(let l=0;l<n;l++)s[l]=e(l+1,l,void 0,i)}else if(Oe(n))if(n[Symbol.iterator])s=Array.from(n,(l,c)=>e(l,c,void 0,i));else{const l=Object.keys(n);s=new Array(l.length);for(let c=0,h=l.length;c<h;c++){const d=l[c];s[c]=e(n[d],d,c,i)}}else s=[];return s}const Ba=n=>n?xd(n)?Ll(n):Ba(n.parent):null,Ps=lt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ba(n.parent),$root:n=>Ba(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>md(n),$forceUpdate:n=>n.f||(n.f=()=>{Nl(n.update)}),$nextTick:n=>n.n||(n.n=sd.bind(n.proxy)),$watch:n=>ty.bind(n)}),pa=(n,e)=>n!==Pe&&!n.__isScriptSetup&&be(n,e),x_={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:r,data:s,props:i,accessCache:a,type:l,appContext:c}=n;let h;if(e[0]!=="$"){const E=a[e];if(E!==void 0)switch(E){case 1:return r[e];case 2:return s[e];case 4:return t[e];case 3:return i[e]}else{if(pa(r,e))return a[e]=1,r[e];if(s!==Pe&&be(s,e))return a[e]=2,s[e];if((h=n.propsOptions[0])&&be(h,e))return a[e]=3,i[e];if(t!==Pe&&be(t,e))return a[e]=4,t[e];ja&&(a[e]=0)}}const d=Ps[e];let p,m;if(d)return e==="$attrs"&&nt(n.attrs,"get",""),d(n);if((p=l.__cssModules)&&(p=p[e]))return p;if(t!==Pe&&be(t,e))return a[e]=4,t[e];if(m=c.config.globalProperties,be(m,e))return m[e]},set({_:n},e,t){const{data:r,setupState:s,ctx:i}=n;return pa(s,e)?(s[e]=t,!0):r!==Pe&&be(r,e)?(r[e]=t,!0):be(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(i[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:r,appContext:s,propsOptions:i}},a){let l;return!!t[a]||n!==Pe&&be(n,a)||pa(e,a)||(l=i[0])&&be(l,a)||be(r,a)||be(Ps,a)||be(s.config.globalProperties,a)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:be(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function vu(n){return ae(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let ja=!0;function M_(n){const e=md(n),t=n.proxy,r=n.ctx;ja=!1,e.beforeCreate&&Eu(e.beforeCreate,n,"bc");const{data:s,computed:i,methods:a,watch:l,provide:c,inject:h,created:d,beforeMount:p,mounted:m,beforeUpdate:E,updated:k,activated:N,deactivated:L,beforeDestroy:K,beforeUnmount:B,destroyed:q,unmounted:z,render:he,renderTracked:fe,renderTriggered:I,errorCaptured:_,serverPrefetch:w,expose:A,inheritAttrs:b,components:S,directives:T,filters:ut}=e;if(h&&L_(h,r,null),a)for(const ge in a){const de=a[ge];ce(de)&&(r[ge]=de.bind(t))}if(s){const ge=s.call(t,t);Oe(ge)&&(n.data=Io(ge))}if(ja=!0,i)for(const ge in i){const de=i[ge],yt=ce(de)?de.bind(t,t):ce(de.get)?de.get.bind(t,t):zt,Pt=!ce(de)&&ce(de.set)?de.set.bind(t):zt,At=Dt({get:yt,set:Pt});Object.defineProperty(r,ge,{enumerable:!0,configurable:!0,get:()=>At.value,set:Ne=>At.value=Ne})}if(l)for(const ge in l)gd(l[ge],r,t,ge);if(c){const ge=ce(c)?c.call(t):c;Reflect.ownKeys(ge).forEach(de=>{Vi(de,ge[de])})}d&&Eu(d,n,"c");function Ue(ge,de){ae(de)?de.forEach(yt=>ge(yt.bind(t))):de&&ge(de.bind(t))}if(Ue(I_,p),Ue(dd,m),Ue(A_,E),Ue(b_,k),Ue(E_,N),Ue(T_,L),Ue(k_,_),Ue(P_,fe),Ue(C_,I),Ue(R_,B),Ue(pd,z),Ue(S_,w),ae(A))if(A.length){const ge=n.exposed||(n.exposed={});A.forEach(de=>{Object.defineProperty(ge,de,{get:()=>t[de],set:yt=>t[de]=yt})})}else n.exposed||(n.exposed={});he&&n.render===zt&&(n.render=he),b!=null&&(n.inheritAttrs=b),S&&(n.components=S),T&&(n.directives=T),w&&ud(n)}function L_(n,e,t=zt){ae(n)&&(n=$a(n));for(const r in n){const s=n[r];let i;Oe(s)?"default"in s?i=Kt(s.from||r,s.default,!0):i=Kt(s.from||r):i=Kt(s),at(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):e[r]=i}}function Eu(n,e,t){Jt(ae(n)?n.map(r=>r.bind(e.proxy)):n.bind(e.proxy),e,t)}function gd(n,e,t,r){let s=r.includes(".")?kd(t,r):()=>t[r];if(je(n)){const i=e[n];ce(i)&&xi(s,i)}else if(ce(n))xi(s,n.bind(t));else if(Oe(n))if(ae(n))n.forEach(i=>gd(i,e,t,r));else{const i=ce(n.handler)?n.handler.bind(t):e[n.handler];ce(i)&&xi(s,i,n)}}function md(n){const e=n.type,{mixins:t,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=n.appContext,l=i.get(e);let c;return l?c=l:!s.length&&!t&&!r?c=e:(c={},s.length&&s.forEach(h=>Xi(c,h,a,!0)),Xi(c,e,a)),Oe(e)&&i.set(e,c),c}function Xi(n,e,t,r=!1){const{mixins:s,extends:i}=e;i&&Xi(n,i,t,!0),s&&s.forEach(a=>Xi(n,a,t,!0));for(const a in e)if(!(r&&a==="expose")){const l=F_[a]||t&&t[a];n[a]=l?l(n[a],e[a]):e[a]}return n}const F_={data:Tu,props:wu,emits:wu,methods:vs,computed:vs,beforeCreate:ft,created:ft,beforeMount:ft,mounted:ft,beforeUpdate:ft,updated:ft,beforeDestroy:ft,beforeUnmount:ft,destroyed:ft,unmounted:ft,activated:ft,deactivated:ft,errorCaptured:ft,serverPrefetch:ft,components:vs,directives:vs,watch:B_,provide:Tu,inject:U_};function Tu(n,e){return e?n?function(){return lt(ce(n)?n.call(this,this):n,ce(e)?e.call(this,this):e)}:e:n}function U_(n,e){return vs($a(n),$a(e))}function $a(n){if(ae(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function ft(n,e){return n?[...new Set([].concat(n,e))]:e}function vs(n,e){return n?lt(Object.create(null),n,e):e}function wu(n,e){return n?ae(n)&&ae(e)?[...new Set([...n,...e])]:lt(Object.create(null),vu(n),vu(e??{})):e}function B_(n,e){if(!n)return e;if(!e)return n;const t=lt(Object.create(null),n);for(const r in e)t[r]=ft(n[r],e[r]);return t}function _d(){return{app:null,config:{isNativeTag:Pm,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let j_=0;function $_(n,e){return function(r,s=null){ce(r)||(r=lt({},r)),s!=null&&!Oe(s)&&(s=null);const i=_d(),a=new WeakSet,l=[];let c=!1;const h=i.app={_uid:j_++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Ay,get config(){return i.config},set config(d){},use(d,...p){return a.has(d)||(d&&ce(d.install)?(a.add(d),d.install(h,...p)):ce(d)&&(a.add(d),d(h,...p))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,p){return p?(i.components[d]=p,h):i.components[d]},directive(d,p){return p?(i.directives[d]=p,h):i.directives[d]},mount(d,p,m){if(!c){const E=h._ceVNode||ot(r,s);return E.appContext=i,m===!0?m="svg":m===!1&&(m=void 0),n(E,d,m),c=!0,h._container=d,d.__vue_app__=h,Ll(E.component)}},onUnmount(d){l.push(d)},unmount(){c&&(Jt(l,h._instance,16),n(null,h._container),delete h._container.__vue_app__)},provide(d,p){return i.provides[d]=p,h},runWithContext(d){const p=Vr;Vr=h;try{return d()}finally{Vr=p}}};return h}}let Vr=null;function Vi(n,e){if(it){let t=it.provides;const r=it.parent&&it.parent.provides;r===t&&(t=it.provides=Object.create(r)),t[n]=e}}function Kt(n,e,t=!1){const r=it||Nt;if(r||Vr){const s=Vr?Vr._context.provides:r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&ce(e)?e.call(r&&r.proxy):e}}const yd={},vd=()=>Object.create(yd),Ed=n=>Object.getPrototypeOf(n)===yd;function H_(n,e,t,r=!1){const s={},i=vd();n.propsDefaults=Object.create(null),Td(n,e,s,i);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=r?s:Zf(s):n.type.props?n.props=s:n.props=i,n.attrs=i}function q_(n,e,t,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=n,l=Ae(s),[c]=n.propsOptions;let h=!1;if((r||a>0)&&!(a&16)){if(a&8){const d=n.vnode.dynamicProps;for(let p=0;p<d.length;p++){let m=d[p];if(Ro(n.emitsOptions,m))continue;const E=e[m];if(c)if(be(i,m))E!==i[m]&&(i[m]=E,h=!0);else{const k=Ct(m);s[k]=Ha(c,l,k,E,n,!1)}else E!==i[m]&&(i[m]=E,h=!0)}}}else{Td(n,e,s,i)&&(h=!0);let d;for(const p in l)(!e||!be(e,p)&&((d=gr(p))===p||!be(e,d)))&&(c?t&&(t[p]!==void 0||t[d]!==void 0)&&(s[p]=Ha(c,l,p,void 0,n,!0)):delete s[p]);if(i!==l)for(const p in i)(!e||!be(e,p))&&(delete i[p],h=!0)}h&&an(n.attrs,"set","")}function Td(n,e,t,r){const[s,i]=n.propsOptions;let a=!1,l;if(e)for(let c in e){if(As(c))continue;const h=e[c];let d;s&&be(s,d=Ct(c))?!i||!i.includes(d)?t[d]=h:(l||(l={}))[d]=h:Ro(n.emitsOptions,c)||(!(c in r)||h!==r[c])&&(r[c]=h,a=!0)}if(i){const c=Ae(t),h=l||Pe;for(let d=0;d<i.length;d++){const p=i[d];t[p]=Ha(s,c,p,h[p],n,!be(h,p))}}return a}function Ha(n,e,t,r,s,i){const a=n[t];if(a!=null){const l=be(a,"default");if(l&&r===void 0){const c=a.default;if(a.type!==Function&&!a.skipFactory&&ce(c)){const{propsDefaults:h}=s;if(t in h)r=h[t];else{const d=Zs(s);r=h[t]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(t,r)}a[0]&&(i&&!l?r=!1:a[1]&&(r===""||r===gr(t))&&(r=!0))}return r}const z_=new WeakMap;function wd(n,e,t=!1){const r=t?z_:e.propsCache,s=r.get(n);if(s)return s;const i=n.props,a={},l=[];let c=!1;if(!ce(n)){const d=p=>{c=!0;const[m,E]=wd(p,e,!0);lt(a,m),E&&l.push(...E)};!t&&e.mixins.length&&e.mixins.forEach(d),n.extends&&d(n.extends),n.mixins&&n.mixins.forEach(d)}if(!i&&!c)return Oe(n)&&r.set(n,Pr),Pr;if(ae(i))for(let d=0;d<i.length;d++){const p=Ct(i[d]);Iu(p)&&(a[p]=Pe)}else if(i)for(const d in i){const p=Ct(d);if(Iu(p)){const m=i[d],E=a[p]=ae(m)||ce(m)?{type:m}:lt({},m),k=E.type;let N=!1,L=!0;if(ae(k))for(let K=0;K<k.length;++K){const B=k[K],q=ce(B)&&B.name;if(q==="Boolean"){N=!0;break}else q==="String"&&(L=!1)}else N=ce(k)&&k.name==="Boolean";E[0]=N,E[1]=L,(N||be(E,"default"))&&l.push(p)}}const h=[a,l];return Oe(n)&&r.set(n,h),h}function Iu(n){return n[0]!=="$"&&!As(n)}const Id=n=>n[0]==="_"||n==="$stable",xl=n=>ae(n)?n.map(Ht):[Ht(n)],K_=(n,e,t)=>{if(e._n)return e;const r=Ua((...s)=>xl(e(...s)),t);return r._c=!1,r},Ad=(n,e,t)=>{const r=n._ctx;for(const s in n){if(Id(s))continue;const i=n[s];if(ce(i))e[s]=K_(s,i,r);else if(i!=null){const a=xl(i);e[s]=()=>a}}},bd=(n,e)=>{const t=xl(e);n.slots.default=()=>t},Rd=(n,e,t)=>{for(const r in e)(t||r!=="_")&&(n[r]=e[r])},G_=(n,e,t)=>{const r=n.slots=vd();if(n.vnode.shapeFlag&32){const s=e._;s?(Rd(r,e,t),t&&xf(r,"_",s,!0)):Ad(e,r)}else e&&bd(n,e)},W_=(n,e,t)=>{const{vnode:r,slots:s}=n;let i=!0,a=Pe;if(r.shapeFlag&32){const l=e._;l?t&&l===1?i=!1:Rd(s,e,t):(i=!e.$stable,Ad(e,s)),a=e}else e&&(bd(n,e),a={default:1});if(i)for(const l in s)!Id(l)&&a[l]==null&&delete s[l]},Et=ly;function Q_(n){return J_(n)}function J_(n,e){const t=To();t.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:l,createComment:c,setText:h,setElementText:d,parentNode:p,nextSibling:m,setScopeId:E=zt,insertStaticContent:k}=n,N=(y,v,R,O=null,M=null,V=null,G=void 0,j=null,U=!!v.dynamicChildren)=>{if(y===v)return;y&&!_s(y,v)&&(O=D(y),Ne(y,M,V,!0),y=null),v.patchFlag===-2&&(U=!1,v.dynamicChildren=null);const{type:F,ref:te,shapeFlag:Q}=v;switch(F){case So:L(y,v,R,O);break;case hr:K(y,v,R,O);break;case ma:y==null&&B(v,R,O,G);break;case $t:S(y,v,R,O,M,V,G,j,U);break;default:Q&1?he(y,v,R,O,M,V,G,j,U):Q&6?T(y,v,R,O,M,V,G,j,U):(Q&64||Q&128)&&F.process(y,v,R,O,M,V,G,j,U,Y)}te!=null&&M&&Ji(te,y&&y.ref,V,v||y,!v)},L=(y,v,R,O)=>{if(y==null)r(v.el=l(v.children),R,O);else{const M=v.el=y.el;v.children!==y.children&&h(M,v.children)}},K=(y,v,R,O)=>{y==null?r(v.el=c(v.children||""),R,O):v.el=y.el},B=(y,v,R,O)=>{[y.el,y.anchor]=k(y.children,v,R,O,y.el,y.anchor)},q=({el:y,anchor:v},R,O)=>{let M;for(;y&&y!==v;)M=m(y),r(y,R,O),y=M;r(v,R,O)},z=({el:y,anchor:v})=>{let R;for(;y&&y!==v;)R=m(y),s(y),y=R;s(v)},he=(y,v,R,O,M,V,G,j,U)=>{v.type==="svg"?G="svg":v.type==="math"&&(G="mathml"),y==null?fe(v,R,O,M,V,G,j,U):w(y,v,M,V,G,j,U)},fe=(y,v,R,O,M,V,G,j)=>{let U,F;const{props:te,shapeFlag:Q,transition:Z,dirs:se}=y;if(U=y.el=a(y.type,V,te&&te.is,te),Q&8?d(U,y.children):Q&16&&_(y.children,U,null,O,M,ga(y,V),G,j),se&&er(y,null,O,"created"),I(U,y,y.scopeId,G,O),te){for(const le in te)le!=="value"&&!As(le)&&i(U,le,null,te[le],V,O);"value"in te&&i(U,"value",null,te.value,V),(F=te.onVnodeBeforeMount)&&Ft(F,O,y)}se&&er(y,null,O,"beforeMount");const ne=X_(M,Z);ne&&Z.beforeEnter(U),r(U,v,R),((F=te&&te.onVnodeMounted)||ne||se)&&Et(()=>{F&&Ft(F,O,y),ne&&Z.enter(U),se&&er(y,null,O,"mounted")},M)},I=(y,v,R,O,M)=>{if(R&&E(y,R),O)for(let V=0;V<O.length;V++)E(y,O[V]);if(M){let V=M.subTree;if(v===V||Od(V.type)&&(V.ssContent===v||V.ssFallback===v)){const G=M.vnode;I(y,G,G.scopeId,G.slotScopeIds,M.parent)}}},_=(y,v,R,O,M,V,G,j,U=0)=>{for(let F=U;F<y.length;F++){const te=y[F]=j?bn(y[F]):Ht(y[F]);N(null,te,v,R,O,M,V,G,j)}},w=(y,v,R,O,M,V,G)=>{const j=v.el=y.el;let{patchFlag:U,dynamicChildren:F,dirs:te}=v;U|=y.patchFlag&16;const Q=y.props||Pe,Z=v.props||Pe;let se;if(R&&tr(R,!1),(se=Z.onVnodeBeforeUpdate)&&Ft(se,R,v,y),te&&er(v,y,R,"beforeUpdate"),R&&tr(R,!0),(Q.innerHTML&&Z.innerHTML==null||Q.textContent&&Z.textContent==null)&&d(j,""),F?A(y.dynamicChildren,F,j,R,O,ga(v,M),V):G||de(y,v,j,null,R,O,ga(v,M),V,!1),U>0){if(U&16)b(j,Q,Z,R,M);else if(U&2&&Q.class!==Z.class&&i(j,"class",null,Z.class,M),U&4&&i(j,"style",Q.style,Z.style,M),U&8){const ne=v.dynamicProps;for(let le=0;le<ne.length;le++){const me=ne[le],Je=Q[me],ze=Z[me];(ze!==Je||me==="value")&&i(j,me,Je,ze,M,R)}}U&1&&y.children!==v.children&&d(j,v.children)}else!G&&F==null&&b(j,Q,Z,R,M);((se=Z.onVnodeUpdated)||te)&&Et(()=>{se&&Ft(se,R,v,y),te&&er(v,y,R,"updated")},O)},A=(y,v,R,O,M,V,G)=>{for(let j=0;j<v.length;j++){const U=y[j],F=v[j],te=U.el&&(U.type===$t||!_s(U,F)||U.shapeFlag&70)?p(U.el):R;N(U,F,te,null,O,M,V,G,!0)}},b=(y,v,R,O,M)=>{if(v!==R){if(v!==Pe)for(const V in v)!As(V)&&!(V in R)&&i(y,V,v[V],null,M,O);for(const V in R){if(As(V))continue;const G=R[V],j=v[V];G!==j&&V!=="value"&&i(y,V,j,G,M,O)}"value"in R&&i(y,"value",v.value,R.value,M)}},S=(y,v,R,O,M,V,G,j,U)=>{const F=v.el=y?y.el:l(""),te=v.anchor=y?y.anchor:l("");let{patchFlag:Q,dynamicChildren:Z,slotScopeIds:se}=v;se&&(j=j?j.concat(se):se),y==null?(r(F,R,O),r(te,R,O),_(v.children||[],R,te,M,V,G,j,U)):Q>0&&Q&64&&Z&&y.dynamicChildren?(A(y.dynamicChildren,Z,R,M,V,G,j),(v.key!=null||M&&v===M.subTree)&&Sd(y,v,!0)):de(y,v,R,te,M,V,G,j,U)},T=(y,v,R,O,M,V,G,j,U)=>{v.slotScopeIds=j,y==null?v.shapeFlag&512?M.ctx.activate(v,R,O,G,U):ut(v,R,O,M,V,G,U):It(y,v,U)},ut=(y,v,R,O,M,V,G)=>{const j=y.component=_y(y,O,M);if(hd(y)&&(j.ctx.renderer=Y),yy(j,!1,G),j.asyncDep){if(M&&M.registerDep(j,Ue,G),!y.el){const U=j.subTree=ot(hr);K(null,U,v,R)}}else Ue(j,y,v,R,M,V,G)},It=(y,v,R)=>{const O=v.component=y.component;if(oy(y,v,R))if(O.asyncDep&&!O.asyncResolved){ge(O,v,R);return}else O.next=v,O.update();else v.el=y.el,O.vnode=v},Ue=(y,v,R,O,M,V,G)=>{const j=()=>{if(y.isMounted){let{next:Q,bu:Z,u:se,parent:ne,vnode:le}=y;{const Xe=Cd(y);if(Xe){Q&&(Q.el=le.el,ge(y,Q,G)),Xe.asyncDep.then(()=>{y.isUnmounted||j()});return}}let me=Q,Je;tr(y,!1),Q?(Q.el=le.el,ge(y,Q,G)):Q=le,Z&&ca(Z),(Je=Q.props&&Q.props.onVnodeBeforeUpdate)&&Ft(Je,ne,Q,le),tr(y,!0);const ze=bu(y),bt=y.subTree;y.subTree=ze,N(bt,ze,p(bt.el),D(bt),y,M,V),Q.el=ze.el,me===null&&ay(y,ze.el),se&&Et(se,M),(Je=Q.props&&Q.props.onVnodeUpdated)&&Et(()=>Ft(Je,ne,Q,le),M)}else{let Q;const{el:Z,props:se}=v,{bm:ne,m:le,parent:me,root:Je,type:ze}=y,bt=Cs(v);tr(y,!1),ne&&ca(ne),!bt&&(Q=se&&se.onVnodeBeforeMount)&&Ft(Q,me,v),tr(y,!0);{Je.ce&&Je.ce._injectChildStyle(ze);const Xe=y.subTree=bu(y);N(null,Xe,R,O,y,M,V),v.el=Xe.el}if(le&&Et(le,M),!bt&&(Q=se&&se.onVnodeMounted)){const Xe=v;Et(()=>Ft(Q,me,Xe),M)}(v.shapeFlag&256||me&&Cs(me.vnode)&&me.vnode.shapeFlag&256)&&y.a&&Et(y.a,M),y.isMounted=!0,v=R=O=null}};y.scope.on();const U=y.effect=new Uf(j);y.scope.off();const F=y.update=U.run.bind(U),te=y.job=U.runIfDirty.bind(U);te.i=y,te.id=y.uid,U.scheduler=()=>Nl(te),tr(y,!0),F()},ge=(y,v,R)=>{v.component=y;const O=y.vnode.props;y.vnode=v,y.next=null,q_(y,v.props,O,R),W_(y,v.children,R),Gn(),mu(y),Wn()},de=(y,v,R,O,M,V,G,j,U=!1)=>{const F=y&&y.children,te=y?y.shapeFlag:0,Q=v.children,{patchFlag:Z,shapeFlag:se}=v;if(Z>0){if(Z&128){Pt(F,Q,R,O,M,V,G,j,U);return}else if(Z&256){yt(F,Q,R,O,M,V,G,j,U);return}}se&8?(te&16&&gt(F,M,V),Q!==F&&d(R,Q)):te&16?se&16?Pt(F,Q,R,O,M,V,G,j,U):gt(F,M,V,!0):(te&8&&d(R,""),se&16&&_(Q,R,O,M,V,G,j,U))},yt=(y,v,R,O,M,V,G,j,U)=>{y=y||Pr,v=v||Pr;const F=y.length,te=v.length,Q=Math.min(F,te);let Z;for(Z=0;Z<Q;Z++){const se=v[Z]=U?bn(v[Z]):Ht(v[Z]);N(y[Z],se,R,null,M,V,G,j,U)}F>te?gt(y,M,V,!0,!1,Q):_(v,R,O,M,V,G,j,U,Q)},Pt=(y,v,R,O,M,V,G,j,U)=>{let F=0;const te=v.length;let Q=y.length-1,Z=te-1;for(;F<=Q&&F<=Z;){const se=y[F],ne=v[F]=U?bn(v[F]):Ht(v[F]);if(_s(se,ne))N(se,ne,R,null,M,V,G,j,U);else break;F++}for(;F<=Q&&F<=Z;){const se=y[Q],ne=v[Z]=U?bn(v[Z]):Ht(v[Z]);if(_s(se,ne))N(se,ne,R,null,M,V,G,j,U);else break;Q--,Z--}if(F>Q){if(F<=Z){const se=Z+1,ne=se<te?v[se].el:O;for(;F<=Z;)N(null,v[F]=U?bn(v[F]):Ht(v[F]),R,ne,M,V,G,j,U),F++}}else if(F>Z)for(;F<=Q;)Ne(y[F],M,V,!0),F++;else{const se=F,ne=F,le=new Map;for(F=ne;F<=Z;F++){const Ke=v[F]=U?bn(v[F]):Ht(v[F]);Ke.key!=null&&le.set(Ke.key,F)}let me,Je=0;const ze=Z-ne+1;let bt=!1,Xe=0;const yn=new Array(ze);for(F=0;F<ze;F++)yn[F]=0;for(F=se;F<=Q;F++){const Ke=y[F];if(Je>=ze){Ne(Ke,M,V,!0);continue}let Rt;if(Ke.key!=null)Rt=le.get(Ke.key);else for(me=ne;me<=Z;me++)if(yn[me-ne]===0&&_s(Ke,v[me])){Rt=me;break}Rt===void 0?Ne(Ke,M,V,!0):(yn[Rt-ne]=F+1,Rt>=Xe?Xe=Rt:bt=!0,N(Ke,v[Rt],R,null,M,V,G,j,U),Je++)}const rs=bt?Y_(yn):Pr;for(me=rs.length-1,F=ze-1;F>=0;F--){const Ke=ne+F,Rt=v[Ke],ci=Ke+1<te?v[Ke+1].el:O;yn[F]===0?N(null,Rt,R,ci,M,V,G,j,U):bt&&(me<0||F!==rs[me]?At(Rt,R,ci,2):me--)}}},At=(y,v,R,O,M=null)=>{const{el:V,type:G,transition:j,children:U,shapeFlag:F}=y;if(F&6){At(y.component.subTree,v,R,O);return}if(F&128){y.suspense.move(v,R,O);return}if(F&64){G.move(y,v,R,Y);return}if(G===$t){r(V,v,R);for(let Q=0;Q<U.length;Q++)At(U[Q],v,R,O);r(y.anchor,v,R);return}if(G===ma){q(y,v,R);return}if(O!==2&&F&1&&j)if(O===0)j.beforeEnter(V),r(V,v,R),Et(()=>j.enter(V),M);else{const{leave:Q,delayLeave:Z,afterLeave:se}=j,ne=()=>r(V,v,R),le=()=>{Q(V,()=>{ne(),se&&se()})};Z?Z(V,ne,le):le()}else r(V,v,R)},Ne=(y,v,R,O=!1,M=!1)=>{const{type:V,props:G,ref:j,children:U,dynamicChildren:F,shapeFlag:te,patchFlag:Q,dirs:Z,cacheIndex:se}=y;if(Q===-2&&(M=!1),j!=null&&Ji(j,null,R,y,!0),se!=null&&(v.renderCache[se]=void 0),te&256){v.ctx.deactivate(y);return}const ne=te&1&&Z,le=!Cs(y);let me;if(le&&(me=G&&G.onVnodeBeforeUnmount)&&Ft(me,v,y),te&6)Lt(y.component,R,O);else{if(te&128){y.suspense.unmount(R,O);return}ne&&er(y,null,v,"beforeUnmount"),te&64?y.type.remove(y,v,R,Y,O):F&&!F.hasOnce&&(V!==$t||Q>0&&Q&64)?gt(F,v,R,!1,!0):(V===$t&&Q&384||!M&&te&16)&&gt(U,v,R),O&&Ve(y)}(le&&(me=G&&G.onVnodeUnmounted)||ne)&&Et(()=>{me&&Ft(me,v,y),ne&&er(y,null,v,"unmounted")},R)},Ve=y=>{const{type:v,el:R,anchor:O,transition:M}=y;if(v===$t){_n(R,O);return}if(v===ma){z(y);return}const V=()=>{s(R),M&&!M.persisted&&M.afterLeave&&M.afterLeave()};if(y.shapeFlag&1&&M&&!M.persisted){const{leave:G,delayLeave:j}=M,U=()=>G(R,V);j?j(y.el,V,U):U()}else V()},_n=(y,v)=>{let R;for(;y!==v;)R=m(y),s(y),y=R;s(v)},Lt=(y,v,R)=>{const{bum:O,scope:M,job:V,subTree:G,um:j,m:U,a:F}=y;Au(U),Au(F),O&&ca(O),M.stop(),V&&(V.flags|=8,Ne(G,y,v,R)),j&&Et(j,v),Et(()=>{y.isUnmounted=!0},v),v&&v.pendingBranch&&!v.isUnmounted&&y.asyncDep&&!y.asyncResolved&&y.suspenseId===v.pendingId&&(v.deps--,v.deps===0&&v.resolve())},gt=(y,v,R,O=!1,M=!1,V=0)=>{for(let G=V;G<y.length;G++)Ne(y[G],v,R,O,M)},D=y=>{if(y.shapeFlag&6)return D(y.component.subTree);if(y.shapeFlag&128)return y.suspense.next();const v=m(y.anchor||y.el),R=v&&v[y_];return R?m(R):v};let J=!1;const W=(y,v,R)=>{y==null?v._vnode&&Ne(v._vnode,null,null,!0):N(v._vnode||null,y,v,null,null,null,R),v._vnode=y,J||(J=!0,mu(),od(),J=!1)},Y={p:N,um:Ne,m:At,r:Ve,mt:ut,mc:_,pc:de,pbc:A,n:D,o:n};return{render:W,hydrate:void 0,createApp:$_(W)}}function ga({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function tr({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function X_(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Sd(n,e,t=!1){const r=n.children,s=e.children;if(ae(r)&&ae(s))for(let i=0;i<r.length;i++){const a=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=bn(s[i]),l.el=a.el),!t&&l.patchFlag!==-2&&Sd(a,l)),l.type===So&&(l.el=a.el)}}function Y_(n){const e=n.slice(),t=[0];let r,s,i,a,l;const c=n.length;for(r=0;r<c;r++){const h=n[r];if(h!==0){if(s=t[t.length-1],n[s]<h){e[r]=s,t.push(r);continue}for(i=0,a=t.length-1;i<a;)l=i+a>>1,n[t[l]]<h?i=l+1:a=l;h<n[t[i]]&&(i>0&&(e[r]=t[i-1]),t[i]=r)}}for(i=t.length,a=t[i-1];i-- >0;)t[i]=a,a=e[a];return t}function Cd(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Cd(e)}function Au(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Z_=Symbol.for("v-scx"),ey=()=>Kt(Z_);function xi(n,e,t){return Pd(n,e,t)}function Pd(n,e,t=Pe){const{immediate:r,deep:s,flush:i,once:a}=t,l=lt({},t),c=e&&r||!e&&i!=="post";let h;if($s){if(i==="sync"){const E=ey();h=E.__watcherHandles||(E.__watcherHandles=[])}else if(!c){const E=()=>{};return E.stop=zt,E.resume=zt,E.pause=zt,E}}const d=it;l.call=(E,k,N)=>Jt(E,d,k,N);let p=!1;i==="post"?l.scheduler=E=>{Et(E,d&&d.suspense)}:i!=="sync"&&(p=!0,l.scheduler=(E,k)=>{k?E():Nl(E)}),l.augmentJob=E=>{e&&(E.flags|=4),p&&(E.flags|=2,d&&(E.id=d.uid,E.i=d))};const m=p_(n,e,l);return $s&&(h?h.push(m):c&&m()),m}function ty(n,e,t){const r=this.proxy,s=je(n)?n.includes(".")?kd(r,n):()=>r[n]:n.bind(r,r);let i;ce(e)?i=e:(i=e.handler,t=e);const a=Zs(this),l=Pd(s,i.bind(r),t);return a(),l}function kd(n,e){const t=e.split(".");return()=>{let r=n;for(let s=0;s<t.length&&r;s++)r=r[t[s]];return r}}const ny=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Ct(e)}Modifiers`]||n[`${gr(e)}Modifiers`];function ry(n,e,...t){if(n.isUnmounted)return;const r=n.vnode.props||Pe;let s=t;const i=e.startsWith("update:"),a=i&&ny(r,e.slice(7));a&&(a.trim&&(s=t.map(d=>je(d)?d.trim():d)),a.number&&(s=t.map(Vm)));let l,c=r[l=la(e)]||r[l=la(Ct(e))];!c&&i&&(c=r[l=la(gr(e))]),c&&Jt(c,n,6,s);const h=r[l+"Once"];if(h){if(!n.emitted)n.emitted={};else if(n.emitted[l])return;n.emitted[l]=!0,Jt(h,n,6,s)}}function Dd(n,e,t=!1){const r=e.emitsCache,s=r.get(n);if(s!==void 0)return s;const i=n.emits;let a={},l=!1;if(!ce(n)){const c=h=>{const d=Dd(h,e,!0);d&&(l=!0,lt(a,d))};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}return!i&&!l?(Oe(n)&&r.set(n,null),null):(ae(i)?i.forEach(c=>a[c]=null):lt(a,i),Oe(n)&&r.set(n,a),a)}function Ro(n,e){return!n||!_o(e)?!1:(e=e.slice(2).replace(/Once$/,""),be(n,e[0].toLowerCase()+e.slice(1))||be(n,gr(e))||be(n,e))}function bu(n){const{type:e,vnode:t,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:l,emit:c,render:h,renderCache:d,props:p,data:m,setupState:E,ctx:k,inheritAttrs:N}=n,L=Qi(n);let K,B;try{if(t.shapeFlag&4){const z=s||r,he=z;K=Ht(h.call(he,z,d,p,E,m,k)),B=l}else{const z=e;K=Ht(z.length>1?z(p,{attrs:l,slots:a,emit:c}):z(p,null)),B=e.props?l:sy(l)}}catch(z){ks.length=0,Ao(z,n,1),K=ot(hr)}let q=K;if(B&&N!==!1){const z=Object.keys(B),{shapeFlag:he}=q;z.length&&he&7&&(i&&z.some(Tl)&&(B=iy(B,i)),q=Br(q,B,!1,!0))}return t.dirs&&(q=Br(q,null,!1,!0),q.dirs=q.dirs?q.dirs.concat(t.dirs):t.dirs),t.transition&&Vl(q,t.transition),K=q,Qi(L),K}const sy=n=>{let e;for(const t in n)(t==="class"||t==="style"||_o(t))&&((e||(e={}))[t]=n[t]);return e},iy=(n,e)=>{const t={};for(const r in n)(!Tl(r)||!(r.slice(9)in e))&&(t[r]=n[r]);return t};function oy(n,e,t){const{props:r,children:s,component:i}=n,{props:a,children:l,patchFlag:c}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return r?Ru(r,a,h):!!a;if(c&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const m=d[p];if(a[m]!==r[m]&&!Ro(h,m))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===a?!1:r?a?Ru(r,a,h):!0:!!a;return!1}function Ru(n,e,t){const r=Object.keys(e);if(r.length!==Object.keys(n).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==n[i]&&!Ro(t,i))return!0}return!1}function ay({vnode:n,parent:e},t){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.el=n.el),r===n)(n=e.vnode).el=t,e=e.parent;else break}}const Od=n=>n.__isSuspense;function ly(n,e){e&&e.pendingBranch?ae(n)?e.effects.push(...n):e.effects.push(n):__(n)}const $t=Symbol.for("v-fgt"),So=Symbol.for("v-txt"),hr=Symbol.for("v-cmt"),ma=Symbol.for("v-stc"),ks=[];let wt=null;function Bt(n=!1){ks.push(wt=n?null:[])}function cy(){ks.pop(),wt=ks[ks.length-1]||null}let js=1;function Su(n,e=!1){js+=n,n<0&&wt&&e&&(wt.hasOnce=!0)}function Nd(n){return n.dynamicChildren=js>0?wt||Pr:null,cy(),js>0&&wt&&wt.push(n),n}function sn(n,e,t,r,s,i){return Nd(Se(n,e,t,r,s,i,!0))}function uy(n,e,t,r,s){return Nd(ot(n,e,t,r,s,!0))}function Yi(n){return n?n.__v_isVNode===!0:!1}function _s(n,e){return n.type===e.type&&n.key===e.key}const Vd=({key:n})=>n??null,Mi=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?je(n)||at(n)||ce(n)?{i:Nt,r:n,k:e,f:!!t}:n:null);function Se(n,e=null,t=null,r=0,s=null,i=n===$t?0:1,a=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Vd(e),ref:e&&Mi(e),scopeId:ld,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Nt};return l?(Ml(c,t),i&128&&n.normalize(c)):t&&(c.shapeFlag|=je(t)?8:16),js>0&&!a&&wt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&wt.push(c),c}const ot=hy;function hy(n,e=null,t=null,r=0,s=null,i=!1){if((!n||n===O_)&&(n=hr),Yi(n)){const l=Br(n,e,!0);return t&&Ml(l,t),js>0&&!i&&wt&&(l.shapeFlag&6?wt[wt.indexOf(n)]=l:wt.push(l)),l.patchFlag=-2,l}if(Iy(n)&&(n=n.__vccOpts),e){e=fy(e);let{class:l,style:c}=e;l&&!je(l)&&(e.class=bl(l)),Oe(c)&&(Ol(c)&&!ae(c)&&(c=lt({},c)),e.style=Al(c))}const a=je(n)?1:Od(n)?128:v_(n)?64:Oe(n)?4:ce(n)?2:0;return Se(n,e,t,r,s,a,i,!0)}function fy(n){return n?Ol(n)||Ed(n)?lt({},n):n:null}function Br(n,e,t=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:l,transition:c}=n,h=e?py(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:n.type,props:h,key:h&&Vd(h),ref:e&&e.ref?t&&i?ae(i)?i.concat(Mi(e)):[i,Mi(e)]:Mi(e):i,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:l,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==$t?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:c,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Br(n.ssContent),ssFallback:n.ssFallback&&Br(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return c&&r&&Vl(d,c.clone(d)),d}function sr(n=" ",e=0){return ot(So,null,n,e)}function dy(n="",e=!1){return e?(Bt(),uy(hr,null,n)):ot(hr,null,n)}function Ht(n){return n==null||typeof n=="boolean"?ot(hr):ae(n)?ot($t,null,n.slice()):Yi(n)?bn(n):ot(So,null,String(n))}function bn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Br(n)}function Ml(n,e){let t=0;const{shapeFlag:r}=n;if(e==null)e=null;else if(ae(e))t=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Ml(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!Ed(e)?e._ctx=Nt:s===3&&Nt&&(Nt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else ce(e)?(e={default:e,_ctx:Nt},t=32):(e=String(e),r&64?(t=16,e=[sr(e)]):t=8);n.children=e,n.shapeFlag|=t}function py(...n){const e={};for(let t=0;t<n.length;t++){const r=n[t];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=bl([e.class,r.class]));else if(s==="style")e.style=Al([e.style,r.style]);else if(_o(s)){const i=e[s],a=r[s];a&&i!==a&&!(ae(i)&&i.includes(a))&&(e[s]=i?[].concat(i,a):a)}else s!==""&&(e[s]=r[s])}return e}function Ft(n,e,t,r=null){Jt(n,e,7,[t,r])}const gy=_d();let my=0;function _y(n,e,t){const r=n.type,s=(e?e.appContext:n.appContext)||gy,i={uid:my++,vnode:n,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new jm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:wd(r,s),emitsOptions:Dd(r,s),emit:null,emitted:null,propsDefaults:Pe,inheritAttrs:r.inheritAttrs,ctx:Pe,data:Pe,props:Pe,attrs:Pe,slots:Pe,refs:Pe,setupState:Pe,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=ry.bind(null,i),n.ce&&n.ce(i),i}let it=null,Zi,qa;{const n=To(),e=(t,r)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};Zi=e("__VUE_INSTANCE_SETTERS__",t=>it=t),qa=e("__VUE_SSR_SETTERS__",t=>$s=t)}const Zs=n=>{const e=it;return Zi(n),n.scope.on(),()=>{n.scope.off(),Zi(e)}},Cu=()=>{it&&it.scope.off(),Zi(null)};function xd(n){return n.vnode.shapeFlag&4}let $s=!1;function yy(n,e=!1,t=!1){e&&qa(e);const{props:r,children:s}=n.vnode,i=xd(n);H_(n,r,i,e),G_(n,s,t);const a=i?vy(n,e):void 0;return e&&qa(!1),a}function vy(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,x_);const{setup:r}=t;if(r){Gn();const s=n.setupContext=r.length>1?Ty(n):null,i=Zs(n),a=Ys(r,n,0,[n.props,s]),l=Of(a);if(Wn(),i(),(l||n.sp)&&!Cs(n)&&ud(n),l){if(a.then(Cu,Cu),e)return a.then(c=>{Pu(n,c)}).catch(c=>{Ao(c,n,0)});n.asyncDep=a}else Pu(n,a)}else Md(n)}function Pu(n,e,t){ce(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Oe(e)&&(n.setupState=nd(e)),Md(n)}function Md(n,e,t){const r=n.type;n.render||(n.render=r.render||zt);{const s=Zs(n);Gn();try{M_(n)}finally{Wn(),s()}}}const Ey={get(n,e){return nt(n,"get",""),n[e]}};function Ty(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Ey),slots:n.slots,emit:n.emit,expose:e}}function Ll(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(nd(a_(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Ps)return Ps[t](n)},has(e,t){return t in e||t in Ps}})):n.proxy}function wy(n,e=!0){return ce(n)?n.displayName||n.name:n.name||e&&n.__name}function Iy(n){return ce(n)&&"__vccOpts"in n}const Dt=(n,e)=>f_(n,e,$s);function Ld(n,e,t){const r=arguments.length;return r===2?Oe(e)&&!ae(e)?Yi(e)?ot(n,null,[e]):ot(n,e):ot(n,null,e):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&Yi(t)&&(t=[t]),ot(n,e,t))}const Ay="3.5.13";/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let za;const ku=typeof window<"u"&&window.trustedTypes;if(ku)try{za=ku.createPolicy("vue",{createHTML:n=>n})}catch{}const Fd=za?n=>za.createHTML(n):n=>n,by="http://www.w3.org/2000/svg",Ry="http://www.w3.org/1998/Math/MathML",on=typeof document<"u"?document:null,Du=on&&on.createElement("template"),Sy={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,r)=>{const s=e==="svg"?on.createElementNS(by,n):e==="mathml"?on.createElementNS(Ry,n):t?on.createElement(n,{is:t}):on.createElement(n);return n==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:n=>on.createTextNode(n),createComment:n=>on.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>on.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,r,s,i){const a=t?t.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===i||!(s=s.nextSibling)););else{Du.innerHTML=Fd(r==="svg"?`<svg>${n}</svg>`:r==="mathml"?`<math>${n}</math>`:n);const l=Du.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Cy=Symbol("_vtc");function Py(n,e,t){const r=n[Cy];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Ou=Symbol("_vod"),ky=Symbol("_vsh"),Dy=Symbol(""),Oy=/(^|;)\s*display\s*:/;function Ny(n,e,t){const r=n.style,s=je(t);let i=!1;if(t&&!s){if(e)if(je(e))for(const a of e.split(";")){const l=a.slice(0,a.indexOf(":")).trim();t[l]==null&&Li(r,l,"")}else for(const a in e)t[a]==null&&Li(r,a,"");for(const a in t)a==="display"&&(i=!0),Li(r,a,t[a])}else if(s){if(e!==t){const a=r[Dy];a&&(t+=";"+a),r.cssText=t,i=Oy.test(t)}}else e&&n.removeAttribute("style");Ou in n&&(n[Ou]=i?r.display:"",n[ky]&&(r.display="none"))}const Nu=/\s*!important$/;function Li(n,e,t){if(ae(t))t.forEach(r=>Li(n,e,r));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const r=Vy(n,e);Nu.test(t)?n.setProperty(gr(r),t.replace(Nu,""),"important"):n[r]=t}}const Vu=["Webkit","Moz","ms"],_a={};function Vy(n,e){const t=_a[e];if(t)return t;let r=Ct(e);if(r!=="filter"&&r in n)return _a[e]=r;r=Eo(r);for(let s=0;s<Vu.length;s++){const i=Vu[s]+r;if(i in n)return _a[e]=i}return e}const xu="http://www.w3.org/1999/xlink";function Mu(n,e,t,r,s,i=Bm(e)){r&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(xu,e.slice(6,e.length)):n.setAttributeNS(xu,e,t):t==null||i&&!Mf(t)?n.removeAttribute(e):n.setAttribute(e,i?"":Kn(t)?String(t):t)}function Lu(n,e,t,r,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Fd(t):t);return}const i=n.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?n.getAttribute("value")||"":n.value,c=t==null?n.type==="checkbox"?"on":"":String(t);(l!==c||!("_value"in n))&&(n.value=c),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=Mf(t):t==null&&l==="string"?(t="",a=!0):l==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function xy(n,e,t,r){n.addEventListener(e,t,r)}function My(n,e,t,r){n.removeEventListener(e,t,r)}const Fu=Symbol("_vei");function Ly(n,e,t,r,s=null){const i=n[Fu]||(n[Fu]={}),a=i[e];if(r&&a)a.value=r;else{const[l,c]=Fy(e);if(r){const h=i[e]=jy(r,s);xy(n,l,h,c)}else a&&(My(n,l,a,c),i[e]=void 0)}}const Uu=/(?:Once|Passive|Capture)$/;function Fy(n){let e;if(Uu.test(n)){e={};let r;for(;r=n.match(Uu);)n=n.slice(0,n.length-r[0].length),e[r[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):gr(n.slice(2)),e]}let ya=0;const Uy=Promise.resolve(),By=()=>ya||(Uy.then(()=>ya=0),ya=Date.now());function jy(n,e){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;Jt($y(r,t.value),e,5,[r])};return t.value=n,t.attached=By(),t}function $y(n,e){if(ae(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Bu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Hy=(n,e,t,r,s,i)=>{const a=s==="svg";e==="class"?Py(n,r,a):e==="style"?Ny(n,t,r):_o(e)?Tl(e)||Ly(n,e,t,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):qy(n,e,r,a))?(Lu(n,e,r),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Mu(n,e,r,a,i,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!je(r))?Lu(n,Ct(e),r,i,e):(e==="true-value"?n._trueValue=r:e==="false-value"&&(n._falseValue=r),Mu(n,e,r,a))};function qy(n,e,t,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in n&&Bu(e)&&ce(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Bu(e)&&je(t)?!1:e in n}const zy=lt({patchProp:Hy},Sy);let ju;function Ky(){return ju||(ju=Q_(zy))}const Gy=(...n)=>{const e=Ky().createApp(...n),{mount:t}=e;return e.mount=r=>{const s=Qy(r);if(!s)return;const i=e._component;!ce(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,Wy(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function Wy(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Qy(n){return je(n)?document.querySelector(n):n}const Fl=(n,e)=>{const t=n.__vccOpts||n;for(const[r,s]of e)t[r]=s;return t},Jy={};function Xy(n,e){const t=_u("router-link"),r=_u("router-view");return Bt(),sn("div",null,[Se("nav",null,[ot(t,{to:"/"},{default:Ua(()=>e[0]||(e[0]=[sr("เข้าสู่ระบบ")])),_:1}),e[2]||(e[2]=sr(" | ")),ot(t,{to:"/home"},{default:Ua(()=>e[1]||(e[1]=[sr("หน้าหลัก")])),_:1}),e[3]||(e[3]=sr(" | "))]),ot(r)])}const Yy=Fl(Jy,[["render",Xy]]);/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const Ar=typeof document<"u";function Ud(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function Zy(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&Ud(n.default)}const Ie=Object.assign;function va(n,e){const t={};for(const r in e){const s=e[r];t[r]=Mt(s)?s.map(n):n(s)}return t}const Ds=()=>{},Mt=Array.isArray,Bd=/#/g,ev=/&/g,tv=/\//g,nv=/=/g,rv=/\?/g,jd=/\+/g,sv=/%5B/g,iv=/%5D/g,$d=/%5E/g,ov=/%60/g,Hd=/%7B/g,av=/%7C/g,qd=/%7D/g,lv=/%20/g;function Ul(n){return encodeURI(""+n).replace(av,"|").replace(sv,"[").replace(iv,"]")}function cv(n){return Ul(n).replace(Hd,"{").replace(qd,"}").replace($d,"^")}function Ka(n){return Ul(n).replace(jd,"%2B").replace(lv,"+").replace(Bd,"%23").replace(ev,"%26").replace(ov,"`").replace(Hd,"{").replace(qd,"}").replace($d,"^")}function uv(n){return Ka(n).replace(nv,"%3D")}function hv(n){return Ul(n).replace(Bd,"%23").replace(rv,"%3F")}function fv(n){return n==null?"":hv(n).replace(tv,"%2F")}function Hs(n){try{return decodeURIComponent(""+n)}catch{}return""+n}const dv=/\/$/,pv=n=>n.replace(dv,"");function Ea(n,e,t="/"){let r,s={},i="",a="";const l=e.indexOf("#");let c=e.indexOf("?");return l<c&&l>=0&&(c=-1),c>-1&&(r=e.slice(0,c),i=e.slice(c+1,l>-1?l:e.length),s=n(i)),l>-1&&(r=r||e.slice(0,l),a=e.slice(l,e.length)),r=yv(r??e,t),{fullPath:r+(i&&"?")+i+a,path:r,query:s,hash:Hs(a)}}function gv(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function $u(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function mv(n,e,t){const r=e.matched.length-1,s=t.matched.length-1;return r>-1&&r===s&&jr(e.matched[r],t.matched[s])&&zd(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function jr(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function zd(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t in n)if(!_v(n[t],e[t]))return!1;return!0}function _v(n,e){return Mt(n)?Hu(n,e):Mt(e)?Hu(e,n):n===e}function Hu(n,e){return Mt(e)?n.length===e.length&&n.every((t,r)=>t===e[r]):n.length===1&&n[0]===e}function yv(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),r=n.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=t.length-1,a,l;for(a=0;a<r.length;a++)if(l=r[a],l!==".")if(l==="..")i>1&&i--;else break;return t.slice(0,i).join("/")+"/"+r.slice(a).join("/")}const wn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var qs;(function(n){n.pop="pop",n.push="push"})(qs||(qs={}));var Os;(function(n){n.back="back",n.forward="forward",n.unknown=""})(Os||(Os={}));function vv(n){if(!n)if(Ar){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),pv(n)}const Ev=/^[^#]+#/;function Tv(n,e){return n.replace(Ev,"#")+e}function wv(n,e){const t=document.documentElement.getBoundingClientRect(),r=n.getBoundingClientRect();return{behavior:e.behavior,left:r.left-t.left-(e.left||0),top:r.top-t.top-(e.top||0)}}const Co=()=>({left:window.scrollX,top:window.scrollY});function Iv(n){let e;if("el"in n){const t=n.el,r=typeof t=="string"&&t.startsWith("#"),s=typeof t=="string"?r?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!s)return;e=wv(s,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function qu(n,e){return(history.state?history.state.position-e:-1)+n}const Ga=new Map;function Av(n,e){Ga.set(n,e)}function bv(n){const e=Ga.get(n);return Ga.delete(n),e}let Rv=()=>location.protocol+"//"+location.host;function Kd(n,e){const{pathname:t,search:r,hash:s}=e,i=n.indexOf("#");if(i>-1){let l=s.includes(n.slice(i))?n.slice(i).length:1,c=s.slice(l);return c[0]!=="/"&&(c="/"+c),$u(c,"")}return $u(t,n)+r+s}function Sv(n,e,t,r){let s=[],i=[],a=null;const l=({state:m})=>{const E=Kd(n,location),k=t.value,N=e.value;let L=0;if(m){if(t.value=E,e.value=m,a&&a===k){a=null;return}L=N?m.position-N.position:0}else r(E);s.forEach(K=>{K(t.value,k,{delta:L,type:qs.pop,direction:L?L>0?Os.forward:Os.back:Os.unknown})})};function c(){a=t.value}function h(m){s.push(m);const E=()=>{const k=s.indexOf(m);k>-1&&s.splice(k,1)};return i.push(E),E}function d(){const{history:m}=window;m.state&&m.replaceState(Ie({},m.state,{scroll:Co()}),"")}function p(){for(const m of i)m();i=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:c,listen:h,destroy:p}}function zu(n,e,t,r=!1,s=!1){return{back:n,current:e,forward:t,replaced:r,position:window.history.length,scroll:s?Co():null}}function Cv(n){const{history:e,location:t}=window,r={value:Kd(n,t)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,h,d){const p=n.indexOf("#"),m=p>-1?(t.host&&document.querySelector("base")?n:n.slice(p))+c:Rv()+n+c;try{e[d?"replaceState":"pushState"](h,"",m),s.value=h}catch(E){console.error(E),t[d?"replace":"assign"](m)}}function a(c,h){const d=Ie({},e.state,zu(s.value.back,c,s.value.forward,!0),h,{position:s.value.position});i(c,d,!0),r.value=c}function l(c,h){const d=Ie({},s.value,e.state,{forward:c,scroll:Co()});i(d.current,d,!0);const p=Ie({},zu(r.value,c,null),{position:d.position+1},h);i(c,p,!1),r.value=c}return{location:r,state:s,push:l,replace:a}}function Pv(n){n=vv(n);const e=Cv(n),t=Sv(n,e.state,e.location,e.replace);function r(i,a=!0){a||t.pauseListeners(),history.go(i)}const s=Ie({location:"",base:n,go:r,createHref:Tv.bind(null,n)},e,t);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function kv(n){return typeof n=="string"||n&&typeof n=="object"}function Gd(n){return typeof n=="string"||typeof n=="symbol"}const Wd=Symbol("");var Ku;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(Ku||(Ku={}));function $r(n,e){return Ie(new Error,{type:n,[Wd]:!0},e)}function rn(n,e){return n instanceof Error&&Wd in n&&(e==null||!!(n.type&e))}const Gu="[^/]+?",Dv={sensitive:!1,strict:!1,start:!0,end:!0},Ov=/[.+*?^${}()[\]/\\]/g;function Nv(n,e){const t=Ie({},Dv,e),r=[];let s=t.start?"^":"";const i=[];for(const h of n){const d=h.length?[]:[90];t.strict&&!h.length&&(s+="/");for(let p=0;p<h.length;p++){const m=h[p];let E=40+(t.sensitive?.25:0);if(m.type===0)p||(s+="/"),s+=m.value.replace(Ov,"\\$&"),E+=40;else if(m.type===1){const{value:k,repeatable:N,optional:L,regexp:K}=m;i.push({name:k,repeatable:N,optional:L});const B=K||Gu;if(B!==Gu){E+=10;try{new RegExp(`(${B})`)}catch(z){throw new Error(`Invalid custom RegExp for param "${k}" (${B}): `+z.message)}}let q=N?`((?:${B})(?:/(?:${B}))*)`:`(${B})`;p||(q=L&&h.length<2?`(?:/${q})`:"/"+q),L&&(q+="?"),s+=q,E+=20,L&&(E+=-8),N&&(E+=-20),B===".*"&&(E+=-50)}d.push(E)}r.push(d)}if(t.strict&&t.end){const h=r.length-1;r[h][r[h].length-1]+=.7000000000000001}t.strict||(s+="/?"),t.end?s+="$":t.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const a=new RegExp(s,t.sensitive?"":"i");function l(h){const d=h.match(a),p={};if(!d)return null;for(let m=1;m<d.length;m++){const E=d[m]||"",k=i[m-1];p[k.name]=E&&k.repeatable?E.split("/"):E}return p}function c(h){let d="",p=!1;for(const m of n){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const E of m)if(E.type===0)d+=E.value;else if(E.type===1){const{value:k,repeatable:N,optional:L}=E,K=k in h?h[k]:"";if(Mt(K)&&!N)throw new Error(`Provided param "${k}" is an array but it is not repeatable (* or + modifiers)`);const B=Mt(K)?K.join("/"):K;if(!B)if(L)m.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${k}"`);d+=B}}return d||"/"}return{re:a,score:r,keys:i,parse:l,stringify:c}}function Vv(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=e[t]-n[t];if(r)return r;t++}return n.length<e.length?n.length===1&&n[0]===80?-1:1:n.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Qd(n,e){let t=0;const r=n.score,s=e.score;for(;t<r.length&&t<s.length;){const i=Vv(r[t],s[t]);if(i)return i;t++}if(Math.abs(s.length-r.length)===1){if(Wu(r))return 1;if(Wu(s))return-1}return s.length-r.length}function Wu(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const xv={type:0,value:""},Mv=/[a-zA-Z0-9_]/;function Lv(n){if(!n)return[[]];if(n==="/")return[[xv]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(E){throw new Error(`ERR (${t})/"${h}": ${E}`)}let t=0,r=t;const s=[];let i;function a(){i&&s.push(i),i=[]}let l=0,c,h="",d="";function p(){h&&(t===0?i.push({type:0,value:h}):t===1||t===2||t===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:h,regexp:d,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),h="")}function m(){h+=c}for(;l<n.length;){if(c=n[l++],c==="\\"&&t!==2){r=t,t=4;continue}switch(t){case 0:c==="/"?(h&&p(),a()):c===":"?(p(),t=1):m();break;case 4:m(),t=r;break;case 1:c==="("?t=2:Mv.test(c)?m():(p(),t=0,c!=="*"&&c!=="?"&&c!=="+"&&l--);break;case 2:c===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+c:t=3:d+=c;break;case 3:p(),t=0,c!=="*"&&c!=="?"&&c!=="+"&&l--,d="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${h}"`),p(),a(),s}function Fv(n,e,t){const r=Nv(Lv(n.path),t),s=Ie(r,{record:n,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function Uv(n,e){const t=[],r=new Map;e=Yu({strict:!1,end:!0,sensitive:!1},e);function s(p){return r.get(p)}function i(p,m,E){const k=!E,N=Ju(p);N.aliasOf=E&&E.record;const L=Yu(e,p),K=[N];if("alias"in p){const z=typeof p.alias=="string"?[p.alias]:p.alias;for(const he of z)K.push(Ju(Ie({},N,{components:E?E.record.components:N.components,path:he,aliasOf:E?E.record:N})))}let B,q;for(const z of K){const{path:he}=z;if(m&&he[0]!=="/"){const fe=m.record.path,I=fe[fe.length-1]==="/"?"":"/";z.path=m.record.path+(he&&I+he)}if(B=Fv(z,m,L),E?E.alias.push(B):(q=q||B,q!==B&&q.alias.push(B),k&&p.name&&!Xu(B)&&a(p.name)),Jd(B)&&c(B),N.children){const fe=N.children;for(let I=0;I<fe.length;I++)i(fe[I],B,E&&E.children[I])}E=E||B}return q?()=>{a(q)}:Ds}function a(p){if(Gd(p)){const m=r.get(p);m&&(r.delete(p),t.splice(t.indexOf(m),1),m.children.forEach(a),m.alias.forEach(a))}else{const m=t.indexOf(p);m>-1&&(t.splice(m,1),p.record.name&&r.delete(p.record.name),p.children.forEach(a),p.alias.forEach(a))}}function l(){return t}function c(p){const m=$v(p,t);t.splice(m,0,p),p.record.name&&!Xu(p)&&r.set(p.record.name,p)}function h(p,m){let E,k={},N,L;if("name"in p&&p.name){if(E=r.get(p.name),!E)throw $r(1,{location:p});L=E.record.name,k=Ie(Qu(m.params,E.keys.filter(q=>!q.optional).concat(E.parent?E.parent.keys.filter(q=>q.optional):[]).map(q=>q.name)),p.params&&Qu(p.params,E.keys.map(q=>q.name))),N=E.stringify(k)}else if(p.path!=null)N=p.path,E=t.find(q=>q.re.test(N)),E&&(k=E.parse(N),L=E.record.name);else{if(E=m.name?r.get(m.name):t.find(q=>q.re.test(m.path)),!E)throw $r(1,{location:p,currentLocation:m});L=E.record.name,k=Ie({},m.params,p.params),N=E.stringify(k)}const K=[];let B=E;for(;B;)K.unshift(B.record),B=B.parent;return{name:L,path:N,params:k,matched:K,meta:jv(K)}}n.forEach(p=>i(p));function d(){t.length=0,r.clear()}return{addRoute:i,resolve:h,removeRoute:a,clearRoutes:d,getRoutes:l,getRecordMatcher:s}}function Qu(n,e){const t={};for(const r of e)r in n&&(t[r]=n[r]);return t}function Ju(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:Bv(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Bv(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const r in n.components)e[r]=typeof t=="object"?t[r]:t;return e}function Xu(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function jv(n){return n.reduce((e,t)=>Ie(e,t.meta),{})}function Yu(n,e){const t={};for(const r in n)t[r]=r in e?e[r]:n[r];return t}function $v(n,e){let t=0,r=e.length;for(;t!==r;){const i=t+r>>1;Qd(n,e[i])<0?r=i:t=i+1}const s=Hv(n);return s&&(r=e.lastIndexOf(s,r-1)),r}function Hv(n){let e=n;for(;e=e.parent;)if(Jd(e)&&Qd(n,e)===0)return e}function Jd({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function qv(n){const e={};if(n===""||n==="?")return e;const r=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(jd," "),a=i.indexOf("="),l=Hs(a<0?i:i.slice(0,a)),c=a<0?null:Hs(i.slice(a+1));if(l in e){let h=e[l];Mt(h)||(h=e[l]=[h]),h.push(c)}else e[l]=c}return e}function Zu(n){let e="";for(let t in n){const r=n[t];if(t=uv(t),r==null){r!==void 0&&(e+=(e.length?"&":"")+t);continue}(Mt(r)?r.map(i=>i&&Ka(i)):[r&&Ka(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+t,i!=null&&(e+="="+i))})}return e}function zv(n){const e={};for(const t in n){const r=n[t];r!==void 0&&(e[t]=Mt(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const Kv=Symbol(""),eh=Symbol(""),Po=Symbol(""),Xd=Symbol(""),Wa=Symbol("");function ys(){let n=[];function e(r){return n.push(r),()=>{const s=n.indexOf(r);s>-1&&n.splice(s,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Rn(n,e,t,r,s,i=a=>a()){const a=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((l,c)=>{const h=m=>{m===!1?c($r(4,{from:t,to:e})):m instanceof Error?c(m):kv(m)?c($r(2,{from:e,to:m})):(a&&r.enterCallbacks[s]===a&&typeof m=="function"&&a.push(m),l())},d=i(()=>n.call(r&&r.instances[s],e,t,h));let p=Promise.resolve(d);n.length<3&&(p=p.then(h)),p.catch(m=>c(m))})}function Ta(n,e,t,r,s=i=>i()){const i=[];for(const a of n)for(const l in a.components){let c=a.components[l];if(!(e!=="beforeRouteEnter"&&!a.instances[l]))if(Ud(c)){const d=(c.__vccOpts||c)[e];d&&i.push(Rn(d,t,r,a,l,s))}else{let h=c();i.push(()=>h.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${l}" at "${a.path}"`);const p=Zy(d)?d.default:d;a.mods[l]=d,a.components[l]=p;const E=(p.__vccOpts||p)[e];return E&&Rn(E,t,r,a,l,s)()}))}}return i}function th(n){const e=Kt(Po),t=Kt(Xd),r=Dt(()=>{const c=Or(n.to);return e.resolve(c)}),s=Dt(()=>{const{matched:c}=r.value,{length:h}=c,d=c[h-1],p=t.matched;if(!d||!p.length)return-1;const m=p.findIndex(jr.bind(null,d));if(m>-1)return m;const E=nh(c[h-2]);return h>1&&nh(d)===E&&p[p.length-1].path!==E?p.findIndex(jr.bind(null,c[h-2])):m}),i=Dt(()=>s.value>-1&&Xv(t.params,r.value.params)),a=Dt(()=>s.value>-1&&s.value===t.matched.length-1&&zd(t.params,r.value.params));function l(c={}){if(Jv(c)){const h=e[Or(n.replace)?"replace":"push"](Or(n.to)).catch(Ds);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>h),h}return Promise.resolve()}return{route:r,href:Dt(()=>r.value.href),isActive:i,isExactActive:a,navigate:l}}function Gv(n){return n.length===1?n[0]:n}const Wv=cd({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:th,setup(n,{slots:e}){const t=Io(th(n)),{options:r}=Kt(Po),s=Dt(()=>({[rh(n.activeClass,r.linkActiveClass,"router-link-active")]:t.isActive,[rh(n.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const i=e.default&&Gv(e.default(t));return n.custom?i:Ld("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:s.value},i)}}}),Qv=Wv;function Jv(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function Xv(n,e){for(const t in e){const r=e[t],s=n[t];if(typeof r=="string"){if(r!==s)return!1}else if(!Mt(s)||s.length!==r.length||r.some((i,a)=>i!==s[a]))return!1}return!0}function nh(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const rh=(n,e,t)=>n??e??t,Yv=cd({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const r=Kt(Wa),s=Dt(()=>n.route||r.value),i=Kt(eh,0),a=Dt(()=>{let h=Or(i);const{matched:d}=s.value;let p;for(;(p=d[h])&&!p.components;)h++;return h}),l=Dt(()=>s.value.matched[a.value]);Vi(eh,Dt(()=>a.value+1)),Vi(Kv,l),Vi(Wa,s);const c=Ss();return xi(()=>[c.value,l.value,n.name],([h,d,p],[m,E,k])=>{d&&(d.instances[p]=h,E&&E!==d&&h&&h===m&&(d.leaveGuards.size||(d.leaveGuards=E.leaveGuards),d.updateGuards.size||(d.updateGuards=E.updateGuards))),h&&d&&(!E||!jr(d,E)||!m)&&(d.enterCallbacks[p]||[]).forEach(N=>N(h))},{flush:"post"}),()=>{const h=s.value,d=n.name,p=l.value,m=p&&p.components[d];if(!m)return sh(t.default,{Component:m,route:h});const E=p.props[d],k=E?E===!0?h.params:typeof E=="function"?E(h):E:null,L=Ld(m,Ie({},k,e,{onVnodeUnmounted:K=>{K.component.isUnmounted&&(p.instances[d]=null)},ref:c}));return sh(t.default,{Component:L,route:h})||L}}});function sh(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const Zv=Yv;function eE(n){const e=Uv(n.routes,n),t=n.parseQuery||qv,r=n.stringifyQuery||Zu,s=n.history,i=ys(),a=ys(),l=ys(),c=l_(wn);let h=wn;Ar&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=va.bind(null,D=>""+D),p=va.bind(null,fv),m=va.bind(null,Hs);function E(D,J){let W,Y;return Gd(D)?(W=e.getRecordMatcher(D),Y=J):Y=D,e.addRoute(Y,W)}function k(D){const J=e.getRecordMatcher(D);J&&e.removeRoute(J)}function N(){return e.getRoutes().map(D=>D.record)}function L(D){return!!e.getRecordMatcher(D)}function K(D,J){if(J=Ie({},J||c.value),typeof D=="string"){const R=Ea(t,D,J.path),O=e.resolve({path:R.path},J),M=s.createHref(R.fullPath);return Ie(R,O,{params:m(O.params),hash:Hs(R.hash),redirectedFrom:void 0,href:M})}let W;if(D.path!=null)W=Ie({},D,{path:Ea(t,D.path,J.path).path});else{const R=Ie({},D.params);for(const O in R)R[O]==null&&delete R[O];W=Ie({},D,{params:p(R)}),J.params=p(J.params)}const Y=e.resolve(W,J),Te=D.hash||"";Y.params=d(m(Y.params));const y=gv(r,Ie({},D,{hash:cv(Te),path:Y.path})),v=s.createHref(y);return Ie({fullPath:y,hash:Te,query:r===Zu?zv(D.query):D.query||{}},Y,{redirectedFrom:void 0,href:v})}function B(D){return typeof D=="string"?Ea(t,D,c.value.path):Ie({},D)}function q(D,J){if(h!==D)return $r(8,{from:J,to:D})}function z(D){return I(D)}function he(D){return z(Ie(B(D),{replace:!0}))}function fe(D){const J=D.matched[D.matched.length-1];if(J&&J.redirect){const{redirect:W}=J;let Y=typeof W=="function"?W(D):W;return typeof Y=="string"&&(Y=Y.includes("?")||Y.includes("#")?Y=B(Y):{path:Y},Y.params={}),Ie({query:D.query,hash:D.hash,params:Y.path!=null?{}:D.params},Y)}}function I(D,J){const W=h=K(D),Y=c.value,Te=D.state,y=D.force,v=D.replace===!0,R=fe(W);if(R)return I(Ie(B(R),{state:typeof R=="object"?Ie({},Te,R.state):Te,force:y,replace:v}),J||W);const O=W;O.redirectedFrom=J;let M;return!y&&mv(r,Y,W)&&(M=$r(16,{to:O,from:Y}),At(Y,Y,!0,!1)),(M?Promise.resolve(M):A(O,Y)).catch(V=>rn(V)?rn(V,2)?V:Pt(V):de(V,O,Y)).then(V=>{if(V){if(rn(V,2))return I(Ie({replace:v},B(V.to),{state:typeof V.to=="object"?Ie({},Te,V.to.state):Te,force:y}),J||O)}else V=S(O,Y,!0,v,Te);return b(O,Y,V),V})}function _(D,J){const W=q(D,J);return W?Promise.reject(W):Promise.resolve()}function w(D){const J=_n.values().next().value;return J&&typeof J.runWithContext=="function"?J.runWithContext(D):D()}function A(D,J){let W;const[Y,Te,y]=tE(D,J);W=Ta(Y.reverse(),"beforeRouteLeave",D,J);for(const R of Y)R.leaveGuards.forEach(O=>{W.push(Rn(O,D,J))});const v=_.bind(null,D,J);return W.push(v),gt(W).then(()=>{W=[];for(const R of i.list())W.push(Rn(R,D,J));return W.push(v),gt(W)}).then(()=>{W=Ta(Te,"beforeRouteUpdate",D,J);for(const R of Te)R.updateGuards.forEach(O=>{W.push(Rn(O,D,J))});return W.push(v),gt(W)}).then(()=>{W=[];for(const R of y)if(R.beforeEnter)if(Mt(R.beforeEnter))for(const O of R.beforeEnter)W.push(Rn(O,D,J));else W.push(Rn(R.beforeEnter,D,J));return W.push(v),gt(W)}).then(()=>(D.matched.forEach(R=>R.enterCallbacks={}),W=Ta(y,"beforeRouteEnter",D,J,w),W.push(v),gt(W))).then(()=>{W=[];for(const R of a.list())W.push(Rn(R,D,J));return W.push(v),gt(W)}).catch(R=>rn(R,8)?R:Promise.reject(R))}function b(D,J,W){l.list().forEach(Y=>w(()=>Y(D,J,W)))}function S(D,J,W,Y,Te){const y=q(D,J);if(y)return y;const v=J===wn,R=Ar?history.state:{};W&&(Y||v?s.replace(D.fullPath,Ie({scroll:v&&R&&R.scroll},Te)):s.push(D.fullPath,Te)),c.value=D,At(D,J,W,v),Pt()}let T;function ut(){T||(T=s.listen((D,J,W)=>{if(!Lt.listening)return;const Y=K(D),Te=fe(Y);if(Te){I(Ie(Te,{replace:!0,force:!0}),Y).catch(Ds);return}h=Y;const y=c.value;Ar&&Av(qu(y.fullPath,W.delta),Co()),A(Y,y).catch(v=>rn(v,12)?v:rn(v,2)?(I(Ie(B(v.to),{force:!0}),Y).then(R=>{rn(R,20)&&!W.delta&&W.type===qs.pop&&s.go(-1,!1)}).catch(Ds),Promise.reject()):(W.delta&&s.go(-W.delta,!1),de(v,Y,y))).then(v=>{v=v||S(Y,y,!1),v&&(W.delta&&!rn(v,8)?s.go(-W.delta,!1):W.type===qs.pop&&rn(v,20)&&s.go(-1,!1)),b(Y,y,v)}).catch(Ds)}))}let It=ys(),Ue=ys(),ge;function de(D,J,W){Pt(D);const Y=Ue.list();return Y.length?Y.forEach(Te=>Te(D,J,W)):console.error(D),Promise.reject(D)}function yt(){return ge&&c.value!==wn?Promise.resolve():new Promise((D,J)=>{It.add([D,J])})}function Pt(D){return ge||(ge=!D,ut(),It.list().forEach(([J,W])=>D?W(D):J()),It.reset()),D}function At(D,J,W,Y){const{scrollBehavior:Te}=n;if(!Ar||!Te)return Promise.resolve();const y=!W&&bv(qu(D.fullPath,0))||(Y||!W)&&history.state&&history.state.scroll||null;return sd().then(()=>Te(D,J,y)).then(v=>v&&Iv(v)).catch(v=>de(v,D,J))}const Ne=D=>s.go(D);let Ve;const _n=new Set,Lt={currentRoute:c,listening:!0,addRoute:E,removeRoute:k,clearRoutes:e.clearRoutes,hasRoute:L,getRoutes:N,resolve:K,options:n,push:z,replace:he,go:Ne,back:()=>Ne(-1),forward:()=>Ne(1),beforeEach:i.add,beforeResolve:a.add,afterEach:l.add,onError:Ue.add,isReady:yt,install(D){const J=this;D.component("RouterLink",Qv),D.component("RouterView",Zv),D.config.globalProperties.$router=J,Object.defineProperty(D.config.globalProperties,"$route",{enumerable:!0,get:()=>Or(c)}),Ar&&!Ve&&c.value===wn&&(Ve=!0,z(s.location).catch(Te=>{}));const W={};for(const Te in wn)Object.defineProperty(W,Te,{get:()=>c.value[Te],enumerable:!0});D.provide(Po,J),D.provide(Xd,Zf(W)),D.provide(Wa,c);const Y=D.unmount;_n.add(D),D.unmount=function(){_n.delete(D),_n.size<1&&(h=wn,T&&T(),T=null,c.value=wn,Ve=!1,ge=!1),Y()}}};function gt(D){return D.reduce((J,W)=>J.then(()=>w(W)),Promise.resolve())}return Lt}function tE(n,e){const t=[],r=[],s=[],i=Math.max(e.matched.length,n.matched.length);for(let a=0;a<i;a++){const l=e.matched[a];l&&(n.matched.find(h=>jr(h,l))?r.push(l):t.push(l));const c=n.matched[a];c&&(e.matched.find(h=>jr(h,c))||s.push(c))}return[t,r,s]}function Yd(){return Kt(Po)}var ih={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},nE=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},ep={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let m=(l&15)<<2|h>>6,E=h&63;c||(E=64,a||(m=64)),r.push(t[d],t[p],t[m],t[E])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Zd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):nE(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new rE;const m=i<<2|l>>4;if(r.push(m),h!==64){const E=l<<4&240|h>>2;if(r.push(E),p!==64){const k=h<<6&192|p;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class rE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const sE=function(n){const e=Zd(n);return ep.encodeByteArray(e,!0)},eo=function(n){return sE(n).replace(/\./g,"")},tp=function(n){try{return ep.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oE=()=>iE().__FIREBASE_DEFAULTS__,aE=()=>{if(typeof process>"u"||typeof ih>"u")return;const n=ih.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},lE=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&tp(n[1]);return e&&JSON.parse(e)},ko=()=>{try{return oE()||aE()||lE()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},np=n=>{var e,t;return(t=(e=ko())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},cE=n=>{const e=np(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},rp=()=>{var n;return(n=ko())===null||n===void 0?void 0:n.config},sp=n=>{var e;return(e=ko())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hE(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[eo(JSON.stringify(t)),eo(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fE(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ct())}function dE(){var n;const e=(n=ko())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function pE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function gE(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function mE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _E(){const n=ct();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function yE(){return!dE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function vE(){try{return typeof indexedDB=="object"}catch{return!1}}function EE(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TE="FirebaseError";class mn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=TE,Object.setPrototypeOf(this,mn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ei.prototype.create)}}class ei{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?wE(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new mn(s,l,r)}}function wE(n,e){return n.replace(IE,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const IE=/\{\$([^}]+)}/g;function AE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function to(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(oh(i)&&oh(a)){if(!to(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function oh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function bE(n,e){const t=new RE(n,e);return t.subscribe.bind(t)}class RE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");SE(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=wa),s.error===void 0&&(s.error=wa),s.complete===void 0&&(s.complete=wa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function SE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function wa(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(n){return n&&n._delegate?n._delegate:n}class fr{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new uE;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(kE(e))try{this.getOrInitializeService({instanceIdentifier:rr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=rr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rr){return this.instances.has(e)}getOptions(e=rr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:PE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=rr){return this.component?this.component.multipleInstances?e:rr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function PE(n){return n===rr?void 0:n}function kE(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new CE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pe;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(pe||(pe={}));const OE={debug:pe.DEBUG,verbose:pe.VERBOSE,info:pe.INFO,warn:pe.WARN,error:pe.ERROR,silent:pe.SILENT},NE=pe.INFO,VE={[pe.DEBUG]:"log",[pe.VERBOSE]:"log",[pe.INFO]:"info",[pe.WARN]:"warn",[pe.ERROR]:"error"},xE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=VE[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bl{constructor(e){this.name=e,this._logLevel=NE,this._logHandler=xE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in pe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?OE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,pe.DEBUG,...e),this._logHandler(this,pe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,pe.VERBOSE,...e),this._logHandler(this,pe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,pe.INFO,...e),this._logHandler(this,pe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,pe.WARN,...e),this._logHandler(this,pe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,pe.ERROR,...e),this._logHandler(this,pe.ERROR,...e)}}const ME=(n,e)=>e.some(t=>n instanceof t);let ah,lh;function LE(){return ah||(ah=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function FE(){return lh||(lh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ip=new WeakMap,Qa=new WeakMap,op=new WeakMap,Ia=new WeakMap,jl=new WeakMap;function UE(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Vn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&ip.set(t,n)}).catch(()=>{}),jl.set(e,n),e}function BE(n){if(Qa.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Qa.set(n,e)}let Ja={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Qa.get(n);if(e==="objectStoreNames")return n.objectStoreNames||op.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Vn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jE(n){Ja=n(Ja)}function $E(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Aa(this),e,...t);return op.set(r,e.sort?e.sort():[e]),Vn(r)}:FE().includes(n)?function(...e){return n.apply(Aa(this),e),Vn(ip.get(this))}:function(...e){return Vn(n.apply(Aa(this),e))}}function HE(n){return typeof n=="function"?$E(n):(n instanceof IDBTransaction&&BE(n),ME(n,LE())?new Proxy(n,Ja):n)}function Vn(n){if(n instanceof IDBRequest)return UE(n);if(Ia.has(n))return Ia.get(n);const e=HE(n);return e!==n&&(Ia.set(n,e),jl.set(e,n)),e}const Aa=n=>jl.get(n);function qE(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=Vn(a);return r&&a.addEventListener("upgradeneeded",c=>{r(Vn(a.result),c.oldVersion,c.newVersion,Vn(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const zE=["get","getKey","getAll","getAllKeys","count"],KE=["put","add","delete","clear"],ba=new Map;function ch(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ba.get(e))return ba.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=KE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||zE.includes(t)))return;const i=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&c.done]))[0]};return ba.set(e,i),i}jE(n=>({...n,get:(e,t,r)=>ch(e,t)||n.get(e,t,r),has:(e,t)=>!!ch(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(WE(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function WE(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Xa="@firebase/app",uh="0.11.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=new Bl("@firebase/app"),QE="@firebase/app-compat",JE="@firebase/analytics-compat",XE="@firebase/analytics",YE="@firebase/app-check-compat",ZE="@firebase/app-check",eT="@firebase/auth",tT="@firebase/auth-compat",nT="@firebase/database",rT="@firebase/data-connect",sT="@firebase/database-compat",iT="@firebase/functions",oT="@firebase/functions-compat",aT="@firebase/installations",lT="@firebase/installations-compat",cT="@firebase/messaging",uT="@firebase/messaging-compat",hT="@firebase/performance",fT="@firebase/performance-compat",dT="@firebase/remote-config",pT="@firebase/remote-config-compat",gT="@firebase/storage",mT="@firebase/storage-compat",_T="@firebase/firestore",yT="@firebase/vertexai",vT="@firebase/firestore-compat",ET="firebase",TT="11.3.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya="[DEFAULT]",wT={[Xa]:"fire-core",[QE]:"fire-core-compat",[XE]:"fire-analytics",[JE]:"fire-analytics-compat",[ZE]:"fire-app-check",[YE]:"fire-app-check-compat",[eT]:"fire-auth",[tT]:"fire-auth-compat",[nT]:"fire-rtdb",[rT]:"fire-data-connect",[sT]:"fire-rtdb-compat",[iT]:"fire-fn",[oT]:"fire-fn-compat",[aT]:"fire-iid",[lT]:"fire-iid-compat",[cT]:"fire-fcm",[uT]:"fire-fcm-compat",[hT]:"fire-perf",[fT]:"fire-perf-compat",[dT]:"fire-rc",[pT]:"fire-rc-compat",[gT]:"fire-gcs",[mT]:"fire-gcs-compat",[_T]:"fire-fst",[vT]:"fire-fst-compat",[yT]:"fire-vertex","fire-js":"fire-js",[ET]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no=new Map,IT=new Map,Za=new Map;function hh(n,e){try{n.container.addComponent(e)}catch(t){fn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Hr(n){const e=n.name;if(Za.has(e))return fn.debug(`There were multiple attempts to register component ${e}.`),!1;Za.set(e,n);for(const t of no.values())hh(t,n);for(const t of IT.values())hh(t,n);return!0}function $l(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ot(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xn=new ei("app","Firebase",AT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new fr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr=TT;function ap(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ya,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw xn.create("bad-app-name",{appName:String(s)});if(t||(t=rp()),!t)throw xn.create("no-options");const i=no.get(s);if(i){if(to(t,i.options)&&to(r,i.config))return i;throw xn.create("duplicate-app",{appName:s})}const a=new DE(s);for(const c of Za.values())a.addComponent(c);const l=new bT(t,r,a);return no.set(s,l),l}function lp(n=Ya){const e=no.get(n);if(!e&&n===Ya&&rp())return ap();if(!e)throw xn.create("no-app",{appName:n});return e}function Mn(n,e,t){var r;let s=(r=wT[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),fn.warn(l.join(" "));return}Hr(new fr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RT="firebase-heartbeat-database",ST=1,zs="firebase-heartbeat-store";let Ra=null;function cp(){return Ra||(Ra=qE(RT,ST,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(zs)}catch(t){console.warn(t)}}}}).catch(n=>{throw xn.create("idb-open",{originalErrorMessage:n.message})})),Ra}async function CT(n){try{const t=(await cp()).transaction(zs),r=await t.objectStore(zs).get(up(n));return await t.done,r}catch(e){if(e instanceof mn)fn.warn(e.message);else{const t=xn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});fn.warn(t.message)}}}async function fh(n,e){try{const r=(await cp()).transaction(zs,"readwrite");await r.objectStore(zs).put(e,up(n)),await r.done}catch(t){if(t instanceof mn)fn.warn(t.message);else{const r=xn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});fn.warn(r.message)}}}function up(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PT=1024,kT=30;class DT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new NT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=dh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>kT){const a=VT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){fn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=dh(),{heartbeatsToSend:r,unsentEntries:s}=OT(this._heartbeatsCache.heartbeats),i=eo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return fn.warn(t),""}}}function dh(){return new Date().toISOString().substring(0,10)}function OT(n,e=PT){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),ph(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ph(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class NT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vE()?EE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await CT(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return fh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return fh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ph(n){return eo(JSON.stringify({version:2,heartbeats:n})).length}function VT(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xT(n){Hr(new fr("platform-logger",e=>new GE(e),"PRIVATE")),Hr(new fr("heartbeat",e=>new DT(e),"PRIVATE")),Mn(Xa,uh,n),Mn(Xa,uh,"esm2017"),Mn("fire-js","")}xT("");var MT="firebase",LT="11.3.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mn(MT,LT,"app");function Hl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function hp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const FT=hp,fp=new ei("auth","Firebase",hp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ro=new Bl("@firebase/auth");function UT(n,...e){ro.logLevel<=pe.WARN&&ro.warn(`Auth (${Yr}): ${n}`,...e)}function Fi(n,...e){ro.logLevel<=pe.ERROR&&ro.error(`Auth (${Yr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(n,...e){throw zl(n,...e)}function xt(n,...e){return zl(n,...e)}function ql(n,e,t){const r=Object.assign(Object.assign({},FT()),{[e]:t});return new ei("auth","Firebase",r).create(e,{appName:n.name})}function lr(n){return ql(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function BT(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Xt(n,"argument-error"),ql(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function zl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return fp.create(n,...e)}function ie(n,e,...t){if(!n)throw zl(e,...t)}function cn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Fi(e),new Error(e)}function dn(n,e){n||cn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function jT(){return gh()==="http:"||gh()==="https:"}function gh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $T(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(jT()||gE()||"connection"in navigator)?navigator.onLine:!0}function HT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t){this.shortDelay=e,this.longDelay=t,dn(t>e,"Short delay should be less than long delay!"),this.isMobile=fE()||mE()}get(){return $T()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(n,e){dn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;cn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;cn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;cn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zT=new ni(3e4,6e4);function Gl(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Zr(n,e,t,r,s={}){return pp(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=ti(Object.assign({key:n.config.apiKey},a)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:c},i);return pE()||(h.referrerPolicy="no-referrer"),dp.fetch()(gp(n,n.config.apiHost,t,l),h)})}async function pp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},qT),e);try{const s=new GT(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Ci(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ci(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw Ci(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw Ci(n,"user-disabled",a);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw ql(n,d,h);Xt(n,d)}}catch(s){if(s instanceof mn)throw s;Xt(n,"network-request-failed",{message:String(s)})}}async function KT(n,e,t,r,s={}){const i=await Zr(n,e,t,r,s);return"mfaPendingCredential"in i&&Xt(n,"multi-factor-auth-required",{_serverResponse:i}),i}function gp(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Kl(n.config,s):`${n.config.apiScheme}://${s}`}class GT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(xt(this.auth,"network-request-failed")),zT.get())})}}function Ci(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=xt(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WT(n,e){return Zr(n,"POST","/v1/accounts:delete",e)}async function mp(n,e){return Zr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ns(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function QT(n,e=!1){const t=Qn(n),r=await t.getIdToken(e),s=Wl(r);ie(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ns(Sa(s.auth_time)),issuedAtTime:Ns(Sa(s.iat)),expirationTime:Ns(Sa(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Sa(n){return Number(n)*1e3}function Wl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Fi("JWT malformed, contained fewer than 3 sections"),null;try{const s=tp(t);return s?JSON.parse(s):(Fi("Failed to decode base64 JWT payload"),null)}catch(s){return Fi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function mh(n){const e=Wl(n);return ie(e,"internal-error"),ie(typeof e.exp<"u","internal-error"),ie(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ks(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof mn&&JT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function JT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ns(this.lastLoginAt),this.creationTime=Ns(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function so(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ks(n,mp(t,{idToken:r}));ie(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?_p(i.providerUserInfo):[],l=ZT(n.providerData,a),c=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(l!=null&&l.length),d=c?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new tl(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function YT(n){const e=Qn(n);await so(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ZT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function _p(n){return n.map(e=>{var{providerId:t}=e,r=Hl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ew(n,e){const t=await pp(n,{},async()=>{const r=ti({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=gp(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",dp.fetch()(a,{method:"POST",headers:l,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function tw(n,e){return Zr(n,"POST","/v2/accounts:revokeToken",Gl(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ie(e.idToken,"internal-error"),ie(typeof e.idToken<"u","internal-error"),ie(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):mh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ie(e.length!==0,"internal-error");const t=mh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ie(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await ew(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new xr;return r&&(ie(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(ie(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(ie(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new xr,this.toJSON())}_performRefresh(){return cn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(n,e){ie(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class un{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Hl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new XT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new tl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ks(this,this.stsTokenManager.getToken(this.auth,e));return ie(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return QT(this,e)}reload(){return YT(this)}_assign(e){this!==e&&(ie(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new un(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ie(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await so(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ot(this.auth.app))return Promise.reject(lr(this.auth));const e=await this.getIdToken();return await Ks(this,WT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,l,c,h,d;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,m=(s=t.email)!==null&&s!==void 0?s:void 0,E=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,N=(l=t.tenantId)!==null&&l!==void 0?l:void 0,L=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,K=(h=t.createdAt)!==null&&h!==void 0?h:void 0,B=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:q,emailVerified:z,isAnonymous:he,providerData:fe,stsTokenManager:I}=t;ie(q&&I,e,"internal-error");const _=xr.fromJSON(this.name,I);ie(typeof q=="string",e,"internal-error"),In(p,e.name),In(m,e.name),ie(typeof z=="boolean",e,"internal-error"),ie(typeof he=="boolean",e,"internal-error"),In(E,e.name),In(k,e.name),In(N,e.name),In(L,e.name),In(K,e.name),In(B,e.name);const w=new un({uid:q,auth:e,email:m,emailVerified:z,displayName:p,isAnonymous:he,photoURL:k,phoneNumber:E,tenantId:N,stsTokenManager:_,createdAt:K,lastLoginAt:B});return fe&&Array.isArray(fe)&&(w.providerData=fe.map(A=>Object.assign({},A))),L&&(w._redirectEventId=L),w}static async _fromIdTokenResponse(e,t,r=!1){const s=new xr;s.updateFromServerResponse(t);const i=new un({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await so(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];ie(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?_p(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new xr;l.updateFromIdToken(r);const c=new un({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new tl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h=new Map;function hn(n){dn(n instanceof Function,"Expected a class definition");let e=_h.get(n);return e?(dn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,_h.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}yp.type="NONE";const yh=yp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ui(n,e,t){return`firebase:${n}:${e}:${t}`}class Mr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ui(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ui("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?un._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Mr(hn(yh),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||hn(yh);const a=Ui(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const d=await h._get(a);if(d){const p=un._fromJSON(e,d);h!==i&&(l=p),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Mr(i,e,r):(i=c[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Mr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(wp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(vp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ap(e))return"Blackberry";if(bp(e))return"Webos";if(Ep(e))return"Safari";if((e.includes("chrome/")||Tp(e))&&!e.includes("edge/"))return"Chrome";if(Ip(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function vp(n=ct()){return/firefox\//i.test(n)}function Ep(n=ct()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Tp(n=ct()){return/crios\//i.test(n)}function wp(n=ct()){return/iemobile/i.test(n)}function Ip(n=ct()){return/android/i.test(n)}function Ap(n=ct()){return/blackberry/i.test(n)}function bp(n=ct()){return/webos/i.test(n)}function Ql(n=ct()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function nw(n=ct()){var e;return Ql(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function rw(){return _E()&&document.documentMode===10}function Rp(n=ct()){return Ql(n)||Ip(n)||bp(n)||Ap(n)||/windows phone/i.test(n)||wp(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sp(n,e=[]){let t;switch(n){case"Browser":t=vh(ct());break;case"Worker":t=`${vh(ct())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Yr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const c=e(i);a(c)}catch(c){l(c)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iw(n,e={}){return Zr(n,"GET","/v2/passwordPolicy",Gl(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ow=6;class aw{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:ow,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(a=c.containsNumericCharacter)!==null&&a!==void 0?a:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Eh(this),this.idTokenSubscription=new Eh(this),this.beforeStateQueue=new sw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=fp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=hn(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Mr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await mp(this,{idToken:e}),r=await un._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ot(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===l)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ie(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await so(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=HT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ot(this.app))return Promise.reject(lr(this));const t=e?Qn(e):null;return t&&ie(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ie(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ot(this.app)?Promise.reject(lr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ot(this.app)?Promise.reject(lr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(hn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await iw(this),t=new aw(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ei("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await tw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&hn(e)||this._popupRedirectResolver;ie(t,this,"argument-error"),this.redirectPersistenceManager=await Mr.create(this,[hn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(ie(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,s);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ie(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Sp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Ot(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&UT(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Do(n){return Qn(n)}class Eh{constructor(e){this.auth=e,this.observer=null,this.addObserver=bE(t=>this.observer=t)}get next(){return ie(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function cw(n){Jl=n}function uw(n){return Jl.loadJS(n)}function hw(){return Jl.gapiScript}function fw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dw(n,e){const t=$l(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(to(i,e??{}))return s;Xt(s,"already-initialized")}return t.initialize({options:e})}function pw(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(hn);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function gw(n,e,t){const r=Do(n);ie(r._canInitEmulator,r,"emulator-config-failed"),ie(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Cp(e),{host:a,port:l}=mw(e),c=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${a}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),_w()}function Cp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function mw(n){const e=Cp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Th(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Th(a)}}}function Th(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function _w(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return cn("not implemented")}_getIdTokenResponse(e){return cn("not implemented")}_linkToIdToken(e,t){return cn("not implemented")}_getReauthenticationResolver(e){return cn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lr(n,e){return KT(n,"POST","/v1/accounts:signInWithIdp",Gl(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yw="http://localhost";class dr extends Pp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new dr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Xt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Hl(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new dr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Lr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Lr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Lr(e,t)}buildRequest(){const e={requestUri:yw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ti(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri extends Xl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn extends ri{constructor(){super("facebook.com")}static credential(e){return dr._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Cn.credentialFromTaggedObject(e)}static credentialFromError(e){return Cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Cn.credential(e.oauthAccessToken)}catch{return null}}}Cn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Cn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln extends ri{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return dr._fromParams({providerId:ln.PROVIDER_ID,signInMethod:ln.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ln.credentialFromTaggedObject(e)}static credentialFromError(e){return ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ln.credential(t,r)}catch{return null}}}ln.GOOGLE_SIGN_IN_METHOD="google.com";ln.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn extends ri{constructor(){super("github.com")}static credential(e){return dr._fromParams({providerId:Pn.PROVIDER_ID,signInMethod:Pn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pn.credentialFromTaggedObject(e)}static credentialFromError(e){return Pn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pn.credential(e.oauthAccessToken)}catch{return null}}}Pn.GITHUB_SIGN_IN_METHOD="github.com";Pn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn extends ri{constructor(){super("twitter.com")}static credential(e,t){return dr._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return kn.credential(t,r)}catch{return null}}}kn.TWITTER_SIGN_IN_METHOD="twitter.com";kn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await un._fromIdTokenResponse(e,r,s),a=wh(r);return new qr({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=wh(r);return new qr({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function wh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io extends mn{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,io.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new io(e,t,r,s)}}function kp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?io._fromErrorAndOperation(n,i,e,r):i})}async function vw(n,e,t=!1){const r=await Ks(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return qr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ew(n,e,t=!1){const{auth:r}=n;if(Ot(r.app))return Promise.reject(lr(r));const s="reauthenticate";try{const i=await Ks(n,kp(r,s,e,n),t);ie(i.idToken,r,"internal-error");const a=Wl(i.idToken);ie(a,r,"internal-error");const{sub:l}=a;return ie(n.uid===l,r,"user-mismatch"),qr._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Xt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tw(n,e,t=!1){if(Ot(n.app))return Promise.reject(lr(n));const r="signIn",s=await kp(n,r,e),i=await qr._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function ww(n,e,t,r){return Qn(n).onIdTokenChanged(e,t,r)}function Iw(n,e,t){return Qn(n).beforeAuthStateChanged(e,t)}const oo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(oo,"1"),this.storage.removeItem(oo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aw=1e3,bw=10;class Op extends Dp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Rp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);rw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,bw):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Aw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Op.type="LOCAL";const Rw=Op;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np extends Dp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Np.type="SESSION";const Vp=Np;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Oo(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async h=>h(t.origin,i)),c=await Sw(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Oo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,c)=>{const h=Yl("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(m.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(){return window}function Pw(n){Gt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xp(){return typeof Gt().WorkerGlobalScope<"u"&&typeof Gt().importScripts=="function"}async function kw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Dw(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Ow(){return xp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp="firebaseLocalStorageDb",Nw=1,ao="firebaseLocalStorage",Lp="fbase_key";class si{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function No(n,e){return n.transaction([ao],e?"readwrite":"readonly").objectStore(ao)}function Vw(){const n=indexedDB.deleteDatabase(Mp);return new si(n).toPromise()}function nl(){const n=indexedDB.open(Mp,Nw);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ao,{keyPath:Lp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ao)?e(r):(r.close(),await Vw(),e(await nl()))})})}async function Ih(n,e,t){const r=No(n,!0).put({[Lp]:e,value:t});return new si(r).toPromise()}async function xw(n,e){const t=No(n,!1).get(e),r=await new si(t).toPromise();return r===void 0?null:r.value}function Ah(n,e){const t=No(n,!0).delete(e);return new si(t).toPromise()}const Mw=800,Lw=3;class Fp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await nl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Lw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return xp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oo._getInstance(Ow()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await kw(),!this.activeServiceWorker)return;this.sender=new Cw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Dw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await nl();return await Ih(e,oo,"1"),await Ah(e,oo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ih(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>xw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ah(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=No(s,!1).getAll();return new si(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Mw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Fp.type="LOCAL";const Fw=Fp;new ni(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(n,e){return e?hn(e):(ie(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl extends Pp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Lr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Lr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Lr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Uw(n){return Tw(n.auth,new Zl(n),n.bypassAuthState)}function Bw(n){const{auth:e,user:t}=n;return ie(t,e,"internal-error"),Ew(t,new Zl(n),n.bypassAuthState)}async function jw(n){const{auth:e,user:t}=n;return ie(t,e,"internal-error"),vw(t,new Zl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Uw;case"linkViaPopup":case"linkViaRedirect":return jw;case"reauthViaPopup":case"reauthViaRedirect":return Bw;default:Xt(this.auth,"internal-error")}}resolve(e){dn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){dn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $w=new ni(2e3,1e4);async function Hw(n,e,t){if(Ot(n.app))return Promise.reject(xt(n,"operation-not-supported-in-this-environment"));const r=Do(n);BT(n,e,Xl);const s=Up(r,t);return new ir(r,"signInViaPopup",e,s).executeNotNull()}class ir extends Bp{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ir.currentPopupAction&&ir.currentPopupAction.cancel(),ir.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ie(e,this.auth,"internal-error"),e}async onExecution(){dn(this.filter.length===1,"Popup operations only handle one event");const e=Yl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(xt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(xt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ir.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(xt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,$w.get())};e()}}ir.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qw="pendingRedirect",Bi=new Map;class zw extends Bp{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Bi.get(this.auth._key());if(!e){try{const r=await Kw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Bi.set(this.auth._key(),e)}return this.bypassAuthState||Bi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Kw(n,e){const t=Qw(e),r=Ww(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Gw(n,e){Bi.set(n._key(),e)}function Ww(n){return hn(n._redirectPersistence)}function Qw(n){return Ui(qw,n.config.apiKey,n.name)}async function Jw(n,e,t=!1){if(Ot(n.app))return Promise.reject(lr(n));const r=Do(n),s=Up(r,e),a=await new zw(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xw=10*60*1e3;class Yw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Zw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!jp(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(xt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Xw&&this.cachedEventUids.clear(),this.cachedEventUids.has(bh(e))}saveEventToCache(e){this.cachedEventUids.add(bh(e)),this.lastProcessedEventTime=Date.now()}}function bh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function jp({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Zw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return jp(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eI(n,e={}){return Zr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,nI=/^https?/;async function rI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await eI(n);for(const t of e)try{if(sI(t))return}catch{}Xt(n,"unauthorized-domain")}function sI(n){const e=el(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!nI.test(t))return!1;if(tI.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iI=new ni(3e4,6e4);function Rh(){const n=Gt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function oI(n){return new Promise((e,t)=>{var r,s,i;function a(){Rh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Rh(),t(xt(n,"network-request-failed"))},timeout:iI.get()})}if(!((s=(r=Gt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Gt().gapi)===null||i===void 0)&&i.load)a();else{const l=fw("iframefcb");return Gt()[l]=()=>{gapi.load?a():t(xt(n,"network-request-failed"))},uw(`${hw()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw ji=null,e})}let ji=null;function aI(n){return ji=ji||oI(n),ji}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI=new ni(5e3,15e3),cI="__/auth/iframe",uI="emulator/auth/iframe",hI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},fI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function dI(n){const e=n.config;ie(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Kl(e,uI):`https://${n.config.authDomain}/${cI}`,r={apiKey:e.apiKey,appName:n.name,v:Yr},s=fI.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ti(r).slice(1)}`}async function pI(n){const e=await aI(n),t=Gt().gapi;return ie(t,n,"internal-error"),e.open({where:document.body,url:dI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:hI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=xt(n,"network-request-failed"),l=Gt().setTimeout(()=>{i(a)},lI.get());function c(){Gt().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},mI=500,_I=600,yI="_blank",vI="http://localhost";class Sh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function EI(n,e,t,r=mI,s=_I){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},gI),{width:r.toString(),height:s.toString(),top:i,left:a}),h=ct().toLowerCase();t&&(l=Tp(h)?yI:t),vp(h)&&(e=e||vI,c.scrollbars="yes");const d=Object.entries(c).reduce((m,[E,k])=>`${m}${E}=${k},`,"");if(nw(h)&&l!=="_self")return TI(e||"",l),new Sh(null);const p=window.open(e||"",l,d);ie(p,n,"popup-blocked");try{p.focus()}catch{}return new Sh(p)}function TI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wI="__/auth/handler",II="emulator/auth/handler",AI=encodeURIComponent("fac");async function Ch(n,e,t,r,s,i){ie(n.config.authDomain,n,"auth-domain-config-required"),ie(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Yr,eventId:s};if(e instanceof Xl){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",AE(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))a[d]=p}if(e instanceof ri){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(a.scopes=d.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await n._getAppCheckToken(),h=c?`#${AI}=${encodeURIComponent(c)}`:"";return`${bI(n)}?${ti(l).slice(1)}${h}`}function bI({config:n}){return n.emulator?Kl(n,II):`https://${n.authDomain}/${wI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca="webStorageSupport";class RI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Vp,this._completeRedirectFn=Jw,this._overrideRedirectResult=Gw}async _openPopup(e,t,r,s){var i;dn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await Ch(e,t,r,el(),s);return EI(e,a,Yl())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Ch(e,t,r,el(),s);return Pw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(dn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await pI(e),r=new Yw(e);return t.register("authEvent",s=>(ie(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ca,{type:Ca},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Ca];a!==void 0&&t(!!a),Xt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=rI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Rp()||Ep()||Ql()}}const SI=RI;var Ph="@firebase/auth",kh="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ie(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function kI(n){Hr(new fr("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;ie(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Sp(n)},h=new lw(r,s,i,c);return pw(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Hr(new fr("auth-internal",e=>{const t=Do(e.getProvider("auth").getImmediate());return(r=>new CI(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Mn(Ph,kh,PI(n)),Mn(Ph,kh,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI=5*60,OI=sp("authIdTokenMaxAge")||DI;let Dh=null;const NI=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>OI)return;const s=t==null?void 0:t.token;Dh!==s&&(Dh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function VI(n=lp()){const e=$l(n,"auth");if(e.isInitialized())return e.getImmediate();const t=dw(n,{popupRedirectResolver:SI,persistence:[Fw,Rw,Vp]}),r=sp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=NI(i.toString());Iw(t,a,()=>a(t.currentUser)),ww(t,l=>a(l))}}const s=np("auth");return s&&gw(t,`http://${s}`),t}function xI(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}cw({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=xt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",xI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});kI("Browser");var Oh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ln,$p;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,_){function w(){}w.prototype=_.prototype,I.D=_.prototype,I.prototype=new w,I.prototype.constructor=I,I.C=function(A,b,S){for(var T=Array(arguments.length-2),ut=2;ut<arguments.length;ut++)T[ut-2]=arguments[ut];return _.prototype[b].apply(A,T)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,_,w){w||(w=0);var A=Array(16);if(typeof _=="string")for(var b=0;16>b;++b)A[b]=_.charCodeAt(w++)|_.charCodeAt(w++)<<8|_.charCodeAt(w++)<<16|_.charCodeAt(w++)<<24;else for(b=0;16>b;++b)A[b]=_[w++]|_[w++]<<8|_[w++]<<16|_[w++]<<24;_=I.g[0],w=I.g[1],b=I.g[2];var S=I.g[3],T=_+(S^w&(b^S))+A[0]+3614090360&4294967295;_=w+(T<<7&4294967295|T>>>25),T=S+(b^_&(w^b))+A[1]+3905402710&4294967295,S=_+(T<<12&4294967295|T>>>20),T=b+(w^S&(_^w))+A[2]+606105819&4294967295,b=S+(T<<17&4294967295|T>>>15),T=w+(_^b&(S^_))+A[3]+3250441966&4294967295,w=b+(T<<22&4294967295|T>>>10),T=_+(S^w&(b^S))+A[4]+4118548399&4294967295,_=w+(T<<7&4294967295|T>>>25),T=S+(b^_&(w^b))+A[5]+1200080426&4294967295,S=_+(T<<12&4294967295|T>>>20),T=b+(w^S&(_^w))+A[6]+2821735955&4294967295,b=S+(T<<17&4294967295|T>>>15),T=w+(_^b&(S^_))+A[7]+4249261313&4294967295,w=b+(T<<22&4294967295|T>>>10),T=_+(S^w&(b^S))+A[8]+1770035416&4294967295,_=w+(T<<7&4294967295|T>>>25),T=S+(b^_&(w^b))+A[9]+2336552879&4294967295,S=_+(T<<12&4294967295|T>>>20),T=b+(w^S&(_^w))+A[10]+4294925233&4294967295,b=S+(T<<17&4294967295|T>>>15),T=w+(_^b&(S^_))+A[11]+2304563134&4294967295,w=b+(T<<22&4294967295|T>>>10),T=_+(S^w&(b^S))+A[12]+1804603682&4294967295,_=w+(T<<7&4294967295|T>>>25),T=S+(b^_&(w^b))+A[13]+4254626195&4294967295,S=_+(T<<12&4294967295|T>>>20),T=b+(w^S&(_^w))+A[14]+2792965006&4294967295,b=S+(T<<17&4294967295|T>>>15),T=w+(_^b&(S^_))+A[15]+1236535329&4294967295,w=b+(T<<22&4294967295|T>>>10),T=_+(b^S&(w^b))+A[1]+4129170786&4294967295,_=w+(T<<5&4294967295|T>>>27),T=S+(w^b&(_^w))+A[6]+3225465664&4294967295,S=_+(T<<9&4294967295|T>>>23),T=b+(_^w&(S^_))+A[11]+643717713&4294967295,b=S+(T<<14&4294967295|T>>>18),T=w+(S^_&(b^S))+A[0]+3921069994&4294967295,w=b+(T<<20&4294967295|T>>>12),T=_+(b^S&(w^b))+A[5]+3593408605&4294967295,_=w+(T<<5&4294967295|T>>>27),T=S+(w^b&(_^w))+A[10]+38016083&4294967295,S=_+(T<<9&4294967295|T>>>23),T=b+(_^w&(S^_))+A[15]+3634488961&4294967295,b=S+(T<<14&4294967295|T>>>18),T=w+(S^_&(b^S))+A[4]+3889429448&4294967295,w=b+(T<<20&4294967295|T>>>12),T=_+(b^S&(w^b))+A[9]+568446438&4294967295,_=w+(T<<5&4294967295|T>>>27),T=S+(w^b&(_^w))+A[14]+3275163606&4294967295,S=_+(T<<9&4294967295|T>>>23),T=b+(_^w&(S^_))+A[3]+4107603335&4294967295,b=S+(T<<14&4294967295|T>>>18),T=w+(S^_&(b^S))+A[8]+1163531501&4294967295,w=b+(T<<20&4294967295|T>>>12),T=_+(b^S&(w^b))+A[13]+2850285829&4294967295,_=w+(T<<5&4294967295|T>>>27),T=S+(w^b&(_^w))+A[2]+4243563512&4294967295,S=_+(T<<9&4294967295|T>>>23),T=b+(_^w&(S^_))+A[7]+1735328473&4294967295,b=S+(T<<14&4294967295|T>>>18),T=w+(S^_&(b^S))+A[12]+2368359562&4294967295,w=b+(T<<20&4294967295|T>>>12),T=_+(w^b^S)+A[5]+4294588738&4294967295,_=w+(T<<4&4294967295|T>>>28),T=S+(_^w^b)+A[8]+2272392833&4294967295,S=_+(T<<11&4294967295|T>>>21),T=b+(S^_^w)+A[11]+1839030562&4294967295,b=S+(T<<16&4294967295|T>>>16),T=w+(b^S^_)+A[14]+4259657740&4294967295,w=b+(T<<23&4294967295|T>>>9),T=_+(w^b^S)+A[1]+2763975236&4294967295,_=w+(T<<4&4294967295|T>>>28),T=S+(_^w^b)+A[4]+1272893353&4294967295,S=_+(T<<11&4294967295|T>>>21),T=b+(S^_^w)+A[7]+4139469664&4294967295,b=S+(T<<16&4294967295|T>>>16),T=w+(b^S^_)+A[10]+3200236656&4294967295,w=b+(T<<23&4294967295|T>>>9),T=_+(w^b^S)+A[13]+681279174&4294967295,_=w+(T<<4&4294967295|T>>>28),T=S+(_^w^b)+A[0]+3936430074&4294967295,S=_+(T<<11&4294967295|T>>>21),T=b+(S^_^w)+A[3]+3572445317&4294967295,b=S+(T<<16&4294967295|T>>>16),T=w+(b^S^_)+A[6]+76029189&4294967295,w=b+(T<<23&4294967295|T>>>9),T=_+(w^b^S)+A[9]+3654602809&4294967295,_=w+(T<<4&4294967295|T>>>28),T=S+(_^w^b)+A[12]+3873151461&4294967295,S=_+(T<<11&4294967295|T>>>21),T=b+(S^_^w)+A[15]+530742520&4294967295,b=S+(T<<16&4294967295|T>>>16),T=w+(b^S^_)+A[2]+3299628645&4294967295,w=b+(T<<23&4294967295|T>>>9),T=_+(b^(w|~S))+A[0]+4096336452&4294967295,_=w+(T<<6&4294967295|T>>>26),T=S+(w^(_|~b))+A[7]+1126891415&4294967295,S=_+(T<<10&4294967295|T>>>22),T=b+(_^(S|~w))+A[14]+2878612391&4294967295,b=S+(T<<15&4294967295|T>>>17),T=w+(S^(b|~_))+A[5]+4237533241&4294967295,w=b+(T<<21&4294967295|T>>>11),T=_+(b^(w|~S))+A[12]+1700485571&4294967295,_=w+(T<<6&4294967295|T>>>26),T=S+(w^(_|~b))+A[3]+2399980690&4294967295,S=_+(T<<10&4294967295|T>>>22),T=b+(_^(S|~w))+A[10]+4293915773&4294967295,b=S+(T<<15&4294967295|T>>>17),T=w+(S^(b|~_))+A[1]+2240044497&4294967295,w=b+(T<<21&4294967295|T>>>11),T=_+(b^(w|~S))+A[8]+1873313359&4294967295,_=w+(T<<6&4294967295|T>>>26),T=S+(w^(_|~b))+A[15]+4264355552&4294967295,S=_+(T<<10&4294967295|T>>>22),T=b+(_^(S|~w))+A[6]+2734768916&4294967295,b=S+(T<<15&4294967295|T>>>17),T=w+(S^(b|~_))+A[13]+1309151649&4294967295,w=b+(T<<21&4294967295|T>>>11),T=_+(b^(w|~S))+A[4]+4149444226&4294967295,_=w+(T<<6&4294967295|T>>>26),T=S+(w^(_|~b))+A[11]+3174756917&4294967295,S=_+(T<<10&4294967295|T>>>22),T=b+(_^(S|~w))+A[2]+718787259&4294967295,b=S+(T<<15&4294967295|T>>>17),T=w+(S^(b|~_))+A[9]+3951481745&4294967295,I.g[0]=I.g[0]+_&4294967295,I.g[1]=I.g[1]+(b+(T<<21&4294967295|T>>>11))&4294967295,I.g[2]=I.g[2]+b&4294967295,I.g[3]=I.g[3]+S&4294967295}r.prototype.u=function(I,_){_===void 0&&(_=I.length);for(var w=_-this.blockSize,A=this.B,b=this.h,S=0;S<_;){if(b==0)for(;S<=w;)s(this,I,S),S+=this.blockSize;if(typeof I=="string"){for(;S<_;)if(A[b++]=I.charCodeAt(S++),b==this.blockSize){s(this,A),b=0;break}}else for(;S<_;)if(A[b++]=I[S++],b==this.blockSize){s(this,A),b=0;break}}this.h=b,this.o+=_},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var _=1;_<I.length-8;++_)I[_]=0;var w=8*this.o;for(_=I.length-8;_<I.length;++_)I[_]=w&255,w/=256;for(this.u(I),I=Array(16),_=w=0;4>_;++_)for(var A=0;32>A;A+=8)I[w++]=this.g[_]>>>A&255;return I};function i(I,_){var w=l;return Object.prototype.hasOwnProperty.call(w,I)?w[I]:w[I]=_(I)}function a(I,_){this.h=_;for(var w=[],A=!0,b=I.length-1;0<=b;b--){var S=I[b]|0;A&&S==_||(w[b]=S,A=!1)}this.g=w}var l={};function c(I){return-128<=I&&128>I?i(I,function(_){return new a([_|0],0>_?-1:0)}):new a([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return L(h(-I));for(var _=[],w=1,A=0;I>=w;A++)_[A]=I/w|0,w*=4294967296;return new a(_,0)}function d(I,_){if(I.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(I.charAt(0)=="-")return L(d(I.substring(1),_));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(_,8)),A=p,b=0;b<I.length;b+=8){var S=Math.min(8,I.length-b),T=parseInt(I.substring(b,b+S),_);8>S?(S=h(Math.pow(_,S)),A=A.j(S).add(h(T))):(A=A.j(w),A=A.add(h(T)))}return A}var p=c(0),m=c(1),E=c(16777216);n=a.prototype,n.m=function(){if(N(this))return-L(this).m();for(var I=0,_=1,w=0;w<this.g.length;w++){var A=this.i(w);I+=(0<=A?A:4294967296+A)*_,_*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(k(this))return"0";if(N(this))return"-"+L(this).toString(I);for(var _=h(Math.pow(I,6)),w=this,A="";;){var b=z(w,_).g;w=K(w,b.j(_));var S=((0<w.g.length?w.g[0]:w.h)>>>0).toString(I);if(w=b,k(w))return S+A;for(;6>S.length;)S="0"+S;A=S+A}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function k(I){if(I.h!=0)return!1;for(var _=0;_<I.g.length;_++)if(I.g[_]!=0)return!1;return!0}function N(I){return I.h==-1}n.l=function(I){return I=K(this,I),N(I)?-1:k(I)?0:1};function L(I){for(var _=I.g.length,w=[],A=0;A<_;A++)w[A]=~I.g[A];return new a(w,~I.h).add(m)}n.abs=function(){return N(this)?L(this):this},n.add=function(I){for(var _=Math.max(this.g.length,I.g.length),w=[],A=0,b=0;b<=_;b++){var S=A+(this.i(b)&65535)+(I.i(b)&65535),T=(S>>>16)+(this.i(b)>>>16)+(I.i(b)>>>16);A=T>>>16,S&=65535,T&=65535,w[b]=T<<16|S}return new a(w,w[w.length-1]&-2147483648?-1:0)};function K(I,_){return I.add(L(_))}n.j=function(I){if(k(this)||k(I))return p;if(N(this))return N(I)?L(this).j(L(I)):L(L(this).j(I));if(N(I))return L(this.j(L(I)));if(0>this.l(E)&&0>I.l(E))return h(this.m()*I.m());for(var _=this.g.length+I.g.length,w=[],A=0;A<2*_;A++)w[A]=0;for(A=0;A<this.g.length;A++)for(var b=0;b<I.g.length;b++){var S=this.i(A)>>>16,T=this.i(A)&65535,ut=I.i(b)>>>16,It=I.i(b)&65535;w[2*A+2*b]+=T*It,B(w,2*A+2*b),w[2*A+2*b+1]+=S*It,B(w,2*A+2*b+1),w[2*A+2*b+1]+=T*ut,B(w,2*A+2*b+1),w[2*A+2*b+2]+=S*ut,B(w,2*A+2*b+2)}for(A=0;A<_;A++)w[A]=w[2*A+1]<<16|w[2*A];for(A=_;A<2*_;A++)w[A]=0;return new a(w,0)};function B(I,_){for(;(I[_]&65535)!=I[_];)I[_+1]+=I[_]>>>16,I[_]&=65535,_++}function q(I,_){this.g=I,this.h=_}function z(I,_){if(k(_))throw Error("division by zero");if(k(I))return new q(p,p);if(N(I))return _=z(L(I),_),new q(L(_.g),L(_.h));if(N(_))return _=z(I,L(_)),new q(L(_.g),_.h);if(30<I.g.length){if(N(I)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var w=m,A=_;0>=A.l(I);)w=he(w),A=he(A);var b=fe(w,1),S=fe(A,1);for(A=fe(A,2),w=fe(w,2);!k(A);){var T=S.add(A);0>=T.l(I)&&(b=b.add(w),S=T),A=fe(A,1),w=fe(w,1)}return _=K(I,b.j(_)),new q(b,_)}for(b=p;0<=I.l(_);){for(w=Math.max(1,Math.floor(I.m()/_.m())),A=Math.ceil(Math.log(w)/Math.LN2),A=48>=A?1:Math.pow(2,A-48),S=h(w),T=S.j(_);N(T)||0<T.l(I);)w-=A,S=h(w),T=S.j(_);k(S)&&(S=m),b=b.add(S),I=K(I,T)}return new q(b,I)}n.A=function(I){return z(this,I).h},n.and=function(I){for(var _=Math.max(this.g.length,I.g.length),w=[],A=0;A<_;A++)w[A]=this.i(A)&I.i(A);return new a(w,this.h&I.h)},n.or=function(I){for(var _=Math.max(this.g.length,I.g.length),w=[],A=0;A<_;A++)w[A]=this.i(A)|I.i(A);return new a(w,this.h|I.h)},n.xor=function(I){for(var _=Math.max(this.g.length,I.g.length),w=[],A=0;A<_;A++)w[A]=this.i(A)^I.i(A);return new a(w,this.h^I.h)};function he(I){for(var _=I.g.length+1,w=[],A=0;A<_;A++)w[A]=I.i(A)<<1|I.i(A-1)>>>31;return new a(w,I.h)}function fe(I,_){var w=_>>5;_%=32;for(var A=I.g.length-w,b=[],S=0;S<A;S++)b[S]=0<_?I.i(S+w)>>>_|I.i(S+w+1)<<32-_:I.i(S+w);return new a(b,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,$p=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=d,Ln=a}).apply(typeof Oh<"u"?Oh:typeof self<"u"?self:typeof window<"u"?window:{});var Pi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Hp,Es,qp,$i,rl,zp,Kp,Gp;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,f){return o==Array.prototype||o==Object.prototype||(o[u]=f.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Pi=="object"&&Pi];for(var u=0;u<o.length;++u){var f=o[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var f=r;o=o.split(".");for(var g=0;g<o.length-1;g++){var C=o[g];if(!(C in f))break e;f=f[C]}o=o[o.length-1],g=f[o],u=u(g),u!=g&&u!=null&&e(f,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var f=0,g=!1,C={next:function(){if(!g&&f<o.length){var P=f++;return{value:u(P,o[P]),done:!1}}return g=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function d(o,u,f){return o.call.apply(o.bind,arguments)}function p(o,u,f){if(!o)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,g),o.apply(u,C)}}return function(){return o.apply(u,arguments)}}function m(o,u,f){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,m.apply(null,arguments)}function E(o,u){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),o.apply(this,g)}}function k(o,u){function f(){}f.prototype=u.prototype,o.aa=u.prototype,o.prototype=new f,o.prototype.constructor=o,o.Qb=function(g,C,P){for(var $=Array(arguments.length-2),Re=2;Re<arguments.length;Re++)$[Re-2]=arguments[Re];return u.prototype[C].apply(g,$)}}function N(o){const u=o.length;if(0<u){const f=Array(u);for(let g=0;g<u;g++)f[g]=o[g];return f}return[]}function L(o,u){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(c(g)){const C=o.length||0,P=g.length||0;o.length=C+P;for(let $=0;$<P;$++)o[C+$]=g[$]}else o.push(g)}}class K{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function B(o){return/^[\s\xa0]*$/.test(o)}function q(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function z(o){return z[" "](o),o}z[" "]=function(){};var he=q().indexOf("Gecko")!=-1&&!(q().toLowerCase().indexOf("webkit")!=-1&&q().indexOf("Edge")==-1)&&!(q().indexOf("Trident")!=-1||q().indexOf("MSIE")!=-1)&&q().indexOf("Edge")==-1;function fe(o,u,f){for(const g in o)u.call(f,o[g],g,o)}function I(o,u){for(const f in o)u.call(void 0,o[f],f,o)}function _(o){const u={};for(const f in o)u[f]=o[f];return u}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function A(o,u){let f,g;for(let C=1;C<arguments.length;C++){g=arguments[C];for(f in g)o[f]=g[f];for(let P=0;P<w.length;P++)f=w[P],Object.prototype.hasOwnProperty.call(g,f)&&(o[f]=g[f])}}function b(o){var u=1;o=o.split(":");const f=[];for(;0<u&&o.length;)f.push(o.shift()),u--;return o.length&&f.push(o.join(":")),f}function S(o){l.setTimeout(()=>{throw o},0)}function T(){var o=yt;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class ut{constructor(){this.h=this.g=null}add(u,f){const g=It.get();g.set(u,f),this.h?this.h.next=g:this.g=g,this.h=g}}var It=new K(()=>new Ue,o=>o.reset());class Ue{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ge,de=!1,yt=new ut,Pt=()=>{const o=l.Promise.resolve(void 0);ge=()=>{o.then(At)}};var At=()=>{for(var o;o=T();){try{o.h.call(o.g)}catch(f){S(f)}var u=It;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}de=!1};function Ne(){this.s=this.s,this.C=this.C}Ne.prototype.s=!1,Ne.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ne.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ve(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}Ve.prototype.h=function(){this.defaultPrevented=!0};var _n=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return o}();function Lt(o,u){if(Ve.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var f=this.type=o.type,g=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(he){e:{try{z(u.nodeName);var C=!0;break e}catch{}C=!1}C||(u=null)}}else f=="mouseover"?u=o.fromElement:f=="mouseout"&&(u=o.toElement);this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:gt[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Lt.aa.h.call(this)}}k(Lt,Ve);var gt={2:"touch",3:"pen",4:"mouse"};Lt.prototype.h=function(){Lt.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var D="closure_listenable_"+(1e6*Math.random()|0),J=0;function W(o,u,f,g,C){this.listener=o,this.proxy=null,this.src=u,this.type=f,this.capture=!!g,this.ha=C,this.key=++J,this.da=this.fa=!1}function Y(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Te(o){this.src=o,this.g={},this.h=0}Te.prototype.add=function(o,u,f,g,C){var P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);var $=v(o,u,g,C);return-1<$?(u=o[$],f||(u.fa=!1)):(u=new W(u,this.src,P,!!g,C),u.fa=f,o.push(u)),u};function y(o,u){var f=u.type;if(f in o.g){var g=o.g[f],C=Array.prototype.indexOf.call(g,u,void 0),P;(P=0<=C)&&Array.prototype.splice.call(g,C,1),P&&(Y(u),o.g[f].length==0&&(delete o.g[f],o.h--))}}function v(o,u,f,g){for(var C=0;C<o.length;++C){var P=o[C];if(!P.da&&P.listener==u&&P.capture==!!f&&P.ha==g)return C}return-1}var R="closure_lm_"+(1e6*Math.random()|0),O={};function M(o,u,f,g,C){if(Array.isArray(u)){for(var P=0;P<u.length;P++)M(o,u[P],f,g,C);return null}return f=se(f),o&&o[D]?o.K(u,f,h(g)?!!g.capture:!1,C):V(o,u,f,!1,g,C)}function V(o,u,f,g,C,P){if(!u)throw Error("Invalid event type");var $=h(C)?!!C.capture:!!C,Re=Q(o);if(Re||(o[R]=Re=new Te(o)),f=Re.add(u,f,g,$,P),f.proxy)return f;if(g=G(),f.proxy=g,g.src=o,g.listener=f,o.addEventListener)_n||(C=$),C===void 0&&(C=!1),o.addEventListener(u.toString(),g,C);else if(o.attachEvent)o.attachEvent(F(u.toString()),g);else if(o.addListener&&o.removeListener)o.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function G(){function o(f){return u.call(o.src,o.listener,f)}const u=te;return o}function j(o,u,f,g,C){if(Array.isArray(u))for(var P=0;P<u.length;P++)j(o,u[P],f,g,C);else g=h(g)?!!g.capture:!!g,f=se(f),o&&o[D]?(o=o.i,u=String(u).toString(),u in o.g&&(P=o.g[u],f=v(P,f,g,C),-1<f&&(Y(P[f]),Array.prototype.splice.call(P,f,1),P.length==0&&(delete o.g[u],o.h--)))):o&&(o=Q(o))&&(u=o.g[u.toString()],o=-1,u&&(o=v(u,f,g,C)),(f=-1<o?u[o]:null)&&U(f))}function U(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[D])y(u.i,o);else{var f=o.type,g=o.proxy;u.removeEventListener?u.removeEventListener(f,g,o.capture):u.detachEvent?u.detachEvent(F(f),g):u.addListener&&u.removeListener&&u.removeListener(g),(f=Q(u))?(y(f,o),f.h==0&&(f.src=null,u[R]=null)):Y(o)}}}function F(o){return o in O?O[o]:O[o]="on"+o}function te(o,u){if(o.da)o=!0;else{u=new Lt(u,this);var f=o.listener,g=o.ha||o.src;o.fa&&U(o),o=f.call(g,u)}return o}function Q(o){return o=o[R],o instanceof Te?o:null}var Z="__closure_events_fn_"+(1e9*Math.random()>>>0);function se(o){return typeof o=="function"?o:(o[Z]||(o[Z]=function(u){return o.handleEvent(u)}),o[Z])}function ne(){Ne.call(this),this.i=new Te(this),this.M=this,this.F=null}k(ne,Ne),ne.prototype[D]=!0,ne.prototype.removeEventListener=function(o,u,f,g){j(this,o,u,f,g)};function le(o,u){var f,g=o.F;if(g)for(f=[];g;g=g.F)f.push(g);if(o=o.M,g=u.type||u,typeof u=="string")u=new Ve(u,o);else if(u instanceof Ve)u.target=u.target||o;else{var C=u;u=new Ve(g,o),A(u,C)}if(C=!0,f)for(var P=f.length-1;0<=P;P--){var $=u.g=f[P];C=me($,g,!0,u)&&C}if($=u.g=o,C=me($,g,!0,u)&&C,C=me($,g,!1,u)&&C,f)for(P=0;P<f.length;P++)$=u.g=f[P],C=me($,g,!1,u)&&C}ne.prototype.N=function(){if(ne.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var f=o.g[u],g=0;g<f.length;g++)Y(f[g]);delete o.g[u],o.h--}}this.F=null},ne.prototype.K=function(o,u,f,g){return this.i.add(String(o),u,!1,f,g)},ne.prototype.L=function(o,u,f,g){return this.i.add(String(o),u,!0,f,g)};function me(o,u,f,g){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var C=!0,P=0;P<u.length;++P){var $=u[P];if($&&!$.da&&$.capture==f){var Re=$.listener,Ge=$.ha||$.src;$.fa&&y(o.i,$),C=Re.call(Ge,g)!==!1&&C}}return C&&!g.defaultPrevented}function Je(o,u,f){if(typeof o=="function")f&&(o=m(o,f));else if(o&&typeof o.handleEvent=="function")o=m(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function ze(o){o.g=Je(()=>{o.g=null,o.i&&(o.i=!1,ze(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class bt extends Ne{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:ze(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Xe(o){Ne.call(this),this.h=o,this.g={}}k(Xe,Ne);var yn=[];function rs(o){fe(o.g,function(u,f){this.g.hasOwnProperty(f)&&U(u)},o),o.g={}}Xe.prototype.N=function(){Xe.aa.N.call(this),rs(this)},Xe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ke=l.JSON.stringify,Rt=l.JSON.parse,ci=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Go(){}Go.prototype.h=null;function wc(o){return o.h||(o.h=o.i())}function Ic(){}var ss={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Wo(){Ve.call(this,"d")}k(Wo,Ve);function Qo(){Ve.call(this,"c")}k(Qo,Ve);var Jn={},Ac=null;function ui(){return Ac=Ac||new ne}Jn.La="serverreachability";function bc(o){Ve.call(this,Jn.La,o)}k(bc,Ve);function is(o){const u=ui();le(u,new bc(u))}Jn.STAT_EVENT="statevent";function Rc(o,u){Ve.call(this,Jn.STAT_EVENT,o),this.stat=u}k(Rc,Ve);function ht(o){const u=ui();le(u,new Rc(u,o))}Jn.Ma="timingevent";function Sc(o,u){Ve.call(this,Jn.Ma,o),this.size=u}k(Sc,Ve);function os(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function as(){this.g=!0}as.prototype.xa=function(){this.g=!1};function om(o,u,f,g,C,P){o.info(function(){if(o.g)if(P)for(var $="",Re=P.split("&"),Ge=0;Ge<Re.length;Ge++){var we=Re[Ge].split("=");if(1<we.length){var Ye=we[0];we=we[1];var Ze=Ye.split("_");$=2<=Ze.length&&Ze[1]=="type"?$+(Ye+"="+we+"&"):$+(Ye+"=redacted&")}}else $=null;else $=P;return"XMLHTTP REQ ("+g+") [attempt "+C+"]: "+u+`
`+f+`
`+$})}function am(o,u,f,g,C,P,$){o.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+C+"]: "+u+`
`+f+`
`+P+" "+$})}function _r(o,u,f,g){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+cm(o,f)+(g?" "+g:"")})}function lm(o,u){o.info(function(){return"TIMEOUT: "+u})}as.prototype.info=function(){};function cm(o,u){if(!o.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(o=0;o<f.length;o++)if(Array.isArray(f[o])){var g=f[o];if(!(2>g.length)){var C=g[1];if(Array.isArray(C)&&!(1>C.length)){var P=C[0];if(P!="noop"&&P!="stop"&&P!="close")for(var $=1;$<C.length;$++)C[$]=""}}}}return Ke(f)}catch{return u}}var hi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Cc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Jo;function fi(){}k(fi,Go),fi.prototype.g=function(){return new XMLHttpRequest},fi.prototype.i=function(){return{}},Jo=new fi;function vn(o,u,f,g){this.j=o,this.i=u,this.l=f,this.R=g||1,this.U=new Xe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Pc}function Pc(){this.i=null,this.g="",this.h=!1}var kc={},Xo={};function Yo(o,u,f){o.L=1,o.v=mi(en(u)),o.m=f,o.P=!0,Dc(o,null)}function Dc(o,u){o.F=Date.now(),di(o),o.A=en(o.v);var f=o.A,g=o.R;Array.isArray(g)||(g=[String(g)]),zc(f.i,"t",g),o.C=0,f=o.j.J,o.h=new Pc,o.g=cu(o.j,f?u:null,!o.m),0<o.O&&(o.M=new bt(m(o.Y,o,o.g),o.O)),u=o.U,f=o.g,g=o.ca;var C="readystatechange";Array.isArray(C)||(C&&(yn[0]=C.toString()),C=yn);for(var P=0;P<C.length;P++){var $=M(f,C[P],g||u.handleEvent,!1,u.h||u);if(!$)break;u.g[$.key]=$}u=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),is(),om(o.i,o.u,o.A,o.l,o.R,o.m)}vn.prototype.ca=function(o){o=o.target;const u=this.M;u&&tn(o)==3?u.j():this.Y(o)},vn.prototype.Y=function(o){try{if(o==this.g)e:{const Ze=tn(this.g);var u=this.g.Ba();const Er=this.g.Z();if(!(3>Ze)&&(Ze!=3||this.g&&(this.h.h||this.g.oa()||Yc(this.g)))){this.J||Ze!=4||u==7||(u==8||0>=Er?is(3):is(2)),Zo(this);var f=this.g.Z();this.X=f;t:if(Oc(this)){var g=Yc(this.g);o="";var C=g.length,P=tn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Xn(this),ls(this);var $="";break t}this.h.i=new l.TextDecoder}for(u=0;u<C;u++)this.h.h=!0,o+=this.h.i.decode(g[u],{stream:!(P&&u==C-1)});g.length=0,this.h.g+=o,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=f==200,am(this.i,this.u,this.A,this.l,this.R,Ze,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Re,Ge=this.g;if((Re=Ge.g?Ge.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(Re)){var we=Re;break t}}we=null}if(f=we)_r(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ea(this,f);else{this.o=!1,this.s=3,ht(12),Xn(this),ls(this);break e}}if(this.P){f=!0;let kt;for(;!this.J&&this.C<$.length;)if(kt=um(this,$),kt==Xo){Ze==4&&(this.s=4,ht(14),f=!1),_r(this.i,this.l,null,"[Incomplete Response]");break}else if(kt==kc){this.s=4,ht(15),_r(this.i,this.l,$,"[Invalid Chunk]"),f=!1;break}else _r(this.i,this.l,kt,null),ea(this,kt);if(Oc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ze!=4||$.length!=0||this.h.h||(this.s=1,ht(16),f=!1),this.o=this.o&&f,!f)_r(this.i,this.l,$,"[Invalid Chunked Response]"),Xn(this),ls(this);else if(0<$.length&&!this.W){this.W=!0;var Ye=this.j;Ye.g==this&&Ye.ba&&!Ye.M&&(Ye.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),oa(Ye),Ye.M=!0,ht(11))}}else _r(this.i,this.l,$,null),ea(this,$);Ze==4&&Xn(this),this.o&&!this.J&&(Ze==4?iu(this.j,this):(this.o=!1,di(this)))}else Sm(this.g),f==400&&0<$.indexOf("Unknown SID")?(this.s=3,ht(12)):(this.s=0,ht(13)),Xn(this),ls(this)}}}catch{}finally{}};function Oc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function um(o,u){var f=o.C,g=u.indexOf(`
`,f);return g==-1?Xo:(f=Number(u.substring(f,g)),isNaN(f)?kc:(g+=1,g+f>u.length?Xo:(u=u.slice(g,g+f),o.C=g+f,u)))}vn.prototype.cancel=function(){this.J=!0,Xn(this)};function di(o){o.S=Date.now()+o.I,Nc(o,o.I)}function Nc(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=os(m(o.ba,o),u)}function Zo(o){o.B&&(l.clearTimeout(o.B),o.B=null)}vn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(lm(this.i,this.A),this.L!=2&&(is(),ht(17)),Xn(this),this.s=2,ls(this)):Nc(this,this.S-o)};function ls(o){o.j.G==0||o.J||iu(o.j,o)}function Xn(o){Zo(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,rs(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function ea(o,u){try{var f=o.j;if(f.G!=0&&(f.g==o||ta(f.h,o))){if(!o.K&&ta(f.h,o)&&f.G==3){try{var g=f.Da.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var C=g;if(C[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<o.F)wi(f),Ei(f);else break e;ia(f),ht(18)}}else f.za=C[1],0<f.za-f.T&&37500>C[2]&&f.F&&f.v==0&&!f.C&&(f.C=os(m(f.Za,f),6e3));if(1>=Mc(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Zn(f,11)}else if((o.K||f.g==o)&&wi(f),!B(u))for(C=f.Da.g.parse(u),u=0;u<C.length;u++){let we=C[u];if(f.T=we[0],we=we[1],f.G==2)if(we[0]=="c"){f.K=we[1],f.ia=we[2];const Ye=we[3];Ye!=null&&(f.la=Ye,f.j.info("VER="+f.la));const Ze=we[4];Ze!=null&&(f.Aa=Ze,f.j.info("SVER="+f.Aa));const Er=we[5];Er!=null&&typeof Er=="number"&&0<Er&&(g=1.5*Er,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const kt=o.g;if(kt){const Ai=kt.g?kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ai){var P=g.h;P.g||Ai.indexOf("spdy")==-1&&Ai.indexOf("quic")==-1&&Ai.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(na(P,P.h),P.h=null))}if(g.D){const aa=kt.g?kt.g.getResponseHeader("X-HTTP-Session-Id"):null;aa&&(g.ya=aa,ke(g.I,g.D,aa))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-o.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var $=o;if(g.qa=lu(g,g.J?g.ia:null,g.W),$.K){Lc(g.h,$);var Re=$,Ge=g.L;Ge&&(Re.I=Ge),Re.B&&(Zo(Re),di(Re)),g.g=$}else ru(g);0<f.i.length&&Ti(f)}else we[0]!="stop"&&we[0]!="close"||Zn(f,7);else f.G==3&&(we[0]=="stop"||we[0]=="close"?we[0]=="stop"?Zn(f,7):sa(f):we[0]!="noop"&&f.l&&f.l.ta(we),f.v=0)}}is(4)}catch{}}var hm=class{constructor(o,u){this.g=o,this.map=u}};function Vc(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function xc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Mc(o){return o.h?1:o.g?o.g.size:0}function ta(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function na(o,u){o.g?o.g.add(u):o.h=u}function Lc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Vc.prototype.cancel=function(){if(this.i=Fc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Fc(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const f of o.g.values())u=u.concat(f.D);return u}return N(o.i)}function fm(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var u=[],f=o.length,g=0;g<f;g++)u.push(o[g]);return u}u=[],f=0;for(g in o)u[f++]=o[g];return u}function dm(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var u=[];o=o.length;for(var f=0;f<o;f++)u.push(f);return u}u=[],f=0;for(const g in o)u[f++]=g;return u}}}function Uc(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var f=dm(o),g=fm(o),C=g.length,P=0;P<C;P++)u.call(void 0,g[P],f&&f[P],o)}var Bc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function pm(o,u){if(o){o=o.split("&");for(var f=0;f<o.length;f++){var g=o[f].indexOf("="),C=null;if(0<=g){var P=o[f].substring(0,g);C=o[f].substring(g+1)}else P=o[f];u(P,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function Yn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Yn){this.h=o.h,pi(this,o.j),this.o=o.o,this.g=o.g,gi(this,o.s),this.l=o.l;var u=o.i,f=new hs;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),jc(this,f),this.m=o.m}else o&&(u=String(o).match(Bc))?(this.h=!1,pi(this,u[1]||"",!0),this.o=cs(u[2]||""),this.g=cs(u[3]||"",!0),gi(this,u[4]),this.l=cs(u[5]||"",!0),jc(this,u[6]||"",!0),this.m=cs(u[7]||"")):(this.h=!1,this.i=new hs(null,this.h))}Yn.prototype.toString=function(){var o=[],u=this.j;u&&o.push(us(u,$c,!0),":");var f=this.g;return(f||u=="file")&&(o.push("//"),(u=this.o)&&o.push(us(u,$c,!0),"@"),o.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&o.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&o.push("/"),o.push(us(f,f.charAt(0)=="/"?_m:mm,!0))),(f=this.i.toString())&&o.push("?",f),(f=this.m)&&o.push("#",us(f,vm)),o.join("")};function en(o){return new Yn(o)}function pi(o,u,f){o.j=f?cs(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function gi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function jc(o,u,f){u instanceof hs?(o.i=u,Em(o.i,o.h)):(f||(u=us(u,ym)),o.i=new hs(u,o.h))}function ke(o,u,f){o.i.set(u,f)}function mi(o){return ke(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function cs(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function us(o,u,f){return typeof o=="string"?(o=encodeURI(o).replace(u,gm),f&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function gm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var $c=/[#\/\?@]/g,mm=/[#\?:]/g,_m=/[#\?]/g,ym=/[#\?@]/g,vm=/#/g;function hs(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function En(o){o.g||(o.g=new Map,o.h=0,o.i&&pm(o.i,function(u,f){o.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}n=hs.prototype,n.add=function(o,u){En(this),this.i=null,o=yr(this,o);var f=this.g.get(o);return f||this.g.set(o,f=[]),f.push(u),this.h+=1,this};function Hc(o,u){En(o),u=yr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function qc(o,u){return En(o),u=yr(o,u),o.g.has(u)}n.forEach=function(o,u){En(this),this.g.forEach(function(f,g){f.forEach(function(C){o.call(u,C,g,this)},this)},this)},n.na=function(){En(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let g=0;g<u.length;g++){const C=o[g];for(let P=0;P<C.length;P++)f.push(u[g])}return f},n.V=function(o){En(this);let u=[];if(typeof o=="string")qc(this,o)&&(u=u.concat(this.g.get(yr(this,o))));else{o=Array.from(this.g.values());for(let f=0;f<o.length;f++)u=u.concat(o[f])}return u},n.set=function(o,u){return En(this),this.i=null,o=yr(this,o),qc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function zc(o,u,f){Hc(o,u),0<f.length&&(o.i=null,o.g.set(yr(o,u),N(f)),o.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var g=u[f];const P=encodeURIComponent(String(g)),$=this.V(g);for(g=0;g<$.length;g++){var C=P;$[g]!==""&&(C+="="+encodeURIComponent(String($[g]))),o.push(C)}}return this.i=o.join("&")};function yr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Em(o,u){u&&!o.j&&(En(o),o.i=null,o.g.forEach(function(f,g){var C=g.toLowerCase();g!=C&&(Hc(this,g),zc(this,C,f))},o)),o.j=u}function Tm(o,u){const f=new as;if(l.Image){const g=new Image;g.onload=E(Tn,f,"TestLoadImage: loaded",!0,u,g),g.onerror=E(Tn,f,"TestLoadImage: error",!1,u,g),g.onabort=E(Tn,f,"TestLoadImage: abort",!1,u,g),g.ontimeout=E(Tn,f,"TestLoadImage: timeout",!1,u,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=o}else u(!1)}function wm(o,u){const f=new as,g=new AbortController,C=setTimeout(()=>{g.abort(),Tn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:g.signal}).then(P=>{clearTimeout(C),P.ok?Tn(f,"TestPingServer: ok",!0,u):Tn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(C),Tn(f,"TestPingServer: error",!1,u)})}function Tn(o,u,f,g,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),g(f)}catch{}}function Im(){this.g=new ci}function Am(o,u,f){const g=f||"";try{Uc(o,function(C,P){let $=C;h(C)&&($=Ke(C)),u.push(g+P+"="+encodeURIComponent($))})}catch(C){throw u.push(g+"type="+encodeURIComponent("_badmap")),C}}function _i(o){this.l=o.Ub||null,this.j=o.eb||!1}k(_i,Go),_i.prototype.g=function(){return new yi(this.l,this.j)},_i.prototype.i=function(o){return function(){return o}}({});function yi(o,u){ne.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(yi,ne),n=yi.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,ds(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,fs(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ds(this)),this.g&&(this.readyState=3,ds(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Kc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Kc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?fs(this):ds(this),this.readyState==3&&Kc(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,fs(this))},n.Qa=function(o){this.g&&(this.response=o,fs(this))},n.ga=function(){this.g&&fs(this)};function fs(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ds(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,o.push(f[0]+": "+f[1]),f=u.next();return o.join(`\r
`)};function ds(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(yi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Gc(o){let u="";return fe(o,function(f,g){u+=g,u+=":",u+=f,u+=`\r
`}),u}function ra(o,u,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=Gc(f),typeof o=="string"?f!=null&&encodeURIComponent(String(f)):ke(o,u,f))}function Me(o){ne.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Me,ne);var bm=/^https?$/i,Rm=["POST","PUT"];n=Me.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Jo.g(),this.v=this.o?wc(this.o):wc(Jo),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(P){Wc(this,P);return}if(o=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var C in g)f.set(C,g[C]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const P of g.keys())f.set(P,g.get(P));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),C=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Rm,u,void 0))||g||C||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,$]of f)this.g.setRequestHeader(P,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Xc(this),this.u=!0,this.g.send(o),this.u=!1}catch(P){Wc(this,P)}};function Wc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Qc(o),vi(o)}function Qc(o){o.A||(o.A=!0,le(o,"complete"),le(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,le(this,"complete"),le(this,"abort"),vi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),vi(this,!0)),Me.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Jc(this):this.bb())},n.bb=function(){Jc(this)};function Jc(o){if(o.h&&typeof a<"u"&&(!o.v[1]||tn(o)!=4||o.Z()!=2)){if(o.u&&tn(o)==4)Je(o.Ea,0,o);else if(le(o,"readystatechange"),tn(o)==4){o.h=!1;try{const $=o.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var g;if(g=$===0){var C=String(o.D).match(Bc)[1]||null;!C&&l.self&&l.self.location&&(C=l.self.location.protocol.slice(0,-1)),g=!bm.test(C?C.toLowerCase():"")}f=g}if(f)le(o,"complete"),le(o,"success");else{o.m=6;try{var P=2<tn(o)?o.g.statusText:""}catch{P=""}o.l=P+" ["+o.Z()+"]",Qc(o)}}finally{vi(o)}}}}function vi(o,u){if(o.g){Xc(o);const f=o.g,g=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||le(o,"ready");try{f.onreadystatechange=g}catch{}}}function Xc(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function tn(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<tn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Rt(u)}};function Yc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Sm(o){const u={};o=(o.g&&2<=tn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<o.length;g++){if(B(o[g]))continue;var f=b(o[g]);const C=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=u[C]||[];u[C]=P,P.push(f)}I(u,function(g){return g.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ps(o,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[o]||u}function Zc(o){this.Aa=0,this.i=[],this.j=new as,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ps("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ps("baseRetryDelayMs",5e3,o),this.cb=ps("retryDelaySeedMs",1e4,o),this.Wa=ps("forwardChannelMaxRetries",2,o),this.wa=ps("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Vc(o&&o.concurrentRequestLimit),this.Da=new Im,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Zc.prototype,n.la=8,n.G=1,n.connect=function(o,u,f,g){ht(0),this.W=o,this.H=u||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=lu(this,null,this.W),Ti(this)};function sa(o){if(eu(o),o.G==3){var u=o.U++,f=en(o.I);if(ke(f,"SID",o.K),ke(f,"RID",u),ke(f,"TYPE","terminate"),gs(o,f),u=new vn(o,o.j,u),u.L=2,u.v=mi(en(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=cu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),di(u)}au(o)}function Ei(o){o.g&&(oa(o),o.g.cancel(),o.g=null)}function eu(o){Ei(o),o.u&&(l.clearTimeout(o.u),o.u=null),wi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function Ti(o){if(!xc(o.h)&&!o.s){o.s=!0;var u=o.Ga;ge||Pt(),de||(ge(),de=!0),yt.add(u,o),o.B=0}}function Cm(o,u){return Mc(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=os(m(o.Ga,o,u),ou(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const C=new vn(this,this.j,o);let P=this.o;if(this.S&&(P?(P=_(P),A(P,this.S)):P=this.S),this.m!==null||this.O||(C.H=P,P=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(u+=g,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=nu(this,C,u),f=en(this.I),ke(f,"RID",o),ke(f,"CVER",22),this.D&&ke(f,"X-HTTP-Session-Id",this.D),gs(this,f),P&&(this.O?u="headers="+encodeURIComponent(String(Gc(P)))+"&"+u:this.m&&ra(f,this.m,P)),na(this.h,C),this.Ua&&ke(f,"TYPE","init"),this.P?(ke(f,"$req",u),ke(f,"SID","null"),C.T=!0,Yo(C,f,null)):Yo(C,f,u),this.G=2}}else this.G==3&&(o?tu(this,o):this.i.length==0||xc(this.h)||tu(this))};function tu(o,u){var f;u?f=u.l:f=o.U++;const g=en(o.I);ke(g,"SID",o.K),ke(g,"RID",f),ke(g,"AID",o.T),gs(o,g),o.m&&o.o&&ra(g,o.m,o.o),f=new vn(o,o.j,f,o.B+1),o.m===null&&(f.H=o.o),u&&(o.i=u.D.concat(o.i)),u=nu(o,f,1e3),f.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),na(o.h,f),Yo(f,g,u)}function gs(o,u){o.H&&fe(o.H,function(f,g){ke(u,g,f)}),o.l&&Uc({},function(f,g){ke(u,g,f)})}function nu(o,u,f){f=Math.min(o.i.length,f);var g=o.l?m(o.l.Na,o.l,o):null;e:{var C=o.i;let P=-1;for(;;){const $=["count="+f];P==-1?0<f?(P=C[0].g,$.push("ofs="+P)):P=0:$.push("ofs="+P);let Re=!0;for(let Ge=0;Ge<f;Ge++){let we=C[Ge].g;const Ye=C[Ge].map;if(we-=P,0>we)P=Math.max(0,C[Ge].g-100),Re=!1;else try{Am(Ye,$,"req"+we+"_")}catch{g&&g(Ye)}}if(Re){g=$.join("&");break e}}}return o=o.i.splice(0,f),u.D=o,g}function ru(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;ge||Pt(),de||(ge(),de=!0),yt.add(u,o),o.v=0}}function ia(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=os(m(o.Fa,o),ou(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,su(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=os(m(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ht(10),Ei(this),su(this))};function oa(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function su(o){o.g=new vn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=en(o.qa);ke(u,"RID","rpc"),ke(u,"SID",o.K),ke(u,"AID",o.T),ke(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&ke(u,"TO",o.ja),ke(u,"TYPE","xmlhttp"),gs(o,u),o.m&&o.o&&ra(u,o.m,o.o),o.L&&(o.g.I=o.L);var f=o.g;o=o.ia,f.L=1,f.v=mi(en(u)),f.m=null,f.P=!0,Dc(f,o)}n.Za=function(){this.C!=null&&(this.C=null,Ei(this),ia(this),ht(19))};function wi(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function iu(o,u){var f=null;if(o.g==u){wi(o),oa(o),o.g=null;var g=2}else if(ta(o.h,u))f=u.D,Lc(o.h,u),g=1;else return;if(o.G!=0){if(u.o)if(g==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var C=o.B;g=ui(),le(g,new Sc(g,f)),Ti(o)}else ru(o);else if(C=u.s,C==3||C==0&&0<u.X||!(g==1&&Cm(o,u)||g==2&&ia(o)))switch(f&&0<f.length&&(u=o.h,u.i=u.i.concat(f)),C){case 1:Zn(o,5);break;case 4:Zn(o,10);break;case 3:Zn(o,6);break;default:Zn(o,2)}}}function ou(o,u){let f=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(f*=2),f*u}function Zn(o,u){if(o.j.info("Error code "+u),u==2){var f=m(o.fb,o),g=o.Xa;const C=!g;g=new Yn(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||pi(g,"https"),mi(g),C?Tm(g.toString(),f):wm(g.toString(),f)}else ht(2);o.G=0,o.l&&o.l.sa(u),au(o),eu(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),ht(2)):(this.j.info("Failed to ping google.com"),ht(1))};function au(o){if(o.G=0,o.ka=[],o.l){const u=Fc(o.h);(u.length!=0||o.i.length!=0)&&(L(o.ka,u),L(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function lu(o,u,f){var g=f instanceof Yn?en(f):new Yn(f);if(g.g!="")u&&(g.g=u+"."+g.g),gi(g,g.s);else{var C=l.location;g=C.protocol,u=u?u+"."+C.hostname:C.hostname,C=+C.port;var P=new Yn(null);g&&pi(P,g),u&&(P.g=u),C&&gi(P,C),f&&(P.l=f),g=P}return f=o.D,u=o.ya,f&&u&&ke(g,f,u),ke(g,"VER",o.la),gs(o,g),g}function cu(o,u,f){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new Me(new _i({eb:f})):new Me(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function uu(){}n=uu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ii(){}Ii.prototype.g=function(o,u){return new vt(o,u)};function vt(o,u){ne.call(this),this.g=new Zc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!B(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!B(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new vr(this)}k(vt,ne),vt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},vt.prototype.close=function(){sa(this.g)},vt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var f={};f.__data__=o,o=f}else this.u&&(f={},f.__data__=Ke(o),o=f);u.i.push(new hm(u.Ya++,o)),u.G==3&&Ti(u)},vt.prototype.N=function(){this.g.l=null,delete this.j,sa(this.g),delete this.g,vt.aa.N.call(this)};function hu(o){Wo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const f in u){o=f;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}k(hu,Wo);function fu(){Qo.call(this),this.status=1}k(fu,Qo);function vr(o){this.g=o}k(vr,uu),vr.prototype.ua=function(){le(this.g,"a")},vr.prototype.ta=function(o){le(this.g,new hu(o))},vr.prototype.sa=function(o){le(this.g,new fu)},vr.prototype.ra=function(){le(this.g,"b")},Ii.prototype.createWebChannel=Ii.prototype.g,vt.prototype.send=vt.prototype.o,vt.prototype.open=vt.prototype.m,vt.prototype.close=vt.prototype.close,Gp=function(){return new Ii},Kp=function(){return ui()},zp=Jn,rl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},hi.NO_ERROR=0,hi.TIMEOUT=8,hi.HTTP_ERROR=6,$i=hi,Cc.COMPLETE="complete",qp=Cc,Ic.EventType=ss,ss.OPEN="a",ss.CLOSE="b",ss.ERROR="c",ss.MESSAGE="d",ne.prototype.listen=ne.prototype.K,Es=Ic,Me.prototype.listenOnce=Me.prototype.L,Me.prototype.getLastError=Me.prototype.Ka,Me.prototype.getLastErrorCode=Me.prototype.Ba,Me.prototype.getStatus=Me.prototype.Z,Me.prototype.getResponseJson=Me.prototype.Oa,Me.prototype.getResponseText=Me.prototype.oa,Me.prototype.send=Me.prototype.ea,Me.prototype.setWithCredentials=Me.prototype.Ha,Hp=Me}).apply(typeof Pi<"u"?Pi:typeof self<"u"?self:typeof window<"u"?window:{});const Nh="@firebase/firestore",Vh="4.7.8";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}tt.UNAUTHENTICATED=new tt(null),tt.GOOGLE_CREDENTIALS=new tt("google-credentials-uid"),tt.FIRST_PARTY=new tt("first-party-uid"),tt.MOCK_USER=new tt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let es="11.3.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=new Bl("@firebase/firestore");function br(){return pr.logLevel}function X(n,...e){if(pr.logLevel<=pe.DEBUG){const t=e.map(ec);pr.debug(`Firestore (${es}): ${n}`,...t)}}function pn(n,...e){if(pr.logLevel<=pe.ERROR){const t=e.map(ec);pr.error(`Firestore (${es}): ${n}`,...t)}}function zr(n,...e){if(pr.logLevel<=pe.WARN){const t=e.map(ec);pr.warn(`Firestore (${es}): ${n}`,...t)}}function ec(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(n="Unexpected state"){const e=`FIRESTORE (${es}) INTERNAL ASSERTION FAILED: `+n;throw pn(e),new Error(e)}function xe(n,e){n||ue()}function ve(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ee extends mn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class MI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(tt.UNAUTHENTICATED))}shutdown(){}}class LI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class FI{constructor(e){this.t=e,this.currentUser=tt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){xe(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let i=new Fn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Fn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{X("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(X("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Fn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(X("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(xe(typeof r.accessToken=="string"),new Wp(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return xe(e===null||typeof e=="string"),new tt(e)}}class UI{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=tt.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class BI{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new UI(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(tt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class xh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class jI{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,Ot(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){xe(this.o===void 0);const r=i=>{i.error!=null&&X("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,X("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{X("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):X("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new xh(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(xe(typeof t.token=="string"),this.R=t.token,new xh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $I(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=$I(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ye(n,e){return n<e?-1:n>e?1:0}function Kr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh=-62135596800,Lh=1e6;class _t{static now(){return _t.fromMillis(Date.now())}static fromDate(e){return _t.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Lh);return new _t(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new ee(H.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new ee(H.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Mh)throw new ee(H.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ee(H.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Lh}_compareTo(e){return this.seconds===e.seconds?ye(this.nanoseconds,e.nanoseconds):ye(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Mh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{static fromTimestamp(e){return new oe(e)}static min(){return new oe(new _t(0,0))}static max(){return new oe(new _t(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh="__name__";class jt{constructor(e,t,r){t===void 0?t=0:t>e.length&&ue(),r===void 0?r=e.length-t:r>e.length-t&&ue(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return jt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof jt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=jt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Math.sign(e.length-t.length)}static compareSegments(e,t){const r=jt.isNumericId(e),s=jt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?jt.extractNumericId(e).compare(jt.extractNumericId(t)):e<t?-1:e>t?1:0}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ln.fromString(e.substring(4,e.length-2))}}class De extends jt{construct(e,t,r){return new De(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new ee(H.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new De(t)}static emptyPath(){return new De([])}}const HI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pt extends jt{construct(e,t,r){return new pt(e,t,r)}static isValidIdentifier(e){return HI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fh}static keyField(){return new pt([Fh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new ee(H.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new ee(H.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new ee(H.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new ee(H.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pt(t)}static emptyPath(){return new pt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.path=e}static fromPath(e){return new re(De.fromString(e))}static fromName(e){return new re(De.fromString(e).popFirst(5))}static empty(){return new re(De.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&De.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return De.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new re(new De(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs=-1;function qI(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=oe.fromTimestamp(r===1e9?new _t(t+1,0):new _t(t,r));return new Bn(s,re.empty(),e)}function zI(n){return new Bn(n.readTime,n.key,Gs)}class Bn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Bn(oe.min(),re.empty(),Gs)}static max(){return new Bn(oe.max(),re.empty(),Gs)}}function KI(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=re.comparator(n.documentKey,e.documentKey),t!==0?t:ye(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class WI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vo(n){if(n.code!==H.FAILED_PRECONDITION||n.message!==GI)throw n;X("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ue(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new x((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof x?t:x.resolve(t)}catch(t){return x.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):x.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):x.reject(t)}static resolve(e){return new x((t,r)=>{t(e)})}static reject(e){return new x((t,r)=>{r(e)})}static waitFor(e){return new x((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},c=>r(c))}),a=!0,i===s&&t()})}static or(e){let t=x.resolve(!1);for(const r of e)t=t.next(s=>s?x.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new x((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let c=0;c<i;c++){const h=c;t(e[h]).next(d=>{a[h]=d,++l,l===i&&r(a)},d=>s(d))}})}static doWhile(e,t){return new x((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function QI(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ts(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}xo.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JI=-1;function Mo(n){return n==null}function sl(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp="";function XI(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Uh(e)),e=YI(n.get(t),e);return Uh(e)}function YI(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Jp:t+="";break;default:t+=i}}return t}function Uh(n){return n+Jp+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function ii(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ZI(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,t){this.comparator=e,this.root=t||We.EMPTY}insert(e,t){return new Fe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,We.BLACK,null,null))}remove(e){return new Fe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,We.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ki(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ki(this.root,e,this.comparator,!1)}getReverseIterator(){return new ki(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ki(this.root,e,this.comparator,!0)}}class ki{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class We{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??We.RED,this.left=s??We.EMPTY,this.right=i??We.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new We(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return We.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return We.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,We.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,We.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ue();const e=this.left.check();if(e!==this.right.check())throw ue();return e+(this.isRed()?0:1)}}We.EMPTY=null,We.RED=!0,We.BLACK=!1;We.EMPTY=new class{constructor(){this.size=0}get key(){throw ue()}get value(){throw ue()}get color(){throw ue()}get left(){throw ue()}get right(){throw ue()}copy(e,t,r,s,i){return this}insert(e,t,r){return new We(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.comparator=e,this.data=new Fe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new jh(this.data.getIterator())}getIteratorFrom(e){return new jh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof He)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new He(this.comparator);return t.data=e,t}}class jh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this.fields=e,e.sort(pt.comparator)}static empty(){return new Dn([])}unionWith(e){let t=new He(pt.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Dn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Kr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Xp("Invalid base64 string: "+i):i}}(e);return new Qe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Qe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ye(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Qe.EMPTY_BYTE_STRING=new Qe("");const eA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function jn(n){if(xe(!!n),typeof n=="string"){let e=0;const t=eA.exec(n);if(xe(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Le(n.seconds),nanos:Le(n.nanos)}}function Le(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function $n(n){return typeof n=="string"?Qe.fromBase64String(n):Qe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp="server_timestamp",Zp="__type__",eg="__previous_value__",tg="__local_write_time__";function tc(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Zp])===null||t===void 0?void 0:t.stringValue)===Yp}function Lo(n){const e=n.mapValue.fields[eg];return tc(e)?Lo(e):e}function Ws(n){const e=jn(n.mapValue.fields[tg].timestampValue);return new _t(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e,t,r,s,i,a,l,c,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h}}const lo="(default)";class Qs{constructor(e,t){this.projectId=e,this.database=t||lo}static empty(){return new Qs("","")}get isDefaultDatabase(){return this.database===lo}isEqual(e){return e instanceof Qs&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nA="__type__",rA="__max__",Di={mapValue:{}},sA="__vector__",il="value";function Hn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?tc(n)?4:oA(n)?9007199254740991:iA(n)?10:11:ue()}function Yt(n,e){if(n===e)return!0;const t=Hn(n);if(t!==Hn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ws(n).isEqual(Ws(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=jn(s.timestampValue),l=jn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return $n(s.bytesValue).isEqual($n(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Le(s.geoPointValue.latitude)===Le(i.geoPointValue.latitude)&&Le(s.geoPointValue.longitude)===Le(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Le(s.integerValue)===Le(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Le(s.doubleValue),l=Le(i.doubleValue);return a===l?sl(a)===sl(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Kr(n.arrayValue.values||[],e.arrayValue.values||[],Yt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Bh(a)!==Bh(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!Yt(a[c],l[c])))return!1;return!0}(n,e);default:return ue()}}function Js(n,e){return(n.values||[]).find(t=>Yt(t,e))!==void 0}function Gr(n,e){if(n===e)return 0;const t=Hn(n),r=Hn(e);if(t!==r)return ye(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ye(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=Le(i.integerValue||i.doubleValue),c=Le(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return $h(n.timestampValue,e.timestampValue);case 4:return $h(Ws(n),Ws(e));case 5:return ye(n.stringValue,e.stringValue);case 6:return function(i,a){const l=$n(i),c=$n(a);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),c=a.split("/");for(let h=0;h<l.length&&h<c.length;h++){const d=ye(l[h],c[h]);if(d!==0)return d}return ye(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=ye(Le(i.latitude),Le(a.latitude));return l!==0?l:ye(Le(i.longitude),Le(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Hh(n.arrayValue,e.arrayValue);case 10:return function(i,a){var l,c,h,d;const p=i.fields||{},m=a.fields||{},E=(l=p[il])===null||l===void 0?void 0:l.arrayValue,k=(c=m[il])===null||c===void 0?void 0:c.arrayValue,N=ye(((h=E==null?void 0:E.values)===null||h===void 0?void 0:h.length)||0,((d=k==null?void 0:k.values)===null||d===void 0?void 0:d.length)||0);return N!==0?N:Hh(E,k)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Di.mapValue&&a===Di.mapValue)return 0;if(i===Di.mapValue)return 1;if(a===Di.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),h=a.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const m=ye(c[p],d[p]);if(m!==0)return m;const E=Gr(l[c[p]],h[d[p]]);if(E!==0)return E}return ye(c.length,d.length)}(n.mapValue,e.mapValue);default:throw ue()}}function $h(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ye(n,e);const t=jn(n),r=jn(e),s=ye(t.seconds,r.seconds);return s!==0?s:ye(t.nanos,r.nanos)}function Hh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Gr(t[s],r[s]);if(i)return i}return ye(t.length,r.length)}function Wr(n){return ol(n)}function ol(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=jn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return $n(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return re.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ol(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ol(t.fields[a])}`;return s+"}"}(n.mapValue):ue()}function Hi(n){switch(Hn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Lo(n);return e?16+Hi(e):16;case 5:return 2*n.stringValue.length;case 6:return $n(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Hi(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return ii(r.fields,(i,a)=>{s+=i.length+Hi(a)}),s}(n.mapValue);default:throw ue()}}function al(n){return!!n&&"integerValue"in n}function nc(n){return!!n&&"arrayValue"in n}function qh(n){return!!n&&"nullValue"in n}function zh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Pa(n){return!!n&&"mapValue"in n}function iA(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[nA])===null||t===void 0?void 0:t.stringValue)===sA}function Vs(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return ii(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Vs(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Vs(n.arrayValue.values[t]);return e}return Object.assign({},n)}function oA(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===rA}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.value=e}static empty(){return new qt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Pa(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Vs(t)}setAll(e){let t=pt.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=Vs(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Pa(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Yt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Pa(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){ii(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new qt(Vs(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new st(e,0,oe.min(),oe.min(),oe.min(),qt.empty(),0)}static newFoundDocument(e,t,r,s){return new st(e,1,t,oe.min(),r,s,0)}static newNoDocument(e,t){return new st(e,2,t,oe.min(),oe.min(),qt.empty(),0)}static newUnknownDocument(e,t){return new st(e,3,t,oe.min(),oe.min(),qt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(oe.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=oe.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof st&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new st(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e,t){this.position=e,this.inclusive=t}}function Kh(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=re.comparator(re.fromName(a.referenceValue),t.key):r=Gr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Yt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t="asc"){this.field=e,this.dir=t}}function aA(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{}class $e extends ng{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new cA(e,t,r):t==="array-contains"?new fA(e,r):t==="in"?new dA(e,r):t==="not-in"?new pA(e,r):t==="array-contains-any"?new gA(e,r):new $e(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new uA(e,r):new hA(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Gr(t,this.value)):t!==null&&Hn(this.value)===Hn(t)&&this.matchesComparison(Gr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ue()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Zt extends ng{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Zt(e,t)}matches(e){return rg(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function rg(n){return n.op==="and"}function sg(n){return lA(n)&&rg(n)}function lA(n){for(const e of n.filters)if(e instanceof Zt)return!1;return!0}function ll(n){if(n instanceof $e)return n.field.canonicalString()+n.op.toString()+Wr(n.value);if(sg(n))return n.filters.map(e=>ll(e)).join(",");{const e=n.filters.map(t=>ll(t)).join(",");return`${n.op}(${e})`}}function ig(n,e){return n instanceof $e?function(r,s){return s instanceof $e&&r.op===s.op&&r.field.isEqual(s.field)&&Yt(r.value,s.value)}(n,e):n instanceof Zt?function(r,s){return s instanceof Zt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&ig(a,s.filters[l]),!0):!1}(n,e):void ue()}function og(n){return n instanceof $e?function(t){return`${t.field.canonicalString()} ${t.op} ${Wr(t.value)}`}(n):n instanceof Zt?function(t){return t.op.toString()+" {"+t.getFilters().map(og).join(" ,")+"}"}(n):"Filter"}class cA extends $e{constructor(e,t,r){super(e,t,r),this.key=re.fromName(r.referenceValue)}matches(e){const t=re.comparator(e.key,this.key);return this.matchesComparison(t)}}class uA extends $e{constructor(e,t){super(e,"in",t),this.keys=ag("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class hA extends $e{constructor(e,t){super(e,"not-in",t),this.keys=ag("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ag(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>re.fromName(r.referenceValue))}class fA extends $e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return nc(t)&&Js(t.arrayValue,this.value)}}class dA extends $e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Js(this.value.arrayValue,t)}}class pA extends $e{constructor(e,t){super(e,"not-in",t)}matches(e){if(Js(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Js(this.value.arrayValue,t)}}class gA extends $e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!nc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Js(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.le=null}}function Wh(n,e=null,t=[],r=[],s=null,i=null,a=null){return new mA(n,e,t,r,s,i,a)}function rc(n){const e=ve(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ll(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Mo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Wr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Wr(r)).join(",")),e.le=t}return e.le}function sc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!aA(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ig(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Gh(n.startAt,e.startAt)&&Gh(n.endAt,e.endAt)}function cl(n){return re.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=c,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function _A(n,e,t,r,s,i,a,l){return new Fo(n,e,t,r,s,i,a,l)}function ic(n){return new Fo(n)}function Qh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function yA(n){return n.collectionGroup!==null}function xs(n){const e=ve(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new He(pt.comparator);return a.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new uo(i,r))}),t.has(pt.keyField().canonicalString())||e.he.push(new uo(pt.keyField(),r))}return e.he}function Wt(n){const e=ve(n);return e.Pe||(e.Pe=vA(e,xs(n))),e.Pe}function vA(n,e){if(n.limitType==="F")return Wh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new uo(s.field,i)});const t=n.endAt?new co(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new co(n.startAt.position,n.startAt.inclusive):null;return Wh(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ul(n,e,t){return new Fo(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Uo(n,e){return sc(Wt(n),Wt(e))&&n.limitType===e.limitType}function lg(n){return`${rc(Wt(n))}|lt:${n.limitType}`}function Rr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>og(s)).join(", ")}]`),Mo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Wr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Wr(s)).join(",")),`Target(${r})`}(Wt(n))}; limitType=${n.limitType})`}function Bo(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):re.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of xs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,c){const h=Kh(a,l,c);return a.inclusive?h<=0:h<0}(r.startAt,xs(r),s)||r.endAt&&!function(a,l,c){const h=Kh(a,l,c);return a.inclusive?h>=0:h>0}(r.endAt,xs(r),s))}(n,e)}function EA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function cg(n){return(e,t)=>{let r=!1;for(const s of xs(n)){const i=TA(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function TA(n,e,t){const r=n.field.isKeyField()?re.comparator(e.key,t.key):function(i,a,l){const c=a.data.field(i),h=l.data.field(i);return c!==null&&h!==null?Gr(c,h):ue()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ue()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){ii(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return ZI(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wA=new Fe(re.comparator);function qn(){return wA}const ug=new Fe(re.comparator);function Ts(...n){let e=ug;for(const t of n)e=e.insert(t.key,t);return e}function IA(n){let e=ug;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function or(){return Ms()}function hg(){return Ms()}function Ms(){return new mr(n=>n.toString(),(n,e)=>n.isEqual(e))}const AA=new He(re.comparator);function Ee(...n){let e=AA;for(const t of n)e=e.add(t);return e}const bA=new He(ye);function RA(){return bA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SA(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:sl(e)?"-0":e}}function CA(n){return{integerValue:""+n}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(){this._=void 0}}function PA(n,e,t){return n instanceof hl?function(s,i){const a={fields:{[Zp]:{stringValue:Yp},[tg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&tc(i)&&(i=Lo(i)),i&&(a.fields[eg]=i),{mapValue:a}}(t,e):n instanceof ho?fg(n,e):n instanceof fo?dg(n,e):function(s,i){const a=DA(s,i),l=Jh(a)+Jh(s.Ie);return al(a)&&al(s.Ie)?CA(l):SA(s.serializer,l)}(n,e)}function kA(n,e,t){return n instanceof ho?fg(n,e):n instanceof fo?dg(n,e):t}function DA(n,e){return n instanceof fl?function(r){return al(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class hl extends jo{}class ho extends jo{constructor(e){super(),this.elements=e}}function fg(n,e){const t=pg(e);for(const r of n.elements)t.some(s=>Yt(s,r))||t.push(r);return{arrayValue:{values:t}}}class fo extends jo{constructor(e){super(),this.elements=e}}function dg(n,e){let t=pg(e);for(const r of n.elements)t=t.filter(s=>!Yt(s,r));return{arrayValue:{values:t}}}class fl extends jo{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Jh(n){return Le(n.integerValue||n.doubleValue)}function pg(n){return nc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function OA(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ho&&s instanceof ho||r instanceof fo&&s instanceof fo?Kr(r.elements,s.elements,Yt):r instanceof fl&&s instanceof fl?Yt(r.Ie,s.Ie):r instanceof hl&&s instanceof hl}(n.transform,e.transform)}class cr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new cr}static exists(e){return new cr(void 0,e)}static updateTime(e){return new cr(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function qi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class oc{}function gg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new VA(n.key,cr.none()):new ac(n.key,n.data,cr.none());{const t=n.data,r=qt.empty();let s=new He(pt.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new $o(n.key,r,new Dn(s.toArray()),cr.none())}}function NA(n,e,t){n instanceof ac?function(s,i,a){const l=s.value.clone(),c=Yh(s.fieldTransforms,i,a.transformResults);l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof $o?function(s,i,a){if(!qi(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Yh(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(mg(s)),c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Ls(n,e,t,r){return n instanceof ac?function(i,a,l,c){if(!qi(i.precondition,a))return l;const h=i.value.clone(),d=Zh(i.fieldTransforms,c,a);return h.setAll(d),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof $o?function(i,a,l,c){if(!qi(i.precondition,a))return l;const h=Zh(i.fieldTransforms,c,a),d=a.data;return d.setAll(mg(i)),d.setAll(h),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,l){return qi(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Xh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Kr(r,s,(i,a)=>OA(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ac extends oc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class $o extends oc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function mg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Yh(n,e,t){const r=new Map;xe(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,kA(a,l,t[s]))}return r}function Zh(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,PA(i,a,e))}return r}class VA extends oc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&NA(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ls(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ls(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=hg();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const c=gg(a,l);c!==null&&r.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(oe.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ee())}isEqual(e){return this.batchId===e.batchId&&Kr(this.mutations,e.mutations,(t,r)=>Xh(t,r))&&Kr(this.baseMutations,e.baseMutations,(t,r)=>Xh(t,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MA{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Be,_e;function _g(n){if(n===void 0)return pn("GRPC error has no .code"),H.UNKNOWN;switch(n){case Be.OK:return H.OK;case Be.CANCELLED:return H.CANCELLED;case Be.UNKNOWN:return H.UNKNOWN;case Be.DEADLINE_EXCEEDED:return H.DEADLINE_EXCEEDED;case Be.RESOURCE_EXHAUSTED:return H.RESOURCE_EXHAUSTED;case Be.INTERNAL:return H.INTERNAL;case Be.UNAVAILABLE:return H.UNAVAILABLE;case Be.UNAUTHENTICATED:return H.UNAUTHENTICATED;case Be.INVALID_ARGUMENT:return H.INVALID_ARGUMENT;case Be.NOT_FOUND:return H.NOT_FOUND;case Be.ALREADY_EXISTS:return H.ALREADY_EXISTS;case Be.PERMISSION_DENIED:return H.PERMISSION_DENIED;case Be.FAILED_PRECONDITION:return H.FAILED_PRECONDITION;case Be.ABORTED:return H.ABORTED;case Be.OUT_OF_RANGE:return H.OUT_OF_RANGE;case Be.UNIMPLEMENTED:return H.UNIMPLEMENTED;case Be.DATA_LOSS:return H.DATA_LOSS;default:return ue()}}(_e=Be||(Be={}))[_e.OK=0]="OK",_e[_e.CANCELLED=1]="CANCELLED",_e[_e.UNKNOWN=2]="UNKNOWN",_e[_e.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",_e[_e.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",_e[_e.NOT_FOUND=5]="NOT_FOUND",_e[_e.ALREADY_EXISTS=6]="ALREADY_EXISTS",_e[_e.PERMISSION_DENIED=7]="PERMISSION_DENIED",_e[_e.UNAUTHENTICATED=16]="UNAUTHENTICATED",_e[_e.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",_e[_e.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",_e[_e.ABORTED=10]="ABORTED",_e[_e.OUT_OF_RANGE=11]="OUT_OF_RANGE",_e[_e.UNIMPLEMENTED=12]="UNIMPLEMENTED",_e[_e.INTERNAL=13]="INTERNAL",_e[_e.UNAVAILABLE=14]="UNAVAILABLE",_e[_e.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FA(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UA=new Ln([4294967295,4294967295],0);function ef(n){const e=FA().encode(n),t=new $p;return t.update(e),new Uint8Array(t.digest())}function tf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ln([t,r],0),new Ln([s,i],0)]}class lc{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ws(`Invalid padding: ${t}`);if(r<0)throw new ws(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ws(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ws(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=Ln.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(Ln.fromNumber(r)));return s.compare(UA)===1&&(s=new Ln([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=ef(e),[r,s]=tf(t);for(let i=0;i<this.hashCount;i++){const a=this.Ae(r,s,i);if(!this.Re(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new lc(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ee===0)return;const t=ef(e),[r,s]=tf(t);for(let i=0;i<this.hashCount;i++){const a=this.Ae(r,s,i);this.Ve(a)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ws extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,oi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ho(oe.min(),s,new Fe(ye),qn(),Ee())}}class oi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new oi(r,t,Ee(),Ee(),Ee())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class yg{constructor(e,t){this.targetId=e,this.ge=t}}class vg{constructor(e,t,r=Qe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class nf{constructor(){this.pe=0,this.ye=rf(),this.we=Qe.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=Ee(),t=Ee(),r=Ee();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:ue()}}),new oi(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=rf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,xe(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class BA{constructor(e){this.ke=e,this.qe=new Map,this.Qe=qn(),this.$e=Oi(),this.Ke=Oi(),this.Ue=new Fe(ye)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:ue()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(cl(i))if(r===0){const a=new re(i.path);this.ze(t,a,st.newNoDocument(a,oe.min()))}else xe(r===1);else{const a=this.et(t);if(a!==r){const l=this.tt(e),c=l?this.nt(l,e,a):1;if(c!==0){this.Ye(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ue=this.Ue.insert(t,h)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=$n(r).toUint8Array()}catch(c){if(c instanceof Xp)return zr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new lc(a,s,i)}catch(c){return zr(c instanceof ws?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ee===0?null:l}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.ke.it(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,a)=>{const l=this.Xe(a);if(l){if(i.current&&cl(l.target)){const c=new re(l.target.path);this._t(c).has(a)||this.ut(a,c)||this.ze(a,c,st.newNoDocument(c,e))}i.ve&&(t.set(a,i.Fe()),i.Me())}});let r=Ee();this.Ke.forEach((i,a)=>{let l=!0;a.forEachWhile(c=>{const h=this.Xe(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.Qe.forEach((i,a)=>a.setReadTime(e));const s=new Ho(e,t,this.Ue,this.Qe,r);return this.Qe=qn(),this.$e=Oi(),this.Ke=Oi(),this.Ue=new Fe(ye),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ke=this.Ke.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ke=this.Ke.insert(t,this.ct(t).delete(e)),this.Ke=this.Ke.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new nf,this.qe.set(e,t)),t}ct(e){let t=this.Ke.get(e);return t||(t=new He(ye),this.Ke=this.Ke.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new He(ye),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||X("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new nf),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function Oi(){return new Fe(re.comparator)}function rf(){return new Fe(re.comparator)}const jA={asc:"ASCENDING",desc:"DESCENDING"},$A={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},HA={and:"AND",or:"OR"};class qA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function dl(n,e){return n.useProto3Json||Mo(e)?e:{value:e}}function zA(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function KA(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Fr(n){return xe(!!n),oe.fromTimestamp(function(t){const r=jn(t);return new _t(r.seconds,r.nanos)}(n))}function GA(n,e){return pl(n,e).canonicalString()}function pl(n,e){const t=function(s){return new De(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Eg(n){const e=De.fromString(n);return xe(bg(e)),e}function ka(n,e){const t=Eg(e);if(t.get(1)!==n.databaseId.projectId)throw new ee(H.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new ee(H.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new re(wg(t))}function Tg(n,e){return GA(n.databaseId,e)}function WA(n){const e=Eg(n);return e.length===4?De.emptyPath():wg(e)}function sf(n){return new De(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function wg(n){return xe(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function QA(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ue()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,d){return h.useProto3Json?(xe(d===void 0||typeof d=="string"),Qe.fromBase64String(d||"")):(xe(d===void 0||d instanceof Buffer||d instanceof Uint8Array),Qe.fromUint8Array(d||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const d=h.code===void 0?H.UNKNOWN:_g(h.code);return new ee(d,h.message||"")}(a);t=new vg(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ka(n,r.document.name),i=Fr(r.document.updateTime),a=r.document.createTime?Fr(r.document.createTime):oe.min(),l=new qt({mapValue:{fields:r.document.fields}}),c=st.newFoundDocument(s,i,a,l),h=r.targetIds||[],d=r.removedTargetIds||[];t=new zi(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ka(n,r.document),i=r.readTime?Fr(r.readTime):oe.min(),a=st.newNoDocument(s,i),l=r.removedTargetIds||[];t=new zi([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ka(n,r.document),i=r.removedTargetIds||[];t=new zi([],i,s,null)}else{if(!("filter"in e))return ue();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new LA(s,i),l=r.targetId;t=new yg(l,a)}}return t}function JA(n,e){return{documents:[Tg(n,e.path)]}}function XA(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Tg(n,s);const i=function(h){if(h.length!==0)return Ag(Zt.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(d=>function(m){return{field:Sr(m.field),direction:e0(m.dir)}}(d))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=dl(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ht:t,parent:s}}function YA(n){let e=WA(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){xe(r===1);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=function(p){const m=Ig(p);return m instanceof Zt&&sg(m)?m.getFilters():[m]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(m=>function(k){return new uo(Cr(k.field),function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,Mo(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(p){const m=!!p.before,E=p.values||[];return new co(E,m)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const m=!p.before,E=p.values||[];return new co(E,m)}(t.endAt)),_A(e,s,a,i,l,"F",c,h)}function ZA(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ue()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ig(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Cr(t.unaryFilter.field);return $e.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cr(t.unaryFilter.field);return $e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cr(t.unaryFilter.field);return $e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Cr(t.unaryFilter.field);return $e.create(a,"!=",{nullValue:"NULL_VALUE"});default:return ue()}}(n):n.fieldFilter!==void 0?function(t){return $e.create(Cr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ue()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Zt.create(t.compositeFilter.filters.map(r=>Ig(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ue()}}(t.compositeFilter.op))}(n):ue()}function e0(n){return jA[n]}function t0(n){return $A[n]}function n0(n){return HA[n]}function Sr(n){return{fieldPath:n.canonicalString()}}function Cr(n){return pt.fromServerFormat(n.fieldPath)}function Ag(n){return n instanceof $e?function(t){if(t.op==="=="){if(zh(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NAN"}};if(qh(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(zh(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NOT_NAN"}};if(qh(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Sr(t.field),op:t0(t.op),value:t.value}}}(n):n instanceof Zt?function(t){const r=t.getFilters().map(s=>Ag(s));return r.length===1?r[0]:{compositeFilter:{op:n0(t.op),filters:r}}}(n):ue()}function bg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,t,r,s,i=oe.min(),a=oe.min(),l=Qe.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new On(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new On(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new On(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new On(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r0{constructor(e){this.Tt=e}}function s0(n){const e=YA({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ul(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(){this.Tn=new o0}addToCollectionParentIndex(e,t){return this.Tn.add(t),x.resolve()}getCollectionParents(e,t){return x.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return x.resolve()}deleteFieldIndex(e,t){return x.resolve()}deleteAllFieldIndexes(e){return x.resolve()}createTargetIndexes(e,t){return x.resolve()}getDocumentsMatchingTarget(e,t){return x.resolve(null)}getIndexType(e,t){return x.resolve(0)}getFieldIndexes(e,t){return x.resolve([])}getNextCollectionGroupToUpdate(e){return x.resolve(null)}getMinOffset(e,t){return x.resolve(Bn.min())}getMinOffsetFromCollectionGroup(e,t){return x.resolve(Bn.min())}updateCollectionGroup(e,t,r){return x.resolve()}updateIndexEntries(e,t){return x.resolve()}}class o0{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new He(De.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new He(De.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Rg=41943040;class mt{static withCacheSize(e){return new mt(e,mt.DEFAULT_COLLECTION_PERCENTILE,mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mt.DEFAULT_COLLECTION_PERCENTILE=10,mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,mt.DEFAULT=new mt(Rg,mt.DEFAULT_COLLECTION_PERCENTILE,mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),mt.DISABLED=new mt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Kn(){return new Qr(0)}static Un(){return new Qr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const af="LruGarbageCollector",a0=1048576;function lf([n,e],[t,r]){const s=ye(n,t);return s===0?ye(e,r):s}class l0{constructor(e){this.Hn=e,this.buffer=new He(lf),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();lf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class c0{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){X(af,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ts(t)?X(af,"Ignoring IndexedDB error during garbage collection: ",t):await Vo(t)}await this.er(3e5)})}}class u0{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return x.resolve(xo.ae);const r=new l0(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(X("LruGarbageCollector","Garbage collection skipped; disabled"),x.resolve(of)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(X("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),of):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,a,l,c,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(X("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),br()<=pe.DEBUG&&X("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-d}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(c-l)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-d}ms`),x.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function h0(n,e){return new u0(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f0{constructor(){this.changes=new mr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,st.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?x.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d0{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p0{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Ls(r.mutation,s,Dn.empty(),_t.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Ee()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Ee()){const s=or();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Ts();return i.forEach((l,c)=>{a=a.insert(l,c.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=or();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Ee()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=qn();const a=Ms(),l=function(){return Ms()}();return t.forEach((c,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof $o)?i=i.insert(h.key,h):d!==void 0?(a.set(h.key,d.mutation.getFieldMask()),Ls(d.mutation,h,d.mutation.getFieldMask(),_t.now())):a.set(h.key,Dn.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,d)=>a.set(h,d)),t.forEach((h,d)=>{var p;return l.set(h,new d0(d,(p=a.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const r=Ms();let s=new Fe((a,l)=>a-l),i=Ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let d=r.get(c)||Dn.empty();d=l.applyToLocalView(h,d),r.set(c,d);const p=(s.get(l.batchId)||Ee()).add(c);s=s.insert(l.batchId,p)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,d=c.value,p=hg();d.forEach(m=>{if(!i.has(m)){const E=gg(t.get(m),r.get(m));E!==null&&p.set(m,E),i=i.add(m)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return x.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return re.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):yA(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):x.resolve(or());let l=Gs,c=i;return a.next(h=>x.forEach(h,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?x.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{c=c.insert(d,m)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,Ee())).next(d=>({batchId:l,changes:IA(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new re(t)).next(r=>{let s=Ts();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Ts();return this.indexManager.getCollectionParents(e,i).next(l=>x.forEach(l,c=>{const h=function(p,m){return new Fo(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(d=>{d.forEach((p,m)=>{a=a.insert(p,m)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((c,h)=>{const d=h.getKey();a.get(d)===null&&(a=a.insert(d,st.newInvalidDocument(d)))});let l=Ts();return a.forEach((c,h)=>{const d=i.get(c);d!==void 0&&Ls(d.mutation,h,Dn.empty(),_t.now()),Bo(t,h)&&(l=l.insert(c,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g0{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return x.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Fr(s.createTime)}}(t)),x.resolve()}getNamedQuery(e,t){return x.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:s0(s.bundledQuery),readTime:Fr(s.readTime)}}(t)),x.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m0{constructor(){this.overlays=new Fe(re.comparator),this.Rr=new Map}getOverlay(e,t){return x.resolve(this.overlays.get(t))}getOverlays(e,t){const r=or();return x.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),x.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),x.resolve()}getOverlaysForCollection(e,t,r){const s=or(),i=t.length+1,a=new re(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return x.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Fe((h,d)=>h-d);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=or(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const l=or(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,d)=>l.set(h,d)),!(l.size()>=s)););return x.resolve(l)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new MA(t,r));let i=this.Rr.get(t);i===void 0&&(i=Ee(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _0{constructor(){this.sessionToken=Qe.EMPTY_BYTE_STRING}getSessionToken(e){return x.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,x.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(){this.Vr=new He(qe.mr),this.gr=new He(qe.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new qe(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new qe(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new re(new De([])),r=new qe(t,e),s=new qe(t,e+1),i=[];return this.gr.forEachInRange([r,s],a=>{this.wr(a),i.push(a.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new re(new De([])),r=new qe(t,e),s=new qe(t,e+1);let i=Ee();return this.gr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new qe(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class qe{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return re.comparator(e.key,t.key)||ye(e.Cr,t.Cr)}static pr(e,t){return ye(e.Cr,t.Cr)||re.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y0{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new He(qe.mr)}checkEmpty(e){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new xA(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Mr=this.Mr.add(new qe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return x.resolve(a)}lookupMutationBatch(e,t){return x.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return x.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?JI:this.Fr-1)}getAllMutationBatches(e){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new qe(t,0),s=new qe(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],a=>{const l=this.Or(a.Cr);i.push(l)}),x.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new He(ye);return t.forEach(s=>{const i=new qe(s,0),a=new qe(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,a],l=>{r=r.add(l.Cr)})}),x.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;re.isDocumentKey(i)||(i=i.child(""));const a=new qe(new re(i),0);let l=new He(ye);return this.Mr.forEachWhile(c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.Cr)),!0)},a),x.resolve(this.Br(l))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){xe(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return x.forEach(t.mutations,s=>{const i=new qe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new qe(t,0),s=this.Mr.firstAfterOrEqual(r);return x.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,x.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v0{constructor(e){this.kr=e,this.docs=function(){return new Fe(re.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return x.resolve(r?r.document.mutableCopy():st.newInvalidDocument(t))}getEntries(e,t){let r=qn();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():st.newInvalidDocument(s))}),x.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=qn();const a=t.path,l=new re(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||KI(zI(d),r)<=0||(s.has(d.key)||Bo(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return x.resolve(i)}getAllFromCollectionGroup(e,t,r,s){ue()}qr(e,t){return x.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new E0(this)}getSize(e){return x.resolve(this.size)}}class E0 extends f0{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),x.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T0{constructor(e){this.persistence=e,this.Qr=new mr(t=>rc(t),sc),this.lastRemoteSnapshotVersion=oe.min(),this.highestTargetId=0,this.$r=0,this.Kr=new cc,this.targetCount=0,this.Ur=Qr.Kn()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),x.resolve()}getLastRemoteSnapshotVersion(e){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return x.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Ur.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),x.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Ur=new Qr(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,x.resolve()}updateTargetData(e,t){return this.zn(t),x.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Kr.br(t.targetId),this.targetCount-=1,x.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.Qr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),x.waitFor(i).next(()=>s)}getTargetCount(e){return x.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return x.resolve(r)}addMatchingKeys(e,t,r){return this.Kr.yr(t,r),x.resolve()}removeMatchingKeys(e,t,r){this.Kr.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),x.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Kr.br(t),x.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Kr.vr(t);return x.resolve(r)}containsKey(e,t){return x.resolve(this.Kr.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new xo(0),this.zr=!1,this.zr=!0,this.jr=new _0,this.referenceDelegate=e(this),this.Hr=new T0(this),this.indexManager=new i0,this.remoteDocumentCache=function(s){return new v0(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new r0(t),this.Yr=new g0(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new m0,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new y0(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){X("MemoryPersistence","Starting transaction:",e);const s=new w0(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return x.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class w0 extends WI{constructor(e){super(),this.currentSequenceNumber=e}}class uc{constructor(e){this.persistence=e,this.ti=new cc,this.ni=null}static ri(e){return new uc(e)}get ii(){if(this.ni)return this.ni;throw ue()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),x.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),x.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),x.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.ii,r=>{const s=re.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,oe.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return x.or([()=>x.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class po{constructor(e,t){this.persistence=e,this.oi=new mr(r=>XI(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=h0(this,t)}static ri(e,t){return new po(e,t)}Zr(){}Xr(e){return x.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return x.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?x.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,a=>this.ar(e,a,t).next(l=>{l||(r++,i.removeEntry(a,oe.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),x.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),x.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),x.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),x.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Hi(e.data.value)),t}ar(e,t,r){return x.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return x.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=Ee(),s=Ee();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new hc(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A0{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return yE()?8:QI(ct())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new I0;return this._s(e,t,a).next(l=>{if(i.result=l,this.Xi)return this.us(e,t,a,l.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(br()<=pe.DEBUG&&X("QueryEngine","SDK will not create cache indexes for query:",Rr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),x.resolve()):(br()<=pe.DEBUG&&X("QueryEngine","Query:",Rr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(br()<=pe.DEBUG&&X("QueryEngine","The SDK decides to create cache indexes for query:",Rr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Wt(t))):x.resolve())}rs(e,t){if(Qh(t))return x.resolve(null);let r=Wt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ul(t,null,"F"),r=Wt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=Ee(...i);return this.ns.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const h=this.cs(t,l);return this.ls(t,h,a,c.readTime)?this.rs(e,ul(t,null,"F")):this.hs(e,h,t,c)}))})))}ss(e,t,r,s){return Qh(t)||s.isEqual(oe.min())?x.resolve(null):this.ns.getDocuments(e,r).next(i=>{const a=this.cs(t,i);return this.ls(t,a,r,s)?x.resolve(null):(br()<=pe.DEBUG&&X("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Rr(t)),this.hs(e,a,t,qI(s,Gs)).next(l=>l))})}cs(e,t){let r=new He(cg(e));return t.forEach((s,i)=>{Bo(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return br()<=pe.DEBUG&&X("QueryEngine","Using full collection scan to execute query:",Rr(t)),this.ns.getDocumentsMatchingQuery(e,t,Bn.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc="LocalStore",b0=3e8;class R0{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new Fe(ye),this.Is=new mr(i=>rc(i),sc),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new p0(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function S0(n,e,t,r){return new R0(n,e,t,r)}async function Cg(n,e){const t=ve(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let c=Ee();for(const h of s){a.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){l.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return t.localDocuments.getDocuments(r,c).next(h=>({Rs:h,removedBatchIds:a,addedBatchIds:l}))})})}function Pg(n){const e=ve(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function C0(n,e){const t=ve(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const l=[];e.targetChanges.forEach((d,p)=>{const m=s.get(p);if(!m)return;l.push(t.Hr.removeMatchingKeys(i,d.removedDocuments,p).next(()=>t.Hr.addMatchingKeys(i,d.addedDocuments,p)));let E=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?E=E.withResumeToken(Qe.EMPTY_BYTE_STRING,oe.min()).withLastLimboFreeSnapshotVersion(oe.min()):d.resumeToken.approximateByteSize()>0&&(E=E.withResumeToken(d.resumeToken,r)),s=s.insert(p,E),function(N,L,K){return N.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=b0?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(m,E,d)&&l.push(t.Hr.updateTargetData(i,E))});let c=qn(),h=Ee();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))}),l.push(P0(i,a,e.documentUpdates).next(d=>{c=d.Vs,h=d.fs})),!r.isEqual(oe.min())){const d=t.Hr.getLastRemoteSnapshotVersion(i).next(p=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(d)}return x.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(t.Ts=s,i))}function P0(n,e,t){let r=Ee(),s=Ee();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=qn();return t.forEach((l,c)=>{const h=i.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(oe.min())?(e.removeEntry(l,c.readTime),a=a.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),a=a.insert(l,c)):X(fc,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Vs:a,fs:s}})}function k0(n,e){const t=ve(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,x.resolve(s)):t.Hr.allocateTargetId(r).next(a=>(s=new On(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function gl(n,e,t){const r=ve(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ts(a))throw a;X(fc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function cf(n,e,t){const r=ve(n);let s=oe.min(),i=Ee();return r.persistence.runTransaction("Execute query","readwrite",a=>function(c,h,d){const p=ve(c),m=p.Is.get(d);return m!==void 0?x.resolve(p.Ts.get(m)):p.Hr.getTargetData(h,d)}(r,a,Wt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(a,l.targetId).next(c=>{i=c})}).next(()=>r.Ps.getDocumentsMatchingQuery(a,e,t?s:oe.min(),t?i:Ee())).next(l=>(D0(r,EA(e),l),{documents:l,gs:i})))}function D0(n,e,t){let r=n.Es.get(e)||oe.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class uf{constructor(){this.activeTargetIds=RA()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class O0{constructor(){this.ho=new uf,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new uf,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N0{To(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hf="ConnectivityMonitor";class ff{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){X(hf,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){X(hf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ni=null;function ml(){return Ni===null?Ni=function(){return 268435456+Math.round(2147483648*Math.random())}():Ni++,"0x"+Ni.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="RestConnection",V0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class x0{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===lo?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const a=ml(),l=this.bo(e,t.toUriEncodedString());X(Da,`Sending RPC '${e}' ${a}:`,l,r);const c={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(c,s,i),this.vo(e,l,c,r).then(h=>(X(Da,`Received RPC '${e}' ${a}: `,h),h),h=>{throw zr(Da,`RPC '${e}' ${a} failed with error: `,h,"url: ",l,"request:",r),h})}Co(e,t,r,s,i,a){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+es}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=V0[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M0{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Ko(e){this.ko(e)}Uo(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="WebChannelConnection";class L0 extends x0{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=ml();return new Promise((a,l)=>{const c=new Hp;c.setWithCredentials(!0),c.listenOnce(qp.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case $i.NO_ERROR:const d=c.getResponseJson();X(et,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(d)),a(d);break;case $i.TIMEOUT:X(et,`RPC '${e}' ${i} timed out`),l(new ee(H.DEADLINE_EXCEEDED,"Request time out"));break;case $i.HTTP_ERROR:const p=c.getStatus();if(X(et,`RPC '${e}' ${i} failed with status:`,p,"response text:",c.getResponseText()),p>0){let m=c.getResponseJson();Array.isArray(m)&&(m=m[0]);const E=m==null?void 0:m.error;if(E&&E.status&&E.message){const k=function(L){const K=L.toLowerCase().replace(/_/g,"-");return Object.values(H).indexOf(K)>=0?K:H.UNKNOWN}(E.status);l(new ee(k,E.message))}else l(new ee(H.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new ee(H.UNAVAILABLE,"Connection failed."));break;default:ue()}}finally{X(et,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);X(et,`RPC '${e}' ${i} sending request:`,s),c.send(t,"POST",h,r,15)})}Wo(e,t,r){const s=ml(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Gp(),l=Kp(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Do(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const d=i.join("");X(et,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=a.createWebChannel(d,c);let m=!1,E=!1;const k=new M0({Fo:L=>{E?X(et,`Not sending because RPC '${e}' stream ${s} is closed:`,L):(m||(X(et,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),X(et,`RPC '${e}' stream ${s} sending:`,L),p.send(L))},Mo:()=>p.close()}),N=(L,K,B)=>{L.listen(K,q=>{try{B(q)}catch(z){setTimeout(()=>{throw z},0)}})};return N(p,Es.EventType.OPEN,()=>{E||(X(et,`RPC '${e}' stream ${s} transport opened.`),k.Qo())}),N(p,Es.EventType.CLOSE,()=>{E||(E=!0,X(et,`RPC '${e}' stream ${s} transport closed`),k.Ko())}),N(p,Es.EventType.ERROR,L=>{E||(E=!0,zr(et,`RPC '${e}' stream ${s} transport errored:`,L),k.Ko(new ee(H.UNAVAILABLE,"The operation could not be completed")))}),N(p,Es.EventType.MESSAGE,L=>{var K;if(!E){const B=L.data[0];xe(!!B);const q=B,z=(q==null?void 0:q.error)||((K=q[0])===null||K===void 0?void 0:K.error);if(z){X(et,`RPC '${e}' stream ${s} received error:`,z);const he=z.status;let fe=function(w){const A=Be[w];if(A!==void 0)return _g(A)}(he),I=z.message;fe===void 0&&(fe=H.INTERNAL,I="Unknown error status: "+he+" with message "+z.message),E=!0,k.Ko(new ee(fe,I)),p.close()}else X(et,`RPC '${e}' stream ${s} received:`,B),k.Uo(B)}}),N(l,zp.STAT_EVENT,L=>{L.stat===rl.PROXY?X(et,`RPC '${e}' stream ${s} detected buffering proxy`):L.stat===rl.NOPROXY&&X(et,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.$o()},0),k}}function Oa(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kg(n){return new qA(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&X("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const df="PersistentStream";class F0{constructor(e,t,r,s,i,a,l,c){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new Dg(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===H.RESOURCE_EXHAUSTED?(pn(t.toString()),pn("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===H.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new ee(H.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return X(df,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(X(df,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class U0 extends F0{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=QA(this.serializer,e),r=function(i){if(!("targetChange"in i))return oe.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?oe.min():a.readTime?Fr(a.readTime):oe.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=sf(this.serializer),t.addTarget=function(i,a){let l;const c=a.target;if(l=cl(c)?{documents:JA(i,c)}:{query:XA(i,c).ht},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=KA(i,a.resumeToken);const h=dl(i,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(oe.min())>0){l.readTime=zA(i,a.snapshotVersion.toTimestamp());const h=dl(i,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=ZA(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=sf(this.serializer),t.removeTarget=e,this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B0{}class j0 extends B0{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new ee(H.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.So(e,pl(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===H.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new ee(H.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Co(e,pl(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===H.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new ee(H.UNKNOWN,a.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class $0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(pn(t),this.N_=!1):X("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr="RemoteStore";class H0{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.K_=[],this.U_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(a=>{r.enqueueAndForget(async()=>{li(this)&&(X(Jr,"Restarting streams for network reachability change."),await async function(c){const h=ve(c);h.W_.add(4),await ai(h),h.j_.set("Unknown"),h.W_.delete(4),await qo(h)}(this))})}),this.j_=new $0(r,s)}}async function qo(n){if(li(n))for(const e of n.G_)await e(!0)}async function ai(n){for(const e of n.G_)await e(!1)}function Og(n,e){const t=ve(n);t.U_.has(e.targetId)||(t.U_.set(e.targetId,e),mc(t)?gc(t):ns(t).c_()&&pc(t,e))}function dc(n,e){const t=ve(n),r=ns(t);t.U_.delete(e),r.c_()&&Ng(t,e),t.U_.size===0&&(r.c_()?r.P_():li(t)&&t.j_.set("Unknown"))}function pc(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(oe.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ns(n).y_(e)}function Ng(n,e){n.H_.Ne(e),ns(n).w_(e)}function gc(n){n.H_=new BA({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.U_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),ns(n).start(),n.j_.B_()}function mc(n){return li(n)&&!ns(n).u_()&&n.U_.size>0}function li(n){return ve(n).W_.size===0}function Vg(n){n.H_=void 0}async function q0(n){n.j_.set("Online")}async function z0(n){n.U_.forEach((e,t)=>{pc(n,e)})}async function K0(n,e){Vg(n),mc(n)?(n.j_.q_(e),gc(n)):n.j_.set("Unknown")}async function G0(n,e,t){if(n.j_.set("Online"),e instanceof vg&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.U_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.U_.delete(l),s.H_.removeTarget(l))}(n,e)}catch(r){X(Jr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await pf(n,r)}else if(e instanceof zi?n.H_.We(e):e instanceof yg?n.H_.Ze(e):n.H_.je(e),!t.isEqual(oe.min()))try{const r=await Pg(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.H_.ot(a);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.U_.get(h);d&&i.U_.set(h,d.withResumeToken(c.resumeToken,a))}}),l.targetMismatches.forEach((c,h)=>{const d=i.U_.get(c);if(!d)return;i.U_.set(c,d.withResumeToken(Qe.EMPTY_BYTE_STRING,d.snapshotVersion)),Ng(i,c);const p=new On(d.target,c,h,d.sequenceNumber);pc(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){X(Jr,"Failed to raise snapshot:",r),await pf(n,r)}}async function pf(n,e,t){if(!ts(e))throw e;n.W_.add(1),await ai(n),n.j_.set("Offline"),t||(t=()=>Pg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{X(Jr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await qo(n)})}async function gf(n,e){const t=ve(n);t.asyncQueue.verifyOperationInProgress(),X(Jr,"RemoteStore received new credentials");const r=li(t);t.W_.add(3),await ai(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await qo(t)}async function W0(n,e){const t=ve(n);e?(t.W_.delete(2),await qo(t)):e||(t.W_.add(2),await ai(t),t.j_.set("Unknown"))}function ns(n){return n.J_||(n.J_=function(t,r,s){const i=ve(t);return i.M_(),new U0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:q0.bind(null,n),No:z0.bind(null,n),Lo:K0.bind(null,n),p_:G0.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),mc(n)?gc(n):n.j_.set("Unknown")):(await n.J_.stop(),Vg(n))})),n.J_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new _c(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ee(H.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function xg(n,e){if(pn("AsyncQueue",`${e}: ${n}`),ts(n))return new ee(H.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{static emptySet(e){return new Ur(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||re.comparator(t.key,r.key):(t,r)=>re.comparator(t.key,r.key),this.keyedMap=Ts(),this.sortedSet=new Fe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ur)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Ur;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(){this.Z_=new Fe(re.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):ue():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Xr{constructor(e,t,r,s,i,a,l,c,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Xr(e,t,Ur.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Uo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q0{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class J0{constructor(){this.queries=_f(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=ve(t),i=s.queries;s.queries=_f(),i.forEach((a,l)=>{for(const c of l.ta)c.onError(r)})})(this,new ee(H.ABORTED,"Firestore shutting down"))}}function _f(){return new mr(n=>lg(n),Uo)}async function Mg(n,e){const t=ve(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new Q0,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=xg(a,`Initialization of query '${Rr(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&yc(t)}async function Lg(n,e){const t=ve(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.ta.indexOf(e);a>=0&&(i.ta.splice(a,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function X0(n,e){const t=ve(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.ta)l.oa(s)&&(r=!0);a.ea=s}}r&&yc(t)}function Y0(n,e,t){const r=ve(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function yc(n){n.ia.forEach(e=>{e.next()})}var _l,yf;(yf=_l||(_l={}))._a="default",yf.Cache="cache";class Fg{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Xr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=Xr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==_l.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e){this.key=e}}class Bg{constructor(e){this.key=e}}class Z0{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=Ee(),this.mutatedKeys=Ee(),this.ya=cg(e),this.wa=new Ur(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new mf,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,p)=>{const m=s.get(d),E=Bo(this.query,p)?p:null,k=!!m&&this.mutatedKeys.has(m.key),N=!!E&&(E.hasLocalMutations||this.mutatedKeys.has(E.key)&&E.hasCommittedMutations);let L=!1;m&&E?m.data.isEqual(E.data)?k!==N&&(r.track({type:3,doc:E}),L=!0):this.va(m,E)||(r.track({type:2,doc:E}),L=!0,(c&&this.ya(E,c)>0||h&&this.ya(E,h)<0)&&(l=!0)):!m&&E?(r.track({type:0,doc:E}),L=!0):m&&!E&&(r.track({type:1,doc:m}),L=!0,(c||h)&&(l=!0)),L&&(E?(a=a.add(E),i=N?i.add(d):i.delete(d)):(a=a.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const d=this.query.limitType==="F"?a.last():a.first();a=a.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{wa:a,Da:r,ls:l,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const a=e.Da.X_();a.sort((d,p)=>function(E,k){const N=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ue()}};return N(E)-N(k)}(d.type,p.type)||this.ya(d.doc,p.doc)),this.Ca(r),s=s!=null&&s;const l=t&&!s?this.Fa():[],c=this.pa.size===0&&this.current&&!s?1:0,h=c!==this.ga;return this.ga=c,a.length!==0||h?{snapshot:new Xr(this.query,e.wa,i,a,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:l}:{Ma:l}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new mf,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=Ee(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new Bg(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new Ug(r))}),t}Oa(e){this.fa=e.gs,this.pa=Ee();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return Xr.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const vc="SyncEngine";class eb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class tb{constructor(e){this.key=e,this.Ba=!1}}class nb{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.La={},this.ka=new mr(l=>lg(l),Uo),this.qa=new Map,this.Qa=new Set,this.$a=new Fe(re.comparator),this.Ka=new Map,this.Ua=new cc,this.Wa={},this.Ga=new Map,this.za=Qr.Un(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function rb(n,e,t=!0){const r=zg(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await jg(r,e,t,!0),s}async function sb(n,e){const t=zg(n);await jg(t,e,!0,!1)}async function jg(n,e,t,r){const s=await k0(n.localStore,Wt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await ib(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Og(n.remoteStore,s),l}async function ib(n,e,t,r,s){n.Ha=(p,m,E)=>async function(N,L,K,B){let q=L.view.ba(K);q.ls&&(q=await cf(N.localStore,L.query,!1).then(({documents:I})=>L.view.ba(I,q)));const z=B&&B.targetChanges.get(L.targetId),he=B&&B.targetMismatches.get(L.targetId)!=null,fe=L.view.applyChanges(q,N.isPrimaryClient,z,he);return Ef(N,L.targetId,fe.Ma),fe.snapshot}(n,p,m,E);const i=await cf(n.localStore,e,!0),a=new Z0(e,i.gs),l=a.ba(i.documents),c=oi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(l,n.isPrimaryClient,c);Ef(n,t,h.Ma);const d=new eb(e,t,a);return n.ka.set(e,d),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),h.snapshot}async function ob(n,e,t){const r=ve(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(a=>!Uo(a,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await gl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&dc(r.remoteStore,s.targetId),yl(r,s.targetId)}).catch(Vo)):(yl(r,s.targetId),await gl(r.localStore,s.targetId,!0))}async function ab(n,e){const t=ve(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),dc(t.remoteStore,r.targetId))}async function $g(n,e){const t=ve(n);try{const r=await C0(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Ka.get(i);a&&(xe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.Ba=!0:s.modifiedDocuments.size>0?xe(a.Ba):s.removedDocuments.size>0&&(xe(a.Ba),a.Ba=!1))}),await qg(t,r,e)}catch(r){await Vo(r)}}function vf(n,e,t){const r=ve(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,a)=>{const l=a.view.sa(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const c=ve(a);c.onlineState=l;let h=!1;c.queries.forEach((d,p)=>{for(const m of p.ta)m.sa(l)&&(h=!0)}),h&&yc(c)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function lb(n,e,t){const r=ve(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ka.get(e),i=s&&s.key;if(i){let a=new Fe(re.comparator);a=a.insert(i,st.newNoDocument(i,oe.min()));const l=Ee().add(i),c=new Ho(oe.min(),new Map,new Fe(ye),a,l);await $g(r,c),r.$a=r.$a.remove(i),r.Ka.delete(e),Ec(r)}else await gl(r.localStore,e,!1).then(()=>yl(r,e,t)).catch(Vo)}function yl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ua.br(e).forEach(r=>{n.Ua.containsKey(r)||Hg(n,r)})}function Hg(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(dc(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ka.delete(t),Ec(n))}function Ef(n,e,t){for(const r of t)r instanceof Ug?(n.Ua.addReference(r.key,e),cb(n,r)):r instanceof Bg?(X(vc,"Document no longer in limbo: "+r.key),n.Ua.removeReference(r.key,e),n.Ua.containsKey(r.key)||Hg(n,r.key)):ue()}function cb(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(X(vc,"New document in limbo: "+t),n.Qa.add(r),Ec(n))}function Ec(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new re(De.fromString(e)),r=n.za.next();n.Ka.set(r,new tb(t)),n.$a=n.$a.insert(t,r),Og(n.remoteStore,new On(Wt(ic(t.path)),r,"TargetPurposeLimboResolution",xo.ae))}}async function qg(n,e,t){const r=ve(n),s=[],i=[],a=[];r.ka.isEmpty()||(r.ka.forEach((l,c)=>{a.push(r.Ha(c,e,t).then(h=>{var d;if((h||t)&&r.isPrimaryClient){const p=h?!h.fromCache:(d=t==null?void 0:t.targetChanges.get(c.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=hc.Yi(c.targetId,h);i.push(p)}}))}),await Promise.all(a),r.La.p_(s),await async function(c,h){const d=ve(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>x.forEach(h,m=>x.forEach(m.Hi,E=>d.persistence.referenceDelegate.addReference(p,m.targetId,E)).next(()=>x.forEach(m.Ji,E=>d.persistence.referenceDelegate.removeReference(p,m.targetId,E)))))}catch(p){if(!ts(p))throw p;X(fc,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const E=d.Ts.get(m),k=E.snapshotVersion,N=E.withLastLimboFreeSnapshotVersion(k);d.Ts=d.Ts.insert(m,N)}}}(r.localStore,i))}async function ub(n,e){const t=ve(n);if(!t.currentUser.isEqual(e)){X(vc,"User change. New user:",e.toKey());const r=await Cg(t.localStore,e);t.currentUser=e,function(i,a){i.Ga.forEach(l=>{l.forEach(c=>{c.reject(new ee(H.CANCELLED,a))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await qg(t,r.Rs)}}function hb(n,e){const t=ve(n),r=t.Ka.get(e);if(r&&r.Ba)return Ee().add(r.key);{let s=Ee();const i=t.qa.get(e);if(!i)return s;for(const a of i){const l=t.ka.get(a);s=s.unionWith(l.view.Sa)}return s}}function zg(n){const e=ve(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=$g.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=hb.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=lb.bind(null,e),e.La.p_=X0.bind(null,e.eventManager),e.La.Ja=Y0.bind(null,e.eventManager),e}class go{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=kg(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return S0(this.persistence,new A0,e.initialUser,this.serializer)}Xa(e){return new Sg(uc.ri,this.serializer)}Za(e){return new O0}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}go.provider={build:()=>new go};class fb extends go{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){xe(this.persistence.referenceDelegate instanceof po);const r=this.persistence.referenceDelegate.garbageCollector;return new c0(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?mt.withCacheSize(this.cacheSizeBytes):mt.DEFAULT;return new Sg(r=>po.ri(r,t),this.serializer)}}class vl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>vf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ub.bind(null,this.syncEngine),await W0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new J0}()}createDatastore(e){const t=kg(e.databaseInfo.databaseId),r=function(i){return new L0(i)}(e.databaseInfo);return function(i,a,l,c){return new j0(i,a,l,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new H0(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>vf(this.syncEngine,t,0),function(){return ff.D()?new ff:new N0}())}createSyncEngine(e,t){return function(s,i,a,l,c,h,d){const p=new nb(s,i,a,l,c,h);return d&&(p.ja=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=ve(s);X(Jr,"RemoteStore shutting down."),i.W_.add(5),await ai(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}vl.provider={build:()=>new vl};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):pn("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn="FirestoreClient";class db{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=tt.UNAUTHENTICATED,this.clientId=Qp.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{X(zn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(X(zn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Fn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=xg(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Na(n,e){n.asyncQueue.verifyOperationInProgress(),X(zn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Cg(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Tf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await pb(n);X(zn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>gf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>gf(e.remoteStore,s)),n._onlineComponents=e}async function pb(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){X(zn,"Using user provided OfflineComponentProvider");try{await Na(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===H.FAILED_PRECONDITION||s.code===H.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;zr("Error using user provided cache. Falling back to memory cache: "+t),await Na(n,new go)}}else X(zn,"Using default OfflineComponentProvider"),await Na(n,new fb(void 0));return n._offlineComponents}async function gb(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(X(zn,"Using user provided OnlineComponentProvider"),await Tf(n,n._uninitializedComponentsProvider._online)):(X(zn,"Using default OnlineComponentProvider"),await Tf(n,new vl))),n._onlineComponents}async function Gg(n){const e=await gb(n),t=e.eventManager;return t.onListen=rb.bind(null,e.syncEngine),t.onUnlisten=ob.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=sb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=ab.bind(null,e.syncEngine),t}function mb(n,e,t={}){const r=new Fn;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,c,h){const d=new Kg({next:m=>{d.su(),a.enqueueAndForget(()=>Lg(i,p));const E=m.docs.has(l);!E&&m.fromCache?h.reject(new ee(H.UNAVAILABLE,"Failed to get document because the client is offline.")):E&&m.fromCache&&c&&c.source==="server"?h.reject(new ee(H.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new Fg(ic(l.path),d,{includeMetadataChanges:!0,Ta:!0});return Mg(i,p)}(await Gg(n),n.asyncQueue,e,t,r)),r.promise}function _b(n,e,t={}){const r=new Fn;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,c,h){const d=new Kg({next:m=>{d.su(),a.enqueueAndForget(()=>Lg(i,p)),m.fromCache&&c.source==="server"?h.reject(new ee(H.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new Fg(l,d,{includeMetadataChanges:!0,Ta:!0});return Mg(i,p)}(await Gg(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wg(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg(n,e,t){if(!t)throw new ee(H.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function yb(n,e,t,r){if(e===!0&&r===!0)throw new ee(H.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function If(n){if(!re.isDocumentKey(n))throw new ee(H.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Af(n){if(re.isDocumentKey(n))throw new ee(H.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function vb(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ue()}function Xs(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new ee(H.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=vb(n);throw new ee(H.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg="firestore.googleapis.com",bf=!0;class Rf{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new ee(H.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Jg,this.ssl=bf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:bf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Rg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<a0)throw new ee(H.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}yb("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Wg((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new ee(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new ee(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new ee(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class zo{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Rf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ee(H.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ee(H.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Rf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new MI;switch(r.type){case"firstParty":return new BI(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new ee(H.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=wf.get(t);r&&(X("ComponentProvider","Removing Datastore"),wf.delete(t),r.terminate())}(this),Promise.resolve()}}function Eb(n,e,t,r={}){var s;const i=(n=Xs(n,zo))._getSettings(),a=`${e}:${t}`;if(i.host!==Jg&&i.host!==a&&zr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=tt.MOCK_USER;else{l=hE(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new ee(H.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new tt(h)}n._authCredentials=new LI(new Wp(l,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ko(this.firestore,e,this._query)}}class Qt{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Un(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Qt(this.firestore,e,this._key)}}class Un extends Ko{constructor(e,t,r){super(e,t,ic(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Qt(this.firestore,null,new re(e))}withConverter(e){return new Un(this.firestore,e,this._path)}}function Tb(n,e,...t){if(n=Qn(n),Qg("collection","path",e),n instanceof zo){const r=De.fromString(e,...t);return Af(r),new Un(n,null,r)}{if(!(n instanceof Qt||n instanceof Un))throw new ee(H.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(De.fromString(e,...t));return Af(r),new Un(n.firestore,null,r)}}function wb(n,e,...t){if(n=Qn(n),arguments.length===1&&(e=Qp.newId()),Qg("doc","path",e),n instanceof zo){const r=De.fromString(e,...t);return If(r),new Qt(n,null,new re(r))}{if(!(n instanceof Qt||n instanceof Un))throw new ee(H.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(De.fromString(e,...t));return If(r),new Qt(n.firestore,n instanceof Un?n.converter:null,new re(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="AsyncQueue";class Cf{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Dg(this,"async_queue_retry"),this.Su=()=>{const r=Oa();r&&X(Sf,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=Oa();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=Oa();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Fn;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!ts(e))throw e;X(Sf,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(r);throw pn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=_c.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&ue()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}class Tc extends zo{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Cf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Cf(e),this._firestoreClient=void 0,await e}}}function Ib(n,e){const t=typeof n=="object"?n:lp(),r=typeof n=="string"?n:lo,s=$l(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=cE("firestore");i&&Eb(s,...i)}return s}function Xg(n){if(n._terminated)throw new ee(H.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Ab(n),n._firestoreClient}function Ab(n){var e,t,r;const s=n._freezeSettings(),i=function(l,c,h,d){return new tA(l,c,h,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,Wg(d.experimentalLongPollingOptions),d.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new db(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(e){this._byteString=e}static fromBase64String(e){try{return new mo(Qe.fromBase64String(e))}catch(t){throw new ee(H.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new mo(Qe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new ee(H.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bb{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new ee(H.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new ee(H.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ye(this._lat,e._lat)||ye(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rb{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}const Sb=new RegExp("[~\\*/\\[\\]]");function Cb(n,e,t){if(e.search(Sb)>=0)throw Pf(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new Yg(...e.split("."))._internalPath}catch{throw Pf(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function Pf(n,e,t,r,s){let i=`Function ${e}() called with invalid data`;i+=". ";let a="";return new ee(H.INVALID_ARGUMENT,i+n+a)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Qt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Pb(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(em("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Pb extends Zg{data(){return super.data()}}function em(n,e){return typeof e=="string"?Cb(n,e):e instanceof Yg?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kb(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new ee(H.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Db{convertValue(e,t="none"){switch(Hn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes($n(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ue()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return ii(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[il].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>Le(a.doubleValue));return new Rb(i)}convertGeoPoint(e){return new bb(Le(e.latitude),Le(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Lo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ws(e));default:return null}}convertTimestamp(e){const t=jn(e);return new _t(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=De.fromString(e);xe(bg(r));const s=new Qs(r.get(1),r.get(3)),i=new re(r.popFirst(5));return s.isEqual(t)||pn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class tm extends Zg{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ki(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(em("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Ki extends tm{data(e={}){return super.data(e)}}class Ob{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Is(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ki(this._firestore,this._userDataWriter,r.key,r,new Is(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new ee(H.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const c=new Ki(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Is(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new Ki(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Is(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),d=a.indexOf(l.doc.key)),{type:Nb(l.type),doc:c,oldIndex:h,newIndex:d}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Nb(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ue()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vb(n){n=Xs(n,Qt);const e=Xs(n.firestore,Tc);return mb(Xg(e),n._key).then(t=>Mb(e,n,t))}class nm extends Db{constructor(e){super(),this.firestore=e}convertBytes(e){return new mo(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Qt(this.firestore,null,t)}}function xb(n){n=Xs(n,Ko);const e=Xs(n.firestore,Tc),t=Xg(e),r=new nm(e);return kb(n._query),_b(t,n._query).then(s=>new Ob(e,r,n,s))}function Mb(n,e,t){const r=t.docs.get(e._key),s=new nm(n);return new tm(n,s,e._key,r,new Is(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){es=s})(Yr),Hr(new fr("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new Tc(new FI(r.getProvider("auth-internal")),new jI(a,r.getProvider("app-check-internal")),function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new ee(H.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Qs(h.options.projectId,d)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),Mn(Nh,Vh,e),Mn(Nh,Vh,"esm2017")})();const Lb={apiKey:"AIzaSyD3fKnhvyVNEWgE6lmgRtVsBZFSBjJdOOA",authDomain:"project-finalmbw.firebaseapp.com",projectId:"project-finalmbw",storageBucket:"project-finalmbw.appspot.com",messagingSenderId:"742173296191",appId:"1:742173296191:web:91474e78e2c39275725a8a",measurementId:"G-MNXL2CMT5S"},rm=ap(Lb),sm=VI(rm),kf=Ib(rm),Fb=new ln,Ub={setup(){const n=Yd(),e=Ss(null);return{loginWithGoogle:async()=>{try{const r=await Hw(sm,Fb);e.value=r.user,console.log("✅ Login Success:",e.value),localStorage.setItem("user",JSON.stringify(e.value)),n.push("/webapp/home")}catch(r){console.error("❌ Login Error:",r)}}}}},Bb={class:"login-container"};function jb(n,e,t,r,s,i){return Bt(),sn("div",Bb,[e[1]||(e[1]=Se("h2",null,"เข้าสู่ระบบด้วย Google",-1)),Se("button",{onClick:e[0]||(e[0]=(...a)=>r.loginWithGoogle&&r.loginWithGoogle(...a))},"Login with Google")])}const $b=Fl(Ub,[["render",jb],["__scopeId","data-v-acf463cc"]]),Hb={class:"container mt-5"},qb={key:0,class:"card shadow-sm mb-4 p-3 d-flex flex-row align-items-center"},zb=["src"],Kb={class:"card-title mb-1"},Gb={class:"text-muted mb-0"},Wb={key:1,class:"text-center"},Qb={key:2},Jb={class:"row"},Xb={class:"card h-100 shadow-sm"},Yb=["src"],Zb={class:"card-body"},eR={class:"card-title"},tR={class:"card-text"},nR={class:"card-text"},rR=["onClick"],sR={key:3,class:"alert alert-warning"},iR={__name:"HomeView",setup(n){const e=Yd(),t=Ss(null),r=Ss([]),s=Ss(!0);dd(async()=>{const d=localStorage.getItem("user");d?(t.value=JSON.parse(d),await i()):e.push("/webapp/")});const i=async()=>{if(t.value)try{r.value=[],s.value=!0;const d=Tb(kf,`users/${t.value.uid}/classroom`),m=(await xb(d)).docs.map(async k=>{const N=k.id,L=wb(kf,`classroom/${N}`),K=await Vb(L);return K.exists()?{id:N,...K.data()}:null}),E=await Promise.all(m);r.value=E.filter(k=>k!==null)}catch(d){console.error("Error loading classrooms:",d)}finally{s.value=!1}},a=()=>{e.push("/addclass")},l=()=>{e.push("/edit-profile")},c=d=>{e.push(`/mclass/${d}`)},h=async()=>{try{await sm.signOut(),localStorage.removeItem("user"),e.push("/login")}catch(d){console.error("Logout Error:",d)}};return(d,p)=>(Bt(),sn("div",Hb,[t.value?(Bt(),sn("div",qb,[Se("img",{src:t.value.photoURL,alt:"User Avatar",class:"rounded-circle me-3",width:"60",height:"60"},null,8,zb),Se("div",null,[Se("h5",Kb,wr(t.value.displayName),1),Se("p",Gb,wr(t.value.email),1)])])):dy("",!0),Se("div",{class:"d-grid gap-2 d-md-flex mb-4"},[Se("button",{onClick:a,class:"btn btn-success"},"เพิ่มวิชา"),Se("button",{onClick:l,class:"btn btn-primary"},"แก้ไขข้อมูลส่วนตัว"),Se("button",{onClick:h,class:"btn btn-danger"},"ออกจากระบบ")]),p[3]||(p[3]=Se("h4",{class:"mb-3"},"รายชื่อวิชาของคุณ",-1)),s.value?(Bt(),sn("div",Wb,p[0]||(p[0]=[Se("div",{class:"spinner-border text-primary",role:"status"},[Se("span",{class:"visually-hidden"},"Loading...")],-1)]))):r.value.length>0?(Bt(),sn("div",Qb,[Se("div",Jb,[(Bt(!0),sn($t,null,V_(r.value,m=>(Bt(),sn("div",{key:m.id,class:"col-md-4 mb-4"},[Se("div",Xb,[Se("img",{src:m.photo||"https://via.placeholder.com/150",class:"card-img-top",alt:"Class Image"},null,8,Yb),Se("div",Zb,[Se("h5",eR,wr(m.name),1),Se("p",tR,[p[1]||(p[1]=Se("strong",null,"รหัสวิชา:",-1)),sr(" "+wr(m.code),1)]),Se("p",nR,[p[2]||(p[2]=Se("strong",null,"ห้องเรียน:",-1)),sr(" "+wr(m.room),1)]),Se("button",{onClick:E=>c(m.id),class:"btn btn-primary w-100 mt-2"},"จัดการห้องเรียน",8,rR)])])]))),128))])])):(Bt(),sn("div",sR,"ยังไม่มีรายวิชา"))]))}},oR=Fl(iR,[["__scopeId","data-v-55b86d76"]]),aR=[{path:"/webapp/",component:$b},{path:"/webapp/home",component:oR}],lR=eE({history:Pv(),routes:aR}),im=Gy(Yy);im.use(lR);im.mount("#app");
