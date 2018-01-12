var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  height: ', ';\n  width: ', ';\n  border: 1px solid black;\n'], ['\n  height: ', ';\n  width: ', ';\n  border: 1px solid black;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  width: 800px;\n'], ['\n  width: 800px;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu/Menu';
import MenuLauncher from './components/MenuLauncher';
import { Select } from './components/Select';

import { observer } from "mobx-react";
import ReactDOM from 'react-dom';

var Square = styled.div(_templateObject, function (props) {
  return props.height;
}, function (props) {
  return props.width;
});

var TestSquare = observer(function (props) {
  return React.createElement(
    Square,
    null,
    '(',
    props.positioning.cursorPosition.x,
    ',',
    props.positioning.cursorPosition.y,
    ')',
    props.children
  );
});

var editableMenuOpts = {
  menuMeta: {
    editable: true
  }
};

var addableMenuOpts = {
  menuMeta: {
    addable: true,
    editable: false
  }
};

var selectOptions = {
  selected: 0,
  menuMeta: {
    editable: true,
    addable: true
  },
  menuItems: [{ icon: null, label: '0one' }, { label: '1two', disabled: true }, { label: '2three' }, { label: '3banananananana' }, { label: '4whowhowho' }, { icon: null, label: '5one' }, { label: '6two', disabled: true }, { label: '7three' }, { label: '8banananananana' }, { label: '9whowhowho' }, { icon: null, label: '10one' }, { label: '11two', disabled: true }, { label: '12three', checkable: true }, { label: '13banananananana', checkable: true }, { label: '14whowhowho' }, { icon: null, label: '15one' }, { label: '16two', disabled: true }, { label: '17three' }, { label: '18banananananana' }, { label: '19whowhowho' }]
};

var SelectContainer = styled.div(_templateObject2);

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.onSelect = function (selected, id) {
      //debugger
    };

    _this.onUpdate = function (menuItems) {
      //debugger
    };

    _this.getStore = function (store) {
      _this.setState({ 'store': store });
    };

    _this.onChange = function (e, index) {
      selectOptions.selected = index;
      _this.setState({ selectOptions: selectOptions });
    };

    _this.state = {
      store: null,
      selectOptions: selectOptions
    };
    return _this;
  }

  _createClass(App, [{
    key: 'addItem',
    value: function addItem() {
      selectOptions.menuItems.push({ label: 'new item' });
      selectOptions.selected = selectOptions.menuItems.length - 1;
      this.setState({ selectOptions: selectOptions });
      // if (this.state.store) {
      //   this.state.store.addItem({label: 'new item'});
      // }
    }
  }, {
    key: 'render',
    value: function render() {
      var fa = "fa fa-heart";
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'standard menu'
        ),
        React.createElement(Menu, null),
        React.createElement(
          'h1',
          null,
          ' editable menu '
        ),
        React.createElement(Menu, editableMenuOpts),
        React.createElement(
          'h1',
          null,
          ' addable menu'
        ),
        React.createElement(Menu, addableMenuOpts),
        React.createElement(
          'h1',
          null,
          'launchable menu'
        ),
        React.createElement(
          MenuLauncher,
          Object.assign({ width: '400px', height: '400px' }, selectOptions),
          React.createElement(
            TestSquare,
            null,
            'here is a clickable area'
          )
        ),
        React.createElement(
          'h1',
          null,
          'Select Menu'
        ),
        React.createElement(
          SelectContainer,
          null,
          React.createElement(Select, Object.assign({}, selectOptions, {
            onSelect: this.onSelect,
            onUpdate: this.onUpdate,
            getStore: this.getStore,
            onChange: this.onChange

          }))
        ),
        React.createElement(
          'button',
          { onClick: this.addItem.bind(this) },
          'Add item into Select'
        )
      );
    }
  }]);

  return App;
}(Component);

export default App;