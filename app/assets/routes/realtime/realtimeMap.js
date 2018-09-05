import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import {  Input, Button, Modal,message, Row, Col, Icon, TreeSelect, Table,Switch, Card, Drawer} from 'antd';

import numeral from 'numeral';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/legend';

import Authorized from '../../utils/Authorized';
import styles from './realtime.less';

@connect(({ realtime, loading }) => ({
    realtime,
    loading: loading.models.list,
}))
export default class RealtimeMapPage extends Component {

    state = {
        visible: false,
        currentStation: {
            sn_key: "",
        },
    }

    showDrawer = (sn_key) => {
        this.setState({
            visible: true,
            currentStation: {
                sn_key: sn_key
            }
        });
    };

    async componentDidMount() {
        await this.fetchRealtime();
        this.renderChart();
        this.renderCautionChart();
        this.interval = setInterval(async () =>{
            await this.fetchRealtime();
            this.renderChart();
            this.renderCautionChart();
        }, 10000);
    }

    Resize() {

    }

    componentWillUnmount() {
        clearInterval(this.interval);
        // 所有的chart的销毁
        // let myChart = echarts.getInstanceByDom(currentNode);
        ['lifetime_chart', 'capacity_chart', 'caution_chart'].forEach(item => {
            let currentNode = document.getElementById(item);

            let myChart = echarts.getInstanceByDom(currentNode);
            if( myChart === undefined){
                return;
            }
            myChart.dispose();
        });
    }

    fetchRealtime(payload = {}) {
        const { dispatch } = this.props;
        Promise.all([
            dispatch({
                type: 'realtime/fetch',
                payload: payload,
            }),
            dispatch({
                type: 'realtime/fetchCapacity',
                payload: payload,
            }),
            dispatch({
                type: 'realtime/fetchLifetime',
                payload: payload,
            })
        ])
    }

    renderChart() {
        let ret = null;
        const {
          realtime: {list: data, lifetimeTop10: lifetimeData, capacityTop10: capacityData},
          loading,
        } = this.props;
        console.log(data, lifetimeData, capacityData)
        let capacity_data = [];
        let lifetime_data = [];

        let x_for_capacity = [];
        let x_for_lifetime = [];

        capacityData && capacityData.forEach((item) => {
            capacity_data.push(+item.val);
            x_for_capacity.push(item.station_name);
        });

        lifetimeData && lifetimeData.forEach((item) => {
            lifetime_data.push(+item.val);
            x_for_lifetime.push(item.station_name);
        });

        console.log(lifetime_data, capacity_data, x_for_lifetime, x_for_capacity);

        //获取Chart的真实DOM,虽然react不推荐操作真实DOM,但是Echart对图表的渲染就是基于真实DOM的
        ['lifetime_chart', 'capacity_chart'].forEach(item => {
            let currentNode = document.getElementById(item);
            let parentWidth = currentNode.parentNode.clientWidth;
            currentNode.style.width = parentWidth + "px";
            currentNode.style.height = "300px";
            // let myChart;
            let myChart = echarts.getInstanceByDom(currentNode);
            if( myChart === undefined){
                myChart = echarts.init(currentNode);
            }
            let option = {

                xAxis: {
                    type: 'category',
                    data: item === "lifetime_chart" ? x_for_lifetime:x_for_capacity,
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: [
                    {
                        type : 'value'
                    }
                ],
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                series: [{
                    name: item === "lifetime_chart" ? "寿命": "容量",
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: item === "lifetime_chart" ? lifetime_data:capacity_data,
                    barWidth: '60%',
                }]
            }

            try{
                console.log(option);
                myChart.setOption(option)
            }catch(e) {
                console.log(e);
            }
        })

    }

    renderCautionChart() {
        let ret = null;
        const {
          realtime: {list: data},
          loading,
        } = this.props;

        //获取Chart的真实DOM,虽然react不推荐操作真实DOM,但是Echart对图表的渲染就是基于真实DOM的
        let item = "caution_chart";
        let currentNode = document.getElementById(item);
        let parentWidth = currentNode.parentNode.clientWidth;
        currentNode.style.width = parentWidth + "px";
        currentNode.style.height = "400px";
        // let myChart;
        let myChart = echarts.getInstanceByDom(currentNode);
        if( myChart === undefined){
            myChart = echarts.init(currentNode);
            myChart.on('click', (params) => {
                console.log(params);
                this.showDrawer(params.data.sn_key);
            });
        }
        let cautionStationData_O = [];
        let cautionStationData_R = [];
        let cautionStationData_Y = [];
        let x_for_caution = [];
        data.forEach(item => {
            cautionStationData_R.push({
                value:item.red,
                sn_key: item.sn_key,
            });
            cautionStationData_O.push({
                value:item.orange,
                sn_key: item.sn_key,
            });
            cautionStationData_Y.push({
                value:item.yellow,
                sn_key: item.sn_key,
            });
            x_for_caution.push(item.station_name);
            //
            // cautionStationData.push({
            //     value: item.red + item.orange + item.yellow,
            //     name: item.station_name,
            // })
        })
        let option = {
            legend: {
                data:['红警','橙警','黄警']
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: x_for_caution,
                axisTick: {
                    alignWithLabel: true
                }
            },
            yAxis: [
                {
                    type : 'value'
                }
            ],
            series: [{
                name: "红警",
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: cautionStationData_R,
                itemStyle: {
                    color: "red"
                },
                // barWidth: '60%',

            },{
                name: "橙警",
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: cautionStationData_O,
                itemStyle: {
                    color: "#e7691d"
                },
                // barWidth: '60%',

            },{
                name: "黄警",
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: cautionStationData_Y,
                itemStyle: {
                    color: "#fabd05"
                },
                //barWidth: '60%',
            }]
        }

        try{
            console.log(option);
            myChart.setOption(option)
        }catch(e) {
            console.log(e);
        }


    }

    onClose = () => {
        console.log('close drawer');
        this.setState({
            visible: false,
        })
    }


    render() {
        const {
          realtime: {list: data, lifetimeTop10: lifetimeData, capacityTop10: capacityData},
          loading,
        } = this.props;
        // console.log('chart data', data);

        return (
            <Fragment>
              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                  <Card title="报警站点 TOP10" bordered={false} id="map_card">
                      <div id="caution_chart">
                      </div>
                  </Card>
                </Col>

              </Row>

              <Row gutter={24}>
                <Col xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 24 }}>
                  <Card title="电池寿命 TOP10" bordered={false} id="battery_lifetime">
                      <div id="lifetime_chart">
                      </div>
                  </Card>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 24 }}>
                  <Card title="电池容量 TOP10" bordered={false} id="battery_capacity">
                      <div id="capacity_chart">
                      </div>
                  </Card>
                </Col>
              </Row>
              <Drawer
                  width={640}
                  placement="right"
                  closable={true}
                  onClose={this.onClose}
                  visible={this.state.visible}
                >
                    <p>{this.state.currentStation.sn_key}</p>
                </Drawer>
          </Fragment>
        );
    }
}
