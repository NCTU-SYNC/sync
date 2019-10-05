import React from 'react';
import styled from 'styled-components';

import search from '~/constants/svgs/search.svg';
import bell from '~/constants/svgs/bell.svg';
import fb from '~/constants/svgs/fb.svg';
import ig from '~/constants/svgs/ig.svg';
import twitter from '~/constants/svgs/twitter.svg';

const IconTypes = {
  search,
  bell,
  fb,
  ig,
  twitter,
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
