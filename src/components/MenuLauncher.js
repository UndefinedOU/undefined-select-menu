/*
  Launcher is a componenet that wraps a child and takes a menu.
  It makes the component a clickable area where you can control. where the menu is openned

  a context object is injected into the menu which can be modified
  by children mounted inside the launchable. This determines if the
  area can launch a menu and delivers a top/left attribute long with 
  windowing dimensions for determining the size and type.

  Windowing
    window: (x,y)
    spawnPosition: (x, y)
  


  on Mounting of the menu ie: showing: 

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


const WrapperEl = styled.div`
  margin: 0;
  padding: 0;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;


//here we create a store
const createPositioningStore = (props) => {
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

class MenuLauncher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: createStore(props),
      positioning: createPositioningStore(props),
    };
  }
  onRightClick (ev) {
    ev.preventDefault();
    console.log('right clicked!!');
    this.state.positioning.setSpawnPoint();
    this.state.positioning.openMenu();
  }
  onMouseEnter (ev) {

  }
  onMouseMove (ev) {
    ev.preventDefault();
    this.state.positioning.setCursorPosition(ev.pageX, ev.pageY);
  }
  onMouseLeave() {

  }
  render() {
    return (
      <WrapperEl
        width={this.props.width}
        height={this.props.height}
        onMouseMove={this.onMouseMove.bind(this)}
        onContextMenu={this.onRightClick.bind(this)}
      >
        
        {React.cloneElement(this.props.children, {
          store: this.state.store,
          positioning: this.state.positioning
        })}
        {(this.state.positioning.menuOpen) ? (
        <Menu
          position="absolute"
          top={`${this.state.positioning.spawnPoint.y}px`}
          left={`${this.state.positioning.spawnPoint.x}px`}
          positioning={this.state.positioning}
          menuItems={this.props.menuItems}
          store={this.state.store}
          menuMeta={this.props.menuMeta}
        />) : null }
      </WrapperEl>
    )
  }

}

MenuLauncher.propTypes = {
  //menu: PropTypes.node.isRequired
};

MenuLauncher.defaultProps = {

};


export default observer(MenuLauncher);
