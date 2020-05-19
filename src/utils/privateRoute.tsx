import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }): any => {
    const ikbms = window.sessionStorage.getItem('ikbms')
    return (
        <Route
            {...rest}
            render={(props: any): React.ReactElement => (
                ikbms ?
                    <Component {...props} /> :
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )}
        />
    )
}

export default PrivateRoute