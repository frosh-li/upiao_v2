(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./js/blocks/levelSlector.js":
/*!***********************************!*\
  !*** ./js/blocks/levelSlector.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,__webpack_require__(/*! api */ \"./js/api.js\"),__webpack_require__(/*! backbone */ \"./libs/backbone-min.js\"),__webpack_require__(/*! zTreeExcheck */ \"./libs/jquery.ztree.excheck-3.5.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require,API,Backbone){\n    var zTree,\n        setting = {\n            check: {\n                enable: true,\n                chkStyle:\"radio\",\n                radioType:\"all\"\n            },\n            data: {\n                key:{\n                    name:'title'\n                },\n                simpleData: {\n                    enable: true,\n                    pIdKey: 'pid'\n                }\n            }\n        },\n        view;\n    var extobj = {\n        name:\"nav\",\n        data:null,\n        tree:null,\n        navPlugin:null,\n        initialize:function(option){\n            var _this = this;\n            _this.option={};\n            $.extend(_this.option,option||{});\n            _this.listenTo(Backbone.Events,\"tree:get\",function(data){\n                _this.data = data.list;\n                _this.filterData();\n                _this.render();\n            });\n        },\n        filterData:function(){\n            var _this = this;\n            if(_this.data){\n                $.each(_this.data,function(i,d){\n                    if(_this.option.value && _this.option.value == d.id ){\n                        d.checked = true\n                    }\n                })\n            }\n        },\n        getCheckedData:function(){\n            var checkedNodes = this.tree.getCheckedNodes(),\n                checkedData = {};\n            $.each(checkedNodes,function(i,node){\n                checkedData[node.id] = {\n                    id:node.id,\n                    pId:node.pId,\n                    name:node.name,\n                    level:node.level\n                }\n            })\n            return checkedData;\n        },\n        getValue:function(){\n            return this.tree.getCheckedNodes()[0]&&this.tree.getCheckedNodes()[0].id;\n        },\n        setValue:function(id){\n            if(id){\n                var node = this.tree.getNodesByParam(\"id\",id);\n                this.tree.checkNode(node,true,true);\n            }\n        },\n        destroy:function(){\n            this.stopListening();\n        },\n        render:function(){\n            var _this = this,$radios;\n            $.fn.zTree.init($(\"#treesWrap\"), setting, _this.data);\n            _this.tree = $.fn.zTree.getZTreeObj('treesWrap');\n            _this.tree.expandAll(true);\n\n            $radios = $(\"#treesWrap [treenode_switch]:not(.center_docu,.bottom_docu)\");\n            if($radios.length>1){\n                $radios.siblings(\"[treenode_check]\").remove()\n            }\n            return this;\n        }\n    }\n\n    return {\n        init:function(option){\n            view = new (Backbone.View.extend(extobj))(option);\n            API.getTreeInfo();\n            return view;\n        }\n    };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./libs/jquery.min.js */ \"./libs/jquery.min.js\")))\n\n//# sourceURL=webpack:///./js/blocks/levelSlector.js?");

/***/ }),

/***/ "./js/dialog-messageEdit.js":
/*!**********************************!*\
  !*** ./js/dialog-messageEdit.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__,__webpack_require__(/*! api */ \"./js/api.js\"),__webpack_require__(/*! common */ \"./js/common.js\"),__webpack_require__(/*! blocks/levelSlector */ \"./js/blocks/levelSlector.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require,API,common,levelSelector){\n    var view = null,\n        config = {\n            extobj : {\n                data:null,\n                listPlugin:[],\n                el:'#messageEditTpl-dialog',\n                events:{\n                    \"click .submit-btn\":\"onsubmit\",\n                    \"click .cancel-btn\":\"oncancel\"\n                },\n                initialize:function(data){\n                    var _this = this;\n                    _this.listenTo(Backbone.Events,\"message:update\",function(data){\n                        _this.data = data;\n                        level = level||levelSelector.init({value:data.aid});\n                        _this.setValue();\n                    });\n                    _this.listenTo(Backbone.Events,\"message:create message:update\",function(){\n                        _this.oncancel();\n                        Backbone.Events.trigger(\"listdata:refresh\", \"message\");\n                    });\n                },\n                setValue:function(){\n                    if(this.data){\n                        common.setFormValue(this.el,this.data);\n                    }\n                },\n                getParam:function(){\n                    var param = common.getFormValue(this.el,true);\n\n                    param.phone_status = \"0\";\n                    if($(\"[key=phone_status]\",this.el).siblings(\".jqTransformChecked\").length){\n                        param.phone_status = \"1\";\n                    }\n                    param.email_status = \"0\";\n                    if($(\"[key=email_status]\",this.el).siblings(\".jqTransformChecked\").length){\n                        param.email_status = \"1\";\n                    }\n\n                    return param;\n                },\n                showErrTips:function(tips){\n                    alert(tips);\n                    return false;\n                },\n                validate:function(param){\n                    var isvalidate = true;\n                    $mastFills = $(\".mast-fill\",this.el);\n                    $mastFills.each(function(i,mf){\n                        var key = $(mf).attr(\"for\"),title;\n                        if(key && (typeof param[key] == \"undefined\" || !param[key])){\n                            title = $(mf).parent().html().replace(/<i[^>]*>.*(?=<\\/i>)<\\/i>/gi,'');\n                            alert(title+\"为必填项\");\n                            isvalidate = false;\n                            return false;\n                        }\n                    })\n\n                    return isvalidate;\n                },\n                onsubmit:function(){\n                    var _this = this,\n                        _param = _this.getParam();\n\n                    _param.area = level.getValue();\n\n                    if(_this.validate(_param)){\n                        if(_param.id){\n                            API.updateMessage(_param);\n                        }else{\n                            API.createMessage(_param);\n                        }\n                    }\n                },\n                oncancel:function(){\n                    this.stopListening();\n                    level.destroy();\n                    level = null;\n                    this.dialogObj.dialog( \"destroy\" );\n                    $(\".ui-dialog,.ui-widget-overlay\").remove();\n                }\n            }\n        },\n        level;\n    return {\n        show:function(id){\n            var $dialogWrap = $(\"#messageEditTpl-dialog\").length?$(\"#messageEditTpl-dialog\").replaceWith($($(\"#messageEditTpl\").html())):$($(\"#messageEditTpl\").html());\n\n            $dialogWrap.dialog({\n                modal:true,\n                show:300,\n                height:420,\n                width:600,\n                title:id?\"编辑短信/邮箱\":\"添加短信/邮箱\",\n                close:function(evt,ui){\n                    view.oncancel();\n                },\n                open:function(){\n                    $(\"form.jqtransform\").jqTransform();\n                    view = new (Backbone.View.extend(config.extobj))();\n                    view.dialogObj = $(this);\n\n                    if(id){\n                        API.getMessageInfo({id:id});\n                    }else{\n                        //层级选择器\n                        level = levelSelector.init();\n                    }\n                    //日期选择器\n                    $( \"form.jqtransform [key=bms_install_date]\" ).datepicker({\n                        dateFormat: \"yy-mm-dd\"\n                    });\n                }\n            });\n\n        },\n        detroy:function(){\n            view.oncancel();\n        }\n    };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./libs/jquery.min.js */ \"./libs/jquery.min.js\")))\n\n//# sourceURL=webpack:///./js/dialog-messageEdit.js?");

/***/ })

}]);