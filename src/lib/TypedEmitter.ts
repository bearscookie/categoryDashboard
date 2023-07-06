import { EventEmitter } from 'events'

/**
 * 限定该emitter必须使用的事件集合与事件对应的数据类型
 * 字符串格式不限，推荐使用"动词 + 宾语"格式
 * 表示该事件的行为和目的
 * 类型参数EM表示EventMap
 * 例如
 * ```
 * interface EventMap {
 *   'service:error': ResponseError
 * }
 * 则事件必须为EventMap的key，事件数据为该key对应的类型
 * ```
 * */
export class TypedEmitter<EM> {
  private emitter: EventEmitter

  constructor() {
    this.emitter = new EventEmitter()
  }

  public on<T extends keyof EM>(eventName: T, listener: (...args: EM[T][]) => void) {
    return this.emitter.on(eventName as unknown as string, listener)
  }

  public addListener<T extends keyof EM>(eventName: T, listener: (...args: EM[T][]) => void) {
    return this.emitter.on(eventName as unknown as string, listener)
  }

  public emit<T extends keyof EM>(eventName: T, ...args: EM[T][]) {
    if (args.length > 0) {
      const data = args[0]
      return this.emitter.emit(eventName as unknown as string, data)
    }
    return this.emitter.emit(eventName as unknown as string)
  }

  public removeListener<T extends keyof EM>(eventName: T, listener: (...args: EM[T][]) => void) {
    return this.emitter.removeListener(eventName as unknown as string, listener)
  }

  public removeAllListeners<T extends keyof EM>(eventName?: T) {
    return this.emitter.removeAllListeners(eventName as unknown as string)
  }

  public off<T extends keyof EM>(eventName: T, listener: (...args: EM[T][]) => void) {
    return this.emitter.off(eventName as unknown as string, listener)
  }

  public once<T extends keyof EM>(eventName: T, listener: (...args: EM[T][]) => void) {
    return this.emitter.once(eventName as unknown as string, listener)
  }

  public listeners<T extends keyof EM>(eventName: T) {
    return this.emitter.listeners(eventName as unknown as string)
  }

  public rawListeners<T extends keyof EM>(eventName: T) {
    return this.emitter.rawListeners(eventName as unknown as string)
  }

  public listenerCount<T extends keyof EM>(eventName: T) {
    return this.emitter.listenerCount(eventName as unknown as string)
  }

  public eventNames() {
    return this.emitter.eventNames()
  }

  public getMaxListeners() {
    return this.emitter.getMaxListeners()
  }

  public setMaxListeners(n: number) {
    return this.emitter.setMaxListeners(n)
  }

  public prependListener<T extends keyof EM>(eventName: T, listener: (...args: EM[T][]) => void) {
    return this.emitter.prependListener(eventName as unknown as string, listener)
  }

  public prependOnceListener<T extends keyof EM>(eventName: T, listener: (...args: EM[T][]) => void) {
    return this.emitter.prependOnceListener(eventName as unknown as string, listener)
  }
}
