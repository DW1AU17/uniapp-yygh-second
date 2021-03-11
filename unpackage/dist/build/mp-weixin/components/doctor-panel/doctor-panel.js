(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/doctor-panel/doctor-panel"],{1672:function(t,e,n){"use strict";n.r(e);var o=n("f9a4"),c=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=c.a},"4acc":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var c=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"5ce4":function(t,e,n){"use strict";n.r(e);var o=n("4acc"),c=n("1672");for(var r in c)"default"!==r&&function(t){n.d(e,t,(function(){return c[t]}))}(r);n("7dbb");var a,u=n("f0c5"),i=Object(u["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=i.exports},"668b":function(t,e,n){},"7dbb":function(t,e,n){"use strict";var o=n("668b"),c=n.n(o);c.a},f9a4:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n("2f62");var o={props:{source:{type:Object,default:{}},orgCode:{required:!0},hospitalId:{required:!0}},computed:{},methods:{goSourcePage:function(){var e="?orgCode=".concat(this.orgCode,"&hospitalId=").concat(this.hospitalId,"&id=").concat(this.source.id,"&name=").concat(this.source.name);t.navigateTo({url:"/pages/source/source".concat(e)})},handleError:function(t){console.log(123),this.$emit("editImgUrl",{url:"0000",name:this.source.name,id:this.source.id})}}};e.default=o}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/doctor-panel/doctor-panel-create-component',
    {
        'components/doctor-panel/doctor-panel-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5ce4"))
        })
    },
    [['components/doctor-panel/doctor-panel-create-component']]
]);
