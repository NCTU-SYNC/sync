import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import themes, { ThemeNames } from '~/constants/themes';
import GlobalStyle from '~/constants/GlobalStyle';

interface IProps {
  children: ReactNode;
  theme?: ThemeNames;
}

export default ({ children, theme = ThemeNames.DEFAULT }: IProps) => {
  const { common, desktop, mobile } = themes[theme];
  const selectedTheme = {
    color: {
      ...common,
      ...desktop,
      ...mobile,
    }
  }

  return (
    <ThemeProvider theme={selectedTheme}>
      <>
        <GlobalStyle/>
        {children}
      </>
    </ThemeProvider>
  );
}