import * as React from 'react'
import { Card, List, Icon, Divider } from 'antd'
import { Link } from 'react-router-dom'

class MyLink extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            currentClick: [{
                text: '创建公告',
                path: '/announcement/create'
            }, {
                text: '创建文章',
                path: '/article/create'
            }, {
                text: '创建文库',
                path: '/document/create'
            }, {
                text: '个人中心',
                path: '/userCenter'
            }, {
                text: '知识检索',
                path: '/kms'
            }],
            normalClick: [{
                text: '培训学习',
                path: '/train'
            }, {
                text: '论坛社区',
                path: '/forum'
            }, {
                text: '考试中心',
                path: '/exam'
            }, {
                text: '知识权限',
                path: '/powerControl'
            }, {
                text: '积分商城',
                path: '/mall'
            }]
        }
    }

    public deleteCurrent = (): void => {
        this.state.currentClick.splice(1, 1)
        this.setState((prevstate: any): any => ({
            currentClick: prevstate.currentClick
        }))
    }

    public deletenormal = (): void => {
        this.state.normalClick.splice(1, 1)
        this.setState((prevstate: any): any => ({
            normalClick: prevstate.normalClick
        }))
    }

    public render(): React.ReactElement {
        return (
            <div>
                <Card
                    bordered={false}
                    style={{ width: 600 }}
                    title="最近点击"
                >
                    <List
                        dataSource={this.state.currentClick}
                        renderItem={(item: any): React.ReactElement => (
                            <List.Item actions={[<Icon type="delete" onClick={this.deleteCurrent} />]}>
                                <List.Item.Meta
                                    title={
                                        <Link to={{ pathname: `${item.path}`, state: { keyword: item.text } }}>
                                            {item.text}
                                        </Link>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
                <Divider />
                <Card
                    bordered={false}
                    style={{ width: 600 }}
                    title="常用链接"
                >
                    <List
                        dataSource={this.state.normalClick}
                        renderItem={(item: any): React.ReactElement => (
                            <List.Item actions={[<Icon type="delete" onClick={this.deletenormal} />]}>
                                <List.Item.Meta
                                    title={
                                        <Link to={{ pathname: `${item.path}`, state: { keyword: item.text } }}>
                                            {item.text}
                                        </Link>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        )
    }
}

export default MyLink