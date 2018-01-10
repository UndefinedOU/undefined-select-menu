
import React, { Component } from 'react';
import styled from 'styled-components';
import { observable, autorun} from 'mobx';
import {observer, propTypes} from 'mobx-react';
import PropTypes from 'prop-types';
import IconDisplay from './IconDisplay';
/*
  checkicon determines wither the check should be shown or not. 
  it relies on the store and 

*/

const NullElement = styled.div`

`;

const CheckedIcon = (props) => {
  const uncheck = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    props.store.setUnChecked(props.id);
  }

  return (
    <a href="#" onClick={uncheck}><IconDisplay iconType="fa-check" /></a>
  ); 
};

const UncheckedIcon = (props) => {
  const check = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    props.store.setChecked(props.id);
  }
  
  return (
    <a href="#" onClick={check}><IconDisplay iconType="fa-circle"/></a>
  );
};

class CheckIcon extends Component {
  isChecked() {
    return this.props.store.isChecked(this.props.id);
  }
  isCheckable() {
    //todo, faster but we should be using the store instead of getting it from teh view
    return this.props.checkable;
  }
  render() {
    const store = this.props.store;
    const id = this.props.id;
    if (this.isCheckable()) {
      if (this.isChecked()) {
        return (
          <CheckedIcon {...this.props} />
        );
      } else {
        return (
          <UncheckedIcon {...this.props} />
        );
      }
    } else {
      return (<NullElement></NullElement>);
    }
  }
}

export default observer(CheckIcon);

