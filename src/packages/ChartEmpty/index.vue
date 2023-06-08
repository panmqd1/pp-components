<template>
  <div class="chart_empty" :style="{ width, height }">
    <div class="img_container"></div>
    <div class="empty_text">{{ text }}</div>
  </div>
</template>
<script lang="ts">
export default {
  name: "ChartEmpty",
};
</script>
<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: "暂无数据",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  imgWidth: {
    type: String,
    default: "80px",
  },
  imgHeight: {
    type: String,
    default: "80px",
  },
});
</script>
<style lang="scss" scoped>
.chart_empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  line-height: 20px;

  .img_container {
    width: v-bind(imgWidth);
    height: v-bind(imgHeight);
    background-image: url("/@/assets/common/img_chart_empty.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
