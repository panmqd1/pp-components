<!-- TODO 做成函数式调用 -->
<template>
  <div
    class="loading_wrapper"
    v-loading.body.fullscreen.lock="loading"
    element-loading-svg-view-box="0 0 1024 1024"
    element-loading-spinner="<path d='M204.8 204.8m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z' fill='#EBF2FC' p-id='2553'/>
          <path d='M819.2 204.8m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z' 
          fill='#B5D2F3' p-id='2554'/>
          <path d='M819.2 819.2m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z' fill='#7FB0EA' p-id='2555'/>
          <path d='M204.8 819.2m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z' 
          fill='#4A90E2' p-id='2556'/>"
    element-loading-background="rgba(0, 0, 0, 0.4)"
  ></div>
</template>
<script lang="ts">
export default {
  name: "Loading",
};
</script>
<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
