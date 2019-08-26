<template>
  <div id="app-menu">
   
        <el-menu :unique-opened='true' :router='true'
        :default-openeds="defaultOpeneds" 
        :default-active="defaultActive"
         mode="vertical"
          theme="dark" 
          class="el-menu-vertical-demo" style='height:100%'>
          <el-menu-item index='/user/list'>
            <div class="icon-line"></div>
            <i class="el-icon-location"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-submenu index='movie'>
            <template slot="title">
             <div class="icon-line"></div>
              <i class="el-icon-location"></i>
              <span>电影信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/movie/list'>电影列表</el-menu-item>
              <el-menu-item index='/movie/add'>添加电影</el-menu-item>
              <el-menu-item index='/movie/type'>电影类型</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index='cinema'>
            <template slot="title">
              <div class="icon-line"></div>  
              <i class="el-icon-location"></i>
              <span>影院管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/cinema/list'>影院列表</el-menu-item>
              <el-menu-item index='/cinema/add'>添加影院</el-menu-item>

              <el-submenu index='hall'>
                <template slot="title">
                  <div class="icon-line"></div>  
                  <i class="el-icon-location"></i>
                  <span>影厅管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index='/hall/list'>影厅列表</el-menu-item>
                  <el-menu-item index='/hall/add'>添加影厅</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index='scene'>
                <template slot="title">
                   <div class="icon-line"></div>  
                  <i class="el-icon-location"></i>
                  <span>场次管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index='/scene/list'>场次列表</el-menu-item>
                  <el-menu-item index='/scene/add'>添加场次</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index='admin'>
            <template slot="title">
               <div class="icon-line"></div>  
              <i class="el-icon-location"></i>
              <span>管理员</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/admin/list'>管理员列表</el-menu-item>
              <el-menu-item index='/admin'>管理员添加</el-menu-item>
              <el-menu-item index='/admin/reset'>密码修改</el-menu-item>
           
            </el-menu-item-group>
          </el-submenu>

         <el-menu-item index='/orders/list'>
            <div class="icon-line"></div>
            <i class="el-icon-location"></i>
   
            <span slot="title">订单列表</span>
          </el-menu-item>
        </el-menu> 



        
  </div>
</template>

<script>
export default {
  name: 'app-menu',
  props:{
    // parent:{type:Object,required:true},
      jump:{type:Function,required:true}
    },
  data() {
    return {
      //  leftMenu:[{fkParentId: 1, id: 1,menuName: "首页",routerComponent: "user",routerName: "list",routerPath: "/user/list"},
      //     {fkParentId: 1, id: 2,menuName: "电影管理",routerComponent: "movie",routerName: "",routerPath: ""},
      //     {fkParentId: 2, id: 3,menuName: "电影列表",routerComponent: "movie",routerName: "list",routerPath: "/user/list"},
      //     {fkParentId: 2, id: 4,menuName: "电影添加",routerComponent: "movie",routerName: "add",routerPath: "/user/add"},
      //     {fkParentId: 2, id: 5,menuName: "电影类型",routerComponent: "movie",routerName: "type",routerPath: "/user/type"}]
    }
  },
  computed: { 
            defaultOpeneds() {
        if (this.$route.path.indexOf('/user') == 0) {
          return ['user'];
        }
        if (this.$route.path.indexOf('/movie') == 0) {
          return ['movie'];
        }
        if (this.$route.path.indexOf('/type') == 0) {
          return ['type'];
        }
        if (this.$route.path.indexOf('/cinema') == 0) {
          return ['cinema'];
        }
        if (this.$route.path.indexOf('/comment') == 0) {
          return ['comment'];
        }
        if (this.$route.path.indexOf('/order') == 0) {
          return ['order'];
        }
        return [];
      },
      defaultActive() {
        return this.$route.path; //用户当前访问的页 当前项被激活
      }
        },
 }
</script>

<style>
 
</style>
