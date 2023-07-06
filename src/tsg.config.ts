/** 后端文档需要的http验证用户密码 */
const username = 'test'
const password = '123'

/**
 * each project will use the "requester" function when request remote api
 * so this file would be included into your source file when compile
 * */
import type { Project } from 'ts-gear'

const devHost = 'gateway.example.com'

const projects: Project[] = [
  // {
  //   name: 'insightFinance',
  //   dest: 'service',
  //   source: `http://${username}:${password}@${devHost}/v2/api-docs?group=行研-财报分析`,
  //   importRequesterStatement: 'import { tsgRequest } from "tool/http"',
  //   keepGeneric: false,
  // },
  // {
  //   name: 'common',
  //   dest: 'service',
  //   source: `http://${username}:${password}@${devHost}/v2/api-docs?group=1.行研-公共查询`,
  //   importRequesterStatement: 'import { tsgRequest } from "tool/http"',
  //   keepGeneric: false,
  // },
  // {
  //   name: 'industry', // 竞对
  //   dest: 'service',
  //   source: `http://${username}:${password}@${devHost}/v2/api-docs?group=2.%E8%A1%8C%E7%A0%94-%E7%AB%9E%E5%AF%B9%E5%88%86%E6%9E%90`,
  //   importRequesterStatement: 'import { tsgRequest } from "tool/http"',
  //   keepGeneric: false,
  // },
  // {
  //   name: 'category', // 类目
  //   dest: 'service',
  //   source: `http://${username}:${password}@${devHost}/v2/api-docs?group=%E7%B1%BB%E7%9B%AE`,
  //   importRequesterStatement: 'import { tsgRequest } from "tool/http"',
  //   keepGeneric: false,
  //   shouldGenerateMock: true,
  // },
  // {
  //   name: 'marketingTag', // 营销标签
  //   dest: 'service',
  //   source: `http://${username}:${password}@${devHost}/v2/api-docs?group=%E8%90%A5%E9%94%80%E6%A0%87%E7%AD%BE`,
  //   importRequesterStatement: 'import { tsgRequest } from "tool/http"',
  //   keepGeneric: false,
  //   shouldGenerateMock: true,
  // },
  // {
  //   name: 'cateOnline', // 类目线上化
  //   dest: 'service',
  //   source: `http://${username}:${password}@${devHost}/v2/api-docs?group=类目`,
  //   importRequesterStatement: 'import { tsgRequest } from "tool/http"',
  //   keepGeneric: false,
  //   shouldGenerateMock: true,
  // },
  // {
  //   name: 'brandOnline', // 品牌线上化
  //   dest: 'service',
  //   source: `http://${username}:${password}@${devHost}/v2/api-docs?group=8.%E8%A1%8C%E7%A0%94-%E5%93%81%E7%89%8C%E5%8C%B9%E9%85%8D`,
  //   importRequesterStatement: 'import { tsgRequest } from "tool/http"',
  //   keepGeneric: false,
  //   shouldGenerateMock: true,
  // },
  // {
  //   name: 'diff', // 差异化
  //   dest: 'service',
  //   source: `http://${username}:${password}@${devHost}/v2/api-docs?group=6.%E8%A1%8C%E7%A0%94-%E5%B7%AE%E5%BC%82%E5%8C%96%E6%8E%A8%E8%8D%90`,
  //   importRequesterStatement: 'import { tsgRequest } from "tool/http"',
  //   keepGeneric: false,
  //   shouldGenerateMock: true,
  // },
  {
    name: 'sameProduct', // 同品洞察
    dest: 'service',
    source: `http://${username}:${password}@${devHost}/v2/api-docs?group=4.%E5%95%86%E5%93%81%E5%8C%B9%E9%85%8D-%E5%90%8C%E5%93%81`,
    importRequesterStatement: 'import { tsgRequest } from "tool/http"',
    keepGeneric: false,
    shouldGenerateMock: true,
  },
]

export default projects
