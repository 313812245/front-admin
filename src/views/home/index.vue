<template>
  <div class="home-wrap layout">
    <ProTable
      ref="tableRef"
      :columns="columns"
      :data="data"
      @nameClick="nameClick"
    >
      <template #buttonLeft>
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
    name: 'test1',
    label: '测试1',
    valueType: 'datePicker',
    hideInTable: true
  },
  // {
  //   name: 'test2',
  //   label: '测试测试2',
  //   valueType: 'input'
  // },
  // {
  //   name: 'test3',
  //   label: '测试3',
  //   valueType: 'input'
  // },
  // {
  //   name: 'test4',
  //   label: '测试4',
  //   valueType: 'input'
  // },
  {
    name: 'status',
    label: '状态',
    valueType: 'select',
    defaultValue: '1',
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

const data = Array.from({
  length: 20
}).fill({
  name: '测试1',
  status: 1
})
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