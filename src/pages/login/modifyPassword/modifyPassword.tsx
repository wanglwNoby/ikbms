import * as React from 'react'
import { Row, Col, Input } from 'antd'
import styles from './modifyPassword.module.less'

interface IProps {
    setModifyPasswordState: (state: IState) => void;
    warningMsg: string;
}
interface IState {
    newPasswordOnce: string;
    newPasswordTwice: string;
    [key: string]: string;
}

class ModifyPassword extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            newPasswordOnce: '',
            newPasswordTwice: ''
        }
    }

    public inputChange = (key: string, e: any): void => {
        this.setState({
            [key]: e.target.value
        }, (): void => { this.props.setModifyPasswordState(this.state) })
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <p className={styles.warning}>{this.props.warningMsg}</p>
                <Row className={styles.row}>
                    <Col span={8}>新密码：</Col>
                    <Col span={16}>
                        <Input.Password placeholder="请输入新密码" onChange={this.inputChange.bind(this, 'newPasswordOnce')} />
                    </Col>
                </Row>
                <Row className={styles.row}>
                    <Col span={8}>确认密码：</Col>
                    <Col span={16}><Input.Password placeholder="再次输入新密码" onChange={this.inputChange.bind(this, 'newPasswordTwice')} /></Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ModifyPassword