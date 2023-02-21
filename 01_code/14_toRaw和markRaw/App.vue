<template>
  <h2>toRaw markRaw</h2>
  state: {{ state }}
  rawState: {{ rawState }}
  <hr>
  <button @click="toRawTest">toRaw</button>
  <button @click="markRawTest">markRaw</button>
</template>

<script lang="ts">
import { defineComponent, markRaw, reactive, ref, toRaw } from '@vue/runtime-core'
interface Istate {
  name: string
  age: 20
  likes?: string[]
}
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive<Istate>({
      name: 'Tom',
      age: 20
    })
    // 调用 toRaw 方法，传入响应式数据，将其还原为普通数据并返回
    // 该方法仅针对于 Proxy 代理对象形式的响应式数据，对 ref 对象无作用
    const rawState = toRaw(state)
    const toRawTest = () => {
      rawState.name += '==='
      const a = ref<string>('a')
      const A = toRaw(a)
      console.log(A === a)
    }
    const markRawTest = () => {
      const likes: string[] = ['a', 'b']
      // 对某一数据调用 markRaw 方法，将该数据打上标记并返回
      // 用于将该标记的数据赋值给响应式对象，在该响应式对象内的对应属性为非响应式
      // 对 ref 对象无作用
      state.likes = markRaw(likes)
      const a = ref<string>('a')
      const A = markRaw(a)
      console.log(a === A)
    }
    return {
      state,
      rawState,
      toRawTest,
      markRawTest
    }
  }

})
</script>

<style>

</style>
