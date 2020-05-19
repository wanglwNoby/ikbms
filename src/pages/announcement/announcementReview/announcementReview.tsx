import * as React from 'react'
import { withRouter } from 'react-router-dom'
import KdgManagePageHeader from '../../../components/containers/kdgPageHeader/kdgPageHeader'

class AnnouncementReview extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public handleQuery = (): void => {
        console.log('查询按钮')
    }

    public handleBack = (): void => {
        this.props.history.push('/announcement')
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <KdgManagePageHeader
                    handleQuery={this.handleQuery}
                    handleBack={this.handleBack}
                />
                <div>这里是审核公告</div>
            </React.Fragment>
        )
    }
}

export default withRouter(AnnouncementReview)