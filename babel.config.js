/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const reduce = require('lodash/reduce')

const tsconfig = require('./tsconfig.json')

const { sep } = path

const pathAlias = reduce(
  tsconfig.compilerOptions.paths,
  (r, v, k) => ({
    ...r,
    [k.replace(`${sep}*`, '')]: path.join(__dirname, v[0].replace(`${sep}*`, '')),
  }),
  {},
)
/* eslint-disable @typescript-eslint/no-var-requires */
const config = {
  presets: ['react-app'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    // 与tsconfig.json统一加载路径别名
    [
      'module-resolver',
      {
        alias: pathAlias,
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.es', '.es6', '.mjs'],
      },
    ],
  ],
}

module.exports = config
