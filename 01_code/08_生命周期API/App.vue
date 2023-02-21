<template>
  <h2>App 组件</h2>
  <button @click="show=!show">切换显示</button>
  <hr>
  <Child v-if="show"></Child>
</template>

<script>
// vue2.x 中的生命周期函数钩子定义为默认导出的对象的方法
// vue3.x 中的生命周期钩子为组合 API 函数,在 setup 函数内调用即可,参数为一回调,即触发该钩子时触发回调
// vue3.x 中的生命周期钩子速度快于 vue2.x
// beforeCreate 和 Created 被 setup 代替
// 数据定义在 setup 函数内部,即不通过 this 也能操作数据
import { defineComponent, ref } from 'vue'
// 导入 Child 组件
import Child from '@/components/Child.vue'
export default defineComponent({
  name: 'App',
  // 注册 Child 组件, components 配置为一对象，对象内包含组件名属性
  components: {
    Child
  },
  setup() {
    // 定义用于控制 Child 组件显示的数据
    const show = ref(true)
    return {
      show
    }
  }
})
</script>

<style>
</style>
