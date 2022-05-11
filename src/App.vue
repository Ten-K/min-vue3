<script setup>
import { reactive, effect, ref, computed } from '../lib/reactive/index'

// const ob = (window.ob = reactive({
//   count1: 0,
//   count2: 10
// }))
// effect(() => {
// 	effect(() => {
// 		console.log('count2 is:', ob.count2)
// 	})
// 	console.log('count1 is:', ob.count1)
// })
const foo = (window.foo = ref(1))

// effect(() => {
// 	console.log('foo', foo.value)
// })

// const c = (window.c = computed(() => {
// 	console.log('computed:', foo.value * 2)
// 	return foo.value * 2
// }))

const d = (window.d = computed({
	get() {
		return foo.value * 2
	},
	set(val) {
		foo.value = val
	}
}))
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
