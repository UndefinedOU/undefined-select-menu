/*

  The select menu functionality
  similar to MenuLauncher except it displays based on
  what is clicked

  <Select
    menuOptions={options}
    items={items}
  />

*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import keydown, { Keys } from 'react-keydown';
import { observable, autorun} from 'mobx';
import createStore from '../store/menu'
import Menu from './Menu/Menu';

class Select extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>select box</div>
    );
  }
};

Select.PropTypes = {

};

Select.defaultProps = {

};

export default observer(Select);
