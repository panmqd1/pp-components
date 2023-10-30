# 占位空态 TableEmpty

表格或其他 无数据时的占位

## 基本用法

直接使用, 宽高 100%, 内部垂直水平居中

```js
<TableEmpty />
```

<TableEmpty />

## 控制整体宽高/文字内容

```js
<TableEmpty
  text="文字提示文字提示"
  width="200px"
  height="150px"
  :isWarning="true"
/>
```

<TableEmpty 
  text="文字提示文字提示"
  width="200px" 
  height="150px" 
  :isWarning="true"
/>

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| text | 文字内容 | string | 暂无数据 |
| width | 整体宽度 | string | 100% |
| height | 整体高度 | string | 100% |
| isWarning | 内置的另一张图片 | boolean | false |
