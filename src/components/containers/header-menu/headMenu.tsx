import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { SelectParam } from 'antd/lib/menu'
import { _kdgManagementMenus } from '../../../common/api/global'

interface IMenu {
    id: string;
    name: string;
    children: IMenu[];
}

interface IState {
    selectedKeys: string;
    kdgManageMenus: IMenu[];
}

class HeadMenu extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedKeys: 'home',
            kdgManageMenus: []
        }
    }

    public componentDidMount(): void {
        this.getKdgManageMenus()
        const key = this.pathToKey(this.props.location.pathname.split('/')[1])
        this.setState({ selectedKeys: key === '' ? 'home' : key })
    }

    public pathToKey = (path: string): string => {
        switch (path) {
            case 'problemHandling':
                return '1026110110601010000'
            case 'problemSolving':
                return '1026110110601020000'
            case 'announcement':
                return '1026110110608000000'
            case 'article':
                return '1026110110609000000'
            case 'document':
                return '1026110110610000000'
            case 'baike':
                return '1026110110611000000'
            case 'FAQ':
                return '1026110110612000000'
            case 'powerControl':
                return '1026110110604000000'
            case 'catalog':
                return '1026110110605000000'
            case 'classify':
                return '1026110110606000000'
            case 'tag':
                return '1026110110607000000'
            case 'dispatch':
                return '1026110110600000000'
            default:
                return path
        }
    }

    public getKdgManageMenus = async (): Promise<void> => {
        const res: any = await _kdgManagementMenus()
        if (res && res.result) {
            this.setState({
                kdgManageMenus: res.data
            })
        }
    }

    public onSelect = (param: SelectParam): void => {
        this.setState({
            selectedKeys: param.key
        })
    }

    // 知识管理下拉菜单跳转
    public handleClick = (id: string): void => {
        switch (id) {
            case '1026110110601010000':
                this.props.history.push('/problemHandling')
                break
            case '1026110110601020000':
                this.props.history.push('/problemSolving')
                break
            case '1026110110608000000':
                this.props.history.push('/announcement')
                break
            case '1026110110609000000':
                this.props.history.push('/article')
                break
            case '1026110110610000000':
                this.props.history.push('/document')
                break
            case '1026110110611000000':
                this.props.history.push('/baike')
                break
            case '1026110110612000000':
                this.props.history.push('/FAQ')
                break
            case '1026110110604000000':
                this.props.history.push('/powerControl')
                break
            case '1026110110605000000':
                this.props.history.push('/catalog')
                break
            case '1026110110606000000':
                this.props.history.push('/classify')
                break
            case '1026110110607000000':
                this.props.history.push('/tag')
                break
            case '1026110110600000000':
                this.props.history.push('/dispatch')
                break
            default:
                break
        }
    }

    public render(): React.ReactElement {
        return (
            <Menu
                theme={this.props.theme}
                style={{ flex: '1', lineHeight: '64px' }}
                mode="horizontal"
                selectedKeys={[this.state.selectedKeys]}
                onSelect={this.onSelect}
            >
                <Menu.Item key="home">
                    <Link to="/">首页</Link>
                </Menu.Item>
                <Menu.Item key="train">
                    <Link to="/train">培训学习</Link>
                </Menu.Item>
                <Menu.Item key="exam">
                    <Link to="/exam">考试中心</Link>
                </Menu.Item>
                <Menu.Item key="forum">
                    <Link to="/forum">论坛社区</Link>
                </Menu.Item>
                <Menu.SubMenu
                    key="kdgManage"
                    title={<span>知识管理</span>}
                >
                    {
                        this.state.kdgManageMenus.map((item: IMenu): React.ReactElement => {
                            if (item.children.length > 0) {
                                return (
                                    <Menu.SubMenu key={item.id} title={item.name}>
                                        {
                                            item.children.map((childItem: IMenu): React.ReactElement => (
                                                <Menu.Item key={childItem.id} onClick={this.handleClick.bind(this, childItem.id)}>{childItem.name}</Menu.Item>
                                            ))
                                        }
                                    </Menu.SubMenu>
                                )
                            }
                            return (
                                <Menu.Item key={item.id} onClick={this.handleClick.bind(this, item.id)}>{item.name}</Menu.Item>
                            )
                        })
                    }
                    <Menu.Item key="1026110110600000000" onClick={this.handleClick.bind(this, '1026110110600000000')}>派工规则</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="mall">
                    <Link to="/mall">积分商城</Link>
                </Menu.Item>
            </Menu>
        )
    }
}

const mapStateToProps = (state: any): IMapStateToProps => ({
    theme: state.themeReducer.theme
})

export default connect(mapStateToProps, null)(withRouter(HeadMenu))