import * as React from 'react'
import { Tree, Row, Col, Select, Button, Input, message } from 'antd'
import KdgManagePageHeader from '../../components/containers/kdgPageHeader/kdgPageHeader'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import formatTreeData from '../../utils/treeUtil'
import { _getDimensionList, _getClassifyTree, _createDimension, _getDimensionInfo, _modifyDimension, _deleteDimension, _createClassify, _getClassifyInfo, _modifyClassify, _deleteClassify, _moveClassify } from '../../common/api/classify'
import styles from './classify.module.less'

interface IDimensionList {
    id: string;
    name: string;
}

interface IState {
    dimensionList: IDimensionList[]; // 维度列表
    dimensionID: string; // 当前选择的维度ID
    classifyTree: ITreeData[];
    selectedclassify: string[];
    operateType: number;
    visible: boolean;
    parentID: string;
    name: string;
    state: number;
    description: string;
    [key: string]: any;
}

class Classify extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            dimensionList: [],
            dimensionID: '',
            classifyTree: [],
            selectedclassify: [],
            operateType: -1,
            visible: false,
            parentID: '',
            name: '',
            state: 0,
            description: ''
        }
    }

    public componentDidMount(): void {
        this.getDimensionList()
    }

    public getDimensionList = async (): Promise<void> => {
        const res: any = await _getDimensionList()
        if (res && res.result) {
            this.setState({
                dimensionList: res.data
            })
        }
    }

    public getClassifyTree = async (): Promise<void> => {
        const res: any = await _getClassifyTree({
            params: { dimension_id: this.state.dimensionID }
        })
        if (res && res.result) {
            this.setState({
                classifyTree: formatTreeData(res.data)
            })
        }
    }

    public handleSelectChange = (key: string, value: number | string): void => {
        this.setState({
            [key]: value
        }, (): void => {
            if (key === 'dimensionID') {
                this.getClassifyTree()
            }
        })
    }

    public handleInputChange = (key: string, e: any): void => {
        this.setState({
            [key]: e.target.value
        })
    }

    public onSelect = (keys: string[]): void => {
        this.setState({
            selectedclassify: keys
        })
    }

    public handleClickUpdateDimension = (): void => {
        if (this.state.dimensionID === '') {
            message.warning('请先选择维度')
            return
        }
        _getDimensionInfo({
            params: { id: this.state.dimensionID }
        }).then((res: any): void => {
            if (res && res.result) {
                this.setState({
                    visible: true,
                    operateType: 1,
                    name: res.data.name,
                    state: res.data.state,
                    description: res.data.description
                })
            }
        })
    }

    // 删除维度
    public handleClickDeleteDimension = (): void => {
        if (this.state.dimensionID === '') {
            message.warning('请先选择维度')
            return
        }
        _deleteDimension({ id: this.state.dimensionID }).then((res: any): void => {
            if (res && res.result) {
                message.success('删除成功')
                this.setState({
                    dimensionID: '',
                    classifyTree: [],
                    selectedclassify: []
                })
                this.getDimensionList()
            }
        })
    }

    public handleConfirm = (): void => {
        switch (this.state.operateType) {
            case 0:
                this.createDimension()
                break
            case 1:
                this.updateDimension()
                break
            case 2:
                this.createClassiy()
                break
            case 3:
                this.modifyClassify()
                break
            default:
                break
        }
    }

    // 新建维度
    public createDimension = async (): Promise<void> => {
        const res: any = await _createDimension({
            name: this.state.name,
            state: this.state.state,
            deleted: 0,
            desc: this.state.description
        })
        if (res && res.result) {
            message.success('创建成功')
            this.setState({
                visible: false,
                name: '',
                state: 0,
                description: ''
            })
            this.getDimensionList()
        }
    }

    // 更新维度
    public updateDimension = async (): Promise<void> => {
        const res: any = await _modifyDimension({
            id: this.state.dimensionID,
            name: this.state.name,
            state: this.state.state,
            deleted: 0,
            desc: this.state.description
        })
        if (res && res.result) {
            message.success('更新成功')
            this.setState({
                visible: false,
                name: '',
                state: 0,
                description: ''
            })
            this.getDimensionList()
            this.getClassifyTree()
        }
    }

    // 创建分类
    public createClassiy = async (): Promise<void> => {
        const res: any = await _createClassify({
            name: this.state.name,
            parent_id: this.state.selectedclassify[0],
            dimension_id: this.state.dimensionID,
            state: this.state.state,
            deleted: 0,
            desc: this.state.description
        })
        if (res && res.result) {
            message.success('创建成功')
            this.setState({
                visible: false,
                name: '',
                state: 0,
                description: ''
            })
            this.getClassifyTree()
        }
    }

    // 更新分类
    public modifyClassify = async (): Promise<void> => {
        const res: any = await _modifyClassify({
            id: this.state.selectedclassify[0],
            name: this.state.name,
            parent_id: this.state.parentID,
            dimension_id: this.state.dimensionID,
            state: this.state.state,
            deleted: 0,
            desc: this.state.description
        })
        if (res && res.result) {
            message.success('修改成功')
            this.setState({
                visible: false,
                parentID: '',
                name: '',
                state: 0,
                description: ''
            })
            this.getClassifyTree()
        }
    }

    public handleCreate = (): void => {
        if (this.state.selectedclassify.length === 0) {
            message.error('请选择分类节点')
            return
        }
        this.setState({
            visible: true,
            operateType: 2
        })
    }

    public handleModify = (): void => {
        if (this.state.selectedclassify.length === 0) {
            message.error('请选择分类节点')
            return
        }
        this.getClassifyInfo()
    }

    public getClassifyInfo = async (): Promise<void> => {
        const res: any = await _getClassifyInfo({
            params: { id: this.state.selectedclassify[0] }
        })
        if (res && res.result) {
            this.setState({
                operateType: 3,
                parentID: res.data.parent_id,
                name: res.data.name,
                state: res.data.state,
                description: res.data.description
            }, (): void => { this.setState({ visible: true }) })
        }
    }

    public handleDelete = (): void => {
        if (this.state.selectedclassify.length === 0) {
            message.error('请选择分类节点')
            return
        }
        _deleteClassify({
            id: this.state.selectedclassify[0]
        }).then((res: any): void => {
            if (res && res.result) {
                message.success('删除成功')
                this.setState({
                    selectedclassify: []
                })
                this.getClassifyTree()
            }
        })
    }

    // 移动
    public onDrop = (info: any): void => {
        _moveClassify({
            id: info.dragNodesKeys[0],
            name: info.dragNode.props.title,
            parent_id: info.node.props.eventKey,
            dimension_id: this.state.dimensionID
        }).then((res: any): void => {
            if (res && res.result) {
                this.getClassifyTree()
            }
        })
    }

    public render(): React.ReactElement {
        const switchOperateType = (): string => {
            switch (this.state.operateType) {
                case 0:
                    return '创建维度'
                case 1:
                    return '更新维度'
                case 2:
                    return '创建种类'
                case 3:
                    return '更新维度'
                default:
                    return '创建维度'
            }
        }

        return (
            <div className={styles.classifyWrapper}>
                <KdgManagePageHeader
                    handleCreate={this.handleCreate}
                    handleModify={this.handleModify}
                    handleDelete={this.handleDelete}
                />
                <Row className={styles.row} gutter={16}>
                    <Col span={2}>选择维度：</Col>
                    <Col span={3}>
                        <Select value={this.state.dimensionID} onChange={this.handleSelectChange.bind(this, 'dimensionID')} style={{ width: '100%' }}>
                            {
                                this.state.dimensionList.map((item: IDimensionList): React.ReactElement => (
                                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Button type="primary" onClick={(): void => this.setState({ operateType: 0, visible: true })}>新建维度</Button>
                    <Button type="primary" style={{ marginLeft: 16 }} onClick={this.handleClickUpdateDimension}>更新维度</Button>
                    <Button type="primary" style={{ marginLeft: 16 }} onClick={this.handleClickDeleteDimension}>删除维度</Button>
                </Row>
                {
                    this.state.classifyTree.length > 0 &&
                    <Tree.DirectoryTree
                        treeData={this.state.classifyTree}
                        defaultExpandAll
                        draggable
                        onDrop={this.onDrop}
                        onSelect={this.onSelect}
                    />
                }
                <DraggableModal
                    visible={this.state.visible}
                    title={switchOperateType()}
                    width={600}
                    onOk={this.handleConfirm}
                    onCancel={(): void => this.setState({ visible: false })}
                >
                    <Row className={styles.row}>
                        <Col span={6}>名称：</Col>
                        <Col span={18}>
                            <Input placeholder="请输入名称" value={this.state.name} onChange={this.handleInputChange.bind(this, 'name')} />
                        </Col>
                    </Row>
                    <Row className={styles.row} style={{ marginTop: '16px' }}>
                        <Col span={6}>状态：</Col>
                        <Col span={18}>
                            <Select style={{ width: '100%' }} value={this.state.state} onChange={this.handleSelectChange.bind(this, 'state')}>
                                <Select.Option value={0}>正常</Select.Option>
                                <Select.Option value={1}>禁用</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '16px' }}>
                        <Col span={6}>描述：</Col>
                        <Col span={18}>
                            <Input.TextArea
                                autoSize={{ minRows: 4, maxRows: 6 }}
                                value={this.state.description}
                                onChange={this.handleInputChange.bind(this, 'description')}
                            />
                        </Col>
                    </Row>
                </DraggableModal>
            </div>
        )
    }
}

export default Classify