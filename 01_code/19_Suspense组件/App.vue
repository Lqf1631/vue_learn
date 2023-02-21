<template>
  <h2>Suspense 组件</h2>
  <!-- Suspense 组件用于在异步组件渲染时，渲染其余内容 -->
  <Suspense>
    <!-- Suspense 组件中包含两个模板 -->
    <!-- 设置 #default 属性的模板包裹异步组件 -->
    <template #default>
      <Async2></Async2>
    </template>
    <!-- 设置 v-slot:fallback 插槽的为异步组件加载时渲染的其他组件 -->
    <template v-slot:fallback>
      <p>loading...</p>
    </template>
  </Suspense>
  <Async1></Async1>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue'
import Async2 from './Async2.vue'
// 异步组件：动态引入的组件或在组件中数据为异步请求获取的数据
// 动态引入组件，调用 defineAsyncComponent 方法，参数为回调函数，在回调中引入组件
// 将该方法的返回值赋值给常量作为组件名
const Async1 = defineAsyncComponent(() => {
  // 调用 import 方法，参数为导入模块的路径名
  return import('./Async1.vue')
})
export default defineComponent({
  name: 'APP',
  // 注册组件
  components: {
    Async1,
    Async2
  }
})
</script>

<style>

</style>
