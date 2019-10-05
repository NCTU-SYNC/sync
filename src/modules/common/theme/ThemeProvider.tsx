import React, { ReactNode } from 'react';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';

import themes, { ThemeNames } from '~/constants/themes';
import Macro from '~/constants/themes/macro';
import GlobalStyle from '~/constants/GlobalStyle';

interface IProps {
  children: ReactNode;
  theme?: ThemeNames;
}

const ThemeProvider = ({ children, theme = ThemeNames.DEFAULT }: IProps) => {
  const { common, desktop, mobile } = themes[theme];
  const selectedTheme = {
    ...common,
    ...desktop,
    ...mobile,
    ...Macro,
  };

  return (
    <BaseThemeProvider theme={selectedTheme}>
      <>
        <GlobalStyle/>
        {children}
      </>
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
