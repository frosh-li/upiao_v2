(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./js/login.js":
/*!*********************!*\
  !*** ./js/login.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,__webpack_require__(/*! backbone */ \"./libs/backbone-min.js\"),__webpack_require__(/*! api */ \"./js/api.js\"),__webpack_require__(/*! router */ \"./js/router.js\"),__webpack_require__(/*! common */ \"./js/common.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require,Backbone,API,router,common){\r\n    var view,\r\n        View =  Backbone.View.extend({\r\n            el:\"#login\",\r\n            options:{},\r\n            events:{\r\n                \"click #submitBtn\":\"onSbumit\"\r\n            },\r\n            initialize: function(options) {\r\n                var _this = this;\r\n                $(\"input[key=password]\").val(\"\");\r\n                $(\"input[key=username]\").val(localStorage.getItem(\"username\") || \"\");\r\n                _this.listenTo(Backbone.Events,\"login\",function(data){\r\n                    console.log(data);\r\n                    localStorage.setItem('userinfo', JSON.stringify(data));\r\n                    localStorage.setItem(\"collecting\",'true');\r\n                    localStorage.setItem('username',data.username);\r\n                    router.to(\"manage/station\");\r\n                })\r\n                _this.listenTo(Backbone.Events,\"login:fail\",function(data){\r\n                    localStorage.clear();\r\n                    alert('登录失败，请重试');\r\n                })\r\n            },\r\n            onSbumit:function(){\r\n                var param = common.getFormValue(this.el);\r\n                API.login(param);\r\n            }\r\n        });\r\n\r\n\r\n    return {\r\n        init:function(pageType){\r\n            view = new View();\r\n            return this;\r\n        }\r\n    };\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./libs/jquery.min.js */ \"./libs/jquery.min.js\")))\n\n//# sourceURL=webpack:///./js/login.js?");

/***/ })

}]);