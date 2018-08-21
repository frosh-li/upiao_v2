import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';

import { Tree, Input, Button, Modal,message, Form, Row, Col, Icon, TreeSelect, Table,Menu, Dropdown} from 'antd';
const {TreeNode} = Tree;
const confirm = Modal.confirm;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
import styles from '../station/station.less';

@Form.create()
@connect(({ batteryinfo,areatree, loading }) => ({
    batteryinfo,
    areatree,
    loading: loading.models.list,
}))
export default class BatteryPage extends Component {
    static defaultProps = {
        searchPage: false,
        columns : [
            { dataIndex: "station.sid", key: "sid",title:"站号",width:100, align:'center',  fixed:'left',},
            { dataIndex: "station.station_name", key: "station_name",title:"站点简称",width:100, align:'center',  fixed:'left',  },
            { dataIndex: "station.tree.title", key: "manage_area",title:"隶属区域",width:100, align:'center',  },
            { dataIndex: "battery_factory", key: "battery_factory",title:"生产厂家",width:150 , align:'center', },
            { dataIndex: "battery_num", key: "battery_num",title:"电池型号",width:150 , align:'center', },
            { dataIndex: "battery_date", key: "battery_date",title:"生产日期",width:250 , align:'center',render: (data) => {
                return moment(data).format('YYYY-MM-DD');
            } },
            { dataIndex: "battery_voltage", key: "battery_voltage",title:"标称电压（V）",width:150 , align:'center', },
            { dataIndex: "battery_oum", key: "battery_oum",title:"标称内阻（mΩ）",width:150 , align:'center', },
            { dataIndex: "battery_dianrong", key: "battery_dianrong",title:"电池标称容量（Ah）",width:170 , align:'center', },
            { dataIndex: "battery_float_voltage", key: "battery_float_voltage",title:"浮充标准电压（V）",width:150 , align:'center', },
            { dataIndex: "battery_max_current", key: "battery_max_current",title:"最大充电电流（A）",width:150 , align:'center', },
            { dataIndex: "battery_max_discharge_current", key: "battery_max_discharge_current",title:"最大放电电流（A）",width:150 , align:'center', },
            { dataIndex: "battery_float_up", key: "battery_float_up",title:"浮充电压上限（V）",width:150 , align:'center', },
            { dataIndex: "battery_float_dow", key: "battery_float_dow",title:"电池浮充电压下限（V）",width:180 , align:'center', },
            { dataIndex: "battery_discharge_down", key: "battery_discharge_down",title:"放电电压下限（V）",width:150 , align:'center', },
            { dataIndex: "battery_scrap_date", key: "battery_scrap_date",title:"强制报废日期",width:150 , align:'center', },
            { dataIndex: "battery_life", key: "battery_life",title:"设计寿命（年）",width:150 , align:'center', },
            { dataIndex: "battery_column_type", key: "battery_column_type",title:"电池级柱类型",width:150 , align:'center', },
            { dataIndex: "battery_temperature", key: "battery_temperature",title:"温度要求（℃）",width:150  , align:'center',},
            { dataIndex: "battery_humidity", key: "battery_humidity",title:"湿度要求（%）",width:150 , align:'center', },
            { dataIndex: "battery_type", key: "battery_type",title:"电池种类",width:150 , align:'center', },
            { dataIndex: "battery_factory_phone", key: "battery_factory_phone",title:"厂家电话",width:150 , align:'center', },
            { dataIndex: "remark", key: "remark",title:"备注",width:150 , align:'center',},

            { key: "operators",title:"操作", fixed:'right',align:'center', width:100,render: (text, record, index) => {
                let editLink = `#/setting/baseinfo/battery-list/edit/${record.sn_key}`;
                return (<a href={editLink}>编辑</a>)
            }},
        ]
    }
    state = {
        aid: []
    }

    search_payload = {}



    componentDidMount() {
        this.fetchMore();
        this.fetchTree();
    }

    fetchMore(payload = {}) {
        const { dispatch } = this.props;
        console.log('search pay load',payload);
        dispatch({
            type: 'batteryinfo/fetch',
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
        this.setState({
            aid: ''
        })
        this.search_payload = {};
        this.fetchMore({});
    }

    handleSearch = (e) => {
        console.log('start to search');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err){
                console.log(err);
                return;
            }
            let aid = values.aid ? values.aid.join(",") : "";
            let params = {
                aid: aid,
                search_key: values.search_key,
            }

            this.search_payload = params;

            this.fetchMore(params);
            console.log('Received values of form: ', params);
        });
    }

    onChange = (pagination, filters, sorter) => {
        console.log('onchange table', pagination, filters, sorter);

        const { dispatch } = this.props;
        let params = this.search_payload;
        dispatch({
            type: 'batteryinfo/fetch',
            payload: {
                ...params,
                page: pagination.current,
                pageSize: pagination.pageSize,
            },
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
            <Col span={16} key="1">
              <FormItem label='所属区域'>
                    {getFieldDecorator(`aid`, {
                    })(
                          <Input placeholder="请输入站名或者站号" type="hidden" />
                    )}
                    <TreeSelect
                        treeCheckable={true}
                        treeData = {this.props.areatree.list}
                        value={this.state.aid}
                        style={{width: 600}}
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

        return children;
    }

    render() {
        const {
          batteryinfo: {
              list: batteryList,
              pagination: pagination,
          },

          loading,
        } = this.props;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };
        this.columns = [];
        let x = 0;
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
                                <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    清空查询
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <Table
                    style={{marginTop:'20px','backgroundColor': '#fff', 'padding': 15}}
                    rowKey="sn_key"
                    loading={loading}
                    columns={this.columns}
                    onChange={this.onChange}
                    dataSource={batteryList}
                    size="default"
                    pagination={paginationProps}
                    scroll={{ x: 3250 + 50 - x }}>
                </Table>

            </div>
        );
    }
}
