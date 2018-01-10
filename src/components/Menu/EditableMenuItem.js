import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconDisplay from './IconDisplay';
import {observer} from "mobx-react";
import keydown, { Keys } from 'react-keydown';
import { EditForm, StyledDeletable, Noop, StyledInput } from './styles';
/*
  Editable component encapsulates the menu item where clicking on it
  truncates the menu
*/

const editIcon  = 'fa-edit';
const trashIcon = 'fa-trash';

//pulled from MenuItem
const StyledEditableLabel = styled.div`
  cursor: ${props => props.cursor};
  width: ${props => props.width};
  /*max-width: ${props => props.width};*/
  display: table-cell;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.color};
  margin: 1em;
`;

const Link = styled.a`
  cursor: pointer;
  color: ${props => props.color};
  &:visited, &:hover {
    color: ${props => props.color};
  }
`;

const EditItem = observer(class EditItem extends Component {
  componentDidMount() {
    //this.focusInput.focus();

  }
  updateValue(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.store.updateLabel(ev.target.value);
  }
  commitChanges(ev) {
    ev.preventDefault()
    this.props.store.commitEditing();
  }
  exitEditState() {
    this.props.store.clearEditing();
  }
  stopProp(ev) {
    ev.stopPropagation();
  }
  render() {
    return (
      <form onClick={this.stopProp} onSubmit={this.commitChanges.bind(this)}>
        <StyledInput
          type="text"
          autoFocus
          onKeyDown={this.stopProp.bind(this)}
          onBlur={this.updateValue.bind(this)}
          onChange={this.updateValue.bind(this)}
          defaultValue={this.props.store.editing.label}>
        </StyledInput>
      </form>
    )
  }
})


const DisplayItem = (props) => {
  return (
    <StyledEditableLabel
      color={props.color}
      cursor={props.cursor}
      width={props.width}>
      {props.label}
    </StyledEditableLabel>
  );
};

const HoveringItem = observer((props) => {
  const setEditMode = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    props.store.setEditing(props.id);
  };
  const setDeleteMode = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    props.store.setTrashBin(props.id);
  };

  return (
    <StyledEditableLabel
      color={props.color}
      cursor={props.cursor}
      width={props.width}>
      { truncate(props.truncateBy, props.label) }
      <Link onClick={setEditMode}><IconDisplay iconType={editIcon} /></Link>
      <Link onClick={setDeleteMode}><IconDisplay iconType={trashIcon} /></Link>
    </StyledEditableLabel>
  );
});

const DeletableItem = observer((props) => {

  const commitDeletion = (ev) => {
    ev.preventDefault();
    props.store.destroyItem(props.store.trashbin);
  };

  const abortDeletion = (ev) => {
    ev.preventDefault();
    props.store.clearTrashBin();
  };

  return (
    <div>
      <StyledDeletable
        color={props.color}
        cursor={props.cursor}
        width={props.width}
      >
        <IconDisplay iconType={trashIcon} />
        Are You Sure?
        <Link onClick={commitDeletion}>Yes</Link>
        <Link onClick={abortDeletion}>No</Link>
      </StyledDeletable>
    </div>
  );
});

const EditableMenuItem = observer(class EditableMenuItem extends Component {
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
  enterHover() {
    //this.props.store.hovering = this.props.id;
    //this.props.store.setHovering(this.props.id);
  }
  exitHover() {

  }
  getColor = () => {
    let color = this.props.color;
    if (this.isHoverState()) {
      color = this.props.highlightColor;
    }
    return color;
  }
  isSelectedState() {
    return this.props.store.selected === this.props.id;
  }
  isHoverState() {
    return this.props.store.hovering === this.props.id;
  }
  isEditState() {
    return this.props.store.editing.id === this.props.id;
  }
  isDeleteState() {
    return this.props.store.trashbin === this.props.id;
  }
  renderState() {
    const props = {...this.props};
    props.color = this.getColor();
    if (this.isEditState()) {
      return (<EditItem {...props} />);
    } else if (this.isDeleteState()) {
      return (<DeletableItem {...props} />);
    } else if (this.isHoverState()) {
      return (<HoveringItem {...props} />);
    } else {
      return (<DisplayItem {...props} />);
    }
  }
  render () {
    return (
      <span

      >
        {this.renderState()}
      </span>
    );
  }
});

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
  highlightColor: PropTypes.string,
  width: PropTypes.string,  //TODO: handle edge case of 0
  cursor: PropTypes.string.isRequired,
  id: PropTypes.node.isRequired
};

EditableMenuItem.defaultProps = {
  truncateBy: 10,
  color: 'black',
  highlightColor: 'white',
  width: '100px'
}

export default EditableMenuItem;
