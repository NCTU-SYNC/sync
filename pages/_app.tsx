import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';

import configureStore from '~/modules/common/redux/configureStore';
import ThemeProvider from '~/modules/common/theme/ThemeProvider';

const store = configureStore();

export default class extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }
}
