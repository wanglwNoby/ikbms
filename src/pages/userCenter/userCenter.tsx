import * as React from 'react'
import { Menu, Icon } from 'antd'
import UserKnowledge from './userKnowledge/userKnowledge'
import MyBrowse from './myBrowse/myBrowse'
import MyDownload from './myDownload/myDownload'
import MyCollection from './myCollection/myCollection'
import MySearch from './mySearch/mySearch'
import MyShare from './myShare/myShare'
import MyTraining from './myTrain/myTrain'
import MyExamination from './myExamination/myExamination'
import MyReply from './myReply/myReply'
import MyInvitation from './myInvitation/myInvitation'
import MyLink from './myLink/myLink'


class UserCenter extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            type: 1
        }
    }

    public handleClick = (e): void => {
        console.log('click ', e)
    }

    public showUserKnowledge = (): void => {
        this.setState({
            type: 1
        })
    }

    public showSearcht = (): void => {
        this.setState({
            type: 2
        })
    }

    public showBrowse = (): void => {
        this.setState({
            type: 3
        })
    }

    public showDownload = (): void => {
        this.setState({
            type: 4
        })
    }

    public showCollection = (): void => {
        this.setState({
            type: 5
        })
    }

    public showShare = (): void => {
        this.setState({
            type: 6
        })
    }

    public showTraining = (): void => {
        this.setState({
            type: 7
        })
    }

    public showTraining1 = (): void => {
        this.setState({
            type: 8
        })
    }

    public showInvitation = (): void => {
        this.setState({
            type: 9
        })
    }

    public showReply = (): void => {
        this.setState({
            type: 10
        })
    }

    public showLink = (): void => {
        this.setState({
            type: 11
        })
    }

    public render(): React.ReactElement {
        return (
            <div style={{ overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '256px' }}>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <Menu.SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>导航</span>
                                </span>
                            }
                        >
                            <Menu.Item onClick={(): void => { this.showUserKnowledge() }} key="4">个人知识库</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showSearcht() }} key="5">我的搜索</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showBrowse() }} key="6">我的浏览</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showDownload() }} key="7">我的下载</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showCollection() }} key="8">我的收藏</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showShare() }} key="9">我的分享</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showTraining() }} key="10">我的学习</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showTraining1() }} key="11">我的考试</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showLink() }} key="14">常用链接</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="sub3"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>我的帖子</span>
                                </span>
                            }
                        >
                            <Menu.Item onClick={(): void => { this.showInvitation() }} key="12">我发表的帖子</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showReply() }} key="13">我回复的帖子</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <div style={{ marginLeft: '20px', width: '100%' }}>
                    {this.state.type === 1 ? <UserKnowledge /> : null}
                    {this.state.type === 2 ? <MySearch /> : null}
                    {this.state.type === 3 ? <MyBrowse /> : null}
                    {this.state.type === 4 ? <MyDownload /> : null}
                    {this.state.type === 5 ? <MyCollection /> : null}
                    {this.state.type === 6 ? <MyShare /> : null}
                    {this.state.type === 7 ? <MyTraining /> : null}
                    {this.state.type === 8 ? <MyExamination /> : null}
                    {this.state.type === 9 ? <MyInvitation /> : null}
                    {this.state.type === 10 ? <MyReply /> : null}
                    {this.state.type === 11 ? <MyLink /> : null}
                </div>
            </div>
        )
    }
}

export default UserCenter