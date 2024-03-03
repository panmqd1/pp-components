# 文件选择器 FilePicker

选择单文件/多文件/大文件

<script setup>
import { ref } from 'vue'

const pickedFiles1 = ref([])
const handleFilesChange1 = (files) => {
  pickedFiles1.value = files;
  console.log(files)
}
const pickedFiles2 = ref([])
const handleFilesChange2 = (files) => {
  pickedFiles2.value = files;
  console.log(files)
}
const pickedFiles3 = ref([])
const handleFilesChange3 = (files) => {
  pickedFiles3.value = files;
  console.log(files)
}
const pickedFiles4 = ref([])
const handleFilesChange4 = (files) => {
  pickedFiles4.value = files;
  console.log(files)
}

</script>

## 基本用法

选择单文件或多文件

```js
<script setup>
import { ref } from 'vue'

const pickedFiles1 = ref([])
const handleFilesChange1 = (files) => {
  pickedFiles1.value = files;
}

</script>
<FilePicker
  multiple
  @change="handleFilesChange1"
/>

<div v-for="(file, index) in pickedFiles1" :key="index">
  {{ file.name }}    {{ (file.size / 1024 / 1024).toFixed(2) }}MB    {{ file.type }}
</div>
```

<FilePicker
multiple
@change="handleFilesChange1"
/>

<div v-for="(file, index) in pickedFiles1" :key="index">
  {{ file.name }}    {{ (file.size / 1024 / 1024).toFixed(2) }}MB    {{ file.type }}
</div>

## 拖拽选择，文件夹选择

拖拽选择文件夹，开启文件夹选择时不支持多选

```js
<script setup>
import { ref } from 'vue'

const pickedFiles2 = ref([])
const handleFilesChange2 = (files) => {
  pickedFiles2.value = files;
}

</script>
<FilePicker
  draggable
  directory
  @change="handleFilesChange2"
/>

<div v-for="(file, index) in pickedFiles2" :key="index">
  {{ file.name }}    {{ (file.size / 1024 / 1024).toFixed(2) }}MB    {{ file.type }}
</div>
```

<FilePicker
draggable
directory
@change="handleFilesChange2"
/>

<div v-for="(file, index) in pickedFiles2" :key="index">
  {{ file.name }}    {{ (file.size / 1024 / 1024).toFixed(2) }}MB    {{ file.type }}
</div>

## 对文件的数量和格式进行限制

限制数量时，会返回前 X 个文件；限制格式时，会过滤不符合条件的文件

```js
<script setup>
import { ref } from 'vue'

const pickedFiles3 = ref([])
const handleFilesChange3 = (files) => {
  pickedFiles3.value = files;
}

</script>
<FilePicker
  multiple
  :limit="2"
  accept=".mp4"
  @change="handleFilesChange3"
/>

<div v-for="(file, index) in pickedFiles3" :key="index">
  {{ file.name }}    {{ (file.size / 1024 / 1024).toFixed(2) }}MB    {{ file.type }}
</div>
```

<FilePicker
multiple
:limit="2"
accept=".mp4"
@change="handleFilesChange3"
/>

<div v-for="(file, index) in pickedFiles3" :key="index">
  {{ file.name }}    {{ (file.size / 1024 / 1024).toFixed(2) }}MB    {{ file.type }}
</div>

## 大文件选择及切片

可以选择单个大文件，根据参数返回切片，开启大文件选择时，不支持多选和选择文件夹

```js
<script setup>
import { ref } from 'vue'

const pickedFiles4 = ref([])
const handleFilesChange4 = (files) => {
  pickedFiles4.value = files;
}

</script>
<FilePicker
  :splitOptions="{ enable: true, chunkSize: 1048576 }"
  @change="handleFilesChange4"
/>

<div v-for="(chunk, index) in pickedFiles4" :key="chunk.hash">
  <div>{{ chunk.index }}    {{ chunk.hash }}    {{ ((chunk.blob.size) / 1024 / 1024).toFixed(2) }}MB</div>
</div>
```

<FilePicker
:splitOptions="{ enable: true, chunkSize: 1048576 }"
@change="handleFilesChange4"
/>

<div v-for="(chunk, index) in pickedFiles4" :key="chunk.hash">
  <div>{{ chunk.index }}    {{ chunk.hash }}    {{ ((chunk.blob.size) / 1024 / 1024).toFixed(2) }}MB</div>
</div>

## API

**Types**

```js{4}
type SplitOptionsType = {
  // 是否开启大文件分片
  enable: boolean;
  // 每一个分片的大小，值为 0 时无效，优先级高于 chunkCount，默认20MB
  chunkSize?: number;
  // 一共分几片，值为 0 时无效
  chunkCount?: number;
}
```

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| multiple | 是否支持多选 | boolean | false |
| directory | 是否支持选择文件夹 | boolean | false |
| draggable | 是否支持拖拽选择 | boolean | false |
| accept | 可选择的文件类型 | string | '' |
| limit | 文件数量限制 | number | 0 |
| splitOptions | 大文件分片选项 | SplitOptionsType | { enable: false, chunkSize: 20971520, chunkCount: 0 } |

**Slots**
| 插槽名 | 描述 | 参数 |
| ------------- | :-----------: | ----: |
| default | 默认插槽 | - |
