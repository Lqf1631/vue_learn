<template>
  <!-- html 模板中设置 ref 属性，值为某一 ref 常量 -->
  <input type="text" ref="input">
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
export default defineComponent({
  setup() {
    // 定义 ref 常量,该常量为对 html 元素的引用
    // 调用 ref 函数时，给泛型约束赋值
    // 约束 ref 对象的 value 类型为 HTMLElement 或 null
    const input = ref<HTMLElement | null>(null)
    // 在 setup 执行时,页面未渲染,不能操作 DOM
    console.log(input.value)
    // 页面渲染完成时,可以操作 DOM
    onMounted(function() {
      console.log(input)
      // ref 包裹 html 标签元素,在页面渲染完成后,可以自动获取设置的标签
      // 通过 ref 对象的 value 属性可以访问到 DOM 元素
      input.value?.focus()
    })
    return {
      // 导出 ref 常量
      input
    }
  }
})
</script>
