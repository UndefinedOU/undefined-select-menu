import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Select from '../menus/Select';
import { Wrapper, Title } from '../menus/styleComp';
import {
  FaFolder,
  FaFileImageO
} from 'react-icons/lib/fa';

import StatesField from '../menus/libselect';
import MenuItem from '../menus/MenuItem'
import Menu from '../menus/Menu'
import Button2 from '../menus/Button2'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
