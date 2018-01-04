import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconDisplay from './IconDisplay';
import { observer } from "mobx-react";
import keydown, { Keys } from 'react-keydown';
import { observable, autorun} from 'mobx';

const StyledMenuItem = styled.div`
  display: table;
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
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  margin: 1em;
`;

const EditForm = styled.form`

`;

const StyledInput = styled.input`

`;

//handles lifecycle for the form
//todo, change thsi to class so we can focus on it
const StagedDisplay = observer((props) => {
  const commitStaging = (ev) => {
    ev.preventDefault();
    props.store.commitStaging();
  };

  const updateStaging = (ev) => {
    props.store.updateStaging(ev.target.value);
  }

  const abortStaging = () => {
    props.store.clearStaging();
  };

  return (
    <StyledLabel>
      <EditForm onSubmit={commitStaging}>
        <StyledInput
          onChange={updateStaging}
          defaultValue=""
        />
      </EditForm>
    </StyledLabel>
  )
})

const UnstagedDisplay = observer((props) => {
  const openStagingForm = (ev) => {
    ev.preventDefault();
    props.store.updateStaging('');
  }

  return (
    <StyledLabel>
      <a href="" onClick={openStagingForm}>Add Menu Item <IconDisplay iconType="fa-plus" /></a>
    </StyledLabel>
  );
})

class AddableMenuItem extends Component {

  render () {
    return (
      <StyledMenuItem
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onKeyDown={this.handleKeyDown}
        ref={(ref) => { this.ref = ref; }}>
        {(this.props.store.staging) ? (<StagedDisplay {...this.props} />) : (<UnstagedDisplay {...this.props} />)}

      </StyledMenuItem>

    );
  }
};

export default observer(AddableMenuItem);
