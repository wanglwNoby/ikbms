import * as React from 'react'
import { Row, Col, Input, Select, Button, Tabs, Table, message } from 'antd'
import DraggableModal from '../../../components/cores/draggableModal/draggableModal'
import ExaminationPaper from '../../train/examinationPaper'

function handleChange(value): void {
    console.log(`selected ${value}`)
}
function callback(key): void {
    console.log(key)
}
const columns = [
    {
        title: '题目编号',
        dataIndex: 'name',
        key: 'name',
        render: (text): any => <span>{text}</span>
    },
    {
        title: '题目内容',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '所属部门',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: '知识类型',
        dataIndex: 'leixing',
        key: 'leixing'
    },
    {
        title: '题目类型',
        dataIndex: 'bumen',
        key: 'bumen'
    },
    {
        title: '设置分值',
        dataIndex: 'fenlei',
        key: 'fenlei',
        render: (): any => <Input />
    },
    {
        title: '操作',
        dataIndex: 'caozuo',
        key: 'caozuo',
        render: (text): any => <Button onClick={(): void => { message.success('题目插入完成') }} type="primary">{text}</Button>
    }
]
const columns1 = [
    {
        title: '部门',
        dataIndex: 'bumen',
        key: 'bumen'
    },
    {
        title: '知识类型',
        dataIndex: 'zhishi',
        key: 'zhishi'
    },
    {
        title: '题目类型',
        dataIndex: 'timu',
        key: 'timu'
    },
    {
        title: '题目个数',
        dataIndex: 'geshu',
        key: 'geshu',
        render: (): any => <Input />
    },
    {
        title: '题目分值',
        dataIndex: 'fenzhi',
        key: 'fenzhi',
        render: (): any => <Input />
    }
]
class Manual extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            previewvisible: false,
            name: '',
            score: 0,
            type: '1',
            time: '',
            description: '',
            qualified: '',
            dataSource: [
                {
                    key: '1',
                    name: '234123',
                    age: '所有保单都具有现金价格',
                    date: '精算部',
                    leixing: '产品',
                    bumen: '判断',
                    fenlei: '产品',
                    caozuo: '插入题目'
                },
                {
                    key: '2',
                    name: '4124124',
                    age: '开发人员面试题',
                    date: '财务部',
                    leixing: '精算',
                    bumen: '单选',
                    fenlei: '精算',
                    caozuo: '插入题目'
                },
                {
                    key: '3',
                    name: '64543532',
                    age: '财务考核',
                    date: '开发部',
                    leixing: '业务',
                    bumen: '多选',
                    fenlei: '产品',
                    caozuo: '插入题目'
                }
            ],
            dataSource1: [
                {
                    key: '1',
                    bumen: '财务部',
                    zhishi: '财务',
                    timu: '判断题',
                    geshu: '10',
                    fenzhi: '1'
                },
                {
                    key: '2',
                    bumen: '开发部',
                    zhishi: '开发',
                    timu: '判断题',
                    geshu: '10',
                    fenzhi: '1'
                },
                {
                    key: '3',
                    bumen: '行政部',
                    zhishi: '行政',
                    timu: '判断题',
                    geshu: '10',
                    fenzhi: '1'
                }
            ]

        }
    }

    public handleOk = (): void => {
        this.setState({
            previewvisible: false
        })
    }

    public handleInput = (e): void => {
        console.log(e)
        this.setState({
            name: e.target.value
        })
    }

    public handleInput1 = (e): void => {
        console.log(e)
        this.setState({
            score: e.target.value
        })
    }

    public handleInput2 = (e): void => {
        console.log(e)
        this.setState({
            time: e.target.value
        })
    }

    public handleInput3 = (e): void => {
        console.log(e)
        this.setState({
            description: e.target.value
        })
    }

    public handleInput4 = (e): void => {
        console.log(e)
        this.setState({
            qualified: e.target.value
        })
    }

    public handleSelect = (value): void => {
        console.log(value)
        this.setState({
            type: value
        })
    }

    public search = (): void => {
        this.setState({
            dataSource: [
                {
                    key: '1',
                    name: '4124124',
                    age: '李四',
                    date: '财务部',
                    leixing: '精算',
                    bumen: '单选',
                    fenlei: '精算',
                    caozuo: '插入题目'
                },
                {
                    key: '2',
                    name: '64543532',
                    age: '王五',
                    date: '开发部',
                    leixing: '业务',
                    bumen: '多选',
                    fenlei: '产品',
                    caozuo: '插入题目'
                }
            ],
            dataSource1: [
                {
                    key: '1',
                    bumen: '开发部',
                    zhishi: '全部',
                    timu: '判断题',
                    geshu: '10',
                    fenzhi: '1'
                },
                {
                    key: '2',
                    bumen: '行政部',
                    zhishi: '全部',
                    timu: '判断题',
                    geshu: '10',
                    fenzhi: '1'
                }
            ]
        })
    }

    public handleEmpty = (): void => {
        this.setState({
            name: '',
            score: 0,
            type: '1',
            time: '',
            description: '',
            qualified: ''
        })
    }

    public render(): React.ReactElement {
        return (
            <div style={{ height: '600px', overflow: 'auto' }}>
                <div style={{ border: '1px solid #ccc', padding: '15px' }}>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={6}>试卷名称：</Col>
                        <Col span={6}>
                            <Input onChange={(e): any => this.handleInput(e)} value={this.state.name} />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={6}>总分：</Col>
                        <Col span={6}>
                            <Input onChange={(e): any => this.handleInput1(e)} value={this.state.score} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={6}>试卷类型：</Col>
                        <Col span={6}>
                            <Select value={this.state.type} style={{ width: '100%' }} onChange={(value): any => this.handleSelect(value)}>
                                <Select.Option value="1">请选择</Select.Option>
                                <Select.Option value="jack">培训</Select.Option>
                                <Select.Option value="lucy">考试</Select.Option>
                            </Select>
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={6}>时长：</Col>
                        <Col span={6}>
                            <Input onChange={(e): any => this.handleInput2(e)} value={this.state.time} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={6}>试卷描述：</Col>
                        <Col span={6}>
                            <Input.TextArea onChange={(e): any => this.handleInput3(e)} value={this.state.description} />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={6}>合格分：</Col>
                        <Col span={6}>
                            <Input onChange={(e): any => this.handleInput4(e)} value={this.state.qualified} />
                        </Col>
                    </Row>
                    <Button onClick={(): void => { this.handleEmpty() }} style={{ marginRight: '15px' }} type="primary">清空</Button>
                    <Button onClick={(): void => { message.success('保存成功') }} type="primary">保存</Button>
                </div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <Tabs.TabPane tab="手动选择题目" key="1">
                            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <Row>
                                    <Col span={3}>部门</Col>
                                    <Col span={3}>
                                        <Select style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="jack">财务部</Select.Option>
                                            <Select.Option value="lucy">开发部</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={3}>知识类型</Col>
                                    <Col span={3}>
                                        <Select style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="jack">客服</Select.Option>
                                            <Select.Option value="lucy">产品</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={3}>题目类型</Col>
                                    <Col span={3}>
                                        <Select style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="jack">判断</Select.Option>
                                            <Select.Option value="lucy">单选</Select.Option>
                                            <Select.Option value="ben">多选</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={3}>题目信息</Col>
                                    <Col span={3}>
                                        <Input />
                                    </Col>
                                </Row>
                                <Button onClick={(): void => { this.search() }} type="primary">查询</Button>
                            </div>
                            <Table
                                dataSource={this.state.dataSource}
                                columns={columns}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="自动选择题目" key="2">
                            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <Row>
                                    <Col span={3}>部门</Col>
                                    <Col span={3}>
                                        <Select style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="jack1">财务部</Select.Option>
                                            <Select.Option value="lucy1">开发部</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={3}>知识类型</Col>
                                    <Col span={3}>
                                        <Select style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="jack1">客服</Select.Option>
                                            <Select.Option value="lucy1">产品</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={3}>题目类型</Col>
                                    <Col span={3}>
                                        <Select style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="jack1">判断</Select.Option>
                                            <Select.Option value="lucy1">单选</Select.Option>
                                            <Select.Option value="ben1">多选</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col span={3} style={{ textAlign: 'center' }}><Button type="primary">查询</Button></Col>
                                </Row>
                            </div>
                            <Table
                                dataSource={this.state.dataSource1}
                                columns={columns1}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={(): void => { this.setState({ previewvisible: true }) }} type="primary">试卷预览</Button>
                        <Button onClick={(): void => { message.success('生成成功') }} type="primary">生成试卷</Button>
                    </div>
                </div>
                <DraggableModal
                    visible={this.state.previewvisible}
                    title="新增判断题"
                    onOk={this.handleOk}
                    width={800}
                    onCancel={(): void => this.setState({ previewvisible: false })}
                >
                    <ExaminationPaper />
                </DraggableModal>
            </div>
        )
    }
}

export default Manual