import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import {  Input, Button, Modal,message, Row, Col, Icon, TreeSelect, Table,Switch} from 'antd';

@connect(({ station_alert_desc, loading }) => ({
    station_alert_desc,
    loading: loading.models.list,
}))
export default class IndexPage extends Component {

    columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', width:80},
        {title: '描述', dataIndex: 'desc', key: 'desc',align:'center',},
        {title: '编码', dataIndex: 'en', key: 'en',align:'center', width:150},
        {title: '是否可以忽略', dataIndex: 'ignore', key: 'ignore', width:120,align:'center', render: (data, record) => {
            return (
                <Switch defaultChecked={!!data} onChange={() => {
                    this.changeState(record.id, 'ignore', data)
                }}/>
            )
        }},
        {title: '是否发送邮件', dataIndex: 'send_email', key: 'send_email', width:120,align:'center', render: (data, record) => {
            return (
                <Switch defaultChecked={!!data} onChange={() => {
                    this.changeState(record.id, 'send_email', data)
                }}/>
            )
        }},
        {title: '是否发送短信', dataIndex: 'send_msg', key: 'send_msg', width:120,align:'center', render: (data, record) => {
            return (
                <Switch defaultChecked={!!data} onChange={() => {
                    this.changeState(record.id, 'send_msg', data)
                }}/>
            )
        }},
    ]

    componentDidMount() {
        this.fetchMore();
    }

    fetchMore(payload = {}) {
        const { dispatch } = this.props;

        dispatch({
            type: 'station_alert_desc/fetch',
            payload: payload,
        });
    }

    changeState = (id, col, data) => {
        console.log(id, col);
        const { dispatch } = this.props;
        let payload = {
            id: id,
        }
        payload[col] = 1 - data;
        dispatch({
            type: 'station_alert_desc/updateStationAlertDesc',
            payload: payload,
            callback: (status)=>{
                if(status){
                    message.success('修改成功');
                }else{
                    message.error('修改失败');
                }
            }
        });
    }


    render() {
        const {
          station_alert_desc: {list: data},
          loading,
        } = this.props;
        return (
            <div>
                <Table
                    style={{marginTop:'20px'}}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={data}
                    size="default"
                    loading={loading}
                    pagination={false}
                    scroll={{  y: 400 }}>
                </Table>
            </div>
        );
    }
}
