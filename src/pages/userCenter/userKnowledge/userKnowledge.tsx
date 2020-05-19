import * as React from 'react'
import { Table, Button, Input } from 'antd'

class UserKnowledge extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            columns: [
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text): any => <span style={{ color: '#1890ff' }}>{text}</span>
                },
                {
                    title: '标签',
                    dataIndex: 'biaoqian',
                    key: 'biaoqian'
                },
                {
                    title: '大小',
                    dataIndex: 'daxiao',
                    key: 'daxiao'
                },
                {
                    title: '创建时间',
                    dataIndex: 'time',
                    key: 'time'
                },
                {
                    title: '操作',
                    dataIndex: 'caozuo',
                    key: 'caozuo',
                    render: (): any => (
                        <Button.Group>
                            <Button size="small" type="primary">修改</Button>
                            <Button size="small" type="primary">删除</Button>
                        </Button.Group>
                    )
                }
            ],
            dataSource: [
                {
                    key: '1',
                    name: '人工智能识别',
                    biaoqian: '人工智能',
                    daxiao: '3M',
                    time: '2018.11.16'
                },
                {
                    key: '2',
                    name: '公司财务报销',
                    biaoqian: '费用',
                    daxiao: '5M',
                    time: '2018.11.16'
                },
                {
                    key: '3',
                    name: '盈利能力',
                    biaoqian: '财务',
                    daxiao: '8M',
                    time: '2018.11.16'
                }
            ]
        }
    }

    public onSelectChange = (selectedRowKeys): void => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    public render(): React.ReactElement {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        return (
            <div>
                <div style={{ margin: '20px' }}>
                    <Button.Group>
                        <Button style={{ marginRight: '20px' }} type="primary" icon="swap-left">后退</Button>
                        <Button style={{ marginRight: '20px' }} type="primary" icon="folder-add">新建文件夹</Button>
                        <Button style={{ marginRight: '20px' }} type="primary" icon="folder">文档上传</Button>
                        <Button style={{ marginRight: '20px' }} type="primary" icon="folder-add">文档创建</Button>
                        <Button style={{ marginRight: '20px' }} type="primary" icon="folder">移动</Button>
                        <Button style={{ marginRight: '70px' }} type="primary" icon="close">删除</Button>
                        <Input.Search
                            placeholder="请输入名称"
                            style={{ width: 200 }}
                        />
                    </Button.Group>
                </div>
                <Table
                    rowSelection={rowSelection}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
            </div>
        )
    }
}

export default UserKnowledge