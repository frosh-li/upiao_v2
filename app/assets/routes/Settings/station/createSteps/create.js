import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import cols from './formdata';

import { Tree, Input, Button, Modal,message, Form, Row, Col, Icon, TreeSelect, Steps, Divider, DatePicker , Select} from 'antd';
const {TreeNode} = Tree;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const Step = Steps.Step;
import styles from '../station.less';

@Form.create()
@connect(({ station,areatree, loading }) => ({
    station,
    areatree,
    loading: loading.models.list,
}))
export default class CreatePage extends Component {
    state = {
        aid: ''
    }

    defaultFieldsValue = {

    }

    componentDidMount() {
        this.fetchTree();
        this.fetchFromLocal();
    }

    fetchFromLocal() {
        const { dispatch } = this.props;
        dispatch({
            type: 'station/fetchLocal',
            payload: {},
            callback: () => {
                this.onChangeTreeNode(this.defaultFieldsValue.aid + "");
            }
        });
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
    }

    handleSearch = (e) => {
        console.log('start to search');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
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

        this.defaultFieldsValue = this.props.station.localStorageCache.station || {};
        console.log('default aid', this.default)
        // this.setState({
        //     aid: value
        // })
        const { getFieldDecorator } = this.props.form;
        const children = [];

        children.push(
            <Col span={24} key="0-0">
              <FormItem label='所属区域' >
                    {getFieldDecorator(`aid`, {
                        initialValue:this.defaultFieldsValue.aid,
                        rules: [{
                            required: true,
                            message: '所属区域不能为空',
                        }]
                    })(
                        <Input placeholder="请输入站名或者站号" type="hidden" />
                    )}
                    <TreeSelect
                        treeData = {this.props.areatree.list}
                        showSearch
                        defaultValue={this.defaultFieldsValue.aid?this.defaultFieldsValue.aid.toString() : ""}
                        value={this.state.aid}
                        style={{width: 600}}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="选择区域"
                        allowClear
                        treeDefaultExpandAll
                        onChange={this.onChangeTreeNode}>
                    </TreeSelect>

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
                      <FormItem label={col.desc}>
                        {getFieldDecorator(col.col, {
                            rules: col.rules || [],
                            initialValue : (()=>{
                                if(col.objectType){
                                    if(col.objectType.ctype === "DatePicker"){
                                        return moment(this.defaultFieldsValue[col.col] || "", 'YYYY-MM-DD')
                                    }else{
                                        return this.defaultFieldsValue[col.col] || ""
                                    }
                                }else{
                                    return this.defaultFieldsValue[col.col] || "";
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
                                    return (
                                        <Input placeholder="" />
                                    );
                                }
                            })()
                        )}
                      </FormItem>
                    </Col>
                )
            }

        })


        children.push(
            <Col span={24} key="0-1">
                <FormItem>
                    <Button type="primary" htmlType="submit">保存并继续</Button>
                </FormItem>
            </Col>
        );



        return children;
    }

    handleSaveStationInfo = (e) => {
        const {dispatch} = this.props;
        // 保存表单到localstorage中
        e.preventDefault();
        this.props.form.validateFields(async (err, fieldsValue) => {
            if (err) {
                return;
            }
            console.log('all fieldsValue', fieldsValue);
            await localStorage.setItem('create:station', JSON.stringify(fieldsValue));
            dispatch(routerRedux.push('/setting/baseinfo/station-list/battery-info-create'));
        })
    }

    render() {
        return (
            <div style={{"backgroundColor":"white", width:'100%', padding:"30px"}}>
                <Steps current={0}>
                    <Step title="新建站数据" description="" />
                    <Step title="新建电池信息" description="" />
                    <Step title="新建UPS信息" description="" />
                    <Step title="站新增成功" description="" />
                </Steps>
                <Divider />
                <Form
                    onSubmit={this.handleSaveStationInfo}>
                    <Row gutter={24}>{this.getFields()}</Row>
                </Form>
            </div>
        );
    }
}
