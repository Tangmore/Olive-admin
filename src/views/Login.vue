<template>
  <div class="login">
    <el-card class="o-login-card">
         <div slot="header">管理员登录</div>
         <div>
           <el-form :label-position="labelPosition" label-width="90px">
             <el-form-item label="管理员名：">
               <el-input placeholder="请输入管理员名" v-model="formData.aname"></el-input>
             </el-form-item>
                <el-form-item label="密码：">
               <el-input type="password" placeholder="请输入密码" v-model="formData.apwd"></el-input>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="doLogin">登录</el-button>
               <el-button @click="doCancel">取消</el-button>
             </el-form-item>
           </el-form>
         </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return{
      //label向右对齐
      labelPosition:'right',
      //表单数据
      formData:{
        aname:'admin',
        apwd:'123456'
      }
    }
  },
  methods:{
    doLogin(){
       this.axios.get(this.$store.state.globalSettings.apiUrl+'/admin/login/'+this.formData.aname+'/'+this.formData.apwd)
            .then(res=>{
                if(res.data.code==200){
                    // console.log(res.data.msg)
                    this.$router.push('/main');
                    this.$store.commit('setAdminName',this.formData.aname)
                }else{
                   this.$alert('用户名或密码有误！',{type:'error'});
                }
            })
            .catch(err=>{
                console.log(err)
            })
    },
    doCancel(){
      this.formData.aname='';
      this.formData.apwd='';
    }

}
}
</script>
<style lang="scss">
 .o-login-card{
   width: 460px;
   margin: 150px auto;
   .el-card__header{
      text-align: center;
    }
 }

</style>
