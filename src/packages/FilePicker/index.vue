<template>
  <div class="file_picker">
    <input
      id="file_input"
      ref="fileInputRef"
      type="file"
      :multiple="multiple"
      :webkitdirectory="directory"
      :mozdirectory="directory"
      :odirectory="directory"
      @change="onFileInputChange"
    />
    <!-- 拖拽区域 -->
    <div
      v-if="draggable"
      class="drag_container"
      ref="dragContainerRef"
      @click="onPick"
      @drop="onDrop"
    >
      <div class="icon_plus">+</div>
      <div>点击或拖拽文件到此处上传</div>
    </div>
    <div v-else class="picker" @click="onPick">
      {{ directory ? "选择文件夹" : "选择文件" }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "FilePicker",
};
</script>
<script setup lang="ts">
import { ref, computed } from "vue";
import {
  type SplitOptionsType,
  type ChunkType,
  cutFile,
  getFileSuffix,
} from "/@/utils/file";

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  // 是否允许选择文件夹
  // NOTE 浏览器开启选择文件夹时，只能选择单文件夹，并且会递归获取所有子文件
  directory: {
    type: Boolean,
    default: false,
  },
  // 是否开启拖动文件来进行选择
  draggable: {
    type: Boolean,
    default: false,
  },
  // 可选择的文件类型, 默认""不做限制，可选后缀名作为限制，英文逗号分隔，如： .png,.jpg,.pdf,.mp4
  // NOTE 按照惯例应该传入与 input[type="file"] 的 accept 属性相同的值，但是懒得去额外实现了，所以采用后缀名
  accept: {
    type: String,
    default: "",
  },
  // 限制文件选择的数量，0表示不限制，超出限制后，只抓取 第1 至 第limit 的文件
  limit: {
    type: Number,
    default: 0,
  },
  // 大文件分片配置项
  splitOptions: {
    type: Object as PropType<SplitOptionsType>,
    default: () => {
      return {
        // NOTE 如果开启大文件分片，将只能选择单文件
        // 是否开启大文件分片
        enable: false,
        // NOTE 优先采用 chunkSize，默认每一片 20M，如果值为 0，将按照数量分片，如果数量也为 0，按照每片 20M 分片
        // 每一个分片的大小
        chunkSize: 20 * 1024 * 1024,
        // NOTE 如需按照数量分片，将 chunkSize 的值设为 0
        // 一共分几片
        chunkCount: 0,
      };
    },
  },
});

// props.directory === true && 不开启文件分片
const directory = computed(() => {
  return props.directory && !props.splitOptions?.enable;
});

// props.multiple === true && 不开启文件分片 && directory.value === false
const multiple = computed(() => {
  return (
    props.multiple && !props.splitOptions?.enable && directory.value === false
  );
});

const emits = defineEmits(["change"]);

const fileInputRef = ref<HTMLInputElement>();
const dragContainerRef = ref<HTMLDivElement>();

const onPick = () => {
  fileInputRef.value?.click();
};

const afterFilesPicked = async (
  files: File[]
): Promise<File[] | ChunkType[]> => {
  const result: File[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // 数量限制
    if (props.limit !== 0 && i >= props.limit) {
      break;
    }
    // 文件格式限制
    const suffix = getFileSuffix(file.name);
    if (props.accept !== "" && !props.accept.includes(suffix)) {
      continue;
    }
    result.push(file);
  }

  // 大文件切片
  if (props.splitOptions.enable) {
    return await cutFile(result[0], props.splitOptions);
  }

  return result;
};

const onFileInputChange = async () => {
  const files = [];
  const fileList = fileInputRef.value?.files || [];
  for (let i = 0; i < fileList.length; i++) {
    files.push(fileList[i]);
  }

  emits("change", await afterFilesPicked(files));
  // 完成后清除 input 的内容
  fileInputRef.value!.value = "";
};

// 从文件Entry中获取文件
const getFileFromFileSystemFileEntry = (
  entry: FileSystemFileEntry
): Promise<File> => {
  return new Promise((resolve, reject) => {
    entry.file((file) => {
      resolve(file);
    });
  });
};

// 从文件夹Entry中获取文件Entry列表
const getEntriesFromFileSystemDirectoryEntry = (
  entry: FileSystemDirectoryEntry
): Promise<FileSystemEntry[]> => {
  return new Promise((resolve, reject) => {
    const reader = entry.createReader();
    reader.readEntries((entries) => {
      resolve(entries);
    });
  });
};

// 从 Entries 中，递归获取所有file，打平返回
const getFilesFromEntries = async (
  entries: FileSystemEntry[]
): Promise<File[]> => {
  const result: File[] = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // 如果是文件，entry是 FileSystemFileEntry 类型
    if (entry?.isFile) {
      const file = await getFileFromFileSystemFileEntry(
        entry as FileSystemFileEntry
      );
      result.push(file);
    }
    // 如果是文件夹，entry是 FileSystemDirectoryEntry 类型
    if (entry?.isDirectory) {
      const subEntries = await getEntriesFromFileSystemDirectoryEntry(
        entry as FileSystemDirectoryEntry
      );
      const subFiles = await getFilesFromEntries(subEntries);
      result.push(...subFiles);
    }
  }

  return result;
};

const onDrop = async (e: DragEvent) => {
  e.preventDefault();
  const items = e.dataTransfer?.items || [];

  // 不允许选择文件夹 && 允许多选，提前判断并提示
  if (!multiple.value && items.length > 1) {
    console.log("[ 只能选取单个文件 ] >", 1111);
    return;
  }

  let entries: FileSystemEntry[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const entry = item.webkitGetAsEntry();

    // NOTE 与浏览器文件选择行为保持一致
    // directory === false 时，不允许选择文件夹
    if (!directory.value && entry?.isFile) {
      entries.push(entry as FileSystemEntry);
    }
    // directory === true 时，只能选择单文件夹
    if (directory.value && entry?.isDirectory) {
      entries = [entry];
      break;
    }
  }
  const files = await getFilesFromEntries(entries);

  emits("change", await afterFilesPicked(files));
};
</script>

<style lang="scss" scoped>
.file_picker {
  display: flex;
  #file_input {
    display: none;
  }
  .drag_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    background-color: rgba(247, 248, 250);
    border: 1px dashed rgba(229, 230, 235);
    color: rgba(29, 33, 41);
    transition: all 0.2s ease;
    user-select: none;
    cursor: pointer;
    &:hover {
      background-color: rgba(229, 230, 235);
      border-color: rgba(201, 205, 212);
    }
    .icon_plus {
      font-size: 150%;
    }
  }

  .picker {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border: 1px solid rgba(201, 205, 212);
    cursor: pointer;
    user-select: none;
  }
}
</style>
