<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkAll" />
    </label>
    <span> <span>已完成{{ count }}</span> / 全部{{ todos.length }} </span>
    <button class="btn btn-danger" @click="clearAllChecked">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
// 导入 Todo 接口
import { Todo } from '@/types'
export default defineComponent({
  name: 'Footer',
  props: {
    // 接受 App 组件的 todos 数组
    todos: {
      type: Object as () => Todo [],
      required: true
    },
    // 接受 App 组件的 chooseAll 方法，修改 todos 数组中所有项的 isChoose 属性
    chooseAll: {
      type: Function,
      required: true
    },
    // 接受 App 组件的 clearAllChecked 方法，将 todos 数组中所有选中的项删除
    clearAllChecked: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    // 计算属性 count 为 todos 数组中选中数据的数量
    const count = computed(() => {
      return props.todos.filter((todo) => { return todo.isChoose }).length
    })
    // 计算属性 checkAll get 为是否 todos 数据全选中，set 为根据 val 是否全选中 todos 数据
    const checkAll = computed({
      set(val) {
        // 调用 chooseAll 跟据 val 修改整个 todos 数组的 isChoose 属性
        props.chooseAll(val)
      },
      get() {
        return props.todos.every(todo => todo.isChoose)
      }
    })
    return {
      count,
      checkAll
    }
  }
})
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
