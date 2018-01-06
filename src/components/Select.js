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


const ITEM_HEIGHT = '20px';  //we need to work with fixed sizes for now. otherwise it won't work

const Wrapper = styled.div`
  padding: 0px;
  width: ${(props) => props.width}
  height: ${(props) => props.height}
`;

const DisplayElement = styled.div`
  border: 1px solid black;
  background-color: blue;
  opacity: 0.5;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  height: ${(props) => ITEM_HEIGHT};
`;

const StyledSelector = styled.ul`
  padding: 0px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid black;
  overflow: visible;
  z-index: 1;
`;

const StyledOption = styled.li`
  display: ${(props) => props.visible ? 'block' : 'hidden'};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  height: ${(props) => ITEM_HEIGHT};
  list-style-type: none;
  margin: ${(props) => 1 - props.offset}
`;

/* 
  Here we create a store



*/
const createSelectPositioningStore = (props) => {
  return observable({
    cursorPosition: {x: 0, y: 0},
    spawnPoint: {x: 0, y: 0},
    windowPositioning: {x: 0, y:0},
    menuOpen: false,
    selected: null,
    perPage: 10,
    offset: 0,

    openMenu () {
      this.menuOpen = true;
    },
    closeMenu () {
      this.menuOpen = false;
    },
    setWindowPositioning(x, y) {
      this.windowPositioning.x = x;
      this.windowPositioning.y = y;
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
  updatePosition() {
    let element = ReactDOM.findDOMNode(this.displayElement);
    let topPos = element.getBoundingClientRect().top + window.scrollY;
    let leftPos = element.getBoundingClientRect().left + window.scrollX;
    console.log(topPos, leftPos);
    this.state.positioning.setWindowPositioning(leftPos, topPos);
  }
  componentDidMount() { 
    this._ismounted = true;
    //this.state.positioning.displayHeight = ReactDOM.findDOMNode(this.displayElement).style.height;
    this.updatePosition();
  }
  componentWillUnmount() {
     this._ismounted = false;
  }
  onMouseMove(ev) {
    this.state.positioning.setCursorPosition(ev.pageX, ev.pageY);
    console.log(this.state.positioning.cursorPosition.x, this.state.positioning.cursorPosition.y)
  }
  getDisplayHeight() {
    // https://stackoverflow.com/questions/39767482/is-there-a-way-to-check-if-the-react-component-is-unmounted
    //TODO: is an antipattern but it will do for now
    if (this._ismounted) {
      return this.state.positioning.displayHeight;
    } else {
      return '0px';
    }
  }
  getDisplayWidth() {
    if (this._ismounted) {
      return ReactDOM.findDOMNode(this.displayElement).style.width;
    } else {
      return '0px';
    }
  }
  openSelect(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.state.positioning.openMenu();
    console.log(this.state.positioning.cursorPosition.x, this.state.positioning.cursorPosition.y)
  }
  closeSelect() {
    this.state.positioning.closeMenu();
  }
  render() {
    return (
      <Wrapper
        onMouseMove={this.onMouseMove.bind(this)}
        width={this.props.width}
        height={this.props.height}
      >
        <DisplayElement 
          height={this.props.height}
          ref={(el) => {this.displayElement = el} }
          onClick={this.openSelect.bind(this)}>
            Display element {this.children}
        </DisplayElement>
         {(this.state.positioning.menuOpen) ? (
          <Menu
            position="relative"
            itemHeight={ITEM_HEIGHT}
            positoning={this.state.positioning}
            menuItems={this.props.menuItems}
            store={this.state.store}
            menuMeta={this.props.menuMeta}
          />
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
