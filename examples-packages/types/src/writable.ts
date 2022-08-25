// Copied from Svelte
// https://github.com/sveltejs/svelte/blob/5b29124fbdf5df179fbd1aae7013774bf447fee8/src/runtime/store/index.ts

export function noop() {}
export function safe_not_equal(a: unknown, b: unknown) {
  return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function'
}
export function run(fn: Function) {
  return fn()
}
export function run_all(fns: Function[]) {
  fns.forEach(run)
}
export function is_function(thing: any): thing is Function {
  return typeof thing === 'function'
}
export function subscribe(store: Readable<any> | null, ...callbacks: any[]) {
  if (store == null) {
    return noop
  }
  const unsub = store.subscribe(...callbacks)
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub
}

/** Callback to inform of a value updates. */
export type Subscriber<T> = (value: T) => void

/** Unsubscribes from value updates. */
export type Unsubscriber = () => void

/** Callback to update a value. */
export type Updater<T> = (value: T) => T

/** Cleanup logic callback. */
type Invalidator<T> = (value?: T) => void

/** Start and stop notification callbacks. */
export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void

/** Readable interface for subscribing. */
export interface Readable<T> {
  /**
   * Subscribe on value changes.
   * @param run subscription callback
   * @param invalidate cleanup callback
   */
  subscribe(this: void, run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber
}

/** Writable interface for both updating and subscribing. */
export interface Writable<T> extends Readable<T> {
  /**
   * Set value and inform subscribers.
   * @param value to set
   */
  set(this: void, value: T): void

  /**
   * Update value using callback and inform subscribers.
   * @param updater callback
   */
  update(this: void, updater: Updater<T>): void
}

/** Pair of subscriber and invalidator. */
type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>]

const subscriber_queue: any[] = []

/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
export function readable<T>(value: T, start?: StartStopNotifier<T>): Readable<T> {
  return {
    subscribe: writable(value, start).subscribe,
  }
}

export function writable<T>(value: T, start: StartStopNotifier<T> = noop): Writable<T> {
  let stop: Unsubscriber | null
  const subscribers: Set<SubscribeInvalidateTuple<T>> = new Set()

  function set(new_value: T): void {
    if (safe_not_equal(value, new_value)) {
      value = new_value
      if (stop) {
        // store is ready
        const run_queue = !subscriber_queue.length
        for (const subscriber of subscribers) {
          subscriber[1]()
          subscriber_queue.push(subscriber, value)
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1])
          }
          subscriber_queue.length = 0
        }
      }
    }
  }

  function update(fn: Updater<T>): void {
    set(fn(value))
  }

  function subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop): Unsubscriber {
    const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate]
    subscribers.add(subscriber)
    if (subscribers.size === 1) {
      stop = start(set) || noop
    }
    run(value)

    return () => {
      subscribers.delete(subscriber)
      if (subscribers.size === 0) {
        stop && stop()
        stop = null
      }
    }
  }

  return { set, update, subscribe }
}

/** One or more `Readable`s. */
type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>

/** One or more values from `Readable` stores. */
type StoresValues<T> = T extends Readable<infer U>
  ? U
  : { [K in keyof T]: T[K] extends Readable<infer U> ? U : never }

/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * @param stores - input stores
 * @param fn - function callback that aggregates the values
 * @param initial_value - when used asynchronously
 */
export function derived<S extends Stores, T>(
  stores: S,
  fn: (values: StoresValues<S>, set: (value: T) => void) => Unsubscriber | void,
  initial_value?: T
): Readable<T>

/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * @param stores - input stores
 * @param fn - function callback that aggregates the values
 * @param initial_value - initial value
 */
export function derived<S extends Stores, T>(
  stores: S,
  fn: (values: StoresValues<S>) => T,
  initial_value?: T
): Readable<T>

/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * @param stores - input stores
 * @param fn - function callback that aggregates the values
 */
export function derived<S extends Stores, T>(
  stores: S,
  fn: (values: StoresValues<S>) => T
): Readable<T>

export function derived<T>(stores: Stores, fn: Function, initial_value: T): Readable<T> {
  const single = !Array.isArray(stores)
  const stores_array: Array<Readable<any>> = single
    ? [stores as Readable<any>]
    : (stores as Array<Readable<any>>)

  const auto = fn.length < 2

  return readable(initial_value, (set) => {
    let inited = false
    const values: T[] = []

    let pending = 0
    let cleanup = noop

    const sync = () => {
      if (pending) {
        return
      }
      cleanup()
      const result = fn(single ? values[0] : values, set)
      if (auto) {
        set(result as T)
      } else {
        cleanup = is_function(result) ? (result as Unsubscriber) : noop
      }
    }

    const unsubscribers = stores_array.map((store, i) =>
      subscribe(
        store,
        (value) => {
          values[i] = value
          pending &= ~(1 << i)
          if (inited) {
            sync()
          }
        },
        () => {
          pending |= 1 << i
        }
      )
    )

    inited = true
    sync()

    return function stop() {
      run_all(unsubscribers)
      cleanup()
    }
  })
}
