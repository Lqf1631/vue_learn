// 手写 shallowReactive reactive
// 手写 shallowRef ref

// 定义处理器对象 handler
const handler = {
  // 在处理器对象内可以调用 Reflect 反射对象的同名方法来还原基本操作
  // 重写 get 并实现拦截
  get(target, prop) {
    // 定义 is_reactive 属性用于标识是否为 reactive 对象
    if (prop === '_is_reactive') {
      return true
    }
    console.log('get ' + prop)
    return Reflect.get(target, prop)
  },
  // 重写 set 并实现拦截
  set(target, prop, value) {
    console.log('set ' + prop)
    return Reflect.set(target, prop, value)
  },
  // 重写 deleteProperty 并实现拦截
  deleteProperty(target, prop) {
    console.log('delete ' + prop)
    return Reflect.defineProperty(target, prop)
  }
}

// shallowReactive 函数接受一个目标对象，返回一个目标对象的代理对象，为浅度代理
const shallowReactive = (target) => {
  // 检验是否为对象，为对象则返回代理对象，否则返回原值
  if (typeof target === 'object') {
    // 返回目标对象的代理对象
    // 第一个参数为目标对象
    // 第二个参数为处理器对象
    // 在处理器对象中重写代理对象的基本操作行为
    return new Proxy(target, handler)
  } else {
    return target
  }
}

// reactive 函数接受一个目标对象，返回一个目标对象的代理对象，需要深度代理
const reactive = (target) => {
  if (typeof target === 'object') {
    // 需要遍历判断是否仍为对象，为对象需要递归处理
    // 对于对象和数组需采用不同方法进行遍历
    if (Array.isArray(target)) {
      // 为数组
      target.forEach((index, item) => {
        // 递归处理，该项为对象则进行深度代理，为普通值则返回，即继续递归调用 reactive
        target[index] = reactive(item)
      })
    } else {
      // 为对象，将其转化为数组
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }
    return new Proxy(target, handler)
  } else {
    return target
  }
}

const obj = reactive({
  name: 'Mike',
  car: {
    name: 'benci'
  }
})

// obj.name += '=='
// 深度监视，能够拦截 delete 操作
// 先读取 obj.car 值，再删除 name 属性
// delete obj.car.name

const obj1 = shallowReactive({
  name: 'Tom',
  car: {
    name: 'bmw'
  }
})
// 浅层监视，仅能拦截到读取 obj.car 不能拦截到 delete 操作
// delete obj1.car.name

// shallowRef 实质为浅拦截，仅将目标对象存储在包裹对象的 value 属性中，仅拦截第一层的操作 value
const shallowRef = (target) => {
  // 实质是将 target 存储在一个对象的 value 属性中
  return {
    // 定义 value 属性用于存储 target 对象
    _value: target,
    // 定义针对 value 属性的 get 方法
    get value() {
      console.log('get')
      return this._value
    },
    // 定义针对 value 属性的 set 方法
    set value(val) {
      console.log('set')
      this._value = val
    }
  }
}

// Ref 实质为深拦截，即先将目标对象调用 reactive 方法，进行深度代理，再将代理对象存储于 value 属性中
const ref = (target) => {
  // 调用 reactive 方法，对目标对象进行代理
  target = reactive(target)
  // 实质是将 target 存储在一个对象的 value 属性中
  return {
    // 定义 _is_ref 属性用于标识 ref 对象
    _is_ref: true,
    // 定义 _value 属性用于存储 target 对象
    _value: target,
    // 定义针对 value 属性的 get 方法
    get value() {
      console.log('get')
      return this._value
    },
    // 定义针对 value 属性的 set 方法
    set value(val) {
      console.log('set')
      this._value = val
    }
  }
}
const obj3 = shallowRef({
  name: 'Mike',
  friend: ['a', 'b']
})
// 浅劫持仅能拦截到外层的读取操作，不能拦截内层的修改操作
// obj3.value.friend[0] = 'c'

const obj4 = ref({
  name: 'Jerry',
  friend: {
    age: 20,
    name: 'Tom'
  }
})
// 先调用 reactive 进行深度代理，再将代理对象设置为 value 值
obj4.value.friend.age = 30

// 定义 isRef 函数
const isRef = (target) => {
  return target && target._is_ref
}
// 定义 isReactive 函数
const isReactive = (target) => {
  return target && target._is_reactive
}
console.log(isRef(ref({})))
console.log(isReactive(reactive({})))
