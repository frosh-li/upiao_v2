import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';

import { Tree, Input, Button, Modal,message, Form, Row, Col, Icon, TreeSelect, Table,Menu, Dropdown, Pagination} from 'antd';
const {TreeNode} = Tree;
const confirm = Modal.confirm;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
import styles from './station.less';

@Form.create()
@connect(({ station,areatree, loading }) => ({
    station,
    areatree,
    loading: loading.models.list,
}))
export default class StationPage extends Component {

    static defaultProps = {
        searchPage: false,
        columns: [
            {title: '站号', dataIndex: 'sid', key: 'sid', fixed: 'left', width:100},
            {title: '站点简称', dataIndex: 'station_name', key: 'station_name',align:'center', fixed: 'left', width:150},
            {title: '物理地址', dataIndex: 'sn_key', key: 'sn_key',align:'center', fixed: 'left', width:150},
            {title: '站点全称', dataIndex: 'station_full_name', key: 'station_full_name', width:150},
            {title: '站点地址', dataIndex: 'site_location', key: 'site_location', width:150},
            {title: '站点性质', dataIndex: 'site_property', key: 'site_property', width:150},
            {title: '隶属区域', dataIndex: 'tree.title', key: 'manage_area', width:150},
            {title: '固定电话', dataIndex: 'fix_phone', key: 'fix_phone', width:150},
            {title: '负责人', dataIndex: 'functionary', key: 'functionary', width:150, render:(text, record, index) => {
                return (
                    <span>
                        <span>{record.fix_phone}</span>
                        <span>{record.functionary_sms}</span>
                        <span>{record.functionary_mail}</span>
                    </span>
                )
            }},
            {title: '负责人电话', dataIndex: 'functionary_phone', key: 'functionary_phone', width:150},
            {title: '设备负责人', dataIndex: 'device_owner', key: 'device_owner', width:150},
            {title: '设备负责人电话', dataIndex: 'device_owner_phone', key: 'device_owner_phone', width:150},
            {title: '紧急联系人姓名', dataIndex: 'emergency_person', key: 'emergency_person', width:150},
            {title: '紧急联系人手机', dataIndex: 'emergency_phone', key: 'emergency_phone', width:150},
            {title: '区域主管', dataIndex: 'area_owner', key: 'area_owner', width:150,render: (text, record, index) => {
                return (
                    <span>
                        <span>{record.area_owner}</span>
                        <span>{record.area_owner_sms}</span>
                        <span>{record.area_owner_mail}</span>
                    </span>
                )
            }},
            {title: '区域主管电话', dataIndex: 'area_owner_phone', key: 'area_owner_phone', width:150},
            {title: '上级主管', dataIndex: 'parent_owner', key: 'parent_owner', width:150, render: (text, record, index) => {
                return (
                    <span>
                        <span>{record.parent_owner}</span>
                        <span>{record.parent_owner_sms}</span>
                        <span>{record.parent_owner_mail}</span>
                    </span>
                )
            }},
            {title: '上级主管电话', dataIndex: 'parent_owner_phone', key: 'parent_owner_phone', width:150},
            { dataIndex: "groups", key: "groups",title:"电池组数", width:150, },
            { dataIndex: "batteries", key: "batteries",title:"每组电池数", width:150, },
            { dataIndex: "postal_code", key: "postal_code",title:"邮政编码", width:150, },
            { dataIndex: "site_latitude", key: "site_latitude",title:"站点纬度", width:150, },
            { dataIndex: "site_longitude", key: "site_longitude",title:"站点经度", width:150, },
            { dataIndex: "ipaddress", key: "ipaddress",title:"IP地址", width:150, },
            { dataIndex: "ipaddress_method", key: "ipaddress_method",title:"控制器IP地址或方式", width:150, },
            { dataIndex: "site_control_type", key: "site_control_type",title:"站点控制器型号", width:150, },
            { dataIndex: "bms_install_date", key: "bms_install_date",title:"BMS系统安装日期", width:150,render: (data)=>{
                return (
                    <div>{moment(data).format('YYYY-MM-DD')}</div>
                )
            } },
            { dataIndex: "group_collect_type", key: "group_collect_type",title:"组电流采集器型号", width:150, },
            { dataIndex: "group_collect_num", key: "group_collect_num",title:"组电流采集器数量", width:150, },
            { dataIndex: "inductor_brand", key: "inductor_brand",title:"互感器品牌", width:150, },
            { dataIndex: "group_collect_install_type", key: "group_collect_install_type",title:"组电流采集器安装模式", width:150, },
            { dataIndex: "battery_collect_type", key: "battery_collect_type",title:"电池数据采集器型号", width:150, },
            { dataIndex: "battery_collect_num", key: "battery_collect_num",title:"电池数据采集器数量", width:150, },
            { dataIndex: "humiture_type", key: "humiture_type",title:"环境温湿度方式", width:150, },
            { dataIndex: "has_light", key: "has_light",title:"灯光报警", width:150,},
            { dataIndex: "has_speaker", key: "has_speaker",title:"声音报警", width:150,},
            { dataIndex: "has_sms", key: "has_sms",title:"短信", width:150,},
            { dataIndex: "has_smart_control", key: "has_smart_control",title:"智能控制", width:150,},
            { dataIndex: "has_group_TH_control", key: "has_group_TH_control",title:"温湿度传感器", width:150,},
            { dataIndex: "has_group_HO_control", key: "has_group_HO_control",title:"氢氧气传感器", width:150,},
            { dataIndex: "device_mac", key: "device_mac",title:"网口MAC", width:150,},
            { dataIndex: "remark", key: "remark",title:"备注", width:150,},
            { key: "operators",title:"操作", fixed:'right',align:'center', width:100,render: (text, record, index) => {
                let editLink = `#/setting/baseinfo/station-list/edit/${record.id}`;

                const actionMenu = (
                    <Menu>
                        <Menu.Item key="1" onClick={() => {
                            this.sendInitCmd(record.sn_key);
                        }}>下发指令</Menu.Item>
                        <Menu.Item key="2">
                            <a href={editLink}>编辑站点</a>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={() => {
                            this.copySite(record.id);
                        }}>复制站点</Menu.Item>
                        <Menu.Item key="4" onClick={() => {
                            this.removeStation(id);
                        }}>删除站点</Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={actionMenu}>
                      <Button>
                        操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                )
            }},
        ]
    }

    constructor(props) {
        super(props);
    }
    state = {
        aid: '',
    }

    search_payload = {}



    componentDidMount() {
        this.fetchMore();
        this.fetchTree();
    }

    copySite(id) {
        const { dispatch } = this.props;

        dispatch({
            type: 'station/fetchDetail',
            payload: {
                id: id
            },
            callback: (data) => {
                try{
                    console.log(data);
                    localStorage.setItem('create:station', JSON.stringify(data.station));
                    localStorage.setItem('create:batteryinfo', JSON.stringify(data.batteryinfo));
                    localStorage.setItem('create:upsinfo', JSON.stringify(data.upsinfo));

                    this.addNewStation();
                }catch(e) {
                    // alert('复制失败');
                    console.log(e.message);
                    message.success('复制站点失败');
                }

            }
        });
    }

    fetchMore(payload = {}) {
        const { dispatch } = this.props;
        console.log('search pay load',payload);
        dispatch({
            type: 'station/fetch',
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
            let params = {
                aid: values.aid.join(","),
                search_key: values.search_key,
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

    addNewStation = () => {
        const {dispatch} = this.props;
        dispatch(routerRedux.push('/setting/baseinfo/station-list/create'));
    }

    renderBtns = () => {
        if(this.props.searchPage === false){
            return (
                <Fragment>
                    <Button type="primary" onClick={this.addNewStation}>新增站点</Button>
                    <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        清空查询
                    </Button>
                </Fragment>
            )
        }else{
            return (
                <Fragment>
                    <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        清空查询
                    </Button>
                </Fragment>
            )
        }

    }

    onChange = (pagination, filters, sorter) => {
        console.log('onchange table', pagination, filters, sorter);

        const { dispatch } = this.props;
        let params = this.search_payload;
        dispatch({
            type: 'station/fetch',
            payload: {
                ...params,
                page: pagination.current,
                pageSize: pagination.pageSize,
            },
        });

    }

    render() {
        const {
          station: {
              list: stationList,
              pagination: pagination,
          },
          loading,
        } = this.props;
        console.log('tree data', stationList);

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

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
                    style={{marginTop:'20px','backgroundColor': '#fff', 'padding': 15}}
                    rowKey="id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={stationList}
                    size="default"
                    onChange={this.onChange}
                    pagination={paginationProps}
                    scroll={{ x: 39*150 + 500 + 100 - x }}>
                </Table>

            </div>
        );
    }
}
