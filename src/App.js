import React, { Component } from 'react';
import Layout from './containters/Layout/Layout';
import BurgerBuilder from './containters/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import Logout from './containters/Auth/Logout/Logout';
import * as actions from './store/actions'
import { connect } from 'react-redux';

const Checkout = React.lazy(() => import('./containters/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containters/Orders/Orders'))
const Auth = React.lazy(() => import('./containters/Auth/Auth'))

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    return (
      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
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
        </React.Suspense >
      </div >
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
