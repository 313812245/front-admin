<template>
  <el-input v-bind="$attrs">
    <template v-for="(value, name) in inputSlots" #[name]="slotData">
      <slot
        :name="name"
        v-bind="slotData || {}"
      ></slot>
    </template>
  </el-input>
</template>

<script lang="ts">
export default {
  name: 'ProInput'
}
</script>
<script lang="ts" setup>
const slots = useSlots()
const inputSlots = computed(() => {
  const obj = {}
  Object.keys(slots)
    .filter(name => ['prefix', 'suffix', 'prepend', 'append'].includes(name))
    .map(name => slots[name])
  return obj
})
</script>
<style lang="scss" scoped>
  .el-input {
    min-width: 214px;
  }
</style>
