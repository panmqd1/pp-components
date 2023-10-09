<template>
  <div class="date_month_picker">
    <el-radio-group v-model="dateMode" @change="handleDateModeChange">
      <el-radio-button label="day">按日</el-radio-button>
      <el-radio-button label="month">按月</el-radio-button>
    </el-radio-group>
    <div class="date_picker_wrapper">
      <span v-if="showLabel" class="label">选择日期：</span>
      <a-range-picker
        v-model="dateRange"
        :mode="dateModeType"
        value-format="YYYY-MM-DD"
        separator="→"
        :placeholder="['开始日期', '结束日期']"
        :allow-clear="false"
        :disabled-input="true"
        :disabledDate="disabledDate"
        @select="onSelect"
        @popup-visible-change="onPopupVisibleChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "DateMonthPicker",
};
</script>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { RangePicker as ARangePicker } from '@arco-design/web-vue';
import dayjs, { Dayjs } from "dayjs";
import '@arco-design/web-vue/es/date-picker/style/css.js';

type RangeType = [string, string] | [string] | [];

const props = defineProps({
  showLabel: {
    type: Boolean,
    default: true,
  },
  // 切换按日按月是否要重置已选的日期
  resetDate: {
    type: Boolean,
    default: true,
  },
  // 允许选择的结束日期
  allowEndDate: {
    type: Dayjs,
    default: dayjs().subtract(1, "day"),
  },
});

const dateMode = ref<"day" | "month">("month");
const dateModeType = computed(() => {
  return dateMode.value === "day" ? "date" : "month";
});
const handleDateModeChange = () => {
  if (props.resetDate) {
    dateRange.value = [] as any;
  }
  if (dateMode.value === "day") {
    setDefaultDay();
  } else if (dateMode.value === "month") {
    setDefaultMonth();
  }
};

const emits = defineEmits(["update:date", "update:dateMode"]);
const dateRange = ref<RangeType>();

const setDefaultDay = () => {
  const start = dayjs(props.allowEndDate)
    .subtract(30, "day")
    .format("YYYY-MM-DD");
  const end = dayjs(props.allowEndDate).format("YYYY-MM-DD");
  dateRange.value = [start, end];
};
const setDefaultMonth = () => {
  const start = dayjs(props.allowEndDate)
    .subtract(11, "month")
    .format("YYYY-MM-DD");
  const end = dayjs(props.allowEndDate).format("YYYY-MM-DD");
  dateRange.value = [start, end];
};
onMounted(() => {
  setDefaultMonth();
});
watch(
  () => dateMode.value,
  () => {
    emits("update:dateMode", dateMode.value);
  }
);
watch(
  () => dateRange.value,
  () => {
    console.log("[ dateRange.value ] >", dateRange.value);
    emits("update:date", dateRange.value);
  }
);

// 按日最多选择31天，按月最多选择12个月
// 03-01 ~ 03-31, 2022-05 ~ 2023-04
const disabledDate = (current: Date) => {
  const type = dateMode.value;
  const afterAllowEndDate = dayjs(current).isAfter(
    dayjs(props.allowEndDate),
    type
  );
  if (!calendarRange.value?.length) {
    return afterAllowEndDate;
  }
  let start = calendarRange.value?.[0];
  let end = calendarRange.value?.[1];
  if (calendarRange.value.length === 1) {
    end = start;
  }
  const diffNum = dateMode.value === "day" ? 30 : 11;
  const tooLate = start && dayjs(current).diff(dayjs(start), type) > diffNum;
  const tooEarly = end && dayjs(end).diff(current, type) > diffNum;
  return afterAllowEndDate || tooEarly || tooLate;
};

const calendarRange = ref<RangeType>();

// 选中日期发生改变但组件值未改变
const onSelect = (val: RangeType) => {
  console.log("[ val ] >", val);
  calendarRange.value = val;
};

// 打开或关闭弹出框
const onPopupVisibleChange = (open: boolean) => {
  // 打开时清空
  if (!open) {
    calendarRange.value = [] as any;
  }
};
</script>
<style lang="scss">
.arco-picker-range-panel-wrapper {
  --primary-6: 0, 173, 255;
  --color-primary-light-1: rgba(var(--primary-7), 0.1);

  .arco-panel-month-inner {
    .arco-picker-header {
      .arco-picker-header-icon {
        &:nth-child(2),
        &:nth-child(4) {
          visibility: hidden;

          svg {
            display: none;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.date_month_picker {
  display: flex;
  align-items: center;

  :deep(.el-radio-group) {
    --el-color-primary: #00adff;

    .el-radio-button__inner {
      width: 80px;
    }
  }

  .date_picker_wrapper {
    display: flex;
    align-items: center;
    margin-left: 16px;

    :deep(.arco-picker-range) {
      --dark-font-color: rgba(255, 255, 255, 0.25);
      --color-text-2: var(--dark-font-color);
      --color-text-3: var(--dark-font-color);
      width: 240px;
      background: rgba(74, 144, 226, 0.16);
      border: 1px solid rgba(0, 173, 255, 0.5);

      &.arco-picker-focused {
        border-color: #40a9ff;
      }
    }
  }
}
</style>
