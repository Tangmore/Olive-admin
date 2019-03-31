<template>
  <div class="o-main-header">
    <h4 class="o-title">Olive电影管理系统</h4>
    <div class="o-right">
      {{$store.state.adminName}}
      <span @click="quit">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    quit(){
      sessionStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
$header-height: 58px;
.o-main-header {
    background: rgba(0,0,0,.2);
    line-height: $header-height;
    height: $header-height;
    padding: 0 6px;
    .o-title {
        color: #303133;
        float: left;
        font-size:20px;
        margin-left:14px;
    }
    .o-right {
        float:right;
        padding-right:20px;
    }
}
</style>