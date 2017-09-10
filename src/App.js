import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AboutPage from 'containers/aboutPage';
import SourcePage from 'containers/sourcePage';
import MainPage from 'containers/mainPage';
import BlipNav from 'containers/blipNav';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="nav"><BlipNav /></div>
          <div className="body">
            <Switch>
              <Route path='/about' component={AboutPage} />
              <Route path='/source' component={SourcePage} />
              <Route path='/' component={MainPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
