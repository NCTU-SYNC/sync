import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

interface IGlobalStyle {}

const GlobalStyle = createGlobalStyle<IGlobalStyle>`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  button {
    outline: none;
  }
`;

export default GlobalStyle;
