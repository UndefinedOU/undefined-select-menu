import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu/Menu';


const editableMenuOpts = {
  menuMeta: {
    editable: true,
  }
}

const addableMenuOpts = {
  menuMeta: {
    addable: true,
    editable: false
  }
}

class App extends Component {
  render () {
    let fa = "fa fa-heart";
    return (
      <div>
        <h1>standard menu</h1>
        <Menu />
        <h1> editable menu </h1>
        <Menu {...editableMenuOpts} />
        <h1> addable menu</h1>
        <Menu {...addableMenuOpts} />
      </div>
    );
  }
}

export default App;
