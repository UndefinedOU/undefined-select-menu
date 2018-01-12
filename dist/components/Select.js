var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  font-family: sans-serif;\n  padding: 0;\n  width: ', ';\n  height: ', ';\n  min-height: ', ';\n  line-height: ', ';\n  '], ['\n  font-family: sans-serif;\n  padding: 0;\n  width: ', ';\n  height: ', ';\n  min-height: ', ';\n  line-height: ', ';\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n  border: 1px solid black;\n  border-radius: 3px;\n  background-image: url("', '");\n  background-position: right;\n  background-repeat: no-repeat;\n  background-size: 20px;\n  background-color: white;\n  border: 1px solid #D9D9D9;\n  padding: 0 0 0 15px;\n  color: #2B2B2B;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  height: ', ';\n'], ['\n  border: 1px solid black;\n  border-radius: 3px;\n  background-image: url("', '");\n  background-position: right;\n  background-repeat: no-repeat;\n  background-size: 20px;\n  background-color: white;\n  border: 1px solid #D9D9D9;\n  padding: 0 0 0 15px;\n  color: #2B2B2B;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  height: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding: 0px;\n  width: ', ';\n  height: ', ';\n  border: 1px solid black;\n  overflow: visible;\n  z-index: 1;\n'], ['\n  padding: 0px;\n  width: ', ';\n  height: ', ';\n  border: 1px solid black;\n  overflow: visible;\n  z-index: 1;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: ', ';\n  top: ', ';\n  left: ', ';\n  height: ', ';\n  list-style-type: none;\n  margin: ', '\n'], ['\n  display: ', ';\n  top: ', ';\n  left: ', ';\n  height: ', ';\n  list-style-type: none;\n  margin: ', '\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*

  The select menu functionality
  similar to MenuLauncher except it displays based on
  what is clicked


  The cursor position indicates where the selected item needs
  to line up with the element its overlayed on top of.

  The list of elements needs to be aligned using
  absolute positioning in order to make this work.



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
import { observable, autorun } from 'mobx';
import createStore from '../store/menu';
import Menu from './Menu/Menu';
import Arrow from './assets/arrow-up-down.png';

var ITEM_HEIGHT = '24px'; //we need to work with fixed sizes for now. otherwise it won't work

var Wrapper = styled.div(_templateObject, function (props) {
  return props.width;
}, function (props) {
  return props.height;
}, ITEM_HEIGHT, ITEM_HEIGHT);

var DisplayElement = styled.div(_templateObject2, Arrow, ITEM_HEIGHT);

var StyledSelector = styled.ul(_templateObject3, function (props) {
  return props.width;
}, function (props) {
  return props.height;
});

var StyledOption = styled.li(_templateObject4, function (props) {
  return props.visible ? 'block' : 'hidden';
}, function (props) {
  return props.top;
}, function (props) {
  return props.left;
}, function (props) {
  return ITEM_HEIGHT;
}, function (props) {
  return 1 - props.offset;
});

/*
  Here we create a store



*/
var createSelectPositioningStore = function createSelectPositioningStore(props) {
  return observable({
    cursorPosition: { x: 0, y: 0 },
    spawnPoint: { x: 0, y: 0 },
    windowPositioning: { x: 0, y: 0 },
    menuOpen: false,
    selected: null,
    perPage: 10,
    offset: 0,

    openMenu: function openMenu() {
      this.menuOpen = true;
    },
    closeMenu: function closeMenu() {
      this.menuOpen = false;
    },
    setWindowPositioning: function setWindowPositioning(x, y) {
      this.windowPositioning.x = x;
      this.windowPositioning.y = y;
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

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      store: createStore(props),
      positioning: createSelectPositioningStore(props)
    };

    //hack to make  sure it closes when you click off the element
    _this.handlers = {};
    _this.handlers.closer = _this.externalClose.bind(_this);

    return _this;
  }

  _createClass(Select, [{
    key: 'externalClose',
    value: function externalClose(ev) {
      this.closeSelect();
      document.removeEventListener('click', this.handlers.closer);
    }
  }, {
    key: 'bindEscape',
    value: function bindEscape() {
      document.addEventListener('click', this.handlers.closer);
    }
  }, {
    key: 'unbindEscape',
    value: function unbindEscape() {
      document.removeEventListener('click', this.handlers.closer);
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      var element = ReactDOM.findDOMNode(this.displayElement);
      var topPos = element.getBoundingClientRect().top + window.scrollY;
      var leftPos = element.getBoundingClientRect().left + window.scrollX;
      console.log(topPos, leftPos);
      this.state.positioning.setWindowPositioning(leftPos, topPos);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._ismounted = true;
      //this.state.positioning.displayHeight = ReactDOM.findDOMNode(this.displayElement).style.height;
      this.updatePosition();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._ismounted = false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ store: createStore(nextProps) });
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(ev) {
      this.state.positioning.setCursorPosition(ev.pageX, ev.pageY);
      console.log(this.state.positioning.cursorPosition.x, this.state.positioning.cursorPosition.y);
    }
  }, {
    key: 'getDisplayHeight',
    value: function getDisplayHeight() {
      // https://stackoverflow.com/questions/39767482/is-there-a-way-to-check-if-the-react-component-is-unmounted
      //TODO: is an antipattern but it will do for now
      if (this._ismounted) {
        return this.state.positioning.displayHeight;
      } else {
        return '0px';
      }
    }
  }, {
    key: 'getMenuHeight',
    value: function getMenuHeight() {
      //derives a menu height. lets make this a fixes size for now
      return 240;
    }
  }, {
    key: 'getDisplayWidth',
    value: function getDisplayWidth() {
      if (this._ismounted) {
        return ReactDOM.findDOMNode(this.displayElement).style.width;
      } else {
        return '0px';
      }
    }
  }, {
    key: 'openSelect',
    value: function openSelect(ev) {
      if (ev) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      if (this.state.positioning.menuOpen && !this.state.store.editing.label) {
        this.state.positioning.closeMenu();
      } else {
        this.state.positioning.openMenu();
      }

      //console.log(this.state.positioning.cursorPosition.x, this.state.positioning.cursorPosition.y)
    }
  }, {
    key: 'closeSelect',
    value: function closeSelect() {
      this.state.positioning.closeMenu();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        Wrapper,
        {
          onMouseEnter: this.unbindEscape.bind(this),
          onMouseLeave: this.bindEscape.bind(this),
          onMouseMove: this.onMouseMove.bind(this),
          width: this.props.width,
          height: this.props.height
        },
        React.createElement(
          DisplayElement,
          {

            height: this.props.height,
            ref: function ref(el) {
              _this2.displayElement = el;
            },
            onClick: this.openSelect.bind(this) },
          this.state.store.selected !== null ? this.state.store.menuItems[this.state.store.selected].label : null
        ),
        this.state.positioning.menuOpen ? React.createElement(Menu, Object.assign({
          position: 'relative',
          itemHeight: ITEM_HEIGHT,
          positioning: this.state.positioning,
          menuItems: this.props.menuItems,
          store: this.state.store,
          menuMeta: this.props.menuMeta
        }, this.props)) : null
      );
    }
  }]);

  return Select;
}(Component);

;

Select.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

Select.defaultProps = {
  width: '100%',
  height: '100%'
};

var SelectElement = observer(Select); //export is weird
export { SelectElement as Select };