import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, TreeSelect, Input, message } from 'antd'
import KdgManagePageHeader from '../../../components/containers/kdgPageHeader/kdgPageHeader'
import { _getCatalogTree, _getClassifyTree } from '../../../common/api/global'
import { _analysisDocumentTags, _createDocument } from '../../../common/api/document'
import formatTreeData from '../../../utils/treeUtil'

interface IState {
    catalogTreeData: ITreeData[]; // 目录树
    classifyTreeData: ITreeData[]; // 分类树
    isValidate: boolean; // 检测开关
    title: string; // 标题
    tags: string; // 标签
    catalogID: string; // 目录
    classifyID: string; // 分类
    summary: string; // 描述
    file: any;
    [key: string]: any;
}


class DocumentCreate extends React.PureComponent<any, IState> {
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
            summary: '',
            file: false
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

    public handleUploadFile = (e: any): void => {
        this.setState({
            file: e.target.files[0],
            title: e.target.files[0].name
        })
    }

    // 自动生成标签
    public autoCreateTags = (): void => {
        this.setState({
            isValidate: true
        })
        if (!this.state.file) {
            return
        }
        this.analysisDocumentTags()
    }

    public analysisDocumentTags = async (): Promise<void> => {
        const formData = new FormData()
        formData.append('file_name', this.state.file.name)
        formData.append('file', this.state.file)
        const res: any = await _analysisDocumentTags(formData)
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
        if (this.state.title.replace(/^\s+|\s+$/g, '') === '' || this.state.summary.replace(/^\s+|\s+$/g, '') === '' || this.state.tags.replace(/^\s+|\s+$/g, '') === '' || this.state.catalogID === '' || !this.state.file) {
            return
        }
        this.createDocument()
    }

    public createDocument = async (): Promise<void> => {
        const formData = new FormData()
        formData.append('file_name', this.state.title)
        formData.append('tags', this.state.tags)
        formData.append('class_id', this.state.catalogID)
        formData.append('business_id', this.state.classifyID.toString())
        formData.append('summary', this.state.summary)
        formData.append('file', this.state.file)
        const res: any = await _createDocument(formData)
        if (res && res.result) {
            message.success('创建成功')
            this.setState({
                isValidate: false,
                title: '',
                tags: '',
                catalogID: '',
                classifyID: undefined,
                summary: '',
                file: false
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
                    handleBack={(): void => this.props.history.push('/document')}
                />
                <Form {...formItemLayout} style={{ overflow: 'auto', height: 'calc(100% - 50px)' }}>
                    <Form.Item
                        label="标题"
                        validateStatus={this.state.isValidate && this.state.title.replace(/^\s+|\s+$/g, '') === '' ? 'error' : ''}
                        help={this.state.isValidate && this.state.title.replace(/^\s+|\s+$/g, '') === '' && '标题不能为空，请输入标题'}
                    >
                        <Input disabled value={this.state.title} onChange={this.handleInputChange.bind(this, 'title')} />
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
                        label="文件"
                        validateStatus={this.state.isValidate && !this.state.file ? 'error' : ''}
                        help={this.state.isValidate && !this.state.file && '请添加上传文件'}
                    >
                        <input type="file" onChange={this.handleUploadFile} />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        validateStatus={this.state.isValidate && this.state.summary.replace(/^\s+|\s+$/g, '') === '' ? 'error' : ''}
                        help={this.state.isValidate && this.state.summary.replace(/^\s+|\s+$/g, '') === '' && '描述不能为空，请填写描述'}
                    >
                        <Input.TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            value={this.state.summary}
                            onChange={this.handleInputChange.bind(this, 'summary')}
                        />
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }
}

export default withRouter(DocumentCreate)