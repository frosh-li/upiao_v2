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
@connect(({ upsinfo,areatree, loading }) => ({
    upsinfo,
    areatree,
    loading: loading.models.list,
}))
export default class UpsPage extends Component {
    static defaultProps = {
        searchPage: false,
        columns : [
            { dataIndex: "station.sid", key: "sid",align:"center",title:"站号",width:80, fixed:'left'},
            { dataIndex: "station.station_name", key: "station_name",align:"center",title:"站名",width:250, fixed: 'left' },
            { dataIndex: "station.tree.title", key: "manage_area",align:"center",title:"隶属区域",width:120 },
            { dataIndex: "ups_factory", key: "ups_factory",align:"center",title:"生产厂家",width:250 },
            { dataIndex: "ups_type", key: "ups_type",align:"center",title:"型号",width:100 },
            { dataIndex: "ups_create_date", key: "ups_create_date",align:"center",title:"生产日期",width:250, render: (data) => {
                return moment(data).format('YYYY-MM-DD');
            } },
            { dataIndex: "ups_install_date", key: "ups_install_date",align:"center",title:"安装日期",width:250, render: (data) => {
                return moment(data).format('YYYY-MM-DD');
            } },
            { dataIndex: "ups_power", key: "ups_power",align:"center",title:"功率/容量（W/H）",width:150 },
            { dataIndex: "ups_power_in", key: "ups_power_in",align:"center",title:"输入功率（W/A）",width:150 },
            { dataIndex: "ups_power_out", key: "ups_power_out",align:"center",title:"输出功率（W/A）",width:150 },
            { dataIndex: "ups_battery_vol", key: "ups_battery_vol",align:"center",title:"外接电池电压（V）",width:150 },
            { dataIndex: "ups_battery_current", key: "ups_battery_current",align:"center",title:"外接电池电流（A）",width:150 },
            { dataIndex: "ac_protect", key: "ac_protect",align:"center",title:"AC过流保护（V/A）",width:150 },
            { dataIndex: "dc_protect", key: "dc_protect",align:"center",title:"DC过流保护（V/A）",width:170 },
            { dataIndex: "on_net", key: "on_net",align:"center",title:"联网检测",width:150 },
            { dataIndex: "alarm_content", key: "alarm_content",align:"center",title:"报警内容",width:150 },
            { dataIndex: "discharge_protect", key: "discharge_protect",align:"center",title:"放电保护值（%）",width:150 },
            { dataIndex: "redundancy_num", key: "redundancy_num",align:"center",title:"冗余数量(台)",width:150 },
            { dataIndex: "floting_charge", key: "floting_charge",align:"center",title:"浮充电压（V）",width:150 },
            { dataIndex: "ups_vdc", key: "ups_vdc",align:"center",title:"电压范围(V)",width:150 },
            { dataIndex: "ups_reserve_hour", key: "ups_reserve_hour",align:"center",title:"额定候备时间（W/H）",width:250 },
            { dataIndex: "ups_charge_mode", key: "ups_charge_mode",align:"center",title:"充电方式",width:100 },
            { dataIndex: "ups_max_charge", key: "ups_max_charge",align:"center",title:"最大充电电流（A）",width:150 },
            { dataIndex: "ups_max_discharge", key: "ups_max_discharge",align:"center",title:"最大放电电流（A）",width:150 },
            { dataIndex: "ups_period_days", key: "ups_period_days",align:"center",title:"规定维护周期（天）",width:150 },
            { dataIndex: "ups_discharge_time", key: "ups_discharge_time",align:"center",title:"维护放电时长（分钟）",width:170 },
            { dataIndex: "ups_discharge_capacity", key: "ups_discharge_capacity",align:"center",title:"维护放电容量（%）",width:150 },
            { dataIndex: "ups_maintain_date", key: "ups_maintain_date",align:"center",title:"维护到期日",width:150 },
            { dataIndex: "ups_vender_phone", key: "ups_vender_phone",align:"center",title:"厂家联系电话",width:120 },
            { dataIndex: "ups_service", key: "ups_service",align:"center",title:"服务商名称",width:120 },
            { dataIndex: "ups_vender", key: "ups_vender",align:"center",title:"联系人",width:120 },
            { dataIndex: "ups_service_phone", key: "ups_service_phone",align:"center",title:"服务商电话",width:100 },
            { dataIndex: "remark", key: "remark",align:"center",title:"备注",width:150 },
            { key: "operators",title:"操作", fixed:'right',align:"center", width:100,render: (text, record, index) => {
                let editLink = `#/setting/baseinfo/ups-list/edit/${record.sn_key}`;
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
            type: 'upsinfo/fetch',
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
            type: 'upsinfo/fetch',
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
          upsinfo: {list: upsList, pagination: pagination,},
          loading,
        } = this.props;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

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
                                <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    清空查询
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <Table
                    style={{marginTop:'20px'}}
                    rowKey="sn_key"
                    loading={loading}
                    onChange={this.onChange}
                    pagination={paginationProps}
                    columns={this.columns}
                    dataSource={upsList}
                    size="default"
                    scroll={{ x: 5100+50 - x, y: 600 }}>
                </Table>

            </div>
        );
    }
}
