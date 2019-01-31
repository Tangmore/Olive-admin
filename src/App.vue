<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
   mounted(){
       this.axios.get(this.$store.state.globalSettings.apiUrl+'/admin/settings')
       .then(res=>{
           console.log(res)
           this.$store.commit('setGlobalSettings',res.data)
       }) 
       .catch(err=>{
           console.log(err)
       })
   }
}
</script>
<style lang="scss">
    #app{
      color:#303133;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    //   background-color: #3E4D64;
    }
</style>
