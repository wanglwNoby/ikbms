import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './article.module.less'

const ArticleIndex = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./articleIndex/articleIndex'))
const ArticleCreate = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('./articleCreate/articleCreate'))
const ErrorPage = React.lazy((): Promise<{ default: React.ComponentType<any> }> => import('../errorPage/errorPage'))

class Article extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.articleWrapper}>
                <Switch>
                    <Route exact path="/article" component={ArticleIndex} />
                    <Route exact path="/article/create" component={ArticleCreate} />
                    {/* <Route exact path="/announcement/review" component={AnnouncementReview} />
                    <Route exact path="/announcement/feedback" component={AnnouncementFeedback} /> */}
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        )
    }
}

export default Article