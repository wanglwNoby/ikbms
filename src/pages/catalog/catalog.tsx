import * as React from 'react'
import { Tree, Row, Col, Input, Select, message } from 'antd'
import KdgManagePageHeader from '../../components/containers/kdgPageHeader/kdgPageHeader'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import formatTreeData from '../../utils/treeUtil'
import { _getCatalogTree } from '../../common/api/global'
import { _create, _modify, _delete, _getCatalogInfo, _move } from '../../common/api/catalog'
import styles from './catalog.module.less'

interface IState {
    catalogTree: ITreeData[];
    selectedCatalog: string[];
    visible: boolean;
    parentID: string;
    name: string;
    state: number;
    description: string;
    [key: string]: any;
}

class Catalog extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            catalogTree: [],
            selectedCatalog: [],
            visible: false,
            parentID: '',
            name: '',
            state: 0,
            description: ''
        }
    }

    public componentDidMount(): void {
        this.getCatalogTree()
    }

    public getCatalogTree = async (): Promise<void> => {
        const res: any = await _getCatalogTree()
        if (res && res.result) {
            this.setState({
                catalogTree: formatTreeData(res.data)
            })
        }
    }

    public onSelect = (keys: string[]): void => {
        this.setState({
            selectedCatalog: keys
        })
    }

    public handleInputChange = (key: string, e: any): void => {
        this.setState({
            [key]: e.target.value
        })
    }

    public handleSelectChange = (key: string, value: number): void => {
        this.setState({
            [key]: value
        })
    }

    public handleCreate = (): void => {
        if (this.state.selectedCatalog.length === 0) {
            message.error('请选择目录节点')
            return
        }
        this.setState({ visible: true })
    }

    // 确认
    public handleConfirm = (): void => {
        if (this.state.parentID === '') {
            this.creatCatalog()
        } else {
            this.modifyCatalog()
        }
    }

    // 创建
    public creatCatalog = async (): Promise<void> => {
        const res: any = await _create({
            name: this.state.name,
            parent_id: this.state.selectedCatalog[0],
            state: this.state.state,
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
            this.getCatalogTree()
        }
    }

    // 修改
    public modifyCatalog = async (): Promise<void> => {
        const res: any = await _modify({
            id: this.state.selectedCatalog[0],
            name: this.state.name,
            parent_id: this.state.parentID,
            state: this.state.state,
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
            this.getCatalogTree()
        }
    }

    public handleModify = (): void => {
        if (this.state.selectedCatalog.length === 0) {
            message.error('请选择需要修改的目录节点')
            return
        }
        this.getCatalogInfo()
    }

    public getCatalogInfo = async (): Promise<void> => {
        const res: any = await _getCatalogInfo({
            params: { id: this.state.selectedCatalog[0] }
        })
        if (res && res.result) {
            this.setState({
                parentID: res.data.parent_id,
                name: res.data.name,
                state: res.data.state,
                description: res.data.description
            }, (): void => { this.setState({ visible: true }) })
        }
    }

    // 删除
    public handleDelete = (): void => {
        if (this.state.selectedCatalog.length === 0) {
            message.error('请选择需要删除的目录节点')
            return
        }
        _delete({
            id: this.state.selectedCatalog[0]
        }).then((res: any): void => {
            if (res && res.result) {
                message.success('删除成功')
                this.setState({
                    selectedCatalog: []
                })
                this.getCatalogTree()
            }
        })
    }

    // 移动
    public onDrop = (info: any): void => {
        _move({
            id: info.dragNodesKeys[0],
            name: info.dragNode.props.title,
            parent_id: info.node.props.eventKey
        }).then((res: any): void => {
            if (res && res.result) {
                this.getCatalogTree()
            }
        })
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.catalogWrapper}>
                <KdgManagePageHeader
                    handleCreate={this.handleCreate}
                    handleModify={this.handleModify}
                    handleDelete={this.handleDelete}
                />
                {
                    this.state.catalogTree.length > 0 &&
                    <Tree.DirectoryTree
                        treeData={this.state.catalogTree}
                        defaultExpandAll
                        draggable
                        onDrop={this.onDrop}
                        onSelect={this.onSelect}
                    />
                }
                <DraggableModal
                    visible={this.state.visible}
                    title={this.state.parentID === '' ? '创建知识目录' : '更新知识目录'}
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

export default Catalog