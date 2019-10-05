const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2019,
    'sourceType': 'module',
  },
  'rules': {
    'indent': [ERROR, 4],
    'linebreak-style': [ERROR, 'unix'],
    'quotes': [ERROR, 'single'],
    'semi': [ERROR, 'always'],
    'max-len': [ERROR, 120 ],
    'no-multi-spaces': [ERROR, { ignoreEOLComments: true } ],
    'object-curly-spacing': [OFF],
    'key-spacing': [OFF]
  },
};
