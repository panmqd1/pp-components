# 缩放盒子 ScreenBox

一个自适应容器, 内部始终维持固定的宽高比

<script setup>
import {ref} from 'vue'

const outsideFullScreen = ref(false)
const handleFullScreen = () => {
  outsideFullScreen.value = !outsideFullScreen.value
}

</script>

## 基本用法

默认宽高1920*1080, 可以自由传入宽高, 内部会始终维持这个宽高比, 多余部分以#1c2023填充

```js
<script setup>
import {ref} from 'vue'

const outsideFullScreen = ref(false)
const handleFullScreen = () => {
  outsideFullScreen.value = !outsideFullScreen.value
}

</script>

<el-button @click="handleFullScreen">切换全屏</el-button>

<div style="width: 800px; height: 400px;padding: 20px;background-color: #eee;resize: both;overflow: auto;">
  <ScreenBox v-model:outsideIsFullscreen="outsideFullScreen">
    <span style="color: #ffffff;">12121212</span>
  </ScreenBox>
</div>
```

<el-button @click="handleFullScreen">切换全屏</el-button>

<div style="width: 800px; height: 400px;padding: 20px;background-color: #eee;resize: both;overflow: auto;">
  <ScreenBox v-model:outsideIsFullscreen="outsideFullScreen">
    <span style="color: #ffffff;">12121212</span>
  </ScreenBox>
</div>

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| designWidth | 设计图尺寸 宽度 | number | 1920 |
| designHeight | 设计图尺寸 高度 | number | 1080 |
| designFontSize | 设计图尺寸 字体 | string | 14px |
| showFullscreen | 是否显示全屏 icon | boolean | false |
| outsideIsFullscreen | 外部传入控制全屏的变量 | boolean | false |

**Slots**
| 插槽名 | 描述 | 参数 |
| ------------- | :-----------: | ----: |
| default | 默认插槽 | - |
