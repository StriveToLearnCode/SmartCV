// Prettier 代码格式化配置文件
// 详细文档: https://prettier.io/docs/en/options.html
module.exports = {
  // 使用空格而不是制表符进行缩进
  useTabs: false,

  // 设置缩进空格数为 2
  tabWidth: 2,

  // 每行最大字符数，超过会自动换行
  printWidth: 120,

  // 使用单引号而不是双引号
  singleQuote: true,

  // 不在语句末尾添加分号
  semi: false,

  // 不添加尾随逗号（在对象、数组等的最后一项后面）
  trailingComma: 'none',

  // 箭头函数参数始终使用括号，例如: (x) => x
  arrowParens: 'always',

  // 在对象字面量的花括号内添加空格，例如: { foo: bar }
  bracketSpacing: true
}
