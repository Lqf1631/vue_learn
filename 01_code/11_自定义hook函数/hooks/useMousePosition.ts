// 导入需要模块
import { onMounted, ref, onBeforeUnmount } from 'vue'
// 封装函数并导出
export default function() {
  // 定义鼠标坐标的响应式数据，并预先存储初始值 -1
  const x = ref(-1)
  const y = ref(-1)
  // 定义鼠标点击事件的处理函数，获取鼠标点击位置坐标
  function clickHandler(event: MouseEvent) {
    // 通过 event 获取坐标并赋值给响应式数据存储
    x.value = event.pageX
    y.value = event.pageY
  }
  // 页面渲染完成，触发生命周期 API 为 window 对象添加点击事件
  onMounted(() => {
    window.addEventListener('click', clickHandler)
  })
  // 页面卸载完成前，触发生命周期 API 为 window 对象取消点击事件
  onBeforeUnmount(() => {
    window.removeEventListener('click', clickHandler)
  })
  // 定义函数返回值
  return {
    x,
    y
  }
}
