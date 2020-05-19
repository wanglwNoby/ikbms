import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// antd语言设置
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
// moment语言设置
import moment from 'moment'
import 'moment/locale/zh-cn'

import PrivateRoute from './utils/privateRoute'
import reducer from './redux/index'
import Home from './pages/home/home'
import Login from './pages/login/login'
import './App.less'

moment.locale('zh-cn')
const store = createStore(reducer)

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    public componentDidMount(): void {
        // 全局配置antd-message
        message.config({
            top: 250,
            duration: 2,
            maxCount: 1
        })
    }

    public render(): React.ReactElement {
        return (
            <ConfigProvider locale={zhCN}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute path="/" component={Home} />
                            <Redirect to="/" />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </ConfigProvider>
        )
    }
}

export default App