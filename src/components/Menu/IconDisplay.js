import React from 'react';
import styled from 'styled-components';

const IconDisplay = ({ iconType }) => {
  return (
    <i className={`fa ${iconType}`} />
  );
};

export default IconDisplay;
