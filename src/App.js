import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import HomePage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInUp from './page/sign-in-up/sign-in-up.component';
import CheckoutPage from './page/checkout/checkout.component';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './css/App.css';

class App extends Component {
  
  unsubscribeFromAuth = null

  constructor() {
    super()
    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession()
  }

  componentWillUnmount() {
    //this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/sign' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInUp />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);