import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './baike.module.less'

const BaikeIndex = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./baikeIndex/baikeIndex'))
const BaikeCreate = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./baikeIndex/baikeIndex'))
const ErrorPage = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../errorPage/errorPage'))

class Baike extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.baikeWrapper}>
                <Switch>
                    <Route exact path="/baike" component={BaikeIndex} />
                    <Route exact path="/baike/create" component={BaikeCreate} />
                    {/* <Route exact path="/announcement/review" component={AnnouncementReview} />
                    <Route exact path="/announcement/feedback" component={AnnouncementFeedback} /> */}
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        )
    }
}

export default Baike