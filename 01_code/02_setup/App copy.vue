<template>
  <h1>App 组件</h1>
  <h3>msg: {{ msg }}</h3>
  <h3>str: {{ str }}</h3>
  <button @click="msg += '==='">update</button>
  <hr>
  <Child :msg="msg" age="20" like="swim" @str1Change="str1Use"></Child>
</template>

<script>
import { defineComponent, ref } from 'vue'
// 导入子组件
import Child from '@/components/Child'
export default defineComponent({
  name: 'AppCopy',
  components: {
    Child
  },
  setup() {
    // 定义响应式数据 msg
    const msg = ref('Tom')
    const str = ref('')
    const str1Use = (str1) => {
      // 传递来的参数为 ref 对象包装的原始值
      // 通过 value 属性来访问值
      str.value = str1.value
    }
    return {
      msg,
      str,
      str1Use
    }
  }
})
</script>

<style>

</style>
