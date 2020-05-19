import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './announcement.module.less'

const AnnouncementIndex = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./announcementIndex/announcementIndex'))
const AnnouncementCreate = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./announcementCreate/announcementCreate'))
const AnnouncementReview = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./announcementReview/announcementReview'))
const AnnouncementFeedback = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./announcementFeedback/announcementFeedback'))
const ErrorPage = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../errorPage/errorPage'))

class Announcement extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.announcementWrapper}>
                {/* <Col span={4} className={`${styles.col4} ant-menu-vertical-wrapper`}>
                    <Menu
                        theme={this.props.theme}
                        selectable={false}
                        className={styles.menu}
                    >
                        <Menu.Item key="create"><Link to="/announcement/create">创建</Link></Menu.Item>
                        <Menu.Item key="review"><Link to="/announcement/review">审核</Link></Menu.Item>
                        <Menu.Item key="feedback"><Link to="/announcement/feedback">反馈处理</Link></Menu.Item>
                    </Menu>
                </Col> */}
                <Switch>
                    <Route exact path="/announcement" component={AnnouncementIndex} />
                    <Route exact path="/announcement/create" component={AnnouncementCreate} />
                    <Route exact path="/announcement/review" component={AnnouncementReview} />
                    <Route exact path="/announcement/feedback" component={AnnouncementFeedback} />
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        )
    }
}

export default Announcement