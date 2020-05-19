import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout, Spin, message } from 'antd'
import { connect } from 'react-redux'
import setTheme from '../../redux/actions/themeAction'
import HeadMenu from '../../components/containers/header-menu/headMenu'
import HeaderSearch from '../../components/containers/header-search/headerSearch'
import HeaderBell from '../../components/containers/header-bell/headerBell'
import HeaderSet from '../../components/containers/header-set/headerSet'
import HeaderUser from '../../components/containers/header-user/headerUser'
import imgSrc from '../../assets/images/logo.png'
import styles from './home.module.less'

const Train = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../train/train'))
const Exam = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../exam/exam'))
const Forum = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../forum/forum'))
const ProblemHandling = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../problemHandling/problemHandling'))
const ProblemSolving = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../problemSolving/problemSolving'))
const Announcement = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../announcement/announcement'))
const Article = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../article/article'))
const Document = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../document/document'))
const Baike = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../baike/baike'))
const FAQ = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../faq/faq'))
const PowerControl = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../powerControl/powerControl'))
const Catalog = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../catalog/catalog'))
const Classify = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../classify/classify'))
const Tag = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../tag/tag'))
const Dispatch = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../dispatch/dispatch'))
const Mall = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../mall/mall'))
const KdgRetrieval = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../kdgRetrieval/kdgRetrieval'))
const KdgDetails = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../kdgDetails/kdgDetails'))
const Question = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../question/question'))
const UserCenter = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../userCenter/userCenter'))
const ChangeLayout = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../changeLayout/changeLayout'))
const HomePage = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../homePage/homePage'))
const ErrorPage = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../errorPage/errorPage'))

const { Header, Content, Footer } = Layout

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public componentDidMount(): void {
        this.initTheme()
    }

    // 初始化主题
    public initTheme = (): void => {
        if (localStorage.getItem('ikbms-theme')) {
            const vars = JSON.parse(localStorage.getItem('ikbms-theme'))
            const win: any = window
            win.less.modifyVars(vars).then((): void => {
                this.props.setTheme(JSON.stringify(vars) === '{}' ? 'light' : 'dark')
            }).catch((error: any): void => {
                message.error('初始化主题失败', error)
            })
        }
    }

    public render(): React.ReactElement {
        return (
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <div className={styles.logo} onClick={(): void => this.props.history.push('/')}>
                        <img src={imgSrc} alt="logo" title="回到首页" />
                    </div>
                    <HeadMenu />
                    <div className={styles.headerLeft}>
                        <HeaderSearch />
                        <HeaderBell />
                        <HeaderSet />
                        <HeaderUser />
                    </div>
                </Header>
                <Content className={styles.main}>
                    <React.Suspense
                        fallback={
                            <div className={styles.spinContainer}>
                                <Spin tip="正在加载中..." />
                            </div>
                        }
                    >
                        <Switch>
                            <Route path="/announcement" component={Announcement} />
                            <Route path="/article" component={Article} />
                            <Route path="/document" component={Document} />
                            <Route path="/baike" component={Baike} />
                            <Route path="/FAQ" component={FAQ} />
                            <Route exact path="/problemHandling" component={ProblemHandling} />
                            <Route exact path="/problemSolving" component={ProblemSolving} />
                            <Route exact path="/powerControl" component={PowerControl} />
                            <Route exact path="/catalog" component={Catalog} />
                            <Route exact path="/classify" component={Classify} />
                            <Route exact path="/tag" component={Tag} />
                            <Route exact path="/dispatch" component={Dispatch} />
                            <Route exact path="/train" component={Train} />
                            <Route exact path="/exam" component={Exam} />
                            <Route exact path="/forum" component={Forum} />
                            <Route exact path="/mall" component={Mall} />
                            <Route exact path="/kms" component={KdgRetrieval} />
                            <Route exact path="/kdgDetails" component={KdgDetails} />
                            <Route exact path="/question" component={Question} />
                            <Route exact path="/userCenter" component={UserCenter} />
                            <Route exact path="/changeLayout" component={ChangeLayout} />
                            <Route exact path="/" component={HomePage} />
                            <Route component={ErrorPage} />
                        </Switch>
                    </React.Suspense>
                </Content>
                <Footer className={styles.footer}>
                    Copyright © NetInfo 2016 - 2019 All right reserved.
                </Footer>
            </Layout>
        )
    }
}

const mapDispatchToProps = (dispatch: any): IMapDispatchToProps => ({
    setTheme: (theme: string): void => dispatch(setTheme(theme))
})

export default connect(null, mapDispatchToProps)(Home)