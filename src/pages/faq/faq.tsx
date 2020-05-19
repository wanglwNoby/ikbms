import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './faq.module.less'

const FaqIndex = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./faqIndex/faqIndex'))
// const BaikeCreate = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./baikeIndex/baikeIndex'))
const ErrorPage = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../errorPage/errorPage'))

class FAQ extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.faqWrapper}>
                <Switch>
                    <Route exact path="/FAQ" component={FaqIndex} />
                    <Route exact path="/FAQ/create" component={FaqIndex} />
                    {/* <Route exact path="/announcement/review" component={AnnouncementReview} />
                    <Route exact path="/announcement/feedback" component={AnnouncementFeedback} /> */}
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        )
    }
}

export default FAQ