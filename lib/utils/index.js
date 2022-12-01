export function isObject(val) {
	return typeof val === 'object' && val !== null
}

export function isFunction(val) {
	return typeof val === 'function'
}

export function isString(val) {
	return typeof val === 'string'
}

export function isReactive(val) {
	return val?.__isReactive
}

export function isArray(val) {
	return Array.isArray(val)
}

export function isValueChange(oldValue, value) {
	return !Object.is(oldValue, value)
}

export function isRef(val) {
	return val?.__isRef
}
