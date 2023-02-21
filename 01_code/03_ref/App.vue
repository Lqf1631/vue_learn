<template>
  <div>
    <!-- 在模板中可以直接使用响应式数据 -->
    <h3>{{ count }}</h3>
    <button @click="countUpdate">+1</button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  // setup 函数为组合 API 的入口函数，仅执行一次
  setup() {
    // 定义原始值的响应式数据
    // 调用 ref 方法，参数为原始值数据，返回值为原始值包装的响应式对象，即 ref 对象
    const count = ref(0)
    // 定义方法
    function countUpdate() {
      // 对响应式对象的数据进行操作，需按 value 属性访问
      count.value++
    }
    return {
      // setup 函数返回值暴露的为响应式对象
      count,
      countUpdate
    }
  }
}
)
</script>

<style></style>
