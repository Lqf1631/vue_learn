<template>
  <h1>data1: {{ data1 }}</h1>
  <h1>data2: {{ data2 }}</h1>
  <h1>data3: {{ data3 }}</h1>
  <button @click="update">update</button>
</template>

<script>
// ref 函数和 reactive 函数为组合 API 中重要的响应式数据的实现函数
// ref 函数对原始值进行包装，得到 ref 对象，实现响应式数据
// 原始值存储在 ref 对象的 value 属性上，对该属性设置 getter setter 实现响应式
// ref 函数可以包装对象，实质为在内部调用 reactive 函数，并将代理对象存储在 value 属性上
// ref 对象在 ts 中需要采用 value 访问值，在 html 模板中直接使用对象，会自动添加 value
// reactive 函数对对象进行 proxy 包装，得到 proxy 代理对象，实现响应式数据
// reactive 函数为深度遍历，可以对嵌套的多次对象实现 proxy 代理
// proxy 对象可以直接操作，操作会触发对应处理器进行监控，实现响应式
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    // ref 包装原始值
    const data1 = ref('abc')
    // reactive 代理对象
    const data2 = reactive({
      name: 'Tom',
      age: 20,
      wife: {
        name: 'Jerry'
      }
    })
    // ref 包装对象
    const data3 = ref({
      name: 'Tom',
      age: 20,
      wife: {
        name: 'Jerry'
      }
    })
    // 更新数据方法
    const update = () => {
      // ref 对象通过 value 属性获取值
      data1.value += '++'
      // proxy 对象直接修改属性
      data2.wife.name += '++'
      // ref 对象通过 value 属性获取值
      data3.value.wife.name += '=='
    }
    return {
      data1,
      data2,
      data3,
      update
    }
  }
})
</script>

<style>

</style>
