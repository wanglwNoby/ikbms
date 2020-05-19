import * as React from 'react'
import { Table, Button, Col, Input, Row, Select, DatePicker } from 'antd'
import moment from 'moment'
import ExaminationPaper from '../../train/examinationPaper'
import DraggableModal from '../../../components/cores/draggableModal/draggableModal'


class MyExamination extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            rangeTime: [moment().startOf('day'), moment().endOf('day')], // 自定义时间moment[]
            training: false,
            dataSource: [
                {
                    key: '1',
                    trainingName: '2019业务部基础知识考试',
                    trainee: '胡珍珍',
                    trainingTime: '2019.10.1',
                    department: '全公司',
                    state: '0',
                    publisher: '胡珍珍',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '2',
                    trainingName: '2019信息部基础知识考试',
                    trainee: '雷怡君',
                    trainingTime: '2019.10.1',
                    department: '财务部',
                    state: '0',
                    publisher: '雷怡君',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '3',
                    trainingName: '2019财务部基础知识考试',
                    trainee: '茅瑾瑜',
                    trainingTime: '2019.10.1',
                    department: '全公司',
                    state: '0',
                    publisher: '茅瑾瑜',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '4',
                    trainingName: '2019财务部技能知识考试',
                    trainee: '宋亦靖',
                    trainingTime: '2019.10.1',
                    department: '财务部',
                    state: '0',
                    publisher: '宋亦靖',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '5',
                    trainingName: '保险合同的现金价值',
                    trainee: '胡珍珍',
                    trainingTime: '2019.10.1',
                    department: '全公司',
                    state: '1',
                    publisher: '胡珍珍',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '6',
                    trainingName: '美满一生现金价值表',
                    trainee: '雷怡君',
                    trainingTime: '2019.10.1',
                    department: '财务部',
                    state: '1',
                    publisher: '雷怡君',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '7',
                    trainingName: '保额与现金价值分红',
                    trainee: '茅瑾瑜',
                    trainingTime: '2019.10.1',
                    department: '全公司',
                    state: '1',
                    publisher: '茅瑾瑜',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '8',
                    trainingName: '保单现金价值与红利',
                    trainee: '胡珍珍',
                    trainingTime: '2019.10.1',
                    department: '财务部',
                    state: '1',
                    publisher: '胡珍珍',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '9',
                    trainingName: '库存现金价值',
                    trainee: '茅瑾瑜',
                    trainingTime: '2019.10.1',
                    department: '全公司',
                    state: '1',
                    publisher: '茅瑾瑜',
                    releaseTime: '2019.10.1'
                },
                {
                    key: '10',
                    trainingName: '如何看懂现金价值',
                    trainee: '宋亦靖',
                    trainingTime: '2019.10.1',
                    department: '财务部',
                    state: '1',
                    publisher: '宋亦靖',
                    releaseTime: '2019.10.1'
                }
            ]
        }
    }

    public onSelectChange = (selectedRowKeys): void => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    public handleChangeOthers = (dates: any): void => {
        this.setState({
            rangeTime: dates
        })
    }

    public render(): React.ReactElement {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const data = [
            {
                key: '1',
                trainingName: '2019业务部基础知识培训',
                trainee: '胡珍珍',
                trainingTime: '2019.10.1',
                department: '全公司',
                state: '0',
                publisher: '胡珍珍',
                releaseTime: '2019.10.1'
            },
            {
                key: '2',
                trainingName: '2019信息部基础知识培训',
                trainee: '雷怡君',
                trainingTime: '2019.10.1',
                department: '财务部',
                state: '0',
                publisher: '雷怡君',
                releaseTime: '2019.10.1'
            },
            {
                key: '3',
                trainingName: '2019财务部基础知识培训',
                trainee: '茅瑾瑜',
                trainingTime: '2019.10.1',
                department: '全公司',
                state: '0',
                publisher: '茅瑾瑜',
                releaseTime: '2019.10.1'
            },
            {
                key: '4',
                trainingName: '2019财务部技能知识培训',
                trainee: '宋亦靖',
                trainingTime: '2019.10.1',
                department: '财务部',
                state: '0',
                publisher: '宋亦靖',
                releaseTime: '2019.10.1'
            }
        ]

        const columns = [
            {
                title: '考试名称',
                dataIndex: 'trainingName',
                key: 'trainingName',
                render: (text: any): React.ReactElement => (
                    <span style={{ color: '#1890ff' }} onClick={(): void => { this.setState({ training: true }) }}>
                        {text}
                    </span>
                )
            },
            {
                title: '考试人',
                dataIndex: 'trainee',
                key: 'trainee'
            },
            {
                title: '考试时间',
                dataIndex: 'trainingTime',
                key: 'trainingTime'
            },
            {
                title: '所属部门',
                key: 'department',
                dataIndex: 'department'
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render: (text: any): string => {
                    switch (text) {
                        case '0':
                            return '进行中'
                        case '1':
                            return '已完成'
                        default:
                            return text
                    }
                }
            },
            {
                title: '发布人',
                dataIndex: 'publisher',
                key: 'publisher'
            },
            {
                title: '发布时间',
                dataIndex: 'releaseTime',
                key: 'releaseTime'
            },
            {
                title: '操作',
                key: 'action',
                render: (record: any): any => {
                    switch (record.state) {
                        case '0':
                            return <Button type="primary" onClick={(): void => { this.setState({ training: true }) }}>参加</Button>
                        case '1':
                            return <Button type="primary" disabled onClick={(): void => { this.setState({ training: true }) }}>参加</Button>
                        default:
                            return ''
                    }
                }
            }
        ]

        return (
            <React.Fragment>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={2}>考试名称:</Col>
                    <Col span={6}>
                        <Input style={{ width: 300 }} placeholder="考试名称" />
                    </Col>
                    <Col span={4} style={{ textAlign: 'center' }}>考试状态:</Col>
                    <Col span={12}>
                        <Select defaultValue="考试状态" style={{ width: 300 }}>
                            <Select.Option value="0">进行中</Select.Option>
                            <Select.Option value="1">已结束</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={2}>考试时间:</Col>
                    <Col span={12}>
                        <DatePicker.RangePicker
                            ranges={{
                                近一天: [moment().subtract(1, 'days'), moment()],
                                近一周: [moment().subtract(7, 'days'), moment()],
                                近一月: [moment().subtract(1, 'months'), moment()]
                            }}
                            showTime
                            style={{ width: '100%' }}
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.rangeTime}
                            onChange={(dates: any): any => { this.handleChangeOthers(dates) }}
                        />
                    </Col>
                </Row>
                <div style={{ margin: '20px' }}>
                    <Button style={{ marginRight: '20px' }} onClick={(): void => this.setState({ dataSource: data })} type="primary">查询</Button>
                    <Button style={{ marginRight: '20px' }} type="primary">列表导出</Button>
                </div>
                <Table
                    rowSelection={rowSelection}
                    dataSource={this.state.dataSource}
                    columns={columns}
                />
                <DraggableModal
                    title="考试内容"
                    visible={this.state.training}
                    width={800}
                    onOk={(): void => { this.setState({ training: false }) }}
                    onCancel={(): void => { this.setState({ training: false }) }}
                >
                    <ExaminationPaper />
                </DraggableModal>
            </React.Fragment>
        )
    }
}

export default MyExamination