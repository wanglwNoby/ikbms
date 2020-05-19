import * as React from 'react'
import { Carousel, Typography } from 'antd'
import { _newestNotice } from '../../../common/api/homePage'

interface IState {
    noticeData: any[];
}

class Announcement extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            noticeData: []
        }
    }

    public componentDidMount(): void {
        this.getNoticeData()
    }

    public getNoticeData = async (): Promise<void> => {
        const res: any = await _newestNotice()
        if (res && res.result) {
            this.setState({
                noticeData: res.data.files
            })
        }
    }

    public render(): React.ReactElement {
        return (
            <Carousel autoplay>
                {
                    this.state.noticeData.map((item: any): React.ReactElement => (
                        <Typography key={item.id}>
                            <Typography.Title level={2}>{item.name}</Typography.Title>
                            <Typography.Paragraph ellipsis={{ rows: 5 }}>
                                {item.summary}
                            </Typography.Paragraph>
                        </Typography>
                    ))
                }
            </Carousel>
        )
    }
}

export default Announcement