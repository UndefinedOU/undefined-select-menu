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
import { find } from 'lodash';

//let ReactDOM = require('react-dom');

/*
  root of he menu,

  On creastion, should instantiate a Observer based on the initial values
  We need 3 different observables
    1. menuMeta
    2. menuItems

*/


const StyledMenuBox = styled.ul`
  position: ${(props) => props.position || 'relative'};
  height: ${(props) => props.height }px;
  display: inline-block;
  border: 1px solid blue;
  margin-top: 0px;
  margin-left: 0px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const UpButton = styled.li`

`;

const DownButton = styled.li`

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
      if (!this.props.store.menuItems) {
        this.state.store.setItems(this.props.menuItems);
      }
    } else {
      this.state = {
        store: createStore(props),
        currMenuItem: -1,
        // menuItems: props.menuItems,
        //menuItems: props.menuItems,
      };
    }
    this.clearHover = this.clearHover.bind(this);

    this.handlers = {
      keydown: null
    };

    //THis makes sure when we unbind and rebind keys, the reference is preserved so we
    //avoid any multiple bound functions for a single instance tomfoolery
    this.handlers.keydown = this.handleKeyDown.bind(this);
    
    this.dispose = {};

  }

  componentWillMount() {
    //this.handlers.key = this.handlerKeyDown.bind(this);
    
    // focus on the first item
  }

  componentDidMount() {
    // this.focusDiv();
    //this.focusItem(0);
  }

  componentWillUnmount() {
    this.unbindKeys();
  }

  bindKeys() {
    console.log('binding keys');
    document.addEventListener("keydown", this.handlers.keydown);
    //this.focusDiv()
    
  }
  unbindKeys() {
    console.log('unbinding keys');
    //debugger
    document.removeEventListener("keydown", this.handlers.keydown);
  }

  componentDidUpdate() {
    if (this.state.active) {
      this.focusDiv();
    }
  }
  
  getAbsoluteLocation () {
    // the location top left
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

  getCursor() {
    return this.props.disabled ? 'not-allowed' : 'default';
  }

  getColor() {
    return this.props.disabled ? this.props.dColor : this.props.color;
  }

  // copying these for now from MenuItem till I figure out a way to dry them up
  getBackgroundColor() {
    return this.props.highlighted ? this.props.hBackgroundColor :
      this.props.backgroundColor;
  }

  decrementCursor() {
    let hovering = this.state.store.hovering; //get the currently selected item
    let item = this.state.store.menuItems.find(item => item.id === hovering); //get the selected item
    if ((hovering !== null) && item && item.id > 0) { //do nothing if its the last item
      this.state.store.hovering = item.id - 1;
      this.state.store.refocusPage();
    }
  }

  incrementCursor () {
    // findNextNotDisabled();
    // let i = this.state.currMenuItem + 1;
    // while (this.state.menuItems[i].disabled) {
    //   i++;
    // }
    let hovering = this.state.store.hovering; //get the currently selected item
    let item = this.state.store.menuItems.find(item => item.id === hovering); //get the selected item
    if ((hovering !== null) && item && item.id < (this.state.store.menuItems.length - 1)) { //do nothing if its the last item
      this.state.store.hovering = item.id + 1;
      this.state.store.refocusPage();
    }
  }

  // takes `event` and `id` as params, respectively
  handleClick() {
    //this.setState({currMenuItem: cursor});
  }
  // takes `event` and `id` as params, respectively
  handleMouseLeave() {
    this.setState({
      currMenuItem: -1,
    });
  }

  handleMouseOver(event, id) {
    this.setState({
      currMenuItem: id,
    });
  }

  // takes `event` and `id` as params, respectively
  handleKeyDown(event) {
    console.log('registered the key: ', event.key);
    //event.preventDefault();
    //this.clearHover(event);

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.decrementCursor();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.incrementCursor();
        break;
      case 'Enter':
        //this.returnSelected();
        this.state.store.selectItem(this.state.store.hovering);
        this.state.store.refocusPage();
        break;
      default:
        console.log(event.key);
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

  // TODO: flash the highlight of a selection and return it to consumer
  // on Enter or click
  returnSelected() {
    /*
    if (this.state.currMenuItem !== -1 &&
      !this.state.menuItems[this.state.currMenuItem].disabled) {
      console.log(this.state.menuItems[this.state.currMenuItem]);
    }
    */
  }

  clearHover() {
    this.state.store.hovering = null;
  }


  focusDiv() {
    //ReactDOM.findDOMNode(this.refs.topmenu).focus();
    //debugger
    //ReactDOM.findDOMNode(this.refs.box).focus();
  }

  scrollUp(ev) {
    ev.stopPropagation();
    this.state.store.prevPage();
  }
  scrollDown(ev) {
    ev.stopPropagation();
    this.state.store.nextPage();
  }
  preventClose(ev) {
    ev.stopPropagation();
  }

  render() {
    // [icon or check] [label or html or editable] [tips] [shortcuts] [expandable]
    return (
      <StyledMenuBox
        onMouseEnter={this.bindKeys.bind(this)}
        onMouseLeave={this.unbindKeys.bind(this)}
        ref={(box) => {this.box = box}}
        tabIndex="0"
        height={this.props.menuMeta.height}
        
        position={this.props.position}
        top={this.props.top}
        left={this.props.left}
        onClick={this.preventClose.bind(this)}
      >
        {`selected ${this.state.store.selected} hovering: ${this.state.store.hovering}`}
        {((this.state.store.pages.length > 1) && (this.state.store.activePage > 0)) ? (
          <UpButton
            onClick={this.scrollUp.bind(this)}
          >
            up arrow
          </UpButton>
        ) : null}

        {this.state.store.paginateSlot.map((item, i) => {
          const isHighlighted = this.state.store.currMenuItem === i &&
            !this.state.store.menuItems[this.state.store.currMenuItem].disabled;
          return (<MenuItem
            positioning={this.props.positioning}
            store={this.state.store}
            ref={(instance) => { this[`child_${i}`] = instance; }}
            editable={this.props.menuMeta.editable}
            onClick={this.handleClick.bind(this)}
            onMouseEnter={this.handleMouseOver.bind(this)}
            onMouseLeave={this.handleMouseLeave.bind(this)}
            onFocus={this.handleMouseOver.bind(this)}
            disabled={item.disabled}
            label={item.label}
            highlighted={this.state.store.hovering === item.id }
            key={`item_${item.id}`}
            id={item.id}
          />);
        })}
        

        {((this.state.store.pages.length > 1) && (this.state.store.activePage < (this.state.store.pages.length - 1))) ? (
          <span>
            <DownButton
              onClick={this.scrollDown.bind(this)}
            >
              down arrow
            </DownButton>

          </span>

        ) : null}

        {((this.state.store.activePage === (this.state.store.pages.length - 1)) && this.props.menuMeta.addable) ?
          <AddableMenuItem
            positioning={this.props.positioning}
            store={this.state.store}
            color={this.getColor()}
            cursor={this.getCursor()}
            backgroundColor={this.getBackgroundColor()}
            width={this.props.labelWidth}
          /> : null
        }

      </StyledMenuBox>
    );
  }
});


// TODO: contenteditable={true}
// TODO: scrolling

Menu.propTypes = {
  focused: PropTypes.bool,
  
  menuMeta: PropTypes.shape({
    store: PropTypes.object, //used if we are injecting a store
    positioning: PropTypes.object,
    floating: PropTypes.bool, //used if we are having the menu launch by right click
    checkable: PropTypes.bool,
    addable: PropTypes.bool,
    editable: PropTypes.bool,
    draggable: PropTypes.bool,
    itemsPerPage: PropTypes.number,
    // defaultSelection: null, //label or?
    highlightColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
  }),
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),
  position: PropTypes.string,
  store: PropTypes.object,
  positioning: PropTypes.object,
  left: PropTypes.string,
  top: PropTypes.string

};

Menu.defaultProps = {
  focused: false,  //must be true for keybindings to work
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
    defaultSelection: null, // label or?
    highlightColor: '#00FFFF',
    backgroundColor: '#FFFFFF',
    height: 250,
    width: '100%',
    // maxWidth
    // TODO: show fonts as images
    // TODO: HTML is a passable prop in our own code
  },
  menuItems: [
    { icon: null, label: '0one' },
    { label: '1two', disabled: true },
    { label: '2three' },
    { label: '3banananananana' },
    { label: '4whowhowho' },
    { icon: null, label: '5one' },
    { label: '6two', disabled: true },
    { label: '7three' },
    { label: '8banananananana' },
    { label: '9whowhowho' },
    { icon: null, label: '10one' },
    { label: '11two', disabled: true },
    { label: '12three' },
    { label: '13banananananana' },
    { label: '14whowhowho' },
    { icon: null, label: '15one' },
    { label: '16two', disabled: true },
    { label: '17three' },
    { label: '18banananananana' },
    { label: '19whowhowho' }
  ],
};

export default Menu;
