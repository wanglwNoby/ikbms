import * as React from 'react'
import { Menu } from 'antd'
import MyTraining from './myTraining'
import TrainManage from './myTrain'


class Train extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            type: 1
        }
    }

    public handleClick = (e): void => {
        console.log('click ', e)
    }

    public showTrain = (): void => {
        this.setState({
            type: 1
        })
    }

    public showExamination = (): void => {
        this.setState({
            type: 2
        })
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <div style={{ overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '256px' }}>
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <Menu.Item onClick={(): void => { this.showTrain() }} key="5">我的培训</Menu.Item>
                            <Menu.Item onClick={(): void => { this.showExamination() }} key="6">培训管理</Menu.Item>
                        </Menu>
                    </div>
                    <div style={{ marginLeft: '20px', width: '100%' }}>
                        {this.state.type === 1 ? <MyTraining /> : null}
                        {this.state.type === 2 ? <TrainManage /> : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Train