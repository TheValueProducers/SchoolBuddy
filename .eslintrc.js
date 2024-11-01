module.exports = {
  root: true,
  extends: '@react-native',
  requireConfigFile: true,
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off', // Tắt cảnh báo useEffect dependencies
  },
};
