<template>
  <el-form class="pro-search" :model="formInline" inline>
    <template v-for="{ name, prop, label, valueType, clearable = true, ...item }, index in list" :key="name || prop">
      <el-form-item class="search-item" :label="label" v-if="valueType && !isMore ? index < 4 : true">
        <component
          v-bind="item"
          :is="item.component"
          v-model="formInline[name || prop]"
          :clearable="clearable"
        ></component>
      </el-form-item>
    </template>
    <el-form-item class="search-item" v-if="list.length > 4">
      <el-button @click="arrowChange" type="primary" link>{{moreMap[isMore]}} <el-icon><i-ep-ArrowDown /></el-icon></el-button>
    </el-form-item>
  </el-form>
  <el-row justify="space-between">
    <div>
      <slot name="buttonLeft"></slot>
    </div>
    <div>
      <slot name="buttonRight"></slot>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="onReset">重置</el-button>
    </div>
  </el-row>
</template>

<script setup lang="ts">
interface Props {
  columns?: Table.Column[]
  beforeSearchSubmit?: (obj: Record<string, any>) => Record<string, any>
}

const emits = defineEmits(['onSearch'])
const props = withDefaults(defineProps<Props>(), {
  columns: () => []
})
const list: any = ref([])
const isMore = ref(false)
const moreMap = {
  true: '收起',
  false: '展开'
}

const formInline = ref<Record<string, any>>({})

watch(() => props.columns, (columns) => {
  const obj = {}
  columns.forEach(item => {
    if (item.hideInSearch || !item.valueType || !(item.name || item.prop)) {
      return
    }
    const name = item.name || item.prop || ''
    // 默认值处理
    const defaultMap = {
      checkbox: []
    }
    obj[name] = defaultMap[item.valueType] || ''
    list.value.push({
      component: getCurrentComponent(item.valueType),
      ...item
    })
  })
  formInline.value = obj
}, {
  deep: true,
  immediate: true
})

function getCurrentComponent (valueType) {
  return shallowRef(defineAsyncComponent(
    () => import(`@/components/form/${valueType}.vue`)
  ))
}

const onSubmit = () => {
  if (props.beforeSearchSubmit && typeof props.beforeSearchSubmit === 'function') {
    formInline.value = props.beforeSearchSubmit(formInline.value)
  }
  emits('onSearch', formInline.value)
}

const onReset = () => {
  resetObject(formInline.value)
  onSubmit()
}

const arrowChange = () => {
  isMore.value = !isMore.value
}
</script>
<script lang="ts">
export default {
  name: 'ProSearch'
}
</script>
<style lang="scss" scoped>
  .link{
    cursor: pointer;
    color: var(--el-color-primary);
  }
  .el-row {
    // margin-bottom: 10px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .search-item{
    min-width: 254px;
  }
</style>
