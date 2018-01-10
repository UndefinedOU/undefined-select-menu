var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  cursor: ', ';\n  width: ', ';\n  /*max-width: ', ';*/\n  display: table-cell;\n  text-align: left;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: ', ';\n  margin: 1em;\n'], ['\n  cursor: ', ';\n  width: ', ';\n  /*max-width: ', ';*/\n  display: table-cell;\n  text-align: left;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: ', ';\n  margin: 1em;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  color: ', ';\n  &:visited, &:hover {\n    color: ', ';\n  }\n'], ['\n  cursor: pointer;\n  color: ', ';\n  &:visited, &:hover {\n    color: ', ';\n  }\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconDisplay from './IconDisplay';
import { observer } from "mobx-react";
import keydown, { Keys } from 'react-keydown';
import { EditForm, StyledDeletable, Noop, StyledInput } from './styles';
/*
  Editable component encapsulates the menu item where clicking on it
  truncates the menu
*/

var editIcon = 'fa-edit';
var trashIcon = 'fa-trash';

//pulled from MenuItem
var StyledEditableLabel = styled.div(_templateObject, function (props) {
  return props.cursor;
}, function (props) {
  return props.width;
}, function (props) {
  return props.width;
}, function (props) {
  return props.color;
});

var Link = styled.a(_templateObject2, function (props) {
  return props.color;
}, function (props) {
  return props.color;
});

var EditItem = observer(function (_Component) {
  _inherits(EditItem, _Component);

  function EditItem() {
    _classCallCheck(this, EditItem);

    return _possibleConstructorReturn(this, (EditItem.__proto__ || Object.getPrototypeOf(EditItem)).apply(this, arguments));
  }

  _createClass(EditItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //this.focusInput.focus();

    }
  }, {
    key: 'updateValue',
    value: function updateValue(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      this.props.store.updateLabel(ev.target.value);
    }
  }, {
    key: 'commitChanges',
    value: function commitChanges(ev) {
      ev.preventDefault();
      this.props.store.commitEditing();
    }
  }, {
    key: 'exitEditState',
    value: function exitEditState() {
      this.props.store.clearEditing();
    }
  }, {
    key: 'stopProp',
    value: function stopProp(ev) {
      ev.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onClick: this.stopProp, onSubmit: this.commitChanges.bind(this) },
        React.createElement(StyledInput, {
          type: 'text',
          autoFocus: true,
          onKeyDown: this.stopProp.bind(this),
          onBlur: this.updateValue.bind(this),
          onChange: this.updateValue.bind(this),
          defaultValue: this.props.store.editing.label })
      );
    }
  }]);

  return EditItem;
}(Component));

var DisplayItem = function DisplayItem(props) {
  return React.createElement(
    StyledEditableLabel,
    {
      color: props.color,
      cursor: props.cursor,
      width: props.width },
    props.label
  );
};

var HoveringItem = observer(function (props) {
  var setEditMode = function setEditMode(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    props.store.setEditing(props.id);
  };
  var setDeleteMode = function setDeleteMode(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    props.store.setTrashBin(props.id);
  };

  return React.createElement(
    StyledEditableLabel,
    {
      color: props.color,
      cursor: props.cursor,
      width: props.width },
    truncate(props.truncateBy, props.label),
    React.createElement(
      Link,
      { onClick: setEditMode },
      React.createElement(IconDisplay, { iconType: editIcon })
    ),
    React.createElement(
      Link,
      { onClick: setDeleteMode },
      React.createElement(IconDisplay, { iconType: trashIcon })
    )
  );
});

var DeletableItem = observer(function (props) {

  var commitDeletion = function commitDeletion(ev) {
    ev.preventDefault();
    props.store.destroyItem(props.store.trashbin);
  };

  var abortDeletion = function abortDeletion(ev) {
    ev.preventDefault();
    props.store.clearTrashBin();
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      StyledDeletable,
      {
        color: props.color,
        cursor: props.cursor,
        width: props.width
      },
      React.createElement(IconDisplay, { iconType: trashIcon }),
      'Are You Sure?',
      React.createElement(
        Link,
        { onClick: commitDeletion },
        'Yes'
      ),
      React.createElement(
        Link,
        { onClick: abortDeletion },
        'No'
      )
    )
  );
});

var EditableMenuItem = observer(function (_Component2) {
  _inherits(EditableMenuItem, _Component2);

  function EditableMenuItem(props) {
    _classCallCheck(this, EditableMenuItem);

    var _this2 = _possibleConstructorReturn(this, (EditableMenuItem.__proto__ || Object.getPrototypeOf(EditableMenuItem)).call(this, props));

    _this2.getColor = function () {
      var color = _this2.props.color;
      if (_this2.isHoverState()) {
        color = _this2.props.highlightColor;
      }
      return color;
    };

    _this2.state = {
      label: props.label,
      mode: 'display', // ['display', edit']
      hovering: false
    };
    return _this2;
  }

  _createClass(EditableMenuItem, [{
    key: 'updateLabel',
    value: function updateLabel(newLabel) {
      this.setState('label', newLabel);
    }
  }, {
    key: 'propegateUpdate',
    value: function propegateUpdate() {
      this.props.update({
        id: this.props.id,
        label: this.state.label
      });
    }
  }, {
    key: 'enterHover',
    value: function enterHover() {
      //this.props.store.hovering = this.props.id;
      //this.props.store.setHovering(this.props.id);
    }
  }, {
    key: 'exitHover',
    value: function exitHover() {}
  }, {
    key: 'isSelectedState',
    value: function isSelectedState() {
      return this.props.store.selected === this.props.id;
    }
  }, {
    key: 'isHoverState',
    value: function isHoverState() {
      return this.props.store.hovering === this.props.id;
    }
  }, {
    key: 'isEditState',
    value: function isEditState() {
      return this.props.store.editing.id === this.props.id;
    }
  }, {
    key: 'isDeleteState',
    value: function isDeleteState() {
      return this.props.store.trashbin === this.props.id;
    }
  }, {
    key: 'renderState',
    value: function renderState() {
      var props = Object.assign({}, this.props);
      props.color = this.getColor();
      if (this.isEditState()) {
        return React.createElement(EditItem, props);
      } else if (this.isDeleteState()) {
        return React.createElement(DeletableItem, props);
      } else if (this.isHoverState()) {
        return React.createElement(HoveringItem, props);
      } else {
        return React.createElement(DisplayItem, props);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        null,
        this.renderState()
      );
    }
  }]);

  return EditableMenuItem;
}(Component));

//truncates the string when it is too long
function truncate(by, str) {
  if (str.length <= by) {
    return str;
  } else {
    return str.slice(0, by) + '...';
  }
}

EditableMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  truncateBy: PropTypes.number, //how many are allowed before cutting it off and adding ...
  color: PropTypes.string,
  highlightColor: PropTypes.string,
  width: PropTypes.string, //TODO: handle edge case of 0
  cursor: PropTypes.string.isRequired,
  id: PropTypes.node.isRequired
};

EditableMenuItem.defaultProps = {
  truncateBy: 10,
  color: 'black',
  highlightColor: 'white',
  width: '100px'
};

export default EditableMenuItem;