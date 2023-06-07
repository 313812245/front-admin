<template>
  <el-menu class="el-menu-vertical-demo" background-color="#242328" text-color="#fff" active-text-color="#ffd04b" router default-active="0-0">
    <template v-for="(item, key) in menuList" :key="key">
      <el-menu-item v-if="item.childs.length === 0" :index="String(key)">{{ item.name }}</el-menu-item>
      <el-sub-menu v-else :index="String(key)">
        <template v-slot:title>{{ item.name }}</template>
        <el-menu-item v-for="(sub, index) in item.childs" :key="index"
          :route="{ path: sub.url, query: Object.assign({}, sub.query) }"
          :index='`${key}-${index}`'>{{ sub.name }}</el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
const menuList = ref([
  {
    name: '系统管理',
    childs: [
      {
        name: '菜单设置',
        url: '/'
      },
      {
        name: '测试菜单1',
        url: '/'
      },
      {
        name: '菜单设置测试的懂法守法水电费沙发斯蒂芬',
        url: '/'
      }
    ]
  },
  {
    name: '用户管理',
    childs: [
      {
        name: '菜单设置',
        url: '/'
      },
      {
        name: '测试菜单1',
        url: '/'
      },
      {
        name: '测试菜单2',
        url: '/'
      }
    ]
  },
  {
    name: '用户管理3',
    childs: [
      {
        name: '菜单设置',
        url: '/'
      },
      {
        name: '测试菜单1',
        url: '/'
      },
      {
        name: '测试菜单2',
        url: '/'
      }
    ]
  },
  {
    name: '用户管理4',
    childs: [
      {
        name: '菜单设置',
        url: '/'
      },
      {
        name: '测试菜单1',
        url: '/'
      },
      {
        name: '测试菜单2',
        url: '/'
      }
    ]
  },
  {
    name: '用户管理4',
    childs: [
      {
        name: '菜单设置测试的懂法守法水电费',
        url: '/'
      },
      {
        name: '测试菜单1',
        url: '/'
      },
      {
        name: '测试菜单2',
        url: '/'
      }
    ]
  }
])
</script>
<script lang="ts">
export default {
  name: 'LayoutMenu'
}
</script>

<style lang="scss">
.el-menu {
  height: 100%;
}

.el-menu {
  border-right: 0;

  .el-sub-menu {
    border-bottom: 1px solid #4A4A4A;

    &.is-active>.el-sub-menu__title {
      &::before {
        position: absolute;
        content: '';
        top: 10px;
        bottom: 10px;
        left: 0;
        border-left: 4px solid #52BE80;
      }
    }

    .el-sub-menu__title {
      position: relative;
      padding-left: 15px !important;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 12px;

      &:hover {
        background-color: #48576a;
      }

    }
  }

  .el-sub-menu .el-menu {
    background-color: initial;

    .el-menu-item {
      padding: 0 !important;
      margin-left: 15px;
      color: #B5B3B4;
      font-size: 12px;
      min-width: 82px;
      display: inline-block;
      height: 25px;
      line-height: 25px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: text-top;
      max-width: -webkit-fill-available;

      &:last-child {
        margin-bottom: 10px;
      }

      &:hover {
        color: #d0d0d0;
        background-color: transparent;
      }

      &:active,
      &:focus {
        outline: none;
        border: none;
        background-color: transparent;
      }
    }

    .el-menu-item.is-active {
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
