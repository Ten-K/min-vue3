<script setup>
import { reactive, effect, ref, computed, toRef, toRefs } from '@lrl/reactive'

/** reactive验证 */
// const ob = (window.ob = reactive({
// 	count1: 0,
// 	count2: 10
// }))

/** 嵌套effect验证 */
// effect(() => {
// 	console.log('count1 is:', ob.count1)
// 	effect(() => {
// 		console.log('count2 is:', ob.count2)
// 	})
// })

/** ref验证 */
// const foo = (window.foo = ref(1))

// effect(() => {
// 	console.log('foo', foo.value)
// })

/** computed验证 */
// const c = (window.c = computed(() => {
// 	console.log('computed:', foo.value * 2)
// 	return foo.value * 2
// }))

// const d = (window.d = computed({
// 	get() {
// 		return foo.value * 2
// 	},
// 	set(val) {
// 		foo.value = val
// 	}
// }))

/** toRef, toRefs验证 */
const proxy = (window.proxy = reactive({
	num: 1,
	num2: 2
}))

let num2 = toRef(proxy, 'num2')
let { num } = toRefs(proxy)

setTimeout(() => {
	num.value = 2
  num2.value = 3
}, 1000)

effect(() => {
	console.log(num.value)
	console.log(num2.value)
})
</script>

<template>
	<div>111</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
