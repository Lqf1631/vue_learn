<template>
  <h2>Child</h2>
  <h3>{{ age }}</h3>
</template>

<script>
import { defineComponent, toRef } from '@vue/runtime-core'

export default defineComponent({
  name: 'Child',
  // 定义自定义属性，接受父组件传递数据
  props: {
    ageVal: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    // 接受到的实质为 age 数据，即 ref.value
    console.log(props.ageVal)
    const age = toRef(props, 'ageVal')
    return {
      age
    }
  }
})
</script>

<style>

</style>
