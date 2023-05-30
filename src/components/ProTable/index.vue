<template>
  <pro-search :columns="columns" @onSubmit="onSearch">
    <template #buttonLeft>
      <slot name="buttonLeft"></slot>
    </template>
    <template #buttonRight>
      <slot name="buttonRight"></slot>
    </template>
  </pro-search>
  <el-table
    :data="tableData"
    v-bind="$attrs"
    ref="table"
    style="width: 100%"
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
          <span
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

<script setup lang="ts">
import type { TableProps, ElTable } from 'element-plus'

interface Props<T = any> extends Partial<TableProps<T>> {
  columns?: Table.Column[],
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  columns: () => [],
  isLoading: false
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

const emit = defineEmits<{(type, item): void }>()
const clickFun = (type, item) => {
  if (typeof type === 'function') {
    type(item)
  } else if (type) {
    emit(type, item)
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
  const value = row[item.name || item.prop]
  return (valueMap ? valueMap[value] : value) || '-'
}
</script>

<script lang="ts">
export default {
  name: 'ProTable'
}
</script>

<style lang="scss" scoped>
  .link{
    cursor: pointer;
    color: var(--el-color-primary);
  }
</style>
