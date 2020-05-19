import * as React from 'react'
import { Table, Modal, TreeSelect, message, Input } from 'antd'
import { _getColumns } from '../../common/api/global'
import { _newestQuestion, _orgUserTree, _setTransfer } from '../../common/api/kdgManage/problemHandling'
import KdgManagePageHeader from '../../components/containers/kdgPageHeader/kdgPageHeader'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import { formatColumns } from '../../utils/tableUtil'
import styles from './problemSolving.module.less'

class ProblemSolving extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            newestSelected: [], // 多选框选中的数据信息
            newestData: [], // 获取最新问题信息
            columns: [], // 获取表头信息
            transferData: [], // 获取用户信息s
            transferVisible: false, // 控制扭转弹框
            transferValueso: '', // 获取扭转弹框的用户信息
            answer: false
        }
    }

    public componentDidMount(): void {
        this.getProblemHandingMenus()
        this.getNewest()
    }

    // 获取表头信息
    public getProblemHandingMenus = async (): Promise<void> => {
        const res: any = await _getColumns({
            params: { view_id: '9116110110601010000' }
        })
        if (res && res.result) {
            const columns = formatColumns(res.data)
            this.setState({ columns })
        }
    }

    // 获取表里面的数据
    public getNewest = async (): Promise<void> => {
        const resNewest: any = await _newestQuestion()
        if (resNewest && resNewest.result) {
            console.log(resNewest)
            this.setState({
                newestData: resNewest.data.files
            })
        }
    }

    // 处理时间
    public fomatTime = (time: string): string => (
        `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)} ${time.slice(8, 10)}:${time.slice(10, 12)}:${time.slice(12)}`
    )

    public handleQuery = (): void => {
        this.getNewest()
    }

    // 调用扭转的接口
    public transferModal = async (): Promise<void> => {
        const data = this.state.newestSelected.map((item: any) => ({
            month: item.month,
            id: item.id
        }))
        const res: any = await _setTransfer({
            answer_user: this.state.transferValueso,
            questions: data
        })
        if (res && res.result) {
            this.setState({
                transferVisible: false,
                transferValueso: ''

            })
            message.success('问题扭转成功')
        }
        this.getNewest()
    }

    // 关闭扭转的弹框
    public transferHideModal = (): void => {
        this.setState({
            transferVisible: false
        })
    }

    // 选择用户信息
    public onChangeresTransfer = (Value: string): void => {
        console.log(Value)
        this.setState({ transferValueso: Value })
    }

    // 解答按钮
    public handleAnswer = (): void => {
        this.setState({ answer: true })
    }

    // 调用获取用户信息
    public handleReverse = async (): Promise<void> => {
        if (this.state.newestSelected.length !== 0) {
            const res: any = await _orgUserTree()
            if (res && res.result) {
                console.log(res)
                this.setState({
                    transferData: res.data,
                    transferVisible: true
                })
            }
            return
        }
        message.error('请选择要修改的数据')
    }

    public render(): React.ReactElement {
        const rowSelection = {
            onChange: (selectedRowKeys: any, selectedRows: any): any => {
                this.setState({
                    newestSelected: selectedRows
                })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            }
        }
        const tProps = {
            treeCheckable: false
        }
        return (
            <React.Fragment>
                <KdgManagePageHeader
                    handleQuery={this.handleQuery}
                    handleReverse={this.handleReverse}
                    handleAnswer={this.handleAnswer}
                />
                <Table
                    className={styles.table}
                    rowSelection={rowSelection}
                    columns={this.state.columns}
                    scroll={{ x: true, y: 646 }}
                    bordered
                    rowKey="id"
                    dataSource={this.state.newestData}
                />
                <Modal
                    title="扭转"
                    visible={this.state.transferVisible}
                    onOk={this.transferModal}
                    onCancel={this.transferHideModal}
                    okText="扭转"
                    cancelText="取消"
                >
                    <span>请选择用户信息:</span>
                    <TreeSelect
                        style={{ width: 200 }}
                        value={this.state.transferValueso}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="请选择用户"
                        allowClear
                        {...tProps}
                        onChange={this.onChangeresTransfer}
                    >
                        {this.state.transferData.map((item: any): React.ReactElement => (
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
                        ))}
                    </TreeSelect>
                </Modal>
                <DraggableModal
                    title="问题解答"
                    visible={this.state.answer}
                    width={800}
                    onOk={(): void => {
                        message.success('解答成功')
                        this.setState({ answer: false })
                    }}
                    onCancel={(): void => { this.setState({ answer: false }) }}
                >
                    <div>
                        <Input.TextArea rows={4} />
                    </div>
                </DraggableModal>
            </React.Fragment>
        )
    }
}

export default ProblemSolving