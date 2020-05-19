import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, message, Modal } from 'antd'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import ModifyPassword from './modifyPassword/modifyPassword'
import styles from './login.module.less'
import { _login, _changePassword } from '../../common/api/global'

interface IModifyPasswordState {
    newPasswordOnce: string;
    newPasswordTwice: string;
}

interface IState {
    modifyPasswordState: IModifyPasswordState;
    oldPassword: string;
    visible: boolean;
    confirmLoading: boolean;
    warningMsg: string;
}

class LoginPage extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            modifyPasswordState: {
                newPasswordOnce: '',
                newPasswordTwice: ''
            },
            oldPassword: '',
            visible: false,
            confirmLoading: false,
            warningMsg: ''
        }
    }

    // 登录提交
    public handleSubmit = (e: any): void => {
        e.preventDefault()
        this.props.form.validateFields((err: any, values: any): void => {
            if (!err) {
                const pwdBase64 = window.btoa(values.password)
                this.setState({
                    oldPassword: pwdBase64
                })
                const data = {
                    account: values.username,
                    password: pwdBase64
                }
                this.login(data)
            }
        })
    }

    public login = async (data: ILogin): Promise<void> => {
        const res: any = await _login(data)
        if (res && res.result) {
            window.sessionStorage.setItem('ikbms', JSON.stringify(res.data))
            if (res.code === 1014 || res.code === 1015) {
                this.setState({ visible: true, warningMsg: res.msg })
            } else if (res.code === 1016) {
                console.log(res.code)
                Modal.confirm({
                    title: '请确认登录?',
                    content: res.msg,
                    onOk: (): void => this.setState({ visible: true, warningMsg: res.msg }),
                    onCancel: (): void => this.props.history.push('/')
                })
            } else {
                this.props.history.push('/')
            }
        } else {
            message.error('用户不存在或密码错误')
        }
    }

    public setModifyPasswordState = (state: IModifyPasswordState): void => {
        this.setState({
            modifyPasswordState: state
        })
    }

    // 修改密码点击确定按钮
    public handleOk = (): void => {
        console.log(this.state.modifyPasswordState)
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

    public changePassword = async (): Promise<void> => {
        this.setState({
            confirmLoading: true
        })
        const res: any = await _changePassword({
            type: 'login',
            oldpassword: this.state.oldPassword,
            newpassword: window.btoa(this.state.modifyPasswordState.newPasswordOnce)
        })
        this.setState({
            confirmLoading: false,
            visible: false
        })
        if (res && res.result) {
            message.success('密码修改成功')
            this.props.history.push('/')
        } else {
            window.sessionStorage.removeItem('ikbms')
            message.error('密码修改失败')
        }
    }

    public handleCancel = (): void => {
        window.sessionStorage.removeItem('ikbms')
        this.setState({
            visible: false
        })
    }

    public render(): React.ReactElement {
        const { getFieldDecorator } = this.props.form
        return (
            <div className={styles.loginContainer}>
                <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <DraggableModal
                    visible={this.state.visible}
                    title="账户密码修改"
                    width={600}
                    confirmLoading={this.state.confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <ModifyPassword setModifyPasswordState={this.setModifyPasswordState} warningMsg={this.state.warningMsg} />
                </DraggableModal>
            </div>

        )
    }
}

const Login = Form.create()(withRouter(LoginPage))

export default Login