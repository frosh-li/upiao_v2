define(function(require){
    var $ = require('jquery'),
        common = require('common'),
        API = {
            isContained:function(a, b){
                if(!(a instanceof Array) || !(b instanceof Array)) return false;
                if(a.length < b.length) return false;
                var aStr = a.toString();
            console.info(aStr);
                for(var i = 0, len = b.length; i < len; i++){
            console.info(aStr.indexOf(b[i]));
                   if(aStr.indexOf(b[i]) == -1) return false;
                }
                return true;
            },
            fetch: function (url, event, data, type, context,unalert, cb) {
                var _this = this;
                if(url.indexOf("query") > -1){
                    common.loadTips.show("数据加载中...");
                }
                $.ajax({
                    type: type || 'GET',
                    data: $.extend(true,{},data),
                    //jsonp: 'callback',
                    url: url,
                    success: function (res) {
                        common.loadTips.close();
                        typeof res == 'string' && (res = $.parseJSON(res));
                        if (!!res && typeof res === 'object') {
                            if(res.response.code == 0){
                                if(cb){
                                    res.data.callback = cb;
                                }
                                if(url == "/api/stationperson/index"){
                                    var filterdata = [];
                                    var userid = JSON.parse(localStorage.getItem("userinfo")).uid;
                                    var currentUser = null;

                                    $.each(res.data.list,function(i,item){
                                        console.log(i,item);
                                        if(item.id == userid){
                                            currentUser = item;
                                            return;
                                        }
                                    });
                                    if(currentUser.area== "*"){
                                        filterdata = res.data.list;
                                    }else{
                                        $.each(res.data.list,function(i,item){
                                            if(item.area != "*"){
                                                console.log(currentUser.area, item.area)
                                                if(_this.isContained(currentUser.area.split(","), item.area.split(","))){
                                                    filterdata.push(item);
                                                }
                                            }
                                        })
                                    }
                                    res.data = {
                                        list: filterdata
                                    }
                                }
                                console.log('start trigger', event);
                                Backbone.Events.trigger(event, res.data, context);
                                if(cb){
                                    cb();
                                }
                            }else if ( res.response.code == "-100") {
                                route.navigate('login',{trigger:true});
                            }else{
                                Backbone.Events.trigger(event+":fail", res, context);
                                if(unalert){
                                    return;
                                }
                                // alert(res.response.msg);
                            }
                        } else {
                            Backbone.Events.trigger(event,"error", res.response.message || res.response.msg);
                        }
                    },
                    error: function (res) {
                        //Backbone.Events.trigger(event, $.evalJSON(res.responseText), context);
                        //TODO:正式联调时替换为下列
                        common.loadTips.close();
                        console.log(res);
                        Backbone.Events.trigger("messager", {ret: 1, massage: url, data: []}, context || window);
                    }
                });
            },
            /***************************************获取底部状态栏***************************************/
            stat: function () {
                var url = '/api/stat/info';
                this.fetch(url, "stat", "get");
                return this;
            },
            /***************************************登陆***************************************/
            login: function (args) {
                var url = '/api/login';
                if(args.refresh){
                    this.fetch(url, "login:box", args, "post");
                }else if(args.chanagepwd){
                    this.fetch(url, "login:cpwd",args,"post");
                }else{
                    this.fetch(url, "login", args, "post");
                }

                return this;
            },
            /***************************************地图***************************************/
            getMapData: function (args,event) {
                var url = '/api/map/sites';
                this.fetch(url, event||"mapdata:update", args, "get");
                return this;
            },
            /***************************************左侧导航***************************************/
            getNavData: function (cb,args) {
                var hash = window.location.hash;
                // console.log(hash);
                var url = '/api/trees/getnav';
                if (hash == '#/qurey/qureyGroup' || hash == '#/qurey/qureyBattery' || hash == '#/qurey/qureyCaution'){
                    url += '?history=1';
                }
                this.fetch(url, "nav:update", args, "get",this,true, cb);
                return this;
            },
            /***************************************人员角色***************************************/
            getRolesData:function (args) {
                var url = '/api/role/index';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            getPersonalsData:function (args) {
                var url = '/api/stationperson/index';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            getPersonalInfo:function(args) {
                var url = '/api/stationperson/view';
                this.fetch(url, "personalInfo:get", args, "get");
                return this;
            },
            updatePersonalInfo:function(args) {
                var url = '/api/stationperson/update';
                this.fetch(url, "personal:update", args, "post");
                return this;
            },
            createPersonal:function(args) {
                var url = '/api/stationperson/create';
                this.fetch(url, "personal:create", args, "post");
                return this;
            },
            deletePersonal:function(args) {
                var url = '/api/stationperson/delete';
                this.fetch(url, "listitem:delete", args, "get");
                return this;
            },
            /***************************************树形图***************************************/
            getTreeInfo: function (args) {
                var url = '/api/trees';
                this.fetch(url, "tree:get", args, "get");
                return this;
            },
            updateTree: function (args) {
                var url = '/api/trees/update';
                this.fetch(url, "tree:update", args, "get");
                return this;
            },
            createTree: function (args) {
                var url = '/api/trees/create';
                this.fetch(url, "tree:create", args, "get");
                return this;
            },
            deleteTree: function (args) {
                var url = '/api/trees/delete';
                this.fetch(url, "tree:delete", args, "get");
                return this;
            },
            /***************************************站***************************************/
            getStationRealTimeData:function(args){
                var url = '/api/realtime';
                this.fetch(url, "stationdata:get", args, "post");
                return this;
            },
            getAboutInfo:function(args){
                var url = '/api/bmsinfo';
                this.fetch(url, "abouts:get", args, "get");
                return this;
            },
            getStationHistoryData:function(args){
                var url = '/api/query';
                this.fetch(url, "stationdata:get", args, "post");
                return this;
            },
            getSystemAlarm: function(args){
                var url = '/api/systemalarm';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            getGroupHistoryData:function(args){
                var url = '/api/query/groupmodule';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getBatteryHistoryData:function(args){
                var url = '/api/query/batterymodule';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getLinkingStationNum:function(args,event){
                var url = '/api/stat';
                this.fetch(url, event||"linknum:get", args, "get");
                return this;
            },
            createStation:function(args,events){
                var url = '/api/sites/create';
                this.fetch(url, events||"stationdata:create", args, "POST");
                return this;
            },
            updateStation:function(args){
                var url = '/api/sites/update';
                this.fetch(url, "stationdata:update", args, "POST");
                return this;
            },
            deleteStation:function(args){
                var url = '/api/sites/delete';
                this.fetch(url, "stationdata:delete", args, "POST");
                return this;
            },
            getNewStationData: function(args){
                var url = '/api/sites/newstations';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            getIRCollectData: function(args){
                var url = '/api/ircollect';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            updateCollect: function(args){
                var url = '/api/ircollect/update';
                this.fetch(url, "rCollect:start", args, "post");
                return this;
            },
            clearCollect: function(args){
                var url = '/api/ircollect/clear';
                this.fetch(url, "clear:start", args, "post");
                return this;
            },
            checkStation:function(args){
                var url = '/api/sites/check';
                this.fetch(url, "station:check", args, "get");
                return this;
            },
            getStationSlectorList: function (args) {
                var url = '/api/sites/suggest';
                this.fetch(url, "stationSelectorList:get", args, "get");
                return this;
            },
            getStationInfo: function (args) {
                var url = '/api/map/sitesinfo';
                this.fetch(url, "stationinfo:update", args, "get");
                return this;
            },
            getStationsInfo: function (args) {
                var url = '/api/sites';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getStationEditInfo: function (args) {
                var url = '/api/sites/view';
                this.fetch(url, "stationinfo:foredit:update", args, "get");
                return this;
            },
            getStationOptionEditInfo:  function (args) {
                var url = '/api/stationpara/view';
                this.fetch(url, "stationoption:get", args, "get");
                return this;
            },
            getSationOptionsData: function (args) {
                var url = '/api/stationpara/index';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            updateStationOption:function(args){
                var url = '/api/stationpara/update';
                this.fetch(url, "stationoption:update", args, "POST");
                return this;
            },
            /***************************************组***************************************/
            getGroupsData: function (args) {
                var url = '/api/realtime/groupmodule';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getGroupOptionData:function (args) {
                var url = '/api/grouppara/index';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getGroupOption:function (args) {
                var url = '/api/grouppara/view';
                this.fetch(url, "groupoption:get", args, "get");
                return this;
            },
            updateGroupOption:function (args) {
                var url = '/api/grouppara/update';
                this.fetch(url, "groupoption:update", args, "post");
                return this;
            },
            /***************************************短信邮箱***************************************/
            getMessagesData:function (args) {
                var url = '/api/alarmset/config';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            getMessageInfo:function(args) {
                var url = '/api/alarmset/view';
                this.fetch(url, "messageInfo:get", args, "get");
                return this;
            },
            updateMessage:function(args) {
                var url = '/api/alarmset/updateMsg';
                this.fetch(url, "message:update", args, "post");
                return this;
            },
            createMessage:function(args) {
                var url = '/api/alarmset/create';
                this.fetch(url, "message:create", args, "post");
                return this;
            },
            deleteMessage:function(args) {
                var url = '/api/alarmset/delete';
                this.fetch(url, "listitem:delete", args, "get");
                return this;
            },
            /***************************************电池***************************************/
            getBatterysRealTimeData: function (args) {
                var url = '/api/realtime/batterymodule';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getBatteryInfosData:function(args) {
            	var url = '/api/batteryinfo/index';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getBatteryInfo:function(args) {
            	var url = '/api/batteryinfo/view';
                this.fetch(url, "batteryInfo:get", args, "get");
                return this;
            },
            getBatteryOptionsData:function(args) {
            	var url = '/api/batterypara';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getBatteryOption:function(args) {
            	var url = '/api/batterypara/view';
                this.fetch(url, "batteryoption:get", args, "get");
                return this;
            },
            updateBatteryOption:function(args){
                var url = '/api/batterypara/update';
                this.fetch(url, "batteryoption:update", args, "POST");
                return this;
            },
            createBattery:function(args,event){
                var url = '/api/batteryinfo/create';
                this.fetch(url, event||"battery:create", args, "POST");
                return this;
            },
            updateBatteryInfo:function(args){
                var url = '/api/batteryinfo/update';
                this.fetch(url, "batteryInfo:update", args, "POST");
                return this;
            },
            deleteBattery:function(args){
                var url = '/api/batteryinfo/delete';
                this.fetch(url, "listitem:delete", args, "POST");
                return this;
            },
            /***************************************BMS***************************************/
            getBMSInfosData:function(args){
                var url = '/api/bmsinfo';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            getBMSInfo:function(args) {
            	var url = '/api/bmsinfo/view';
                this.fetch(url, "bmsInfo:get", args, "get");
                return this;
            },
            updateBMSInfo:function(args) {
            	var url = '/api/bmsinfo/update';
                this.fetch(url, "bms:update", args, "post");
                return this;
            },
            createBMS:function(args) {
            	var url = '/api/bmsinfo/create';
                this.fetch(url, "bms:create", args, "post");
                return this;
            },
            deleteBMS:function(args) {
            	var url = '/api/bmsinfo/delete';
                this.fetch(url, "listitem:delete", args, "get");
                return this;
            },
            /***************************************用户单位信息***************************************/
            getCompanyInfosData:function(args){
                var url = '/api/companyinfo';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            getCompanyInfo:function(args) {
            	var url = '/api/companyinfo/view';
                this.fetch(url, "companyInfo:get", args, "get");
                return this;
            },
            updateCompanyInfo:function(args) {
            	var url = '/api/companyinfo/update';
                this.fetch(url, "company:update", args, "post");
                return this;
            },
            createCompany:function(args) {
            	var url = '/api/companyinfo/create';
                this.fetch(url, "company:create", args, "post");
                return this;
            },
            deleteCompany:function(args) {
            	var url = '/api/companyinfo/delete';
                this.fetch(url, "listitem:delete", args, "get");
                return this;
            },
            /***************************************UPS***************************************/
            getUpsInfosData:function(args) {
            	var url = '/api/upsinfo/index';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getUpsInfo:function(args) {
            	var url = '/api/upsinfo/view';
                this.fetch(url, "upsInfo:get", args, "get");
                return this;
            },
            createUps:function(args){
                var url = '/api/upsinfo/create';
                this.fetch(url, "ups:create", args, "POST");
                return this;
            },
            updateUpsInfo:function(args){
                var url = '/api/upsinfo/update';
                this.fetch(url, "ups:update", args, "POST");
                return this;
            },
            deleteUps:function(args){
                var url = '/api/upsinfo/delete';
                this.fetch(url, "listitem:delete", args, "POST");
                return this;
            },
            /***************************************外控设备***************************************/
            getStationdeviceInfos: function (args) {
                var url = '/api/stationdevice/index';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            getStationdevice: function (args) {
                var url = '/api/stationdevice/view';
                this.fetch(url, "stationdevice:get", args, "get");
                return this;
            },
            createStationdevice: function (args) {
                var url = '/api/stationdevice/create';
                this.fetch(url, "stationdevice:create", args, "POST");
                return this;
            },
            deleteStationdevice: function (args) {
                var url = '/api/stationdevice/delete';
                this.fetch(url, "listitem:delete", args, "get");
                return this;
            },
            updateStationdevice: function (args) {
                var url = '/api/stationdevice/update';
                this.fetch(url, "stationdevice:update", args, "POST");
                return this;
            },
            /***************************************告警***************************************/
            getCautionsData: function (args,event,unalert) {
                var url = '/api/realtime/galarm';
                this.fetch(url, event||"listdata:update", args, "post",window,unalert);
                return this;
            },
            getCautionsHistoryData:function (args,event,unalert) {
                var url = '/api/realtime/galarmhistory';
                this.fetch(url, event||"listdata:update", args, "post",window,unalert);
                return this;
            },
            resolveCaution:function(args){
                var url = '/api/gerneralalarm/update';
                this.fetch(url, "caution:resolved", args, "post");
                return this;
            },
            /***************************************门限***************************************/
            getAlarmOptions: function (args) {//获取单个站的门限设置
                var url = '/api/alarmsiteconf';
                this.fetch(url, "alarmOptions:get", args, "get");
                return this;
            },
            openLimit:function(args){
                var url = '/api/alarmsiteconf/update?status=1';
                this.fetch(url, "limit:open", args, "get");
                return this;
            },
            closeLimit:function(args){
                var url = '/api/alarmsiteconf/update?status=2';
                this.fetch(url, "limit:close", args, "get");
                return this;
            },
            updateLimit:function(args){
                var url = '/api/alarmsiteconf/update';
                this.fetch(url, "alarmOptions:update", args, "post");
                return this;
            },
            /***************************************系统设置***************************************/
            getSyestemConfig:function(args){
                var url = 'data/systemConfig.json';
                this.fetch(url, "systemConfig:update", args, "get");
                return this;
            },
            /***************************************图表***************************************/
            getChartData: function (args) {
                console.log('chart args', args);
                var url = 'data/stationlist.json';
                this.fetch(url, "stations:update", args, "get");
                return this;
            },
            /***************************************参数***************************************/
            updateParam:function(args,event){
                var url = '/api/param';
                this.fetch(url, event||"param:update", args, "post");
                return this;
            },
            getParam:function(args,event){
                var url = '/api/param/getpara';
                this.fetch(url, event||"param:update", args, "post");
                return this;
            },
            /***************************************采集***************************************/
            collect:function(){
                Backbone.Events.trigger("listdata:refresh");
                return this;
            },
            forceCollect:function(){
                var url = '/api/uids/forcerin';
                this.fetch(url, event||"param:update", args, "post");
                return this;
            },
            /***************************************报表***************************************/
            //电池使用年限
            getByearlog:function(args){
                var url = '/api/report/byearlog';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            //报警
            getGerneralalarmlog:function(args){
                var url = '/api/gerneralalarm';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },

            //充放电
            getChargeOrDischarge: function(args){
                var url = '/api/report/chargeOrDischarge';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            //偏离趋势
            getDeviationTrend: function(args){
                var url = '/api/report/deviationTrend';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            //运行日志
            getRunlog:function(args){
                var url = '/api/runlog';
                this.fetch(url, "listdata:update", args, "get");
                return this;
            },
            //UI日志
            getUserlog:function(args){
                var url = '/api/userlog';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            //忽略警情列表
            getIgnoresData:function(args){
                var url = '/api/realtime/ignores';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            //忽略警情列表
            deleteIgnore:function(args){
                var url = '/api/realtime/removeIgnores';
                this.fetch(url, "listdata:update", args, "post");
                return this;
            },
            getChart:function(args,evttype,type){
                var url = {
                    'battery':'/api/realtime/batterychart',
                    'qureyBattery':'/api/realtime/batterychart',
                    'group':'/api/realtime/group',
                    'qureyGroup':'/api/realtime/groupchart',
                    'station':'/api/realtime',
                    'qureyStation':'/api/realtime/stationchart',
                    'caution':'/api/realtime/galarmchart'
                };
                // if(args.id.split(",").length <= 1){
                //     return this;
                // }
                //this.fetch(url[type], evttype||"chart:update", args, "get");
                return this;
            },
			syncHard: function(args, ctype){
				this.fetch(location.protocol+"//"+location.host+":3000/setparam?type="+ctype, null, args, "post");
			},
            sendAllMsg: function(args) {
                this.fetch(location.protocol+"//"+location.host+":3000/sendmsg", null, args, "post");
            },
            sendCmd: function(args){
                this.fetch(location.protocol+"//"+location.host+":3000/cmd", null, args, "post");
            }
        }

    return API;
})
