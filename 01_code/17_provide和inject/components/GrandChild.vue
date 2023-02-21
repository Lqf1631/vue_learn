<template>
  <h2 :style="{ color }">GrandChild</h2>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/runtime-core'

export default defineComponent({
  name: 'GrandChild',
  setup() {
    // 调用 inject 接受 provide 传递的数据
    // 参数为数据的标识名
    const color = inject('color')
    console.log(color)
    return {
      color
    }
  }
})
</script>

<style>

</style>
