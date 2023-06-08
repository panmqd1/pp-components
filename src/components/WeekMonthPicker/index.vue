<template>
  <div class="week_month_picker">
    <span class="label">统计时间：</span>
    <el-radio-group v-model="dateMode" @change="handleDateModeChange">
      <el-radio label="week">周</el-radio>
      <el-radio label="month">月</el-radio>
    </el-radio-group>
    <div class="date_picker_wrapper">
      <el-config-provider :locale="locale">
        <el-date-picker
          v-model="dateValue"
          :type="dateModeType"
          :format="dateModeTypeFormat"
          placeholder="请选择"
          :clearable="false"
          :disabledDate="disabledDate"
        />
      </el-config-provider>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { dayjs } from "element-plus";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import 'dayjs/locale/zh-cn'
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
// TODO 周起始日没设置好
// dayjs["en"].weekStart = 1;
// dayjs.locale('zh-cn')

const locale = computed(() => {
  return zhCn
})

const props = defineProps({
  // 切换按日按月是否要重置已选的日期
  resetDate: {
    type: Boolean,
    default: true,
  },
});

const dateValue = ref("");

const dateMode = ref<"week" | "month">("week");
const dateModeType = computed(() => {
  return dateMode.value === "week" ? "week" : "month";
});
const dateModeTypeFormat = computed(() => {
  if (dateMode.value === "month") {
    return "YYYY-MM";
  }
  const start = dateValue.value;
  const end = dayjs(dateValue.value).add(6, "day");
  const weekOfYearStr = dayjs(start).format("YYYY第ww周");
  const rangeStr = `${dayjs(start).format("YYYY-MM-DD")}~${dayjs(end).format(
    "YYYY-MM-DD"
  )}`;
  return `${weekOfYearStr}（${rangeStr}）`;
});
/**
 * 
 * @param time 
 * 如果当日是周第一天和月第一天，不允许选择。如果不是，可以选择，只计算周第一天到当日前一日的数据，月第一天到当日前一日的数据。
 */
const disabledDate = (time: Date) => {
  // 本周一
  const currentMonday = dayjs().weekday(0).format('YYYY-MM-DD');
  // 本周日
  const currentSunday = dayjs().weekday(6).format('YYYY-MM-DD');
  // 上周日
  const lastSunday = dayjs(currentMonday).subtract(1, 'day').format('YYYY-MM-DD');
  // 本月一号
  const currentDay1 = dayjs().date(1).format('YYYY-MM-DD');
  // 上月最后一天
  const lastMonthLastDay = dayjs(currentDay1).subtract(1, 'day').format('YYYY-MM-DD');

  // 可以选择的最后一天
  let allowDate = ''
  // 按周
  if (dateMode.value === 'week' ) {
    // 如果今天是周一, 最多选择到上周日
    // 否则, 最多选择到本周日
    if (dayjs().isSame(currentMonday, 'day')) {
      allowDate = lastSunday
    } else {
      allowDate = currentSunday
    }
  } else if (dateMode.value === 'month') {
    // 如果今天是本月一号, 最多选择到上月
    // 否则, 最多选择到本月
    if (dayjs().isSame(currentDay1, 'day')) {
      allowDate = lastMonthLastDay
    } else {
      allowDate = dayjs().format('YYYY-MM-DD')
    }
  }
  // 本周一和本月一号及以后禁止选择
  const flag = dayjs(time).isAfter(dayjs(allowDate), dateMode.value);
  return flag
}
const handleDateModeChange = () => {
  if (props.resetDate) {
    dateValue.value = "";
  }
  if (dateMode.value === "week") {
    setDefaultWeek();
  } else if (dateMode.value === "month") {
    setDefaultMonth();
  }
};

const emits = defineEmits(["update:date", "update:dateMode", "change"]);

// 默认为上周
const setDefaultWeek = () => {
  dateValue.value = dayjs().weekday(-7).format("YYYY-MM-DD");
};
// 默认为本月
const setDefaultMonth = () => {
  dateValue.value = dayjs().subtract(1, 'month').format("YYYY-MM");
};
onMounted(() => {
  setDefaultWeek();
});
watch(
  () => dateMode.value,
  () => {
    emits("update:dateMode", dateMode.value);
  }
);
watch(
  () => dateValue.value,
  () => {
    // 返回当前值和开始值-结束值
    const format = dateMode.value === "week" ? "YYYY-MM-DD" : "YYYY-MM";
    const start = dayjs(dateValue.value).format(format);
    const end =
      dateMode.value === "week"
        ? dayjs(dateValue.value).add(6, "day").format(format)
        : "";
    const result = {
      dateMode: dateMode.value,
      value: start,
      start,
      end,
    };
    emits("change", result);
  }
);
</script>
<style lang="scss" scoped>
.week_month_picker {
  display: flex;
  align-items: center;
  width: 100%;
  color: rgba(255, 255, 255, 0.65);

  :deep(.el-radio-group) {
    --el-color-primary: #00adff;
    flex-shrink: 0;

    .el-radio {
      --el-radio-text-color: rgba(255, 255, 255, 0.65);
      margin-right: 22px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .date_picker_wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 24px;
    :deep(.el-date-editor) {
      flex: 1;
    }
  }
}
</style>
