<template>
  <ul class="todo-main">
    <!-- 根据父组件 todos 数组循环渲染 Item 组件，并将单个对象的数据传递给 Item 组件 -->
    <Item
    v-for="(todo, index) in todos" :key="todo.id"
    :todo="todo"
    :todosDelete="todosDelete"
    :index="index"
    :chooseChange="chooseChange">
    </Item>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 导入子组件
import Item from '@/components/Item.vue'
export default defineComponent({
  name: 'List',
  // 注册子组件
  components: {
    Item
  },
  // 定义自定义属性，用于接受来自父组件的传值
  props: ['todos', 'todosDelete', 'chooseChange']
})
</script>

<style scoped></style>
