import * as React from 'react'
import { Icon, message, Dropdown, Menu } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import setTheme from '../../../redux/actions/themeAction'
import { _settingMenus } from '../../../common/api/global'
import styles from './headerSet.module.less'

interface IMenu {
    id: string;
    name: string;
    children: IMenu[];
}

interface IState {
    menusData: IMenu[];
}

class HeaderSet extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            menusData: []
        }
    }

    public componentDidMount(): void {
        this.getMenusOfSetting()
    }

    public getMenusOfSetting = async (): Promise<void> => {
        const res: any = await _settingMenus()
        if (res && res.result) {
            this.setState({
                menusData: res.data
            })
        }
    }

    // 浅色主题
    public changeTolight = (): void => {
        const win: any = window
        win.less.modifyVars({}).then((): void => {
            localStorage.setItem('ikbms-theme', JSON.stringify({}))
            this.props.setTheme('light')
            message.success('主题设置成功')
        }).catch((error: any): void => {
            message.error('主题设置失败', error)
        })
    }

    // 深色主题
    public changeToDark = (): void => {
        const blackTheme: any = {
            '@primary-color': '#001529',
            '@heading-color': 'fade(@white, 85%)',
            '@border-color-base': '#001529',
            '@layout-header-background': '#001529',
            '@layout-body-background': '#393e46',
            '@text-color': 'fade(@white, 65%)',
            '@text-color-secondary': 'fade(@white, 45%)',
            '@disabled-color': 'fade(#fff, 25%)',
            '@slick-dots-background': '#fff'
        }
        const win: any = window
        win.less.modifyVars(blackTheme).then((): void => {
            localStorage.setItem('ikbms-theme', JSON.stringify(blackTheme))
            this.props.setTheme('dark')
            message.success('主题设置成功')
        }).catch((error: any): void => {
            message.error('主题设置失败', error)
        })
    }

    // 切换主题
    public toggleTheme = (): void => {
        console.log(this.props.theme)
        switch (this.props.theme) {
            case 'light':
                this.changeToDark()
                break
            case 'dark':
                this.changeTolight()
                break
            default:
                break
        }
    }

    // 所有点击事件
    public handleClick = (id: string): void => {
        console.log(id)
        switch (id) {
            case '1021110190101110000':
                this.toggleTheme()
                break
            case '1021110190101120000':
                this.props.history.push('/changeLayout')
                break
            default:
                break
        }
    }

    public render(): React.ReactElement {
        const menu = (
            <Menu>
                {
                    this.state.menusData.map((item: IMenu): React.ReactElement => {
                        if (item.children.length > 0) {
                            return (
                                <Menu.SubMenu
                                    key={item.id}
                                    title={<span>{item.name}</span>}
                                >
                                    {
                                        item.children.map((childItem: IMenu): React.ReactElement => (
                                            <Menu.Item key={childItem.id}>
                                                <span onClick={this.handleClick.bind(this, childItem.id)}>{childItem.name}</span>
                                            </Menu.Item>
                                        ))
                                    }
                                </Menu.SubMenu>
                            )
                        }
                        return (
                            <Menu.Item key={item.id}>
                                <span onClick={this.handleClick.bind(this, item.id)}>{item.name}</span>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        )
        return (
            <Dropdown overlay={menu} placement="bottomCenter">
                <Icon className={styles.icon} type="setting" />
            </Dropdown>
        )
    }
}

const mapStateToProps = (state: any): IMapStateToProps => ({
    theme: state.themeReducer.theme
})
const mapDispatchToProps = (dispatch: any): IMapDispatchToProps => ({
    setTheme: (theme: string): void => dispatch(setTheme(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderSet))