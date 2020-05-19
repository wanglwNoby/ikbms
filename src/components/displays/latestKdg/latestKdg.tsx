import * as React from 'react'
import KnowledgeList from '../../cores/knowledgeList/knowledgeList'
import { _newestKdg } from '../../../common/api/homePage'

class LatestKdg extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            listData: []
        }
    }

    public componentDidMount(): void {
        this.getLatsetKdg()
    }

    public getLatsetKdg = async (): Promise<void> => {
        const res: any = await _newestKdg()
        if (res && res.result) {
            this.setState({
                listData: res.data.files
            })
        }
    }

    public render(): React.ReactElement {
        return (
            this.state.listData.length > 0 && <KnowledgeList isRefineResults={false} data={this.state.listData} />
        )
    }
}

export default LatestKdg