import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

interface IGlobalStyle {}

const GlobalStyle = createGlobalStyle<IGlobalStyle>`
  ${normalize}
`;

export default GlobalStyle;
