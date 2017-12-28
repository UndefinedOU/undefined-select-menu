import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render () {
    let fa = "fa fa-heart";
    return (
      <div>
        <Menu />
        <h1> editable menu <h1>
        <Menu editable={true} />
      </div>
    );
  }
}

export default App;
