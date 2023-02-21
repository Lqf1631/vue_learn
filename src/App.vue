<template>
    <div class="todo-container">
    <div class="todo-wrap">
      <Header :todosAdd="todosAdd"></Header>
      <!-- 属性绑定的形式向子组件传值 -->
      <List
      :todos="todos"
      :todosDelete="todosDelete"
      :chooseChange="chooseChange">
      </List>
      <Footer
      :todos="todos"
      :chooseAll="chooseAll"
      :clearAllChecked="clearAllChecked">
      </Footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
// 导入子组件
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import List from '@/components/List.vue'
// 导入接口
import { Todo } from '@/types'
// 导入读取或存储数据到缓存的方法
import { setTodos, getTodos } from '@/utils/localStorage'
export default defineComponent({
  name: 'App',
  // 注册子组件
  components: {
    Header,
    Footer,
    List
  },
  setup() {
    // 将数据以对象数组的形式存储于 APP 组件中，以便其余子组件操作
    // reactive 定义响应式数据，将数据数组作为 Proxy 对象的 todos 属性
    // 使用泛型类约束 data 的类型
    const data = reactive<{ todos: Todo []}>({
      todos: []
    })
    // 每次页面渲染完成后，会从缓存中取得 todos 数组
    onMounted(() => {
      data.todos = getTodos()
    })
    // 向 todos 种添加数据的方法
    const todosAdd = (todo: Todo) => {
      data.todos.unshift(todo)
    }
    // 根据索引删除 todos 数组对应位置的数据方法
    const todosDelete = (index: number) => {
      // 调用数组的 splice 方法，第一个参数为起始位置，第二个参数为数量
      // 删除数组中从起始位置开始的 n 个数量项
      data.todos.splice(index, 1)
    }
    // 修改 todo 的 isChoose 属性的方法
    const chooseChange = (todo: Todo, flag: boolean) => {
      todo.isChoose = flag
    }
    // 修改 todos 数组的所有项的 isChoose 属性方法
    const chooseAll = (flag:boolean) => {
      data.todos.forEach(todo => { todo.isChoose = flag })
    }
    // 删除 todos 数组中所有 isChoose 为 true 项的方法
    const clearAllChecked = () => {
      data.todos = data.todos.filter(todo => !todo.isChoose)
    }
    // 监视器，深度监视 todos 数组，数据变化则将新数组存储到客户端缓存中
    // watch 监视器函数第一个参数为回调，返回值为要监视的对象
    // 第二个参数为回调，回调参数为监视的对象，当其变化时，会执行回调
    // 第三个参数为配置对象，配置如 deep immediate 等监视器行为
    watch(() => data.todos, setTodos, { deep: true })
    return {
      // 将 data 导出，由于仅使用 todos 属性，采用解构 ... 和 toRefs 连用的形式
      ...toRefs(data),
      // 将 todosAdd 导出，传递给 Header 组件
      todosAdd,
      // 将 todosDelete 导出，传递给 List 组件
      todosDelete,
      // 将 chooseChange 导出，传递给 List 组件
      chooseChange,
      // 将 chooseAll 导出，传递给 Footer 组件
      chooseAll,
      // 将 clearAllChecked 导出，传递给 Footer 组件
      clearAllChecked
    }
  }
})
</script>

<style scoped>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

</style>
