import * as React from 'react'
import { Radio, Divider, Row, Col, Card, Button, message } from 'antd'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import iphone11 from './iphone11.jpg'
import book from './book.jpg'
import bottle from './bottle.jpg'
import Converter from './Converter.jpg'
import headset from './headset.jpg'
import iphoneXR from './iphoneXR.jpg'

class Mall extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            trainVisible: false,
            bookVisible: false,
            bottleVisible: false,
            converterVisible: false,
            headsetVisible: false,
            iphoneXRVisible: false,
            isShow: false
        }
    }

    public render(): React.ReactElement {
        const data: any[] = [{
            name: '礼品分类', values: '全部', value: '笔记本', value1: '手机', value2: '键盘', value3: '鼠标'
        }, {
            name: '品牌', values: '全部', value: '苹果', value1: '联想', value2: '华硕', value3: '小米'
        }, {
            name: '积分范围', values: '0-1000', value1: '1001-2000', value2: '2001-3000', value3: '3001-4000'
        },
        {
            name: '支付方式', values: '不限', value1: '全积分', value2: '全积分', value3: '全积分'
        }]
        return (
            <div>
                <div style={{ border: '1px solid #ccc', padding: '10px', background: '#ffffff' }}>
                    {data.map((item: any): React.ReactElement => (
                        <React.Fragment key={item.name}>
                            <div style={{ marginTop: '20px' }}>
                                <span style={{ width: '100px', textAlign: 'right', marginRight: '30px', marginTop: '20px' }}>
                                    {item.name}
                                    :

                                    <Radio.Group>
                                        <Radio value={1} onClick={(): void => this.setState({ isShow: true })}>{item.values}</Radio>
                                        <Divider type="vertical" />
                                        <Radio value={2} onClick={(): void => this.setState({ isShow: false })}>{item.value1}</Radio>
                                        <Divider type="vertical" />
                                        <Radio value={3} onClick={(): void => this.setState({ isShow: true })}>{item.value2}</Radio>
                                        <Divider type="vertical" />
                                        <Radio value={4} onClick={(): void => this.setState({ isShow: false })}>{item.value3}</Radio>
                                    </Radio.Group>

                                </span>
                            </div>
                            <Divider dashed style={{ margin: 0 }} />
                        </React.Fragment>
                    ))}
                </div>
                <Row gutter={16} style={{ marginTop: '20px', display: this.state.isShow ? 'block' : 'none' }}>
                    <Col span={8}>
                        <Card title="笔记本" bordered={false} onClick={(): void => this.setState({ bookVisible: true })}>
                            {/*  <Icon style={{ fontSize: '150px', marginLeft: '100px' }} type="apple" /> */}
                            <img
                                style={{ width: '180px', marginLeft: '90px' }}
                                alt="logo"
                                src={book}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>999积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>32个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="水杯" bordered={false} onClick={(): void => this.setState({ bottleVisible: true })}>
                            <img
                                style={{ width: '120px', marginLeft: '120px' }}
                                alt="logo"
                                src={bottle}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>1099积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>72个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="iphone11" bordered={false} onClick={(): void => this.setState({ trainVisible: true })}>
                            <img
                                style={{ width: '100px', marginLeft: '150px' }}
                                alt="logo"
                                src={iphone11}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>299900积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>105个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={8}>
                        <Card title="转换器" bordered={false} onClick={(): void => this.setState({ converterVisible: true })}>
                            {/*  <Icon style={{ fontSize: '150px', marginLeft: '100px' }} type="apple" /> */}
                            <img
                                style={{ width: '120px', marginLeft: '90px' }}
                                alt="logo"
                                src={Converter}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>1599积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>32个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="耳机" bordered={false} onClick={(): void => this.setState({ headsetVisible: true })}>
                            <img
                                style={{ width: '120px', marginLeft: '120px' }}
                                alt="logo"
                                src={headset}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>8999积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>72个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="iphoneXR" bordered={false} onClick={(): void => this.setState({ iphoneXRVisible: true })}>
                            <img
                                style={{ width: '100px', marginLeft: '150px' }}
                                alt="logo"
                                src={iphoneXR}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>289900积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>105个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={8}>
                        <Card title="转换器" bordered={false} onClick={(): void => this.setState({ converterVisible: true })}>
                            {/*  <Icon style={{ fontSize: '150px', marginLeft: '100px' }} type="apple" /> */}
                            <img
                                style={{ width: '120px', marginLeft: '90px' }}
                                alt="logo"
                                src={Converter}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>1599积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>32个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="耳机" bordered={false} onClick={(): void => this.setState({ headsetVisible: true })}>
                            <img
                                style={{ width: '120px', marginLeft: '120px' }}
                                alt="logo"
                                src={headset}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>8999积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>72个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="iphoneXR" bordered={false} onClick={(): void => this.setState({ iphoneXRVisible: true })}>
                            <img
                                style={{ width: '100px', marginLeft: '150px' }}
                                alt="logo"
                                src={iphoneXR}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>289900积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>105个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '20px', display: this.state.isShow ? 'block' : 'none' }}>
                    <Col span={8}>
                        <Card title="转换器" bordered={false} onClick={(): void => this.setState({ converterVisible: true })}>
                            {/*  <Icon style={{ fontSize: '150px', marginLeft: '100px' }} type="apple" /> */}
                            <img
                                style={{ width: '120px', marginLeft: '90px' }}
                                alt="logo"
                                src={Converter}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>1599积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>32个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="转换器" bordered={false} onClick={(): void => this.setState({ converterVisible: true })}>
                            {/*  <Icon style={{ fontSize: '150px', marginLeft: '100px' }} type="apple" /> */}
                            <img
                                style={{ width: '120px', marginLeft: '90px' }}
                                alt="logo"
                                src={Converter}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>1599积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>32个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="iphoneXR" bordered={false} onClick={(): void => this.setState({ iphoneXRVisible: true })}>
                            <img
                                style={{ width: '100px', marginLeft: '150px' }}
                                alt="logo"
                                src={iphoneXR}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>289900积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>105个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={8}>
                        <Card title="转换器" bordered={false} onClick={(): void => this.setState({ converterVisible: true })}>
                            {/*  <Icon style={{ fontSize: '150px', marginLeft: '100px' }} type="apple" /> */}
                            <img
                                style={{ width: '120px', marginLeft: '90px' }}
                                alt="logo"
                                src={Converter}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>1599积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>32个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="转换器" bordered={false} onClick={(): void => this.setState({ converterVisible: true })}>
                            {/*  <Icon style={{ fontSize: '150px', marginLeft: '100px' }} type="apple" /> */}
                            <img
                                style={{ width: '120px', marginLeft: '90px' }}
                                alt="logo"
                                src={Converter}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>1599积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>32个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="转换器" bordered={false} onClick={(): void => this.setState({ converterVisible: true })}>
                            {/*  <Icon style={{ fontSize: '150px', marginLeft: '100px' }} type="apple" /> */}
                            <img
                                style={{ width: '120px', marginLeft: '90px' }}
                                alt="logo"
                                src={Converter}
                            />
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={4}>积分：</Col>
                                <Col span={8} style={{ color: '#e40077' }}>1599积分</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Col span={8} style={{ color: '#999999', marginRight: '50px' }}>32个评价</Col>
                                <Col span={8} style={{ color: '#e40077' }}>100%好评</Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginLeft: '150px' }} onClick={(): void => { message.success('兑换成功') }}>兑换</Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <DraggableModal
                    visible={this.state.trainVisible}
                    title="兑换商品"
                    onOk={(): void => {
                        this.setState({
                            trainVisible: false
                        })
                        message.success('兑换成功')
                    }}
                    width={600}
                    onCancel={(): void => this.setState({ trainVisible: false })}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <img
                                style={{ width: '300px', marginLeft: '150px' }}
                                alt="logo"
                                src={iphone11}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: '20px' }}>
                        <Col span={4}>选择颜色：</Col>
                        <Col span={18}>
                            <Radio.Group name="radiogroup" defaultValue={1}>
                                <Radio value={1}>金色</Radio>
                                <Radio value={2}>银色</Radio>
                                <Radio value={3}>深灰色</Radio>
                                <Radio value={4}>暗夜绿色</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: '20px' }}>
                        <Col span={4}>选择配置：</Col>
                        <Col span={12}>
                            <Radio.Group name="radiogroup" defaultValue={1}>
                                <Radio value={1}>64</Radio>
                                <Radio value={2}>256</Radio>
                                <Radio value={3}>512</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                </DraggableModal>
                <DraggableModal
                    visible={this.state.bookVisible}
                    title="兑换商品"
                    onOk={(): void => {
                        this.setState({
                            bookVisible: false
                        })
                        message.success('兑换成功')
                    }}
                    width={600}
                    onCancel={(): void => this.setState({ bookVisible: false })}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <img
                                style={{ width: '300px', marginLeft: '150px' }}
                                alt="logo"
                                src={book}
                            />
                        </Col>
                    </Row>
                </DraggableModal>
                <DraggableModal
                    visible={this.state.bottleVisible}
                    title="兑换商品"
                    onOk={(): void => {
                        this.setState({
                            bottleVisible: false
                        })
                        message.success('兑换成功')
                    }}
                    width={600}
                    onCancel={(): void => this.setState({ bottleVisible: false })}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <img
                                style={{ width: '300px', marginLeft: '150px' }}
                                alt="logo"
                                src={bottle}
                            />
                        </Col>
                    </Row>
                </DraggableModal>
                <DraggableModal
                    visible={this.state.converterVisible}
                    title="兑换商品"
                    onOk={(): void => {
                        this.setState({
                            converterVisible: false
                        })
                        message.success('兑换成功')
                    }}
                    width={600}
                    onCancel={(): void => this.setState({ converterVisible: false })}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <img
                                style={{ width: '300px', marginLeft: '150px' }}
                                alt="logo"
                                src={Converter}
                            />
                        </Col>
                    </Row>
                </DraggableModal>
                <DraggableModal
                    visible={this.state.headsetVisible}
                    title="兑换商品"
                    onOk={(): void => {
                        this.setState({
                            headsetVisible: false
                        })
                        message.success('兑换成功')
                    }}
                    width={600}
                    onCancel={(): void => this.setState({ headsetVisible: false })}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <img
                                style={{ width: '300px', marginLeft: '150px' }}
                                alt="logo"
                                src={headset}
                            />
                        </Col>
                    </Row>
                </DraggableModal>
                <DraggableModal
                    visible={this.state.iphoneXRVisible}
                    title="兑换商品"
                    onOk={(): void => {
                        this.setState({
                            iphoneXRVisible: false
                        })
                        message.success('兑换成功')
                    }}
                    width={600}
                    onCancel={(): void => this.setState({ iphoneXRVisible: false })}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <img
                                style={{ width: '300px', marginLeft: '150px' }}
                                alt="logo"
                                src={iphoneXR}
                            />
                        </Col>
                    </Row>
                </DraggableModal>
            </div>
        )
    }
}

export default Mall