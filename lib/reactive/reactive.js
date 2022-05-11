import { isObject, isReactive, isValueChange, isArray } from '../utils/is.js'
import { track, trigger } from './effect.js'

const proxyMap = new WeakMap()
export function reactive(target) {
	/**
	 * 非对象无需代理
	 * 如果对象已经是reactive直接返回对象 - reactive(reactive(target))
	 */
	if (!isObject(target) || isReactive(target)) {
		return target
	}
	/**
	 * 如果target已经代理过，从proxyMap中取出已代理的值返回
	 * let a = reactive(target), b = reactive(target)
	 */
	if (proxyMap.has(target)) {
		return proxyMap.get(target)
	}
	const proxy = new Proxy(target, {
		get(target, key, receiver) {
			if (key === '__isReactive') {
				return true
			}
			const res = Reflect.get(target, key, receiver)
			track(target, key)
			return isObject(res) ? reactive(res) : res
		},
		set(target, key, value, receiver) {
			const oldValue = target[key]
			const oldLength = target.length
			/**
			 * 响应式的值发生变化才执行trigger
			 * 赋值后再触发trigger，否则effect的响应式值为上一次的值
			 */
			const res = Reflect.set(target, key, value, receiver)
			if (isValueChange(oldValue, value)) {
				trigger(target, key)
				if (
					isArray(target) &&
					isValueChange(oldLength, target.length)
				) {
					trigger(target, 'length')
				}
			}

			return res
		}
	})

	proxyMap.set(target, proxy)

	return proxy
}
