var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: grid;\n  grid-template-columns: 2fr 1fr 40px;\n  grid-column-gap: 10px;\n  height: 24px;\n  font-family: sans-serif;\n  padding-left: 20px;\n  background-color: ', ';\n  color: ', ';\n'], ['\n  display: grid;\n  grid-template-columns: 2fr 1fr 40px;\n  grid-column-gap: 10px;\n  height: 24px;\n  font-family: sans-serif;\n  padding-left: 20px;\n  background-color: ', ';\n  color: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  cursor: ', ';\n  width: ', ';\n  max-width: ', ';\n  display: table-cell;\n  text-align: left;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  margin: 1em;\n'], ['\n  cursor: ', ';\n  width: ', ';\n  max-width: ', ';\n  display: table-cell;\n  text-align: left;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  margin: 1em;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding-right: 5px;\n  display: inline;\n\n  cursor: ', ';\n  color: ', ';\n'], ['\n  padding-right: 5px;\n  display: inline;\n\n  cursor: ', ';\n  color: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: table-cell;\n  cursor: ', ';\n\n  color: ', ';\n  margin: 1em;\n'], ['\n  display: table-cell;\n  cursor: ', ';\n\n  color: ', ';\n  margin: 1em;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import EditableMenuItem from './EditableMenuItem';
import AddableMenuItem from './AddableMenuItem';
import CheckIcon from './CheckIcon';

var SECONDARY_COLOR = '#B4B4B4';

var StyledMenuItem = styled.li(_templateObject, function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.color;
});

var StyledLabel = styled.div(_templateObject2, function (props) {
  return props.cursor;
}, function (props) {
  return props.width;
}, function (props) {
  return props.width;
});

var StyledTip = styled.div(_templateObject3, function (props) {
  return props.cursor;
}, function (props) {
  return props.color;
});

var StyledShortcut = styled.div(_templateObject4, function (props) {
  return props.cursor;
}, function (props) {
  return props.color;
});

var MenuItem = function (_Component) {
  _inherits(MenuItem, _Component);

  function MenuItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.getColor = function () {
      var color = _this.props.color;
      if (_this.props.disabled) {
        color = _this.props.dColor;
      } else if (_this.props.highlighted) {
        color = _this.props.highlightColor;
      }
      return color;
    }, _this.getCursor = function () {
      return _this.props.disabled ? 'not-allowed' : 'default';
    }, _this.updateItemLabel = function () {
      console.log("Todo on label update");
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MenuItem, [{
    key: 'handleMouseOver',
    value: function handleMouseOver(event) {
      event.preventDefault();
      if (!this.props.store.menuItems[this.props.id].disabled) {
        this.props.store.setHovering(this.props.id);
      }
      //if ()
      //this.props.onMouseOver(event, this.props.id);
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(event) {
      event.preventDefault();
      this.props.onMouseLeave(event, this.props.id);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.props.store.selectItem(this.props.id);
      this.props.onClick(event, this.props.id);
      if (this.props.positioning) {
        this.props.positioning.closeMenu(); //both super dipatchers support this
      }
    }
  }, {
    key: 'getBackgroundColor',
    value: function getBackgroundColor() {
      return this.props.highlighted ? this.props.hBackgroundColor : this.props.backgroundColor;
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      return this.props.store.selected === this.id;
    }

    // handleKeyDown = (event) => {
    //   console.log("MenuItem KEYDOWN!");
    //   this.props.onKeyDown(event, this.props.id);
    // }

    // TODO: componentDID update then I know if if the browser screen is the right size
    // TODO: look at react-dnd
    // TODO: antialias/font/ SVG
    // TODO truncate long labels (compare with menu width then add ...)
    // TODO how to handle checked vs icon
    // TODO align all elements
    // TODO readd icons:   <div>{this.props.icon}</div>

    // [icon or check] [label or html] [tips] [shortcuts] [expandableArrow]

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.props.icon) {}
      return React.createElement(
        StyledMenuItem,
        {
          onClick: this.handleClick.bind(this),
          onMouseEnter: this.handleMouseOver.bind(this),
          onMouseLeave: this.handleMouseLeave.bind(this),
          backgroundColor: this.getBackgroundColor(),
          color: this.getColor(),
          ref: function ref(_ref2) {
            _this2.ref = _ref2;
          } },
        React.createElement(
          'div',
          null,
          React.createElement(Icon, {
            show: this.props.icon || this.props.isChecked,
            color: this.getColor(),
            cursor: this.getCursor(),
            icon: this.props.icon || 'fa-check' }),
          React.createElement(CheckIcon, {
            id: this.props.id,
            checkable: this.props.checkable,
            store: this.props.store
          }),
          React.createElement(EditableLabel, {
            show: this.props.editable,
            color: this.getColor(),
            cursor: this.getCursor(),
            width: this.props.labelWidth,
            update: this.updateItemLabel,
            label: this.props.label,
            id: this.props.id,
            store: this.props.store,
            highlighted: this.props.highlighted
          }),
          React.createElement(
            Label,
            {
              show: !this.props.editable,
              color: this.getColor(),
              cursor: this.getCursor(),
              width: this.props.labelWidth,
              label: this.props.label },
            'highlighted=',
            this.isSelected()
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(Tips, {
            show: this.props.tips,
            color: SECONDARY_COLOR,
            cursor: this.getCursor(),
            tips: this.props.tips })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(Shortcut, {
            show: this.props.shortcut,
            color: SECONDARY_COLOR,
            cursor: this.getCursor(),
            shortcut: this.props.shortcut }),
          React.createElement(ExpandableArrow, {
            show: this.props.subMenu,
            color: SECONDARY_COLOR,
            cursor: this.getCursor() })
        )
      );
    }
  }]);

  return MenuItem;
}(Component);

// TODO use classnames package for rotation, etc...
// TODO pass other attributes for display?


function convertToFAName(FAName) {
  var fullClass = 'fa ' + FAName;
  return fullClass;
}

var AddMenuTab = function AddMenuTab(props) {
  if (props.addable) {} else {
    return null;
  }
};

// TODO: Background color
// HACK: font awesome relies on classnames which conflicts with styled-components,
// this is to take a string name of a FontAwesome icon
function Icon(props) {
  if (!props.show) {
    return null;
  }
  var divStyle = {
    color: props.color,
    backgroundColor: props.backgroundColor,
    margin: 'auto'
  };

  return React.createElement(
    'div',
    { style: divStyle },
    React.createElement('i', { className: convertToFAName(props.icon) })
  );
}

function Label(props) {
  if (!props.show) {
    return null;
  }

  return React.createElement(
    StyledLabel,
    {
      color: props.color,
      cursor: props.cursor,
      backgroundColor: props.backgroundColor,
      highlighted: props.highlighted,
      width: props.width },
    props.label
  );
}

function EditableLabel(props) {
  if (!props.show) {
    return null;
  }

  return React.createElement(EditableMenuItem, {
    color: props.color,
    cursor: props.cursor,
    backgroundColor: props.backgroundColor,
    width: props.width,
    label: props.label,
    highlighted: props.highlighted,
    update: props.update,
    id: props.id,
    store: props.store
  });
}

function Tips(props) {
  if (!props.show) {
    return null;
  }

  var divStyle = {
    color: props.color,
    backgroundColor: props.backgroundColor,
    display: 'inline',
    paddingRight: '5px'
  };

  //TODO change
  return React.createElement(
    'div',
    null,
    props.tips.map(function (tip, i) {
      return typeof tip === 'string' && tip.substring(0, 3) === 'fa-' ? React.createElement(
        'div',
        { key: i, style: divStyle },
        React.createElement('i', { className: convertToFAName('fa-coffee') })
      ) : React.createElement(
        StyledTip,
        {
          key: i,
          color: props.color,
          cursor: props.cursor,
          backgroundColor: props.backgroundColor },
        tip
      );
    })
  );
}

function Shortcut(props) {
  if (!props.show) {
    return null;
  }

  return React.createElement(
    StyledShortcut,
    {
      color: props.color,
      cursor: props.cursor,
      backgroundColor: props.backgroundColor },
    props.shortcut
  );
}

function ExpandableArrow(props) {
  if (!props.show) {
    return null;
  }
  var divStyle = {
    display: 'table-cell',
    color: props.color,
    backgroundColor: props.backgroundColor,
    margin: 'auto'
  };

  return React.createElement(
    'div',
    { style: divStyle },
    React.createElement('i', { className: convertToFAName('fa-caret-right') })
  );
}

MenuItem.propTypes = {
  //icon: 'fa-coffee',
  positioning: PropTypes.object,
  isChecked: PropTypes.bool,
  checkable: PropTypes.bool,
  shortcut: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  highlightColor: PropTypes.string,
  dColor: PropTypes.string,
  font: PropTypes.node,
  tips: PropTypes.array,
  disabled: PropTypes.bool,
  labelWidth: PropTypes.string,
  backgroundColor: PropTypes.string,
  hBackgroundColor: PropTypes.string,
  editable: PropTypes.bool,
  subMenu: PropTypes.bool,
  id: PropTypes.number,
  store: PropTypes.object,
  highlighted: PropTypes.highlighted

  // TODO group what data goes to menu and what goes to item
  // TODO disabled choices
  // TODO overriding font property if not a font list?
  // TODO: platform shortcuts
};MenuItem.defaultProps = {
  //icon: 'fa-coffee',
  isChecked: false,
  shortcut: '',
  label: 'foo',
  color: 'black',
  highlightColor: 'white',
  dColor: 'lightgray',
  font: null,
  tips: [],
  disabled: false,
  labelWidth: '10em',
  backgroundColor: 'white',
  hBackgroundColor: '#5D9EFE',
  editable: true,
  subMenu: false
};

export default MenuItem;
