# 自定义加载中 Loading

element-plus 自定义加载样式, 暂时是以组件形式, 后期优化为函数式调用

<script setup>
import {ref} from 'vue'

const loading = ref(false)

const handleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

## 基本用法

将组件挂载在最外层, loading用状态管理来控制

```js{4}
<el-button @click="handleLoading">加载</el-button>
<Loading :loading="loading" />

const loading = ref(false)

const handleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
```

<el-button @click="handleLoading">加载</el-button>
<Loading :loading="loading" />

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| loading | 是否加载中 | boolean | false |
