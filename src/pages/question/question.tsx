import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Form, Select, Button, message } from 'antd'
import BraftEditor from 'braft-editor'
import { _createQuestion } from '../../common/api/question'
import styles from './question.module.less'
import 'braft-editor/dist/index.css'

class QuestionPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            contentEditorState: BraftEditor.createEditorState(null)
        }
    }


    public handleSubmit = (e: any): void => {
        e.preventDefault()
        this.props.form.validateFields((err: any, value: any): void => {
            if (!err) {
                const summary = `<Kdg-Summary>${this.state.contentEditorState.toHTML()}</Kdg-Summary>`
                const data = {
                    title: value.title,
                    source: 10,
                    level: value.level,
                    content: summary
                }
                this.saveProblem(data)
            }
        })
    }

    public saveProblem = async (data: ICreateQuestion): Promise<void> => {
        const res: any = await _createQuestion(data)
        if (res && res.result) {
            message.success('创建成功')
            this.props.form.resetFields()
            this.setState({
                contentEditorState: BraftEditor.createEditorState(null)
            })
        } else {
            message.error('创建失败')
        }
    }


    public handleContentEditorChange = (editorState: any): void => {
        this.setState({ contentEditorState: editorState })
    }

    public render(): React.ReactElement {
        const { getFieldDecorator } = this.props.form
        return (
            <div className={styles.questionContainer}>
                <Form onSubmit={this.handleSubmit} className={styles.questionForm}>
                    <Form.Item label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题!' }]
                        })(
                            <Input placeholder="一句话表述你的问题" />
                        )}
                    </Form.Item>
                    <Form.Item label="回答对象">
                        {getFieldDecorator('level', {
                            rules: [{ required: true, message: '请选择回答对象' }]
                        })(
                            <Select
                                placeholder="请选择回答对象"
                            >
                                <Select.Option value="1">所有人</Select.Option>
                                <Select.Option value="2">技术专家组</Select.Option>
                                <Select.Option value="3">研发专家组</Select.Option>
                                <Select.Option value="4">运维专家组</Select.Option>
                                <Select.Option value="5">机器人专家组</Select.Option>
                                <Select.Option value="9">自动派工--按产品</Select.Option>
                                <Select.Option value="10">自动派工--按部门</Select.Option>
                                <Select.Option value="11">自动派工--按区域</Select.Option>
                                <Select.Option value="12">个人:胡珍珍</Select.Option>
                                <Select.Option value="13">个人:雷怡君</Select.Option>
                                <Select.Option value="14">个人:茅瑾瑜</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="等级">
                        {getFieldDecorator('level', {
                            rules: [{ required: true, message: '请选择安全等级' }]
                        })(
                            <Select
                                placeholder="请选择等级"
                            >
                                <Select.Option value="1">一般</Select.Option>
                                <Select.Option value="2">重要</Select.Option>
                                <Select.Option value="3">非常重要</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="问题描述">
                        <BraftEditor
                            className={styles.editorContainer}
                            placeholder="请详细说明问题，点击后输入"
                            value={this.state.contentEditorState}
                            onChange={this.handleContentEditorChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button className={styles.btnContainer} size="large" type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const Question = Form.create()(withRouter(QuestionPage))

export default Question