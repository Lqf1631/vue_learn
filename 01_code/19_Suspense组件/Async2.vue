<template>
  <h2>动态引入组件2</h2>
  <p>{{ data }}</p>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'Async2',
  async setup() {
    const { data } = await axios.get('/data/obj.json')
    return {
      data
    }
  }
})
</script>

<style>

</style>
