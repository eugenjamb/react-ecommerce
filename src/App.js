import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInUp from './page/sign-in-up/sign-in-up.component';

import { auth } from './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/sign' component={SignInUp} />
        </Switch>
      </div>
    );
  }
}

export default App;