module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    });
    return config;
  },
  env: {
    API_URL: 'https://sync-test.nctu.me/api/v1'
  }
};
  
