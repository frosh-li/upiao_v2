(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./js/dialog-otherOptionEdit.js":
/*!**************************************!*\
  !*** ./js/dialog-otherOptionEdit.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,__webpack_require__(/*! api */ \"./js/api.js\"),__webpack_require__(/*! context */ \"./js/context_model.js\"),__webpack_require__(/*! common */ \"./js/common.js\"),__webpack_require__(/*! table */ \"./libs/jquery.dataTables.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require,API,context,common){\r\n    var view = null,\r\n        config = {\r\n            extobj : {\r\n                data:null,\r\n                listPlugin:[],\r\n                el:'#otherOptionEditTpl-dialog',\r\n                events:{\r\n                    \"click .submit-btn\":\"onsubmit\",\r\n                    \"click .cancel-btn\":\"oncancel\"\r\n                },\r\n                initialize:function(data){\r\n                    console.log(data);\r\n                    var _this = this;\r\n                    _this.listenTo(Backbone.Events,\"stationinfo:foredit:update\",function(data){\r\n                        _this.data = data;\r\n                        _this.show();\r\n                    });\r\n                    _this.listenTo(Backbone.Events,\"stationdata:create stationdata:update\",function(){\r\n                        // window.location.reload();\r\n                        _this.dialogObj.dialog('destroy');\r\n                    });\r\n                },\r\n                refresh:function(){\r\n                    var _this = this,\r\n                        _param = _this.getParam();\r\n\r\n                    if(_param){\r\n                        _this.fetchData(_param);\r\n                    }else{//TODO:获取参数失败\r\n\r\n                    }\r\n                },\r\n                getParam:function(){\r\n                    return common.getFormValue(this.el);\r\n                },\r\n                validate:function(){\r\n                    return true;\r\n                },\r\n                onsubmit:function(){\r\n                    var _this = this,\r\n                        _param = _this.getParam();\r\n                    if(_this.validate(_param)){\r\n                        if(_param.id){\r\n                            API.updateStation(_param);\r\n                        }else{\r\n                            API.createStation(_param);\r\n                        }\r\n                    }\r\n                },\r\n                oncancel:function(){\r\n                    this.dialogObj.dialog( \"destroy\" );\r\n                }\r\n            }\r\n        }\r\n    return {\r\n        show:function(id){\r\n            var $dialogWrap = $(\"#otherOptionEditTpl-dialog\").length?$(\"#otherOptionEditTpl-dialog\").replaceWith($($(\"#otherOptionEditTpl\").html())):$($(\"#otherOptionEditTpl\").html());\r\n\r\n            $dialogWrap.dialog({\r\n                modal:true,\r\n                show:300,\r\n                height:550,\r\n                width:900,\r\n                title:\"编辑\",\r\n                close:function(evt,ui){\r\n                    $(this).dialog( \"destroy\" );\r\n                },\r\n                open:function(){\r\n                    console.log('if id', id);\r\n                    $(\"form.jqtransform\").jqTransform();\r\n                    view = new (Backbone.View.extend(config.extobj))();\r\n                    view.dialogObj = $(this);\r\n\r\n                    if(id){\r\n                        API.getStationEditInfo(id);\r\n                    }\r\n                }\r\n            });\r\n\r\n        }\r\n    };\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./libs/jquery.min.js */ \"./libs/jquery.min.js\")))\n\n//# sourceURL=webpack:///./js/dialog-otherOptionEdit.js?");

/***/ })

}]);