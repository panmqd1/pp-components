<template>
  <BorderWrapper>
    <div id="test1" c-red>{{ shallowReactiveState.a.c }}</div>
    <div id="test2" c-yellow>{{ shallowRefState.b }}</div>
    <el-button @click="handleUpdate">更新视图</el-button>
    <DateMonthPicker />
    <WeekMonthPicker />
    <EllipticTags :tags="tags" :maxTagCount="2" @change="handleTagsChange" />
    <IconifyIconOnline
      icon="ant-design:fullscreen-exit-outlined"
      color="red"
      width="32px"
      height="32px"
    />
    <ChartEmpty width="400px" height="300px" />
    <Loading :loading="loading" />
    <el-button @click="setLoading">切换loading</el-button>
  </BorderWrapper>
</template>

<script setup lang="ts">
import { shallowRef, shallowReactive, triggerRef, ref } from "vue";
import { useDark } from "@vueuse/core";
import {
  BorderWrapper,
  Loading,
  DateMonthPicker,
  WeekMonthPicker,
  EllipticTags,
  IconifyIconOnline,
  ChartEmpty,
  type TagType,
} from "../packages";

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

const tags = ref<TagType[]>([
  {
    label: "tag1",
    value: "tag1",
  },
  {
    label: "tag2",
    value: "tag2",
  },
  {
    label: "tag3",
    value: "tag3",
  },
  {
    label: "tag4",
    value: "tag4",
  },
  {
    label: "tag5",
    value: "tag5",
  },
]);

const handleTagsChange = (newTags: TagType[]) => {
  tags.value = newTags;
};

const loading = ref(false);
const setLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 3000);
};
</script>

<style lang="scss" scoped></style>
