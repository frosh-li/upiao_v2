import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip, Badge } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './index.less';
import caution from '../../assets/alarm.gif';
import greenLight from "../../assets/greenlight.gif";
import greenLightOpen from "../../assets/lightopen.png";
import LightClose from "../../assets/lightclose.png";

@connect(({ station }) => ({
    station,
}))
export default class GlobalHeader extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;

        this.interval = setInterval(() => {
            dispatch({
                type: 'station/fetchStatus',
                payload: {},
            });
        },10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        this.triggerResizeEvent.cancel();
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    render() {
        const {
            currentUser = {},
            collapsed,
            fetchingNotices,
            isMobile,
            logo,
            onNoticeVisibleChange,
            onMenuClick,
            onNoticeClear,
        } = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item>
                    <Icon type="user" />修改密码
                </Menu.Item>
                {/* <Menu.Item disabled>
                  <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Item key="triggerError">
                  <Icon type="close-circle" />触发报错
                </Menu.Item>
                <Menu.Divider /> */}
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                    <Divider type="vertical" key="line" />,
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    <div className={styles.status}><img src={greenLight} />数据采集</div>
                    <div className={styles.status}><img src={greenLightOpen} />灯光</div>
                    <div className={styles.status}><img src={greenLightOpen} />声音</div>
                    <div className={styles.status}><img src={greenLightOpen} />短信</div>
                    <div className={styles.status}><img src={LightClose} />邮件</div>


                    <div className={styles.boxs}>在线{this.props.station.onlineStations}站</div>
                    <div className={styles.boxs}>离线{this.props.station.totalStations - this.props.station.onlineStations}站</div>
                    <div className={styles.caution}><img src={caution} width="48" />报警<span>{this.props.station.cautions}</span>条</div>
                    {currentUser.username ? (
                    <Dropdown overlay={menu}>
                      <span className={`${styles.action} ${styles.account}`}>
                        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                        <span className={styles.name}>欢迎，{currentUser.postname} {currentUser.username}</span>
                      </span>
                    </Dropdown>
                    ) : (
                        <Spin size="small" style={{ marginLeft: 8 }} />
                    )}
                </div>
            </div>
        );
    }
}
