# 简易表格 CustomTable

简易表格展示, 附带样式控制/文本省略/单元格操作

<script setup>
const columnHeaderBaseStyle = {
  flex: 1,
  'justify-content': 'center'
}
const columnBaseStyle = {
  flex: 1,
  background: '#000',
  'text-align': 'center',
  'justify-content': 'center'
}
const columns1 = [
  {
    label: '姓名',
    prop: 'name',
    headerStyle: {
      ...columnHeaderBaseStyle
    },
    style: {
      ...columnBaseStyle
    }
  },
  {
    label: '年龄',
    prop: 'age',
    headerStyle: {
      ...columnHeaderBaseStyle
    },
    style: {
      ...columnBaseStyle
    }
  },
  {
    label: '性别',
    prop: 'gender',
    headerStyle: {
      ...columnHeaderBaseStyle
    },
    style: {
      ...columnBaseStyle,
      color: '#f12'
    },
    // 优先级最高
    operationText: '点击单元格',
    operateFn: (row) => {
      console.log(row)
    }
  },
]
const data1 = new Array(5).fill(undefined).map((_, index) => {
  return {
    name: `姓名_${index}`,
    age: `${index+1}`,
    gender: index%2 === 0 ? '男' : '女',
  }
})
</script>

::: details 查看源代码

```js
const columnHeaderBaseStyle = {
  flex: 1,
  "justify-content": "center",
};
const columnBaseStyle = {
  flex: 1,
  background: "#000",
  "text-align": "center",
  "justify-content": "center",
};
const columns1 = [
  {
    label: "姓名",
    prop: "name",
    headerStyle: {
      ...columnHeaderBaseStyle,
    },
    style: {
      ...columnBaseStyle,
    },
  },
  {
    label: "年龄",
    prop: "age",
    headerStyle: {
      ...columnHeaderBaseStyle,
    },
    style: {
      ...columnBaseStyle,
    },
  },
  {
    label: "性别",
    prop: "gender",
    headerStyle: {
      ...columnHeaderBaseStyle,
    },
    style: {
      ...columnBaseStyle,
      color: '#f12'
    },
    // 优先级最高
    operationText: '点击单元格',
    operateFn: (row) => {
      console.log(row)
    }
  },
];
const data1 = new Array(5).fill(undefined).map((_, index) => {
  return {
    name: `姓名_${index}`,
    age: `${index + 1}`,
    gender: index % 2 === 0 ? "男" : "女",
  };
});
```

:::

## 基本用法

直接使用, 传入 columns 和 data

```js{4}
<CustomTable :tableColumns="columns1" :tableData="data1" />
```

<CustomTable :tableColumns="columns1" :tableData="data1" />

## API

**Types**

```js{4}
type CustomTableColumn = {
  label: string;
  prop: string;
  width?: string;
  showOverflowTooltip?: boolean;
  headerStyle?: object;
  style?: object;
  operationText?: string;
  operateFn?: (row: any) => void;
}
```

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| title | 表格标题 | string | - |
| tableColumns | 表格列(必填) | CustomTableColumn[] | [] |
| tableData | 表格数据(必填) | any[] | [] |
| loading | 加载状态 | boolean | false |
| showRank | 根据排名添加颜色区分 | boolean | true |
