import * as React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Layout, Card, List, Empty, Icon, Divider, Form, Input, Button, Comment, Typography } from 'antd'
import { _relativeKdg, _kdg, _checkFavorite, _createFavorite, _thumKdg } from '../../common/api/kdgDetails'
import AnnouncementDetails from '../../components/displays/announcementDetails/announcementDetails'
import ArticleDetails from '../../components/displays/articleDetails/articleDetails'
import DocumentDetails from '../../components/displays/documentDetails/documentDetails'
import BaikeDetails from '../../components/displays/baikeDetails/baikeDetails'
import FaqDetails from '../../components/displays/faqDetails/faqDetails'
import ForumDetails from '../../components/displays/forumDetails/forumDetails'
import ProblemDetails from '../../components/displays/problemDetails/problemDetails'
import styles from './kdgDetails.module.less'

const data = [{
    actions: [<span><Icon type="like" /></span>, <span><Icon type="delete" /></span>],
    author: 'wlw',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: '看到这个了解了很多。',
    datetime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
}, {
    actions: [<span><Icon type="like" /></span>, <span><Icon type="delete" /></span>],
    author: '星网',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: '收获颇丰',
    datetime: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')
}]

interface IState {
    relatedKdg: any; // 相关知识
    kdgDetails: any; // 知识详情
    isCollected: boolean; // 是否已收藏
    isThumbed: boolean; // 是否已点赞
}

class KdgDetails extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            relatedKdg: [],
            kdgDetails: {},
            isCollected: true,
            isThumbed: false
        }
    }

    public componentDidMount(): void {
        this.getKdgDetails(this.props.location.state.id, this.props.location.state.month)
    }

    public componentWillUpdate(nextProps: any): void {
        if (this.props.location !== nextProps.location) {
            this.getKdgDetails(nextProps.location.state.id, nextProps.location.state.month)
        }
    }

    // 获取知识详情
    public getKdgDetails = async (id: string, month: number): Promise<void> => {
        const res: any = await _kdg({
            params: { id, month }
        })
        if (res && res.result) {
            this.setState({
                kdgDetails: res.data,
                isThumbed: false
            }, (): void => {
                this.getRelatedKdg()
                this.checkCollected()
            })
        }
    }

    // 获取相关知识
    public getRelatedKdg = async (): Promise<void> => {
        if (this.state.kdgDetails.tags === '') {
            return
        }
        const res: any = await _relativeKdg({
            params: { tags: this.state.kdgDetails.tags }
        })
        if (res && res.result) {
            this.setState({
                relatedKdg: res.data.files
            })
        }
    }

    // 判断是否已收藏知识
    public checkCollected = async (): Promise<void> => {
        const res: any = await _checkFavorite({
            params: {
                kdg_id: this.state.kdgDetails.id,
                kdg_month: this.state.kdgDetails.month
            }
        })
        if (res && res.result && !res.data) {
            this.setState({
                isCollected: false
            })
        }
    }

    // 收藏知识
    public collectKdg = (): void => {
        if (this.state.isCollected) {
            return
        }
        _createFavorite({
            kdg_id: this.state.kdgDetails.id,
            kdg_month: this.state.kdgDetails.month,
            kdg_title: this.state.kdgDetails.title
        }).then((res: any): void => {
            if (res && res.result) {
                this.setState({
                    isCollected: true
                })
            }
        })
    }

    // 点赞
    public thumbKdg = (): void => {
        if (this.state.isThumbed) {
            return
        }
        _thumKdg({
            params: {
                id: this.state.kdgDetails.id,
                month: this.state.kdgDetails.month
            }
        }).then((res: any): void => {
            if (res && res.result) {
                this.setState({
                    isThumbed: true
                })
            }
        })
    }

    // 根据不同知识type展示不同内容
    public switchType = (): React.ReactElement => {
        switch (this.state.kdgDetails.type) {
            case 1:
                return <AnnouncementDetails kdgDetails={this.state.kdgDetails} />
            case 10:
                return <ArticleDetails kdgDetails={this.state.kdgDetails} />
            case 20:
                return <DocumentDetails kdgDetails={this.state.kdgDetails} />
            case 30:
                return <BaikeDetails kdgDetails={this.state.kdgDetails} />
            case 40:
                return <FaqDetails kdgDetails={this.state.kdgDetails} />
            case 50:
                return <ForumDetails kdgDetails={this.state.kdgDetails} />
            case 60:
                return <ProblemDetails kdgDetails={this.state.kdgDetails} />
            default:
                return <Empty />
        }
    }

    public render(): React.ReactElement {
        return (
            <Layout className={styles.layout}>
                <Layout.Content className={styles.content}>
                    <div className={styles.extra}>
                        <span style={{ cursor: 'pointer' }} onClick={this.collectKdg}>
                            <Icon type="star" style={{ marginRight: 8 }} />
                            {
                                this.state.isCollected ?
                                    <span>已收藏</span> :
                                    <span>收藏</span>
                            }
                        </span>
                        <Divider type="vertical" />
                        <span style={{ cursor: 'pointer' }} onClick={this.thumbKdg}>
                            <Icon type="like" style={{ marginRight: 8 }} />
                            {
                                this.state.isThumbed ? '已点赞' : this.state.kdgDetails.thumbs
                            }
                        </span>
                    </div>
                    {
                        this.switchType()
                    }
                    <Typography.Title level={3}>您的评论：</Typography.Title>
                    <Form.Item>
                        <Input.TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                        // value={this.state.content}
                        // onChange={this.handleInputChange.bind(this, 'content')}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">提交</Button>
                    </Form.Item>
                    <List
                        header={`${data.length}评论`}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item): React.ReactElement => (
                            <List.Item>
                                <Comment
                                    actions={item.actions}
                                    author={item.author}
                                    avatar={item.avatar}
                                    content={item.content}
                                    datetime={item.datetime}
                                />
                            </List.Item>
                        )}
                    />
                </Layout.Content>
                <Layout.Sider className={styles.sider}>
                    <Card
                        bordered={false}
                        title="相关知识"
                    >
                        <List
                            dataSource={this.state.relatedKdg}
                            renderItem={(item: any): React.ReactElement => (
                                <List.Item>
                                    <Link to={{ pathname: '/kdgDetails', state: { id: item.id, month: item.month } }}>
                                        {item.name}
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Layout.Sider>
            </Layout>
        )
    }
}

export default KdgDetails