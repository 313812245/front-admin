<template>
  <el-container class="common-layout">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: 'LayoutIndex'
}
</script>
<style scoped>
  .common-layout{
    height: 100%;
  }
</style>
