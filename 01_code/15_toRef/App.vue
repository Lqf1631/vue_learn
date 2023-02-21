<template>
  <h2>toRef</h2>
  <h3>{{ state }}</h3>
  <h3>{{ age }}</h3>
  <h3>{{ money }}</h3>
  <Child :ageVal="age"></Child>
  <hr>
  <button @click="update">update</button>
</template>

<script>
// 父组件向子组件中以自定义属性形式传递 ref 对象数据时，传递的为单纯数据而非整个响应式 ref 对象
// 即传递的为 ref.value 而非 ref
// toRef 常用于在子组件中获取父组件传递的 ref.value 值，并将其重新包装为 ref 对象
// 并实现与父组件中的同步更新
import { defineComponent, reactive, ref, toRef } from '@vue/runtime-core'
// 导入子组件
import Child from '../components/Child.vue'
export default defineComponent({
  name: 'App',
  components: {
    Child
  },
  setup() {
    const state = reactive({
      age: 20,
      money: 100
    })
    // 调用 toRef 将 state 的 age 属性包装为 ref 对象
    // 第一个参数为对象，第二个参数为该对象的属性名字符串
    // 该 ref 对象会与原对象的属性实时绑定，同步响应
    const age = toRef(state, 'age')
    // 调用 ref 将 state 的 money 属性包装为 ref 对象
    // 实质为创建一个新的 ref 对象，不具备任何关系
    const money = ref(state.money)
    const update = () => {
      console.log('update')
      // 会实现同步更新
      state.age += 10
      // 不会实现同步更新
      state.money += 10
    }
    return {
      state,
      age,
      money,
      update
    }
  }
})
</script>

<style>

</style>
