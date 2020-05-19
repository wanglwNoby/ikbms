import * as React from 'react'
import { Typography } from 'antd'

interface IProps {
    kdgDetails: {
        title: string;
        content: string;
        create_time: string;
    };
}

class AnnouncementDetails extends React.PureComponent<IProps, any> {
    constructor(props: IProps) {
        super(props)
        this.state = {}
    }

    public render(): React.ReactElement {
        return (
            <Typography>
                <Typography.Title>{this.props.kdgDetails.title}</Typography.Title>
                <Typography.Text strong>
                    {`${this.props.kdgDetails.create_time.substr(0, 4)}-${this.props.kdgDetails.create_time.substr(4, 2)}-${this.props.kdgDetails.create_time.substr(6, 2)}`}
                </Typography.Text>
                <Typography.Paragraph style={{ marginTop: 16 }}>
                    {this.props.kdgDetails.content}
                </Typography.Paragraph>
            </Typography>
        )
    }
}

export default AnnouncementDetails