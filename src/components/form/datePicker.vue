<template>
  <el-date-picker v-bind="$attrs">
    <template v-for="(value, name) in dateSlots" #[name]="slotData">
      <slot
        :name="name"
        v-bind="slotData || {}"
      ></slot>
    </template>
  </el-date-picker>
</template>

<script lang="ts">
export default {
  name: 'ProDatePicker'
}
</script>

<script lang="ts" setup>
const slots = useSlots()
const dateSlots = computed(() => {
  const obj = {}
  Object.keys(slots)
    .filter(name => ['range-separator'].includes(name))
    .map(name => slots[name])
  return obj
})
</script>

<style lang="scss" scoped>

</style>
