module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数  
    'no-dupe-keys': 'error', // 禁止对象字面量中出现重复的 key  
    'no-self-compare': 'error', // 禁止自身比较      
    'no-self-assign': 'error', // 禁止自我赋值      
    'no-unused-vars': 'error',  // 禁止出现未使用过的变量   
    'no-const-assign': 'error',  // 禁止修改 const 声明的变量      
  }
}
