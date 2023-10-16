# 边框容器 BorderWrapper

用于创建一个附带边框的容器, 由于border-image原因, 边框样式不可变

## 基本用法

直接使用, 宽度撑满, 高度需要一个固定值, 否则为 100vh - 110px

```js{4}
<BorderWrapper>
  <slot />
</BorderWrapper>
```

<BorderWrapper>123</BorderWrapper>

## 附带内容背景和高度控制

直接使用

```js{4}
<BorderWrapper innerBackground="#f9c" outMinHeight="200px" innerMinHeight="300px">
  <slot />
</BorderWrapper>
```

<BorderWrapper innerBackground="#f9c" outMinHeight="200px" innerMinHeight="300px">123</BorderWrapper>

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| outMinHeight | 整体最小高度 | string | calc(100vh - 110px) |
| innerMinHeight | 内部最小高度, 会撑开整体 | string | calc(100vh - 146px) |
| innerBackground | 内部背景颜色 | string | #232324 |

**Slots**
| 插槽名 | 描述 | 参数 |
| ------------- | :-----------: | ----: |
| default | 默认插槽 | - |
