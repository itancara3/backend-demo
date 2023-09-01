module.exports = {
  env: {
    node     : true,
    commonjs : true,
    es6      : true
  },
  extends       : 'standard',
  parserOptions : {
    ecmaVersion : 9,
    sourceType  : 'module'
  },
  rules: {
    'arrow-body-style'      : [0, 'as-needed'],
    'max-len'               : ['error', { code: 175, ignoreStrings: true }],
    'no-use-before-define'  : ['error', { functions: false, classes: true }],
    'no-prototype-builtins' : 0,
    'no-underscore-dangle'  : 0,
    'no-multi-spaces'       : 'off',
    semi                    : [2, 'always'],
    'no-labels'             : ['error', { allowLoop: true }],
    'key-spacing'           : ['error', {
      align : 'value',
      align : 'colon',
      align : { beforeColon: true, afterColon: true, on: 'colon' }
    }]
  },
  globals: {
    describe   : true,
    expect     : true,
    it         : true,
    before     : true,
    after      : true,
    beforeEach : true,
    afterEach  : true
  }
};
