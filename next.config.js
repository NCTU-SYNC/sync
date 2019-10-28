// eslint-disable-next-line no-undef
module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    });
    return config;
  },
  env: {
    API_URL: 'http://140.113.214.141/api/v1/'
  }
};
