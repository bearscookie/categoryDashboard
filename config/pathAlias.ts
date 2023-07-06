import { reduce } from 'lodash'

import tsconfig from '../tsconfig.json'

export const extensions = ['.js', '.jsx', '.css', '.less', '.ts', '.tsx']

export const jestAlias = () =>
  reduce<Record<string, string[]>, Record<string, string>>(
    tsconfig.compilerOptions.paths,
    (r, v, k) => {
      r[`^${k}/(.+)$`] = `${v[0].replace('./', '<rootDir>/').replace('/*', '')}/$1`
      return r
    },
    {},
  )
