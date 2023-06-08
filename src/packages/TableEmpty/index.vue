<template>
  <div class="table_empty">
    <div class="img_container" :class="isWarning ? 'warning' : ''"></div>
    <div class="empty_text">{{ text }}</div>
  </div>
</template>
<script lang="ts">
export default {
  name: "TableEmpty",
};
</script>
<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: "暂无数据",
  },
  isWarning: {
    type: Boolean,
    default: false
  },
});
</script>
<style lang="scss" scoped>
.table_empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  line-height: 20px;

  .img_container {
    width: 100px;
    height: 80px;
    background-image: url("/@/assets/common/img_table_empty.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;

    &.warning {
      width: 60px;
      height: 60px;
      margin-bottom: 20px;
      background-image: url("/@/assets/common/img_warning_empty.png");
    }
  }
}
</style>
