import * as React from 'react'
import { Table, Row, Col, Input, DatePicker, Button, Select, Modal, message } from 'antd'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import Manual from './manualModal/manualModal'

function onChange(date, dateString): void {
    console.log(date, dateString)
}

function handleChange(value): void {
    console.log(`selected ${value}`)
}

class TestPaper extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            manualvisible: false,
            columns: [
                {
                    title: '题目信息',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text: any): React.ReactElement => (
                        <span onClick={(): void => { this.setState({ manualvisible: true }) }} style={{ color: '#1890ff' }}>
                            {text}
                        </span>
                    )
                },
                {
                    title: '创建人',
                    dataIndex: 'age',
                    key: 'age'
                },
                {
                    title: '创建时间',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: '题目类型',
                    dataIndex: 'leixing',
                    key: 'leixing'
                },
                {
                    title: '所属部门',
                    dataIndex: 'bumen',
                    key: 'bumen'
                },
                {
                    title: '知识分类',
                    dataIndex: 'fenlei',
                    key: 'fenlei'
                },
                {
                    title: '操作',
                    dataIndex: 'caozuo',
                    key: 'caozuo',
                    render: (text): any => <Button onClick={(): void => { this.deleteData() }} type="primary">{text}</Button>
                }
            ],
            dataSource: [
                {
                    key: '1',
                    name: '保单的现金价格',
                    age: '张三',
                    date: '2018.11.16',
                    leixing: '判断',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                },
                {
                    key: '2',
                    name: '人身保险的现金价值解析',
                    age: '李四',
                    date: '2018.11.16',
                    leixing: '判断',
                    bumen: '精算部',
                    fenlei: '精算',
                    caozuo: '删除'
                },
                {
                    key: '3',
                    name: '保险现金价值概念解读',
                    age: '王五',
                    date: '2018.11.16',
                    leixing: '单选',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                },
                {
                    key: '4',
                    name: '库存现金价值',
                    age: '张三',
                    date: '2018.11.16',
                    leixing: '单选',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                },
                {
                    key: '5',
                    name: '如何让看懂现金价格',
                    age: '张三',
                    date: '2018.11.16',
                    leixing: '判断',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                }
            ]
        }
    }

    public onSelectChange = (selectedRowKeys): void => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    public handleOk = (): void => {
        console.log(111)
        this.setState({
            manualvisible: false
        })
        message.success('新增完成')
    }

    public search = (): void => {
        this.setState({
            dataSource: [
                {
                    key: '1',
                    name: '人身保险的现金价值解析',
                    age: '李四',
                    date: '2018.11.16',
                    leixing: '判断',
                    bumen: '精算部',
                    fenlei: '精算',
                    caozuo: '删除'
                },
                {
                    key: '2',
                    name: '保险现金价值概念解读',
                    age: '王五',
                    date: '2018.11.16',
                    leixing: '单选',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                },
                {
                    key: '3',
                    name: '库存现金价值',
                    age: '张三',
                    date: '2018.11.16',
                    leixing: '单选',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                },
                {
                    key: '4',
                    name: '如何让看懂现金价格',
                    age: '张三',
                    date: '2018.11.16',
                    leixing: '判断',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                }
            ]
        })
    }

    public delete = (): void => {
        const data = JSON.parse(JSON.stringify(this.state.dataSource))
        data.shift()
        this.setState((): any => ({
            dataSource: data
        }))
    }

    public deleteData = (): void => {
        Modal.confirm({
            title: '确定删除吗？',
            content: '',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',
            onCancel: (): void => { console.log('cancle') },
            onOk: (): void => {
                this.delete()
            }
        })
    }

    public render(): React.ReactElement {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        return (
            <div>
                <div>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={4}>试卷名称：</Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={4}>创建人</Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={2}>创建时间：</Col>
                        <Col span={6}>
                            <DatePicker onChange={onChange} />
                            <DatePicker onChange={onChange} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={4}>所属部门：</Col>
                        <Col span={4}>
                            <Select style={{ width: '100%' }} onChange={handleChange}>
                                <Select.Option value="1">请选择</Select.Option>
                                <Select.Option value="jack">销售部门</Select.Option>
                                <Select.Option value="lucy">开发部门</Select.Option>
                                <Select.Option value="Yiminghe">行政部门</Select.Option>
                            </Select>
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={4}>所属知识：</Col>
                        <Col span={4}>
                            <Select style={{ width: '100%' }} onChange={handleChange}>
                                <Select.Option value="1">请选择</Select.Option>
                                <Select.Option value="jack">销售</Select.Option>
                                <Select.Option value="lucy">开发</Select.Option>
                                <Select.Option value="Yiminghe">行政</Select.Option>
                            </Select>
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={2}>考试时间：</Col>
                        <Col span={6}>
                            <DatePicker onChange={onChange} />
                            <DatePicker onChange={onChange} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={4}>试卷类型：</Col>
                        <Col span={4}>
                            <Select style={{ width: '100%' }} onChange={handleChange}>
                                <Select.Option value="1">请选择</Select.Option>
                                <Select.Option value="jack">培训</Select.Option>
                                <Select.Option value="lucy">考试</Select.Option>
                            </Select>
                        </Col>
                        <Col span={16}>
                            <Button onClick={(): void => { this.search() }} style={{ marginLeft: '30px' }} type="primary">查询</Button>
                        </Col>
                    </Row>
                </div>
                <div style={{ margin: '20px' }}>
                    <Button onClick={(): void => { this.setState({ manualvisible: true }) }} style={{ marginRight: '20px' }} type="primary">手动生成试卷</Button>
                    <Button onClick={(): void => { this.setState({ manualvisible: true }) }} style={{ marginRight: '20px' }} type="primary">自动生成试卷</Button>
                </div>
                <Table
                    rowSelection={rowSelection}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
                <DraggableModal
                    visible={this.state.manualvisible}
                    title="新增"
                    onOk={this.handleOk}
                    width={1000}
                    onCancel={(): void => this.setState({ manualvisible: false })}
                >
                    <Manual />
                </DraggableModal>
            </div>
        )
    }
}

export default TestPaper