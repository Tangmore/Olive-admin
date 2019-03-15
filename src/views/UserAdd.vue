<template>
  <div class="main">
      <!-- 面包屑导航 -->
       <el-breadcrumb separator='/'>
          <el-breadcrumb-item :to="{path:'/main'}">用户</el-breadcrumb-item>
           <el-breadcrumb-item>用户列表</el-breadcrumb-item>          
           <el-breadcrumb-item >用户添加</el-breadcrumb-item>          
       </el-breadcrumb>
    
    <!-- 修改表单 -->
    <div class='editBox' style='width:80%;margin-top: 30px;'>
     <el-form :label-position="labelPosition" label-width="90px">
             <el-form-item  label="昵称：">
                   <el-input type="text" placeholder="请输入昵称" v-model="userInfo.name" ></el-input>
             </el-form-item>
             <el-form-item  label="密码">
                 <el-input type="text" placeholder="请输入密码" v-model="userInfo.password"></el-input>
             </el-form-item>
               <el-form-item label="手机号：">
                 <el-input type="text" placeholder="请输入手机号" v-model="userInfo.phone" ></el-input>
             </el-form-item>
             <el-form-item  label="爱好：">
                 <el-input type="textarea" 
                 :autosize="{minRows:3}" resize='none' v-model="userInfo.hobby" placeholder="请输入爱好..." ></el-input>
             </el-form-item>
        </el-form>
      </div>
        <div style="text-align:center">
           <el-button type='primary' @click="doSubmit">保存</el-button>
           <el-button @click="doCancel" type='info' plain>取消</el-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return{
      userInfo:{
        phone:'',
        password:'',  
        name:'',
        hobby:''
      },
      originUserInfo:{},
      labelPosition:'right'
    }
  },
  methods: {
  //确认添加
    doSubmit(){
       this.$confirm('确认添加该用户？','提示',{type:'warning'})
      .then(()=>{
           var url=this.$store.state.globalSettings.apiUrl+'user/add';
           this.axios.post(url,this.userInfo)
              .then(res=>{
                if(res.status==200){
                  if(res.data.rtnCode==200){
                    this.$message.success(res.data.msg);
                    this.userInfo={};
                  }
                }else{
                  this.$message.error('服务器内部错误！');
                }
                // console.log(res)
              })
              .catch(err=>{
                  this.$message.error('用户信息添加失败');
              })  
      }).catch(()=>{
        this.$message({
           type:'info',
           message:'已取消添加用户！'
        })
      })
    },
    doCancel(){
      this.userInfo={}
    }
  }
}
</script>
<style lang="scss" >
   

</style>