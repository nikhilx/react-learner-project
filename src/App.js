import React, { Component } from 'react';
import Layout from './containters/Layout/Layout';
import BurgerBuilder from './containters/BurgerBuilder/BurgerBuilder';
import Checkout from './containters/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect } from 'react-router';
import Orders from './containters/Orders/Orders'
import Auth from './containters/Auth/Auth';
import Logout from './containters/Auth/Logout/Logout';
import * as actions from './store/actions'
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated && <Route path="/checkout" component={Checkout} />}
            {this.props.isAuthenticated && <Route exact path="/orders" component={Orders} />}
            <Route exact path="/auth" component={Auth} />
            {this.props.isAuthenticated && <Route exact path="/logout" component={Logout} />}
            <Route exact path="/" component={BurgerBuilder} />
            <Redirect to="/" />
            <Orders />
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
