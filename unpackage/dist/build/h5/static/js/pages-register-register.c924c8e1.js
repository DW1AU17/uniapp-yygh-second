(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-register-register"],{"009a":function(e,t,a){var r=a("24fb");t=r(!1),t.push([e.i,'@charset "UTF-8";\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 阴影色 */\n/* 边框色 */\n/* 圆角尺寸 */\n/* 背景色 */\n/* 面板相关字体 */.flex1[data-v-10e94b4e]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.dsb-color[data-v-10e94b4e]{color:#ffd180}.orange[data-v-10e94b4e]{color:orange}.reg-page[data-v-10e94b4e]{height:100%;background-color:#eee}.reg-page .reg-header[data-v-10e94b4e]{height:100px}.reg-page .reg-header .cus-image[data-v-10e94b4e]{width:100%;height:100%;vertical-align:bottom}.reg-page .cus-form[data-v-10e94b4e]{background-color:#fff;padding-left:10px;border-bottom:1px solid #ccc}.reg-page .cus-form .verification[data-v-10e94b4e]{border-left:1px solid #ccc;padding:0 5px 0 15px}.reg-page .cus-footer[data-v-10e94b4e]{padding:10px}.cus-form-item[data-v-10e94b4e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:10px;border-bottom:1px solid #ccc}.cus-form-item[data-v-10e94b4e]:last-child{border-bottom:none}.cus-form-item .cus-title[data-v-10e94b4e]{min-width:90px}.remind[data-v-10e94b4e]{padding:%?20?%;font-size:%?26?%}.remind .title[data-v-10e94b4e]{color:#6a6a6a}.remind .single[data-v-10e94b4e]{color:#8f8f8f}',""]),e.exports=t},"08f1":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,phoneNumber:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,idCard:/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,chinese:/^(?:[\u4E00-\u9FA5])+$/,english:/^[a-zA-Z]+$/,pureNumber:/^[0-9]*$/,pointNumber:/^(-?\d+)(\.\d+)?$/,pointPNumber:/^(\d+)(\.\d+)?$/,engNum:/^[A-Za-z0-9]{4,23}$/};t.default=r},"12cb":function(e,t,a){"use strict";a.r(t);var r=a("cb45"),i=a("9933");for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);a("ff86");var u,s=a("f0c5"),o=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"10e94b4e",null,!1,r["a"],u);t["default"]=o.exports},"4d46":function(e,t,a){e.exports=a.p+"static/img/pic.a16a83b4.jpg"},9933:function(e,t,a){"use strict";a.r(t);var r=a("f32f"),i=a.n(r);for(var n in r)"default"!==n&&function(e){a.d(t,e,(function(){return r[e]}))}(n);t["default"]=i.a},cb45:function(e,t,a){"use strict";var r;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return r}));var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"reg-page"},[r("v-uni-view",{staticClass:"reg-header"},[r("img",{staticClass:"cus-image",attrs:{src:a("4d46")}})]),r("v-uni-view",{staticClass:"cus-form"},[r("v-uni-form",[r("v-uni-view",{staticClass:"cus-form-item"},[r("v-uni-view",{staticClass:"cus-title"},[e._v("姓名")]),r("v-uni-input",{staticClass:"cus-input",attrs:{disabled:"edit"===e.type,focus:!0,placeholder:"请输入姓名"},model:{value:e.ruleForm.patName,callback:function(t){e.$set(e.ruleForm,"patName",t)},expression:"ruleForm.patName"}})],1),r("v-uni-view",{staticClass:"cus-form-item"},[r("v-uni-view",{staticClass:"cus-title"},[e._v("手机号")]),r("v-uni-input",{staticClass:"cus-input",attrs:{placeholder:"请输入手机号"},model:{value:e.ruleForm.phoneNumber,callback:function(t){e.$set(e.ruleForm,"phoneNumber",t)},expression:"ruleForm.phoneNumber"}})],1),r("v-uni-view",{staticClass:"cus-form-item"},[r("v-uni-view",{staticClass:"cus-title"},[e._v("身份证")]),r("v-uni-input",{staticClass:"cus-input",attrs:{disabled:"edit"===e.type,placeholder:"请输入身份证"},model:{value:e.ruleForm.idCard,callback:function(t){e.$set(e.ruleForm,"idCard",t)},expression:"ruleForm.idCard"}})],1)],1)],1),r("v-uni-view",{staticClass:"cus-footer"},[r("v-uni-button",{staticClass:"cus-button",attrs:{type:"default"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[e._v("确认")])],1),r("v-uni-view",{staticClass:"remind"},[r("v-uni-view",{staticClass:"title"},[e._v("温馨提示")]),r("v-uni-view",{staticClass:"single"},[r("v-uni-view",[e._v("1. 就诊人姓名, 证件号码将用于医馆建档信息匹配, 请输入正确的个人信息")]),r("v-uni-view",[e._v("2. 手机号将用于短信(电话)通知, 请输入正确的手机号")]),r("v-uni-view",[e._v("3. 最多可添加5位就诊人")])],1)],1)],1)},n=[]},e4d4:function(e,t,a){var r=a("009a");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=a("4f06").default;i("64db3536",r,!0,{sourceMap:!1,shadowMode:!1})},eff0:function(e,t,a){"use strict";var r=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var i=r(a("08f1"));function n(e,t){function a(e){return{ret:!1,msg:e}}for(var r=0;r<t.length;r++)switch(t[r].prop){case"username":if(!e.username)return a("姓名不能为空");if(e.username.length<2)return a("姓名必须大于等于2位");break;case"patName":if(!e.patName)return a("姓名不能为空");if(e.patName.length<2)return a("姓名必须大于等于2位");break;case"mobilePhone":if(!e.mobilePhone)return a("手机号不能为空");if(!i.default.mobilePhone.test(e.mobilePhone))return a("手机号格式不正确");break;case"idCard":if(!e.idCard)return a("身份证不能为空");if(!i.default.idCard.test(e.idCard))return a("身份证格式不正确");break;default:break}return{ret:!0,msg:"操作成功"}}},f32f:function(e,t,a){"use strict";var r=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var i=r(a("1da1")),n=r(a("5530")),u=r(a("eff0")),s=a("a316"),o=a("2f62"),d=[{prop:"patName"},{prop:"phoneNumber"},{prop:"idCard"}],c={data:function(){return{ruleForm:{patName:"",phoneNumber:"",idCard:"",userId:""},type:"add"}},onLoad:function(){var e=this;this.ruleForm.userId=this.patientInfo.id;var t=this.getOpenerEventChannel();t.on("editPatientInfoFromManagePage",(function(t){if(console.log(t),t){t.type;var a=t.data;e.type="edit",e.ruleForm=a,uni.setNavigationBarTitle({title:"修改就诊人信息"})}}))},computed:(0,n.default)({},(0,o.mapState)(["patientInfo"])),methods:(0,n.default)((0,n.default)({},(0,o.mapMutations)(["addPatient"])),{},{formSubmit:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var a,r,i,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=(0,u.default)(e.ruleForm,d),r=a.ret,i=a.msg,n=e.ruleForm,!r){t.next=9;break}return t.next=5,(0,s.addPatient)(n);case 5:o=t.sent,0==o.code&&(e.addPatient(n),e.successAlert("添加成功"),uni.navigateBack({delta:1})),t.next=10;break;case 9:e.errorAlert(i);case 10:case"end":return t.stop()}}),t)})))()}})};t.default=c},ff86:function(e,t,a){"use strict";var r=a("e4d4"),i=a.n(r);i.a}}]);