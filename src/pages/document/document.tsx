import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './document.module.less'

const DocumentIndex = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./documentIndex/documentIndex'))
const DocumentCreate = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./documentCreate/documentCreate'))
const ErrorPage = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../errorPage/errorPage'))

class Document extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.documentWrapper}>
                <Switch>
                    <Route exact path="/document" component={DocumentIndex} />
                    <Route exact path="/document/create" component={DocumentCreate} />
                    {/* <Route exact path="/announcement/review" component={AnnouncementReview} />
                    <Route exact path="/announcement/feedback" component={AnnouncementFeedback} /> */}
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        )
    }
}

export default Document