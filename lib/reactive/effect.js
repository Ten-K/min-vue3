/** 当前的effect */
let activeEffect
/** 解决嵌套effect */
let effectStack = []

export function effect(fn, options = {}) {
	const effectFn = () => {
		try {
			effectStack.push(activeEffect)
			activeEffect = effectFn
			return fn()
		} catch (e) {
			throw new Error(e)
		} finally {
			effectStack.pop()
			activeEffect = effectStack[effectStack.length - 1]
		}
	}
	/**
	 * lazy computed第一次初始化不执行
	 */
	if (!options?.lazy) {
		effectFn()
	}
	effectFn.schedule = options.schedule
	return effectFn
}

/**
 * 依赖关系
 * {
 *  [target]: {
 *    [key]: []
 *  }
 * }
 */
const targetMap = new WeakMap()
export function track(target, key) {
	if (!activeEffect) return
	let desMap = targetMap.get(target)
	if (!desMap) {
		targetMap.set(target, (desMap = new Map()))
	}
	let des = desMap.get(key)
	if (!des) {
		desMap.set(key, (des = new Set()))
	}
	des.add(activeEffect)
}

export function trigger(target, key) {
	const desMap = targetMap.get(target)
	if (!desMap) return
	const des = desMap.get(key)
	if (!des) return
	des.forEach((effectFn) => {
		effectFn.schedule ? effectFn.schedule() : effectFn()
	})
}
