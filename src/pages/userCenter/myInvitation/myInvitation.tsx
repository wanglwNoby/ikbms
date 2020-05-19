import * as React from 'react'
import { Table } from 'antd'
/* import Info from './info' */

/* function onChange(pageNumber): void {
    console.log('Page: ', pageNumber)
} */

/* function callback(key): void {
    console.log(key)
} */

class Forum extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            /*  infovisible: false */
        }
    }

    /* public handleOk = (): void => {
        console.log(111)
        this.setState({
            infovisible: false
        })
        message.success('新增完成')
    }

    public showInfo = (): void => {
        console.log(111)
        this.setState({
            infovisible: true
        })
    } */

    public render(): React.ReactElement {
        const data = [
            {
                key: '1',
                trainingName: ' 今年发布的旗舰手机，哪部值得买？',
                department: '技术部',
                trainingTime: '2019.10.1'
            },
            {
                key: '2',
                trainingName: '今年还剩下两个月了',
                department: '技术部',
                trainingTime: '2019.10.2'
            },
            {
                key: '3',
                trainingName: '买新的电脑椅，求推荐',
                department: '技术部',
                trainingTime: '2019.10.3'
            },
            {
                key: '4',
                trainingName: ' 看了眼5G套餐价格',
                department: '技术部',
                trainingTime: '2019.10.3'
            },
            {
                key: '5',
                trainingName: ' 看了眼5G套餐价格',
                department: '技术部',
                trainingTime: '2019.10.4'
            },
            {
                key: '6',
                trainingName: ' 看了眼5G套餐价格',
                department: '技术部',
                trainingTime: '2019.10.6'
            }

        ]

        const columns = [
            {
                title: '帖子名称',
                dataIndex: 'trainingName',
                key: 'trainingName',
                render: (text: any): React.ReactElement => (
                    <span style={{ color: '#1890ff' }}>
                        {text}
                    </span>
                )
            },
            {
                title: '所属部门',
                key: 'department',
                dataIndex: 'department'
            },
            {
                title: '发表时间',
                dataIndex: 'trainingTime',
                key: 'trainingTime'
            }
        ]
        return (
            <div>

                <Table
                    dataSource={data}
                    columns={columns}
                />
                {/* <Tabs defaultActiveKey="1" onChange={callback}>
                        <Tabs.TabPane tab="我的帖子" key="1">
                            <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={10}>
                                        <h1>
                                            今年发布的旗舰手机，哪部值得买？
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        10：38
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={10}>
                                        <h1>
                                            今年还剩下两个月了
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        10：38
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={10}>
                                        <h1>
                                            买新的电脑椅，求推荐
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        10：38
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={10}>
                                        <h1>
                                            看了眼5G套餐价格，只要4G不限速我可以用到6G出来
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        10：38
                                    </Col>
                                </Row>
                            </div>
                        </Tabs.TabPane>
                    </Tabs> */}
            </div>
        )
    }
}

export default Forum