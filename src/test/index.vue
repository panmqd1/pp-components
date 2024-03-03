<template>
  <BorderWrapper>
    <div class="grid_wrapper">
      <div>
        <div id="test1" c-red>{{ shallowReactiveState.a.c }}</div>
        <div id="test2" c-yellow>{{ shallowRefState.b }}</div>
        <el-button @click="handleUpdate">更新视图</el-button>
        <DateMonthPicker />
        <WeekMonthPicker />
        <EllipticTags
          :tags="tags"
          :maxTagCount="2"
          @change="handleTagsChange"
        />
        <FilePicker
          multiple
          draggable
          accept=".mp4"
          @change="handleFilesChange"
        />
        <FilePicker
          :splitOptions="{ enable: true }"
          @change="handleFilesChange"
        />
        <div v-for="(file, index) in pickedFiles" :key="index">
          <div v-if="(file as File).name">
            {{ getFileStr(file as File) }}
          </div>
          <div v-if="(file as ChunkType).hash">
            {{ getFileStr(file as ChunkType) }}
          </div>
        </div>
        <IconifyIconOnline
          icon="ant-design:fullscreen-exit-outlined"
          color="red"
          width="32px"
          height="32px"
        />
        <ChartEmpty width="400px" height="300px" />
        <Loading :loading="loading" />
        <el-button @click="setLoading">切换loading</el-button>
      </div>
      <div>
        <CollapsePanel
          mode="height"
          contentHeight="100px"
          :contentStyle="{ 'background-color': 'red' }"
        >
          asdasdasd
        </CollapsePanel>
      </div>
    </div>
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
  FilePicker,
  IconifyIconOnline,
  ChartEmpty,
  CollapsePanel,
  type TagType,
} from "../packages";
import { ChunkType } from "../utils/file";

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

const pickedFiles = ref<File[] | ChunkType[]>([]);
const handleFilesChange = (files: File[] | ChunkType[]) => {
  pickedFiles.value = files;
  console.log("[ pickedFiles.value ] >", pickedFiles.value);
};

const getFileStr = (file: File | ChunkType) => {
  if (file instanceof File) {
    return `${file.name}    ${(file.size / 1024 / 1024).toFixed(2)}MB    ${
      file.type
    }`;
  }
  return `${file.index}    ${file.hash}    ${(
    file.blob.size /
    1024 /
    1024
  ).toFixed(2)}MB`;
};

const loading = ref(false);
const setLoading = async () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 3000);
};
</script>

<style lang="scss" scoped>
.grid_wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 600px;
}

.collapse_panel {
  color: #fff;
}
</style>
