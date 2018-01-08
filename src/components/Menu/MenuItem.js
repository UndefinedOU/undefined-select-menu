
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import EditableMenuItem from './EditableMenuItem';
import AddableMenuItem from './AddableMenuItem';

const StyledMenuItem = styled.li`
  display: table;
  height: 24px;
`;

const StyledLabel = styled.div`
  cursor: ${props => props.cursor};
  width: ${props => props.width};
  max-width: ${props => props.width};
  display: table-cell;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.color};
  margin: 1em;
  background-color: ${props => (props.highlighted) ? 'yellow' : props.backgroundColor};
`;


const StyledTip = styled.div`
  display: table-cell;
  cursor: ${props => props.cursor};
  
  color: ${props => props.color};
  margin: 1em;
`;

const StyledShortcut = styled.div`
  display: table-cell;
  cursor: ${props => props.cursor};
  
  color: ${props => props.color};
  margin: 1em;
`;

class MenuItem extends Component {

  handleMouseOver (event) {
    event.preventDefault();
    this.props.store.setHovering(this.props.id);
    //if ()
    this.props.onMouseOver(event, this.props.id);
  }

  handleMouseLeave (event) {
    event.preventDefault();
    this.props.onMouseLeave(event, this.props.id);
  }

  handleClick (event)  {
    event.preventDefault();
    event.stopPropagation();
    this.props.store.selectItem(this.props.id);
    this.props.onClick(event, this.props.id);
    if (this.props.positioning) {
      this.props.positioning.closeMenu(); //both super dipatchers support this
    }
  }

  getBackgroundColor () {
    return this.props.highlighted ? this.props.hBackgroundColor :
      this.props.backgroundColor;
  }

  getColor = () => {
    return this.props.disabled ? this.props.dColor : this.props.color;
  }

  getCursor = () => {
    return this.props.disabled ? 'not-allowed' : 'default';
  }
  updateItemLabel = () => {
    console.log("Todo on label update");
  }

  isSelected() {
    return this.props.store.selected === this.id;
  }

  // handleKeyDown = (event) => {
  //   console.log("MenuItem KEYDOWN!");
  //   this.props.onKeyDown(event, this.props.id);
  // }

  // TODO: componentDID update then I know if if the browser screen is the right size
  // TODO: look at react-dnd
  // TODO: antialias/font/ SVG
  // TODO truncate long labels (compare with menu width then add ...)
  // TODO how to handle checked vs icon
  // TODO align all elements
  // TODO readd icons:   <div>{this.props.icon}</div>

  // [icon or check] [label or html] [tips] [shortcuts] [expandableArrow]
  render() {
    if (this.props.icon) {

    }
    return (
      <StyledMenuItem
        onClick={this.handleClick.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        
        ref={(ref) => { this.ref = ref; }}>
        <Icon
          show={this.props.icon || this.props.isChecked}
          color={this.getColor()}
          cursor={this.getCursor()}
          backgroundColor={this.getBackgroundColor()}
          icon={this.props.icon || 'fa-check'}>
        </Icon>

        <EditableLabel
          show={this.props.editable}
          color={this.getColor()}
          cursor={this.getCursor()}
          backgroundColor={this.getBackgroundColor()}
          width={this.props.labelWidth}
          update={this.updateItemLabel}
          label={this.props.label}
          id={this.props.id}
          store={this.props.store}
          highlighted={this.props.highlighted}
          >
        </EditableLabel>

        <Label
          show={!this.props.editable}
          color={this.getColor()}
          cursor={this.getCursor()}
          backgroundColor={this.getBackgroundColor()}
          width={this.props.labelWidth}
          label={this.props.label}>
          highlighted={this.isSelected()}
        </Label>

        <Tips
          show={this.props.tips}
          color={this.getColor()}
          cursor={this.getCursor()}
          backgroundColor={this.getBackgroundColor()}
          tips={this.props.tips}>
        </Tips>

        <Shortcut
          show={this.props.shortcut}
          color={this.getColor()}
          cursor={this.getCursor()}
          backgroundColor={this.getBackgroundColor()}
          shortcut={this.props.shortcut}>
        </Shortcut>

        <ExpandableArrow
          show={this.props.subMenu}
          color={this.getColor()}
          cursor={this.getCursor()}
          backgroundColor={this.getBackgroundColor()}>
        </ExpandableArrow>

      </StyledMenuItem>
    );
  }
}

// TODO use classnames package for rotation, etc...
// TODO pass other attributes for display?
function convertToFAName(FAName) {
  let fullClass = `fa ${FAName}`;
  return fullClass;
}

const AddMenuTab = (props) => {
  if (props.addable) {

  } else {
    return null;
  }
}

// TODO: Background color
// HACK: font awesome relies on classnames which conflicts with styled-components,
// this is to take a string name of a FontAwesome icon
function Icon(props) {
  if (!props.show) {
    return null;
  }
  const divStyle = {
    display: 'table-cell',
    color: props.color,
    backgroundColor: props.backgroundColor,
    margin: 'auto',
  };

  return (
    <div style={divStyle}>
      <i className = {convertToFAName(props.icon)} />
    </div>
  );
}

function Label (props) {
  if (!props.show) {
    return null;
  }

  return (
    <StyledLabel
      color={props.color}
      cursor={props.cursor}
      backgroundColor={props.backgroundColor}
      highlighted={props.highlighted}
      width={props.width}>
      {props.label}
    </StyledLabel>
  );
}

function EditableLabel (props) {
  if (!props.show) {
    return null;
  }

  return (
    <EditableMenuItem
      color={props.color}
      cursor={props.cursor}
      backgroundColor={props.backgroundColor}
      width={props.width}
      label={props.label}
      highlighted={props.highlighted}
      update={props.update}
      id={props.id}
      store={props.store}
    />
  );
}

function Tips (props) {
  if (!props.show) {
    return null;
  }

  const divStyle = {
    display: 'table-cell',
    color: props.color,
    backgroundColor: props.backgroundColor,
    margin: 'auto',
  };

 //TODO change
  return (
    <div>
      {props.tips.map((tip, i) =>
        (typeof(tip) === 'string' && tip.substring(0,3) === 'fa-')
        ?
        <div key={i} style={divStyle}>
          <i className={convertToFAName('fa-coffee')} />
        </div>
        :
        <StyledTip
          key={i}
          color={props.color}
          cursor={props.cursor}
          backgroundColor={props.backgroundColor}>
          {tip}
        </StyledTip>
      )}
    </div>
  );
}

function Shortcut (props) {
  if (!props.show) {
    return null;
  }

  return (
    <StyledShortcut
      color={props.color}
      cursor={props.cursor}
      backgroundColor={props.backgroundColor}>
      {props.shortcut}
    </StyledShortcut>
  );
}

function ExpandableArrow (props) {
    if (!props.show) {
      return null;
    }
    const divStyle = {
      display: 'table-cell',
      color: props.color,
      backgroundColor: props.backgroundColor,
      margin: 'auto',
    };

    return (
      <div style={divStyle}>
        <i className={convertToFAName('fa-caret-right')} />
      </div>
    );
  }


MenuItem.propTypes = {
  //icon: 'fa-coffee',
  positioning:      PropTypes.object,
  isChecked:        PropTypes.bool,
  shortcut:         PropTypes.string,
  label:            PropTypes.string,
  color:            PropTypes.string,
  dColor:           PropTypes.string,
  font:             PropTypes.node,
  tips:             PropTypes.array,
  disabled:         PropTypes.bool,
  labelWidth:       PropTypes.string,
  backgroundColor:  PropTypes.string,
  hBackgroundColor: PropTypes.string,
  editable:         PropTypes.bool,
  subMenu:          PropTypes.bool,
  id:               PropTypes.number,
  store:            PropTypes.object,
  highlighted:      PropTypes.highlighted
}

// TODO group what data goes to menu and what goes to item
// TODO disabled choices
// TODO overriding font property if not a font list?
// TODO: platform shortcuts
MenuItem.defaultProps = {
  //icon: 'fa-coffee',
  isChecked:        true,
  shortcut:         '#T',
  label:            'foo',
  color:            'red',
  dColor:           'lightgray',
  font:             null,
  tips:             [100, 200, 300, 'coffee', 'fa-coffee'],
  disabled:         false,
  labelWidth:       '10em',
  backgroundColor:  'white',
  hBackgroundColor: 'blue',
  editable:         true,
  subMenu:          true,
}

export default MenuItem;
