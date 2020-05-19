import * as React from 'react'
import { Table, Button, Modal } from 'antd'

class MyShare extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '分享名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text): any => <span>{text}</span>
                },
                {
                    title: '类别',
                    dataIndex: 'leibie',
                    key: 'leibie'
                },
                {
                    title: '点赞数',
                    dataIndex: 'dianzan',
                    key: 'dianzan'
                },
                {
                    title: '分享时间',
                    dataIndex: 'time',
                    key: 'time'
                },
                {
                    title: '操作',
                    dataIndex: 'caozuo',
                    key: 'caozuo',
                    render: (text): any => <Button onClick={(): void => { this.deleteData() }} type="primary">{text}</Button>
                }
            ],
            dataSource: [
                {
                    key: '1',
                    name: '人员通讯录',
                    leibie: '行政',
                    dianzan: '45',
                    time: '2018.11.16',
                    caozuo: '删除'
                },
                {
                    key: '2',
                    name: '接口文档',
                    leibie: '技术',
                    dianzan: '45',
                    time: '2018.11.16',
                    caozuo: '删除'
                },
                {
                    key: '3',
                    name: '投标标书',
                    leibie: '文案',
                    dianzan: '32',
                    time: '2018.11.16',
                    caozuo: '删除'
                },
                {
                    key: '4',
                    name: '放假通知',
                    leibie: '行政',
                    dianzan: '45',
                    time: '2018.5.5',
                    caozuo: '删除'
                },
                {
                    key: '5',
                    name: '客户反馈',
                    leibie: '行政',
                    dianzan: '45',
                    time: '2017.8.2',
                    caozuo: '删除'
                }
            ]
        }
    }

    public delete = (): void => {
        const data = JSON.parse(JSON.stringify(this.state.dataSource))
        data.shift()
        this.setState((): any => ({
            dataSource: data
        }))
    }

    public deleteData = (): void => {
        Modal.confirm({
            title: '确定删除吗？',
            content: '',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',
            onCancel: (): void => { console.log('cancle') },
            onOk: (): void => {
                this.delete()
            }
        })
    }

    public render(): React.ReactElement {
        return (
            <div>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
            </div>
        )
    }
}

export default MyShare