<template>
  <div>
    <h3>{{ user.name }}</h3>
    <h3>{{ user.age }}</h3>
    <h3>{{ user.wife }}</h3>
    <hr>
    <button @click="updateUser">updateUser</button>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@vue/runtime-core'

export default defineComponent({
  name: 'App',
  setup() {
    // 定义普通对象用于存储数据
    const obj = {
      name: 'Tom',
      age: 20,
      wife: {
        name: 'Jerry',
        age: 19,
        cars: ['benci', 'aodi']
      }
    }
    // 调用 reactive 方法，对一般对象进行代理操作
    // 返回值为 Proxy 对象，实现响应式数据
    const user = reactive(obj)
    // 定义方法用于更新 Proxy 对象的数据
    // 仅能操作响应式数据才能实现页面的渲染更新
    const updateUser = () => {
      user.name += '=='
      user.age += '=='
      user.wife.age += '=='
      user.wife.cars.push('bmw')
    }
    // 总结：obj => 目标对象 user => 代理对象
    // reactive 方法接受一目标对象，将其进行 Proxy 包装，返回一代理对象
    // 代理对象为响应式数据，在数据更新时，页面会重写渲染更新
    // 目标对象为普通数据，不能实现响应式的重新更新
    // 由于其具有代理关系，故目标对象与代理对象会实现同步更新数据，区别在于页面是否重新渲染更新
    return {
      user,
      updateUser
    }
  }
})
</script>

<style>

</style>
