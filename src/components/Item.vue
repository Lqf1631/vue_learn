<template>
  <!-- 绑定鼠标聚焦列表时显示高亮并出现删除按钮事件 -->
  <!-- 使用向事件处理函数中传参来区分是聚焦还是失焦 -->
  <li
  @mouseenter="mouseHandler(true)"
  @mouseleave="mouseHandler(false)"
  :style="{ backgroundColor: bgColor, color: myColor }">
      <label>
        <input type="checkbox" v-model="flag"/>
        <span>{{ todo.title }}</span>
      </label>
      <button class="btn btn-danger" v-show="isShow" @click="delTodo">删除</button>
    </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
// 导入 Todo 接口
import { Todo } from '@/types'
export default defineComponent({
  name: 'Item',
  // 自定义属性来接受 List 传值
  props: {
    // 以对象形式定义自定义属性，采用强制转化形式，将接受的 Object 类型转化为 Todo 类型
    todo: {
      type: Object as () => Todo,
      required: true
    },
    // 接受根据索引删除 todos 数组的项的方法
    todosDelete: {
      type: Function,
      required: true
    },
    // 接受索引值
    index: {
      type: Number,
      required: true
    },
    // 接受修改 todo.isChoose 属性的方法
    chooseChange: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    // 对于表单元素使用父级组件的数据时，一般采用计算属性的形式
    // 在 get 中获取父级组件的数据在 set 中根据表单元素的值来调用定义在父级组件中的方法修改父级组件的数据
    const flag = computed({
      get() {
        return props.todo.isChoose
      },
      set(val) {
        // 调用 chooseChange 修改父级组件的 todo.isChoose 状态
        props.chooseChange(props.todo, val)
      }
    })
    // 背景颜色
    const bgColor = ref('white')
    // 字体颜色
    const myColor = ref('black')
    // 是否显示删除按钮
    const isShow = ref(false)
    // 鼠标聚焦和失焦事件处理函数，更改文本框的颜色和是否显示删除按钮
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        bgColor.value = 'pink'
        myColor.value = 'green'
        isShow.value = true
      } else {
        bgColor.value = 'white'
        myColor.value = 'black'
        isShow.value = false
      }
    }
    // 点击删除按钮，根据索引删除 todos 数组的对应项
    const delTodo = () => {
      // 弹出提示框提示是否删除
      if (window.confirm('是否删除')) {
        props.todosDelete(props.index)
      }
    }
    return {
      flag,
      bgColor,
      myColor,
      isShow,
      mouseHandler,
      delTodo
    }
  }
})
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
