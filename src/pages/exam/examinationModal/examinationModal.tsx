import * as React from 'react'
import { Row, Col, Table, Input, Checkbox, Select, Button, Tabs, DatePicker, message } from 'antd'
import DraggableModal from '../../../components/cores/draggableModal/draggableModal'
import ExaminationPaper from '../../train/examinationPaper'

function handleChange(value): void {
    console.log(`selected ${value}`)
}
function callback(key): void {
    console.log(key)
}

function onChange(date, dateString): void {
    console.log(date, dateString)
}

const data = [
    {
        key: '1',
        name: '21222',
        age: '2019业务部门基本知识考试',
        date: '业务部门',
        leixing: '胡珍珍',
        bumen: '2018.11.16'
    },
    {
        key: '2',
        name: '21223',
        age: '2019财务部门基本知识考试',
        date: '财务部门',
        leixing: '胡珍珍',
        bumen: '2018.12.1'
    },
    {
        key: '3',
        name: '21224',
        age: '2019业务部门基本知识考试',
        date: '业务部门',
        leixing: '胡珍珍',
        bumen: '2018.11.16'
    }
]

const columns = [
    {
        title: '考试编号',
        dataIndex: 'name',
        key: 'name',
        render: (text): any => <span>{text}</span>
    },
    {
        title: '考试名称',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '所属部门',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: '创建人',
        dataIndex: 'leixing',
        key: 'leixing'
    },
    {
        title: '创建时间',
        dataIndex: 'bumen',
        key: 'bumen'
    },
    {
        title: '操作',
        dataIndex: 'caozuo',
        key: 'caozuo',
        render: (): any => <Checkbox />
    }
]


const data2 = [
    {
        key: '1',
        name: '21226',
        age: '2019业务部门基本知识考试',
        leixing: '21226',
        bumen: '胡珍珍',
        date: '业务部门',
        state: '未授权'
    },
    {
        key: '2',
        name: '21227',
        age: '2019业务部门基本知识考试',
        leixing: '21227',
        bumen: '胡珍珍',
        date: '财务部门',
        state: '已授权'
    },
    {
        key: '3',
        name: '21228',
        age: '2019业务部门基本知识考试',
        leixing: '21228',
        bumen: '胡珍珍',
        date: '业务部门',
        state: '未授权'
    }
]

const columns2 = [
    {
        title: '考试编号',
        dataIndex: 'name',
        key: 'name',
        render: (text): any => <span>{text}</span>
    },
    {
        title: '考试名称',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '用户名',
        dataIndex: 'leixing',
        key: 'leixing'
    },
    {
        title: '姓名',
        dataIndex: 'bumen',
        key: 'bumen'
    },
    {
        title: '所属部门',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state'
    },
    {
        title: '操作',
        dataIndex: 'caozuo',
        key: 'caozuo',
        render: (): any => <Checkbox />
    }
]

class ExaminationModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            previewvisible: false,
            nama: '',
            department: '',
            describe: '',
            dataSource: [
                {
                    key: '1',
                    name: '21222',
                    age: '2019业务部门基本知识考试',
                    date: '业务部门',
                    leixing: '胡珍珍',
                    bumen: '2018.11.16'
                },
                {
                    key: '2',
                    name: '21223',
                    age: '2019财务部门基本知识考试',
                    date: '财务部门',
                    leixing: '胡珍珍',
                    bumen: '2018.12.1'
                },
                {
                    key: '3',
                    name: '21224',
                    age: '2019业务部门基本知识考试',
                    date: '业务部门',
                    leixing: '胡珍珍',
                    bumen: '2018.11.16'
                },
                {
                    key: '4',
                    name: '21225',
                    age: '2019财务部门基本知识考试',
                    date: '财务部门',
                    leixing: '胡珍珍',
                    bumen: '2018.11.16'
                },
                {
                    key: '5',
                    name: '21226',
                    age: '2019业务部门基本知识考试',
                    date: '业务部门',
                    leixing: '胡珍珍',
                    bumen: '2018.11.16'
                }
            ],
            dataSource2: [
                {
                    key: '1',
                    name: '21226',
                    age: '2019业务部门基本知识考试',
                    leixing: '21226',
                    bumen: '胡珍珍',
                    date: '业务部门',
                    state: '未授权'
                },
                {
                    key: '2',
                    name: '21227',
                    age: '2019业务部门基本知识考试',
                    leixing: '21227',
                    bumen: '胡珍珍',
                    date: '财务部门',
                    state: '已授权'
                },
                {
                    key: '3',
                    name: '21228',
                    age: '2019业务部门基本知识考试',
                    leixing: '21228',
                    bumen: '胡珍珍',
                    date: '业务部门',
                    state: '未授权'
                },
                {
                    key: '4',
                    name: '21229',
                    age: '2019业务部门基本知识考试',
                    leixing: '21229',
                    bumen: '胡珍珍',
                    date: '财务部门',
                    state: '已授权'
                },
                {
                    key: '5',
                    name: '21220',
                    age: '2019业务部门基本知识考试',
                    leixing: '21220',
                    bumen: '胡珍珍',
                    date: '业务部门',
                    state: '未授权'
                }
            ]
        }
    }

    public empty = (): void => {
        console.log()
        this.setState({
            nama: '',
            department: '',
            describe: ''
        })
    }

    public render(): React.ReactElement {
        return (
            <div style={{ height: '500px', overflow: 'auto' }}>
                <div style={{ border: '1px solid #ccc', padding: '15px' }}>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={6}>考试名称：</Col>
                        <Col span={6}>
                            <Input value={this.state.nama} onChange={(e): void => this.setState({ nama: e.target.value })} />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={6}>部门选择：</Col>
                        <Col span={6}>
                            <Select value={this.state.department} style={{ width: '100%' }} onChange={(value: number): void => this.setState({ department: value })}>
                                <Select.Option value="1">全公司</Select.Option>
                                <Select.Option value="2">业务部</Select.Option>
                                <Select.Option value="3">财务部</Select.Option>
                                <Select.Option value="4">运营部</Select.Option>
                                <Select.Option value="5">信息部</Select.Option>
                                <Select.Option value="6">部他</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={4}>考试时间：</Col>
                        <Col span={4}>
                            <DatePicker onChange={onChange} />
                        </Col>
                        <Col span={4}>
                            <DatePicker onChange={onChange} />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={6}>考试描述：</Col>
                        <Col span={6}>
                            <Input.TextArea value={this.state.describe} onChange={(e): void => this.setState({ describe: e.target.value })} rows={2} />
                        </Col>
                    </Row>
                    <Button type="primary" onClick={this.empty}>清空</Button>
                    <Button type="primary" onClick={(): void => { message.success('保存成功') }}>保存</Button>
                </div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <Tabs.TabPane tab="试卷选择" key="1">
                            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <Row style={{ marginBottom: '5px' }}>
                                    <Col span={2}>部门:</Col>
                                    <Col span={6}>
                                        <Select style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="2">业务部</Select.Option>
                                            <Select.Option value="3">财务部</Select.Option>
                                            <Select.Option value="4">运营部</Select.Option>
                                            <Select.Option value="5">信息部</Select.Option>
                                            <Select.Option value="6">部他</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={2}>试卷类型:</Col>
                                    <Col span={6}>
                                        <Select style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="2">全部</Select.Option>
                                            <Select.Option value="3">培训</Select.Option>
                                            <Select.Option value="4">考试</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={2}>创建人:</Col>
                                    <Col span={6}>
                                        <Input value={this.state.founder} />
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '20px' }}>
                                    <Col span={3}>考试时间：</Col>
                                    <Col span={6}>
                                        <DatePicker onChange={onChange} />
                                    </Col>
                                    <Col span={6}>
                                        <DatePicker onChange={onChange} />
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '20px' }}>
                                    <Button type="primary" onClick={(): void => this.setState({ dataSource: data })}>查询</Button>
                                </Row>
                            </div>
                            <Table
                                dataSource={this.state.dataSource}
                                columns={columns}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="人员选择" key="2">
                            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <Row style={{ marginBottom: '5px' }}>
                                    <Col span={2}>部门:</Col>
                                    <Col span={3}>
                                        <Select defaultValue="部门:" style={{ width: '100%' }} onChange={handleChange}>
                                            <Select.Option value="2">业务部</Select.Option>
                                            <Select.Option value="3">财务部</Select.Option>
                                            <Select.Option value="4">运营部</Select.Option>
                                            <Select.Option value="5">信息部</Select.Option>
                                            <Select.Option value="6">部他</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={2}>用户名:</Col>
                                    <Col span={3}>
                                        <Input />
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} span={2}>用户姓名:</Col>
                                    <Col span={3}>
                                        <Input />
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '20px' }}>
                                    <Button type="primary" onClick={(): void => this.setState({ dataSource2: data2 })}>查询</Button>
                                </Row>
                            </div>
                            <Table
                                dataSource={this.state.dataSource2}
                                columns={columns2}
                            />

                        </Tabs.TabPane>
                    </Tabs>
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={(): void => { this.setState({ previewvisible: true }) }} type="primary">试卷预览</Button>
                        <Button onClick={(): void => { message.success('生成成功') }} type="primary">生成试卷</Button>
                    </div>
                    <DraggableModal
                        visible={this.state.previewvisible}
                        title="新增判断题"
                        onOk={(): void => this.setState({ previewvisible: false })}
                        width={800}
                        onCancel={(): void => this.setState({ previewvisible: false })}
                    >
                        <ExaminationPaper />
                    </DraggableModal>
                </div>
            </div>
        )
    }
}

export default ExaminationModal