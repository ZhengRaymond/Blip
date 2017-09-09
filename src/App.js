import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Affix from 'antd/lib/affix';
import BlipNav from './containers/blipNav';
import BlipHeader from './containers/blipHeader';
import BlipBody from './containers/blipBody';

class App extends Component {
  render() {
    return (
      <div>
        <Affix><BlipNav /></Affix>
        <BlipHeader />
        <BlipBody />
      </div>
    );
  }
}

export default App;
