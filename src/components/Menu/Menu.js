import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import {observable, autorun} from 'mobx';

/*
  root of he menu,

  On creastion, should instantiate a Observer based on the initial values
  We need 3 different observables
    1. menuMeta
    2. menuItems

*/


const StyledMenuBox = styled.div`
  display: inline-block;
  border: 1px solid blue;
`;

// TODO: width determined by elements, but has max width

class Menu extends Component {
  constructor(props) {
    super(props);

    let menuItems = JSON.parse(JSON.stringify(this.props.menuItems));
    if (this.props.menuMeta.addable) {
      menuItems.push({label: "New Item +", newItem: true});
      // TODO, onclick of this item, add editable item above it
    }
    this.state = {
      currMenuItem: -1,
      menuItems,
    }
  }

  componentWillMount() {
     document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  // componentDidMount() {
  //   this.focusDiv();
  // }

  componentDidUpdate() {
    if(this.state.active)
      this.focusDiv();
    }
    focusDiv() {
      ReactDOM.findDOMNode(this.refs.topmenu).focus();
    }

    // TODO: flash the highlight of a selection and return it to consumer
    // on Enter or click
  returnSelected = () => {
    if (this.state.currMenuItem !== -1 &&
      !this.state.menuItems[this.state.currMenuItem].disabled) {
      console.log(this.state.menuItems[this.state.currMenuItem]);
    }
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

  componentDidMount () {
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

  render () {
    // [icon or check] [label or html or editable] [tips] [shortcuts] [expandable]
    return (
      <StyledMenuBox tabIndex="0" ref={instance => { this.topmenu = instance; }}>
        {this.state.menuItems.map((item, i) =>
          (this.state.currMenuItem === i &&
           !this.state.menuItems[this.state.currMenuItem].disabled)
          ?
            <MenuItem
              ref={instance => { this.child = instance; }}
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
              ref={instance => { this.child = instance; }}
              editable={this.props.menuMeta.editable}
              onClick={this.handleClick}
              onMouseOver={this.handleMouseOver}
              onMouseLeave={this.handleMouseLeave}
              disabled={item.disabled}
              label={item.label}
              key={i}
              id={i} />
            )}

      </StyledMenuBox>
    );
  }
}
// TODO: contenteditable={true}
// TODO: scrolling

Menu.propTypes = {
  menuMeta: PropTypes.shape({
    checkable: PropTypes.bool,
    addable: PropTypes.bool,
    editable: PropTypes.bool,
    draggable: PropTypes.bool,
    //defaultSelection: null, //label or?
    highlightColor: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  }))
};

Menu.defaultProps = {
  select: {
    // align: 'left' / 'right' / 'left-wide'
  },
  menuMeta: {
    checkable: false,
    addable: true,
    editable: false,
    draggable: false,
    defaultSelection: null, //label or?
    highlightColor: '#00FFFF',
    backgroundColor: '#FFFFFF',
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
