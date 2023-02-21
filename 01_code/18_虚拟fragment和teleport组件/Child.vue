<template>
  <h2>Child</h2>
  <button @click="showState = true">show</button>
  <!-- 使用 teleport 标签并设置 to 属性，可以将该标签内包裹的元素转移到 to 属性的标签中 -->
  <Teleport to="body">
    <div v-if="showState">
      <p>===========</p>
      <button @click="showState = false">close</button>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Child',
  setup() {
    // 定义控制对话框显示的状态数据
    const showState = ref(false)
    return {
      showState
    }
  }
})
</script>

<style></style>
