# 第6章 组件
## [注册](register.html)
1. 全局注册
```js
Vue.component('my-component', {
  template: '<div>局部注册</div>'
})
```
> 组件测试后，可以被之后的Vue实例所使用。

2. 局部注册
```js
new Vue({
  el: '#app',
  components: {
    'my-component': {
      template: '<div>局部注册</div>'
    }
  }
})
```
> 只有在此实例的作用域有效

Vue的模板在某些情况下会受HTML的限制，如table，直接使用组件是无效的。这种情况下使用特殊的is属性来挂载
```html
<table>
  <tbody is="my-component"></tbody>
</table>
```
组件当中data必须函数，然后将数据return出去。

## [props传递数据](props.html)
作用： 父组件向子组件传递数据
```js
props: {
  message: {
    type: String,
    default: '你好'
  }
  age: Number,
  isDeleted: Boolean
}
```
支持类型，还有其他一些，不细说。

## 组件通信
子组件用 **\$emit** 来触发事件，父组件用 **\$on** 来监听子组件的事件。

// 父
```html
<my-component @test="testMethod"></my-component>
```
// 子
```js
this.$emit('test', data);
```

## 插槽
// TODO

