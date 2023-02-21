<template>
  name: {{ name }}
  <br>
  age: {{ age }}
</template>

<script lang="ts">
// reactive 函数返回的 proxy 对象,其内部属性为普通数据,而整个对象为响应式数据
// toRefs 函数参数为 proxy 对象,将其解构为普通对象具有 ref 对象的属性,将其解构为响应式数据
// 常用于仅需操作对象属性的响应式数据而不关注对象整体的情况
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup() {
    // 定义响应式对象
    const person = reactive({
      age: 20,
      name: 'Tom'
    })
    // 设置定时器,定期修改响应式数据
    setInterval(function() {
      person.name += '==='
    }, 1000)
    return {
      // 导出响应式对象
      // 采用 toRefs 进行结构响应式导出
      ...toRefs(person)
    }
  }
})
</script>

<style>

</style>
