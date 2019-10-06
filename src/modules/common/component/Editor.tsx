import React from 'react';
import { Editor } from 'slate-react';

import Plain from 'slate-plain-serializer';
import styled from 'styled-components';

const StyledEditor = styled(Editor)`
  padding: 10px;
`;

const CustomEditor = ({ ...props }) => {
  const initialValue = Plain.deserialize('Hello World');
  return (
    <StyledEditor value={initialValue} {...props}/>
  );
};

export default CustomEditor;
