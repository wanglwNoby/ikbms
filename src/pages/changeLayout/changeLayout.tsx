import * as React from 'react'
import { WidthProvider, Responsive, Layout } from 'react-grid-layout'
import echarts from 'echarts'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { Button, message, Icon, Row, Col, Select, Input, Card, Drawer, List, Checkbox } from 'antd'
import DraggableModal from '../../components/cores/draggableModal/draggableModal'
import { _userPartList, _saveLayout, _usedPartList, _allUserLayout, _userLayoutByLayoutId, _deleteUserLayout } from '../../common/api/changeLayout'
import layoutChangeToComponent from '../../utils/layoutChangeToComponent'
import styles from './changeLayout.module.less'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

interface IState {
    operateType: number; // 1默认 修改，2新建
    visible: boolean;
    drawerVisible: boolean;
    allLayouts: any[]; // 所有布局信息
    allPartList: Layout[]; // 所有的部件列表
    unUsedPart: Layout[]; // 未使用的部件
    layouts: Layout[]; // 当前显示的布局
    usedLayoutID: string; // 正在使用的布局ID
    newLayoutTitle: string; // 创建新布局的名称
    toBeAddedPart: CheckboxValueType[]; // 将要添加的模块
}

class ChangeLayout extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            operateType: 1,
            visible: false,
            drawerVisible: false,
            allLayouts: [],
            allPartList: [],
            unUsedPart: [],
            layouts: [],
            usedLayoutID: '',
            newLayoutTitle: '',
            toBeAddedPart: []
        }
    }

    public componentDidMount(): void {
        this.getAllPartList()
        this.getAllUserLayout()
        this.getUsedPartList()
    }

    // 获取该用户拥有的所有部件
    public getAllPartList = async (): Promise<void> => {
        const res: any = await _userPartList()
        if (res && res.result) {
            this.setState({
                allPartList: res.data
            })
        }
    }

    // 用户拥有的所有布局
    public getAllUserLayout = async (): Promise<void> => {
        const res: any = await _allUserLayout()
        if (res && res.result && res.data.length > 0) {
            const usingLayout = res.data.find((item: any): boolean => (
                item.using === 1
            ))
            this.setState({
                allLayouts: res.data,
                usedLayoutID: usingLayout.layout_id,
                newLayoutTitle: usingLayout.title
            })
        }
    }

    // 获取用户正在使用的布局，没有需先设置一个
    public getUsedPartList = async (): Promise<void> => {
        const res: any = await _usedPartList()
        if (res && res.result) {
            this.setState({
                layouts: res.data
            })
        } else {
            message.warning('暂无布局，请先自定义一个吧')
            this.getUserPartList()
        }
    }

    // 获取用户拥有的模块,初始化布局
    public getUserPartList = async (): Promise<void> => {
        const res: any = await _userPartList()
        if (res && res.result) {
            this.setState({
                layouts: res.data,
                operateType: 2,
                usedLayoutID: '',
                newLayoutTitle: ''
            })
        }
    }

    public layoutChange = (currentLayout: Layout[]): void => {
        this.setState({
            layouts: currentLayout
        })
    }

    public deleteLayoutItem = (id: string): void => {
        const index = this.state.layouts.findIndex((item: any): boolean => (item.i === id))
        this.state.layouts.splice(index, 1)
        this.setState((prevState: IState): { layouts: Layout[] } => ({
            layouts: prevState.layouts
        }))
    }

    // 选择布局
    public handleChange = (value: string): void => {
        this.setState((prevState: IState): { usedLayoutID: string; operateType: number; newLayoutTitle: any } => ({
            usedLayoutID: value,
            operateType: 1,
            newLayoutTitle: prevState.allLayouts.find((item: any): boolean => (
                item.layout_id === value
            )).title
        }))
        this.getUserLayoutByLayoutId(value)
    }

    // 切换布局
    public getUserLayoutByLayoutId = async (value: string): Promise<void> => {
        const res: any = await _userLayoutByLayoutId({
            params: {
                layout_id: value
            }
        })
        if (res && res.result) {
            this.setState({
                layouts: res.data
            })
        }
    }

    public handleInputChange = (e: any): void => {
        this.setState({
            newLayoutTitle: e.target.value
        })
    }

    public handleOk = (): void => {
        if (this.state.newLayoutTitle.replace(/^\s+|\s+$/g, '') === '') {
            message.warning('请输入正确的布局名称')
            return
        }
        let data: ISaveLayout
        switch (this.state.operateType) {
            case 1:
                data = {
                    layout_id: this.state.usedLayoutID,
                    title: this.state.newLayoutTitle,
                    layouts: JSON.stringify(this.state.layouts)
                }
                break
            case 2:
                data = {
                    title: this.state.newLayoutTitle,
                    layouts: JSON.stringify(this.state.layouts)
                }
                break
            default:
                break
        }
        this.saveLayout(data)
    }

    public saveLayout = async (data: ISaveLayout): Promise<void> => {
        const res: any = await _saveLayout(data)
        if (res && res.result) {
            this.setState({
                visible: false,
                operateType: 1
            })
            this.componentDidMount()
        }
    }

    public deleteLayout = async (): Promise<void> => {
        const res: any = await _deleteUserLayout({
            layout_id: this.state.usedLayoutID
        })
        if (res && res.result) {
            message.success('删除成功')
            this.componentDidMount()
        }
    }

    // 添加模块
    public openDrawer = (): void => {
        const unUsedPart: Layout[] = []
        console.log(this.state.allPartList)
        this.state.allPartList.forEach((listItem: Layout): void => {
            const index = this.state.layouts.findIndex((item: Layout): boolean => (
                item.i === listItem.i
            ))
            if (index === -1) {
                unUsedPart.push(listItem)
            }
        })
        this.setState({
            unUsedPart,
            drawerVisible: true
        })
    }

    public checkChange = (checkedValues: CheckboxValueType[]): void => {
        this.setState({
            toBeAddedPart: checkedValues
        })
    }

    public drawerConfirm = (): void => {
        const newLayout: Layout[] = []
        this.state.toBeAddedPart.forEach((partID: CheckboxValueType): void => {
            this.state.unUsedPart.forEach((item: Layout): void => {
                if (item.i === partID) {
                    newLayout.push(item)
                }
            })
        })
        this.layoutChange([...this.state.layouts, ...newLayout])
        this.setState({
            drawerVisible: false
        })
    }

    public chartResize = (layout: Layout[], oldItem: Layout): void => {
        if (oldItem.i === '6210000000000000002') {
            console.log(layout)
            const chart = document.querySelectorAll('#wordCloud') as NodeListOf<HTMLCanvasElement>
            echarts.getInstanceByDom(chart[0]).resize()
        }
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <Row className={styles.row}>
                    <Col span={2}>选择布局</Col>
                    <Col span={4}>
                        <Select style={{ width: 200 }} value={this.state.usedLayoutID} onChange={this.handleChange}>
                            {
                                this.state.allLayouts.map((item: any): React.ReactElement => (
                                    <Select.Option key={item.layout_id} value={item.layout_id}>
                                        {item.title}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={this.openDrawer}>添加模块</Button>
                        <Button type="primary" onClick={(): void => this.setState({ visible: true })}>保存</Button>
                        {
                            this.state.usedLayoutID !== '' &&
                            <Button type="primary" onClick={this.deleteLayout}>删除</Button>
                        }
                        {
                            this.state.operateType === 1 &&
                            <Button type="primary" onClick={this.getUserPartList}>新建</Button>
                        }
                    </Col>
                </Row>
                {
                    this.state.layouts.length > 0 &&
                    <ResponsiveReactGridLayout
                        className={styles.layout}
                        rowHeight={30}
                        cols={{ lg: 20, md: 8, sm: 6, xs: 4, xxs: 2 }}
                        layouts={{ lg: this.state.layouts }}
                        onLayoutChange={this.layoutChange}
                        onResize={this.chartResize}
                    >
                        {
                            layoutChangeToComponent(this.state.layouts).map((item: ILayoutsItem): React.ReactElement => (
                                <Card
                                    key={item.i}
                                    className={styles.card}
                                    title={item.title}
                                    bordered={false}
                                    extra={<Icon type="close" onClick={this.deleteLayoutItem.bind(this, item.i)} />}
                                >
                                    {item.component}
                                </Card>
                            ))
                        }
                    </ResponsiveReactGridLayout>
                }
                <DraggableModal
                    visible={this.state.visible}
                    title="布局信息"
                    onOk={this.handleOk}
                    onCancel={(): void => this.setState({ visible: false })}
                >
                    <Row className={styles.row}>
                        <Col span={8}>布局名称：</Col>
                        <Col span={16}>
                            <Input placeholder="请输入新名称" value={this.state.newLayoutTitle} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </DraggableModal>
                <Drawer
                    title="当前可添加模块"
                    destroyOnClose
                    placement="right"
                    closable={false}
                    className={styles.drawer}
                    width="400"
                    visible={this.state.drawerVisible}
                    onClose={(): void => this.setState({ drawerVisible: false })}
                >
                    <Checkbox.Group style={{ width: '100%' }} onChange={this.checkChange}>
                        <List
                            split={false}
                            dataSource={layoutChangeToComponent(this.state.unUsedPart)}
                            renderItem={(item: ILayoutsItem): React.ReactElement => (
                                <List.Item>
                                    <Checkbox value={item.i}>{item.title}</Checkbox>
                                </List.Item>
                            )}
                        />
                    </Checkbox.Group>
                    <div className={styles.drawerFooter}>
                        <Button style={{ marginRight: 8 }} onClick={(): void => this.setState({ drawerVisible: false })}>取消</Button>
                        <Button type="primary" onClick={this.drawerConfirm}>确定</Button>
                    </div>
                </Drawer>
            </React.Fragment>
        )
    }
}

export default ChangeLayout