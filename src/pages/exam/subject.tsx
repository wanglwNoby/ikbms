import * as React from 'react'
import { Table, Row, Col, Input, DatePicker, Button, Select, Modal, message } from 'antd'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import Judge from './judgeModal/judgeModal'
import Choose from './chooseModal/chooseModal'
import Multiple from './multipleModal/multipleModal'
import Info from './info'

function onChange(date, dateString): void {
    console.log(date, dateString)
}

function handleChange(value): void {
    console.log(`selected ${value}`)
}

class Subject extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            judgevisible: false,
            choosevisible: false,
            multiplevisible: false,
            infoVisible: false,
            columns: [
                {
                    title: '题目信息',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text): any => <span onClick={(): void => { this.setState({ infoVisible: true }) }} style={{ color: '#1890ff' }}>{text}</span>
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
                },
                {
                    key: '6',
                    name: '如何让看懂现金价格',
                    age: '张三',
                    date: '2018.11.16',
                    leixing: '判断',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                },
                {
                    key: '7',
                    name: '如何让看懂现金价格',
                    age: '张三',
                    date: '2018.11.16',
                    leixing: '判断',
                    bumen: '业务部',
                    fenlei: '产品',
                    caozuo: '删除'
                },
                {
                    key: '8',
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
            judgevisible: false
        })
        message.success('新增完成')
    }

    public handleOk1 = (): void => {
        console.log(111)
        this.setState({
            choosevisible: false
        })
        message.success('新增完成')
    }

    public handleOk2 = (): void => {
        console.log(111)
        this.setState({
            multiplevisible: false
        })
        message.success('新增完成')
    }

    public search = (): void => {
        this.setState({
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
                        <Col span={4}>题目信息：</Col>
                        <Col span={12}>
                            <Input />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={4}>题目类型：</Col>
                        <Col span={4}>
                            <Select defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange}>
                                <Select.Option value="jack">单选</Select.Option>
                                <Select.Option value="lucy">多选</Select.Option>
                                <Select.Option value="Yiminghe">判断</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={4}>所属部门：</Col>
                        <Col span={4}>
                            <Select defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange}>
                                <Select.Option value="jack">销售部门</Select.Option>
                                <Select.Option value="lucy">开发部门</Select.Option>
                                <Select.Option value="Yiminghe">行政部门</Select.Option>
                            </Select>
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={4}>所属知识：</Col>
                        <Col span={4}>
                            <Select defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange}>
                                <Select.Option value="jack">销售</Select.Option>
                                <Select.Option value="lucy">开发</Select.Option>
                                <Select.Option value="Yiminghe">行政</Select.Option>
                            </Select>
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={4}>创建人：</Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={4}>创建时间：</Col>
                        <Col span={4}>
                            <DatePicker onChange={onChange} />
                        </Col>
                        <Col span={4}>
                            <DatePicker onChange={onChange} />
                        </Col>
                        <Col span={4}>
                            <Button onClick={(): void => { this.search() }} type="primary">查询</Button>
                        </Col>
                    </Row>
                </div>
                <div style={{ margin: '20px' }}>
                    <Button onClick={(): void => { this.setState({ judgevisible: true }) }} style={{ marginRight: '20px' }} type="primary">新增判断题</Button>
                    <Button onClick={(): void => { this.setState({ choosevisible: true }) }} style={{ marginRight: '20px' }} type="primary">新增选择题</Button>
                    <Button onClick={(): void => { this.setState({ multiplevisible: true }) }} type="primary">新增多选题</Button>
                </div>
                <Table
                    rowSelection={rowSelection}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
                <DraggableModal
                    visible={this.state.judgevisible}
                    title="新增判断题"
                    onOk={this.handleOk}
                    width={800}
                    onCancel={(): void => this.setState({ judgevisible: false })}
                >
                    <Judge />
                </DraggableModal>
                <DraggableModal
                    visible={this.state.choosevisible}
                    title="新增选择题"
                    onOk={this.handleOk1}
                    width={800}
                    onCancel={(): void => this.setState({ choosevisible: false })}
                >
                    <Choose />
                </DraggableModal>
                <DraggableModal
                    visible={this.state.multiplevisible}
                    title="新增多选题"
                    onOk={this.handleOk2}
                    width={800}
                    onCancel={(): void => this.setState({ multiplevisible: false })}
                >
                    <Multiple />
                </DraggableModal>
                <DraggableModal
                    visible={this.state.infoVisible}
                    title="题目"
                    onOk={this.handleOk}
                    width={1000}
                    onCancel={(): void => this.setState({ infoVisible: false })}
                >
                    <Info />
                </DraggableModal>
            </div>
        )
    }
}

export default Subject