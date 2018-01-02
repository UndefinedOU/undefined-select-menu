import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconDisplay from './IconDisplay';
import { observer } from "mobx-react";
import keydown, { Keys } from 'react-keydown';
import { observable, autorun} from 'mobx';
class AddableMenuItem extends Component {
  render () {
    return (<h1>export</h1>);
  }
};

export default observer(AddableMenuItem);
