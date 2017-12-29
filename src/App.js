import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu/Menu';


const editableMenuOpts = {
  menuMeta: {
    editable: true,
  }
}

class App extends Component {
  render () {
    let fa = "fa fa-heart";
    return (
      <div>
        <h1>wut</h1>
        <Menu />
        <h1> editable menu </h1>
        <Menu menuMeta={editableMenuOpts} />
      </div>
    );
  }
}

export default App;
