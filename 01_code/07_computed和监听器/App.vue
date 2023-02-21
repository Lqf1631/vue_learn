<template>
  <fieldset>
    <legend>input</legend>
    firstName: <input type="text" placeholder="please enter firstName" v-model="firstName"/>
    <hr>
    lastName:  <input type="text" placeholder="please enter lastName" v-model="lastName"/>
  </fieldset>
  <fieldset>
    <legend>output</legend>
    fullName1: {{ fullName1 }}
    <hr>
    fullName2: <input type="text" v-model="fullName2">
    <hr>
    fullName3: <input type="text" v-model="fullName3">
    <hr>
    fullName4: <input type="text" v-model="fullName4">
  </fieldset>
</template>

<script lang="ts">
// 计算属性 computed：在 setup 函数中调用 computed 函数，其返回值为一 ref 对象，为计算属性
// computed 函数参数可以为单一回调函数，该回调函数默认定义该计算属性的 get 行为，必须具有返回值
// 在该情况下，一般为多个数据对计算属性的单向绑定，即修改原数据，计算属性变化，反之无影响
// 此时定义的计算属性，一般用为只读，在修改操作时，会发出 warn
// computed 函数参数可以为一对象，该对象包含 set 方法与 get 方法，定义了计算属性在获取与修改时的行为
// 计算属性一般在 get 方法中使用 return 返回值定义计算属性值
// 在 set 方法中通过对参数访问获取修改值来影响源数据

// watch 监听器：在 setup 函数中调用 watch 函数，实现对某一个具体值的监控
// 第一个参数为监听值，第二个参数为回调函数，第三个参数为配置选项对象
// 回调函数接受监听值作为参数，当监听值变化时，会自动触发回调函数，可以在回调函数内对监听值进行操作
// 配置选项对象可选配置为 immediate(boolean) 表示监听器起始立即执行一次，deep(boolearn) 表示深度监听(对象)
// 通过 watch 监听某一值变化，可以实现操作原始值的类似计算属性的功能

// watchEffect 监听器，再 setup 函数中调用 watchEffect 函数，实现自动监控
// 参数为回调，再回调内的操作值变化时，会自动重新执行回调
// 默认初始会执行一次，且为深度监控

// 注：watch 和 watchEffect 函数均仅能对响应式数据进行监控
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
export default defineComponent({
  setup() {
    // 定义 lastName firstName 数据用于接受输入框的数据值（v-model）
    const lastName = ref('Soya')
    const firstName = ref('Tom')
    // 定义计算属性 fullName1 ，此时该属性根据 get 与 set 操作进行实时操作
    const fullName1 = computed(function(): string {
      return firstName.value + '_' + lastName.value
    })
    console.log(fullName1)
    const fullName2 = computed({
      // 定义计算属性的 get 行为，即获取计算属性值的行为（一般用来定义计算属性值）
      get(): string {
        return firstName.value + '_' + lastName.value
      },
      // 定义计算属性的 set 行为，即修改计算属性值时的操作（一般来影响原数据）
      set(val: string) {
        const names: string[] = val.split('_')
        firstName.value = names[0]
        lastName.value = names[1]
      }
    })
    const fullName3 = ref(firstName.value + '_' + lastName.value)
    // 调用 watch 监听器函数，监听某一个具体的数据的变化，通过回调函数定义数据变化时的行为
    watch(fullName3, function(val: string) {
      console.log('watch')
      const names: string[] = val.split('_')
      firstName.value = names[0]
      lastName.value = names[1]
    }, { immediate: true, deep: true })
    const fullName4 = ref('')
    // 调用 watchEffect 高级监听器函数，会自动监听回调函数内的进行操作的值的变化，从而执行回调
    watchEffect(function() {
      // 会监听 firstName 值与 lastName 值的变化，从而修改 fullName4
      fullName4.value = firstName.value + '_' + lastName.value
    })
    return {
      lastName,
      firstName,
      fullName1,
      fullName2,
      fullName3,
      fullName4
    }
  }
})
</script>

<style></style>
