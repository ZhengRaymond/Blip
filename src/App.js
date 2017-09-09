import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BlipNav from './containers/blipNav';
import BlipHeader from './containers/blipHeader';
import BlipBody from './containers/blipBody';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="nav">
          <BlipNav />
        </div>
        <div className="body">
          <BlipHeader />
          <BlipBody />
        </div>
      </div>
    );
  }
}

export default App;
