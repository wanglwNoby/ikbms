import * as React from 'react'
import { Popover, Badge, Icon, Tabs, List } from 'antd'
import styles from './headerBell.module.less'

interface IState {
    remindNumber: number; // 提醒数
    data: any[];
}

class HeaderBell extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            remindNumber: 6,
            data: [{
                title: '会议通知',
                content: '下午3：30二楼208会议'
            }, {
                title: '学习通知',
                content: '今晚7：30培训学习'
            }, {
                title: '考试通知',
                content: '明日8：00考试'
            }]
        }
    }

    public componentDidMount(): void {
        console.log('加载')
    }

    public render(): React.ReactElement {
        return (
            <Popover
                trigger="hover"
                overlayClassName={styles.popover}
                placement="bottomLeft"
                arrowPointAtCenter
                content={
                    <Tabs tabBarStyle={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Tabs.TabPane tab="通知(3)" key="notice">
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.data}
                                footer={
                                    <div className={styles.listFooter}>
                                        <span>清除 所有</span>
                                    </div>
                                }
                                renderItem={(item: any): React.ReactElement => (
                                    <List.Item actions={[<Icon type="delete" />]}>
                                        <List.Item.Meta
                                            title={item.title}
                                            description={item.content}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="消息(0)" key="information">
                            <List
                                itemLayout="horizontal"
                                dataSource={[]}
                                footer={
                                    <div className={styles.listFooter}>
                                        <span>清除 所有</span>
                                    </div>
                                }
                                renderItem={(item: any): React.ReactElement => (
                                    <List.Item actions={[<Icon type="delete" />]}>
                                        <List.Item.Meta
                                            title={item.title}
                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                        />
                                    </List.Item>
                                )}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="待办(3)" key="needToDeal">
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.data}
                                footer={
                                    <div className={styles.listFooter}>
                                        <span>清除 所有</span>
                                    </div>
                                }
                                renderItem={(item: any): React.ReactElement => (
                                    <List.Item actions={[<Icon type="delete" />]}>
                                        <List.Item.Meta
                                            description={item.title}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                }
            >
                <Badge className={styles.badge} count={this.state.remindNumber}>
                    <Icon type="bell" />
                </Badge>
            </Popover>
        )
    }
}

export default HeaderBell