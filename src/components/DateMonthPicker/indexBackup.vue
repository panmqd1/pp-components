<!-- NOTE 备份版本1, el-date-picker中, calendar-change事件仅在type为date和datetime时触发, 因此废弃这个版本 -->
<template>
  <div class="date_month_picker">
    <el-radio-group v-model="dateMode" @change="handleDateModeChange">
      <el-radio-button label="day">按日</el-radio-button>
      <el-radio-button label="month">按月</el-radio-button>
    </el-radio-group>
    <div class="date_picker_wrapper">
      <span class="label">选择日期：</span>
      <el-date-picker
        :key="datePickerKey"
        v-model="dateRange"
        :type="dateModeType"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        range-separator="→"
        :clearable="false"
        :editable="false"
        :disabledDate="disabledDateDay"
        @calendar-change="calendarChange"
        @visible-change="visibleChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import dayjs from "dayjs";
import { IDatePickerType } from "element-plus/es/components/date-picker/src/date-picker.type";

const props = defineProps({
  // 切换按日按月是否要重置已选的日期
  resetDate: {
    type: Boolean,
    default: true,
  },
  // 允许选择的结束日期
  allowEndDate: {
    type: Date,
    default: new Date(),
  },
});

const dateMode = ref("month");
const dateModeType = computed(() => {
  // !! TODO monthrange不触发calendarChange, 导致disabledDateDay不生效
  type ModeEnumType = {
    [key: string]: IDatePickerType,
  }
  const MODE_ENUM: ModeEnumType = {
    day: "daterange",
    // month: "monthrange",
    month: "daterange",
  };
  return MODE_ENUM[dateMode.value];
});
const handleDateModeChange = () => {
  if (props.resetDate) {
    dateRange.value = "";
  }
  if (dateMode.value === "day") {
    setDefaultDay();
  } else if (dateMode.value === "month") {
    setDefaultMonth();
  }
};

const emits = defineEmits(["update:date", "update:dateMode"]);
// TODO 类型
const dateRange = ref<string | any>("");

const setDefaultDay = () => {
  const last31Day = dayjs().subtract(31, "day").format("YYYY-MM-DD");
  const today = dayjs().format("YYYY-MM-DD");
  dateRange.value = [last31Day, today];
};
const setDefaultMonth = () => {
  const last12Month = dayjs().subtract(12, "month").format("YYYY-MM-DD");
  const today = dayjs().format("YYYY-MM-DD");
  dateRange.value = [last12Month, today];
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
    emits("update:date", dateRange.value);
  }
);

// 按日最多选择31天，按月最多选择12个月
const disabledDateDay = (time: Date) => {
  const [startDate, endDate] = getAllowRange();
  const startCondition = startDate
    ? time.getTime() < startDate.valueOf()
    : false;
  const endCondition = endDate ? time.getTime() > endDate.valueOf() : false;
  return startCondition || endCondition;
};

const calendarChangeValue = ref<any>([]);
const calendarChange = (val: any) => {
  calendarChangeValue.value = val;
};

const datePickerKey = ref(1);
const visibleChange = (val: boolean) => {
  if (!val) {
    calendarChangeValue.value = [];
    // 用于清除打开面板只选了一个值的情况
    datePickerKey.value++;
  }
};

const getAllowRange = () => {
  const allowEnd = dayjs(props.allowEndDate);
  let startDate;
  let endDate;
  const [left, right] = calendarChangeValue.value;
  // 如果选了开始日期, 按日结束日期最多选到31天后，按月最多选到12个月后, 不超过昨天
  // 如果选了结束日期, 按日开始日期最多选到31天前，按月最多选到12个月前
  if (left || right) {
    const start = left ? left : right;
    if (dateMode.value === "day") {
      startDate = dayjs(start).subtract(31, "day");
      endDate = dayjs(start).add(31, "day");
    } else {
      startDate = dayjs(start).subtract(12, "month");
      endDate = dayjs(start).add(12, "month");
    }
  } else {
    endDate = allowEnd;
  }
  // 如果结束日期在超过昨天，就取昨天
  if (endDate.valueOf() > allowEnd.valueOf()) {
    endDate = allowEnd;
  }
  return [startDate, endDate];
};
</script>
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
    margin-left: 10px;
  }
}
</style>
