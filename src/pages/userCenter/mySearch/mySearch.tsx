import * as React from 'react'
import moment from 'moment'
import { Button, Row, Col, List, Typography, Icon, Tooltip, message } from 'antd'
import { _listWeek, _deleteSearch } from '../../../common/api/userCenter'

class MySearch extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            listHistory: ''
        }
    }

    public componentDidMount(): void {
        this.getHistory()
    }

    // 获取上周和本周的搜索
    public getHistory = async (): Promise<void> => {
        const res: any = await _listWeek()
        if (res && res.result) {
            console.log(res)
            this.setState({
                listHistory: res.data
            })
        }
    }

    // 删除我的搜索
    public deleteSearch = async (type: string, id: string): Promise<void> => {
        console.log(type, id)
        const res: any = await _deleteSearch({
            params: {
                delete_type: type,
                param: id
            }
        })
        if (res && res.result) {
            console.log(res)
            message.success('删除成功')
            this.getHistory()
        } else {
            message.success('删除失败')
        }
    }

    // 处理时间
    public formatTime = (time: string): string => (
        moment.utc(time, 'YYYYMMDDHHmmss').local().format('YYYY-MM-DD HH:mm:ss')
    )

    public render(): React.ReactElement {
        return (
            <div style={{ height: '528px' }}>
                <div style={{ margin: '20px' }}>
                    <Button onClick={(): void => { this.deleteSearch('all', '') }} style={{ marginRight: '20px' }} type="primary">全部清除</Button>
                </div>
                <div style={{ background: 'white', padding: '20px', margin: '20px', height: '42%' }}>
                    <Row style={{ borderBottom: '1px solid #ccc' }}>
                        <Col span={12}>
                            <Typography.Title level={2}>
                                本周
                            </Typography.Title>
                        </Col>
                        <Col style={{ textAlign: 'right' }} span={12}>
                            <Button onClick={(): void => { this.deleteSearch('thisWeek', '') }} type="primary">清除</Button>
                        </Col>
                    </Row>
                    <List
                        style={{ height: '138px', overflow: 'auto' }}
                        dataSource={this.state.listHistory.thisWeek}
                        renderItem={(item: any): React.ReactElement => (
                            <List.Item>
                                <Row gutter={16} style={{ width: '100%' }}>
                                    <Col span={6}>
                                        {this.formatTime(item.time)}
                                    </Col>
                                    <Col span={10}>
                                        {item.text}
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={6}>
                                        <Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
                                            <Icon onClick={(): void => { this.deleteSearch('id', item.id) }} type="close-circle" theme="twoTone" twoToneColor="#f5212d" />
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </div>
                <div style={{ background: 'white', padding: '20px', margin: '20px', height: '42%' }}>
                    <Row style={{ borderBottom: '1px solid #ccc' }}>
                        <Col span={12}>
                            <Typography.Title level={2}>
                                上周
                            </Typography.Title>
                        </Col>
                        <Col style={{ textAlign: 'right' }} span={12}>
                            <Button onClick={(): void => { this.deleteSearch('lastWeek', '') }} type="primary">清除</Button>
                        </Col>
                    </Row>
                    <List
                        style={{ height: '138px', overflow: 'auto' }}
                        dataSource={this.state.listHistory.lastWeek}
                        renderItem={(item: any): React.ReactElement => (
                            <List.Item>
                                <Row gutter={16} style={{ width: '100%' }}>
                                    <Col span={6}>
                                        {this.formatTime(item.time)}
                                    </Col>
                                    <Col span={10}>
                                        {item.text}
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={6}>
                                        <Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
                                            <Icon onClick={(): void => { this.deleteSearch('id', item.id) }} type="close-circle" theme="twoTone" twoToneColor="#f5212d" />
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default MySearch