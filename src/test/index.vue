<template>
  <div id="test" class="c-yellow">234</div>
  <WeekMonthPicker />
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { WeekMonthPicker } from '../packages';
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
</script>

<style lang="scss" scoped></style>
