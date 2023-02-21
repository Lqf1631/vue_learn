// 导入 createApp 函数
import { createApp } from 'vue'
// 导入 App 组件，为所有组件的根组件
import App from './App.vue'

// 调用 createApp 函数，参数为组件对象，返回值为 App 对象
// 在 App 对象上调用 mount 方法，参数为选择器，将其挂载到对应的元素上
// 即在对应的元素上渲染对应的组件
createApp(App).mount('#app')
