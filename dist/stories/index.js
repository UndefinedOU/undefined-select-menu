import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Select from '../menus/Select';
import { Wrapper, Title } from '../menus/styleComp';
import { FaFolder, FaFileImageO } from 'react-icons/lib/fa';

import StatesField from '../menus/libselect';
import MenuItem from '../menus/MenuItem';
import Menu from '../menus/Menu';
import Button2 from '../menus/Button2';

storiesOf('Welcome', module).add('to Storybook', function () {
  return React.createElement(Welcome, { showApp: linkTo('Button') });
});

storiesOf('Button', module).add('with text', function () {
  return React.createElement(
    Button,
    { onClick: action('clicked') },
    'Hello Button'
  );
}).add('with some emoji', function () {
  return React.createElement(
    Button,
    { onClick: action('clicked') },
    '\uD83D\uDE00 \uD83D\uDE0E \uD83D\uDC4D \uD83D\uDCAF'
  );
});