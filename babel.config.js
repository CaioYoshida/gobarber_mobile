module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'root-import',
      {
        rootPathSuffix: 'src',
      },
    ],
  ],
};
