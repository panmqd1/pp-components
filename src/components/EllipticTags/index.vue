<template>
  <div class="elliptic_tag">
    <span class="tag_wrapper">
      <el-tag
        v-for="tag in showTags"
        :key="tag.value"
        :closable="closable"
        type="info"
        @close="handleTagClose(tag)"
      >
        {{ tag.label }}
      </el-tag>
    </span>
    <el-tooltip placement="bottom" :teleported="false" effect="customized">
      <template #content>
        <div class="hidden_tags_wrapper">
          <div class="tag_container" v-for="tag in hiddenTags" :key="tag.value">
            <el-tag :closable="closable" type="info" @close="handleTagClose(tag)">
              {{ tag.label }}
            </el-tag>
          </div>
        </div>
      </template>
      <span v-show="ellipticNum > 0" class="elliptic_num"
        >+{{ ellipticNum }}</span
      >
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { TagType } from "./types";
const props = defineProps({
  tags: {
    type: Array<TagType>,
    default: () => {
      return [];
    },
  },
  maxTagCount: {
    type: Number,
    default: 4,
  },
  closable: {
    type: Boolean,
    default: true,
  }
});

const ellipticNum = computed(() => {
  return props.tags.length - showTags.value.length;
});
const showTags = computed(() => {
  if (props.tags.length <= props.maxTagCount) {
    return props.tags;
  }
  return props.tags.slice(0, props.maxTagCount);
});
const hiddenTags = computed(() => {
  if (props.tags.length <= props.maxTagCount) {
    return [];
  }
  return props.tags.slice(props.maxTagCount);
});

const emits = defineEmits(["change", "tagClose"]);
const handleTagClose = (tag: TagType) => {
  emits("tagClose", tag);
  const newTags = props.tags.filter((item) => item.value !== tag.value);
  emits("change", newTags);
};
</script>

<style lang="scss" scoped>
.elliptic_tag {
  display: flex;
  align-items: center;
  width: 100%;
  height: 22px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.65);
  line-height: 20px;

  .el-tag {
    height: 22px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.65);
  }

  .tag_wrapper {
    display: flex;

    .el-tag:not(:last-child) {
      margin-right: 4px;
    }
  }

  :deep(.el-popper) {
    &.is-customized {
      padding: 8px;
      background: #1f1f1f;
      box-shadow: 0px 5px 12px 4px rgba(0, 0, 0, 0.36),
        0px 3px 6px 0px rgba(0, 0, 0, 0.48),
        0px 1px 2px -2px rgba(0, 0, 0, 0.64);
      border-radius: 2px;

      .el-popper__arrow::before {
        background: #1f1f1f;
      }
    }
  }

  .elliptic_num {
    height: 22px;
    margin-left: 4px;
    padding: 0 8px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .hidden_tags_wrapper {
    .tag_container {
      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }
  }
}
</style>
