import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconDisplay from './IconDisplay';

/*
  Editable component encapsulates the menu item where clicking on it 
  truncates the menu
*/

const editIcon  = 'fa-edit';
const trashIcon = 'fa-trash';

const Noop = styled.span`
  margin: 0px
  padding: 0px
`;

const EditForm = styled.form`

`;

const StyledInput = styled.input`

`

//pulled from MenuItem
const StyledEditableLabel = styled.div`
  cursor: ${props => props.cursor};
  width: ${props => props.width};
  max-width: ${props => props.width};
  display: table-cell;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  margin: 1em;
`;

const DisplayItem = (props) => {
  return (
    <StyledEditableLabel
      contentEditable={true}
      color={props.color}
      cursor={props.cursor}
      backgroundColor={props.backgroundColor}
      width={props.width}>
      {props.label}
    </StyledEditableLabel>
  );
};

const HoveringItem = (props) => {
  const setEditMode = (e) => {
    e.preventDefault();
    console.log(props.id);
  }


  return (
    <StyledEditableLabel
      contentEditable={true}
      color={props.color}
      cursor={props.cursor}
      backgroundColor={props.backgroundColor}
      width={props.width}>
      { truncate(props.truncateBy, props.label) }
      <a href="" onClick={setEditMode}><IconDisplay iconType={editIcon} /></a>
      <a href="" onClick={setEditMode}><IconDisplay iconType={trashIcon} /></a>
    </StyledEditableLabel>
  );
};

class EditableMenuItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      label: props.label,
      mode: 'display', // ['display', edit']
      hovering: false
    }
  }
  updateLabel (newLabel) {
    this.setState('label', newLabel);
  }
  propegateUpdate () {
    this.props.update({
      id: this.props.id,
      label: this.state.label
    });
  }
  renderHovering() {
    const props = this.props;
    
  }
  enterHover() {
    //this.props.store.hovering = this.props.id;
    this.props.store.setHovering(this.props.id);
  }
  exitHover() {

  }
  isHoverState() {
    return this.props.store.hovering === this.props.id;
  }
  renderEdit () {

  }
  render () {
    const props = this.props;
    return (
      <span
        onMouseEnter={this.enterHover.bind(this)}
      >
        {(this.isHoverState()) ? (<HoveringItem {...props} />) : (<DisplayItem {...props} />) }
      </span>
    );
  }
}


//truncates the string when it is too long
function truncate(by, str) {
  if (str.length <= by) {
    return str;
  } else {
    return str.slice(0, by) + '...'
  }
}

EditableMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  truncateBy: PropTypes.number, //how many are allowed before cutting it off and adding ...
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.string,  //TODO: handle edge case of 0
  cursor: PropTypes.string.isRequired,
  id: PropTypes.node.isRequired
};

EditableMenuItem.defaultProps = {
  truncateBy: 10,
  color: 'black',
  backgroundColor: 'white',
  width: '100px'
}

export default EditableMenuItem;