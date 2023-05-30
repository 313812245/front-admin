<template>
  <el-input v-bind="$attrs">
    <template v-for="(value, name) in $slots" #[name]="slotData">
      <slot
        v-if="['empty', 'header', 'append']"
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

<style lang="scss" scoped>
  .el-input {
    min-width: 214px; /* 设置一个固定宽度 */
  }
</style>
