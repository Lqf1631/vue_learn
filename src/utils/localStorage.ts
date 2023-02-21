// 客户端存储的相关方法工具

// 导入 Todo 接口
import { Todo } from '@/types'

// 向客户端缓存存储 todos 数组的方法
export function setTodos(todos: Todo []) {
  // 调用 localStorage.setItem 第一个参数为键，第二个参数为值
  // 存储采用 JSON 形式，调用 JSON.stringify 将 js 转为 JSON 形式
  localStorage.setItem('todos_key', JSON.stringify(todos))
}

// 从客户端缓存读取 todos 数组的方法
export function getTodos(): Todo [] {
  // 从 todos_key 键获取数据，格式为 JSON 调用 JSON.parse 方法，将其转化为 js
  // 如果为 todos_key 上没有存储数据，则设定一个 JSON 形式的空数组，避免报错
  return JSON.parse(localStorage.getItem('todos_key') || '[]')
}
