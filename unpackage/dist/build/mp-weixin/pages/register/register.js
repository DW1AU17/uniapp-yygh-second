(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{"499a":function(e,t,r){"use strict";r.r(t);var n=r("6ef3"),a=r("942f");for(var o in a)"default"!==o&&function(e){r.d(t,e,(function(){return a[e]}))}(o);r("ddae");var i,u=r("f0c5"),c=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);t["default"]=c.exports},"513c":function(e,t,r){"use strict";(function(e){r("a850");n(r("66fd"));var t=n(r("499a"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])},"6ef3":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"942f":function(e,t,r){"use strict";r.r(t);var n=r("c6be"),a=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},c6be:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(r("a34a")),a=u(r("cd4f")),o=r("5431"),i=r("2f62");function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t,r,n,a,o,i){try{var u=e[o](i),c=u.value}catch(f){return void r(f)}u.done?t(c):Promise.resolve(c).then(n,a)}function f(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function i(e){c(o,n,a,i,u,"next",e)}function u(e){c(o,n,a,i,u,"throw",e)}i(void 0)}))}}function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var p=[{prop:"patName"},{prop:"phoneNumber"},{prop:"idCard"}],v={data:function(){return{ruleForm:{patName:"",phoneNumber:"",idCard:"",userId:""},type:"add",array:[{dicCode:"0",name:"身份证"},{dicCode:"3",name:"其他（护照，港澳证，台胞证）"}]}},onLoad:function(){var t=this;this.ruleForm.userId=this.patientInfo.id;var r=this.getOpenerEventChannel();r.on("editPatientInfoFromManagePage",(function(r){if(console.log(r),r){r.type;var n=r.data;t.type="edit",t.ruleForm=n,e.setNavigationBarTitle({title:"修改就诊人信息"})}}))},computed:s({},(0,i.mapState)(["patientInfo"])),methods:s(s({},(0,i.mapMutations)(["addPatient"])),{},{formSubmit:function(){var t=this;return f(n.default.mark((function r(){var i,u,c,f,d;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(i=t.ruleForm,0!=i.certifiNum&&(p=p.slice(0,2)),u=(0,a.default)(i,p),c=u.ret,f=u.msg,!c){r.next=10;break}return r.next=6,(0,o.addPatient)(i);case 6:d=r.sent,0==d.code&&(t.addPatient(i),t.successAlert("添加成功"),e.navigateBack({delta:1})),r.next=11;break;case 10:t.errorAlert(f);case 11:case"end":return r.stop()}}),r)})))()},bindPickerChange:function(e){this.ruleForm.certifiNum=e.target.value}})};t.default=v}).call(this,r("543d")["default"])},ddae:function(e,t,r){"use strict";var n=r("dee0"),a=r.n(n);a.a},dee0:function(e,t,r){}},[["513c","common/runtime","common/vendor"]]]);