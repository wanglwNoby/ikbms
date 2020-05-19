import * as React from 'react'
import { Result, Button } from 'antd'

class ErrorPage extends React.PureComponent<any, any> {
    public render(): React.ReactElement {
        return (
            <Result
                status="404"
                title="404"
                subTitle="对不起，您访问的页面不存在。"
                extra={<Button type="primary" onClick={(): void => this.props.history.push('/')}>回到首页</Button>}
            />
        )
    }
}

export default ErrorPage