import * as React from 'react'
import { Table, Row, Col, Input, DatePicker, Button, Select, Modal, message } from 'antd'
import TrainModal from '../exam/trainModal/trainModal'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'

function onChange(date, dateString): void {
    console.log(date, dateString)
}

const data = [
    {
        key: '1',
        name: '39848585858',
        age: '2019业务部门基本知识培训',
        date: '2019业务部门基本知识培训',
        leixing: '胡珍珍',
        bumen: '2018.11.16',
        fenlei: '2018.11.16',
        fangshi: '已结束'
    },
    {
        key: '3',
        name: '5353453453453',
        age: '2019业务部门基本知识培训',
        date: '2019业务部门基本知识培训',
        leixing: '茅瑾瑜',
        bumen: '2018.11.16',
        fenlei: '2018.11.16',
        fangshi: '已结束'
    },
    {
        key: '5',
        name: '35235235235',
        age: '2019业务部门基本知识培训',
        date: '2019业务部门基本知识培训',
        leixing: '茅瑾瑜',
        bumen: '2018.11.16',
        fenlei: '2018.11.16',
        fangshi: '已结束'
    }
]

class TrainManage extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            trainVisible: false,
            columns: [
                {
                    title: '培训编号',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text): any => <span>{text}</span>
                },
                {
                    title: '培训名称',
                    dataIndex: 'age',
                    key: 'age'
                },
                {
                    title: '试卷名称',
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
                    title: '培训时间',
                    dataIndex: 'fenlei',
                    key: 'fenlei'
                },
                {
                    title: '培训状态',
                    dataIndex: 'fangshi',
                    key: 'fangshi'
                },
                {
                    title: '操作',
                    dataIndex: 'caozuo',
                    key: 'caozuo',
                    render: (): any => (
                        <Button.Group>
                            <Button size="small" type="primary">复制</Button>
                            <Button onClick={(): void => { this.deleteData() }} size="small" type="primary">删除</Button>
                        </Button.Group>
                    )
                }
            ],
            dataSource: [
                {
                    key: '1',
                    name: '39848585858',
                    age: '2019业务部门基本知识培训',
                    date: '2019业务部门基本知识培训',
                    leixing: '胡珍珍',
                    bumen: '2018.11.16',
                    fenlei: '2018.11.16',
                    fangshi: '已结束'
                },
                {
                    key: '2',
                    name: '3534535345465346',
                    age: '2019业务部门基本知识培训',
                    date: '2019业务部门基本知识培训',
                    leixing: '雷怡君',
                    bumen: '2018.12.1',
                    fenlei: '2018.12.2',
                    fangshi: '有效'
                },
                {
                    key: '3',
                    name: '5353453453453',
                    age: '2019业务部门基本知识培训',
                    date: '2019业务部门基本知识培训',
                    leixing: '茅瑾瑜',
                    bumen: '2018.11.16',
                    fenlei: '2018.11.16',
                    fangshi: '已结束'
                },
                {
                    key: '4',
                    name: '35353535353532',
                    age: '2019业务部门基本知识培训',
                    date: '2019业务部门基本知识培训',
                    leixing: '宋亦靖',
                    bumen: '2018.11.16',
                    fenlei: '2018.11.16',
                    fangshi: '有效'
                },
                {
                    key: '5',
                    name: '35235235235',
                    age: '2019业务部门基本知识培训',
                    date: '2019业务部门基本知识培训',
                    leixing: '茅瑾瑜',
                    bumen: '2018.11.16',
                    fenlei: '2018.11.16',
                    fangshi: '已结束'
                }
            ]
        }
    }

    public onSelectChange = (selectedRowKeys): void => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    public delete = (): void => {
        const data1 = JSON.parse(JSON.stringify(this.state.dataSource))
        data1.shift()
        this.setState((): any => ({
            dataSource: data1
        }))
    }

    public trainOK = (): void => {
        this.setState({ trainVisible: false })
        message.success('创建成功')
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
                        <Col span={4}>培训编号：</Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={4}>培训名称：</Col>
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
                        <Col span={4}>试卷编号</Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={4}>试卷名称：</Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={2}>培训时间：</Col>
                        <Col span={6}>
                            <DatePicker onChange={onChange} />
                            <DatePicker onChange={onChange} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={4}>培训设置人编号：</Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={4}>培训设置人姓名：</Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={2}>培训状态:</Col>
                        <Col span={4}>
                            <Select style={{ width: '100%' }}>
                                <Select.Option value="1">全部</Select.Option>
                                <Select.Option value="2">有效</Select.Option>
                                <Select.Option value="3">已结束</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div style={{ margin: '20px' }}>
                    <Button style={{ marginRight: '20px' }} onClick={(): void => this.setState({ trainVisible: true })} type="primary">培训创建</Button>
                    <Button style={{ marginRight: '20px' }} onClick={(): void => this.setState({ dataSource: data })} type="primary">查询</Button>
                </div>
                <Table
                    rowSelection={rowSelection}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
                <DraggableModal
                    visible={this.state.trainVisible}
                    title="培训创建"
                    onOk={this.trainOK}
                    width={900}
                    onCancel={(): void => this.setState({ trainVisible: false })}
                >
                    <TrainModal />
                </DraggableModal>
            </div>
        )
    }
}

export default TrainManage