import * as React from 'react'
import { Link } from 'react-router-dom'
import { List, Button, Typography } from 'antd'
import { _listHotKdg } from '../../../common/api/homePage'

interface IState {
    hotKdgData: any[];
}

class LatestKdg extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            hotKdgData: []
        }
    }

    public componentDidMount(): void {
        this.getListHotKdg(12)
    }

    public getListHotKdg = async (type: number): Promise<void> => {
        const res: any = await _listHotKdg({
            params: { type }
        })
        if (res && res.result) {
            this.setState({
                hotKdgData: res.data
            })
        }
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <div style={{ textAlign: 'right' }}>
                    <Button.Group>
                        <Button type="primary" size="small" onClick={this.getListHotKdg.bind(this, 11)}>日</Button>
                        <Button type="primary" size="small" onClick={this.getListHotKdg.bind(this, 12)}>周</Button>
                        <Button type="primary" size="small" onClick={this.getListHotKdg.bind(this, 13)}>月</Button>
                    </Button.Group>
                </div>
                <List
                    dataSource={this.state.hotKdgData}
                    renderItem={(item: any, index: number): React.ReactElement => (
                        <List.Item>
                            <Typography.Text
                                strong
                                style={{ width: '16px', textAlign: 'center', marginRight: '6px', backgroundColor: index === 0 ? '#f54545' : index === 1 ? '#ff8547' : index === 2 ? '#ffac38' : '#8eb9f5' }}
                            >
                                {index + 1}
                            </Typography.Text>
                            <Link to={{ pathname: '/kdgDetails', state: { id: item.kdg_id, month: item.kdg_month } }}>{item.kdg_title}</Link>
                        </List.Item>
                    )}
                />
            </React.Fragment>
        )
    }
}

export default LatestKdg