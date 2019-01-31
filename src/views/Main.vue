<template>
  <div class="main">
    <el-container>
      <el-aside width='200px'>
        <el-menu 
        :unique-opened='true' 
        :router='true'
        :default-openeds="defaultOpeneds"  
        :default-active="defaultActive">
          <el-menu-item index='/settings'>
            <i class="el-icon-setting"></i>
            <span slot="title">全局设置</span>
          </el-menu-item>

          <el-submenu index='table'>
            <template slot="title">
              <i class="el-icon-time"></i>
              <span>桌台设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/table/list'>所有桌台</el-menu-item>
              <el-menu-item index='/table/add'>添加桌台</el-menu-item>
              <el-menu-item index='/table/delete'>删除桌台</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index='/category/list'>
            <i class="el-icon-message"></i>
            <span slot="title">菜品类别</span>
          </el-menu-item>

          <el-submenu index='dish'>
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>菜品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/dish/list'>所有菜品</el-menu-item>
              <el-menu-item index='/dish/add'>添加菜品</el-menu-item>
              <el-menu-item index='/dish/delete'>删除菜品</el-menu-item>
              <el-menu-item index='/dish/update'>修改菜品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index='/orderList'>
            <i class="el-icon-bell"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
          <el-menu-item index='/security'>
            <i class="el-icon-goods"></i>
            <span slot="title">安全管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header height='60px'>
          <MainHeader />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
  import MainHeader from '../components/MainHeader.vue'
  export default {
    methods: {

    },
    beforeCreate() {
      if (!this.$store.state.adminName) {
        this.$router.push('/login')
      }
    },
    mounted() {

    },
    components: {
      MainHeader
    },
    computed: {
      defaultOpeneds(){
        if(this.$route.path.indexOf('/table')==0){
             return ['table'];
        }
        if(this.$route.path.indexOf('/dish')==0){
             return ['dish'];
        }
        return [];
      },
      defaultActive(){
         return this.$route.path; //用户当前访问的页 当前项被激活
      }
    },
  }
</script>
<style lang="scss">
   .el-container{
     .el-aside{
       padding-top: 20px;
       font-weight: bold;
      //  background-color: #3E4D64;
     }
   }
</style>