module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    eqeqeq: 'error',
    curly: ['error', 'all'],
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    indent: ['error', 2],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/self-closing-comp': 'warn',
    'react/jsx-indent': ['error', 2],
  },
};
