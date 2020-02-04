import React, { Component } from 'react';
import Layout from './containters/Layout/Layout';
import BurgerBuilder from './containters/BurgerBuilder/BurgerBuilder';
import Checkout from './containters/Checkout/Checkout'
import { Route, Switch } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;
