<template>
  <div class="custom_table">
    <div v-if="title" class="table_title">{{ title }}</div>
    <div class="table_content">
      <div class="table_header">
        <span
          class="table_header_cell"
          :class="'header-' + item.prop"
          v-for="(item, index) in tableColumns"
          :key="index"
          :style="{ width: item.width }"
        >
          <span class="f_ellipsis">{{ item.label }}</span>
        </span>
      </div>
      <div class="table_body" v-if="tableData && tableData.length > 0">
        <el-scrollbar>
          <div
            class="table_row_item"
            :class="`rank_${index + 1}`"
            v-for="(row, index) in tableData"
            :key="index"
          >
            <span
              class="table_row_cell"
              :class="'row-' + item.prop"
              v-for="(item, index) in tableColumns"
              :key="index"
              :style="{ width: item.width, ...item.style }"
            >
              <span class="cell f_ellipsis" :class="item.prop">
                <span
                  v-if="item.operationText"
                  @click="item.operateFn?.(row)"
                  >{{ item.operationText }}</span
                >
                <component
                  v-else
                  :is="item.showOverflowTooltip ? 'el-tooltip' : 'span'"
                  placement="top"
                >
                  <template #content>{{ row[item.prop] }}</template>
                  {{ row[item.prop] }}
                </component>
              </span>
            </span>
          </div>
        </el-scrollbar>
      </div>
      <TableEmpty v-if="isShowTableEmpty" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CustomTable",
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import { CustomTableColumn } from "./types";
import TableEmpty from "/@/components/TableEmpty/index.vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  tableColumns: {
    type: Array<CustomTableColumn>,
    default: () => {
      return [];
    },
    required: true,
  },
  tableData: {
    type: Array<any>,
    default: () => {
      return [];
    },
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

// 是否显示table空状态
const isShowTableEmpty = computed(() => {
  // !加载中 && 无数据
  return !props.loading && !props.tableData?.length;
});
</script>

<style lang="scss" scoped>
.custom_table {
  width: 100%;
  height: 100%;

  .table_title {
    width: 100%;
    height: 22px;
    margin-top: 16px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    line-height: 22px;
  }

  .table_content {
    width: 100%;
    height: calc(100% - 16px - 22px - 12px);
    margin-top: 12px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 48px;

    .table_header {
      display: flex;
      align-items: center;
      height: 48px;
      background: rgba(99, 99, 99, 0.17);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.8);

      .table_header_cell {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        // justify-content: center;
        // text-align: center;
        &.header-rank {
          justify-content: center;
          text-align: center;
        }
      }
    }

    .table_body {
      height: calc(100% - 48px);

      .table_row_item {
        display: flex;
        align-items: center;
        height: 48px;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-top: none;

        .table_row_cell {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          // justify-content: center;
          // text-align: center;
          &.row-rank {
            justify-content: center;
            text-align: center;
          }

          .cell.rank {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: #4f4f4f;
          }

          .cell.operation {
            color: #4a90e2;
            cursor: pointer;
            user-select: none;
          }
        }

        &.rank_1 {
          background: rgba(166, 29, 36, 0.15);

          .cell.rank {
            background: #a61d24;
          }
        }

        &.rank_2 {
          background: rgba(233, 73, 75, 0.15);

          .cell.rank {
            background: #e9494b;
          }
        }

        &.rank_3 {
          background: rgba(216, 150, 20, 0.15);

          .cell.rank {
            background: #d89614;
          }
        }
      }
    }
  }
}
</style>
