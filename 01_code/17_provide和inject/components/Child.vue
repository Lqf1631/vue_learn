<template>
  <h2>Child</h2>
  <hr>
  <GrandChild></GrandChild>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
// 导入子组件
import GrandChild from './GrandChild.vue'
export default defineComponent({
  name: 'Child',
  // 注册子组件
  components: {
    GrandChild
  }
})
</script>

<style>

</style>
