import React, { Component } from 'react';
import Layout from './containters/Layout/Layout';
import BurgerBuilder from './containters/BurgerBuilder/BurgerBuilder';
import Checkout from './containters/Checkout/Checkout'
import { Route, Switch } from 'react-router';
import Orders from './containters/Orders/Orders'
import Auth from './containters/Auth/Auth';
import Logout from './containters/Auth/Logout/Logout';

class App extends Component {
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

export default App;
