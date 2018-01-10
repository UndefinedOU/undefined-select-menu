var _templateObject = _taggedTemplateLiteral(['\n  display: table;\n'], ['\n  display: table;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  cursor: ', ';\n  width: ', ';\n  max-width: ', ';\n  display: table-cell;\n  text-align: left;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  background-color: ', ';\n  color: ', ';\n  margin: 1em;\n'], ['\n  cursor: ', ';\n  width: ', ';\n  max-width: ', ';\n  display: table-cell;\n  text-align: left;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  background-color: ', ';\n  color: ', ';\n  margin: 1em;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n\n'], ['\n\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  margin: 0px\n  padding: 0px\n'], ['\n  margin: 0px\n  padding: 0px\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';

export var StyledMenuItem = styled.div(_templateObject);

export var StyledLabel = styled.div(_templateObject2, function (props) {
  return props.cursor;
}, function (props) {
  return props.width;
}, function (props) {
  return props.width;
}, function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.color;
});

export var EditForm = styled.form(_templateObject3);

export var StyledInput = styled.input(_templateObject3);

export var StyledDeletable = styled.div(_templateObject3);

var Noop = styled.span(_templateObject4);