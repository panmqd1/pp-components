# 图标 IconifyIconOnline / IconifyIconOffline

在线图标和离线图标

::: warning 图标请求地址
在线图标走的请求地址是 https://api.iconify.design，第一次加载会走接口，然后默认将图标文件存入 localstorage ，之后加载图标走 localstorage
:::

## 在线图标

在[icones](https://icones.js.org/)找到所需的图标，复制名称放到 icon 属性里就行;宽高默认 14px;

```js
<IconifyIconOnline
  icon="svg-spinners:blocks-wave"
/>
<IconifyIconOnline
  icon="ant-design:fullscreen-exit-outlined"
  color="red"
  width="18px"
  height="18px"
/>
<IconifyIconOnline
  icon="ep:bell-filled"
  color="#2bd0d7"
  width="32px"
  height="32px"
/>
```

<IconifyIconOnline
  icon="svg-spinners:blocks-wave"
/>
<IconifyIconOnline
  icon="ant-design:fullscreen-exit-outlined"
  color="red"
  width="18px"
  height="18px"
/>
<IconifyIconOnline
  icon="ep:bell-filled"
  color="#2bd0d7"
  width="32px"
  height="32px"
/>

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| icon | 图标名称 | string | - |
| color | 图标颜色 | string | - |
| width | 宽度 | string | 14px |
| height | 高度 | string | 14px |
