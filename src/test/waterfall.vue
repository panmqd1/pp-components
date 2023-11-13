<template>
  <div class="grid_container" :style="{ background: '#eee' }">
    <div
      class="item"
      :class="'item_' + item.id"
      v-for="item in items"
      :key="item.id"
      :style="item.style"
    >
      {{ item.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { randomColor } = PureUtils;
const items = ref(
  new Array(2000).fill(undefined).map((_, index) => {
    return {
      id: index,
      style: {
        width: "100%",
        height: ((Math.random() + 0.5) * 100).toFixed(0) + "px",
        "background-color": randomColor({ type: "hex" }),
      },
      value: `item__${index}`,
    };
  })
);
</script>

<style scoped lang="scss">
.grid_container {
  width: 100%;
  height: 100%;
  display: grid;
  row-gap: 10px;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  // grid-auto-flow: row dense;
  // grid-auto-rows: auto;
  justify-items: flex-start;
  align-items: flex-start;

  .item_0 {
    // grid-area: 1 / 1 / 3 / 3;
    grid-area: 2 / 2 / 4 / 4;
    // grid-row: 2 / 4;
    // grid-column: 2 / 4;
  }
}
</style>
