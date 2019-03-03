<template>
  <div class="login">
    <el-card class="o-login-card">
         <div slot="header">管理员登录</div>
         <div>
           <el-form :label-position="labelPosition" label-width="90px">
             <el-form-item label="管理员名：">
               <el-input placeholder="请输入管理员名" v-model="formData.username"></el-input>
             </el-form-item>
                <el-form-item label="密码：">
               <el-input type="password" placeholder="请输入密码" v-model="formData.password"></el-input>
             </el-form-item>
           
           </el-form>  
           <div style='text-align:center'>
               <el-button type="primary" @click="doLogin" >登录</el-button>
               <el-button @click="doCancel">取消</el-button>
            </div>
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
        username:"",
        password:""
      }
    }
  },
  methods:{
    doLogin(){
      let formData={
        "username":this.formData.username,
        "password":this.formData.password
      }
       this.axios.post( this.$store.state.globalSettings.apiUrl+'admin/login/',formData)
            .then(res=>{
                if(!this.formData.username || !this.formData.password){
                    this.$message({
                      message: '用户名和密码不能为空',
                      type: 'warning'
                    });
                    return;
                }
                console.log(res);
                if(res.status==200){
                  if(res.data.rtnCode==200){
                      this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration:1000
                      });
                    this.$store.commit('signin',this.formData.username); 

                    setTimeout(()=>{ this.$router.push('/main')},1600);
                  }else{
                    this.$message.error('用户名或密码有误！');
                  }
                }
            })
            .catch(err=>{
                console.log(err)
            })
    },
    //取消则清除用户输的内容
    doCancel(){
      this.formData.username='';
      this.formData.password='';
    },
    //回车键登录
    enterLogin(){
       document.onkeydown=e=>{
          let _key=window.event.keyCode;
          if(_key===13){
            this.doLogin()
          }
        }
    }

},
created() {
  this.enterLogin();
},
}
</script>
<style lang="scss">
.login{
  background:url(../assets/bg.jpg) center no-repeat;
  height:100%;
  background:cover;
  position:relative;
   .o-login-card{
   width: 460px;
   height:300px;
   position:absolute;
   top:0;
   left:0;
   bottom:0;
   right:0;
   margin:auto;
   background:rgba(0,0,0,.2) !important;
   border:none;
   .el-card__header{
      text-align: center;
      color:#fff;
    }
    .el-form-item__label{
      color:#fff;
    }
    .el-input__inner{
      background-color:transparent;
      color:#fff;
    }
 }

 /*大屏幕*/
@media screen and (min-width: 1200px) {
  .o-login-card{
    width: 450px;
    height:270px;
   }
}
/*平板电脑与小屏电脑之间的分辨率*/
@media screen and (min-width: 768px) and (max-width:979px) {
   .o-login-card{
      width: 400px;
      height:270px;
   }
}
/*横向放置的手机和竖向放置的平板之间的分辨率*/
@media screen and (max-width:767px) {
    .o-login-card{
      width: 360px;
      height:260px;
   }
}

/*竖向放置的手机以及分别率*/
@media screen and (max-width: 480px) {
   .o-login-card{
      width: 300px;
      height:260px;
   }
}
 
}
</style>
