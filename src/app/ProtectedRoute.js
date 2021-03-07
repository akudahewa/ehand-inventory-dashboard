import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        console.log("UI- ProtectedRoute.js -> render in ProtectedRoute, compoenet :"+JSON.stringify(this.props))
        const accessToken = localStorage.getItem('accessToken');
       
        return accessToken ? (
            <Component isAuthenticated={this.props.isAuthenticated} currentUser={this.props.currentUser} logoutClick={this.props.onLogout} />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;