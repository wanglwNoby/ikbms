import * as React from 'react'
import { Menu } from 'antd'
import Subject from './subject'
import TestPaper from './testPaper'
import MyTraining from './myExamination'
import Examination from './examination'

class Exam extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            type: 1
        }
    }

    public handleClick = (e): void => {
        console.log('click ', e)
    }

    public showSubject = (): void => {
        this.setState({
            type: 1
        })
    }

    public showTestPaper = (): void => {
        this.setState({
            type: 2
        })
    }

    public showTrain = (): void => {
        this.setState({
            type: 3
        })
    }

    public showExamination = (): void => {
        this.setState({
            type: 4
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
                        <Menu.Item onClick={(): void => { this.showTrain() }} key="7">我的考试</Menu.Item>
                        <Menu.Item onClick={(): void => { this.showSubject() }} key="5">试题管理</Menu.Item>
                        <Menu.Item onClick={(): void => { this.showTestPaper() }} key="6">试卷管理</Menu.Item>
                        <Menu.Item onClick={(): void => { this.showExamination() }} key="8">考试管理</Menu.Item>
                    </Menu>
                </div>
                <div style={{ marginLeft: '20px', width: '100%' }}>
                    {this.state.type === 1 ? <Subject /> : null}
                    {this.state.type === 2 ? <TestPaper /> : null}
                    {this.state.type === 3 ? <MyTraining /> : null}
                    {this.state.type === 4 ? <Examination /> : null}
                </div>
            </div>
        )
    }
}

export default Exam