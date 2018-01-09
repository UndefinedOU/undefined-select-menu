import styled from 'styled-components';


export const StyledMenuItem = styled.div`
  display: table;
`;

export const StyledLabel = styled.div`
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

export const EditForm = styled.form`

`;

export const StyledInput = styled.input`

`;

export const StyledDeletable = styled.div`

`;

const Noop = styled.span`
  margin: 0px
  padding: 0px
`;