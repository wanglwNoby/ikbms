import * as React from 'react'
import { Row, Col, Divider, Button, Tree, message } from 'antd'
import { _getCatalogTree, _getClassifyTree } from '../../../common/api/global'
import formatTreeData from '../../../utils/treeUtil'
import styles from './kdgCatalogclassify.module.less'

interface IProps {
    confirm: (state: IClassifyState) => void;
}

interface IClassifyState {
    selectedCatalog: string[];
    checkedClassify: string[] | { checked: string[]; halfChecked: string[] };
}

interface IState {
    catalogTree: ITreeData[];
    classifyTree: ITreeData[];
    classifyState: IClassifyState;
}

class KdgCatalogclassify extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            catalogTree: [],
            classifyTree: [],
            classifyState: {
                selectedCatalog: [],
                checkedClassify: []
            }
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
                catalogTree: formatTreeData(res.data)
            })
        }
    }

    public getClassifyTree = async (): Promise<void> => {
        const res: any = await _getClassifyTree()
        if (res && res.result) {
            this.setState({
                classifyTree: formatTreeData(res.data)
            })
        }
    }

    public onSelect = (keys: string[]): void => {
        this.setState((prevstate: IState) => ({
            classifyState: { ...prevstate.classifyState, selectedCatalog: keys }
        }))
    }

    public onCheck = (checkedKeys: string[] | { checked: string[]; halfChecked: string[] }): void => {
        this.setState((prevstate: IState) => ({
            classifyState: { ...prevstate.classifyState, checkedClassify: checkedKeys }
        }))
    }

    public handleClick = (): void => {
        if (this.state.classifyState.selectedCatalog === []) {
            message.error('请选择知识目录')
            return
        }
        this.props.confirm(this.state.classifyState)
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <Row type="flex" className={styles.row}>
                    <Col span={12}>
                        {
                            this.state.catalogTree.length > 0 &&
                            <Tree.DirectoryTree
                                treeData={this.state.catalogTree}
                                defaultExpandAll
                                onSelect={this.onSelect}
                            />
                        }
                    </Col>
                    <Divider type="vertical" />
                    <Col span={11}>
                        {
                            this.state.classifyTree.length > 0 &&
                            <Tree
                                checkable
                                selectable={false}
                                defaultExpandAll
                                treeData={this.state.classifyTree}
                                onCheck={this.onCheck}
                            // checkedKeys={this.state.checkedKeys}
                            />
                        }
                    </Col>
                </Row>
                <div className={styles.drawerFooter}>
                    <Button type="primary" onClick={this.handleClick}>确定</Button>
                </div>
            </React.Fragment>
        )
    }
}

export default KdgCatalogclassify