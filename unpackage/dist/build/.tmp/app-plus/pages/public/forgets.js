(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/public/forgets"],{1573:function(t,e,n){},"279e":function(t,e,n){"use strict";n.r(e);var i=n("a2f9"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},2932:function(t,e,n){"use strict";(function(t){n("e6c2"),n("921b");i(n("66fd"));var e=i(n("b4c3"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"4c62":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},a2f9:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("03fa"));function a(t){return t&&t.__esModule?t:{default:t}}var o={onReady:function(){this.mcaptcha=new i.default({el:"canvas",width:80,height:35,createCodeImg:""})},data:function(){return{currentTime:60,codename:"获取验证码",imgcode:"",phone:"",yzm:"",password:"",relPassword:"",disabled:!1,timer:null,ischecked:!1}},methods:{onTap:function(){this.mcaptcha.refresh()},validatePic:function(){var e=this.mcaptcha.validate(this.imgcode);return""==this.imgcode||null==this.imgcode?(t.showToast({title:"请输入图形验证码",icon:"none"}),!1):!!e||(t.showToast({title:"图形验证码错误",icon:"none"}),!1)},validatePhone:function(){var e=/^1([3-9][0-9])\d{8}$/,n=e.test(this.phone);return""==this.phone||null==this.phone?(t.showToast({title:"手机号不能为空",icon:"none"}),!1):!!n||(t.showToast({title:"手机号错误",icon:"none"}),!1)},validateYzm:function(){return""!=this.yzm&&null!=this.yzm||(t.showToast({title:"验证码不能为空",icon:"none"}),!1)},validatePass:function(){return""==this.password||null==this.password?(t.showToast({title:"密码不能为空",icon:"none"}),!1):!!/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/.test(this.password)||(t.showToast({title:"密码为8-12位大小写字母+数字",icon:"none"}),!1)},validateRel:function(){return this.relPassword===this.password||(t.showToast({title:"两次密码输入不一致",icon:"none"}),!1)},getCode:function(){var t=this;this.disabled=!0,this.timer=setInterval((function(){t.currentTime<=0?(t.timer&&clearInterval(t.timer),t.reset()):t.loadCode()}),1e3)},reset:function(){this.currentTime=60,this.codename="重新获取",this.disabled=!1},loadCode:function(){this.currentTime-=1,this.codename="倒计时"+this.currentTime+"s"},submit:function(){var e=this.validateRel(),n=this.validatePass(),i=this.validateYzm(),a=this.validatePhone(),o=this.validatePic();o&&a&&i&&e&&n&&t.navigateTo({url:"./login"})}}};e.default=o}).call(this,n("6e42")["default"])},b4c3:function(t,e,n){"use strict";n.r(e);var i=n("4c62"),a=n("279e");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("e70f");var s,c=n("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=r.exports},e70f:function(t,e,n){"use strict";var i=n("1573"),a=n.n(i);a.a}},[["2932","common/runtime","common/vendor"]]]);