import * as React from 'react'
import { Link } from 'react-router-dom'
import { List, Icon, Typography } from 'antd'

interface IProps {
    isRefineResults: boolean; // 判断数据是否来源于检索结果
    data: any[]; // 传入进来的知识数据
    total?: number; // 总数据长度
    current?: number; // 当前页数
    pageChange?: (page: number) => void; // 跳转事件
}

class KnowledgeList extends React.PureComponent<IProps, any> {
    constructor(props: IProps) {
        super(props)
        this.state = {}
    }

    public render(): React.ReactElement {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={this.props.total ? {
                    total: this.props.total,
                    pageSize: 5,
                    current: this.props.current,
                    onChange: (page: number): void => this.props.pageChange(page)
                } : false}
                dataSource={this.props.data}
                renderItem={(item: any): React.ReactElement => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <span>{`${item.create_time.substr(0, 4)}年${item.create_time.substr(4, 2)}月${item.create_time.substr(6, 2)}日`}</span>,
                            <span>
                                <Icon type="like-o" style={{ marginRight: 8 }} />
                                {item.thumbs}
                            </span>,
                            <span>
                                <Icon type="message" style={{ marginRight: 8 }} />
                                {item.discusses}
                            </span>,
                            <span>
                                来源：
                                {
                                    item.type === 0 ? '普通知识' :
                                        item.type === 1 ? '公司公告' :
                                            item.type === 10 ? '公司文章' :
                                                item.type === 20 ? '公司文库' :
                                                    item.type === 30 ? '公司百科' :
                                                        item.type === 40 ? '公司FAQ' :
                                                            item.type === 50 ? '公司论坛' :
                                                                item.type === 60 ? '问题库' : '无'
                                }
                            </span>,
                            <span>
                                标签：
                                {
                                    item.tags.split(' ').map((tagItem: string): React.ReactElement => (
                                        <Link key={`tag-${Math.random()}`} to={{ pathname: '/kms', state: { keyword: tagItem } }}>
                                            {tagItem}
                                            &nbsp;
                                        </Link>
                                    ))
                                }
                            </span>
                        ]}
                    >
                        <Typography>
                            <Typography.Title level={3}>
                                <Link to={{ pathname: '/kdgDetails', state: { id: item.id, month: item.month } }}>
                                    <span dangerouslySetInnerHTML={{ __html: this.props.isRefineResults ? item.name_text : item.name }} />
                                </Link>
                            </Typography.Title>
                            <Typography.Paragraph ellipsis={{ rows: 3 }}>
                                <span dangerouslySetInnerHTML={{ __html: this.props.isRefineResults ? item.content_text : item.summary }} />
                            </Typography.Paragraph>
                        </Typography>
                    </List.Item>
                )}
            />
        )
    }
}

export default KnowledgeList