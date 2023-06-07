<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div id="circle"></div>
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>

</style>
