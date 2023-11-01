# 折叠板 CollapsePanel

可以点击展开收起的面板，可选缩放模式和定高模式

## 基本用法

默认缩放模式，宽度撑满，高度为内容的高度

```js
<CollapsePanel
  :contentStyle="{ 'background-color': 'pink' }"
>

  <div>缩放折叠内容</div>
  <div>缩放折叠内容</div>
  <div>缩放折叠内容</div>
</CollapsePanel>
```

<CollapsePanel
  :contentStyle="{ 'background-color': 'pink' }"
>

  <div>缩放折叠内容</div>
  <div>缩放折叠内容</div>
  <div>缩放折叠内容</div>
</CollapsePanel>

## 定高模式，需要传入折叠内容的高度；也可通过外部变量控制组件折叠状态

```js
<CollapsePanel
  :collapsed="false"
  mode="height"
  contentHeight="400px"
  :contentStyle="{ 'background-color': 'red' }"
>
  <div>定高折叠内容</div>
  <div>定高折叠内容</div>
  <div>定高折叠内容</div>
</CollapsePanel>
```

<CollapsePanel
  :collapsed="false"
  mode="height"
  contentHeight="400px"
  :contentStyle="{ 'background-color': 'red' }"
>

  <div>定高折叠内容</div>
  <div>定高折叠内容</div>
  <div>定高折叠内容</div>
</CollapsePanel>

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| mode | 运行模式 | scale/height | scale |
| contentHeight | 内容高度，mode 为 height 时必填 | string | - |
| v-model:collapsed | 是否折叠 | boolean | false |
| titleText | 组件标题 | string | 折叠标题 |
| titleStyle | 组件标题样式 | Object | - |
| contentStyle | 组件标题样式 | Object | - |
