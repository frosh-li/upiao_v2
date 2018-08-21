import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import {  Input, Button, Modal,message, Row, Col, Icon, TreeSelect, Table,Switch} from 'antd';

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.list,
}))
export default class IndexPage extends Component {

    columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', width:80},
        {title: '角色名称', dataIndex: 'rolename', key: 'rolename',align:'center',},
    ]

    componentDidMount() {
        this.fetchMore();
    }

    fetchMore(payload = {}) {
        const { dispatch } = this.props;

        dispatch({
            type: 'user/fetchRoles',
            payload: payload,
        });
    }

    render() {
        const {
          user: {roleList: data},
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
