import * as React from 'react'
import moment from 'moment'
import { Row, Col, Form, Input, Button, Select, DatePicker, Table, Popconfirm } from 'antd'
import KdgManagePageHeader from '../../components/containers/kdgPageHeader/kdgPageHeader'
import styles from './dispatch.module.less'

class Dispatch extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            isA: false,
            columns: [{
                dataIndex: 'type',
                key: '1',
                title: '派工类型',
                width: 200
            }, {
                dataIndex: 'rule',
                key: '2',
                title: '派工规则',
                width: 200
            }, {
                dataIndex: 'time',
                key: '3',
                title: '响应间隔',
                width: 200
            }, {
                dataIndex: 'creator',
                key: '4',
                title: '创建人',
                width: 200
            }, {
                dataIndex: 'createTime',
                key: '5',
                title: '创建时间',
                width: 200
            }, {
                key: '0',
                title: '操作',
                dataIndex: 'operation',
                width: 150,
                render: (): React.ReactElement => (
                    <React.Fragment>
                        <Button type="primary" size="small" onClick={(): void => console.log('111')}>修改</Button>
                        <Popconfirm title="确定删除吗？" onConfirm={(): void => this.delete()}>
                            <Button type="primary" size="small" style={{ marginLeft: 8 }}>删除</Button>
                        </Popconfirm>
                    </React.Fragment>
                )
            }],
            data: [{
                type: '按部门',
                rule: '按部门分组顺序',
                time: '3分钟',
                creator: 'wanglw',
                createTime: '2019-11-2 13:56:09'
            }, {
                type: '按部门',
                rule: '按操作顺序循环',
                time: '5分钟',
                creator: 'chenmj',
                createTime: '2019-10-28 13:33:09'
            }, {
                type: '按部门',
                rule: '按部门分组顺序',
                time: '15分钟',
                creator: 'young',
                createTime: '2019-10-20 16:26:09'
            }, {
                type: '按产品',
                rule: '按产品分组顺序',
                time: '3分钟',
                creator: 'wanglw',
                createTime: '2019-10-08 13:56:09'
            }, {
                type: '按产品',
                rule: '按产品分组顺序',
                time: '3分钟',
                creator: 'jiang',
                createTime: '2019-10-28 10:16:39'
            }]
        }
    }

    public handleSearch = (): void => {
        if (this.state.isA) {
            this.setState({
                isA: false,
                data: [{
                    type: '按产品',
                    rule: '按顺序循环',
                    time: '3分钟',
                    creator: 'wanglw',
                    createTime: '2019-10-08 13:56:09'
                }, {
                    type: '按产品',
                    rule: '按产品顺序循环',
                    time: '3分钟',
                    creator: 'jiang',
                    createTime: '2019-10-28 10:16:39'
                }]
            })
        } else {
            this.setState({
                isA: true,
                data: [{
                    type: '按部门',
                    rule: '按顺序循环',
                    time: '3分钟',
                    creator: 'wanglw',
                    createTime: '2019-11-2 13:56:09'
                }, {
                    type: '按部门',
                    rule: '按操作顺序循环',
                    time: '5分钟',
                    creator: 'chenmj',
                    createTime: '2019-10-28 13:33:09'
                }, {
                    type: '按部门',
                    rule: '按顺序循环',
                    time: '15分钟',
                    creator: 'young',
                    createTime: '2019-10-20 16:26:09'
                }]
            })
        }
    }

    public delete = (): void => {
        this.state.data.splice(1, 1)
        this.setState((prevstate: any): any => ({
            data: prevstate.data
        }))
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.dispatchWrapper}>
                <KdgManagePageHeader />
                <Form>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="派工类型">
                                <Select defaultValue="0" style={{ width: 300 }}>
                                    <Select.Option value="0">按产品</Select.Option>
                                    <Select.Option value="1">按部门</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="创建时间">
                                <DatePicker.RangePicker
                                    className={styles.rangePicker}
                                    ranges={{
                                        今天: [moment().startOf('day'), moment().endOf('day')],
                                        今周: [moment().startOf('week'), moment().endOf('week')],
                                        今月: [moment().startOf('month'), moment().endOf('month')],
                                        今年: [moment().startOf('year'), moment().endOf('year')]
                                    }}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="创建人">
                                <Input placeholder="请输入创建人" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Button type="primary" onClick={this.handleSearch}>
                                查询
                            </Button>
                            <Button type="primary" style={{ marginLeft: 16 }}>
                                新建
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Table
                    columns={this.state.columns}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}

export default Dispatch