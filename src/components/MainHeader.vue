<template>
  <div class="o-main-header">
    <h4 class="o-title">Olive电影管理系统</h4>
    <div class="o-right" style='color:#fff'>
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
    background: #2e3f56;
    line-height: $header-height;
    height: $header-height;
    padding: 0 8px;
    .o-title {
        color: #fff;
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