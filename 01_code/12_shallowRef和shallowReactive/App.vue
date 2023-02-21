<template>
  <h2>shallowReactive 和 shallowRef</h2>
  <h3>m1: {{ m1 }}</h3>
  <h3>m2: {{ m2 }}</h3>
  <h3>m3: {{ m3 }}</h3>
  <h3>m4: {{ m4 }}</h3>
  <hr>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
// !!!!! 注意：响应式数据变化时，会触发页面的重新渲染，而非响应式数据不会触发重新渲染
// 即在某一次操作内，修改了响应式数据和非响应式数据的值
// 由于修改响应式数据触发的页面重新渲染，也会渲染出非响应式数据的值
import { defineComponent, reactive, ref, shallowReactive, shallowRef } from 'vue'
// 定义 Ifriend 接口约束 friend 对象
interface Ifriend {
  name: string,
  age: number
}
// 定义 Im 接口约束 m 对象
interface Im {
  name: string,
  friend: Ifriend
}
export default defineComponent({
  name: 'App',
  setup() {
    // m1 对象满足 Im 接口，且使用 reactive 将其修饰为深度响应式数据
    // 深度响应式数据：对象内部的多层嵌套均视为响应式数据
    // 即不管嵌套层次多深，对象数据变化时，会进行响应式操作
    const m1 = reactive<Im>({
      name: 'Tom',
      friend: {
        name: 'Mike',
        age: 20
      }
    })
    // m2 对象为 ref 修饰的满足 Im 接口的深度响应式对象
    // ref 修饰对象时，会在内部调用 reactive 方法
    const m2 = ref<Im>({
      name: 'Tom',
      friend: {
        name: 'Mike',
        age: 20
      }
    })
    // m3 对象为 shallowReactive 修饰的满足 Im 接口的浅响应式对象
    // 即仅对象的最外层为响应式数据，不会对内层嵌套结构进行响应式处理
    const m3 = shallowReactive<Im>({
      name: 'Tom',
      friend: {
        name: 'Mike',
        age: 20
      }
    })
    // shallowRef：仅修饰原始值
    // 当 shallowRef 修饰对象时，不会将其转化为响应式对象
    const m4 = shallowRef<Im>({
      name: 'Tom',
      friend: {
        name: 'Mike',
        age: 20
      }
    })
    const update = () => {
      // 更新 m1
      // 深度响应式，内外层均响应
      // m1.name += '===='
      // m1.friend.name += '===='
      // 更新 m2
      // ref 对象，需访问 value 属性操作值
      // 深度响应式，内外层均响应
      // m2.value.name += '===='
      // m2.value.friend.name += '===='
      // 更新 m3
      // m3.friend.name += '===='
      // 更新 m4
      m4.value.friend.name += '==='
    }
    return {
      m1,
      m2,
      m3,
      m4,
      update
    }
  }
})
</script>

<style></style>
