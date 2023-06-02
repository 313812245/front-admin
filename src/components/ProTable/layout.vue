<template>
  <el-container v-if="isLayout">
    <slot name="header"></slot>
    <el-main>
      <slot name="main"></slot>
    </el-main>
    <el-footer>
      <slot name="footer"></slot>
    </el-footer>
  </el-container>
  <template v-else>
    <slot
      v-for="(value, name) in $slots"
      :name="name"
    ></slot>
  </template>
</template>

<script setup lang="ts">
interface Props {
  isLayout?: boolean
}
withDefaults(defineProps<Props>(), {
  isLayout: true
})
</script>
<script lang="ts">
export default {
  name: 'TableLayout'
}
</script>
<style lang="scss" scoped>

</style>
