<template>
  <el-container class="common-layout">
    <el-aside width="200px">
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="common-header">
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from './components/menu.vue'
import Header from './components/header.vue'

</script>
<script lang="ts">
export default {
  name: 'LayoutIndex'
}
</script>
<style lang="scss" scoped>
  .common-layout{
    height: 100%;

    .el-main{
      padding: 0;
    }
    .common-header{
      width: 100%;
      padding: 0;
      border-bottom: solid 1px var(--el-menu-border-color)
    }
  }
</style>
