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
       this.axios.get( this.$store.state.globalSettings.apiUrl+'admin/loginOut')
            .then(res=>{
                console.log(res);
                if(res.status==200){
                  if(res.data.rtnCode==200){
                      this.$message({
                        message: '退出系统成功',
                        type: 'success',
                        duration:1000
                      })
                  }  
                  //清除当前用户的登录信息
                  this.$store.commit('signout', '');
                  //跳转回登录页
                  setTimeout(()=>{ this.$router.push('/login');},1600);
                }
            })
            .catch(err=>{
                console.log(err)
            })
    
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