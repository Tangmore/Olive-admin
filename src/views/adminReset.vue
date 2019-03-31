<template>
  <div class="main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">管理员</el-breadcrumb-item>
      <el-breadcrumb-item>密码修改</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 修改表单 -->
    <div class='editBox' style='width:70%;margin:30px auto;'>
      <el-form  label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码：" prop="name">
          <el-input type='text' placeholder='请输原密码' v-model="userInfo.originalPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop='addr'>
          <el-input type="text" placeholder="请输入新密码" v-model="userInfo.currentPassword"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align:center;margin-top: 40px;">
      <el-button type='primary' @click="doSubmit">保存</el-button>
      <el-button @click="doCancel" type='info' plain>取消</el-button>
    </div>
  </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        userInfo: {
          originalPassword: '',
          currentPassword:''
        },
        originUserInfo: {},
        labelPosition: 'right'
      }
        },
        methods: {
          //确认添加
          doSubmit() {
            if(!(this.userInfo.originalPassword && this.userInfo.currentPassword )){
              this.$message.error('请输入必要信息！');
              return;
            }
            this.$confirm('确认修改密码', '提示', { type: 'warning' })
              .then(() => {
                var url = this.$store.state.globalSettings.apiUrl + 'managemodule/admin/updatePassWord';
                this.axios({
                    method:'POST',
                    url:url,
                    headers:{'TLADMIN':sessionStorage.getItem('token')},
                    data:this.userInfo
                })
                .then(res=>{
                    // console.log(res);
                    if(res.status==200){ 
                  this.$message({
                        message: res.data.msg,
                        type: 'success',
                        duration:1000
                      });
                      this.userInfo={};
                }
                })
                .catch(res=>{
                    console.log(res);
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消密码修改！'
                })
              })
          },
          doCancel() {
            this.userInfo = {}
          }
        }
      }
    
</script>
<style lang="scss">
</style>