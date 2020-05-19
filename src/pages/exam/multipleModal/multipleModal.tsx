import * as React from 'react'
import { Row, Col, Input, Tree, Checkbox } from 'antd'

function onChange1(e): void {
    console.log(`checked = ${e.target.checked}`)
}

class Multiple extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {

        }
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
                                <Input.TextArea rows={8} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={4}>
                                A：
                            </Col>
                            <Col span={20}>
                                <Input />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={4}>
                                B：
                            </Col>
                            <Col span={20}>
                                <Input />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={4}>
                                C：
                            </Col>
                            <Col span={20}>
                                <Input />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={4}>
                                D：
                            </Col>
                            <Col span={20}>
                                <Input />
                            </Col>
                        </Row>
                        <div style={{ marginTop: '20px' }}>+新增答案</div>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={4}>
                                正确答案：
                            </Col>
                            <Col span={20}>
                                <Checkbox onChange={onChange1}>A</Checkbox>
                                <Checkbox onChange={onChange1}>B</Checkbox>
                                <Checkbox onChange={onChange1}>C</Checkbox>
                                <Checkbox onChange={onChange1}>D</Checkbox>
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

export default Multiple