import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import './App.css';
import Menu from './components/Menu/Menu';
import MenuLauncher from './components/MenuLauncher';
import { Select } from './components/Select';

const Square = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  border: 1px solid black;
`;

const TestSquare = observer(props => (
  <Square>
    ({props.positioning.cursorPosition.x},{props.positioning.cursorPosition.y})
    {props.children}
  </Square>
));

const editableMenuOpts = {
  menuMeta: {
    editable: true,
  },
};

const addableMenuOpts = {
  menuMeta: {
    addable: true,
    editable: false,
  },
};

const App = () => (
  <div>
    <h1>standard menu</h1>
    <Menu />
    <h1>editable menu</h1>
    <Menu {...editableMenuOpts} />
    <h1>addable menu</h1>
    <Menu {...addableMenuOpts} />
    <h1>launchable menu</h1>
    <MenuLauncher width="400px" height="400px">
      <TestSquare>
        here is a clickable area
      </TestSquare>
    </MenuLauncher>
    <h1>Select Menu</h1>
    <Select />
  </div>
);

export default App;
