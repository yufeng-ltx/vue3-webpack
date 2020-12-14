const path = require('path');

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    es2020: true,
    browser: true
  },
  plugins: [
    // 'vue',
    'import'
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './scripts/webpack.common.js')
      }
    }
  },
  rules: {
    'import/no-unresolved': [2, { commonjs: true, amd: true }], // 支持cjs,amd 模块引入
    'import/named': 2,
    'import/namespace': [2, { allowComputed: true }],
    'import/first': 2,
    'no-console': 0,
    'no-useless-rename': 2,
    'semi': [2, 'always'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': [2, 'never'],
    'no-unused-vars': 0,
    'no-var': 2,
    'no-trailing-spaces': 2,
    'eol-last': 2,
    'comma-spacing': 2,
    'space-infix-ops': 2, // 要求中缀操作符周围有空格
    'quotes': ['error', 'single'],
    'no-multi-spaces': 2, // 禁止使用多个空格
    'keyword-spacing': 2,
    'block-spacing': 2,
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'space-before-blocks': 2,
    'eqeqeq': 2,
    'key-spacing': 2,
    'arrow-spacing': 2,
    'lines-between-class-members': 2,
    'object-curly-spacing': [2, 'always'],
    'no-useless-escape': 0, // 允许不必要的转义字符
    'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 0 }], // 禁止出现多行空行
    'array-bracket-spacing': 2, // 强制数组方括号中使用一致的空格
    'no-debugger': 0, // 运行使用debugger
    'no-eval': 2, // 禁用eval
    'no-useless-return': 2, // 禁止多余的return
    'spaced-comment': 2, // 强制在注释中 // 或 /* 使用一致的空格
    'space-before-function-paren': [2, { 'anonymous': 'never', 'named': 'never' }],
    'space-in-parens': 2, // 强制在圆括号内使用一致的空格
    'func-call-spacing': 2, // 要求或禁止在函数标识符和其调用之间有空格
    'object-curly-newline': [2, { // 强制大括号内换行符的一致性
      'multiline': true,
      'consistent': true
    }],
    'object-property-newline': [2, { allowAllPropertiesOnSameLine: true }], // 强制将对象的属性放在不同的行上
    'computed-property-spacing': 2, // 禁止或强制在计算属性中使用空格
    'semi-spacing': 2 // 强制分号前后有空格
  }
};
