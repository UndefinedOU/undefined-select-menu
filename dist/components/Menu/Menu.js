var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  position: ', ';\n  display: inline-block;\n  border: 1px solid #BDBDBD;\n  border-radius: 5px;\n  background-color: white;\n  box-shadow: 5px 5px 15px #DDD;\n  margin-top: 0;\n  margin-left: 0;\n  padding-left: 0;\n  margin-right: 30px;\n  top: ', ';\n  left: ', ';\n\n  ', '\n'], ['\n  position: ', ';\n  display: inline-block;\n  border: 1px solid #BDBDBD;\n  border-radius: 5px;\n  background-color: white;\n  box-shadow: 5px 5px 15px #DDD;\n  margin-top: 0;\n  margin-left: 0;\n  padding-left: 0;\n  margin-right: 30px;\n  top: ', ';\n  left: ', ';\n\n  ', '\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    height: ', 'px;\n  '], ['\n    height: ', 'px;\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n  cursor: pointer;\n'], ['\n  cursor: pointer;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';
import styled, { css } from 'styled-components';
import ReactDOM from 'react-dom';
import { observable, autorun } from 'mobx';
import { observer, propTypes } from 'mobx-react';
import keydown, { Keys } from 'react-keydown';
import AddableMenuItem from './AddableMenuItem';
import createStore from '../../store/menu';
import { find } from 'lodash';
import IconDisplay from './IconDisplay';

//let ReactDOM = require('react-dom');

/*
  root of he menu,

  On creastion, should instantiate a Observer based on the initial values
  We need 3 different observables
    1. menuMeta
    2. menuItems

*/

var StyledMenuBox = styled.ul(_templateObject, function (props) {
  return props.position || 'relative';
}, function (props) {
  return props.top;
}, function (props) {
  return props.left;
}, function (props) {
  return props.height && css(_templateObject2, props.height);
});

var UpButton = styled.li(_templateObject3);

var DownButton = styled.li(_templateObject3);

var Menu = observer(function (_Component) {
  _inherits(Menu, _Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    /*
    let menuItems = JSON.parse(JSON.stringify(this.props.menuItems));
    if (this.props.menuMeta.addable) {
      menuItems.push({label: "New Item +", newItem: true});
      // TODO, onclick of this item, add editable item above it
    }
    */
    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this.returnSelected = function () {
      /*
      if (this.state.currMenuItem !== -1 &&
        !this.state.menuItems[this.state.currMenuItem].disabled) {
        console.log(this.state.menuItems[this.state.currMenuItem]);
      }
      */

    };

    _this.getBackgroundColor = function () {
      return _this.props.highlighted ? _this.props.hBackgroundColor : _this.props.backgroundColor;
    };

    _this.getColor = function () {
      return _this.props.disabled ? _this.props.dColor : _this.props.color;
    };

    _this.getCursor = function () {
      return _this.props.disabled ? 'not-allowed' : 'default';
    };

    if (props.store) {
      _this.state = {
        store: props.store,
        currMenuItem: -1
      };
      if (!_this.props.store.menuItems) {
        _this.state.store.setItems(_this.props.menuItems);
      }
    } else {
      _this.state = {
        store: createStore(props),
        currMenuItem: -1
        // menuItems: props.menuItems,
        //menuItems: props.menuItems,
      };
    }
    _this.clearHover = _this.clearHover.bind(_this);

    _this.handlers = {
      keydown: null
    };

    //THis makes sure when we unbind and rebind keys, the reference is preserved so we
    //avoid any multiple bound functions for a single instance tomfoolery
    _this.handlers.keydown = _this.handleKeyDown.bind(_this);

    _this.dispose = {};

    return _this;
  }

  _createClass(Menu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      //this.handlers.key = this.handlerKeyDown.bind(this);

      // focus on the first item
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.focusDiv();
      //this.focusItem(0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindKeys();
    }
  }, {
    key: 'bindKeys',
    value: function bindKeys() {
      console.log('binding keys');
      document.addEventListener("keydown", this.handlers.keydown);
      //this.focusDiv()
    }
  }, {
    key: 'unbindKeys',
    value: function unbindKeys() {
      console.log('unbinding keys');
      //debugger
      document.removeEventListener("keydown", this.handlers.keydown);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.active) {
        this.focusDiv();
      }
    }
  }, {
    key: 'getAbsoluteLocation',
    value: function getAbsoluteLocation() {
      // the location top left
    }
  }, {
    key: 'focusItem',
    value: function focusItem(i) {
      this.state.store.selected = i;
      ReactDOM.findDOMNode(this['child_' + i]).focus();
    }
  }, {
    key: 'clearHover',
    value: function clearHover() {
      this.state.store.hovering = null;
    }

    // TODO: flash the highlight of a selection and return it to consumer
    // on Enter or click

  }, {
    key: 'getCursor',
    value: function getCursor() {
      return this.props.disabled ? 'not-allowed' : 'default';
    }
  }, {
    key: 'getColor',
    value: function getColor() {
      return this.props.disabled ? this.props.dColor : this.props.color;
    }

    // copying these for now from MenuItem till I figure out a way to dry them up

  }, {
    key: 'getBackgroundColor',
    value: function getBackgroundColor() {
      return this.props.highlighted ? this.props.hBackgroundColor : this.props.backgroundColor;
    }
  }, {
    key: 'decrementCursor',
    value: function decrementCursor() {
      var _this2 = this;

      var findPreviousNode = function findPreviousNode(id) {
        var menuItems = _this2.state.store.menuItems;
        var nextId = id - 1;

        while (nextId >= 0) {
          if (menuItems[nextId].disabled) {
            nextId--;
            continue;
          } else {
            return nextId;
          }
        }
        return id;
      };

      var hovering = this.state.store.hovering; //get the currently selected item
      var item = this.state.store.menuItems.find(function (item) {
        return item.id === hovering;
      }); //get the selected item
      if (hovering !== null && item && item.id > 0) {
        //do nothing if its the last item
        this.state.store.hovering = findPreviousNode(item.id); //item.id - 1;
        this.state.store.refocusPage();
      }
    }
  }, {
    key: 'incrementCursor',
    value: function incrementCursor() {
      var _this3 = this;

      // findNextNotDisabled();
      // let i = this.state.currMenuItem + 1;
      // while (this.state.menuItems[i].disabled) {
      //   i++;
      // }
      var findNextNode = function findNextNode(id) {
        var menuItems = _this3.state.store.menuItems;
        var nextId = id + 1;

        while (nextId <= _this3.state.store.menuItems.length - 1) {
          if (menuItems[nextId].disabled) {
            nextId++;
            continue;
          } else {
            return nextId;
          }
        }
        return id;
      };

      var hovering = this.state.store.hovering; //get the currently selected item
      var item = this.state.store.menuItems.find(function (item) {
        return item.id === hovering;
      }); //get the selected item
      if (hovering !== null && item && item.id < this.state.store.menuItems.length - 1) {
        //do nothing if its the last item
        this.state.store.hovering = findNextNode(item.id); //item.id + 1;

        this.state.store.refocusPage();
      }
    }

    // takes `event` and `id` as params, respectively

  }, {
    key: 'handleClick',
    value: function handleClick() {}
    //this.setState({currMenuItem: cursor});

    // takes `event` and `id` as params, respectively

  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({
        currMenuItem: -1
      });
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver(event, id) {
      this.setState({
        currMenuItem: id
      });
    }

    // takes `event` and `id` as params, respectively

  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      console.log('registered the key: ', event.key);
      //event.preventDefault();
      //this.clearHover(event);

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.decrementCursor();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.incrementCursor();
          break;
        case 'Enter':
          //this.returnSelected();
          this.state.store.selectItem(this.state.store.hovering);
          this.state.store.refocusPage();
          break;
        default:
          console.log(event.key);
      }
    }
    //copppying these for now from MenuItem till I figure out a way to dry them up

  }, {
    key: 'returnSelected',

    // end

    // TODO: flash the highlight of a selection and return it to consumer
    // on Enter or click
    value: function returnSelected() {
      /*
      if (this.state.currMenuItem !== -1 &&
        !this.state.menuItems[this.state.currMenuItem].disabled) {
        console.log(this.state.menuItems[this.state.currMenuItem]);
      }
      */
    }
  }, {
    key: 'clearHover',
    value: function clearHover() {
      this.state.store.hovering = null;
    }
  }, {
    key: 'focusDiv',
    value: function focusDiv() {
      //ReactDOM.findDOMNode(this.refs.topmenu).focus();
      //debugger
      //ReactDOM.findDOMNode(this.refs.box).focus();
    }
  }, {
    key: 'scrollUp',
    value: function scrollUp(ev) {
      ev.stopPropagation();
      this.state.store.prevPage();
    }
  }, {
    key: 'scrollDown',
    value: function scrollDown(ev) {
      ev.stopPropagation();
      this.state.store.nextPage();
    }
  }, {
    key: 'preventClose',
    value: function preventClose(ev) {
      ev.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      // [icon or check] [label or html or editable] [tips] [shortcuts] [expandable]
      return React.createElement(
        StyledMenuBox,
        {
          onMouseEnter: this.bindKeys.bind(this),
          onMouseLeave: this.unbindKeys.bind(this),
          ref: function ref(box) {
            _this4.box = box;
          },
          tabIndex: '0',
          height: this.props.menuMeta.height,

          position: this.props.position,
          top: this.props.top,
          left: this.props.left,
          onClick: this.preventClose.bind(this)
        },
        this.state.store.pages.length > 1 && this.state.store.activePage > 0 ? React.createElement(
          UpButton,
          {
            onClick: this.scrollUp.bind(this)
          },
          React.createElement(IconDisplay, { iconType: 'fa-backward' }),
          ' Previous...'
        ) : null,
        this.state.store.paginateSlot.map(function (item, i) {
          var isHighlighted = _this4.state.store.currMenuItem === i && !_this4.state.store.menuItems[_this4.state.store.currMenuItem].disabled;
          return React.createElement(MenuItem, {
            positioning: _this4.props.positioning,
            store: _this4.state.store,
            checkable: item.checkable,
            ref: function ref(instance) {
              _this4['child_' + i] = instance;
            },
            editable: _this4.props.menuMeta.editable,
            onClick: _this4.handleClick.bind(_this4),
            onMouseEnter: _this4.handleMouseOver.bind(_this4),
            onMouseLeave: _this4.handleMouseLeave.bind(_this4),
            onFocus: _this4.handleMouseOver.bind(_this4),
            disabled: item.disabled,
            label: item.label,
            highlighted: _this4.state.store.hovering === item.id,
            key: 'item_' + item.id,
            id: item.id
          });
        }),
        this.state.store.pages.length > 1 && this.state.store.activePage < this.state.store.pages.length - 1 ? React.createElement(
          'span',
          null,
          React.createElement(
            DownButton,
            {
              onClick: this.scrollDown.bind(this)
            },
            React.createElement(IconDisplay, { iconType: 'fa-forward' }),
            ' More...'
          )
        ) : null,
        this.state.store.activePage === this.state.store.pages.length - 1 && this.props.menuMeta.addable ? React.createElement(AddableMenuItem, {
          positioning: this.props.positioning,
          store: this.state.store,
          color: this.getColor(),
          cursor: this.getCursor(),
          backgroundColor: this.getBackgroundColor(),
          width: this.props.labelWidth
        }) : null
      );
    }
  }]);

  return Menu;
}(Component));

// TODO: contenteditable={true}
// TODO: scrolling

Menu.propTypes = {
  focused: PropTypes.bool,

  menuMeta: PropTypes.shape({
    store: PropTypes.object, //used if we are injecting a store
    positioning: PropTypes.object,
    floating: PropTypes.bool, //used if we are having the menu launch by right click
    checkable: PropTypes.bool,
    addable: PropTypes.bool,
    editable: PropTypes.bool,
    draggable: PropTypes.bool,
    itemsPerPage: PropTypes.number,
    // defaultSelection: null, //label or?
    highlightColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string
  }),
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  })),
  position: PropTypes.string,
  store: PropTypes.object,
  positioning: PropTypes.object,
  left: PropTypes.string,
  top: PropTypes.string

};

Menu.defaultProps = {
  focused: false, //must be true for keybindings to work
  position: 'relative',
  top: '0',
  left: '0',
  select: {
    // align: 'left' / 'right' / 'left-wide'
  },
  menuMeta: {
    checkable: false,
    addable: false,
    editable: false,
    draggable: false,
    defaultSelection: null, // label or?
    highlightColor: '#00FFFF',
    backgroundColor: '#FFFFFF',
    height: 250,
    width: '100%'
    // maxWidth
    // TODO: show fonts as images
    // TODO: HTML is a passable prop in our own code
  },
  menuItems: [{ icon: null, label: '0one', disabled: true }, { label: '1two', disabled: true }, { label: '2three' }, { label: '3banananananana' }, { label: '4whowhowho' }, { icon: null, label: '5one' }, { label: '6two', disabled: true }, { label: '7three' }, { label: '8banananananana' }, { label: '9whowhowho' }, { icon: null, label: '10one' }, { label: '11two', disabled: true }, { label: '12three', checkable: true }, { label: '13banananananana', checkable: true }, { label: '14whowhowho' }, { icon: null, label: '15one' }, { label: '16two', disabled: true }, { label: '17three' }, { label: '18banananananana' }, { label: '19whowhowho', disabled: true }]
};

export default Menu;