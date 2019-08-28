<template>
    <div id="index">
        <el-container>
            <el-aside width="">
                <el-menu :router='true' mode="vertical" :collapse="isCollapse" class="el-menu-vertical">
                    <el-row class='logo'>
                        <!-- <img  src=" @/images/logo.png"
                            style="vertical-align:middle" /> -->
                        <span style="margin:0 80px;"> 管理系统 </span>
                    </el-row>
                    <el-row>
                        <index-menu :jump="jump"></index-menu>
                    </el-row>
                </el-menu>
            </el-aside>
            <el-container style="min-width:400px;">
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
    export default {
        name: "index",
        components: {
            MainHeader,
            IndexMenu
        },
        data() {
            return {
                topMenu: [],
                leftMenu: [],
                active: {},
                isCollapse: false,
                isActive: false,
                tabIndex: "",
                isId: '导航一',
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
                setTimeout(() => {
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
                this.$router.push("/login");
            },

        },

    };
</script>
<style>
    @import "../assets/scss/index.css";
   
</style>