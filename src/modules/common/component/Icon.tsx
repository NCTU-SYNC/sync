import React from 'react';
import styled from 'styled-components';

import search from '~/constants/svgs/search.svg';
import bell from '~/constants/svgs/bell.svg';

const IconTypes = {
  search,
  bell
};

interface IProps {
  className?: string;
  size: number;
  type: keyof typeof IconTypes;
  onClick?: (event: any) => void;
}

interface IAttr {
  size: number;
}

const Main = styled.span<IAttr>`
  display: inline-block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;


const Icon = ({ type, ...props }: IProps) => (
  <Main dangerouslySetInnerHTML={{ __html: IconTypes[type] }} {...props}/>
);

export default Icon;
