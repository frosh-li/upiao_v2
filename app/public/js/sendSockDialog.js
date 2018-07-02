define(['require','api','common'],function(require,API,common){
    var view = null,
        config = {
            extobj : {
                data:null,
                listPlugin:[],
                el:'#socketEditTpl-dialog',
                events:{
                    "click .submit-btn":"onsubmit",
                    "click .next-btn":"onnext",
                    "click .cancel-btn":"oncancel"
                },
                initialize:function(data){
                    var _this = this;

                },

                showErrTips:function(tips){
                    alert(tips);
                    return false;
                },

                onsubmit:function(){
                    var _this = this;
                    var _param = common.getFormValue(this.el,true);

                    _param.serial_number = $("[key=sn_key]").val();

                    common.loadTips.show("正在保存，请稍后...");
                    console.log('发送指令参数',_param);
                    API.sendCmd({
                        cmd: _param.cmd,
                        sn_key:_param.serial_number
                    });

                },

                oncancel:function(){
                    var _this = this;
                    $(".ui-dialog,.ui-widget-overlay").remove();
                }
            }
        };
    return {
        show:function(id){
            var $dialogWrap = $("#socketEditTpl-dialog").length?$("#socketEditTpl-dialog").replaceWith($($("#socketEditTpl").html())):$($("#socketEditTpl").html());


            // $dialogWrap = $($dialogWrap);
            $dialogWrap.dialog({
                modal:true,
                show:300,
                height:500,
                width:550,
                title:"发送指令",
                close:function(evt,ui){
                    view.oncancel();
                },
                open:function(){

                    view = new (Backbone.View.extend(config.extobj))();
                    $("[key=sn_key]").val(id);
                    view.dialogObj = $(this);

                    $("form.jqtransform").jqTransform();
                }
            });

        },
        detroy:function(){
            view.oncancel();
        }
    };
})
