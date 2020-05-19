import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Popover, Avatar, Card, Icon, message } from 'antd'
import DraggableModal from '../../cores/draggableModal/draggableModal'
import ModifyPassword from './modifyPassword/modifyPassword'
import { _changePassword } from '../../../common/api/global'
import styles from './headerUser.module.less'

interface IState {
    visible: boolean;
    modifyPasswordState: {
        oldPassword: string;
        newPasswordOnce: string;
        newPasswordTwice: string;
    };
    user: string;
}

class HeaderUser extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            visible: false,
            modifyPasswordState: {
                oldPassword: '',
                newPasswordOnce: '',
                newPasswordTwice: ''
            },
            user: ''
        }
    }

    public componentDidMount(): void {
        const userInfomation = JSON.parse(window.sessionStorage.getItem('ikbms'))
        this.setState({
            user: userInfomation.full_name
        })
    }

    public logout = (): void => {
        window.sessionStorage.removeItem('ikbms')
        this.props.history.push('/login')
    }

    // 获取修改的密码
    public setModifyPasswordState = (state: any): void => {
        this.setState({
            modifyPasswordState: state
        })
    }

    public handleOk = (): void => {
        console.log(this.state.modifyPasswordState)
        if (this.state.modifyPasswordState.oldPassword.replace(/^\s+|\s+$/g, '') === '') {
            message.error('请输入旧密码')
            return
        }
        if (this.state.modifyPasswordState.newPasswordOnce.replace(/^\s+|\s+$/g, '') === '') {
            message.error('请输入新密码')
            return
        }
        if (this.state.modifyPasswordState.newPasswordOnce !== this.state.modifyPasswordState.newPasswordTwice) {
            message.error('新密码输入不一致，请重新输入')
        } else {
            this.changePassword()
        }
    }

    // 修改密码
    public changePassword = async (): Promise<void> => {
        const res: any = await _changePassword({
            type: 'not',
            oldpassword: window.btoa(this.state.modifyPasswordState.oldPassword),
            newpassword: window.btoa(this.state.modifyPasswordState.newPasswordOnce)
        })
        this.setState({
            visible: false
        })
        if (res && res.result) {
            message.success('密码修改成功，请重新登录')
            window.sessionStorage.removeItem('ikbms')
            this.props.history.push('/login')
        } else {
            message.error(res.msg)
        }
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <Popover
                    trigger="hover"
                    overlayClassName={styles.popover}
                    placement="bottomLeft"
                    arrowPointAtCenter
                    content={
                        <React.Fragment>
                            <Card
                                style={{ width: 300 }}
                                bordered={false}
                                actions={[
                                    <Icon type="logout" title="退出登录" onClick={this.logout} />,
                                    <Icon type="edit" title="修改密码" onClick={(): void => this.setState({ visible: true })} />,
                                    <Icon type="user-add" title="个人中心" onClick={(): void => this.props.history.push('/userCenter')} />
                                ]}
                            >
                                <Card.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={`欢迎您：${this.state.user}`}
                                    description={
                                        <React.Fragment>
                                            <div>所属部门: 管理部</div>
                                            <div>我的积分: 1050</div>
                                            <div>我的排名: 12</div>
                                        </React.Fragment>
                                    }
                                />
                            </Card>
                        </React.Fragment>
                    }
                >
                    <Avatar className={styles.avatar} icon="user" size="small" />
                </Popover>
                <DraggableModal
                    visible={this.state.visible}
                    title="账户密码修改"
                    width={600}
                    onOk={this.handleOk}
                    onCancel={(): void => this.setState({ visible: false })}
                >
                    <ModifyPassword setModifyPasswordState={this.setModifyPasswordState} />
                </DraggableModal>
            </React.Fragment>
        )
    }
}

export default withRouter(HeaderUser)