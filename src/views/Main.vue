<template>
  <div class="main">
    <el-container>
      <!-- 头部 -->
      <el-header height='60px'>
        <MainHeader />
      </el-header>
      <el-container style='height:100%'>
        <!-- 左侧导航 -->
        <el-aside >
          <el-menu :unique-opened='true' :router='true' :default-openeds="defaultOpeneds" :default-active="defaultActive">

            <el-menu-item index='/user/list'>
              <i class="el-icon-document"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>

            <el-submenu index='movie'>
              <template slot="title">
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
                <i class="el-icon-star-off"></i>
                <span>影院管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index='/cinema/list'>影院列表</el-menu-item>
                <el-menu-item index='/cinema/add'>添加影院</el-menu-item>

                <el-submenu index='hall'>
                  <template slot="title">
                    <i class="el-icon-star-off"></i>
                    <span>影厅管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index='/hall/list'>影厅列表</el-menu-item>
                    <el-menu-item index='/hall/add'>添加影厅</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index='scene'>
                  <template slot="title">
                    <i class="el-icon-star-off"></i>
                    <span>场次管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index='/scene/list'>场次列表</el-menu-item>
                    <el-menu-item index='/scene/add'>添加场次</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index='/orders/list'>
              <i class="el-icon-view"></i>
              <!-- 订单详情 -->
              <span slot="title">订单列表</span>
            </el-menu-item>
 
            <el-submenu index='admin'>
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span>管理员</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index='/admin/list'>管理员列表</el-menu-item>
                <el-menu-item index='/admin'>管理员添加</el-menu-item>
                <el-menu-item index='/admin/reset'>密码修改</el-menu-item>
                <el-menu-item index='/mine'>我的</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>
        <!-- 右侧主体 -->
        <el-main >
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
      if (!sessionStorage.getItem('token')) {
        this.$router.push('/login')
      }
    },
    mounted() {

    },
    components: {
      MainHeader
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
<style lang="scss">
  .main {
    .el-container {
      .el-header {
        padding: 0;
      }

      .el-aside {
        padding-top: 20px;
        font-weight: bold;
        // background:#2e3f56;
        height:auto;
      }

      /*大屏幕*/
      @media screen and (min-width: 1200px) {
        .el-aside {
          width: 210px !important;
        }
      }
      /*平板电脑与小屏电脑之间的分辨率*/
      @media screen and (min-width: 768px) and (max-width:1200px) {
        .el-aside {
          width: 210px !important;
        }
      }
      /*横向放置的手机和竖向放置的平板之间的分辨率*/
      @media screen and (max-width:767px) {
        .el-aside {
          width: 150px !important;
        }
      }


      /*竖向放置的手机以及分别率*/
      @media screen and (max-width: 480px) {
        .el-aside {
          width: 120px !important;
        }
        .el-menu-item,
        .el-submenu__title span {
          font-size: 12px;

        }
      }
    }

  }
</style>