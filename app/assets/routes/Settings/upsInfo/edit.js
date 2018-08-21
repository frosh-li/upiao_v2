import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import cols from './ups-form-data';

import { Input, Button, Modal,message, Form, Row, Col, Icon, Divider, DatePicker , Select, Spin, Switch,} from 'antd';

const confirm = Modal.confirm;
const FormItem = Form.Item;

import styles from '../station/station.less';

@Form.create()
@connect(({ station, loading }) => ({
    station,

    loading: loading.models.list,
}))
export default class EditPage extends Component {
    state = {
        aid: '',
        loadingState: false,
    }

    defaultFieldsValue = {

    }

    componentDidMount() {

        this.fetchFromLocal();
    }

    fetchFromLocal() {
        const { dispatch, match } = this.props;
        this.setState({
            loadingState: true,
        })
        dispatch({
            type: 'station/fetchDetail',
            payload: {
                id: match.params.id
            },
            callback: (data) => {
                console.log(data);
                this.setState({
                    loadingState: false,
                })
                try{


                }catch(e) {
                    // alert('复制失败');
                    console.log(e.message);
                    message.success('复制站点失败');
                }

            }
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

    getFields = (data) => {

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

        children.push(
            <Col span={24} key="0-1" style={{'display':'none'}}>
                <FormItem>
                      {getFieldDecorator('sn_key', {
                          initialValue:this.props.match.params.id
                      })(
                          <Input type="hidden" />
                      )}
                </FormItem>
            </Col>
        );

        children.push(
            <Col span={24} key="0-2">
                <FormItem>
                    <Button type="primary" htmlType="submit">确认修改</Button>
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
            this.setState({
                loadingState: true,
            })
            dispatch({
                type: 'upsinfo/updateUpsinfo',
                payload: fieldsValue,
                callback: (data) => {
                    this.setState({
                        loadingState: false,
                    })
                    if(data === true){
                        message.success('修改成功，立刻跳转到列表页面');
                        dispatch(routerRedux.push('/setting/baseinfo/ups-list/'));
                    }else{
                        message.error('失败失败')
                    }
                }
            });
        })
    }

    render() {
        const {
            station: {
                detail: {
                    upsinfo: data
                }
            }
        } = this.props;
        return (
            <div style={{"backgroundColor":"white", width:'100%', padding:"30px"}}>
                <Spin spinning={this.state.loadingState}>
                    <Form
                        onSubmit={this.handleSaveStationInfo}>
                        <Row gutter={24}>{this.getFields(data)}</Row>
                    </Form>
                </Spin>
            </div>
        );
    }
}
