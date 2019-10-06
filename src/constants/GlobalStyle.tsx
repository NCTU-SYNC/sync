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

  html,
  body,
  #__next {
    height: 100%;
  }
`;

export default GlobalStyle;
