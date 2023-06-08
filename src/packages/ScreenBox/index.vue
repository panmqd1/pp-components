<template>
  <div class="screen_wrapper_background" ref="screenWrapperBackground">
    <div class="screen_wrapper" ref="screenWrapper">
      <div class="screen_content" ref="screenContent">
        <el-icon
          v-if="!isFullscreenOutside && !isFullscreenControlled"
          class="btn_fullscreen"
          :size="designFontSize"
          color="#FFFFFF"
          @click="toggle"
        >
          <FullScreen />
        </el-icon>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "ScreenBox",
};
</script>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  useElementSize,
  useResizeObserver,
  useThrottleFn,
  useFullscreen,
} from "@vueuse/core";
import { FullScreen } from "@element-plus/icons-vue";

const props = defineProps({
  // 设计图尺寸 宽度
  designWidth: {
    type: Number,
    default: 1920,
  },
  // 设计图尺寸 高度
  designHeight: {
    type: Number,
    default: 1080,
  },
  // 设计图尺寸 字体
  designFontSize: {
    type: String,
    default: "14px",
  },
  // 是否外部控制全屏
  isFullscreenOutside: {
    type: Boolean,
    default: false,
  },
  isFullscreenControlled: {
    type: Boolean,
    default: false,
  },
});

// 宽度是高度的几倍
const widthRatio = computed(() => {
  return +(props.designWidth / props.designHeight).toFixed(4);
});
// 高度是宽度的几倍
const heightRatio = computed(() => {
  return +(props.designHeight / props.designWidth).toFixed(4);
});

const emit = defineEmits(["update:isFullscreenControlled"]);

const screenWrapperBackground = ref<HTMLElement>();
const screenWrapper = ref<HTMLElement>();
const screenContent = ref<HTMLElement>();
const { width: wrapperBackgroundWidth, height: wrapperBackgroundHeight } =
  useElementSize(screenWrapperBackground);
const { toggle, enter, exit, isFullscreen } = useFullscreen(
  screenWrapperBackground
);
watch(
  () => props.isFullscreenControlled,
  () => {
    if (props.isFullscreenControlled) {
      enter();
    } else {
      exit();
    }
  }
);

// esc f11控制时, 将状态推送出去
watch(
  () => isFullscreen.value,
  () => {
    emit("update:isFullscreenControlled", isFullscreen.value);
  }
);

// 计算缩放比例
const setWidthAndScale = () => {
  const baseWidth = props.designWidth;
  const baseHeight = props.designHeight;

  const widthScale = wrapperBackgroundWidth.value / baseWidth;
  const heightScale = wrapperBackgroundHeight.value / baseHeight;

  const scale = widthScale > heightScale ? heightScale : widthScale;

  let topWidth = "";
  let topHeight = "";
  if (widthScale > heightScale) {
    topHeight = `${wrapperBackgroundHeight.value}px`;
    // 高度的px值 * widthRatio
    topWidth = `${wrapperBackgroundHeight.value * widthRatio.value}px`;
  } else {
    // 宽度的px值 * heightRatio
    topHeight = `${wrapperBackgroundWidth.value * heightRatio.value}px`;
    topWidth = `${wrapperBackgroundWidth.value}px`;
  }

  if (screenContent.value) {
    screenContent.value.style["width"] = `${baseWidth}px`;
    screenContent.value.style["height"] = `${baseHeight}px`;
    screenContent.value.style["transform"] = `scale(${scale})`;
    screenContent.value.style["-webkit-transform"] = `scale(${scale})`;
  }
  if (screenWrapper.value) {
    screenWrapper.value.style.width = topWidth;
    screenWrapper.value.style.height = topHeight;
  }
};

useResizeObserver(
  screenWrapperBackground,
  useThrottleFn(() => {
    setWidthAndScale();
  }, 100)
);
</script>
<style lang="scss">
.f_ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<style lang="scss" scoped>
.screen_wrapper_background {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0 !important;
  background-color: #1c2023;
  display: flex;
  align-items: center;
  justify-content: center;

  .screen_wrapper {
    background-color: #1c2023;
    position: relative;
    z-index: 1;
    overflow: hidden;

    .screen_content {
      position: relative;
      transform: scale(1);
      transform-origin: 0px 0px;
      font-size: v-bind(designFontSize);
      color: #ffffff;

      .btn_fullscreen {
        position: absolute;
        right: v-bind(designFontSize);
        top: v-bind(designFontSize);
        width: v-bind(designFontSize);
        height: v-bind(designFontSize);
        font-size: v-bind(designFontSize);
        cursor: pointer;
        z-index: 9999;
      }
    }
  }
}
</style>
