import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { PageHeader, Breadcrumb, Button } from 'antd'
import styles from './kdgPageHeader.module.less'

interface IProps extends RouteComponentProps {
    handleQuery?: () => void; // 查询按钮
    handleNormalized?: () => void; // 归一按钮
    handleRecommend?: () => void; // 推荐按钮
    handleSubmit?: () => void; // 提交按钮
    handleBack?: () => void; // 返回按钮
    handleReview?: () => void; // 审核按钮
    handleCreate?: () => void; // 创建按钮
    handleModify?: () => void; // 修改按钮
    handleDelete?: () => void; // 删除按钮
    handleReverse?: () => void; // 扭转按钮
    handleAddLabel?: () => void; // 加签按钮
    handleSetLevel?: () => void; // 设置等级按钮
    handleClassification?: () => void; // 归类按钮
    handleAnswer?: () => void; // 解答按钮
}

interface IState {
    itemName: {
        [key: string]: string;
    };
}

class KdgManagePageHeader extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            itemName: {
                problemHandling: '问题处理',
                problemSolving: '问题解答',
                announcement: '公告',
                article: '文章',
                document: '文库',
                baike: '百科',
                FAQ: 'FAQ',
                create: '创建',
                review: '审核',
                feedback: '反馈处理',
                catalog: '知识目录',
                classify: '业务分类',
                powerControl: '权限控制',
                tag: '标签',
                dispatch: '派工规则'
            }
        }
    }

    // 解析路由路径
    public analysisRoutePath = (pathname: string): React.ReactElement[] => {
        const path = pathname.split('/')
        const breadcrumbItem: React.ReactElement[] = [<Breadcrumb.Item key="kdgManage">知识管理</Breadcrumb.Item>]
        for (let i = 1; i < path.length; i++) {
            breadcrumbItem.push(<Breadcrumb.Item key={path[i]}>{this.state.itemName[path[i]]}</Breadcrumb.Item>)
        }
        return breadcrumbItem
    }

    public render(): React.ReactElement {
        return (
            <PageHeader
                className={styles.pageHeader}
                title={
                    <Breadcrumb separator=">">
                        {
                            this.analysisRoutePath(this.props.location.pathname)
                        }
                    </Breadcrumb>
                }
                extra={[
                    this.props.handleQuery && <Button key="query" type="primary" size="small" onClick={this.props.handleQuery}>查询</Button>,
                    this.props.handleClassification && <Button key="classification" type="primary" size="small" onClick={this.props.handleClassification}>归类</Button>,
                    this.props.handleRecommend && <Button key="recommend" type="primary" size="small" onClick={this.props.handleRecommend}>推荐</Button>,
                    this.props.handleDelete && <Button key="delete" type="primary" size="small" onClick={this.props.handleDelete}>删除</Button>,

                    this.props.handleNormalized && <Button key="normalized" type="primary" size="small" onClick={this.props.handleNormalized}>归一</Button>,
                    this.props.handleReview && <Button key="review" type="primary" size="small" onClick={this.props.handleReview}>审核</Button>,
                    this.props.handleCreate && <Button key="create" type="primary" size="small" onClick={this.props.handleCreate}>创建</Button>,
                    this.props.handleSubmit && <Button key="submit" type="primary" size="small" onClick={this.props.handleSubmit}>提交</Button>,
                    this.props.handleBack && <Button key="back" type="primary" size="small" onClick={this.props.handleBack}>返回</Button>,
                    this.props.handleModify && <Button key="modify" type="primary" size="small" onClick={this.props.handleModify}>修改</Button>,
                    this.props.handleReverse && <Button key="reverse" type="primary" size="small" onClick={this.props.handleReverse}>扭转</Button>,
                    this.props.handleAddLabel && <Button key="addLabel" type="primary" size="small" onClick={this.props.handleAddLabel}>加签</Button>,
                    this.props.handleSetLevel && <Button key="setLevel" type="primary" size="small" onClick={this.props.handleSetLevel}>设置等级</Button>,
                    this.props.handleAnswer && <Button key="answer" type="primary" size="small" onClick={this.props.handleAnswer}>解答</Button>
                ]}
            />
        )
    }
}

export default withRouter(KdgManagePageHeader)