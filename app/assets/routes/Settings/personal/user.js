import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import {  Input, Button, Modal,message, Row, Col, Icon, TreeSelect, Table,Switch, Menu, Dropdown, Form, Select, Popover, Checkbox} from 'antd';
const FormItem = Form.Item;

import cols from './formdata';

@Form.create()
@connect(({ user, areatree, loading }) => ({
    user,
    areatree,
    loading: loading.models.list,
}))
export default class IndexPage extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        currentEditUser: {}, // 当前编辑用户
        aid: '',
        modalTitle: '新增人员',
    }
    columns = [
        {title: '单位名称', dataIndex: 'unit', key: 'unit', width: 150},
        {title: '手机号', dataIndex: 'phone', key: 'phone',align:'center',width: 160},
        {title: '姓名', dataIndex: 'username', key: 'username',align:'center',width: 120},
        {title: '备用电话', dataIndex: 'backup_phone', key: 'backup_phone',align:'center',width: 160},
        {title: '邮箱', dataIndex: 'email', key: 'email',align:'center', width: 300},
        {title: '职位', dataIndex: 'postname', key: 'postname',align:'center',width: 120},
        {title: '班次', dataIndex: 'duty', key: 'duty',align:'center',width: 100},
        {title: '住址', dataIndex: 'location', key: 'location',align:'center'},
        {title: '管理范围', dataIndex: 'areas', key: 'manage_station',align:'center',width: 150, render: (data, record) => {
            if(data === '全国') {
                return '全国';
            }else{
                let content = data.map((item) => {
                    return item.title
                }).join(" ");
                return (
                    <Popover content={content} title="管理范围">
                        <Button type="primary">查看管理范围</Button>
                    </Popover>
                )

            }
        }},
        {title: '角色', dataIndex: 'roles.rolename', key: 'rolename',align:'center',width: 150},
        {title: '操作', dataIndex: 'operater', key: 'operater', align: 'center',width: 120, render: (data, record) => {
            const actionMenu = (
                <Menu>
                    <Menu.Item key="1" onClick={() => {
                        this.editUser(record);
                    }}>
                        编辑
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => {
                        this.removeUser(record.id);
                    }}>删除</Menu.Item>
                </Menu>
            );
            return (
                <Dropdown overlay={actionMenu}>
                  <Button>
                    操作 <Icon type="down" />
                  </Button>
                </Dropdown>
            )
        }}
    ]

    componentDidMount() {
        this.fetchMore();
        this.fetchTree();
    }

    editUser = async (record) => {
        await this.setState({
            'currentEditUser':record,
            'modalTitle': '编辑人员',
        })
        this.showModal();
    }

    fetchMore(payload = {}) {
        const { dispatch } = this.props;

        dispatch({
            type: 'user/fetch',
            payload: payload,
        });
    }

    fetchTree(payload = {}) {
        const { dispatch } = this.props;

        dispatch({
            type: 'areatree/fetch',
            payload: payload,
        });
    }

    addNewPersion = async () => {
        await this.setState({
            currentEditUser: {},
            modalTitle: '新增人员',
        });
        this.showModal();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        const { dispatch } = this.props;

        console.log('start to search');

        this.props.form.validateFields((err, values) => {
            if(err){
                return;
            }
            console.log('Received values of form: ', values);
            this.setState({
                confirmLoading: true,
            });

            if(typeof values.manage_station !== 'string') {
                values.manage_station = values.manage_station.join(",");
            }

            if(values.allarea === true) {
                values.manage_station = "*";
            }

            dispatch({
                type: values.id ? 'user/updateUser':'user/createUser',
                payload: values,
                callback: (data) => {
                    if(data === true) {
                        message.success('操作成功');
                        this.setState({
                            visible: false,
                            confirmLoading: false,
                        });
                        this.fetchMore()
                    }else{
                        message.success('操作失败');
                        this.setState({
                            confirmLoading: false,
                        });
                    }

                }
            });
        });

    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    onChangeTreeNode = (value) => {
        this.props.form.setFieldsValue({
            manage_station: value.join(","),
            allarea: false
        })
        let currentEditUser = this.state.currentEditUser;
        currentEditUser.manage_station = value.join(",");
        this.setState({
            currentEditUser: currentEditUser,
        })

    }

    getFields = () => {
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 12 },
        };
        const data = this.state.currentEditUser;
        const { getFieldDecorator } = this.props.form;
        const children = [];

        children.push(
            <Col span={24} key="0-0">
              <FormItem label='管理范围'>
                    {getFieldDecorator(`manage_station`, {
                        initialValue:data.manage_station?data.manage_station.split(",") : "",
                        rules: [{
                            required: true,
                            message: '管理范围不能为空',
                        }]
                    })(
                        <Input placeholder="请输入站名或者站号" type="hidden" />
                    )}
                    <TreeSelect
                        treeCheckable={true}
                        treeData = {this.props.areatree.list}
                        showSearch
                        multiple
                        defaultValue={data.manage_station?data.manage_station.split(",") : ""}
                        value={data.manage_station?data.manage_station.split(",") : ""}
                        style={{width: 400}}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="选择区域"
                        allowClear
                        treeDefaultExpandAll
                        onChange={this.onChangeTreeNode}>
                    </TreeSelect>


                    {getFieldDecorator(`id`, {
                        initialValue:data.id,
                    })(
                        <Input placeholder="请输入站名或者站号" type="hidden" />
                    )}

                    {getFieldDecorator(`allarea`, {
                        initialValue:data.manage_station === "*" ? true:false,
                    })(
                        <Checkbox onChange={this.onChangeManageCheck} style={{'marginLeft':'20px'}}>全国</Checkbox>
                    )}

              </FormItem>
            </Col>
        );

        cols.forEach((col,cindex) => {
            if(col.Divider === true) {
                children.push(
                    <Col key={cindex} span={24}>
                        <Divider />
                    </Col>
                )
            }else{
                children.push(
                    <Col key={cindex} span={12}>
                      <FormItem label={col.desc} {...formItemLayout}>
                        {getFieldDecorator(col.col, {
                            rules: col.rules || [],
                            initialValue : (()=>{
                                if(col.objectType){
                                    if(col.objectType.ctype === "DatePicker"){
                                        return moment(data[col.col] || "", 'YYYY-MM-DD')
                                    }else{
                                        return data[col.col] || ""
                                    }
                                }else{
                                    return data[col.col] || "";
                                }
                            })()
                        })(
                            (() => {
                                if(col.objectType){
                                    if(col.objectType.ctype === "DatePicker") {
                                        return (<DatePicker
                                                    style={{'width':'100%'}}
                                                    locale={locale}
                                                    />)
                                    }else if(col.objectType.ctype === "Select"){
                                        return (
                                            <Select>
                                                {col.objectType.options.map((option,index) => {
                                                    return <Select.Option key={index} value={option.value}>{option.key}</Select.Option>
                                                })}
                                            </Select>
                                        )
                                    }
                                }else{
                                    if(col.col === 'sn_key'){
                                        return (<Input disabled={true} />)
                                    }else{
                                        return (
                                            <Input
                                                placeholder=""
                                            />
                                        );
                                    }

                                }
                            })()
                        )}
                      </FormItem>
                    </Col>
                )
            }

        })

        return children;
    }

    render() {
        const {
          user: {list: data},
          loading,
        } = this.props;
        return (
            <div>
                <Form
                    formlayout='horizontal'
                >
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={this.addNewPersion}>新增站点</Button>
                        </Col>
                    </Row>
                </Form>

                <Table
                    style={{marginTop:'20px'}}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={data}
                    size="default"
                    loading={loading}
                    pagination={false}
                    scroll={{  x: 1900, y: 400 }}>
                </Table>
                <Modal title="编辑人员"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    width={720}
                >
                    <Form layout="horizontal">
                        <Row gutter={36}>
                            {this.getFields()}
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}
