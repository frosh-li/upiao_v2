import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import {  Input, Button, Modal,message, Row, Col, Icon, TreeSelect, Table,Switch, Card} from 'antd';

import numeral from 'numeral';

import Authorized from '../../utils/Authorized';
import styles from './realtime.less';

@connect(({ realtime, loading }) => ({
    realtime,
    loading: loading.models.list,
}))
export default class RealtimeMapPage extends Component {

    componentDidMount() {
        this.fetchMore();
        this.interval = setInterval(() =>{
            this.fetchMore();
        }, 10000);



    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchMore(payload = {}) {
        const { dispatch } = this.props;

        dispatch({
            type: 'realtime/fetch',
            payload: payload,
        });
    }

    getRows() {
        const {
          realtime: {list: data},
          loading,
        } = this.props;
        let ret = [];
        //
        // <Col span={4} />
        // <Col span={4} />
        // <Col span={4} />
        // <Col span={4} />
        // <Col span={4} />
        data.forEach((item , index) => {
            let backgroundColor = item.hasCaution ? "red" : 'green';
            ret.push(
                (<Col span={4}>
                    <div className={styles.stations} style={{"backgroundColor":backgroundColor}}>
                        {item.station_name}
                    </div>
                </Col>)
            )
        })
        if(ret.length === 0) {
            return (
                <div>暂无在线站点</div>
            )
        }
        return ret;
    }

    render() {
        const {
          realtime: {list: data},
          loading,
        } = this.props;
        console.log('chart data', data);

        return (
            <Fragment>
              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                  <Card title="活动站点信息播报" bordered={false} id="map_card">

                      <Row gutter={32}>
                          {this.getRows()}

                      </Row>
                  </Card>
                </Col>
              </Row>
          </Fragment>
        );
    }
}
