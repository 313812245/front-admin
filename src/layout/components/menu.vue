<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><i-ep-plus /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><i-ep-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><i-ep-document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><i-ep-setting /></el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: 'LayoutMenu'
}
</script>

<style scoped>
  .el-menu{
    height: 100%;
  }
</style>
