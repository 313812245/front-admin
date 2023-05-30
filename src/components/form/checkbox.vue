<template>
  <el-checkbox-group v-bind="$attrs">
    <el-checkbox
      v-for="{label, value, ...item} in options"
      :key="value"
      :label="value"
      v-bind="item"
    >{{ label }}</el-checkbox>
  </el-checkbox-group>
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
  name: 'ProCheckbox'
}
</script>
