import * as React from 'react'
import { Col, Row, Button } from 'antd'

class MyReply extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            /*  infovisible: false */
        }
    }

    /*  public handleOk = (): void => {
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
        return (
            <div>
                <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                    <Row>
                        <Col span={6} style={{ color: '#1890ff' }}>
                            帖子名称： 放假通知
                        </Col>
                        <Col style={{ textAlign: 'right', color: '#ec1e1e' }} span={4}>
                            帖子时间： 2019-11-1
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={10}>
                            张三回复我：放假一起打球呀！
                        </Col>
                        <Col style={{ textAlign: 'right' }} span={12}>
                            19:33
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            我的发言： 放假组织活动呀！
                        </Col>
                    </Row>
                    <Button type="primary">回复</Button>
                </div>
                <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                    <Row>
                        <Col span={6} style={{ color: '#1890ff' }}>
                            帖子名称： 科技的发展
                        </Col>
                        <Col style={{ textAlign: 'right', color: '#ec1e1e' }} span={4}>
                            帖子时间： 2019-11-1
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={10}>
                            李四回复我：科技改变生活
                        </Col>
                        <Col style={{ textAlign: 'right' }} span={12}>
                            10:15
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            我的发言： 科技强大呀
                        </Col>
                    </Row>
                    <Button type="primary">回复</Button>
                </div>
                <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                    <Row>
                        <Col span={6} style={{ color: '#1890ff' }}>
                            帖子名称： 机器算法
                        </Col>
                        <Col style={{ textAlign: 'right', color: '#ec1e1e' }} span={4}>
                            帖子时间： 2019-11-1
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={10}>
                            lity回复我：楼主威武
                        </Col>
                        <Col style={{ textAlign: 'right' }} span={12}>
                            21:08
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            我的发言： 帮你解决问题了
                        </Col>
                    </Row>
                    <Button type="primary">回复</Button>
                </div>
                <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                    <Row>
                        <Col span={6} style={{ color: '#1890ff' }}>
                            帖子名称： 放假通知
                        </Col>
                        <Col style={{ textAlign: 'right', color: '#ec1e1e' }} span={4}>
                            帖子时间： 2019-11-1
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={10}>
                            ben回复我：放假一起打球呀！
                        </Col>
                        <Col style={{ textAlign: 'right' }} span={12}>
                            10:33
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            我的发言： 放假组织活动呀！
                        </Col>
                    </Row>
                    <Button type="primary">回复</Button>
                </div>
            </div>
        )
    }
}

export default MyReply