import * as React from 'react'
import { Typography, Divider, Radio, Checkbox } from 'antd'

class ExaminationPaper extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }

    public handleClick = (e: any): void => {
        if (e.key === '1') {
            this.props.history.push('train')
        } else {
            this.props.history.push('Examination')
        }
    }


    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <div style={{ height: '400px', overflow: 'auto' }}>
                    <Typography>
                        <Typography.Title>2019业务部基础知识考试</Typography.Title>
                        <Typography.Paragraph>
                            学习时长：90分钟                                     总分：100分
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            学习时间：2019.8.1-2019.8.31             参考人数共计：160人
                        </Typography.Paragraph>
                    </Typography>
                    <Divider />
                    <Typography>
                        <Typography.Title level={2}>一    判断题（10分）</Typography.Title>
                        <Typography.Paragraph>
                            1. 现金价值就是保单的实际价值？
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            <Radio.Group>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </Radio.Group>
                        </Typography.Paragraph>
                        <Typography.Title level={2}>二    单选题（40分）</Typography.Title>
                        <Typography.Paragraph>
                            1. 下面哪个是保险基本分类？
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            <Radio.Group>
                                <Radio value={1}>人生险</Radio>
                                <Radio value={2}>水险</Radio>
                                <Radio value={3}>人寿险</Radio>
                                <Radio value={4}>信用险</Radio>
                            </Radio.Group>
                        </Typography.Paragraph>
                        <Typography.Title level={2}>三    多选题（50分）</Typography.Title>
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Checkbox value="A">A.人生险</Checkbox>
                            <Checkbox value="B">B.财产险</Checkbox>
                            <Checkbox value="C">C.人寿险</Checkbox>
                            <Checkbox value="D">D.信用险</Checkbox>
                        </Checkbox.Group>
                    </Typography>
                </div>
            </React.Fragment>
        )
    }
}

export default ExaminationPaper