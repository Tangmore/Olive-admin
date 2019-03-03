<template>
  <div class="main">
    <!-- 面包屑导航 -->
       <el-breadcrumb separator='/'>
          <el-breadcrumb-item :to="{path:'/main'}">首页</el-breadcrumb-item>
           <el-breadcrumb-item >全局设置</el-breadcrumb-item>          
       </el-breadcrumb>

    <el-card shadow='never'>
      <el-form label-width='130px' :label-position="labelPosition" >
         <el-form-item label="应用名称：">
          <el-input v-model="formData.appName"></el-input>
        </el-form-item>

        <el-form-item label="数据API地址：">
          <el-input v-model="formData.apiUrl"></el-input>
        </el-form-item>

        <el-form-item label="管理后台地址：">
          <el-input v-model="formData.adminUrl"></el-input>
        </el-form-item>

        <el-form-item label="客户App地址：">
          <el-input v-model="formData.appUrl"></el-input>
        </el-form-item>

        <el-form-item label="ICP备案号：">
          <el-input v-model="formData.icp"></el-input>
        </el-form-item>

        <el-form-item label="版权声明：">
          <el-input v-model="formData.copyright"></el-input>
        </el-form-item>
      </el-form>  
      <div style="text-align:center">
           <el-button type='primary' @click="doSubmit">提交</el-button>
           <el-button @click="doCancel" type='info' plain>取消</el-button>
      </div>
    </el-card>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return{
      labelPosition:'right',
      formData:{},
      newformData:{}
    }
  },
  methods: {
    doSubmit(){
       var url=this.$store.state.globalSettings.apiUrl+'/admin/settings';
       this.axios.put(url,this.formData)
       .then(res=>{
         if(res.data.code==200){
            this.$message.success('全局设置修改成功！');
            //修改$store中的设置？
            this.$store.state.globalSettings=this.formData;
         }else if(res.data.code){
            this.$message.error('未做任何修改！');
         }else{
            this.$message.error('全局设置修改失败！');
         }
       })
       .catch(err=>{
         console.log(err)
       })
    },
    doCancel(){
        this.formData=JSON.parse(JSON.stringify(this.newformData));   
    }
  },
  mounted() {
    //将全局配置赋值formData    
    this.formData=this.$store.state.globalSettings;
    this.newformData=JSON.parse(JSON.stringify(this.formData));
  },
}
</script>
<style lang="scss">
  .el-container{
    .el-breadcrumb{
       padding: 20px 0;
    }
  }
</style>