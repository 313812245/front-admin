<template>
  <el-select v-bind="$attrs">
    <el-option
      v-for="item in options"
      :key="item.value"
      v-bind="item"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
interface Props {
  options?: Table.Option[]
  valueEnum?: Table.EnumMap
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  valueEnum: undefined
})
const options = ref<Table.Option[]>([])

watch(() => props, (obj) => {
  if (Array.isArray(obj.options) && obj.options.length > 0) {
    options.value = obj.options
  } else if (obj.valueEnum) {
    const map = runFunction(obj.valueEnum)
    options.value = proFieldParsingValueEnumToArray(map)
  }
}, {
  immediate: true,
  deep: true
})

</script>

<script lang="ts">
export default {
  name: 'ProSelect'
}
</script>

<style scoped>

</style>
