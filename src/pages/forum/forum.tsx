import * as React from 'react'
import { Input, Badge, Row, Col, Tag, Button, Pagination, message, Tabs } from 'antd'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import Info from './info'

function onChange(pageNumber): void {
    console.log('Page: ', pageNumber)
}
function callback(key): void {
    console.log(key)
}
class Forum extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            infovisible: false
        }
    }

    public handleOk = (): void => {
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
    }

    public render(): React.ReactElement {
        return (
            <div>
                <div style={{ width: '700px', margin: 'auto' }}>
                    <Input.Search
                        placeholder="搜索"
                        enterButton="查询"
                        size="large"
                        onSearch={(value): void => console.log(value)}
                    />
                </div>
                <div style={{ width: '1200px', margin: 'auto', background: 'white', padding: '20px', marginTop: '20px' }}>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <Tabs.TabPane tab="看帖" key="1">
                            <div onClick={(): void => { this.showInfo() }} style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={2}>
                                        <Badge count={100} />
                                    </Col>
                                    <Col span={10}>
                                        <h1>
                                            <Tag color="#108ee9">置顶</Tag>
                                            刷脸支付有哪些优势呢
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        财务部-张三
                                        10：38
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    随着互联网不断升级，我们也处在智能支付的时代，现在不仅仅是二维码支付，刷脸支付也已经开始慢慢的普及。
                                    </Col>
                                </Row>
                            </div>
                            <div onClick={(): void => { this.showInfo() }} style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={2}>
                                        <Badge count={10} />
                                    </Col>
                                    <Col span={10}>
                                        <h1>
                                            <Tag color="#108ee9">置顶</Tag>
                                            什么时候出现真正的人工智能
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        admin
                                        10：38
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    为什么现在还没人搞出真正的人工智能 再过50年能搞出吗？ 搞出和人一样，或者超。。。。。
                                    </Col>
                                </Row>
                            </div>
                            <div onClick={(): void => { this.showInfo() }} style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={2}>
                                        <Badge count={35} />
                                    </Col>
                                    <Col span={10}>
                                        <h1>
                                            福利发放
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        record
                                        10：38
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        中秋节，又称祭月节、月光诞、月夕、秋节、仲秋节、拜月节、月娘节、月亮节、团圆节等......
                                    </Col>
                                </Row>
                            </div>
                            <div onClick={(): void => { this.showInfo() }} style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={2}>
                                        <Badge count={56} />
                                    </Col>
                                    <Col span={10}>
                                        <h1>
                                        问:就目前为止.....
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        财务部-张三
                                        10：38
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    问:就目前为止，科技进步速度是否变慢，还是无法再继续突破。
                                    </Col>
                                </Row>
                            </div>
                            <div onClick={(): void => { this.showInfo() }} style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={2}>
                                        <Badge count={78} />
                                    </Col>
                                    <Col span={10}>
                                        <h1>
                                            人脑网络记忆工作原理与计算机存储（记忆）工作原理
                                        </h1>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        财务部-张三
                                        10：38
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    最大区别在哪，有大神大佬专业人士解释一下吗？小白不懂......
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ margin: '20px', overflow: 'hidden' }}>
                                <Pagination style={{ float: 'right' }} showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
                            </div>
                            <div style={{ margin: '20px' }}>
                                发表新帖
                                <div style={{ margin: '20px' }}>
                                    <Input placeholder="填写标题" />
                                </div>
                                <div style={{ margin: '20px' }}>
                                    <Input.TextArea rows={8} placeholder="填写内容" />
                                </div>
                                <Button onClick={(): void => { message.success('发表成功') }} type="primary">发表</Button>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="我的回复" key="2">
                            <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={10}>
                                        张三回复我：放假一起打球呀！
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
                            <div style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
                                <Row>
                                    <Col span={10}>
                                        李四回复我：科技改变生活
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        10:33
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
                                    <Col span={10}>
                                        lity回复我：楼主威武
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} span={12}>
                                        10:33
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
                            <div>
                                <div style={{ margin: '20px' }}>发表回复</div>
                                <div style={{ margin: '20px' }}>
                                    <Input.TextArea rows={8} />
                                </div>
                                <Button style={{ margin: '20px' }}>发表</Button>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="我的帖子" key="3">
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
                    </Tabs>
                </div>
                <DraggableModal
                    visible={this.state.infovisible}
                    title="帖子详情"
                    onOk={this.handleOk}
                    width={1200}
                    onCancel={(): void => this.setState({ infovisible: false })}
                >
                    <Info />
                </DraggableModal>
            </div>
        )
    }
}

export default Forum