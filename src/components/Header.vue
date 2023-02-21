<template>
  <div class="todo-header">
    <!-- 在输入框中添加键盘事件，将输入框的内容添加到 App 组件 todos 数组中 -->
    <input
    type="text"
    placeholder="请输入你的任务名称，按回车键确认"
    v-model="text"
    @keyup.enter="add"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 导入 Todo 接口
import { Todo } from '@/types'
export default defineComponent({
  name: 'Header',
  // 自定义属性，接受 App 组件的传值
  props: {
    // 以对象形式定义 todosAdd 类型为 Function 且为必须
    todosAdd: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    // 定义 text 用于存储文本框输入值
    const text = ref('')
    // 定义 add 函数，用于将 text 数据整合为 todo 对象，并将其添加到 App 组件的 todos 中
    const add = () => {
      // 判断 text 值是否为空
      if (!text.value.trim()) return
      const newTodo: Todo = {
        id: Date.now(),
        title: text.value,
        isChoose: false
      }
      // 通过 props 调用 todosAdd 将 newTodo 添加到 todos 中
      props.todosAdd(newTodo)
      // 清楚 text 以便下次输入
      text.value = ''
    }
    return {
      text,
      add
    }
  }
})
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
