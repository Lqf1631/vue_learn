<template>
  <h2>provide和inject</h2>
  <p>{{ color }}</p>
  <button @click="color='red'">red</button>
  <button @click="color='blue'">blue</button>
  <button @click="color='green'">green</button>
  <hr>
  <Child></Child>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from '@vue/runtime-core'
// 导入子组件
import Child from './components/Child.vue'
export default defineComponent({
  name: 'App',
  // 注册子组件
  components: {
    Child
  },
  setup() {
    const color = ref<string>('red')
    // 调用 provide 函数向另一组件中传递值
    // 第一个参数为标识名，用于调用 inject 时接受数据
    // 第二个参数为传递的数据
    provide('color', color)
    return {
      color
    }
  }
})
</script>

<style>

</style>
