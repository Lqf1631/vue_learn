<template>
  <h2>obj: {{ objReadOnly }}</h2>
  <hr>
  <button @click="update"> update </button>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly } from 'vue'
// 定义 Ifriend 接口约束 friend 对象
interface Ifriend {
  name: string,
  age: number
}
// 定义 Iobj 接口约束 obj 对象
interface Iobj {
  name: string,
  age: number,
  friend: Ifriend
}
export default defineComponent({
  name: 'App',
  setup() {
    const obj = reactive<Iobj>({
      name: 'Tom',
      age: 20,
      friend: {
        name: 'Mike',
        age: 19
      }
    })
    // 调用 readonly 方法，参数为对象，返回一个深度只读的对象
    const objReadOnly1 = readonly(obj)
    // 调用 shallowReadonly 方法，参数为对象，返回一个浅只读的对象
    const objReadOnly = shallowReadonly(obj)
    const update = () => {
      // 深度只读对象，不能修改值
      // objReadOnly.name += '==='
      // 浅只读对象，可以修改内部嵌套的对象值
      objReadOnly.friend.name += '===='
    }
    return {
      objReadOnly,
      update,
      objReadOnly1
    }
  }
})
</script>

<style>

</style>
