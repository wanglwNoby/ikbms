import * as React from 'react'
import moment from 'moment'
import { Row, Col, Icon, message, Button, Typography, List, Tooltip } from 'antd'
import { _listWeekBrowse, _deleteBrowse } from '../../../common/api/userCenter'

class MyBrowse extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            listBrowse: ''
        }
    }

    public componentDidMount(): void {
        this.getBrowse()
    }

    // 获取上周和本周的浏览
    public getBrowse = async (): Promise<void> => {
        const res: any = await _listWeekBrowse()
        if (res && res.result) {
            console.log(res)
            this.setState({
                listBrowse: res.data
            })
        }
    }

    // 删除我的历史搜索
    public deleteBrowse = async (type: string, id: string): Promise<void> => {
        console.log(type, id)
        const res: any = await _deleteBrowse({
            params: {
                delete_type: type,
                param: id
            }
        })
        if (res && res.result) {
            console.log(res)
            this.getBrowse()
            message.success('删除成功')
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
                    <Button onClick={(): void => { this.deleteBrowse('all', '') }} style={{ marginRight: '20px' }} type="primary">全部清除</Button>
                </div>
                <div style={{ background: 'white', padding: '20px', margin: '20px', height: '42%' }}>
                    <Row style={{ borderBottom: '1px solid #ccc' }}>
                        <Col span={12}>
                            <Typography.Title level={2}>
                                本周
                            </Typography.Title>
                        </Col>
                        <Col style={{ textAlign: 'right' }} span={12}>
                            <Button onClick={(): void => { this.deleteBrowse('thisWeek', '') }} type="primary">清除</Button>
                        </Col>
                    </Row>
                    <List
                        style={{ height: '138px', overflow: 'auto' }}
                        dataSource={this.state.listBrowse.thisWeek}
                        renderItem={(item: any): React.ReactElement => (
                            <List.Item>
                                <Row gutter={16} style={{ width: '100%' }}>
                                    <Col span={6}>
                                        {this.formatTime(item.time)}
                                    </Col>
                                    <Col span={10}>
                                        {item.kdg_title}
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={6}>
                                        <Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
                                            <Icon onClick={(): void => { this.deleteBrowse('id', item.id) }} type="close-circle" theme="twoTone" twoToneColor="#f5212d" />
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
                            <Button onClick={(): void => { this.deleteBrowse('lastWeek', '') }} type="primary">清除</Button>
                        </Col>
                    </Row>
                    <List
                        style={{ height: '138px', overflow: 'auto' }}
                        dataSource={this.state.listBrowse.lastWeek}
                        renderItem={(item: any): React.ReactElement => (
                            <List.Item>
                                <Row gutter={16} style={{ width: '100%' }}>
                                    <Col span={6}>
                                        {this.formatTime(item.time)}
                                    </Col>
                                    <Col span={10}>
                                        {item.kdg_title}
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={6}>
                                        <Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
                                            <Icon onClick={(): void => { this.deleteBrowse('id', item.id) }} type="close-circle" theme="twoTone" twoToneColor="#f5212d" />
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

export default MyBrowse