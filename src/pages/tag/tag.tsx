import * as React from 'react'
import { Tag, Input, Tooltip, Icon } from 'antd'
import KdgManagePageHeader from '../../components/containers/kdgPageHeader/kdgPageHeader'
import styles from './tag.module.less'

class TagManage extends React.Component<any, any> {
    public textInput: Input

    constructor(props: any) {
        super(props)
        this.state = {
            tags: ['知识', '知识库', '科技', '学习', '培训', '考试', '机器学习', '人工智能', '电脑', '文库', '上传', '标签', '迪奥', '5g', 'success', '考核', '测试', '系统'],
            inputVisible: false,
            inputValue: ''
        }
    }

    public handleClose = (removedTag: any): void => {
        this.setState((prevstate: any): any => ({
            tags: prevstate.tags.filter((tag: any): boolean => tag !== removedTag)
        }))
    }

    public showInput = (): void => {
        this.setState({ inputVisible: true }, () => this.textInput.focus())
    }

    public handleInputChange = (e: any): void => {
        this.setState({ inputValue: e.target.value })
    }

    public handleInputConfirm = (): void => {
        const { inputValue } = this.state
        let { tags } = this.state
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue]
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: ''
        })
    }

    public render(): React.ReactElement {
        const { tags, inputVisible, inputValue } = this.state
        return (
            <div className={styles.tagWrapper}>
                <KdgManagePageHeader />
                {tags.map((tag: any, index: any) => {
                    const isLongTag = tag.length > 20
                    const tagElem = (
                        <Tag key={tag} closable={index !== 0} onClose={(): void => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    )
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : tagElem
                })}
                {inputVisible && (
                    <Input
                        ref={(input): void => { this.textInput = input }}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                        <Icon type="plus" />
                        新增
                    </Tag>
                )}
            </div>
        )
    }
}

export default TagManage