require.config({
    baseUrl:'',
    urlArgs:'_v='+(+new Date()),
    packages:[
        {
            name: 'zrender',
            location: 'libs/chart/zrender', // zrender与echarts在同一级目录
            main: 'zrender'
        }
    ],
    waitSeconds: 0,
    paths:{
        'jquery': 'libs/jquery.min',
        'jqueryUI':'libs/jqueryui/jquery-ui.min',
        'jqueryTime':'libs/jqueryui/jquery-ui-timepicker-addon.min',
        'jJson': 'libs/jquery.json',
        'jForm': 'libs/jquery.jqtransform',
        'jtimer': 'libs/jQuery.timers',
        'domReady':'libs/domReady',
        'backbone':'libs/backbone-min',
        '_':'libs/underscore-min',
        'bootstrap':'libs/bootstrap',
        "charts":"libs/echarts.min",
        'zTreeCore':'libs/jquery.ztree.core-3.5',
        'zTreeExcheck':'libs/jquery.ztree.excheck-3.5',
        'scrollbar':'libs/scrollbar/min/perfect-scrollbar.jquery.min',
        'mCustomScrollbar':'libs/jquery.mCustomScrollbar.concat.min',
        'table':'libs/jquery.dataTables',
        'fixedColumn':'libs/dataTables.fixedColumns.min',
        'fixedHeader':'libs/dataTables.fixedHeader.min',
	    "respond":"js/respond",
        "router" :"js/router",
        "api" :"js/api",
        "main" :"js/main",
        "login" :"js/login",
        "ui" :"js/ui",
        "common" :"js/common",
        "map" :"js/map",
        "context" :"js/context_model",
        "blocks":"js/blocks",
        "stationsinfoDialog":"js/dialog-stationsinfo",
        "dialogstationsinfo":"js/dialog-stationsinfo",
        "dialogBMSEdit":"js/dialog-BMSEdit",
        "dialogCompanyEdit":"js/dialog-CompanyEdit",
        "dialogUPSEdit":"js/dialog-UPSEdit",
        "dialogabout":"js/dialog-about",
        "dialogbatteryEdit":"js/dialog-batteryEdit",
        "dialogbatteryOptionEdit":"js/dialog-batteryOptionEdit",
        "dialogcollectPswdDialog":"js/dialog-collectPswdDialog",
        "dialogdeviceEdit":"js/dialog-deviceEdit",
        "dialoggroupOptionEdit":"js/dialog-groupOptionEdit",
        "dialoglimitationEdit":"js/dialog-limitationEdit",
        "dialoglogin":"js/dialog-login",
        "dialogmessageEdit":"js/dialog-messageEdit",
        "dialogotherOptionEdit-del":"js/dialog-otherOptionEdit-del",
        "dialogotherOptionEdit":"js/dialog-otherOptionEdit",
        "dialogpersonalEdit":"js/dialog-personalEdit",
        "dialogresolveCaution":"js/dialog-resolveCaution",
        "dialogstationEdit":"js/dialog-stationEdit",
        "dialogstationOptionEdit":"js/dialog-stationOptionEdit",
        "dialogstationsinfo":"js/dialog-stationsinfo"
    },
    shim:{
        bootstrap:['jquery'],
        table:['jquery'],
        jtimer:['jquery'],
        fixedColumn:['jquery','table'],
        common:['jquery'],
        zTreeCore:['jquery'],
        zTreeExcheck:['zTreeCore'],
        jJson:['jquery'],
        jForm:['jquery'],
        jqueryUI:['jquery'],
        jqueryTime:['jquery','jqueryUI'],
        backbone:['_'],
	    respond:['']
    }
})

require(["jquery","router","api","table","jJson","jtimer","charts","jJson","bootstrap","jqueryUI","ui","jForm","jqueryTime"],function($,router,API){
    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * eg:
     * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
     * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
     * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
     * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
     */

    Date.prototype.pattern=function(fmt) {
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "日",
            "1" : "一",
            "2" : "二",
            "3" : "三",
            "4" : "四",
            "5" : "五",
            "6" : "六"
        };
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }



    setInterval(function(){
        $("#realtime").html('本地时间：'+ (new Date()).pattern("yyyy-MM-dd EEE HH:mm:ss"));
        // API.stat();
    },1000)

    
      $.timepicker.setDefaults( $.timepicker.regional[ "zh-CN" ] );
      
      $.timepicker.regional['zh-CN'] = {

        closeText: '关闭',
        prevText: '<上月',
        nextText: '下月>',
        currentText: '今天',
        monthNames: ['一月','二月','三月','四月','五月','六月',
        '七月','八月','九月','十月','十一月','十二月'],
        monthNamesShort: ['一月','二月','三月','四月','五月','六月',
        '七月','八月','九月','十月','十一月','十二月'],
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        dayNamesMin: ['日','一','二','三','四','五','六'],
        weekHeader: '周',
        dateFormat: 'yy/mm/dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '年',
    timeOnlyTitle: '选择时间',
        timeText: '时间',
        hourText: '小时',
        minuteText: '分钟',
        secondText: '秒钟',
        millisecText: '毫秒',
        microsecText: '微秒',
        timezoneText: '时区',
        currentText: '现在时间',
        closeText: '关闭',
        timeFormat: 'HH:mm',
        timeSuffix: '',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false,};
        $.datepicker.setDefaults( $.timepicker.regional[ "zh-CN" ] );
      $.timepicker.setDefaults($.timepicker.regional['zh-CN']);
        $(document).tooltip();
        router.start();
    

})