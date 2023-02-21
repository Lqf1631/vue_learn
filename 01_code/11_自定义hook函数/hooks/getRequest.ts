// 定义 axios 发送请求获取数据的 hook 函数
// 导入 axios
import axios from 'axios'
import { ref } from 'vue'
// 导出 hook 函数
// 函数接受 url 字符串作为参数
// 由于请求数据可能为多种类型，采用泛型进行约束
export default function getRequst<T>(url: string) {
  // 定义响应式数据存储请求信息
  // loading 请求状态，是否正在请求中
  const loading = ref(true)
  // data 数据
  // data 为调用 ref 函数的返回值，ref 调用时可以使用泛型进行约束函数返回值的类型
  const result = ref<T | null>(null)
  // erroMsg 错误信息
  const errorMsg = ref('')
  // 调用 axios 发送请求获取数据
  // 分别捕获 Promise 的成功以及失败情况
  axios.get(url)
    .then(({ data }) => {
    // 请求成功，切换 loading 状态
      loading.value = false
      result.value = data
    })
    .catch((error) => {
    // 请求失败，切换 loading 状态
      loading.value = false
      // 将错误信息赋值给 erroMsg
      errorMsg.value = error.massage || 'unkwon error'
    })
  return {
    loading,
    result,
    errorMsg
  }
}
