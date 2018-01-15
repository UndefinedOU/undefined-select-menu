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
import Arrow from './assets/arrow-up-down.png';

const ITEM_HEIGHT = '24px';  //we need to work with fixed sizes for now. otherwise it won't work

const Wrapper = styled.div`
  font-family: sans-serif;
  padding: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${ITEM_HEIGHT};
  line-height: ${ITEM_HEIGHT};
  `;

const DisplayElement = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  background-image: url("${Arrow}");
  background-position: right;
  background-repeat: no-repeat;
  background-size: 20px;
  background-color: white;
  border: 1px solid #D9D9D9;
  padding: 0 0 0 15px;
  color: #2B2B2B;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  height: ${ITEM_HEIGHT};
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
      store: createStore(props),
      positioning: createSelectPositioningStore(props),
    };

    //hack to make  sure it closes when you click off the element
    this.handlers = {}
    this.handlers.closer = this.externalClose.bind(this);

  }
  externalClose(ev) {
    this.closeSelect();
    document.removeEventListener('click', this.handlers.closer);
  }
  bindEscape() {
    document.addEventListener('click', this.handlers.closer);
  }
  unbindEscape() {
    document.removeEventListener('click', this.handlers.closer);
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

  componentWillReceiveProps (nextProps) {
    //this.setState({ store: createStore(nextProps)});
    if (this.state.store) {
      //TODO: show to Yurenju
      //this.state.store.updateFromProps(nextProps);
    }
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
  getMenuHeight() {
    //derives a menu height. lets make this a fixes size for now
    return 240;
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
      ev.stopPropagation();
    }
    if (this.state.positioning.menuOpen && !this.state.store.editing.label) {
      this.state.positioning.closeMenu();
    } else {
      this.state.positioning.openMenu();
    }


    //console.log(this.state.positioning.cursorPosition.x, this.state.positioning.cursorPosition.y)
  }
  closeSelect() {
    this.state.positioning.closeMenu();
  }
  render() {
    //debugger
    return (
      <Wrapper
        onMouseEnter={this.unbindEscape.bind(this)}
        onMouseLeave={this.bindEscape.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        width={this.props.width}
        height={this.props.height}
      >
        <DisplayElement

          height={this.props.height}
          ref={(el) => {this.displayElement = el} }
          onClick={this.openSelect.bind(this)}>
            {(this.state.store.selected !== null) ? this.state.store.menuItems[this.state.store.selected].label : null}
        </DisplayElement>
         {(this.state.positioning.menuOpen) ? (
          <Menu
            position="relative"
            itemHeight={ITEM_HEIGHT}
            positioning={this.state.positioning}
            menuItems={this.props.menuItems}
            store={this.state.store}
            menuMeta={this.props.menuMeta}
            {...this.props}
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
