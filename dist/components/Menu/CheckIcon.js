var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n\n'], ['\n\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from 'react';
import styled from 'styled-components';
import { observable, autorun } from 'mobx';
import { observer, propTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import IconDisplay from './IconDisplay';
/*
  checkicon determines wither the check should be shown or not. 
  it relies on the store and 

*/

var NullElement = styled.div(_templateObject);

var CheckedIcon = function CheckedIcon(props) {
  var uncheck = function uncheck(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    props.store.setUnChecked(props.id);
  };

  return React.createElement(
    'a',
    { href: '#', onClick: uncheck },
    React.createElement(IconDisplay, { iconType: 'fa-check' })
  );
};

var UncheckedIcon = function UncheckedIcon(props) {
  var check = function check(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    props.store.setChecked(props.id);
  };

  return React.createElement(
    'a',
    { href: '#', onClick: check },
    React.createElement(IconDisplay, { iconType: 'fa-circle' })
  );
};

var CheckIcon = function (_Component) {
  _inherits(CheckIcon, _Component);

  function CheckIcon() {
    _classCallCheck(this, CheckIcon);

    return _possibleConstructorReturn(this, (CheckIcon.__proto__ || Object.getPrototypeOf(CheckIcon)).apply(this, arguments));
  }

  _createClass(CheckIcon, [{
    key: 'isChecked',
    value: function isChecked() {
      return this.props.store.isChecked(this.props.id);
    }
  }, {
    key: 'isCheckable',
    value: function isCheckable() {
      //todo, faster but we should be using the store instead of getting it from teh view
      return this.props.checkable;
    }
  }, {
    key: 'render',
    value: function render() {
      var store = this.props.store;
      var id = this.props.id;
      if (this.isCheckable()) {
        if (this.isChecked()) {
          return React.createElement(CheckedIcon, this.props);
        } else {
          return React.createElement(UncheckedIcon, this.props);
        }
      } else {
        return React.createElement(NullElement, null);
      }
    }
  }]);

  return CheckIcon;
}(Component);

export default observer(CheckIcon);