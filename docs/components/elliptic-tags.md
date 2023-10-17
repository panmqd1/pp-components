# 缩略标签 EllipticTags

标签列表, 超过数量时, 省略标签

::: warning 注意
组件附带基础样式, 需要在element使用暗黑模式时达到最佳效果
:::

<script setup>
import {ref} from 'vue'

const tags = new Array(20).fill(undefined).map((_, index) => {
  return {
    label: `标签_${index}`,
    value: index,
  };
});

const tags2 = ref([...tags])
const handleTagClose = (tag) => {
  console.log('tag', tag)
}
const handleTagsChange = (newTags) => {
  tags2.value = [...newTags]
}
</script>

## 基本用法

直接使用, 组件宽度 100%, 高度 22px

```js
<EllipticTags :tags="tags" />

const tags: TagType[] = new Array(20).fill(undefined).map((_, index) => {
  return {
    label: `标签_${index}`,
    value: index,
  };
});
```

<EllipticTags :tags="tags" />

## 标签可删除

```js
<EllipticTags
:tags="tags2"
:maxTagCount="8"
:closable="true"
@tagClose="handleTagClose"
@change="handleTagsChange"
/>

const tags: TagType[] = new Array(20).fill(undefined).map((_, index) => {
  return {
    label: `标签_${index}`,
    value: index,
  };
});
const tags2 = ref<TagType[]>([...tags])
const handleTagClose = (tag: TagType) => {
  console.log('tag', tag)
}
const handleTagsChange = (newTags: TagType[]) => {
  tags2.value = [...newTags]
}
```

<EllipticTags
:tags="tags2"
:maxTagCount="8"
:closable="true"
@tagClose="handleTagClose"
@change="handleTagsChange"
/>

## API

**Types**

```js{4}
type TagType = {
  label: string;
  value: string | number;
  originData?: any;
}
```

**Props**
| 参数名 | 描述 | 类型 | 默认值 |
| ------------- | :-----------: | ----: | ---- |
| tags | 标签源数据 | TagType[] | [] |
| maxTagCount | 最多展示标签数量 | number | 4 |
| closable | 标签是否可删除 | boolean | false |

**Events**
| 事件名 | 描述 | 参数 |
| ------------- | :-----------: | ----: |
| tagClose | 关闭标签时触发 | tag: TagType |
| change | 组件标签数据改变时触发 | tags: TagType[] |
