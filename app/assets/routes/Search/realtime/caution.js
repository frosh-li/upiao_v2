import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { Tree, Input, Button, Modal,message, Form, Row, Col, Icon, TreeSelect, Table,Menu, Dropdown, Pagination, DatePicker} from 'antd';
const {TreeNode} = Tree;
const confirm = Modal.confirm;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import styles from './realtime.less';
// 历史数据查询
@Form.create()
@connect(({ realtime,areatree, loading }) => ({
    realtime,
    areatree,
    loading: loading.models.realtime,
}))
export default class StationPage extends Component {

    static defaultProps = {
        searchPage: false,
        columns: [
            { dataIndex: "station_name", key: "station_name",title:"站名",width:150, align:"center"},
            { dataIndex: "sid", key: "sid","title":"站号",width:80, align:"center"},
            { dataIndex: "gid", key: "gid","title":"组号",width:80, align:"center"},
            { dataIndex: "mid", key: "mid","title":"电池号",width:80, align:"center"},
            { dataIndex: "time", key: "time",title:"时间",width:300, align:"center" },
            { dataIndex: "desc", key: "desc",title:"警情内容",width:300, align:"center" },
            { dataIndex: "current", key: "current",title:"数值",width:120, align:"center"},
            { dataIndex: "climit", key: "climit",title:"参考值",width:120, align:"center" },
            { dataIndex: "markup", key: "markup",title:"操作记录",width:300, align:"center" },
            { dataIndex: "contact", key: "contact",title:"操作记录",width:120, align:"center" },
            { dataIndex: "markuptime", key: "markuptime",title:"操作记录",width:300, align:"center" },
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

    fetchMore(payload = {}) {
        const { dispatch } = this.props;
        console.log('search pay load',payload);
        dispatch({
            type: 'realtime/fetchHistory',
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
            let dateranger = "";
            if(!values || !values.dateranger) {
                dateranger = ""
            }else{
                dateranger = [
                    values.dateranger[0].format('YYYY-MM-DD HH:mm:ss'),
                    values.dateranger[1].format('YYYY-MM-DD HH:mm:ss'),
                ].join(",")
            }
            let params = {
                table: 'station_data',
                aid: values.aid.join(","),
                search_key: values.search_key,
                dateranger: dateranger,
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
            <Col span={8} key="1">
              <FormItem label='所属区域'>
                    {getFieldDecorator(`aid`, {
                    })(
                          <Input placeholder="请输入站名或者站号" type="hidden" />
                    )}
                    <TreeSelect
                        treeCheckable={true}
                        treeData = {this.props.areatree.list}
                        value={this.state.aid}

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

        children.push(
            <Col span={8} key="2">
              <FormItem label='站名/站号'>
                {getFieldDecorator(`dateranger`, {
                })(
                    <RangePicker
                        locale={locale}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={['开始时间', '结束时间']}
                      />
                )}
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

        return (
            <Fragment>
                <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    清空查询
                </Button>
            </Fragment>
        )
    }

    onChange = (pagination, filters, sorter) => {
        console.log('onchange table', pagination, filters, sorter);

        const { dispatch } = this.props;
        let params = this.search_payload;
        dispatch({
            type: 'realtime/fetchHistory',
            payload: {
                ...params,
                page: pagination.current,
                pageSize: pagination.pageSize,
            },
        });

    }

    render() {
        const {
          realtime: {
              history: data,
              pagination: pagination,
          },
          loading,
        } = this.props;
        console.log('data', data);

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
                    style={{marginTop:'20px','backgroundColor': '#fff'}}
                    rowKey="_id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={data}
                    size="default"
                    onChange={this.onChange}
                    pagination={paginationProps}
                    scroll={{ x: 2000-130*6+160+80+150 - x }}>
                </Table>

            </div>
        );
    }
}
