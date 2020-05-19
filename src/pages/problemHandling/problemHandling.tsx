import * as React from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { Table, Form, Row, Tree, Col, Input, Icon, message, Empty, Collapse, DatePicker, Select, TreeSelect, Radio, Button } from 'antd'
import { _getColumns } from '../../common/api/global'
import { _newestQuestion, _keywordQuestion, _businessAll, _loadDimensions, _similarTexts, _mergeQuestion, _addTag, _modifyClassQuestion, _setLevel, _verifyQuestion, _newestQuestionParams } from '../../common/api/kdgManage/problemHandling'
import KdgManagePageHeader from '../../components/containers/kdgPageHeader/kdgPageHeader'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import { formatColumns } from '../../utils/tableUtil'
import styles from './problemHandling.module.less'

class ProblemHandling extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            newestData: [], // 获取最新问题
            businessData: [], // 获取目录分类
            loadData: [], // 获取业务分类
            businessValueso: undefined, // 下拉框目录分类
            loadValueso: undefined, // 下拉框业务分类
            examineVisible: false, // 控制审核弹框
            classIficationVisible: false, // 控制归类弹框
            gradeVisible: false, // 控制等级弹框
            labelVisible: false, // 控制标签弹框
            similarVisible: false, // 控制去重合并弹框
            QueryVisible: false, // 控制查询条件的弹框
            examineValue: '', // 获取弹框审核标识
            recordData: [], // 获取表格里面的信息
            columns: [], // 获取表头信息
            loadselected: [], // 归类业务分类复选框
            Businesslected: [], // 归类目录分类复选框
            similarData: [] // 获取去重合并的接口
        }
    }

    public componentDidMount(): void {
        this.getProblemHandingMenus()
        this.getNewest()
        this.getBusiness()
        this.getload()
    }

    public getProblemHandingMenus = async (): Promise<void> => {
        const res: any = await _getColumns({
            params: { view_id: '9116110110601010000' }
        })
        if (res && res.result) {
            console.log(res)
            const columns = formatColumns(res.data)
            this.setState({ columns })
        }
    }

    public getNewest = async (): Promise<void> => {
        const resNewest: any = await _newestQuestion()
        if (resNewest && resNewest.result) {
            console.log(resNewest)
            this.setState({
                newestData: resNewest.data.files
            })
        }
    }

    public getBusiness = async (): Promise<void> => {
        const resBusiness: any = await _businessAll()
        if (resBusiness && resBusiness.result) {
            this.setState({
                businessData: resBusiness.data
            })
        }
    }

    public getload = async (): Promise<void> => {
        const resload: any = await _loadDimensions()
        if (resload && resload.result) {
            this.setState({
                loadData: resload.data
            })
        }
    }

    public QueryModal = async (): Promise<void> => {
        const fields = this.props.form.getFieldsValue()
        const keyword = fields.keyword || ''
        console.log(keyword)
        if (keyword !== '') {
            const reskeyword: any = await _keywordQuestion({
                params: {
                    keyword: fields.keyword ? fields.keyword || '' : '',
                    begin: fields.beginTime ? moment(fields.beginTime.valueOf()).format('YYYY-MM-DD HH:mm:ss').replace(/[^0-9]/ig, '').toString() : '',
                    end: fields.endTime ? moment(fields.endTime.valueOf()).format('YYYY-MM-DD HH:mm:ss').replace(/[^0-9]/ig, '').toString() : '',
                    source: fields.source ? fields.source : '',
                    /* states: fields.states ? fields.states.toString().replace(/,/g, ' ') : '', */
                    states: '2',
                    level: fields.level ? fields.level : '',
                    class_id: this.state.businessValueso || '' ? this.state.businessValueso.toString().replace(/,/g, ' ') : '',
                    business_id: this.state.loadValueso || '' ? this.state.loadValueso.toString().replace(/,/g, ' ') : ''
                }
            })
            if (reskeyword && reskeyword.result) {
                this.setState({
                    newestData: reskeyword.data.files,
                    QueryVisible: false
                })
            }
        } else {
            const resNewest: any = await _newestQuestionParams({
                params: {
                    begin: fields.beginTime ? moment(fields.beginTime.valueOf()).format('YYYY-MM-DD HH:mm:ss').replace(/[^0-9]/ig, '').toString() : '',
                    end: fields.endTime ? moment(fields.endTime.valueOf()).format('YYYY-MM-DD HH:mm:ss').replace(/[^0-9]/ig, '').toString() : '',
                    level: fields.level ? fields.level : '',
                    class_id: this.state.businessValueso || '' ? this.state.businessValueso.toString().replace(/,/g, ' ') : '',
                    business_id: this.state.loadValueso || '' ? this.state.loadValueso.toString().replace(/,/g, ' ') : ''
                }
            })
            if (resNewest && resNewest.result) {
                this.setState({
                    newestData: resNewest.data.files,
                    QueryVisible: false
                })
            }
        }
    }

    public fomatTime = (time: string): string => (
        `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)} ${time.slice(8, 10)}:${time.slice(10, 12)}:${time.slice(12)}`
    )

    public onChangeresBusiness = (Value: string): void => {
        this.setState({ businessValueso: Value })
    }

    public onChangeresload = (Value: string): void => {
        this.setState({ loadValueso: Value })
    }

    public selected = (selectedRowKeys: any, selectedRows: any): void => {
        this.setState({
            recordData: selectedRows
        })
        console.log('selectedRowKeys: ', selectedRowKeys, 'selectedRows: ', selectedRows)
    }

    // 查询按钮
    public handleAddLabel = (): void => {
        if (this.state.recordData.length !== 0) {
            this.setState({
                labelVisible: true
            })
            return
        }
        message.error('请选择要修改的数据')
    }

    // 加签按钮
    public handleQuery = (): void => {
        this.setState({
            QueryVisible: true
        })
    }

    // 等级按钮
    public handleSetLevel = (): void => {
        if (this.state.recordData.length !== 0) {
            this.setState({
                gradeVisible: true
            })
            return
        }
        message.error('请选择要修改的数据')
    }

    // 去重合并按钮
    public handleNormalized = async (): Promise<void> => {
        const data = this.state.recordData.map((item: any) => ({
            month: item.month,
            id: item.id,
            text: item.name
        }))
        const res: any = await _similarTexts({
            similarTexts: data
        })
        console.log(res)
        if (res && res.result) {
            if (this.state.recordData.length !== 0) {
                this.setState({
                    similarData: res.data,
                    similarVisible: true
                })
                return
            }
            message.error(res.msg)
        }
    }

    // 审核按钮
    public handleReview = (): void => {
        if (this.state.recordData.length !== 0) {
            this.setState({
                examineVisible: true
            })
            return
        }
        message.error('请选择要修改的数据')
    }

    // 审核意见
    public examineOnChange = (e: any): void => {
        this.setState({
            examineValue: e.target.value
        })
    }

    // 归类按钮
    public handleClassification = (): void => {
        if (this.state.recordData.length !== 0) {
            this.setState({
                classIficationVisible: true
            })
            return
        }
        message.error('请选择要修改的数据')
    }

    // 调用审核接口
    public examineModal = async (): Promise<void> => {
        const fields = this.props.form.getFieldsValue()
        const data = this.state.recordData.map((item: any) => ({
            month: item.month,
            id: item.id
        }))
        const examine = fields.examine || ''
        if (this.state.examineValue === '') {
            message.error('审核不能为空')
            return
        }
        if (this.state.examineValue === 2 && examine === '') {
            message.error('审核意见不能为空')
            return
        }
        const res: any = await _verifyQuestion({
            questions: data,
            verify: this.state.examineValue,
            verify_memo: fields.examine || ''
        })
        console.log(res)
        if (res && res.result) {
            message.success('问题审核成功')
            this.setState({
                examineValue: '',
                examineVisible: false
            })
            this.getNewest()
        }
    }

    // 调用加签接口
    public labelModal = async (): Promise<void> => {
        const fields = this.props.form.getFieldsValue()
        const data = this.state.recordData.map((item: any) => ({
            month: item.month,
            id: item.id
        }))
        const tags = fields.label || ''
        if (tags === '') {
            message.error('添加标签不能为空')
            return
        }
        const res: any = await _addTag({
            tags: fields.label,
            questions: data
        })
        console.log(res)
        if (res && res.result) {
            message.success('问题添加标签成功')
            this.setState({
                labelVisible: false
            })
            this.props.form.setFieldsValue({
                label: ''
            })
            this.getNewest()
        } else {
            message.error('问题添加标签失败')
        }
    }

    // 调用等级接口
    public gradeModal = async (): Promise<void> => {
        const fields = this.props.form.getFieldsValue()
        const data = this.state.recordData.map((item: any) => ({
            month: item.month,
            id: item.id
        }))
        const level = fields.grade || ''
        if (level === '') {
            message.error('设置等级不能为空')
            return
        }
        const res: any = await _setLevel({
            questions: data,
            level: fields.grade
        })
        console.log(res)
        if (res && res.result) {
            this.setState({
                gradeVisible: false
            })
            this.props.form.setFieldsValue({
                grade: ''
            })
            message.success('问题设置等级成功')
        } else {
            message.error('问题设置等级失败')
        }
        this.getNewest()
    }


    // 调用合并的接口
    public similarModal = async (item: any, itechildItemm: any): Promise<void> => {
        console.log(item, itechildItemm)
        const data = [{
            id1: item.id,
            text1: item.name,
            month1: item.month,
            id2: itechildItemm.id,
            text2: itechildItemm.name,
            month2: itechildItemm.month
        }]
        const res: any = await _mergeQuestion({
            similarTexts: JSON.stringify(data)
        })
        if (res && res.result) {
            this.setState({
                similarVisible: false
            })
            message.success('合并成功')
        } else {
            message.error('合并失败')
        }
        this.getNewest()
    }

    // 调用归类接口
    public classIficationModal = async (): Promise<void> => {
        const data = this.state.recordData.map((item: any) => ({
            month: item.month,
            id: item.id
        }))
        if (this.state.Businesslected.length === 0 && this.state.Businesslected.length === 0) {
            message.error('请选择问题归类')
            return
        }
        const res: any = await _modifyClassQuestion({
            questions: data,
            class_id: this.state.Businesslected.length > 0 ? this.state.Businesslected.toString().replace(/,/g, ' ') : '',
            business_id: this.state.loadselected.length > 0 ? this.state.loadselected.toString().replace(/,/g, ' ') : ''
        })
        if (res && res.result) {
            this.setState({
                classIficationVisible: false
            })
            console.log('问题归类成功')
            message.success('问题归类成功')
        } else {
            message.error('问题归类失败')
        }
        this.getNewest()
        this.setState({
            classIficationVisible: false
        })
    }

    public onCheckLoad = (selectedKeys: any): void => {
        console.log(selectedKeys)
        this.setState({ loadselected: selectedKeys })
    }

    public onCheckBusiness = (selectedKeys: any): void => {
        console.log(selectedKeys)
        this.setState({ Businesslected: selectedKeys })
    }

    public render(): React.ReactElement {
        const { getFieldDecorator } = this.props.form
        const rowSelection = {
            onChange: this.selected
        }
        return (
            <React.Fragment>
                <KdgManagePageHeader
                    handleQuery={this.handleQuery}
                    handleAddLabel={this.handleAddLabel}
                    handleSetLevel={this.handleSetLevel}
                    handleReview={this.handleReview}
                    handleClassification={this.handleClassification}
                    handleNormalized={this.handleNormalized}
                />
                <DraggableModal
                    title="查询条件"
                    visible={this.state.QueryVisible}
                    onOk={this.QueryModal}
                    onCancel={(): void => { this.setState({ QueryVisible: false }) }}
                >
                    <Form className={styles.queryCondition}>
                        <Row>
                            <Col span={6}>关键字:</Col>
                            <Col span={18}>
                                {getFieldDecorator('keyword')(
                                    <Input placeholder="请输入关键字" />
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>提问开始时间:</Col>
                            <Col span={18}>
                                {getFieldDecorator('beginTime')(
                                    <DatePicker style={{ width: 354 }} />
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>提问结束时间:</Col>
                            <Col span={18}>
                                {getFieldDecorator('endTime')(
                                    <DatePicker style={{ width: 354 }} />
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>问题来源:</Col>
                            <Col span={18}>
                                {getFieldDecorator('source')(
                                    <Select
                                        placeholder="请选择问题来源"
                                    >
                                        <Select.Option value="0">全部来源</Select.Option>
                                        <Select.Option value="10">直接提问</Select.Option>
                                        <Select.Option value="20">搜索发起</Select.Option>
                                        <Select.Option value="30">知识浏览发起</Select.Option>
                                        <Select.Option value="40">论坛提取</Select.Option>
                                    </Select>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>问题等级:</Col>
                            <Col span={18}>
                                {getFieldDecorator('level')(
                                    <Select
                                        placeholder="请选择问题等级"
                                    >
                                        <Select.Option value="0">全部等级</Select.Option>
                                        <Select.Option value="1">一般</Select.Option>
                                        <Select.Option value="2">重要</Select.Option>
                                        <Select.Option value="3">非常重要</Select.Option>
                                    </Select>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>目录分类:</Col>
                            <Col span={18}>
                                <TreeSelect
                                    value={this.state.businessValueso}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择目录分类"
                                    allowClear
                                    multiple
                                    treeDefaultExpandAll

                                    onChange={this.onChangeresBusiness}
                                >
                                    {
                                        this.state.businessData.map((item: any): React.ReactElement => (
                                            <TreeSelect.TreeNode value={item.id} title={item.name} key={item.id}>
                                                {
                                                    item.children.map((childItem: any): React.ReactElement => (
                                                        <TreeSelect.TreeNode value={childItem.id} title={childItem.name} key={childItem.id}>
                                                            {
                                                                childItem.children.map((childsItem: any): React.ReactElement => (
                                                                    <TreeSelect.TreeNode value={childsItem.id} title={childsItem.name} key={childsItem.id}>
                                                                    </TreeSelect.TreeNode>
                                                                ))
                                                            }
                                                        </TreeSelect.TreeNode>
                                                    ))
                                                }

                                            </TreeSelect.TreeNode>
                                        ))
                                    }

                                </TreeSelect>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>业务分类:</Col>
                            <Col span={18}>
                                <TreeSelect
                                    value={this.state.loadValueso}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择业务分类"
                                    allowClear
                                    multiple
                                    treeDefaultExpandAll
                                    onChange={this.onChangeresload}
                                /* onChange={this.onChangeresload} */
                                >
                                    {
                                        this.state.loadData.map((item: any): React.ReactElement => (
                                            <TreeSelect.TreeNode value={item.id} title={item.name} key={item.id}>
                                                {
                                                    item.children.map((childItem: any): React.ReactElement => (
                                                        <TreeSelect.TreeNode value={childItem.id} title={childItem.name} key={childItem.id}>
                                                            {
                                                                childItem.children.map((childsItem: any): React.ReactElement => (
                                                                    <TreeSelect.TreeNode value={childsItem.id} title={childsItem.name} key={childsItem.id}>
                                                                    </TreeSelect.TreeNode>
                                                                ))
                                                            }
                                                        </TreeSelect.TreeNode>
                                                    ))
                                                }
                                            </TreeSelect.TreeNode>
                                        ))
                                    }

                                </TreeSelect>
                            </Col>
                        </Row>
                    </Form>

                </DraggableModal>
                <Table
                    className={styles.table}
                    columns={this.state.columns}
                    rowSelection={rowSelection}
                    scroll={{ x: true, y: 646 }}
                    bordered
                    rowKey="id"
                    dataSource={this.state.newestData}
                    pagination={{ pageSize: 10 }}
                />
                <DraggableModal
                    title="请选择审核"
                    visible={this.state.examineVisible}
                    onOk={this.examineModal}
                    onCancel={(): void => { this.setState({ examineVisible: false }) }}
                /* okText="确认"
                cancelText="取消" */
                >
                    <Radio.Group onChange={this.examineOnChange} value={this.state.examineValue}>
                        <Radio value={1}>审核通过</Radio>
                        <Radio value={2}>审核不通过</Radio>
                    </Radio.Group>
                    {this.state.examineValue === 2 ?
                        <Form>
                            <Form.Item label="审核不通过备注">
                                {getFieldDecorator('examine', {
                                    rules: [{ required: true, message: '请填写审核不通过备注!' }]
                                })(
                                    <Input.TextArea placeholder="请填写审核不通过备注" />
                                )}
                            </Form.Item>
                        </Form> : null}
                </DraggableModal>
                <DraggableModal
                    title="请添加标签"
                    visible={this.state.labelVisible}
                    onOk={this.labelModal}
                    onCancel={(): void => { this.setState({ labelVisible: false }) }}
                /* okText="确认"
                cancelText="取消" */
                >
                    <Form>
                        <Form.Item label="请添加标签">
                            {getFieldDecorator('label', {
                                rules: [{ required: true, message: '请添加标签!' }]
                            })(
                                <Input placeholder="请添加标签" />
                            )}
                        </Form.Item>
                    </Form>
                </DraggableModal>
                <DraggableModal
                    title="请添加等级"
                    visible={this.state.gradeVisible}
                    onOk={this.gradeModal}
                    onCancel={(): void => { this.setState({ gradeVisible: false }) }}
                /* okText="确认"
                cancelText="取消" */
                >
                    <Form>
                        <Form.Item label="请添加等级">
                            {getFieldDecorator('grade', {
                                rules: [{ required: true, message: '请添加等级!' }]
                            })(
                                <Select
                                    placeholder="请选择问题等级"
                                >
                                    <Select.Option value="1">一般</Select.Option>
                                    <Select.Option value="2">重要</Select.Option>
                                    <Select.Option value="3">非常重要</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </DraggableModal>
                <DraggableModal
                    title="请选择问题的归类"
                    visible={this.state.classIficationVisible}
                    onOk={this.classIficationModal}
                    onCancel={(): void => { this.setState({ classIficationVisible: false }) }}
                /* okText="确认"
                 cancelText="取消"
              width={900} */
                >
                    <Form>
                        <Form.Item label="业务分类">
                            <Tree
                                checkable
                                showIcon
                                multiple
                                defaultExpandAll
                                onCheck={this.onCheckLoad}
                            >
                                {this.state.loadData.length > 0 ?
                                    this.state.loadData.map((item: any): React.ReactElement => (
                                        <Tree.TreeNode title={item.name} key={item.id}>
                                            {
                                                item.children.map((childItem: any): React.ReactElement => (
                                                    <Tree.TreeNode title={childItem.name} key={childItem.id}>
                                                        {
                                                            childItem.children.map((childsItem: any): React.ReactElement => (
                                                                <Tree.TreeNode title={childsItem.name} key={childsItem.id}>
                                                                </Tree.TreeNode>
                                                            ))
                                                        }
                                                    </Tree.TreeNode>
                                                ))
                                            }
                                        </Tree.TreeNode>
                                    )) : <Empty />}
                            </Tree>
                        </Form.Item>
                        <Form.Item label="目录分类">
                            <Tree
                                checkable
                                showIcon
                                multiple
                                defaultExpandAll
                                onCheck={this.onCheckBusiness}
                            >
                                {this.state.businessData.length > 0 ?
                                    this.state.businessData.map((item: any): React.ReactElement => (
                                        <Tree.TreeNode title={item.name} key={item.id}>
                                            {
                                                item.children.map((childItem: any): React.ReactElement => (
                                                    <Tree.TreeNode title={childItem.name} key={childItem.id}>
                                                        {
                                                            childItem.children.map((childsItem: any): React.ReactElement => (
                                                                <Tree.TreeNode title={childsItem.name} key={childsItem.id}>
                                                                </Tree.TreeNode>
                                                            ))
                                                        }
                                                    </Tree.TreeNode>
                                                ))
                                            }
                                        </Tree.TreeNode>
                                    )) : <Empty />}
                            </Tree>
                        </Form.Item>
                    </Form>
                </DraggableModal>
                <DraggableModal
                    title="去重合并"
                    visible={this.state.similarVisible}
                    onOk={(): void => { this.setState({ similarVisible: false }) }}
                    onCancel={(): void => { this.setState({ similarVisible: false }) }}
                /* okText="合并"
                cancelText="取消" */
                >
                    <Collapse>
                        {this.state.similarData.length > 0 ?
                            this.state.similarData.map((item: any): React.ReactElement => (
                                <Collapse.Panel header={item.name} key={item.id}>
                                    {
                                        item.children.map((itechildItemm: any): React.ReactElement => (
                                            <Row key={itechildItemm.id}>
                                                <Col span={8}>
                                                    <Icon type="question-circle" theme="twoTone" />
                                                    :
                                                    {itechildItemm.name}
                                                </Col>
                                                <Col span={8}>
                                                    匹配率
                                                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                                    :
                                                    {itechildItemm.score}
                                                </Col>
                                                <Col span={8}>
                                                    <Button type="primary" size="small" onClick={this.similarModal.bind(this, item, itechildItemm)}>合并</Button>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                </Collapse.Panel>
                            )) : <Empty />}
                    </Collapse>
                </DraggableModal>
            </React.Fragment>
        )
    }
}

const Problem = Form.create()(withRouter(ProblemHandling))

export default Problem