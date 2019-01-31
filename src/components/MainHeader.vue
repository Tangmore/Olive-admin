<template>
  <div class="o-main-header">
    <h4 class="o-title">{{$store.state.globalSettings.appName}}管理后台</h4>
    <div class="o-right">
      当前用户：{{$store.state.adminName}}
      <el-button size="mini" @click="quit" type='primary' plain>退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    quit(){
      //清除当前用户的登录信息
      this.$store.commit('setAdminName', '');
      //跳转回登录页
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
$header-height: 50px;
.o-main-header {
    margin-top: 20px;
    background: #f4f4f5;
    border-radius: 4px;
    line-height: $header-height;
    height: $header-height;
    padding: 0 6px;
    .o-title {
        color: #303133;
        float: left;
        margin: 0;
    }
    .o-right {
        float:right;
        padding-right:20px;
    }
}
</style>