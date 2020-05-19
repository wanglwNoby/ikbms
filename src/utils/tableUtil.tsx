import * as React from 'react'
import moment from 'moment'
import { Input, InputNumber, Form } from 'antd'

interface IDataItem {
    col_id: string;
    display: string;
    col_name: string;
    view_width: number;
}

export const EditableContext = React.createContext(Form.createFormField)

// createContext.consumer
export function EditableCell(props: any): React.ReactElement {
    const setInputType = (type: string): any => {
        switch (type) {
            case 'security_level':
            case 'share_mode':
                return <InputNumber min={0} max={3} style={{ width: '100%' }} />
            default:
                return <Input />
        }
    }

    return (
        <EditableContext.Consumer>
            {
                ({ getFieldDecorator }): React.ReactElement => {
                    const { editing, dataIndex, title, record, children, ...restProps } = props
                    return (
                        <td {...restProps}>
                            {
                                editing ?
                                    <Form.Item style={{ margin: 0 }}>
                                        {getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `请输入${title}!`
                                            }],
                                            initialValue: record[dataIndex]
                                        })(setInputType(dataIndex))}
                                    </Form.Item> : children
                            }
                        </td>
                    )
                }
            }
        </EditableContext.Consumer>
    )
}

// // 获取表格宽度(弃用)
// export function setWidth(columns: IColumns[]): number {
//     let width = 0
//     columns.forEach((item: IColumns): void => {
//         width += item.width
//     })
//     return width
// }

// format表格头
export function formatColumns(data: IDataItem[]): IColumns[] {
    const editableColumn = ['title', 'tags', 'security_level', 'share_mode']

    // render是否审核
    const renderVerify = (text: number): string => {
        switch (text) {
            case 0:
                return '未审核'
            case 1:
                return '已审核'
            case 2:
                return '审核未通过'
            default:
                return ''
        }
    }

    // render是否发布
    const renderPublished = (text: number): string => {
        switch (text) {
            case 0:
                return '未发布'
            case 1:
                return '已发布'
            default:
                return ''
        }
    }

    // render安全级别
    const renderSecurityLevel = (text: number): string => {
        switch (text) {
            case 0:
                return '公开'
            case 1:
                return '秘密'
            case 2:
                return '机密'
            case 3:
                return '绝密'
            default:
                return ''
        }
    }

    // render共享方式
    const renderShareMode = (text: number): string => {
        switch (text) {
            case 0:
                return '不限'
            case 1:
                return '部门'
            case 2:
                return '业务'
            case 3:
                return '集团'
            default:
                return ''
        }
    }

    // render来源
    const renderSource = (text: number): string => {
        switch (text) {
            case 0:
                return '未指定'
            case 10:
                return '直接提问'
            case 20:
                return '搜索发起'
            case 30:
                return '知识浏览发起'
            case 40:
                return '论坛提起'
            default:
                return ''
        }
    }

    // render等级
    const renderlevel = (text: number): string => {
        switch (text) {
            case 1:
                return '一般'
            case 2:
                return '重要'
            case 3:
                return '非常重要'
            default:
                return ''
        }
    }

    // render是否解决
    const renderAnswerMode = (text: number): string => {
        switch (text) {
            case 0:
                return '未解决'
            case 1:
                return '解决'
            default:
                return ''
        }
    }

    // render提问时间
    const renderCreateTime = (text: string): string => {
        if (text !== '') {
            return moment(text, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
        }
        return ''
    }

    // render归一状态
    const renderMergeMode = (text: number): string => {
        switch (text) {
            case 0:
                return '无'
            case 1:
                return '有合并'
            case 2:
                return '被合并(重复)'
            default:
                return ''
        }
    }

    // render状态
    const renderState = (text: number): string => {
        switch (text) {
            case 0:
                return '禁用'
            case 1:
                return '启用'
            default:
                return ''
        }
    }

    const columns: IColumns[] = []
    data.forEach((item: IDataItem): void => {
        columns.push({
            key: item.col_id,
            title: item.display,
            dataIndex: item.col_name,
            width: item.view_width,
            ellipsis: true,
            editable: editableColumn.includes(item.col_name),
            render: (text: any): string => {
                switch (item.col_name) {
                    case 'verify':
                        return renderVerify(text)
                    case 'published':
                        return renderPublished(text)
                    case 'security_level':
                        return renderSecurityLevel(text)
                    case 'share_mode':
                        return renderShareMode(text)
                    case 'source':
                        return renderSource(text)
                    case 'level':
                        return renderlevel(text)
                    case 'answer_mode':
                        return renderAnswerMode(text)
                    case 'create_time':
                    case 'begin_time':
                    case 'expire_time':
                        return renderCreateTime(text)
                    case 'merge_mode':
                        return renderMergeMode(text)
                    case 'state':
                    case 'create':
                    case 'delete':
                    case 'modify':
                    case 'view':
                    case 'thumb':
                    case 'discuss':
                    case 'download':
                        return renderState(text)
                    default:
                        return text
                }
            }
        })
    })
    return columns
}