import { isFunction } from '@lrl/utils'
import { effect, track, trigger } from './index.js'

export function computed(getterOrOptions) {
	let getter, setter
	if (isFunction(getterOrOptions)) {
		getter = getterOrOptions
		setter = () => {
			console.warn('Write operation failed: computed value is readonly')
		}
	} else {
		getter = getterOrOptions.get
		setter = getterOrOptions.set
	}

	return new ComputedImpl(getter, setter)
}

class ComputedImpl {
	constructor(getter, setter) {
		this._setter = setter
		this._value = undefined
		/** 依赖更新标识 */
		this._dirty = true
		this.effect = effect(getter, {
			lazy: true,
			schedule: () => {
				if (!this._dirty) {
					this._dirty = true
					/** 执行依赖当前computed的effect */
					trigger(this, 'value')
				}
			}
		})
	}

	get value() {
		if (this._dirty) {
			/** this.effect: effect的返回值effectFn */
			this._value = this.effect()
			this._dirty = false
			track(this, 'value')
		}

		return this._value
	}

	set value(newValue) {
		this._setter(newValue)
	}
}
