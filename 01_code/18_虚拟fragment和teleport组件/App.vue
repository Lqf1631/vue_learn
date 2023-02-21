<template>
  <!-- 在 vue3 中，不必使用根标签包裹最外层的多个标签 -->
  <!-- 最外层的多个标签被自动包裹在一个虚拟的 Fragment 标签中 -->
  <!-- 再将虚拟的 Fragment 标签渲染到 #app 的 div 标签中 -->
  <h2>App</h2>
  <h2>父级组件</h2>
  <hr>
  <Child></Child>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 导入 Child 组件
import Child from './Child.vue'
export default defineComponent({
  name: 'App',
  // 注册子组件
  components: {
    Child
  }
})
</script>

<style>

</style>
