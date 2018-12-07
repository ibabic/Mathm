import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import MainPage from './containers/MainPage/MainPage';
import { Route, Switch, withRouter } from 'react-router-dom';
import Rules from './components/Rules/Rules';
import Forum from './components/Forum/Forum';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div >
       <Layout>
         <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/rules"   component={Rules} />
          <Route path="/forum"   component={Forum} />
          <Route path="/login"   component={Login} />
          <Route path="/register"   component={Register} />
          <Route path="/logout"   component={Logout} />
         
         </Switch>
       </Layout>
       
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
