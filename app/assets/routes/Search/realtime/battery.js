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

            { dataIndex: "station_name", key: "station_name",title:"站名",width:200,fixed: 'left', },
            { dataIndex: "sid", key: "sid","title":"站号",width:80 ,fixed: 'left',},
            { dataIndex: "gid", key: "gid","title":"组号",width:80 ,fixed: 'left',},
            { dataIndex: "bid", key: "bid","title":"电池号",width:100 ,fixed: 'left',},
            { dataIndex: "Voltage", key: "Voltage",title:"电压V",width:80 },
            { dataIndex: "Temperature", key: "Temperature",title:"温度℃",width:80 },
            { dataIndex: "Resistor", key: "Resistor",title:"内阻mΩ",width:120 },
            { dataIndex: "Dev_U", key: "Dev_U",title:"电压偏离",width:150, render: function(data){return Math.abs(data).toFixed(2)} },
            { dataIndex: "Dev_T", key: "Dev_T",title:"温度偏离",width:150, render: function(data){return Math.abs(data).toFixed(2)} },
            { dataIndex: "Dev_R", key: "Dev_R",title:"内阻偏离",width:150, render: function(data){return Math.abs(data).toFixed(2)} },
            { dataIndex: "Lifetime", key: "Lifetime",title:"电池寿命%",width:150 },
            { dataIndex: "Capacity", key: "Capacity",title:"容量%",width:150 },
            { dataIndex: "record_time", key: "record_time",title:"时间",width:300 },
            // { dataIndex: "MaxU_R", key: "MaxU_R",title:"浮充上限V",width:150 },
            // { dataIndex: "MaxDevU_R", key: "MaxDevU_R",title:"浮充偏差V",width:150 },
            // { dataIndex: "MinU_R", key: "MinU_R",title:"放电下限V",width:150 },
            // { dataIndex: "MaxT_R", key: "MaxT_R",title:"温度上限℃",width:150 },
            // { dataIndex: "MinT_R", key: "MinT_R",title:"温度下限℃",width:150 },
            // { dataIndex: "MaxR_R", key: "MaxR_R",title:"内阻上限mΩ",width:150 }
        ]
    }

    constructor(props) {
        super(props);
    }
    state = {
        aid: '',
    }

    search_payload = {table: "battery_data"}



    componentDidMount() {
        this.fetchMore();
        this.fetchTree();
    }

    fetchMore(payload = {table: "battery_data"}) {
        const { dispatch } = this.props;
        console.log('search pay load',payload);
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
        this.search_payload = {table: "battery_data"};
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
                table: 'battery_data',
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
                oldStartIndex: oldStartIndex,
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
                oldStartIndex: startIndex,
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
                oldStartIndex: oldStartIndex,
            }
        } } = this.props;
        let params = this.search_payload;
        dispatch({
            type: 'realtime/fetchHistory',
            payload: {
                ...params,
                startId: oldStartId,
                startIndex: oldStartIndex,
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
                    rowKey={(data) => {
                        return data.sn_key+""+data.gid+""+data.bid + ""+new Date(data.record_time)
                    }}
                    loading={loading}
                    columns={this.columns}
                    dataSource={data}
                    size="default"
                    pagination={false}
                    scroll={{ x: 1790 - x }}>
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
