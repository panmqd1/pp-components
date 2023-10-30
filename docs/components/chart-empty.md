# 图表空态 ChartEmpty

Echarts 无数据时的占位

## 基本用法

直接使用, 宽高 100%, 内部垂直水平居中

```js
<ChartEmpty />
```

<ChartEmpty />

## 控制整体宽高/内部图片宽高/文字内容

```js
<ChartEmpty
  text="文字提示文字提示"
  width="200px"
  height="150px"
  imgWidth="60px"
  imgHeight="60px"
/>
```

<ChartEmpty 
  text="文字提示文字提示"
  width="200px" 
  height="150px" 
  imgWidth="60px" 
  imgHeight="60px" 
/>

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| text | 文字内容 | string | 暂无数据 |
| width | 整体宽度 | string | 100% |
| height | 整体高度 | string | 100% |
| imgWidth | 图片宽度 | string | 80px |
| imgWidth | 图片高度 | string | 80px |
