<template>
    <div id="index">
        <el-container>
            <el-aside width="">
                <el-menu :default-active="isId" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-row class='logo'>
                        <!-- <img  src=" @/images/logo.png"
                            style="vertical-align:middle" /> -->
                        <span style="vertical-align:middle"> 管理系统 </span>
                    </el-row>
                    <el-row>
                        <!-- <index-menu :left-menu="leftMenu" :parent="active" ></index-menu> -->
                        <index-menu  :jump="jump"></index-menu>
                        <!-- <el-aside > -->
                          <!-- <el-menu :unique-opened='true' :router='true'
                          :default-openeds="defaultOpeneds" 
                          :default-active="defaultActive"
                           mode="vertical"
                            theme="dark" 
                            class="el-menu-vertical-demo" style='height:100%'>
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
                             
                              </el-menu-item-group>
                            </el-submenu>
                
                          </el-menu> -->
                        <!-- </el-aside> -->
                    </el-row>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height="65px" style="position: relative;">
                    <div style="float:left">
                        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;position: absolute;display:block">
                            <div :class="isActive?'hide':'show'" class="icon iconfont menu-expand" @click="siderCollapsed()">&#xe62c;</div>
                            <div :class="isActive?'show':'hide'" class="icon iconfont menu-expand" @click="siderCollapsed()">&#xe712;</div>
                            <el-radio-button id="open" :label="false" style="display:none"></el-radio-button>
                            <el-radio-button id="close" :label="true" style="display:none"></el-radio-button>
                        </el-radio-group>
                        <!-- <MainHeader :topMenu="topMenu" :active="active"  style="margin-left: 105px;"></MainHeader> -->
                    </div>
                    <div style="line-height: 65px;position: absolute;right: 0;background-color: #fff">
                        <el-dropdown @command='menuChange'>
                            <span class="el-dropdown-link">
                                <span @mouseover='isadvanced=true' @mouseleave='isadvanced=false'>管理员小爱</span>
                                <i v-if='isadvanced' class="el-icon-arrow-up el-icon--right"></i>
                                <i v-if='!isadvanced' class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='0'>个人中心</el-dropdown-item>
                                <el-dropdown-item command='1'>安全中心</el-dropdown-item>
                                <el-dropdown-item command='2'>登录记录</el-dropdown-item>
                                <el-dropdown-item divided command='3'>主题设置</el-dropdown-item>
                                <el-dropdown-item command='4'>系统设置</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span class="exit" @click="closewindow">
                            <i class="icon iconfont menu-exit" else @click="closewindow">&#xe64b;</i>
                            退出
                        </span>
                    </div>
                </el-header>
            
                <el-main class="mainback">
                    <transition name="fade">
                        <!-- <keep-alive :include="keepAlive"> -->
                            <router-view style="background:#fff;"></router-view>
                        <!-- </keep-alive> -->
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import MainHeader from "../components/MainHeader";
    import IndexMenu from "../components/IndexMenu";
    import store from "@/store";
    import { mapState } from "vuex";
    // import { adaptiveHeight } from '../js/common/common.js';
    export default {
        name: "index",
        components: {
            MainHeader,
            IndexMenu
        },
        data() {
            return {
                topMenu:[],
               leftMenu:[],
                active: {},
                isCollapse: false,
                isActive: false,
                tabIndex: "",
                isId:'导航一',
                // 菜单样式切换
                isadvanced: false,

                // 系统设置
                sysSettings_arr: [],
                logourl: this.$store.state.imgurl,
                // 主题色
                themeColor: '',
                
            };
        },
        mounted() {
    
        },
        computed: {
            // ...mapState(["User"]),
            // ...mapState(["token"]),
            // ...mapState(["keepAlive"]),
        },
  
        methods: {
            // 管理员下拉菜单切换
            menuChange(command) {
                // this.$router.push('/PersonalCenter?ind=' + command);
            },
            init() {
                var index = layer.load(1, {
                    shade: [0.1, "#fff"] //0.1透明度的白色背景
                });
                setTimeout(()=>{
                  layer.close(index);   
                })
            },
            jump: function (menu) {
                console.log("跳转:" + menu.routerName);

            },
            siderCollapsed() {
                if (this.isActive) {
                    this.isActive = false;
                    $("#open").click();
                } else {
                    this.isActive = true;
                    $(".el-menu span").css("display", "none");
                    $("#close").click();
                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //退出
            closewindow: function (event) {
                this.$router.push("/");
                // this.$store.state.currentTabValue = 'Login';
            },

        },

    };
</script>
<style>
    @import "../assets/scss/index.css";
    /* @import "../assets/scss/common.css"; */
    /* @import "../assets/scss/table.css"; */
</style>