import { RouterStore } from '@superwf/mobx-react-router'
import { createBrowserHistory, createHashHistory } from 'history'
import type { History } from 'history'
import { runInAction } from 'mobx'
import type { RouteProps } from 'react-router-dom'

/** 单例模式，全局只需要一个router即可 */
let instance: Router | null = null

/** 单元测试用，重置router单例 */
export const clearInstance = () => {
  instance = null
}

export type HistoryType = 'hash' | 'browser' | 'memory'

export interface Route extends RouteProps {
  key: string
}
export type Routes = Array<Route>
export type ConstructorOption = { routes?: Routes; type?: 'hash' | 'browser' }

export class Router extends RouterStore {
  /** if use observable, must be shallow, the routes object will be update in runtime */
  public routes: Routes

  public type: HistoryType

  constructor(history: History, { routes = [], type = 'browser' }: ConstructorOption = {}) {
    super(history)
    if (instance) {
      return instance
    }
    runInAction(() => {
      this.routes = routes || []
    })
    this.type = type === 'hash' ? 'hash' : 'browser'
    instance = this
  }

  /**
   * 使用当前的query为默认query，合并之后push
   * */
  public mergeQueryPush(query: Record<string, any>) {
    const { query: currentQuery } = this
    const searchParams = new URLSearchParams({
      ...currentQuery,
      ...query,
    })
    this.push(`?${searchParams.toString()}`)
  }
}

export const createRouter = (type: HistoryType) => {
  const history = type === 'hash' ? createHashHistory() : createBrowserHistory()
  return new Router(history)
}
