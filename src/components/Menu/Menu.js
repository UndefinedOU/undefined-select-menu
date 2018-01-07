import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { observable, autorun} from 'mobx';
import {observer, propTypes} from 'mobx-react';
import keydown, { Keys } from 'react-keydown';
import AddableMenuItem from './AddableMenuItem';
import createStore from '../../store/menu';

/*
  root of he menu,

  On creastion, should instantiate a Observer based on the initial values
  We need 3 different observables
    1. menuMeta
    2. menuItems

*/


const StyledMenuBox = styled.ul`
  position: ${(props) => props.position || 'relative'};
  height: ${(props) => props.height };
  display: inline-block;
  border: 1px solid blue;
  margin-top: 0px;
  margin-left: 0px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const Menu = observer(class Menu extends Component {
  constructor(props) {
    super(props);
    /*
    let menuItems = JSON.parse(JSON.stringify(this.props.menuItems));
    if (this.props.menuMeta.addable) {
      menuItems.push({label: "New Item +", newItem: true});
      // TODO, onclick of this item, add editable item above it
    }
    */
    if (props.store) {
      this.state = {
        store: props.store,
        currMenuItem: -1
      };
      debugger
      if (!this.props.store.menuItems) {
        this.state.store.menuItems = this.props.menuItems;
      }
    } else {
      this.state = {
        store: createStore(props),
        currMenuItem: -1,
        //menuItems: props.menuItems,
      };
    }
  }

  componentWillMount() {
     //document.addEventListener("keydown", this.handleKeyDown.bind(this));
    //focus on the first item


  }

  componentWillUnmount() {
      //document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentDidMount() {
    //this.focusDiv();
    this.focusItem(0);
  }

  componentDidUpdate() {
    if(this.state.active)
      this.focusDiv();
  }
  
  getAbsoluteLocation () {
    // the location top left
  }
  
  focusDiv() {
    ReactDOM.findDOMNode(this.refs.topmenu).focus();
  }

  focusItem(i) {
    this.state.store.selected = i;
    ReactDOM.findDOMNode(this[`child_${i}`]).focus();
  }

  clearHover() {
    this.state.store.hovering = null;
  }

    // TODO: flash the highlight of a selection and return it to consumer
    // on Enter or click
  returnSelected = () => {
    /*
    if (this.state.currMenuItem !== -1 &&
      !this.state.menuItems[this.state.currMenuItem].disabled) {
      console.log(this.state.menuItems[this.state.currMenuItem]);
    }
    */

  }

  decrementCursor = () => {
    console.log("entering dec cursor: " + this.state.currMenuItem);
    let cursor = this.state.currMenuItem - 1;
    if (cursor < 0) {
      cursor = 0;
    }
    this.setState({currMenuItem: cursor}, () => console.log("DEC CURSPR" + this.state.currMenuItem));
  }

  incrementCursor = () => {
    //findNextNotDisabled();
    // let i = this.state.currMenuItem + 1;
    // while (this.state.menuItems[i].disabled) {
    //   i++;
    // }
    let cursor = this.state.currMenuItem + 1;
    if (cursor >= this.state.menuItems.length) {
      cursor = this.state.menuItems.length - 1;
    }
    this.setState({currMenuItem: cursor});
  }

  handleClick = (event, id) => {
    this.returnSelected();
  }

  handleMouseLeave = (event, id) => {
    this.setState({
      currMenuItem: -1,
    });
  }

  handleMouseOver = (event, id) => {
    this.setState({
      currMenuItem: id,
    });
  }

  handleKeyDown = (event, id) => {
    event.preventDefault();
    switch(event.key) {
      case 'ArrowUp':
        this.decrementCursor();
        break;
      case 'ArrowDown':
        this.incrementCursor();
        break;
      case 'Enter':
        this.returnSelected();
        break;
      default:
        console.log(event.key);
        return;
    }
  }
  //copppying these for now from MenuItem till I figure out a way to dry them up
  getBackgroundColor = () => {
    return this.props.highlighted ? this.props.hBackgroundColor :
      this.props.backgroundColor;
  }

  getColor = () => {
    return this.props.disabled ? this.props.dColor : this.props.color;
  }

  getCursor = () => {
    return this.props.disabled ? 'not-allowed' : 'default';
  }
  // end

  render () {
    // [icon or check] [label or html or editable] [tips] [shortcuts] [expandable]
    return (

        <StyledMenuBox
          ref={(box) => {this.box = box}}
          onMouseLeave={this.clearHover.bind(this)}
          tabIndex="0"
          ref={instance => { this.topmenu = instance; }}
          position={this.props.position}
          top={this.props.top}
          left={this.props.left}
        >
          
          {this.state.store.menuItems.map((item, i) =>
            (this.state.store.currMenuItem === i &&
            !this.state.store.menuItems[this.state.store.currMenuItem].disabled)
            ?
              <MenuItem
                positioning={this.props.positioning}
                store={this.state.store}
                ref={instance => { this[`child_${i}`] = instance; }}
                editable={this.props.menuMeta.editable}
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
                disabled={item.disabled}
                label={item.label}
                highlighted
                key={i}
                id={i} />
            :
              <MenuItem
                positioning={this.props.positioning}
                store={this.state.store}
                ref={instance => { this[`child_${i}`] = instance; }}
                editable={this.props.menuMeta.editable}
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
                disabled={item.disabled}
                label={item.label}
                key={i}
                id={i} />
              )}

          {(this.props.menuMeta.addable) ? 
            (<AddableMenuItem
              store={this.state.store}
              color={this.getColor()}
              cursor={this.getCursor()}
              backgroundColor={this.getBackgroundColor()}
              width={this.props.labelWidth}
          ></AddableMenuItem>)

          : null}

        </StyledMenuBox>
    );
  }
})
// TODO: contenteditable={true}
// TODO: scrolling

Menu.propTypes = {
  
  menuMeta: PropTypes.shape({
    store: PropTypes.object, //used if we are injecting a store
    positioning: PropTypes.object,
    floating: PropTypes.bool, //used if we are having the menu launch by right click
    checkable: PropTypes.bool,
    addable: PropTypes.bool,
    editable: PropTypes.bool,
    draggable: PropTypes.bool,
    //defaultSelection: null, //label or?
    highlightColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string
  }),
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  })),
  position: PropTypes.string,
  store: PropTypes.object,
  positioning: PropTypes.object,
  left: PropTypes.string,
  top: PropTypes.string

};

Menu.defaultProps = {
  position: 'relative',
  top: '0',
  left: '0',
  select: {
    // align: 'left' / 'right' / 'left-wide'
  },
  menuMeta: {
    checkable: false,
    addable: false,
    editable: false,
    draggable: false,
    defaultSelection: null, //label or?
    highlightColor: '#00FFFF',
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    // maxWidth
    // TODO: show fonts as images
    // TODO: HTML is a passable prop in our own code
  },
  menuItems: [
      {icon: null, label: 'one'},
      {label: 'two', disabled: true},
      {label: 'three'},
      {label: 'banananananana'},
      {label: 'whowhowho'}
  ],
}

export default Menu;
