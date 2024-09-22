module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['prettier', '@tanstack/query'],
  rules: {
    'prettier/prettier': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@tanstack/query/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
