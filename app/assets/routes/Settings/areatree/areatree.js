import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tree, Input, Button, Modal,message } from 'antd';
const {TreeNode} = Tree;
const confirm = Modal.confirm;
import styles from './areatree.less';

@connect(({ areatree, loading }) => ({
    areatree,
    loading: loading.models.list,
}))
export default class AreatreePage extends Component {

    // 所有节点输入框对象
    inputs = {}

    inputs_values = {}

    newNodeIndex = 0;

    componentDidMount() {
        this.fetchMore();
    }

    fetchMore() {
        const { dispatch } = this.props;
        dispatch({
            type: 'areatree/fetch',
            payload: {},
            callback: () => {
                this.forceUpdate();
            }
        });
    }

    /**
     * 修改某一个节点的值
     */
    rechangeArea = (e, key, defaultValue) => {
        console.log('new node data', e.target.value);
        let currentInput = this.inputs[`input-${key}`];
        currentInput.value = e.target.value || defaultValue;
    }

    dispatchSave() {

    }

    /**
     * 保存节点修改
     */
    saveNode = (key, defaultValue) => {
        const {dispatch} = this.props;
        let currentInput = this.inputs[`input-${key}`];
        console.log(key, currentInput.value || defaultValue);
        let newValue = currentInput.value || defaultValue;
        if(key.indexOf("new") > -1){
            dispatch({
                type: 'areatree/addNode',
                payload: {
                    value: newValue,
                    parentKey: key.replace('node-new-node-', '').split("-")[0],
                },
                callback: (status)=>{
                    if(status) {
                        message.success('新增成功');
                        this.fetchMore();
                    }else{
                        message.error('新增失败');
                    }
                }
            });
        }else{
            dispatch({
                type: 'areatree/saveNode',
                payload: {
                    key: key,
                    value: newValue
                },
                callback: (status)=>{
                    if(status) {
                        message.success('修改成功');
                    }else{
                        message.error('修改失败');
                    }
                }
            });
        }



    }

    showRemoveConfirm = (key) => {
        let that = this;
        confirm({
            title: "确认删除该节点及其下级节点吗？",
            content: "删除后不可恢复，请谨慎操作",
            onOk() {
                that.removeNode(key);
            }
        })
    }

    /**
     * 删除
     */
    removeNode = (key) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'areatree/removeNode',
            payload: {
                key: key,
            },
            callback: (status)=>{
                if(status) {
                    message.success('删除成功');
                    this.fetchMore();
                }else{
                    message.error('删除失败');
                }
            }
        });
    }

    addTreeNode = (key) => {

        let treeData = this.props.areatree.list;
        treeData.forEach((node, index) => {
            if(node.key === key){
                treeData.push({
                    title:"新区域",
                    key:'node-new-'+key+'-'+this.newNodeIndex,
                    children : []
                })
                this.newNodeIndex++;
                return;
            }
            this.searchNode(node.children,key );
        })

        this.forceUpdate();
    }

    searchNode = (pnode, key) => {
        pnode.forEach((node, index) => {
            if(node.key === key) {
                node.children.push({
                    title:"新区域",
                    key:'node-new-'+key+'-'+this.newNodeIndex,
                    children : []
                })
                this.newNodeIndex++;
                return;
            }
            this.searchNode(node.children, key)
        })
    }

    renderTreeNodes = (data) => {
        let len = data.length;
        return data.map((item,index) => {
            if(item.children) {

                return (
                    <div className={styles.treebox} title={item.title} key={item.key} dataref={item}>
                        <div className={item.children && item.children.length > 0 ? styles.forInputs : styles.lastForInputs}>
                            <span className={styles.connect}>--</span>
                            <Input
                                type="text"
                                defaultValue={item.title}
                                ref={(node)=>{
                                    this.inputs[`input-${item.key}`] = node;
                                }}
                                size='large'
                                className={styles.treeNodeInput}
                                onChange={(e) => {
                                    this.rechangeArea(e, item.key, item.title)
                                }} />
                            <Button size="large" onClick={() =>{
                                this.showRemoveConfirm(item.key);
                            }}>删除</Button>
                            <Button size="large" onClick={() => {
                                this.addTreeNode(item.key);
                            }}>新增下级</Button>
                            <Button size="large" onClick={() => {
                                this.saveNode(item.key, item.title)
                            }}>保存</Button>
                        </div>
                        {item.children && item.children.length > 0 ? <div className={styles.treeNodes}>{this.renderTreeNodes(item.children)}</div> : null}

                    </div>
                )
            }
        })
    }

    openActions = () => {
        console.log('open action sheet');
    }

    render() {
        const {
          areatree: {list: treeData},
          loading,
        } = this.props;
        console.log('tree data', treeData);
        return (
            <div>
                <div>
                    {this.renderTreeNodes(treeData)}
                </div>
            </div>
        );
    }
}
