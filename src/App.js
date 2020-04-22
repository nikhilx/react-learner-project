import React, { Component } from 'react';
import Layout from './containters/Layout/Layout';
import BurgerBuilder from './containters/BurgerBuilder/BurgerBuilder';
import Checkout from './containters/Checkout/Checkout'
import { Route, Switch, withRouter } from 'react-router';
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
            <Route path="/checkout" component={Checkout} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
            <Orders />
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
