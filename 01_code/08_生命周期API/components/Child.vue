<template>
  <h3>Child 组件</h3>
  <h4> {{ msg }}</h4>
  <button @click="msg += '==='">update</button>
</template>

<script>
import {
  defineComponent, ref, onBeforeMount, onMounted, onBeforeUpdate,
  onUpdated, onUnmounted, onBeforeUnmount
} from 'vue'
export default defineComponent({
  name: 'Child',
  // vue2.x 中的生命周期在 vue3.x 中使用
  // 组件创建前的钩子，此时无法访问 this
  beforeCreate() {
    console.log('beforeCreate...')
  },
  // 组件刚创建完成的钩子,此时 this 访问组件实例
  // 一般用于接受 ajax 数据并赋值
  created() {
    console.log('created...')
  },
  // 组件渲染前的钩子,此时无法访问页面 dom 结构
  beforeMount() {
    console.log('beforeMount...')
  },
  // 组件刚渲染完成的钩子,此时 dom 操作页面结构
  mounted() {
    console.log('mounted...')
  },
  // 组件更新渲染前的钩子,此时可以访问更新渲染前的页面 dom
  beforeUpdate() {
    console.log('beforeUpdate...')
  },
  // 组件更新渲染刚完成的钩子,此时可以访问更新渲染后的页面 dom
  updated() {
    console.log('updated...')
  },
  // 组件销毁前的钩子
  beforeUnmount() {
    console.log('beforeUnmount...')
  },
  // 组件销毁完成的钩子
  unmounted() {
    console.log('unmounted...')
  },
  setup() {
    // setup 替代 beforeCreated create
    console.log('setup3')
    const msg = ref('aaa')
    // 渲染之前
    onBeforeMount(() => {
      console.log('onBeforeMount3')
    })
    // 渲染刚完成
    onMounted(() => {
      console.log('onMounted3')
    })
    // 重新渲染之前
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate3')
    })
    // 重新渲染刚完成
    onUpdated(() => {
      console.log('onUpdated3')
    })
    // 销毁之前
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount3')
    })
    // 重新销毁刚完成
    onUnmounted(() => {
      console.log('onUnmounted3')
    })
    return {
      msg
    }
  }
})
</script>

<style>
</style>
