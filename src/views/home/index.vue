<template>
  <div class="home-wrap">
    <ProTable
      ref="tableRef"
      :columns="columns"
      :data="data"
      @nameClick="nameClick"
    >
      <template #searchLeft>
        <el-button type="success">新建</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
const instance = getCurrentInstance()!
const tableRef = ref<ComponentPublicInstance | null>()
const columns: Table.Column[] = [
  {
    type: 'selection',
    width: 55
  },
  {
    type: 'index',
    label: '序号',
    width: 80,
    hideInSearch: true
  },
  {
    name: 'name',
    label: '名称',
    clickEvent: 'nameClick',
    valueType: 'input'
  },
  {
    name: 'status',
    label: '状态',
    valueType: 'select',
    valueEnum: {
      1: '在线',
      2: '离线'
    }
  },
  {
    name: 'isOnlin',
    label: '是否在线',
    valueType: 'checkbox',
    valueEnum: {
      1: '在线',
      2: '离线'
    }
  }
]

const data = [
  {
    name: '测试1',
    status: 1
  },
  {
    name: '测试2',
    status: 2
  }
]
const nameClick = (item) => {
  console.log(item, tableRef, '=====nameClick');
}

const handleSelectionChange = (val) => {
  console.log(val,'=====handleSelectionChange');
}

onMounted(() => {
  setTimeout(() => {
    columns[4].valueEnum = {
      1: '在线',
      2: '离线',
      3: '测试'
    }
  }, 1000)
})
</script>

<style scoped lang="scss">

</style>