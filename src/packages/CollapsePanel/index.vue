<template>
  <div class="collapse_panel">
    <div class="title" :style="titleStyle" @click="handleTitleClick">
      <span class="title_content">{{ titleText }}</span>
      <IconifyIconOnline
        icon="ep:arrow-up"
        :class="{ collapsed: selfCollapsed }"
      />
    </div>
    <div class="content" :class="contentClass" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "CollapsePanel",
};
</script>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { IconifyIconOnline } from "../ReIcon";

export type ModeType = "scale" | "height" | "grid";
const props = defineProps({
  // 默认缩放方案，无需其他操作；
  // 定高方案必须传入一个展开后的固定高度;
  // grid方案不兼容safari
  mode: {
    type: String,
    // TODO
    // values: ["scale", "height", "grid"],
    values: ["scale", "height"],
    default: "scale",
  },
  contentHeight: {
    type: String,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  titleText: {
    type: String,
    default: "折叠标题",
  },
  titleStyle: {
    type: Object,
    default: () => {
      return {};
    },
  },
  contentStyle: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const contentClass = computed(() => {
  if (selfCollapsed.value) {
    return `collapsed mode_${props.mode}`;
  }
  return `mode_${props.mode}`;
});

const emits = defineEmits(["update:collapsed"]);

const selfCollapsed = ref(false);
watch(
  () => props.collapsed,
  (val) => {
    selfCollapsed.value = val;
  },
  {
    immediate: true,
  }
);
watch(
  () => selfCollapsed.value,
  (val) => {
    emits("update:collapsed", val);
  }
);
const handleTitleClick = () => {
  selfCollapsed.value = !selfCollapsed.value;
};

</script>
<style lang="scss" scoped>
.collapse_panel {
  --transition-duration: 0.2s;
  width: 100%;
  height: auto;
  overflow: hidden;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 32px;
    padding: 0 8px;
    line-height: 32px;
    cursor: pointer;

    .title_content {
      flex: 1;
      height: 100%;
    }

    .iconify {
      flex-shrink: 0;
      transition: all var(--transition-duration);
      &.collapsed {
        transform: rotate(180deg);
      }
    }
  }

  .content {
    width: 100%;
    transition: all var(--transition-duration);
  }

  .content.mode_scale {
    height: auto;
    transform: scaleY(1);
    transform-origin: 0 0;

    &.collapsed {
      transform: scaleY(0);
    }
  }

  .content.mode_height {
    height: v-bind(contentHeight);

    &.collapsed {
      height: 0;
    }
  }
}
</style>
