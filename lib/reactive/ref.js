import { isArray, isObject, isRef, isValueChange } from '../utils/is.js'
import { reactive, track, trigger } from './index.js'

export function ref(value) {
	if (isRef(value)) return value

	return isObject(value) ? reactive(value) : new RefImpl(value)
}

class RefImpl {
	constructor(value) {
		this.__isRef = true
		this._value = value
	}

	get value() {
		track(this, 'value')
		return this._value
	}

	set value(newValue) {
		if (!isValueChange(this._value, newValue)) return
		this._value = covert(newValue)
		trigger(this, 'value')
	}
}

function covert(value) {
	return isObject(value) ? reactive(value) : value
}

export function toRef(target, key) {
	return new ObjectRefImpl(target, key)
}

class ObjectRefImpl {
	constructor(target, key) {
		this.__isRef = true
		this.target = target
		this.key = key
	}

	get value() {
		return this.target[this.key]
	}

	set value(newValue) {
		this.target[this.key] = newValue
	}
}

export function toRefs(target) {
	const res = isArray(target) ? new Array(target.length) : {}
	for (const key in target) {
		res[key] = toRef(target, key)
	}
  return res
}
