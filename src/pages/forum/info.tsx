import * as React from 'react'
import { Button, Input } from 'antd'

class Info extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {

        }
    }


    public render(): React.ReactElement {
        return (
            <div style={{ height: '600px', overflow: 'auto' }}>
                <div>《刷脸支付》</div>
                <div>
                    <div style={{ borderBottom: '1px solid #ccc' }}>
                        <p>如今，刷脸的出现，又给我们的生活带来了一些新的变化，一种更快捷便利的支付方式在我们的生活中占据一席之地。</p>
                        <p>在二维码支付快速发展时，有一个新名词叫做“扫码”，这也是今天一个简单的支付创新带来的商业产业革命。刷脸支付出现后的今天，也有一个新的词语叫做“刷脸”。</p>

                        <Button type="primary">回复</Button>
                    </div>
                    <div style={{ padding: '20px', borderBottom: '1px solid #ccc', height: '150px', overflow: 'hidden' }}>
                        <p>公司威武！</p>
                        <p style={{ textAlign: 'right' }}>员工甲 10:33</p>
                        <Button style={{ float: 'right' }} type="primary">回复</Button>
                    </div>
                    <div style={{ padding: '20px', borderBottom: '1px solid #ccc', height: '150px', overflow: 'hidden' }}>
                        <p>要放假啦！</p>
                        <p style={{ textAlign: 'right' }}>员工乙 10:35</p>
                        <Button style={{ float: 'right' }} type="primary">回复</Button>
                    </div>
                </div>
                <div>
                    <div style={{ margin: '20px' }}>发表回复</div>
                    <div style={{ margin: '20px' }}>
                        <Input.TextArea rows={8} />
                    </div>
                    <Button style={{ margin: '20px' }}>发表</Button>
                </div>
            </div>
        )
    }
}

export default Info