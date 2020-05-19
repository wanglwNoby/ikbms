import * as React from 'react'
import { Row, Col, Input, Radio, Tree } from 'antd'

class Info extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public onChange = (e): void => {
        console.log('radio checked', e.target.value)
        this.setState({
            value: e.target.value
        })
    }

    public onSelect = (selectedKeys, info): void => {
        console.log('selected', selectedKeys, info)
    }

    public onCheck = (checkedKeys, info): void => {
        console.log('onCheck', checkedKeys, info)
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ float: 'left', width: '60%', borderRight: '1px solid #ccc', paddingRight: '20px' }}>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={4}>
                                题目：
                            </Col>
                            <Col span={20}>
                                <Input.TextArea rows={8} value="保险单简称“保单”。保险人与投保人签订保险合同的书面证明。保险单的主要内容包括：(1)双方对有关保险标的事项的说明，包括被保险人名称，保险标的的名称及其存放地点或所处状态、保险金额、保险期限、保险费等。(2) 双方的权利和义务，如承担责任和不予承担的责任等" />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={4}>
                                正确答案：
                            </Col>
                            <Col span={20}>
                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={4}>
                                附件导入：
                            </Col>
                            <Col span={20}>
                                <Input type="file" placeholder="请选择文件" />
                            </Col>
                        </Row>
                    </div>
                    <div style={{ float: 'right', width: '35%', marginLeft: '4%', paddingLeft: '20px' }}>
                        <div>知识选项</div>
                        <Tree
                            checkable
                            defaultExpandedKeys={['0-0-0', '0-0-1']}
                            defaultSelectedKeys={['0-0-0', '0-0-1']}
                            defaultCheckedKeys={['0-0-0', '0-0-1']}
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                        >
                            <Tree.TreeNode title="知识分类" key="0-0">
                                <Tree.TreeNode title="培训文档" key="0-0-0">
                                </Tree.TreeNode>
                                <Tree.TreeNode title="时政新闻" key="0-0-1">
                                </Tree.TreeNode>
                                <Tree.TreeNode title="办公相关" key="0-0-2">
                                </Tree.TreeNode>
                                <Tree.TreeNode title="产品技术" key="0-0-3">
                                </Tree.TreeNode>
                            </Tree.TreeNode>
                        </Tree>
                        <div>部门</div>
                        <Tree
                            checkable
                            defaultExpandedKeys={['0-0-0', '0-0-1']}
                            defaultSelectedKeys={['0-0-0', '0-0-1']}
                            defaultCheckedKeys={['0-0-0', '0-0-1']}
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                        >
                            <Tree.TreeNode title="部门" key="0-0">
                                <Tree.TreeNode title="研发部" key="0-0-0">
                                </Tree.TreeNode>
                                <Tree.TreeNode title="商务部" key="0-0-1">
                                </Tree.TreeNode>
                            </Tree.TreeNode>
                        </Tree>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Info