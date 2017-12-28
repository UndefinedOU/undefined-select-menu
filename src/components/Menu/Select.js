import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Menu from './Menu';
// const StyledSelect = styled.Select`
//   border: '1px solid #eee',
//   borderRadius: 3,
//   backgroundColor: '#FFFFFF',
//   cursor: 'pointer',
//   fontSize: 30,
//   padding: '3px 10px'
// `;

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuDisplayed: false
    }
  }

  toggleDisplayMenu() {
    this.setState({menuDisplayed: !this.state.menuDisplayed});
  }

  render() {
    let FAIcon = convertToFAName(this.props.icon);
    return (
    );
  }
}

function convertToFAName(FAName) {
  return `fa ${FAName}`;
}

Select.defaultProps = {
  label: 'heart',
  icon: 'fa-coffee'
}

export default Select;
