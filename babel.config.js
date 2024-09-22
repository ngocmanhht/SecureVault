module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './src',
        extensions: ['.ts', '.tsx'],
      },
    ],
    ['module:react-native-dotenv'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['react-native-reanimated/plugin'],
    // ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
