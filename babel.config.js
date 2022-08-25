module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-numeric-separator',
      [
        'babel-plugin-rewrite-require',
        {
          aliases: {
            crypto: 'crypto-browserify',
            stream: 'readable-stream',
          },
          throwForNonStringLiteral: true,
        },
      ],
    ],
  }
}
