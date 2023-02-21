<template>
  <h2>hook 函数</h2>
  <h3>x: {{ x }}, y: {{ y }}</h3>
  <hr>
  <!-- 条件渲染，加载中才显示 -->
  <h3 v-if="loading">loading...</h3>
  <!-- 条件渲染，请求失败才显示 -->
  <h3 v-else-if="errorMsg">{{ errorMsg }}</h3>
  <!-- 条件渲染，请求成功显示 -->
  <ul v-else>
    <li>id: {{ result.id }}</li>
    <li>name: {{ result.name }}</li>
    <li>age: {{ result.age }}</li>
  </ul>
  <hr>
  <h3 v-if="loading">loading...</h3>
  <h3 v-else-if="errorMsg">{{ errorMsg }}</h3>
  <!-- 循环渲染 data2 数组中的每一项 -->
  <ul v-for="item in result" :key="item.id">
    <li>id: {{ item.id }}</li>
    <li>name: {{ item.name }}</li>
    <li>age: {{ item.age }}</li>
  </ul>
</template>

<script lang="ts">
// hook 函数：自定义在 hooks 文件夹内的 ts 模块封装一定功能并向外导出的函数模块
// 将特定功能进行封装，方便实现功能的复用
// hook 函数以 use 开头命名
import { defineComponent } from '@vue/runtime-core'
// 导入自定义的 hook 函数 => 获取鼠标点击坐标函数
import useMousePosition from '@/hooks/useMousePosition'
// 导入自定义 hook 函数 => 发送请求获取数据
import getRequest from '@/hooks/getRequest'
// 定义接口约束请求的数据对象
interface Person {
  id: number,
  name: string,
  age: number
}
export default defineComponent({
  setup() {
    const { x, y } = useMousePosition()
    const { loading, result, errorMsg } = getRequest<Person[]>('/data/array.json')
    return {
      x,
      y,
      loading,
      result,
      errorMsg
    }
  }
})
</script>

<style>

</style>
