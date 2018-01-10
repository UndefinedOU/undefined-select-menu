var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  margin: 0;\n  padding: 0;\n  height: ', ';\n  width: ', ';\n'], ['\n  margin: 0;\n  padding: 0;\n  height: ', ';\n  width: ', ';\n']);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*
  Launcher is a componenet that wraps a child and takes a menu.
  It makes the component a clickable area where you can control. where the menu is openned

  a context object is injected into the menu which can be modified
  by children mounted inside the launchable. This determines if the
  area can launch a menu and delivers a top/left attribute long with 
  windowing dimensions for determining the size and type.

  Windowing
    window: (x,y)
    spawnPosition: (x, y)
  


  on Mounting of the menu ie: showing: 

*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import keydown, { Keys } from 'react-keydown';
import { observable, autorun } from 'mobx';
import createStore from '../store/menu';
import Menu from './Menu/Menu';

var WrapperEl = styled.div(_templateObject, function (props) {
  return props.height;
}, function (props) {
  return props.width;
});

//here we create a store
var createPositioningStore = function createPositioningStore(props) {
  return observable({
    cursorPosition: { x: 0, y: 0 },
    spawnPoint: { x: 0, y: 0 },
    menuOpen: false,
    openMenu: function openMenu() {
      this.menuOpen = true;
    },
    closeMenu: function closeMenu() {
      this.menuOpen = false;
    },
    setCursorPosition: function setCursorPosition(x, y) {
      this.cursorPosition.x = x;
      this.cursorPosition.y = y;
    },
    setSpawnPoint: function setSpawnPoint() {
      this.spawnPoint.x = this.cursorPosition.x;
      this.spawnPoint.y = this.cursorPosition.y;
    }
  });
};

var MenuLauncher = function (_Component) {
  _inherits(MenuLauncher, _Component);

  function MenuLauncher(props) {
    _classCallCheck(this, MenuLauncher);

    var _this = _possibleConstructorReturn(this, (MenuLauncher.__proto__ || Object.getPrototypeOf(MenuLauncher)).call(this, props));

    _this.state = {
      menu: createStore(props),
      positioning: createPositioningStore(props)
    };
    return _this;
  }

  _createClass(MenuLauncher, [{
    key: 'onRightClick',
    value: function onRightClick(ev) {
      var _this2 = this;

      ev.preventDefault();
      console.log('right clicked!!');
      this.state.positioning.setSpawnPoint();
      this.state.positioning.openMenu();
      //add a handler to close this
      var remover = function remover() {
        _this2.state.positioning.closeMenu();
        window.removeEventListener('click', remover);
      };
      window.addEventListener('click', remover);
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(ev) {}
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(ev) {
      ev.preventDefault();
      this.state.positioning.setCursorPosition(ev.pageX, ev.pageY);
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {}
  }, {
    key: 'render',
    value: function render() {
      var _React$createElement;

      return React.createElement(
        WrapperEl,
        {
          width: this.props.width,
          height: this.props.height,
          onMouseMove: this.onMouseMove.bind(this),
          onContextMenu: this.onRightClick.bind(this)
        },
        React.cloneElement(this.props.children, {
          store: this.state.store,
          positioning: this.state.positioning
        }),
        this.state.positioning.menuOpen ? React.createElement(Menu, (_React$createElement = {
          position: 'absolute',
          top: this.state.positioning.spawnPoint.y + 'px',
          left: this.state.positioning.spawnPoint.x + 'px',
          positioning: this.state.positioning,
          menuItems: this.props.menuItems,
          store: this.state.store
        }, _defineProperty(_React$createElement, 'positioning', this.state.positioning), _defineProperty(_React$createElement, 'menuMeta', this.props.menuMeta), _React$createElement)) : null
      );
    }
  }]);

  return MenuLauncher;
}(Component);

MenuLauncher.propTypes = {
  //menu: PropTypes.node.isRequired
};

MenuLauncher.defaultProps = {};

export default observer(MenuLauncher);