import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, TreeSelect, message } from 'antd'
import KdgManagePageHeader from '../../../components/containers/kdgPageHeader/kdgPageHeader'
import { _getCatalogTree, _getClassifyTree } from '../../../common/api/global'
import { _analysisTags, _createNotice } from '../../../common/api/announcement'
import formatTreeData from '../../../utils/treeUtil'

interface IState {
    catalogTreeData: ITreeData[]; // 目录树
    classifyTreeData: ITreeData[]; // 分类树
    isValidate: boolean;
    title: string; // 标题
    tags: string; // 标签
    catalogID: string; // 目录
    classifyID: string; // 分类
    content: string; // 内容
    [key: string]: any;
}

class AnnouncementCreate extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            catalogTreeData: [],
            classifyTreeData: [],
            isValidate: false,
            title: '',
            tags: '',
            catalogID: '',
            classifyID: undefined,
            content: ''
        }
    }

    public componentDidMount(): void {
        this.getCatalogTree()
        this.getClassifyTree()
    }

    public getCatalogTree = async (): Promise<void> => {
        const res: any = await _getCatalogTree()
        if (res && res.result) {
            this.setState({
                catalogTreeData: formatTreeData(res.data)
            })
        }
    }

    public getClassifyTree = async (): Promise<void> => {
        const res: any = await _getClassifyTree()
        if (res && res.result) {
            this.setState({
                classifyTreeData: formatTreeData(res.data)
            })
        }
    }

    public handleInputChange = (key: string, e: any): void => {
        this.setState({
            [key]: e.target.value
        })
    }

    public treeSelectChange = (value: string, key: string): void => {
        this.setState({
            [key]: value
        })
    }

    // 自动生成标签
    public autoCreateTags = (): void => {
        this.setState({
            isValidate: true
        })
        if (this.state.title.replace(/^\s+|\s+$/g, '') === '' || this.state.content.replace(/^\s+|\s+$/g, '') === '') {
            return
        }
        this.analysisTags()
    }

    public analysisTags = async (): Promise<void> => {
        const res: any = await _analysisTags({
            title: this.state.title,
            content: this.state.content
        })
        if (res && res.result) {
            if (res.data === '') {
                message.warning('标签生成失败，请手动填写')
            } else {
                message.success('标签生成成功')
                this.setState({
                    tags: res.data
                })
            }
        }
    }

    public handleSubmit = (): void => {
        this.setState({
            isValidate: true
        })
        if (this.state.title.replace(/^\s+|\s+$/g, '') === '' || this.state.content.replace(/^\s+|\s+$/g, '') === '' || this.state.tags.replace(/^\s+|\s+$/g, '') === '' || this.state.catalogID === '') {
            return
        }
        this.createNotice()
    }

    public createNotice = async (): Promise<void> => {
        const res: any = await _createNotice({
            title: this.state.title,
            tags: this.state.tags,
            class_id: this.state.catalogID,
            business_id: this.state.classifyID.toString(),
            content: this.state.content
        })
        if (res && res.result) {
            message.success('创建成功')
            this.setState({
                isValidate: false,
                title: '',
                tags: '',
                catalogID: '',
                classifyID: undefined,
                content: ''
            })
        }
    }

    public render(): React.ReactElement {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 }
            }
        }
        return (
            <React.Fragment>
                <KdgManagePageHeader
                    handleSubmit={this.handleSubmit}
                    handleBack={(): void => this.props.history.push('/announcement')}
                />
                <Form {...formItemLayout}>
                    <Form.Item
                        label="标题"
                        validateStatus={this.state.isValidate && this.state.title.replace(/^\s+|\s+$/g, '') === '' ? 'error' : ''}
                        help={this.state.isValidate && this.state.title.replace(/^\s+|\s+$/g, '') === '' && '标题不能为空，请输入标题'}
                    >
                        <Input placeholder="请输入标题" value={this.state.title} onChange={this.handleInputChange.bind(this, 'title')} />
                    </Form.Item>
                    <Form.Item
                        label="标签"
                        validateStatus={this.state.isValidate && this.state.tags.replace(/^\s+|\s+$/g, '') === '' ? 'error' : ''}
                        help={this.state.isValidate && this.state.tags.replace(/^\s+|\s+$/g, '') === '' && '标签不能为空，请输入标签'}
                    >
                        <Input.Search placeholder="手动输入标签或自动生成" enterButton="生成" value={this.state.tags} onChange={this.handleInputChange.bind(this, 'tags')} onSearch={this.autoCreateTags} />
                    </Form.Item>
                    <Form.Item
                        label="知识目录"
                        validateStatus={this.state.isValidate && this.state.catalogID === '' ? 'error' : ''}
                        help={this.state.isValidate && this.state.catalogID === '' && '知识目录不能为空，请选择知识目录'}
                    >
                        <TreeSelect
                            value={this.state.catalogID}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={this.state.catalogTreeData}
                            placeholder="请选择目录"
                            treeDefaultExpandAll
                            onChange={(value: string): void => this.treeSelectChange(value, 'catalogID')}
                        />
                    </Form.Item>
                    <Form.Item label="业务分类">
                        <TreeSelect
                            value={this.state.classifyID}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={this.state.classifyTreeData}
                            placeholder="请选择分类"
                            treeDefaultExpandAll
                            treeCheckable
                            allowClear
                            onChange={(value: string): void => this.treeSelectChange(value, 'classifyID')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        validateStatus={this.state.isValidate && this.state.content.replace(/^\s+|\s+$/g, '') === '' ? 'error' : ''}
                        help={this.state.isValidate && this.state.content.replace(/^\s+|\s+$/g, '') === '' && '内容不能为空，请填写内容'}
                    >
                        <Input.TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            value={this.state.content}
                            onChange={this.handleInputChange.bind(this, 'content')}
                        />
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }
}

export default withRouter(AnnouncementCreate)