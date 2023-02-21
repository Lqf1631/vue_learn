<template>
  <h1>Child 组件</h1>
  <h3>msg: {{ msg }}</h3>
  <h3>str1: {{ str1 }}</h3>
  <button @click="str1Add">+</button>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Child',
  props: ['msg'],
  beforeCreate() {
    console.log('beforeCreate')
  },
  // 1.setup 执行时机：在 beforeCreate 之前，此时组件尚未创建
  // 无法通过 this 访问组件实例对象，此时 this 值为 undefined
  // 2.setup 返回值：返回值为一对象，对象的属性和方法可以在 html 模板中使用
  // setup 返回的属性会和 data 合并为组件实例对象的属性
  // setup 返回的方法会和 methods 合并为组件实例对象的方法
  // 在 setup 中不能访问 data methods 的数据，因为此时 this 未创建，反之则可以
  // 在 vue3 中推荐仅使用 setup 当遇上重名冲突时，setup优先
  // setup 函数不能为 async 异步函数
  // 3.setup 参数：setup 中的参数用于子组件与父组件之间的数据传递操作
  // props 参数：该参数为代理对象，为父组件传递给子组件的自定义属性组成的对象
  // context 参数：具有 attrs 属性，slots 属性，emit 属性
  // attrs：该属性为代理对象，父组件传递给子组件的非 props 属性的其余属性组成的对象
  // emit：方法，实质为 setup 中的 this.$emit 用于派发自定义事件进行子组件向父组件传递数据
  // 此时传递的为 ref 对象，需要通过 value 属性访问值
  // slots：该属性为父组件传递给子组件的插槽
  setup(props, context) {
    // props 对象为子组件中的自定义属性接受来自父组件的数据组成的对象的代理
    console.log(props.msg)
    // context.attrs 对象为父组件传递给子组件的非 props 属性组成的对象的代理
    console.log(context.attrs)

    console.log('setup')
    console.log(this)
    // 定义属性
    const str1 = ref('a')
    // context.emit 方法用于派发自定义事件，用于向父组件传递数据
    context.emit('str1Change', str1)
    // 定义方法
    const showStr1 = () => {
      console.log(str1)
    }
    const str1Add = () => {
      str1.value += '+'
    }
    return {
      str1,
      showStr1,
      str1Add
    }
  },
  data() {
    return {
      str2: 'b'
    }
  },
  methods: {
    showStr2() {
      console.log(this.str1)
    }
  },
  created() {
    console.log(this)
  }
})
</script>

<style>

</style>
