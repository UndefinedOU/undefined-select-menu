var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      menuDisplayed: false
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'toggleDisplayMenu',
    value: function toggleDisplayMenu() {
      this.setState({ menuDisplayed: !this.state.menuDisplayed });
    }
  }, {
    key: 'render',
    value: function render() {
      var FAIcon = convertToFAName(this.props.icon);
      return;
    }
  }]);

  return Select;
}(Component);

function convertToFAName(FAName) {
  return 'fa ' + FAName;
}

Select.defaultProps = {
  label: 'heart',
  icon: 'fa-coffee'
};

export default Select;