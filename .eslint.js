module.exports = {
  root: true,
  extends: 'airbnb-base',
  ignorePatterns: ['dist/'],
  rules: {
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
  },
};
