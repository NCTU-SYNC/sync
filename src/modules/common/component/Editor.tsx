import React, { useState } from 'react';
import { Editor, OnChangeFn } from 'slate-react';
import Plain from 'slate-plain-serializer';

import styled from 'styled-components';
import { Value } from 'slate';

const StyledEditor = styled(Editor)`
  padding: 10px;
`;

const CustomEditor = ({ ...props }) => {
  const initialValue = Plain.deserialize('');
  const [ value, setValue ] = useState<Value>(initialValue);

  const handleChange: OnChangeFn = ({ value }) => {
    setValue(value as Value);
  };

  return (
    <StyledEditor value={value} onChange={handleChange} {...props}/>
  );
};

export default CustomEditor;
