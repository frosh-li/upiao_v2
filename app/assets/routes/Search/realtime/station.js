import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { Tree, Input, Button, Modal,message, Form, Row, Col, Icon, TreeSelect, Table,Menu, Dropdown, Pagination, DatePicker} from 'antd';
const {TreeNode} = Tree;
const confirm = Modal.confirm;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import styles from './realtime.less';
// 历史数据查询
@Form.create()
@connect(({ realtime,areatree, loading }) => ({
    realtime,
    areatree,
    loading: loading.models.realtime,
}))
export default class StationPage extends Component {

    static defaultProps = {
        searchPage: false,
        columns: [
            { dataIndex: "station_name", key: "station_name",title:"站名",width:150,fixed: 'left', },
            { dataIndex: "sid", key: "sid","title":"站号",width:80 ,fixed: 'left',},
            { dataIndex: "Current", key: "Current",title:"电流A",width:120 },
            { dataIndex: "Voltage", key: "Voltage",title:"电压V",width:120 },
            { dataIndex: "Temperature", key: "Temperature",title:"温度℃",width:120},
            { dataIndex: "Humidity", key: "Humidity",title:"湿度%",width:120 },
            { dataIndex: "Lifetime", key: "Lifetime",title:"寿命%",width:120 },
            { dataIndex: "Capacity", key: "Capacity",title:"预估容量%",width:100 },
            { dataIndex: "ChaState", key: "ChaState",title:"UPS状态",width:70, render: function(data){
                if(data == 1){
                    return "充电";
                }else if(data == 2){
                    return "放电";
                }else{
                    return "浮充";
                }
            } },
            { dataIndex: "record_time", key: "record_time",title:"时间",width:300},
            { dataIndex: "Groups", key: "Groups",title:"组数",width:50  },
            { dataIndex: "GroBats", key: "GroBats",title:"电池数",width:80  },
            { dataIndex: "ups_maintain_date", key: "ups_maintain_date",title:"维护日期",width:180, render:function(data){
                var wh = +new Date(data);
                var now = +new Date();
                var dis = (wh - now)/1000/60/60/24;
                if(dis < 7 && dis > 0){
                    return (
                        <div style={{color:"red"}}>{data}</div>
                    )
                }else{
                    return data;
                }
            }},
            { dataIndex: "ups_power", key: "ups_power",title:"功率W/h",width:70 },
            // { dataIndex: "MaxTem_R", key: "MaxTem_R",title:"温度上限℃",width:130 },
            // { dataIndex: "MinTem_R", key: "MinTem_R",title:"温度下限℃",width:130 },
            // { dataIndex: "MaxHum_R", key: "MaxHum_R",title:"湿度上限%",width:130 },
            // { dataIndex: "MinHum_R", key: "MinHum_R",title:"湿度下限%",width:130 },
            // { dataIndex: "DisChaLim_R", key: "DisChaLim_R",title:"最大放电电流A",width:130 },
            // { dataIndex: "ChaLim_R", key: "ChaLim_R",title:"最大充电电流A",width:130 },

        ]
    }

    constructor(props) {
        super(props);
    }

    state = {
        aid: '',
        hasPrev: true,
        hasNext: true,
    }

    search_payload = {}



    componentDidMount() {
        this.fetchMore();
        this.fetchTree();
    }

    fetchMore(payload = {}) {
        const { dispatch } = this.props;
        dispatch({
            type: 'realtime/fetchHistory',
            payload: payload,
        });
    }

    handleAction = (data) => {
        console.log('handle action', data);
    }

    fetchTree() {
        const { dispatch } = this.props;
        dispatch({
            type: 'areatree/fetch',
            payload: {},
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.search_payload = {};
        this.fetchMore(this.search_payload);
    }

    handleSearch = (e) => {
        console.log('start to search');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err){
                console.log(err);
                return;
            }
            if(!values || !values.aid) {
                values.aid = [];
            }
            let dateranger = "";
            if(!values || !values.dateranger) {
                dateranger = ""
            }else{
                dateranger = [
                    values.dateranger[0].format('YYYY-MM-DD HH:mm:ss'),
                    values.dateranger[1].format('YYYY-MM-DD HH:mm:ss'),
                ].join(",")
            }
            let params = {
                table: 'station_data',
                aid: values.aid.join(","),
                search_key: values.search_key,
                dateranger: dateranger,
            }

            this.search_payload = params;
            this.fetchMore(this.search_payload);
            console.log('Received values of form: ', params);
        });
    }

    onChangeTreeNode = (value) => {
        this.props.form.setFieldsValue({
            aid: value
        })
        this.setState({
            aid: value
        })
    }

    getFields = () => {
        console.log(this.props.areatree, 'areatree');
        const { getFieldDecorator } = this.props.form;
        const children = [];

        children.push(
            <Col span={8} key="0">
              <FormItem label='站名/站号'>
                {getFieldDecorator(`search_key`, {
                })(
                  <Input placeholder="请输入站名或者站号" />
                )}
              </FormItem>
            </Col>
        );

        children.push(
            <Col span={8} key="1">
              <FormItem label='所属区域'>
                    {getFieldDecorator(`aid`, {
                    })(
                          <Input placeholder="请输入站名或者站号" type="hidden" />
                    )}
                    <TreeSelect
                        treeCheckable={true}
                        treeData = {this.props.areatree.list}
                        value={this.state.aid}

                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="选择区域"
                        allowClear
                        multiple
                        treeDefaultExpandAll
                        onChange={this.onChangeTreeNode}>
                    </TreeSelect>

              </FormItem>
            </Col>
        );

        children.push(
            <Col span={8} key="2">
              <FormItem label='站名/站号'>
                {getFieldDecorator(`dateranger`, {
                })(
                    <RangePicker
                        locale={locale}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={['开始时间', '结束时间']}
                      />
                )}
              </FormItem>
            </Col>
        );

        return children;
    }

    addNewStation = () => {
        const {dispatch} = this.props;
        dispatch(routerRedux.push('/setting/baseinfo/station-list/create'));
    }

    renderBtns = () => {

        return (
            <Fragment>
                <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    清空查询
                </Button>
            </Fragment>
        )
    }



    pageNext = () =>{
        const { dispatch, realtime: {
            dataIndex: {
                startId: startId,
                endId: endId,
                startIndex: startIndex,
                endIndex: endIndex,
                oldStartId: oldStartId,
            }
        } } = this.props;
        let params = this.search_payload;
        dispatch({
            type: 'realtime/fetchHistory',
            payload: {
                ...params,
                startId: endId,
                startIndex: endIndex,
                oldStartId: startId,
            },
        });
    }

    pagePrev = () =>{
        const { dispatch, realtime: {
            dataIndex: {
                startId: startId,
                endId: endId,
                startIndex: startIndex,
                endIndex: endIndex,
                oldStartId: oldStartId,
            }
        } } = this.props;
        let params = this.search_payload;
        dispatch({
            type: 'realtime/fetchHistory',
            payload: {
                ...params,
                startId: oldStartId,
            },
        });
    }

    render() {
        const {
          realtime: {
              history: data,
              dataIndex: {
                  startId: startId,
              }
          },
          loading,
        } = this.props;
        console.log('data', data);


        console.log('render columns', this.props.columns);
        let x = 0;
        this.columns = [];
        if(this.props.searchPage === true) {
            this.props.columns.forEach((item) => {
                if(item.key === 'operators'){
                    return;
                }else{
                    this.columns.push(item);
                }
            })
            x = 100
        }else {
            this.columns = this.props.columns;
        }



        return (
            <div>
                <div className={styles.filters}>
                    <Form
                        className={styles.antAdvancedSearchForm}
                        onSubmit={this.handleSearch}
                        formlayout='horizontal'
                    >
                        <Row gutter={24}>{this.getFields()}</Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                {this.renderBtns()}
                            </Col>
                        </Row>
                    </Form>
                </div>

                <Table
                    style={{marginTop:'20px','backgroundColor': '#fff'}}
                    rowKey="_id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={data}
                    size="default"
                    onChange={this.onChange}
                    pagination={false}
                    scroll={{ x: 2000-130*6+160+80+150 - x }}>
                </Table>
                <Button.Group size="large" style={{marginTop: '20px'}}>
                  <Button disabled={startId == ""} onClick={this.pagePrev.bind(this)}>
                    <Icon type="left" />上一页
                  </Button>
                  <Button disabled={data.length < 20} onClick={this.pageNext.bind(this)}>
                    下一页<Icon type="right" />
                  </Button>
                </Button.Group>
            </div>
        );
    }
}
