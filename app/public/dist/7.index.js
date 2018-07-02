(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./js/blocks/stationSelector.js":
/*!**************************************!*\
  !*** ./js/blocks/stationSelector.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,__webpack_require__(/*! api */ \"./js/api.js\"),__webpack_require__(/*! backbone */ \"./libs/backbone-min.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require,API,Backbone){\n    var zTree,\n        setting = {\n            source: function( request, response ) {\n                API.getStationSlectorList({q:request.term});\n                Backbone.Events.on(\"stationSelectorList:get\",function(ret){\n                    if(ret && ret.list){\n                        var stations=[];\n                        $.each(ret.list,function(id,name){\n                            stations.push({\n                                label:name,\n                                value:id\n                            })\n                        })\n                    }\n                    response(stations);\n                });\n            },\n            minLength:1\n        },\n        _autocomplete;\n\n    return {\n        init:function(option){\n            option = option||{};\n            return _autocomplete = $(option.ipt_id||'#stationSelector').autocomplete($.extend(setting,option.extOption||{}));\n        },\n        destroy:function(){\n            _autocomplete.autocomplete('destroy');\n        }\n    }\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./libs/jquery.min.js */ \"./libs/jquery.min.js\")))\n\n//# sourceURL=webpack:///./js/blocks/stationSelector.js?");

/***/ }),

/***/ "./js/dialog-batteryEdit.js":
/*!**********************************!*\
  !*** ./js/dialog-batteryEdit.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,__webpack_require__(/*! api */ \"./js/api.js\"),__webpack_require__(/*! common */ \"./js/common.js\"),__webpack_require__(/*! blocks/stationSelector */ \"./js/blocks/stationSelector.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require,API,common,stationSlector){\r\n    var view = null,\r\n        config = {\r\n            extobj : {\r\n                data:null,\r\n                listPlugin:[],\r\n                el:'#batteryEditTpl-dialog',\r\n                events:{\r\n                    \"click .submit-btn\":\"onsubmit\",\r\n                    \"click .next-btn\":\"onnext\",\r\n                    \"click .cancel-btn\":\"oncancel\"\r\n                },\r\n                initialize:function(data){\r\n                    var _this = this;\r\n                    _this.listenTo(Backbone.Events,\"batteryInfo:get\",function(data){\r\n                        _this.data = data;\r\n                        _this.setValue();\r\n                    });\r\n                    _this.listenTo(Backbone.Events,\"battery:create batteryInfo:update\",function(){\r\n                        _this.oncancel();\r\n                        window.location.reload();\r\n                        Backbone.Events.trigger(\"listdata:refresh\", \"batteryInfo\");\r\n                    });\r\n                    _this.listenTo(Backbone.Events,\"battery:create:next\",function(data){\r\n                        var data = _this.getParam();\r\n                        delete data.id;\r\n                        console.log('battery next',data);\r\n                        _this.oncancel();\r\n                        Backbone.Events.trigger(\"battery:next\", data);\r\n                    });\r\n                },\r\n                setValue:function(data){\r\n                    var data = data || this.data;\r\n                    if(data){\r\n                        common.setFormValue(this.el,data);\r\n                        $(\"[key=sid]\",this.el).val(data.serial_number || data.sid.substring(0,10));\r\n                        console.log('now data', data);\r\n                    }\r\n                },\r\n                getParam:function(){\r\n                    var obj = common.getFormValue(this.el,true);\r\n                    obj.serial_number = $(\"[key=sid]\").val();\r\n                    return obj;\r\n                },\r\n                showErrTips:function(tips){\r\n                    alert(tips);\r\n                    return false;\r\n                },\r\n                validate:function(param){\r\n                    if(!param.site_name){\r\n                        return this.showErrTips('站点为必填项');\r\n                    }\r\n                    if(!param.sid){\r\n                        return this.showErrTips('站点不存在');\r\n                    }\r\n                    var isvalidate = true;\r\n                    var $mastFills = $(\".mast-fill\",this.el);\r\n                    $mastFills.each(function(i,mf){\r\n                        var key = $(mf).attr(\"for\"),title;\r\n                        if(key && (typeof param[key] == \"undefined\" || !param[key])){\r\n                            title = $(mf).parent().html().replace(/<i[^>]*>.*(?=<\\/i>)<\\/i>/gi,'');\r\n                            alert(title+\"为必填项\");\r\n                            isvalidate = false;\r\n                            return false;\r\n                        }\r\n                    })\r\n                    if(!isvalidate){return false;}\r\n                    return true;\r\n                },\r\n                onsubmit:function(){\r\n                    var _this = this,\r\n                        _param = _this.getParam();\r\n\r\n                    if(_this.validate(_param)){\r\n                        if(_param.id){\r\n                            API.updateBatteryInfo(_param);\r\n                        }else{\r\n                            API.createBattery(_param);\r\n                        }\r\n                    }\r\n                },\r\n                onnext:function(){\r\n                    var _this = this,\r\n                        _param = _this.getParam();\r\n\r\n                    if(_this.validate(_param)){\r\n                        API.createBattery(_param,\"battery:create:next\");\r\n                    }\r\n                },\r\n                oncancel:function(){\r\n                    this.stopListening();\r\n                    this.dialogObj.dialog( \"destroy\" );\r\n                    $(\".ui-dialog,.ui-widget-overlay\").remove();\r\n                    stationList.autocomplete('destroy');\r\n                }\r\n            }\r\n        },\r\n        stationList;\r\n    return {\r\n        show:function(id,data){\r\n            var $dialogWrap = $(\"#batteryEditTpl-dialog\").length?$(\"#batteryEditTpl-dialog\").replaceWith($($(\"#batteryEditTpl\").html())):$($(\"#batteryEditTpl\").html());\r\n            var roleid = JSON.parse(localStorage.getItem('userinfo')).role;\r\n            var ifdisabled = \"\";\r\n            if(roleid != 1){\r\n                ifdisabled = \"disabled\";\r\n            }else{\r\n                ifdisabled = \"\";\r\n            }\r\n            $dialogWrap.dialog({\r\n                modal:true,\r\n                show:300,\r\n                height:560,\r\n                width:1000,\r\n                title:\"电池信息\",\r\n                close:function(evt,ui){\r\n                    view.oncancel();\r\n                },\r\n                open:function(){\r\n                    if(!id && data){\r\n                        $(\"[key=site_name]\").attr('disabled','disabled');\r\n                    }\r\n\r\n                    $(\"form.jqtransform\").jqTransform();\r\n                    view = new (Backbone.View.extend(config.extobj))();\r\n                    view.dialogObj = $(this);\r\n                    $(\"form.jqtransform\").html($(\"form.jqtransform\").html().replace(/{{disabled}}/g,ifdisabled));\r\n                    $(\"form.jqtransform\").find(\"[changedisabled=disabled]\").attr('disabled',true);\r\n                    if(id){\r\n                        $(\".submit-btn\",view.el).show();\r\n                        API.getBatteryInfo({id:id});\r\n                    }else{\r\n                        $(\".next-btn\",view.el).show();\r\n                    }\r\n\r\n                    if(data){\r\n                        console.log('battery init',data)\r\n                        data.sid = data.sid.substring(0,10);\r\n                        view.setValue(data);\r\n                    }\r\n\r\n                    stationList = stationSlector.init({\r\n                        extOption:{\r\n                            select:function(event, ui){\r\n                                console.log('setup list');\r\n                                $(this).val(ui.item.label);\r\n                                $(\"[key=sid]\").val(ui.item.value.substring(0,10));\r\n                                return false;\r\n                            }\r\n                        }\r\n                    });\r\n\r\n                    //日期选择器\r\n                    $( \"form.jqtransform [ipttype=date]\" ).datepicker({\r\n                        dateFormat: \"yy-mm-dd\"\r\n                    });\r\n                }\r\n            });\r\n        },\r\n        detroy:function(){\r\n            view.oncancel();\r\n        }\r\n    };\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./libs/jquery.min.js */ \"./libs/jquery.min.js\")))\n\n//# sourceURL=webpack:///./js/dialog-batteryEdit.js?");

/***/ })

}]);