(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./js/blocks/levelSlector.js":
/*!***********************************!*\
  !*** ./js/blocks/levelSlector.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,__webpack_require__(/*! api */ \"./js/api.js\"),__webpack_require__(/*! backbone */ \"./libs/backbone-min.js\"),__webpack_require__(/*! zTreeExcheck */ \"./libs/jquery.ztree.excheck-3.5.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require,API,Backbone){\n    var zTree,\n        setting = {\n            check: {\n                enable: true,\n                chkStyle:\"radio\",\n                radioType:\"all\"\n            },\n            data: {\n                key:{\n                    name:'title'\n                },\n                simpleData: {\n                    enable: true,\n                    pIdKey: 'pid'\n                }\n            }\n        },\n        view;\n    var extobj = {\n        name:\"nav\",\n        data:null,\n        tree:null,\n        navPlugin:null,\n        initialize:function(option){\n            var _this = this;\n            _this.option={};\n            $.extend(_this.option,option||{});\n            _this.listenTo(Backbone.Events,\"tree:get\",function(data){\n                _this.data = data.list;\n                _this.filterData();\n                _this.render();\n            });\n        },\n        filterData:function(){\n            var _this = this;\n            if(_this.data){\n                $.each(_this.data,function(i,d){\n                    if(_this.option.value && _this.option.value == d.id ){\n                        d.checked = true\n                    }\n                })\n            }\n        },\n        getCheckedData:function(){\n            var checkedNodes = this.tree.getCheckedNodes(),\n                checkedData = {};\n            $.each(checkedNodes,function(i,node){\n                checkedData[node.id] = {\n                    id:node.id,\n                    pId:node.pId,\n                    name:node.name,\n                    level:node.level\n                }\n            })\n            return checkedData;\n        },\n        getValue:function(){\n            return this.tree.getCheckedNodes()[0]&&this.tree.getCheckedNodes()[0].id;\n        },\n        setValue:function(id){\n            if(id){\n                var node = this.tree.getNodesByParam(\"id\",id);\n                this.tree.checkNode(node,true,true);\n            }\n        },\n        destroy:function(){\n            this.stopListening();\n        },\n        render:function(){\n            var _this = this,$radios;\n            $.fn.zTree.init($(\"#treesWrap\"), setting, _this.data);\n            _this.tree = $.fn.zTree.getZTreeObj('treesWrap');\n            _this.tree.expandAll(true);\n\n            $radios = $(\"#treesWrap [treenode_switch]:not(.center_docu,.bottom_docu)\");\n            if($radios.length>1){\n                $radios.siblings(\"[treenode_check]\").remove()\n            }\n            return this;\n        }\n    }\n\n    return {\n        init:function(option){\n            view = new (Backbone.View.extend(extobj))(option);\n            API.getTreeInfo();\n            return view;\n        }\n    };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./libs/jquery.min.js */ \"./libs/jquery.min.js\")))\n\n//# sourceURL=webpack:///./js/blocks/levelSlector.js?");

/***/ }),

/***/ "./js/dialog-stationEdit.js":
/*!**********************************!*\
  !*** ./js/dialog-stationEdit.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,__webpack_require__(/*! api */ \"./js/api.js\"),__webpack_require__(/*! common */ \"./js/common.js\"),__webpack_require__(/*! blocks/levelSlector */ \"./js/blocks/levelSlector.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require,API,common,levelSelector){\r\n    var view = null,\r\n        config = {\r\n            extobj : {\r\n                data:null,\r\n                listPlugin:[],\r\n                el:'#stationEditTpl-dialog',\r\n                events:{\r\n                    \"click .submit-btn\":\"onsubmit\",\r\n                    \"click .next-btn\":\"onnext\",\r\n                    \"click .cancel-btn\":\"oncancel\"\r\n                },\r\n                initialize:function(data){\r\n                    var _this = this;\r\n\r\n                    _this.listenTo(Backbone.Events,\"stationinfo:foredit:update\",function(data){\r\n                        _this.data = data;\r\n                        _this.data.serial_number = _this.data.serial_number.substring(0,10);\r\n                        level = level||levelSelector.init({value:data.aid});\r\n                        _this.setValue();\r\n                    });\r\n                    _this.listenTo(Backbone.Events,\"stationdata:create stationdata:update\",function(data){\r\n                        common.loadTips.close();\r\n                        _this.oncancel();\r\n                        window.location.reload();\r\n                        Backbone.Events.trigger(\"listdata:refresh\", \"station\");\r\n                    });\r\n                    _this.listenTo(Backbone.Events,\"stationdata:create:fail stationdata:update:fail\",function(data){\r\n                        console.log('fail data', data)\r\n                        common.loadTips.close();\r\n                        alert(data.response.msg);\r\n                    });\r\n                    _this.listenTo(Backbone.Events,\"station:create:next\",function(data){\r\n                        common.loadTips.close();\r\n                        _this.oncancel();\r\n                        Backbone.Events.trigger(\"listdata:refresh\", \"station\");\r\n                        data.serial_number = $(\"[key=serial_number]\",this.el).val();\r\n                        Backbone.Events.trigger(\"station:next\", data);\r\n                    });\r\n                    _this.listenTo(Backbone.Events,\"station:create:next:fail\",function(data){\r\n                        common.loadTips.close();\r\n                        alert(data.response.msg);\r\n                    });\r\n                },\r\n                setValue:function(){\r\n                    if(this.data){\r\n                        common.setFormValue(this.el,this.data);\r\n                    }\r\n                },\r\n                getParam:function(){\r\n                    var obj = common.getFormValue(this.el,true);\r\n                    obj.serial_number = $(\"[key=serial_number]\",this.el).val()+\"0000\";\r\n                    console.log('getParam', obj);\r\n                    return obj;\r\n                },\r\n                showErrTips:function(tips){\r\n                    alert(tips);\r\n                    return false;\r\n                },\r\n                validate:function(param){\r\n                    if(!param.area){\r\n                        return this.showErrTips('隶属区域为必填项');\r\n                    }\r\n                    if(!param.sid){\r\n                        return this.showErrTips('站号为必填项');\r\n                    }\r\n\r\n                    var isvalidate = true;\r\n                    var $mastFills = $(\".mast-fill\",this.el);\r\n                    $mastFills.each(function(i,mf){\r\n                        var key = $(mf).attr(\"for\"),title;\r\n                        if(key && (typeof param[key] == \"undefined\" || !param[key])){\r\n                            title = $(mf).parent().html().replace(/<i[^>]*>.*(?=<\\/i>)<\\/i>/gi,'');\r\n                            alert(title+\"为必填项\");\r\n                            isvalidate = false;\r\n                            return false;\r\n                        }\r\n                    })\r\n                    if(!isvalidate){return false;}\r\n\r\n                    if(!/^\\d{14}$/.test(param.serial_number)){\r\n                        return this.showErrTips('物理地址必须为10位数字');\r\n                    }\r\n\r\n\r\n                    return true;\r\n                },\r\n                onsubmit:function(){\r\n                    var _this = this,\r\n                        _param = _this.getParam();\r\n\r\n                    _param.area = level.getValue();\r\n\r\n                    if(_this.validate(_param)){\r\n                        common.loadTips.show(\"正在保存，请稍后...\");\r\n                        if(_param.id){\r\n                            API.syncHard({\r\n                                sn_key:_param.serial_number,\r\n                                CurSensor:_param.CurSensor || 101,\r\n                                sid:_param.sid,\r\n                                Groups:_param.groups,\r\n                                GroBats:_param.batteries\r\n                            },\"StationPar\");\r\n\r\n                            API.updateStation(_param);\r\n                        }else{\r\n                            API.syncHard({\r\n                                sn_key:_param.serial_number,\r\n                                CurSensor:_param.CurSensor || 101,\r\n                                sid:_param.sid,\r\n                                Groups:_param.groups,\r\n                                GroBats:_param.batteries\r\n                            },\"StationPar\");\r\n\r\n                            API.createStation(_param);\r\n                            \r\n                        }\r\n                    }\r\n                },\r\n                onnext:function(){\r\n                    var _this = this,\r\n                        _param = _this.getParam();\r\n\r\n                    _param.area = level.getValue();\r\n\r\n                    if(_this.validate(_param)){\r\n                        API.createStation(_param,\"station:create:next\");\r\n                    }\r\n                },\r\n                oncancel:function(){\r\n                    this.stopListening();\r\n                    level.destroy();\r\n                    level = null;\r\n                    this.dialogObj.dialog( \"destroy\" );\r\n                    $(\".ui-dialog,.ui-widget-overlay\").remove();\r\n                }\r\n            }\r\n        },\r\n        level;\r\n    return {\r\n        show:function(id, bringdata){\r\n            var $dialogWrap = $(\"#stationEditTpl-dialog\").length?$(\"#stationEditTpl-dialog\").replaceWith($($(\"#stationEditTpl\").html())):$($(\"#stationEditTpl\").html());\r\n            var roleid = JSON.parse(localStorage.getItem('userinfo')).role;\r\n            var ifdisabled = \"\";\r\n            if(roleid != 1){\r\n                ifdisabled = \"disabled\";\r\n            }else{\r\n                ifdisabled = \"\";\r\n            }\r\n\r\n            // $dialogWrap = $($dialogWrap);\r\n            $dialogWrap.dialog({\r\n                modal:true,\r\n                show:300,\r\n                height:820,\r\n                width:1000,\r\n                title:id?\"编辑站点\":\"添加站点\",\r\n                close:function(evt,ui){\r\n                    view.oncancel();\r\n                },\r\n                open:function(){\r\n                    \r\n                    view = new (Backbone.View.extend(config.extobj))();\r\n\r\n                    view.dialogObj = $(this);\r\n                    $(\"form.jqtransform\").html($(\"form.jqtransform\").html().replace(/{{disabled}}/g,ifdisabled));\r\n                    $(\"form.jqtransform\").find(\"[changedisabled=disabled]\").attr('disabled',true);\r\n                    if(id){\r\n                        $(\".submit-btn\",view.el).show();\r\n                        API.getStationEditInfo({id:id});\r\n                    }else{\r\n                        $(\".next-btn\",view.el).show();\r\n                        //层级选择器\r\n                        level = levelSelector.init();\r\n                    }\r\n                    if(bringdata){\r\n                        console.log('bringdata',bringdata)\r\n                        $(\"[key=serial_number]\").val(bringdata.sn_key.substring(0,10));\r\n                        $(\"[key=sid]\").val(bringdata.sid);\r\n                        $(\"[key=groups]\").val(bringdata.Groups);\r\n                        $(\"[key=batteries]\").val(bringdata.GroBats);\r\n                        $(\"[key=CurSensor]\").val(bringdata.CurSensor);\r\n                    }\r\n                    //日期选择器\r\n                    $( \"form.jqtransform [key=bms_install_date]\" ).datepicker({\r\n                        dateFormat: \"yy-mm-dd\"\r\n                    });\r\n\r\n                    $(\"form.jqtransform\").jqTransform();\r\n                }\r\n            });\r\n\r\n        },\r\n        detroy:function(){\r\n            view.oncancel();\r\n        }\r\n    };\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./libs/jquery.min.js */ \"./libs/jquery.min.js\")))\n\n//# sourceURL=webpack:///./js/dialog-stationEdit.js?");

/***/ })

}]);