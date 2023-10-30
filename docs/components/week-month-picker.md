# 日期月份切换选择 WeekMonthPicker

选择一周或一个月, 周是周一 ~ 周日
如果当日是周第一天和月第一天，不允许选择。如果不是，可以选择，只计算周第一天到当日前一日的数据，月第一天到当日前一日的数据。
默认选择上周

<script setup>
import {ref} from 'vue'

const date2 = ref([])
const dateMode2 = ref('month')
</script>

## 基本用法

v-model, 但不接受外部直接传值

```js
<WeekMonthPicker v-model:date="date2" v-model:dateMode="dateMode2" />
```

<div>当前模式: {{ dateMode2 }}</div>
<div>当前值: {{ date2 }}</div>
<WeekMonthPicker v-model:date="date2" v-model:dateMode="dateMode2" :showLabel="false" />

## API

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| date (v-model) | 选择的时间 | [string, string] | [dayjs().weekday(-7).format("YYYY-MM-DD"), dayjs().weekday(-1).format("YYYY-MM-DD")] |
| dateMode (v-model) | 选择的模式 | string | week |
| showLabel | 是否显示"统计时间" | boolean | true |
