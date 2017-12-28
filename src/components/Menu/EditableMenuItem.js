import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class EditableMenuItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      label: props.label
    }
  }
  updateLabel (newLabel) {
    this.setState('label', newLabel);
  }
  propegateUpdate () {
    this.props.update(this.state.label);
  }
  render () {
    return (
      <div>{this.state.label}</div>
    );
  }
}

EditableMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
};

export default EditableMenuItem;