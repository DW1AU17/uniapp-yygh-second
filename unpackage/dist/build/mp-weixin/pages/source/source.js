(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/source/source"],{1261:function(t,e,n){"use strict";n.r(e);var r=n("92c8"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=o.a},"19bd":function(t,e,n){"use strict";(function(t){n("a850");r(n("66fd"));var e=r(n("ac8d"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"1acf":function(t,e,n){},"5ecf":function(t,e,n){"use strict";var r=n("1acf"),o=n.n(r);o.a},"92c8":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=c(n("a34a")),o=n("f0b6"),a=n("5244"),i=n("2f62");function c(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(s){return void n(s)}c.done?e(u):Promise.resolve(u).then(r,o)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){u(a,r,o,i,c,"next",t)}function c(t){u(a,r,o,i,c,"throw",t)}i(void 0)}))}}function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p={data:function(){return{visible:!1,doctorInfo:{id:"",name:"",pavName:"",title:"",sffProfessionalWrapper:"",sffSummary:""},summary:!0,isInit:!0,sourceTab:[],currentTabIndex:"",sourceListDate:[],sourceListDetail:{},getNumList:[],totalFee:"",nothing:"",option:{},currentIndex:0}},onLoad:function(t){if(void 0!=t.q){var e=this.handleSourceOption(t.q);this.doctorInfo=e,this.option=e}else this.doctorInfo=t,this.option=t;this.getDoctorInfo()},onShareAppMessage:function(){var t="".concat(this.doctorInfo.sffName," - 桐君堂(").concat(this.doctorInfo.pavName,")"),e=this;function n(){return Object.keys(e.option).reduce((function(t,n,r){var o=0==r?"":"&";return t+o+n+"="+e.option[n]}),"")}return{title:t,path:"/pages/source/source?".concat(n())}},computed:d({},(0,i.mapState)(["hasLogin"])),methods:{init:function(){var e=this;return s(r.default.mark((function n(){var a,i,c,u,s,f,d;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.showLoging(),a=e.doctorInfo,i=a.sffId,c=a.sffName,u=a.orgCode,s=a.hospitalId,f={docId:i,docName:c,orgCode:u,hospitalId:s},n.next=5,(0,o.getSchedulingList)(f);case 5:d=n.sent,0==d.code&&Object.keys(d.data).length?e.handleSourceListData(d.data):e.nothing="近一周都无号源",t.hideLoading();case 8:case"end":return n.stop()}}),n)})))()},getDoctorInfo:function(){var t=this;return s(r.default.mark((function e(){var n,i,c,u,s,f,l;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(void 0==t.doctorInfo){e.next=12;break}return n=t.doctorInfo,i=n.hospitalId,c=n.id,u=n.orgCode,s={hospitalId:i,doctorId:c},e.next=5,(0,o.getDoctorInfo)(s);case 5:f=e.sent,l=f.data||{},l.orgCode=u,l.pavName=(0,a.getPavName)(i),t.doctorInfo=d(d({},t.doctorInfo),l),t.isInit=!1,t.init();case 12:case"end":return e.stop()}}),e)})))()},handleSourceListData:function(t){var e=this,n=[];Object.keys(t).forEach((function(r){n.push({depName:r.split("-")[1],depId:r.split("-")[0],list:e.handleSouceItemList(t[r])})})),this.sourceTab=n,this.setCurrentInfo(n[0])},setCurrentInfo:function(t){this.currentTabIndex=t.depId,this.sourceListDetail=t.list,this.sourceListDate=Object.keys(t.list)},handleSouceItemList:function(t){var e=["1","2","3"];return Object.keys(t).forEach((function(n){var r=[],o=t[n].map((function(t){return t.ampm}));e.forEach((function(e){o.includes(e)?r[e-1]=d({},t[n].filter((function(t){return t.ampm==e}))[0]):r[e-1]={ampm:e,state:1}})),t[n]=r})),t},appointment:function(e,n){var a=this;return s(r.default.mark((function i(){var c,u,s,f,d,l,p;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(a.hasLogin){r.next=4;break}t.navigateTo({url:"/pages/auth/auth?type="}),r.next=16;break;case 4:return a.visible=!0,c=a.sourceListDetail[e][n],a.showLoging(),u=c.schid,s=c.orgId,f=c.ampm,a.totalFee=c.totalFee,d={ampm:f,orgCode:s,schId:u},r.next=12,(0,o.getSourceList)(d);case 12:l=r.sent,p=l.data||[],a.getNumList=p.map((function(t){return t.visitTime=t.visitTime.slice(0,5),t})),t.hideLoading();case 16:case"end":return r.stop()}}),i)})))()},handleSourceOption:function(t){var e=decodeURIComponent(t).split("?")[1],n=e.split("&"),r={};return n.forEach((function(t){var e=t.split("=");r[e[0]]=e[1]})),r},chooseSource:function(t){this.currentIndex=t.detail.value},goOrderPage:function(){var e=d(d({},this.getNumList[this.currentIndex]),{},{totalFee:this.totalFee,orgCode:this.doctorInfo.orgCode});t.navigateTo({url:"/pages/order/order",success:function(t){t.eventChannel.emit("orderPageAcceptData",{data:e})}}),this.visible=!1},formatDate:function(t){return t.substr(4,2)+"-"+t.substr(6,2)},formatWeek:function(t){return t=t.substr(0,4)+"-"+t.substr(4,2)+"-"+t.substr(6,2),(0,a.getWeekFromDate)(t)},getWhatDay:function(t){switch(t=new Date(t),t.getDay()){case 0:return"周日";case 1:return"周一";case 2:return"周二";case 3:return"周三";case 4:return"周四";case 5:return"周五";case 6:return"周六";default:return""}},handleError:function(t){this.doctorInfo.sffLoginNum="0000"}}};e.default=p}).call(this,n("543d")["default"])},ac8d:function(t,e,n){"use strict";n.r(e);var r=n("cc19"),o=n("1261");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("5ecf");var i,c=n("f0c5"),u=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=u.exports},cc19:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.sourceListDate.length?t.__map(t.sourceListDate,(function(e,n){var r=t.__get_orig(e),o=t.formatWeek(e),a=t.formatDate(e);return{$orig:r,m0:o,m1:a}})):null);t._isMounted||(t.e0=function(e){t.summary=!t.summary},t.e1=function(e){t.visible=!1},t.e2=function(e){t.visible=!1}),t.$mp.data=Object.assign({},{$root:{l0:n}})},a=[]}},[["19bd","common/runtime","common/vendor"]]]);