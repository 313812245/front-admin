<template>
  <el-container class="common-layout">
    <el-header class="layout-header">
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer class="layout-footer">Footer</el-footer>
      </el-container>
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
<style scoped>
  .common-layout{
    height: 100%;
  }
  .layout-header{
    width: 100%;
    padding: 0;
  }
  .layout-footer{
    border-top: solid 1px var(--el-menu-border-color)
  }
</style>
