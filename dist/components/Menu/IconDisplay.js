import React from 'react';
import styled from 'styled-components';

var IconDisplay = function IconDisplay(_ref) {
  var iconType = _ref.iconType;

  return React.createElement('i', { className: 'fa ' + iconType });
};

export default IconDisplay;