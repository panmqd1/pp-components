<template>
  <div id="test" class="c-red">{{ shallowReactiveState.a.c }}</div>
  <div id="test" class="c-yellow">{{ shallowRefState.b }}</div>
  <el-button @click="handleUpdate">更新视图</el-button>
  <WeekMonthPicker />
</template>

<script setup lang="ts">
import { shallowRef, shallowReactive, triggerRef } from "vue";
import { useDark } from "@vueuse/core";
import { WeekMonthPicker } from "../packages";
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

const shallowReactiveState = shallowReactive({
  a: {
    c: 111,
  },
  b: 23333,
});
const shallowRefState = shallowRef({
  a: 222,
  b: 23444,
});

const handleUpdate = () => {
  // shallowReactiveState.b = 888;
  // 不触发响应式更新, 但是如果dom更新了, 会连带更新这个
  shallowRefState.value.b = 999;
  // 同上
  shallowReactiveState.a.c = 888;

  // 手动强制更新shallowRef, 仅限于shallowRef
  triggerRef(shallowRefState);
};
</script>

<style lang="scss" scoped></style>
