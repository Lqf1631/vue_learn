<template>
  <div>
    <h1>{{ number }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  // setup 函数：在配置对象中调用，为组合 API 的入口函数，该函数仅执行一次
  // 函数的返回值为对象形式时，对象中的属性，方法可以在模板 template 中任意使用
  setup() {
    const number = 10
    console.log('Hi')
    return {
      number
    }
  }
})
</script>
