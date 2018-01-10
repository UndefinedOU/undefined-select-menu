var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconDisplay from './IconDisplay';
import { observer } from "mobx-react";
import keydown, { Keys } from 'react-keydown';
import { observable, autorun } from 'mobx';
import { StyledMenuItem, StyledLabel, EditForm, StyledInput } from './styles';

//handles lifecycle for the form
//todo, change thsi to class so we can focus on it
var StagedDisplay = observer(function (props) {
  var commitStaging = function commitStaging(ev) {
    ev.preventDefault();
    props.store.commitStaging();
  };

  var updateStaging = function updateStaging(ev) {
    props.store.updateStaging(ev.target.value);
  };

  var abortStaging = function abortStaging() {
    props.store.clearStaging();
  };
  var stopProp = function stopProp(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  };

  return React.createElement(
    StyledLabel,
    null,
    React.createElement(
      EditForm,
      { onSubmit: commitStaging },
      React.createElement(StyledInput, {
        onKeydown: stopProp,
        onChange: updateStaging,
        defaultValue: ''
      })
    )
  );
});

var UnstagedDisplay = observer(function (props) {
  var openStagingForm = function openStagingForm(ev) {
    ev.preventDefault();
    props.store.updateStaging('');
  };

  return React.createElement(
    StyledLabel,
    null,
    React.createElement(
      'a',
      { href: '', onClick: openStagingForm },
      'Add Menu Item ',
      React.createElement(IconDisplay, { iconType: 'fa-plus' })
    )
  );
});

var AddableMenuItem = function (_Component) {
  _inherits(AddableMenuItem, _Component);

  function AddableMenuItem() {
    _classCallCheck(this, AddableMenuItem);

    return _possibleConstructorReturn(this, (AddableMenuItem.__proto__ || Object.getPrototypeOf(AddableMenuItem)).apply(this, arguments));
  }

  _createClass(AddableMenuItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        StyledMenuItem,
        {
          onClick: this.handleClick,
          onMouseOver: this.handleMouseOver,
          onMouseLeave: this.handleMouseLeave,
          onKeyDown: this.handleKeyDown,
          ref: function ref(_ref) {
            _this2.ref = _ref;
          } },
        this.props.store.staging ? React.createElement(StagedDisplay, this.props) : React.createElement(UnstagedDisplay, this.props)
      );
    }
  }]);

  return AddableMenuItem;
}(Component);

;

export default observer(AddableMenuItem);