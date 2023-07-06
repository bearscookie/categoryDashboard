import { createRouter, clearInstance } from './Router'
import type { HistoryType, Router } from './Router'

describe('Router', () => {
  const types: HistoryType[] = ['browser', 'hash']

  types.forEach(type => {
    describe(`test ${type} router`, () => {
      let router: Router
      beforeEach(() => {
        router = createRouter(type)
      })
      afterEach(() => {
        router.push({
          pathname: '/',
          search: '',
          hash: '',
        })
        clearInstance()
      })

      it('singleton', () => {
        const r1 = createRouter(type)
        expect(router).toBe(r1)
      })

      it('history subscribe', () => {
        const spy = jest.fn()
        router.push('/aaa')
        const unsubscribe = router.subscribe(spy)
        expect(spy).toHaveBeenCalledTimes(1)
        router.push('/aaa?nnn=1')
        expect(spy).toHaveBeenCalledTimes(2)
        router.push('/aaa?nxxx=2')
        expect(spy).toHaveBeenCalledTimes(3)
        unsubscribe()
      })

      it('query', () => {
        expect(router.query).toEqual({})
        router.push('/bbb?nxxx=sdfsdf')
        expect(router.query).toEqual({
          nxxx: 'sdfsdf',
        })
      })

      it('hashValue', () => {
        router.push('/basdf#xxxfdsa')
        expect(router.hashValue).toBe('xxxfdsa')
      })

      it('mergePush', () => {
        router.push('/path?n1=aaa')
        router.mergeQueryPush({
          bbb: 'ccc',
        })
        expect(router.location.pathname).toBe('/path')
        expect(router.location.search).toBe('?n1=aaa&bbb=ccc')
        expect(router.hashValue).toBe('')

        // router.push('#hhh')
        router.mergeQueryPush({
          ccc: 'ddd',
        })
        expect(router.location.pathname).toBe('/path')
        expect(router.location.search).toBe('?n1=aaa&bbb=ccc&ccc=ddd')
        // expect(router.location.hash).toBe('#hhh')
      })
    })
  })
})
