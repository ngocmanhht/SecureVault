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
    // ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
};
