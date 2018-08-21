import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import cols from './battery-form-data';

import { Tree, Input, Button, Modal,message, Form, Row, Col, Icon, TreeSelect, Steps, Divider, DatePicker , Select} from 'antd';
const {TreeNode} = Tree;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const Step = Steps.Step;
import styles from '../station/station.less';

@Form.create()
@connect(({ station, loading }) => ({
    station,
    loading: loading.models.list,
}))
export default class CreatePage extends Component {

    defaultFieldsValue = {

    }

    componentDidMount() {
        this.fetchFromLocal()
    }

    fetchFromLocal() {
        const { dispatch } = this.props;
        dispatch({
            type: 'station/fetchLocal',
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

    getFields = () => {
        this.defaultFieldsValue = this.props.station.localStorageCache.batteryinfo || {};
        const { getFieldDecorator } = this.props.form;
        const children = [];

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
                                        if(this.defaultFieldsValue[col.col]) {
                                            return moment(this.defaultFieldsValue[col.col], 'YYYY-MM-DD')
                                        }else{
                                            return moment(new Date(), 'YYYY-MM-DD');
                                        }

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
                                                    locale={locale}
                                                    style={{width:'100%'}}
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
            await localStorage.setItem('create:batteryinfo', JSON.stringify(fieldsValue));
            dispatch(routerRedux.push('/setting/baseinfo/station-list/ups-info-create'));
            // routerRedux.push('/setting/ups-info/create');
        })
    }

    render() {
        return (
            <div style={{"backgroundColor":"white", width:'100%', padding:"30px"}}>
                <Steps current={1}>
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
