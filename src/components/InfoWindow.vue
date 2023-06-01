<template>
  <div id="stored" class="info_window" :class="{ show: infoWindowVisible }">
    <div class="info_title">
      <span>我是储能站名称</span>
      <span>查看更多</span>
    </div>
    <div class="info_content">
      <span class="content_item" v-for="(item, index) in 4" :key="index">
        <span class="label">装机容量：</span>
        <span class="value">
          <span>{{ xxx }}</span>
          <span class="unit">kWh</span>
        </span>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps({
  infoWindowVisible: {
    type: Boolean,
    default: false,
  },
});
const xxx = ref(121212);
</script>
