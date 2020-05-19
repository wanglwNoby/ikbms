import * as React from 'react'
import { Link } from 'react-router-dom'
import { Layout, AutoComplete, Button, Drawer, Divider, Radio, Empty, message, Card, List, PageHeader } from 'antd'
import { SelectValue } from 'antd/lib/select'
import { RadioChangeEvent } from 'antd/lib/radio'
import HotSearch from '../../components/displays/hotSearch/hotSearch'
import KnowledgeList from '../../components/cores/knowledgeList/knowledgeList'
import KdgCatalogclassify from '../../components/containers/kdgCatalogclassify/kdgCatalogclassify'
import { _autoCompleteList } from '../../common/api/global'
import { _retrievalKdg, _relatedSearch } from '../../common/api/kdgRetrieval'
import styles from './kdgRetrieval.module.less'

interface IClassifyState {
    selectedCatalog: string[];
    checkedClassify: string[] | { checked: string[]; halfChecked: string[] };
}

interface IFilterCondition { // 过滤条件
    type: number;
    ext: string;
    time: number;
    range: number;
    class_id: string;
    business_id: string;
    size: number;
}

interface IState {
    drawerVisible: boolean; // 抽屉开关
    dataSource: React.ReactElement[]; // 获取的自动提词
    keyword: SelectValue; // 输入框的值
    filterCondition: IFilterCondition; // 过滤条件
    page: number; // 页码
    refineResults: any; // 检索结果
    relatedSearchResults: any; // 相关搜索结果
}

const list: any[] = [{
    name: '知识种类', value: 'type', children: [{ name: '不限', value: 0 }, { name: '公告', value: 1 }, { name: '文章', value: 10 }, { name: '文库', value: 20 }, { name: '百科', value: 30 }, { name: 'FAQ', value: 40 }, { name: '论坛', value: 50 }, { name: '问题库', value: 60 }]
}, {
    name: '文件类型', value: 'ext', children: [{ name: '不限', value: '' }, { name: 'Word', value: '.doc .docx' }, { name: 'Excel', value: '.xls .xlsx' }, { name: 'PPT', value: '.ppt .pptx' }, { name: 'PDF', value: '.pdf' }, { name: '图片', value: '.png .gif .bmp .jpg .jpeg' }, { name: '音频', value: '.wav .mp3 .wma' }, { name: '视频', value: '.avi .rmvb .swf .flv' }]
}, {
    name: '发布时间', value: 'time', children: [{ name: '不限', value: 0 }, { name: '最近一天', value: 1 }, { name: '最近一周', value: 2 }, { name: '最近一月', value: 3 }, { name: '最近一年', value: 4 }]
}, {
    name: '匹配范围', value: 'range', children: [{ name: '不限', value: 0 }, { name: '仅标题', value: 1 }, { name: '标题+内容', value: 2 }, { name: '标题+内容+标签', value: 3 }, { name: '标题+内容+标签+描述', value: 4 }]
}]

class KdgRetrieval extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            drawerVisible: false,
            dataSource: [],
            keyword: '',
            filterCondition: { type: 0, ext: '', time: 0, range: 0, class_id: '', business_id: '', size: 5 },
            page: 0,
            refineResults: {},
            relatedSearchResults: []
        }
    }

    public componentDidMount(): void {
        if (this.props.location.state.keyword !== '') {
            this.setState({
                keyword: this.props.location.state.keyword
            }, (): void => {
                this.getRetrievalKdg(0)
                this.getRelatedSearch()
            })
        }
    }

    public componentWillUpdate(nextProps: any): void {
        if (this.props.location !== nextProps.location) {
            this.setState({
                keyword: nextProps.location.state.keyword
            }, (): void => {
                this.getRetrievalKdg(0)
                this.getRelatedSearch()
            })
        }
    }

    // 点击button按钮
    public handleClick = (): void => {
        if (this.state.keyword === '') {
            message.warning('请输入关键词')
        } else {
            this.getRetrievalKdg(0)
            this.getRelatedSearch()
        }
    }

    // 自动提词
    public handleSearch = (value: string): void => {
        _autoCompleteList({
            params: { text: value }
        }).then((res: any): void => {
            if (res && res.result) {
                this.setDataSource(res.data)
            }
        })
    }

    public setDataSource = (data: any): void => {
        const options: React.ReactElement[] = []
        data.map((item: any): number => (
            options.push(
                <AutoComplete.Option key={item.text} value={item.text}>
                    {item.text}
                </AutoComplete.Option>
            )
        ))
        this.setState({
            dataSource: options
        })
    }

    // 选择后自动进行搜索
    public handleSelect = (value: SelectValue): void => {
        this.setState({
            keyword: value
        }, (): void => {
            this.getRetrievalKdg(0)
            this.getRelatedSearch()
        })
    }

    public radioChange = (type: string, e: RadioChangeEvent): void => {
        const condition: { [key: string]: string | number } = {}
        switch (type) {
            case '知识种类':
                condition.type = e.target.value
                break
            case '文件类型':
                condition.ext = e.target.value
                break
            case '发布时间':
                condition.time = e.target.value
                break
            case '匹配范围':
                condition.range = e.target.value
                break
            default:
                break
        }
        this.setState((prevState: IState): { filterCondition: IFilterCondition } => ({
            filterCondition: Object.assign(prevState.filterCondition, condition)
        }), (): void => { this.getRetrievalKdg(0) })
    }

    // 调用接口，检索知识
    public getRetrievalKdg = async (page: number): Promise<void> => {
        this.setState({ page })
        const res: any = await _retrievalKdg({
            params: {
                keyword: this.state.keyword,
                ...this.state.filterCondition,
                skip: page * this.state.filterCondition.size
            }
        })
        if (res && res.result) {
            this.setState({
                refineResults: res.data
            })
        }
    }

    // 获取相关搜索
    public getRelatedSearch = async (): Promise<void> => {
        const res: any = await _relatedSearch({
            params: {
                text: this.state.keyword
            }
        })
        if (res && res.result) {
            this.setState({
                relatedSearchResults: res.data
            })
        }
    }

    // 归类确认
    public classifyConfirm = (classifyState: IClassifyState): void => {
        const condition = {
            class_id: classifyState.selectedCatalog.toString(),
            business_id: classifyState.checkedClassify.toString()
        }
        this.setState((prevState: IState): { drawerVisible: boolean; filterCondition: IFilterCondition } => ({
            drawerVisible: false,
            filterCondition: Object.assign(prevState.filterCondition, condition)
        }), (): void => { this.getRetrievalKdg(0) })
    }

    // 跳页
    public pageChange = (page: number): void => {
        this.getRetrievalKdg(page - 1)
    }

    public render(): React.ReactElement {
        return (
            <Layout className={styles.layout}>
                <Layout.Header className={styles.header}>
                    <AutoComplete
                        size="large"
                        placeholder="请输入搜索关键词"
                        className={styles.autoComplete}
                        value={this.state.keyword}
                        onChange={(value: SelectValue): void => this.setState({ keyword: value })}
                        dataSource={this.state.dataSource}
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                    />
                    <Button type="primary" size="large" icon="search" style={{ width: '60px' }} onClick={this.handleClick} />
                </Layout.Header>
                <Layout className={styles.contentLayout}>
                    <Layout.Content className={styles.content}>
                        <div className={styles.filter}>
                            <PageHeader title="知识筛选：" className={styles.pageHeader} />
                            {
                                list.map((item: any): React.ReactElement => (
                                    <React.Fragment key={item.name}>
                                        <div className={styles.filterCondition}>
                                            <span className={styles.conditionType}>
                                                {item.name}
                                                ：
                                            </span>
                                            <Radio.Group value={this.state.filterCondition[item.value]} onChange={this.radioChange.bind(this, item.name)}>
                                                {
                                                    item.children.map((childItem: any): React.ReactElement => (
                                                        <Radio key={childItem.name} value={childItem.value}>{childItem.name}</Radio>
                                                    ))
                                                }
                                            </Radio.Group>
                                        </div>
                                        <Divider dashed style={{ margin: 0 }} />
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className={styles.searchResult}>
                            {
                                this.state.refineResults.files && this.state.refineResults.files.length > 0 ?
                                    <KnowledgeList
                                        isRefineResults
                                        data={this.state.refineResults.files}
                                        total={this.state.refineResults.total}
                                        current={this.state.page + 1}
                                        pageChange={this.pageChange}
                                    /> :
                                    <Empty />
                            }
                        </div>
                        <Button type="primary" icon="right" className={styles.showDrawerButton} onClick={(): void => this.setState({ drawerVisible: true })} />
                        <Drawer
                            title="目录检索"
                            placement="left"
                            closable={false}
                            width={600}
                            getContainer={false}
                            style={{ position: 'absolute' }}
                            bodyStyle={{ height: 'calc(100% - 108px)' }}
                            visible={this.state.drawerVisible}
                            onClose={(): void => this.setState({ drawerVisible: false })}
                        >
                            <KdgCatalogclassify confirm={this.classifyConfirm} />
                        </Drawer>
                    </Layout.Content>
                    <Layout.Sider className={styles.sider}>
                        <Card
                            bordered={false}
                            title="相关搜索"
                        >
                            <List
                                dataSource={this.state.relatedSearchResults}
                                renderItem={(item: any): React.ReactElement => (
                                    <List.Item>
                                        <Link to={{ pathname: '/kms', state: { keyword: item.text } }}>
                                            {item.text}
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </Card>
                        <Divider />
                        <Card
                            bordered={false}
                            title="热门搜索"
                        >
                            <HotSearch />
                        </Card>
                    </Layout.Sider>
                </Layout>
            </Layout>
        )
    }
}

export default KdgRetrieval