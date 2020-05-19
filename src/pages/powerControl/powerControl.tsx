import * as React from 'react'
import moment from 'moment'
import { Table, Row, Col, Select, DatePicker, Tree, Checkbox, Button, message, Popconfirm } from 'antd'
import { RangePickerValue } from 'antd/lib/date-picker/interface'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { formatColumns } from '../../utils/tableUtil'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import KdgManagePageHeader from '../../components/containers/kdgPageHeader/kdgPageHeader'
import formatTreeData from '../../utils/treeUtil'
import { _getColumns } from '../../common/api/global'
import { _powerControlList, _getRoleList, _getOrgUserTree, _getTargetTree, _createPowerControl, _modifyPowerControl, _deletePowerControl } from '../../common/api/powerControl'
import styles from './powerControl.module.less'

interface IState {
    readonly actionColumn: IColumns;
    tableColumns: IColumns[]; // 表格头
    tableData: any[]; // 表格数据
    visible: boolean;
    isModify: boolean;
    type: number; // 控制源选择的类型
    roleList: any[];
    orgUserTree: any[];
    targetTree: any[];
    rangeTime: RangePickerValue;
    sourceID: string;
    targetID: string;
    securityLevel: number;
    checkedGroup: CheckboxValueType[];
    [key: string]: any;
}

class PowerControl extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            actionColumn: {
                key: '0',
                title: '操作',
                dataIndex: 'operation',
                width: 150,
                fixed: 'right',
                render: (_text: any, record: any): React.ReactElement => (
                    <React.Fragment>
                        <Button type="primary" size="small" onClick={(): void => this.handleClickModify(record)}>修改</Button>
                        <Popconfirm title="确定删除吗？" onConfirm={(): void => this.deletePowerControl(record)}>
                            <Button type="primary" size="small" style={{ marginLeft: 8 }}>删除</Button>
                        </Popconfirm>
                    </React.Fragment>
                )
            },
            tableColumns: [],
            tableData: [],
            visible: false,
            isModify: false,
            type: 0,
            roleList: [],
            orgUserTree: [],
            targetTree: [],
            rangeTime: [moment().startOf('month'), moment().endOf('month')],
            sourceID: '',
            targetID: '',
            securityLevel: 0,
            checkedGroup: ['state', 'thumb', 'discuss', 'modify', 'download', 'delete', 'create', 'view']
        }
    }

    public componentDidMount(): void {
        this.getTableColums()
        this.getTableData()
        this.getRoleList()
        this.getTargetTree()
    }

    // 获取表头
    public getTableColums = async (): Promise<void> => {
        const res: any = await _getColumns({
            params: {
                view_id: '9116110110300000000'
            }
        })
        if (res && res.result) {
            const columns = formatColumns(res.data)
            columns.push(this.state.actionColumn)
            this.setState({
                tableColumns: columns
            })
        }
    }

    // 获取表数据
    public getTableData = async (): Promise<void> => {
        const res: any = await _powerControlList()
        if (res && res.result) {
            res.data.forEach((item: any): void => {
                item.key = `${item.source_id}${item.target_id}${item.security_level}`
            })
            this.setState({
                tableData: res.data
            })
        }
    }

    // 获取目标类型树
    public getTargetTree = async (): Promise<void> => {
        const res: any = await _getTargetTree()
        if (res && res.result) {
            this.setState({
                targetTree: formatTreeData(res.data)
            })
        }
    }

    // 获取角色列表
    public getRoleList = async (): Promise<void> => {
        const res: any = await _getRoleList()
        if (res && res.result) {
            this.setState({
                roleList: res.data
            })
        }
    }

    // 获取机构用户树
    public getKdgOrgUserTree = async (): Promise<void> => {
        const res: any = await _getOrgUserTree()
        if (res && res.result) {
            this.setState({
                orgUserTree: formatTreeData(res.data)
            })
        }
    }

    public rangeTimeChange = (dates: RangePickerValue): void => {
        this.setState({
            rangeTime: dates
        })
    }

    public handleSelectChange = (key: string, value: number | string): void => {
        this.setState({
            [key]: value
        })
        if (key === 'type') {
            switch (value) {
                case 0:
                    this.getRoleList()
                    break
                case 1:
                    this.getKdgOrgUserTree()
                    break
                default:
                    break
            }
        }
    }

    public onSelect = (keys: string[]): void => {
        this.setState({
            sourceID: keys[0]
        })
    }

    public onTargetSelect = (keys: string[]): void => {
        this.setState({
            targetID: keys[0]
        })
    }

    public handleCheckboxChange = (checkedValues: CheckboxValueType[]): void => {
        this.setState({
            checkedGroup: checkedValues
        })
    }

    // 修改按钮
    public handleClickModify = (record: any): void => {
        const checked: string[] = []
        if (record.state === 1) {
            checked.push('state')
        }
        if (record.create === 1) {
            checked.push('create')
        }
        if (record.delete === 1) {
            checked.push('delete')
        }
        if (record.modify === 1) {
            checked.push('modify')
        }
        if (record.view === 1) {
            checked.push('view')
        }
        if (record.thumb === 1) {
            checked.push('thumb')
        }
        if (record.discuss === 1) {
            checked.push('discuss')
        }
        if (record.download === 1) {
            checked.push('download')
        }
        this.setState({
            isModify: true,
            rangeTime: [moment(record.begin_time, 'YYYY-MM-DD HH:mm:ss'), moment(record.expire_time, 'YYYY-MM-DD HH:mm:ss')],
            sourceID: record.source_id,
            targetID: record.target_id,
            securityLevel: record.security_level,
            checkedGroup: checked
        }, () => this.setState({ visible: true }))
    }

    // 删除知识权限
    public deletePowerControl = (record: any): void => {
        _deletePowerControl({
            source_id: record.source_id,
            target_id: record.target_id,
            security_level: record.security_level
        }).then((res: any): void => {
            if (res && res.result) {
                this.getTableData()
            }
        })
    }

    public handleConfirm = (): void => {
        if (this.state.isModify) {
            this.modifyPowerControl()
        } else {
            if (this.state.sourceID === '') {
                message.error('请选择控制源类型')
                return
            }
            if (this.state.targetID === '') {
                message.error('请选择目标类型')
                return
            }
            this.createPowerControl()
        }
    }

    // 创建权限
    public createPowerControl = async (): Promise<void> => {
        const res: any = await _createPowerControl({
            source_id: this.state.sourceID,
            target_id: this.state.targetID,
            security_level: this.state.securityLevel,
            source_type: parseInt(this.state.sourceID.slice(0, 3), 10),
            target_type: parseInt(this.state.targetID.slice(0, 3), 10),
            begin_time: moment(this.state.rangeTime[0]).format('YYYYMMDDHHmmss'),
            expire_time: moment(this.state.rangeTime[1]).format('YYYYMMDDHHmmss'),
            state: this.state.checkedGroup.includes('state') ? 1 : 0,
            create: this.state.checkedGroup.includes('create') ? 1 : 0,
            delete: this.state.checkedGroup.includes('delete') ? 1 : 0,
            modify: this.state.checkedGroup.includes('modify') ? 1 : 0,
            view: this.state.checkedGroup.includes('view') ? 1 : 0,
            thumb: this.state.checkedGroup.includes('thumb') ? 1 : 0,
            discuss: this.state.checkedGroup.includes('discuss') ? 1 : 0,
            download: this.state.checkedGroup.includes('download') ? 1 : 0
        })
        if (res && res.result) {
            this.setState({
                visible: false,
                rangeTime: [moment().startOf('month'), moment().endOf('month')],
                sourceID: '',
                targetID: '',
                securityLevel: 0,
                checkedGroup: ['state', 'thumb', 'discuss', 'modify', 'download', 'delete', 'create', 'view']
            })
            this.getTableData()
        }
    }

    // 修改权限
    public modifyPowerControl = async (): Promise<void> => {
        const res: any = await _modifyPowerControl({
            source_id: this.state.sourceID,
            target_id: this.state.targetID,
            security_level: this.state.securityLevel,
            source_type: parseInt(this.state.sourceID.slice(0, 3), 10),
            target_type: parseInt(this.state.targetID.slice(0, 3), 10),
            begin_time: moment(this.state.rangeTime[0]).format('YYYYMMDDHHmmss'),
            expire_time: moment(this.state.rangeTime[1]).format('YYYYMMDDHHmmss'),
            state: this.state.checkedGroup.includes('state') ? 1 : 0,
            create: this.state.checkedGroup.includes('create') ? 1 : 0,
            delete: this.state.checkedGroup.includes('delete') ? 1 : 0,
            modify: this.state.checkedGroup.includes('modify') ? 1 : 0,
            view: this.state.checkedGroup.includes('view') ? 1 : 0,
            thumb: this.state.checkedGroup.includes('thumb') ? 1 : 0,
            discuss: this.state.checkedGroup.includes('discuss') ? 1 : 0,
            download: this.state.checkedGroup.includes('download') ? 1 : 0
        })
        if (res && res.result) {
            this.setState({
                visible: false,
                isModify: false,
                rangeTime: [moment().startOf('month'), moment().endOf('month')],
                sourceID: '',
                targetID: '',
                securityLevel: 0,
                checkedGroup: ['state', 'thumb', 'discuss', 'modify', 'download', 'delete', 'create', 'view']
            })
            this.getTableData()
        }
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.powerControlWrapper}>
                <KdgManagePageHeader
                    handleCreate={(): void => this.setState({ visible: true })}
                />
                <Table
                    scroll={{ x: true, y: 646 }}
                    columns={this.state.tableColumns}
                    dataSource={this.state.tableData}
                />
                <DraggableModal
                    visible={this.state.visible}
                    title="权限详情"
                    width={800}
                    onOk={this.handleConfirm}
                    onCancel={(): void => this.setState({ visible: false, isModify: false })}
                >
                    <Row className={styles.row}>
                        <Col span={6}>有效期：</Col>
                        <Col span={18}>
                            <DatePicker.RangePicker
                                className={styles.rangePicker}
                                ranges={{
                                    今天: [moment().startOf('day'), moment().endOf('day')],
                                    今周: [moment().startOf('week'), moment().endOf('week')],
                                    今月: [moment().startOf('month'), moment().endOf('month')],
                                    今年: [moment().startOf('year'), moment().endOf('year')]
                                }}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={this.state.rangeTime}
                                onChange={this.rangeTimeChange}
                            />
                        </Col>
                    </Row>
                    {
                        !this.state.isModify &&
                        <React.Fragment>
                            <Row className={styles.row} style={{ height: 300 }}>
                                <Col span={12} className={styles.col}>
                                    <span>控制源类型：</span>
                                    <Select className={styles.select} value={this.state.type} onChange={this.handleSelectChange.bind(this, 'type')}>
                                        <Select.Option value={0}>角色</Select.Option>
                                        <Select.Option value={1}>部门/用户</Select.Option>
                                    </Select>
                                    {
                                        this.state.type === 0 ?
                                            this.state.roleList.length > 0 &&
                                            <Tree.DirectoryTree
                                                className={styles.tree}
                                                defaultExpandAll
                                                onSelect={this.onSelect}
                                            >
                                                {this.state.roleList.map((item: any): React.ReactElement => (
                                                    <Tree.TreeNode title={item.full_name} key={item.system_id} />
                                                ))}
                                            </Tree.DirectoryTree> :
                                            this.state.orgUserTree.length > 0 &&
                                            <Tree.DirectoryTree
                                                className={styles.tree}
                                                treeData={this.state.orgUserTree}
                                                defaultExpandParent
                                                onSelect={this.onSelect}
                                            />
                                    }
                                </Col>
                                <Col span={12} className={styles.col}>
                                    <span>目标类型：</span>
                                    {
                                        this.state.targetTree.length > 0 &&
                                        <Tree.DirectoryTree
                                            className={styles.tree}
                                            treeData={this.state.targetTree}
                                            defaultExpandParent
                                            onSelect={this.onTargetSelect}
                                        />
                                    }
                                </Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col span={6}>安全级别：</Col>
                                <Col span={18}>
                                    <Select style={{ width: '100%' }} value={this.state.securityLevel} onChange={this.handleSelectChange.bind(this, 'securityLevel')}>
                                        <Select.Option value={0}>公开</Select.Option>
                                        <Select.Option value={1}>秘密</Select.Option>
                                        <Select.Option value={2}>机密</Select.Option>
                                        <Select.Option value={3}>绝密</Select.Option>
                                    </Select>
                                </Col>
                            </Row>
                        </React.Fragment>
                    }
                    <Row className={styles.row}>
                        <Col span={6}>操作权限：</Col>
                        <Col span={18}>
                            <Checkbox.Group style={{ width: '100%', marginTop: 8 }} value={this.state.checkedGroup} onChange={this.handleCheckboxChange}>
                                <Col span={6}>
                                    <Checkbox value="state">启用</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="create">增加</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="delete">删除</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="modify">修改</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="view">查看</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="thumb">点赞</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="discuss">评论</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="download">下载</Checkbox>
                                </Col>
                            </Checkbox.Group>
                        </Col>
                    </Row>
                </DraggableModal>
            </div>
        )
    }
}

export default PowerControl