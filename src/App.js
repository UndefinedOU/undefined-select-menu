import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu/Menu';
import MenuLauncher from './components/MenuLauncher';
import { Select } from './components/Select';

import { observer } from "mobx-react";
import ReactDOM from 'react-dom';

const Square = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: 1px solid black;
`;

const TestSquare = observer((props) => {
  return (
    <Square>
      ({props.positioning.cursorPosition.x},{props.positioning.cursorPosition.y})
      {props.children}

    </Square>
  )
});

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

const selectOptions =  {
  selected: 0,
  menuMeta: {
    editable: true,
    addable: true
  },
  menuItems: [
    { icon: null, label: '0one' },
    { label: '1two', disabled: true },
    { label: '2three' },
    { label: '3banananananana' },
    { label: '4whowhowho' },
    { icon: null, label: '5one' },
    { label: '6two', disabled: true },
    { label: '7three' },
    { label: '8banananananana' },
    { label: '9whowhowho' },
    { icon: null, label: '10one' },
    { label: '11two', disabled: true },
    { label: '12three', checkable: true },
    { label: '13banananananana', checkable: true },
    { label: '14whowhowho' },
    { icon: null, label: '15one' },
    { label: '16two', disabled: true },
    { label: '17three' },
    { label: '18banananananana' },
    { label: '19whowhowho' }
  ],
}

const SelectContainer = styled.div`
  width: 800px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: null,
      selectOptions
    };
  }
  addItem(ev) {
    ev.stopPropagation();
    selectOptions.menuItems.push({label: 'new item'});
    selectOptions.selected = selectOptions.menuItems.length - 1;
    this.setState({selectOptions});
    // if (this.state.store) {
    //   this.state.store.addItem({label: 'new item'});
    // }
  }
  onSelect = (selected, id) => {
    //debugger
  }
  onUpdate({menuItems}) {
    //debugger
  }
  getStore = (store) => {
    this.setState({'store': store});
  }
  onChange = (e, index) => {
    selectOptions.selected = index;
    this.setState({selectOptions});
  }
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
        <h1>launchable menu</h1>
        <MenuLauncher width="400px" height="400px" {...selectOptions}>
          <TestSquare>
            here is a clickable area
          </TestSquare>
        </MenuLauncher>
        <h1>Select Menu</h1>
        <SelectContainer>
          <Select
            {...selectOptions}
            onSelect={this.onSelect}
            onUpdate={this.onUpdate}
            getStore={this.getStore}
            onChange={this.onChange}

          >
          </Select>
        </SelectContainer>
        <button onClick={this.addItem.bind(this)}>Add item into Select</button>

      </div>
    );
  }
}

export default App;
