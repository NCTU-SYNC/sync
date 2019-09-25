import React from 'react';
import App from 'next/app';

import ThemeProvider from '~/modules/common/theme/ThemeProvider';


export default class extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
