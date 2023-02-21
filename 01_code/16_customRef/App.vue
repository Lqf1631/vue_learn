<template>
  <h2>customRef</h2>
  <input type="text" v-model="text">
  <p>{{ text }}</p>
</template>

<script lang='ts'>
import { customRef, defineComponent } from '@vue/runtime-core'

// 定义 hook 函数实现自定义 ref 对象，在更新页面时具有延迟效果
function delayRef<T>(value: T, delay = 200) {
  // 该函数返回一个自定义获取或设置行为的 ref 对象
  // customRef 函数参数为一回调函数，回调函数参数为 track 和 trigger 函数
  // 回调函数返回值为一 ref 对象，该对象可以设置 get 和 set 行为来自定义 ref 对象的行为
  // 在 get 中必须设置返回值，为读取到该对象操作时返回的值，且可以调用 track 函数进行响应式追踪
  // 在 set 中必须具备参数，该参数为设置对象的 value 属性操作时传递的参数
  // 在 set 中可以调用 trigger 函数添加响应式数据
  return customRef((track, trigger) => {
    // 设置 number 类型的变量用于存储定时器
    let timeoutId : number
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        // 清除定时器
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
export default defineComponent({
  name: 'App',
  setup() {
    // 该状态下为实时更新效果
    // const text = ref('abc')
    const text = delayRef<string>('abc', 1000)
    return {
      text
    }
  }
})
</script>

<style>

</style>
