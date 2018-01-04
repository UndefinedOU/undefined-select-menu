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
import { observable, autorun} from 'mobx';
import createStore from '../store/menu'
import Menu from './Menu/Menu';


const Wrapper = styled.div`
  width: ${(props) => props.width}
  height: ${(props) => props.height}
`;

const DisplayElement = styled.div`
  border: 1px solid black;
  background-color: blue;
  opacity: 0.5;
  cursor: pointer;
`;

const StyledSelector = styled.ul`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const StyledOption = styled.li`
  display: ${(props) => props.visible ? 'block' : 'hidden'};
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  list-style-type: none;
`;

/* 
  Here we create a store



*/
const createSelectPositioningStore = (props) => {
  return observable({
    cursorPosition: {x: 0, y: 0},
    spawnPoint: {x: 0, y: 0},
    menuOpen: false,
    openMenu () {
      this.menuOpen = true;
    },
    closeMenu () {
      this.menuOpen = false;
    },
    setCursorPosition(x, y) {
      this.cursorPosition.x = x;
      this.cursorPosition.y = y;
    },
    setSpawnPoint() {
      this.spawnPoint.x = this.cursorPosition.x;
      this.spawnPoint.y = this.cursorPosition.y;
    }
  });
}


class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: createStore(props),
      positioning: createSelectPositioningStore(props),
    };
  }
  getDisplayHeight() {
    // https://stackoverflow.com/questions/39767482/is-there-a-way-to-check-if-the-react-component-is-unmounted
    //TODO: is an antipattern but it will do for now
    if (this._isMounted) {
      return ReactDOM.findDOMNode(this.displayElement).height;
    } else {
      return '0px';
    }
  }
  getDisplayWidth() {
    if (this._isMounted) {
      return ReactDOM.findDOMNode(this.displayElement).width;
    } else {
      return '0px';
    }
  }
  openSelect(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.state.positioning.openMenu();
  }
  closeSelect() {
    this.state.positioning.closeMenu();
  }
  render() {
    return (
      <Wrapper
        width={this.props.width}
        height={this.props.height}
      >
        <DisplayElement  ref={(el) => this.displayElement = el } onClick={this.openSelect.bind(this)}>Display element</DisplayElement>
        {(this.state.positioning.menuOpen) ? (
          <StyledSelector
            width={this.getDisplayWidth()}
            height={this.getDisplayHeight()}

          ><StyledOption>selections</StyledOption></StyledSelector>
         ) : null}
      
      </Wrapper>
    );
  }
};

Select.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

Select.defaultProps = {
  width: '100%',
  height: '100%'
};

let SelectElement = observer(Select); //export is weird
export {
  SelectElement as Select
}
