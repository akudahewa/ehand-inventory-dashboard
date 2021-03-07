import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import { Redirect } from "react-router";
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import PollList from '../poll/PollList';
import NewPoll from '../poll/NewPoll';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import ForgotPassword from '../user/forgot-password/ForgotPassword';
import Home from '../home/Home';
import AddItem from '../addItem/addItem';
import SingleItem from '../singleItem/singleItem';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    console.log("UI- App.js props in constructor ->"+JSON.stringify(props));
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      userHasAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.requireAuth = this.requireAuth(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    console.log("UI- App.js -> inside loadCurrentUser()")
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      console.log("UI- App.js -> inside loadCurrentUser() ->success :"+JSON.stringify(response))
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      console.log("UI- App.js -> loadCurrentUser() ->error :"+error);
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    console.log("UI- APP.js -> componentDidMount");
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    alert("app- logout")
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Polling App',
      description: description,
    });
  }

  handleLogin() {
    console.log("UI- App.js handleLogin() ")
    notification.success({
      message: 'Polling App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  requireAuth(nextState, replace) {
    console.log("UI- requireAuth :"+localStorage.getItem(ACCESS_TOKEN))
    const token = localStorage.getItem(ACCESS_TOKEN)
    console.log("UI- token "+token)
    if(!localStorage.getItem(ACCESS_TOKEN)) {
      console.log("UI- ACCESS TOKEN is NULL :"+localStorage.getItem(ACCESS_TOKEN))
      //return <Redirect to={{pathname:"/login"}} />;
      // replace({
      //   pathname: "/login",
      //   state: {nextPathname: nextState.location.pathname}
      // });
    }else{
      console.log("UI- ACCESS TOKEN is NOT-NULL"+localStorage.getItem(ACCESS_TOKEN));
    }
  }

  

  render() {
    console.log("UI- App.js ->Rendering App js file props :"+JSON.stringify(this.props));
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    if(this.state.notFound) {
      return <NotFound />;
  }
    if (!this.state.isAuthenticated) {
      console.log("UI- App.js -> Redirect to login controller: "+!this.props.isAuthenticated)
         return <Login onLogin={this.handleLogin}   />;
    }
    return (
      
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>      
                <Route exact path="/" 
                  render={(props) => <PollList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />} 
                      onEnter={this.requireAuth}>
                </Route>
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <ProtectedRoute path="/home" component={Home} isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} onLogout={this.handleLogout}></ProtectedRoute>
                <Route path="/additem" component={AddItem}></Route>
                <Route path="/item" component={SingleItem}></Route>
                <Route path="/forgot-password" component={ForgotPassword}></Route>
                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/poll/new" component={NewPoll} handleLogout={this.handleLogout}></PrivateRoute>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
