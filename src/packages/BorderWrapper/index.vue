<template>
  <div class="border-container">
    <div class="border-wrapper">
      <div class="border-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "BorderWrapper",
};
</script>
<script lang="ts" setup>
const props = defineProps({
  innerMinHeight: {
    type: String,
    default: 'calc(100vh - 146px)',
  },
  innerBackground: {
    type: String,
    default: '#232324',
  }
});
</script>
<style lang="scss" scoped>
.border-container {
  width: 100%;
  padding: 8px 13px 8px;
}

.border-wrapper {
  width: 100%;
  min-height: calc(100vh - 110px);
  border-image-repeat: repeat;
  border-image-slice: 140 180;
  border-image-source: url("/@/assets/common/page_bg.svg");
  border-style: solid;
  border-width: 140px 180px;

  .border-inner {
    position: relative;
    margin: -123px -163px -122px -163px;
    min-height: v-bind(innerMinHeight);
    background: v-bind(innerBackground);
  }
}
</style>
