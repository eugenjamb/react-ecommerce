import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './page/homepage/homepage.component';

import './css/App.css';

const HatsPage = () => {
  return (
    <div>sadasd</div>
  )
}


function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;