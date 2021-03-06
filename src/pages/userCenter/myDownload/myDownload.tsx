import * as React from 'react'
import moment from 'moment'
import { Table, Row, message, Col, Button, Input, DatePicker } from 'antd'
import { _downloadList, _deleteDownloads } from '../../../common/api/userCenter'
import DraggableModal from '../../../components/cores/draggableModal/draggableModal'

class MyDownload extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedRows: [],
            columns: [
                {
                    title: '名称',
                    dataIndex: 'doc_name',
                    width: '200px',
                    key: 'doc_name',
                    ellipsis: 'true',
                    render: (text): any => <span title={text}>{text}</span>
                },
                {
                    title: '下载时间',
                    dataIndex: 'time',
                    key: 'time',
                    width: '200px',
                    ellipsis: 'true',
                    render: (text): string => (this.fomatTime(text))
                },
                {
                    title: '存储位置',
                    dataIndex: 'save_path',
                    width: '250px',
                    ellipsis: 'true',
                    key: 'save_path',
                    render: (text): any => <span title={text}>{text}</span>
                },
                {
                    title: '创建时间',
                    dataIndex: 'create_time',
                    key: 'create_time',
                    width: '200px',
                    ellipsis: 'true',
                    render: (text): string => (this.fomatTime(text))
                }/* ,
                {
                    title: '操作',
                    dataIndex: 'caozuo',
                    key: 'caozuo',
                    render: (): any => (
                        <Button.Group>
                            <Button size="small" type="primary">删除</Button>
                        </Button.Group>
                    )
                } */
            ],
            dataSource: [],
            criteria: false, // 控制查询弹框
            rangeTime: [moment().startOf('month'), moment().endOf('month').endOf('month')] // 查询时间
        }
    }

    public componentDidMount(): void {
        this.getDownload()
    }

    // 获取本月我的下载
    public getDownload = async (): Promise<void> => {
        const res: any = await _downloadList({
            params: {
                begin_time: moment(this.state.rangeTime[0]).format('YYYYMMDDHHmmss'),
                end_time: moment(this.state.rangeTime[1]).format('YYYYMMDDHHmmss')
            }
        })
        if (res && res.result) {
            res.data.forEach((item: any): void => {
                item.key = item.id
            })
            this.setState({
                dataSource: res.data
            })
        }
    }

    // 处理时间
    public fomatTime = (time: string): string => (
        `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)} ${time.slice(8, 10)}:${time.slice(10, 12)}:${time.slice(12)}`
    )

    // 删除我的下载
    public batchDeleteDownload = async (): Promise<void> => {
        if (this.state.selectedRows.length > 0) {
            const data = this.state.selectedRows.map((item: any) => ({
                month: item.month,
                id: item.id
            }))
            console.log(data)
            const res: any = await _deleteDownloads({ questions: data })
            if (res && res.result) {
                console.log(res)
                this.getDownload()
            }
            return
        }
        message.warning('请选择至少一条数据')
    }

    // 通过查询条件获取我的下载
    public setCriteria = (): void => {
        this.getDownload()
        this.setState({
            criteria: false
        })
    }

    public onSelectChange = (selectedRowKeys: any, selectedRows: any): void => {
        this.setState({ selectedRows })
        console.log('selectedRowKeys changed: ', selectedRowKeys)
    }

    public render(): React.ReactElement {
        const { selectedRows } = this.state
        const rowSelection = {
            selectedRows,
            onChange: this.onSelectChange
        }
        return (
            <div>
                <div style={{ margin: '20px' }}>
                    <Button.Group>
                        <Button style={{ marginRight: '20px' }} onClick={(): void => this.setState({ criteria: true })} type="primary" icon="search">查询</Button>
                        <Button onClick={this.batchDeleteDownload} style={{ marginRight: '70px' }} type="primary" icon="close">删除</Button>
                        <Input.Search
                            placeholder="请输入名称"
                            style={{ width: 200 }}
                        />
                    </Button.Group>
                </div>
                <Table
                    scroll={{
                        x: '100%',
                        y: '400px'
                    }}
                    rowSelection={rowSelection}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    pagination={{ pageSize: 20 }}
                />
                <DraggableModal
                    title="查询条件"
                    visible={this.state.criteria}
                    width={600}
                    onOk={this.setCriteria}
                    onCancel={(): void => { this.setState({ criteria: false }) }}
                >
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={4}>查询时间:</Col>
                        <Col span={18}>
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
                                onChange={(dates: any): any => this.setState({ rangeTime: dates })}
                            />
                        </Col>
                    </Row>
                </DraggableModal>
            </div>
        )
    }
}

export default MyDownload