<template>
  <Layout class="table-layout" :isLayout="isLayout">
    <template #header>
      <pro-search :columns="columns" @onSearch="onSearch">
        <template #buttonLeft>
          <slot name="buttonLeft"></slot>
        </template>
        <template #buttonRight>
          <slot name="buttonRight"></slot>
        </template>
      </pro-search>
    </template>
    <template #main>
      <el-table
        :data="tableData"
        max-height="100%"
        v-bind="$attrs"
        ref="table"
        style="width: 100%;"
        :border="true"
      >
        <template v-for="(value, name) in $slots" #[name]="slotData">
          <slot
            v-if="['empty', 'header', 'append'].includes(name)"
            :name="name"
            v-bind="slotData || {}"
          ></slot>
        </template>
        <template v-if="!('empty' in $slots)" v-slot:empty>
          <template v-if="isLoading">
            <span>
              <i class="el-icon-loading"></i>
              数据正在疯狂加载中...
            </span>
          </template>
          <template v-else>暂无数据</template>
        </template>
        <template
          v-for="(
            { name, prop, type, align = 'center', ...item }, index
          ) in columns"
        >
          <el-table-column
            v-if="['index', 'selection', 'expand'].includes(type)"
            :key="type"
            :align="align"
            :type="type"
            v-bind="item"
          />
          <el-table-column
            v-else
            :key="name || prop || index"
            :prop="name || prop"
            :align="align"
            v-bind="item"
          >
            <template v-slot="scope">
              <template v-if="type === 'slot'">
                <slot :name="name" :item="scope.row" :index="scope.$index"></slot>
              </template>
              <span
                v-else
                @click.stop="clickFun(item.clickEvent, scope.row)"
                :class="{ link: !!item.clickEvent }"
              >
                {{ renderText(scope.row, {name, prop, ...item}) }}
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </template>
    <template #footer>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="50"
        class="mt-4"
      />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './layout.vue'
import type { TableProps, ElTable } from 'element-plus'

interface Props<T = any> extends Partial<TableProps<T>> {
  columns?: Table.Column[],
  isLoading?: boolean
  isLayout?: boolean
}

withDefaults(defineProps<Props>(), {
  columns: () => [],
  isLoading: false,
  isLayout: true
})
const table = ref<InstanceType<typeof ElTable> | null>()
const tableData = ref([])

const clearSelection = () => {
  table.value?.clearSelection()
}

defineExpose({
  table,
  clearSelection
})

const emits = defineEmits<{(type, item): void }>()
const clickFun = (type, item) => {
  if (typeof type === 'function') {
    type(item)
  } else if (type) {
    emits(type, item)
  }
}

const onSearch = (obj) => {
  console.log(obj, '====ProTable-onSearch')
}

const renderText = (row, item) => {
  if (item.render && typeof item.render === 'function') {
    return item.render(row, item)
  }
  const valueMap = runFunction(item.valueEnum)
  const name = item.name || item.prop
  const value = getValue<string>(row, name) || ''
  return (valueMap ? valueMap[value] : value) || '-'
}
</script>

<script lang="ts">
export default {
  name: 'ProTable'
}
</script>

<style lang="scss" scoped>
.table-layout{
  width: 100%;
  height: 100%;
  :deep(.pro-search){
    padding: var(--el-main-padding);
    padding-bottom: 0;
  }
  :deep(.el-row){
    padding: 0 var(--el-main-padding);
  }
  :deep(.el-table){
    display: flex;
  }
  :deep(.el-table__inner-wrapper){
    flex: 1;
    height: auto !important;
  }
  :deep(.el-scrollbar__wrap){
    max-height: 100% !important;
  }
  .el-pagination{
    justify-content: flex-end;
  }

  .table-footer{
    border-top: solid 1px var(--el-menu-border-color);

    .el-pagination {
      justify-content: flex-end;
      height: 100%;
    }
  }
}
.link{
  cursor: pointer;
  color: var(--el-color-primary);
}
</style>
