import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { AutoComplete, Icon, Dropdown, Menu, Input } from 'antd'
import { SelectValue } from 'antd/lib/select'
import { _autoCompleteList } from '../../../common/api/global'
import styles from './headerSearch.module.less'

interface IState {
    dataSource: React.ReactElement[];
    searchValue: SelectValue;
}

class HeaderSearch extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            dataSource: [],
            searchValue: ''
        }
    }

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
            searchValue: value
        })
        this.props.history.push({ pathname: '/kms', state: { keyword: value } })
    }

    // enter回车
    public handleEnterKey = (e: any): void => {
        if (e.nativeEvent.keyCode === 13 && this.state.dataSource.length === 0) {
            this.handleClick()
        }
    }

    // 点击放大镜搜索
    public handleClick = (): void => {
        this.props.history.push({ pathname: '/kms', state: { keyword: this.state.searchValue } })
    }

    public render(): React.ReactElement {
        const menu = (
            <Menu>
                <Menu.Item>
                    <span onClick={(): void => { console.log('进入高级搜索页') }}>
                        <Icon type="zoom-in" />
                        &nbsp;高级搜索
                    </span>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={(): void => { console.log('进入知识导航页') }}>
                        <Icon type="cluster" />
                        &nbsp;知识导航
                    </span>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={(): void => { console.log('进入知识图谱页') }}>
                        <Icon type="deployment-unit" />
                        &nbsp;知识图谱
                    </span>
                </Menu.Item>
            </Menu>
        )
        return (
            <React.Fragment>
                <AutoComplete
                    placeholder="请输入搜索关键词"
                    className={styles.autoComplete}
                    dataSource={this.state.dataSource}
                    onSearch={this.handleSearch}
                    onSelect={this.handleSelect}
                    value={this.state.searchValue}
                    onChange={(value: SelectValue): void => this.setState({ searchValue: value })}
                >
                    <Input onKeyDown={this.handleEnterKey} suffix={<Icon type="search" onClick={this.handleClick} />} />
                </AutoComplete>
                <Dropdown overlay={menu} placement="bottomCenter">
                    <Icon type="ellipsis" className={styles.icon} />
                </Dropdown>
                <Icon
                    type="question-circle"
                    className={styles.icon}
                    title="我要提问"
                    onClick={(): void => this.props.history.push('/question')}
                />
            </React.Fragment>

        )
    }
}

export default withRouter(HeaderSearch)