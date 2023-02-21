// 手写 readonly 和 shallowReadonly

// 定义处理器对象，拦截并禁用修改和删除操作，仅保留读取操作
const handler = {
  get(target, prop) {
    if (prop === '_is_readonly') {
      return true
    }
    console.log('get', prop)
    return Reflect.get(target, prop)
  },
  set() {
    console.warn('readonly not set')
  },
  deleteProperty() {
    console.warn('readonly not deleteProperty')
  }
}
const shallowReadonly = (target) => {
  // 判断是否为对象
  if (typeof target === 'object') {
    // 为对象则返回其代理对象
    return new Proxy(target, handler)
  } else {
    // 为原始值直接返回
    return target
  }
}

const readonly = (target) => {
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      // 为数组
      target.forEach((index, item) => {
        target[index] = readonly(item)
      })
    } else {
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key])
      })
    }
    return new Proxy(target, handler)
  } else {
    return target
  }
}

const obj = shallowReadonly({
  name: 'Tom',
  cars: ['benci', 'bwm']
})
// 浅只读，可以对深层次的结构进行修改
obj.cars[0] = 'aodi'
console.log(obj.cars[0])

const obj1 = readonly({
  name: 'Tom',
  cars: ['1', '2']
})
// 深只读，拦截深层次的修改和删除操作
obj1.cars[0] = '3'
delete obj1.cars[0]

// 定义 isReadonly 函数
const isReadonly = (target) => {
  return target && target._is_readonly
}
console.log(isReadonly(readonly({})))
