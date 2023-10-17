# 日期月份切换选择 DateMonthPicker

::: danger 重要!
截至2.4.0, el-date-picker中, calendar-change事件仅在type为date和datetime时触发, 因此使用arco-design实现
:::

::: warning 注意
组件附带基础样式, 需要在element和arco同时使用暗黑模式时达到最佳效果
:::
选择一段时间, 可以按日期或按月份选择

<script setup>
import {ref} from 'vue'
import { useDark } from "@vueuse/core";
import dayjs from 'dayjs'
// element-plus设置暗黑模式
useDark({
  initialValue: "dark",
});
// arco-design设置暗黑模式
useDark({
  selector: "body",
  attribute: "arco-theme",
  initialValue: "dark",
});

const date2 = ref([])
const dateMode2 = ref('month')
</script>

## 基本用法

直接使用, 按日默认选择最近 31 天(不包含今天), 选择范围 1-31 天; 按月默认选择最近 12 月(包含本月), 选择范围 1-12 月

```js{4}
<DateMonthPicker />
```

<DateMonthPicker />

## 隐藏文字, 限制选择结束时间

v-model, 但不接受外部直接传值

```js{4}
<DateMonthPicker :showLabel="false" allowEndDate="2022-10-01" />
```
<div>当前模式: {{ dateMode2 }}</div>
<div>当前值: {{ date2 }}</div>
<DateMonthPicker v-model:date="date2" v-model:dateMode="dateMode2" :showLabel="false" allowEndDate="2022-10-01" />

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| date (v-model) | 选择的时间 | [string, string] | [dayjs(allowEndDate).subtract(11, "month").format('YYYY-MM-DD'), dayjs(allowEndDate).format('YYYY-MM-DD')] |
| dateMode (v-model) | 选择的模式 | string | month |
| showLabel | 是否显示"选择日期" | boolean | true |
| allowEndDate | 允许选择的结束日期 | Dayjs / string | dayjs().subtract(1, "day") |
