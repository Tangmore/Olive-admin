<template>
  <div>
    <div class="max-menu-bar">
      <el-menu :default-active="active" class="el-menu-demo" mode="horizontal">
        <el-menu-item v-for="(item,index) in showMenu" :index="item.id.toString()" :key="index" @click="handleClick(item.id)">{{item.menuName}}</el-menu-item>
        <el-dropdown @command='menuChange' style="margin-top: 24px;" v-if="hideMenu.length!=0">
          <span class="el-dropdown-link">
            <i class="el-icon-more-outline"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in hideMenu" :index="item.id" :key="index" :command='item.id'>{{item.menuName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </div>

    <nav class="min-menu-bar nav">
      <el-dropdown @command='menuChange'>
        <span class="el-dropdown-link" style='font-size:18px;'>
          更多操作
          <i class="el-icon-menu"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in topMenu" :index="item.id" :key="index" :command='item.id'>{{item.menuName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showMenu: [{ id: '1', menuName: 'A' }, { id: '2', menuName: 'B' }, { id: '3', menuName: 'C' }, { id: '4', menuName: 'D' }],
        hideMenu: [{ id: '5', menuName: 'E' }, { id: '6', menuName: 'F' }],
        topMenu: [{ id: '1', menuName: 'A' }, { id: '2', menuName: 'B' }, { id: '3', menuName: 'C' }, { id: '4', menuName: 'D' }, { id: '5', menuName: 'E' }, { id: '6', menuName: 'F' }],
        active: '1'
      }
    },
    methods: {
      handleClick(id) {
        this.active = id;
      },
      menuChange(command) {
        this.active = command;
      }

    }
  }
</script>

<style lang="scss">
  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #666;
  }

  .min-menu-bar {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    .max-menu-bar {
      display: none;
    }
    .min-menu-bar {
      display: block;
    }
  }
</style>