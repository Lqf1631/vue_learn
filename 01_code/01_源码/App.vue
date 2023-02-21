<template>
  <!-- 在组件的 html 部分不必使用 div 跟元素来包裹 -->
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
// 导入 defineComponent 函数
import { defineComponent } from 'vue'
// 导入 HelloWorld 组件
import HelloWorld from './components/HelloWorld.vue'

// 调用 defineComponent 函数，参数为一配置对象，返回值为一组件对象
// 将组件对象导出
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
