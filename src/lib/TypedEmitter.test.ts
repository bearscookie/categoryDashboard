import { EventEmitter } from 'events'

import { TypedEmitter } from './TypedEmitter'

describe('lib/typedEmitter', () => {
  interface EM {
    s: string
    n: number
    array: string[]
  }

  it('on, off', () => {
    const emitter = new TypedEmitter<EM>()
    const fn = jest.fn()
    const listener = (s: string) => fn(typeof s)
    emitter.on('s', listener)
    emitter.emit('s', 'aaa')
    expect(fn).toHaveBeenCalledWith('string')
    expect(fn).toHaveBeenCalledTimes(1)

    emitter.off('s', listener)
    emitter.emit('s', 'aaa')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('addEventListener, removeEventListener', () => {
    const emitter = new TypedEmitter<EM>()
    const fn = jest.fn()
    const listener = (s: string) => fn(typeof s)
    emitter.addListener('s', listener)
    emitter.emit('s', 'aaa')
    expect(fn).toHaveBeenCalledWith('string')
    expect(fn).toHaveBeenCalledTimes(1)

    emitter.removeListener('s', listener)
    emitter.emit('s', 'aaa')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('removeAllListeners', () => {
    const emitter = new TypedEmitter<EM>()
    const fn = jest.fn()
    const listener = (s: string) => fn(typeof s)
    emitter.addListener('s', listener)
    emitter.addListener('s', listener)
    emitter.emit('s', 'aaa')
    expect(fn).toHaveBeenCalledTimes(2)

    emitter.removeAllListeners('s')
    emitter.emit('s', 'aaa')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('once', () => {
    const emitter = new TypedEmitter<EM>()
    const fn = jest.fn()
    const listener = (s: string) => fn(typeof s)
    emitter.once('s', listener)
    emitter.emit('s', 'aaa')
    emitter.emit('s', 'aaa')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('listeners, listenerCount', () => {
    const emitter = new TypedEmitter<EM>()
    const fn = jest.fn()
    const listener = (s: string) => fn(typeof s)
    emitter.on('s', listener)
    emitter.on('s', listener)
    emitter.on('s', listener)
    expect(emitter.listeners('s')).toEqual([listener, listener, listener])
    expect(emitter.rawListeners('s')).toEqual([listener, listener, listener])
    expect(emitter.listenerCount('s')).toBe(3)
  })

  it('getMaxListeners, setMaxListeners', () => {
    const emitter = new TypedEmitter<EM>()
    const nativeEmitter = new EventEmitter()
    expect(emitter.getMaxListeners()).toBe(nativeEmitter.getMaxListeners())

    emitter.setMaxListeners(nativeEmitter.getMaxListeners() + 1)
    expect(emitter.getMaxListeners()).toBe(nativeEmitter.getMaxListeners() + 1)
  })

  it('prependListener', () => {
    const emitter = new TypedEmitter<EM>()
    const listener1 = jest.fn((n: number) => n + 1)
    const listener2 = jest.fn((n: number) => n + 2)
    emitter.on('n', listener1)
    emitter.on('n', listener2)
    expect(emitter.listeners('n')).toEqual([listener1, listener2])
    expect(emitter.listeners('n')).not.toEqual([listener2, listener1])

    emitter.removeAllListeners('n')
    expect(emitter.listeners('n')).toEqual([])

    emitter.on('n', listener1)
    emitter.prependListener('n', listener2)
    emitter.emit('n', 1)
    expect(emitter.listeners('n')).toEqual([listener2, listener1])
  })

  it('prependOnceListener', () => {
    const emitter = new TypedEmitter<EM>()
    const listener1 = jest.fn((n: number) => n + 1)
    const listener2 = jest.fn((n: number) => n + 2)
    emitter.on('n', listener1)
    emitter.prependOnceListener('n', listener2)
    expect(emitter.listeners('n')).toEqual([listener2, listener1])
    emitter.emit('n', 1)
    expect(emitter.listeners('n')).toEqual([listener1])
  })

  it('emit without args', () => {
    const emitter = new TypedEmitter<EM>()
    const listener = jest.fn()
    emitter.on('n', listener)
    emitter.emit('n')
    expect(listener).toHaveBeenCalledWith()
  })

  it('eventNames', () => {
    const emitter = new TypedEmitter<EM>()
    const listener = jest.fn()
    emitter.on('n', listener)
    expect(emitter.eventNames()).toEqual(['n'])
    emitter.on('s', listener)
    expect(emitter.eventNames()).toEqual(['n', 's'])
  })
})
