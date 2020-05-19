import * as React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { Table, Form, Popconfirm, Icon, Tooltip, message, Drawer, Modal } from 'antd'
import { RangePickerValue } from 'antd/lib/date-picker/interface'
import DraggableModal from '../../../components/cores/draggableModal/draggableModal'
import { EditableContext, EditableCell, formatColumns } from '../../../utils/tableUtil'
import KdgManagePageHeader from '../../../components/containers/kdgPageHeader/kdgPageHeader'
import KdgManageQuery from '../../../components/containers/kdgManageQuery/kdgManageQuery'
import KdgCatalogclassify from '../../../components/containers/kdgCatalogclassify/kdgCatalogclassify'
import { _getColumns, _deleteKdg } from '../../../common/api/global'
import { _listKdg, _modifyBasicKdg, _modifyClassKdg } from '../../../common/api/announcement'
import styles from './announcementIndex.module.less'

interface IQueryState {
    rangeTime: RangePickerValue;
    verified: number;
    published: number;
}

interface IClassifyState {
    selectedCatalog: string[];
    checkedClassify: string[] | { checked: string[]; halfChecked: string[] };
}

interface IState {
    readonly columnOperate: IColumns; // 操作列
    queryVisible: boolean; // 查询显示开关
    classifyVisible: boolean; // 归类显示开关
    tableColumns: IColumns[]; // 表格头
    tableData: any[]; // 表格数据
    editingKey: string; // 正在编辑的表格行id
    selectedRows: { id: string; month: number }[];
    currentPage: number; // 当前页
    queryState: IQueryState; // 查询状态
}

class AnnouncementIndexTable extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            columnOperate: {
                key: '0',
                title: '操作',
                dataIndex: 'operation',
                width: 150,
                render: (_text: any, record: any): React.ReactElement => (
                    record.id === this.state.editingKey ?
                        <span>
                            <EditableContext.Consumer>
                                {(form: any): React.ReactElement => (
                                    <span
                                        className={styles.operate}
                                        onClick={(): void => this.save(form, record.key)}
                                    >
                                        保存
                                    </span>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="确定取消吗？" onConfirm={(): void => this.setState({ editingKey: '' })}>
                                <span className={styles.operate}>取消</span>
                            </Popconfirm>
                        </span> :
                        <React.Fragment>
                            <Tooltip placement="top" title="修改">
                                <Icon type="edit" className={styles.operate} onClick={(): void => this.setState({ editingKey: record.id })} />
                            </Tooltip>
                            <Tooltip placement="top" title="预览">
                                <Icon type="eye" className={styles.operate} />
                            </Tooltip>
                            <Tooltip placement="top" title="推荐">
                                <Icon type="heart" className={styles.operate} />
                            </Tooltip>
                        </React.Fragment>
                )
            },
            queryVisible: false,
            classifyVisible: false,
            tableColumns: [],
            tableData: [],
            editingKey: '',
            selectedRows: [],
            currentPage: 0,
            queryState: {
                rangeTime: [moment().startOf('month'), moment().endOf('month')],
                verified: -1,
                published: -1
            }
        }
    }

    public componentDidMount(): void {
        this.getTableColums()
        this.getTableData()
    }

    // 获取表头
    public getTableColums = async (): Promise<void> => {
        const res: any = await _getColumns({
            params: {
                view_id: '9116110110200000000'
            }
        })
        if (res && res.result) {
            const columns = formatColumns(res.data)
            columns.push(this.state.columnOperate)
            this.setState({
                tableColumns: columns
            })
        }
    }

    // 获取表数据
    public getTableData = async (): Promise<void> => {
        const res: any = await _listKdg({
            params: {
                begin_time: moment(this.state.queryState.rangeTime[0]).format('YYYYMMDDHHmmss'),
                end_time: moment(this.state.queryState.rangeTime[1]).format('YYYYMMDDHHmmss'),
                type: 1,
                verified: this.state.queryState.verified,
                published: this.state.queryState.published,
                page_count: this.state.currentPage,
                page_size: 10
            }
        })
        if (res && res.result) {
            res.data.forEach((item: any): void => {
                item.key = item.id
            })
            this.setState({
                tableData: res.data
            })
        }
    }

    // 编辑基本信息保存
    public save = (form: any, key: any): any => {
        form.validateFields((error: any, row: any): any => {
            if (error) {
                return
            }
            const newData = [...this.state.tableData]
            const index = newData.findIndex((item: any): boolean => key === item.key)
            const item = newData[index]
            _modifyBasicKdg({ id: item.id, month: item.month, ...row }).then((res: any): void => {
                if (res && res.result) {
                    message.success('修改成功')
                    newData.splice(index, 1, { ...item, ...row })
                    this.setState({ tableData: newData, editingKey: '' })
                }
            })
        })
    }

    // 分页改变
    public pageChange = (page: number): void => {
        this.setState({
            currentPage: page - 1
        }, (): void => { this.getTableData() })
    }

    // 查询
    public handleQuery = (): void => {
        this.setState({
            queryVisible: false,
            currentPage: 0
        }, (): void => { this.getTableData() })
    }

    // 归类确认
    public classifyConfirm = (classifyState: IClassifyState): void => {
        _modifyClassKdg({
            class_id: classifyState.selectedCatalog.toString(),
            business_ids: classifyState.checkedClassify.toString(),
            kdgs: JSON.stringify(this.state.selectedRows)
        }).then((res: any): void => {
            if (res && res.result) {
                this.setState({
                    classifyVisible: false
                })
                this.getTableData()
            }
        })
    }

    public handleNormalized = (): void => {
        console.log('归一按钮')
    }

    public handleRecommend = (): void => {
        console.log('推荐按钮')
    }

    public handleClassification = (): void => {
        if (this.state.selectedRows.length === 0) {
            message.warning('请选择知识')
            return
        }
        this.setState({ classifyVisible: true })
    }

    public handleReview = (): void => {
        console.log('审核按钮')
    }

    // 删除
    public handleDelete = (): void => {
        if (this.state.selectedRows.length === 0) {
            message.warning('请选择知识')
            return
        }
        Modal.confirm({
            title: '确认要删除吗?',
            onOk: (): void => {
                _deleteKdg({
                    kdgs: JSON.stringify(this.state.selectedRows)
                }).then((res: any): void => {
                    if (res && res.result) {
                        this.getTableData()
                        this.setState({ selectedRows: [] })
                    }
                })
            }
        })
    }

    public render(): React.ReactElement {
        const components = { body: { cell: EditableCell } }
        const columns = this.state.tableColumns.map((item: IColumns): any => {
            if (!item.editable) {
                return item
            }
            return {
                ...item,
                onCell: (record: any): any => ({
                    record,
                    width: item.width,
                    dataIndex: item.dataIndex,
                    title: item.title,
                    editing: record.id === this.state.editingKey
                })
            }
        })
        const rowSelection = {
            onChange: (_selectedRowKeys: string[] | number[], selectedRows: any[]): void => {
                const rows = []
                selectedRows.forEach((row: any): void => {
                    rows.push({
                        id: row.id,
                        month: row.month
                    })
                })
                this.setState({
                    selectedRows: rows
                })
            }
        }

        return (
            <React.Fragment>
                <KdgManagePageHeader
                    handleQuery={(): void => this.setState({ queryVisible: true })}
                    handleNormalized={this.handleNormalized}
                    handleRecommend={this.handleRecommend}
                    handleClassification={this.handleClassification}
                    handleReview={this.handleReview}
                    handleCreate={(): void => this.props.history.push('/announcement/create')}
                    handleDelete={this.handleDelete}
                />
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        className={styles.table}
                        components={components}
                        scroll={{ x: true, y: 646 }}
                        rowSelection={rowSelection}
                        dataSource={this.state.tableData}
                        columns={columns}
                        pagination={{
                            pageSize: 10,
                            onChange: this.pageChange
                        }}
                    />
                </EditableContext.Provider>

                <DraggableModal
                    visible={this.state.queryVisible}
                    title="查询"
                    width={600}
                    onOk={this.handleQuery}
                    onCancel={(): void => this.setState({ queryVisible: false })}
                >
                    <KdgManageQuery setQueryState={(queryState: IQueryState): void => this.setState({ queryState })} />
                </DraggableModal>
                <Drawer
                    title="归类"
                    placement="right"
                    closable={false}
                    width={600}
                    getContainer={false}
                    style={this.state.classifyVisible && { position: 'absolute' }}
                    bodyStyle={{ height: 'calc(100% - 108px)' }}
                    visible={this.state.classifyVisible}
                    onClose={(): void => this.setState({ classifyVisible: false })}
                >
                    <KdgCatalogclassify confirm={this.classifyConfirm} />
                </Drawer>
            </React.Fragment>
        )
    }
}

const AnnouncementIndex = Form.create()(withRouter(AnnouncementIndexTable))

export default AnnouncementIndex