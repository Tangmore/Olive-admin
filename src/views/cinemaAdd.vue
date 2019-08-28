<template>
  <div class="contentDomain">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">影院</el-breadcrumb-item>
      <el-breadcrumb-item>影院添加</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 修改表单 -->
    <div class='editBox' style='width:70%;margin:30px auto;'>
      <el-form label-width="100px" class="demo-ruleForm" :model="userInfo" :rules="rules" ref="ruleForm" center>
        <el-form-item label="影院名：" prop="cinemaName">
          <el-input type='text' placeholder='请输入影院名称' v-model="userInfo.cinemaName"></el-input>
        </el-form-item>
        <el-form-item label="影院地址" prop='cinemaAddress'>
          <el-input type="text" placeholder="请输入影院地址" v-model="userInfo.cinemaAddress"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align:center;margin-top: 40px;">
      <el-button type='primary' @click="doSubmit('ruleForm')">保存</el-button>
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
          cinemaName: '',
          cinemaAddress: ''
        },
        rules: {
          cinemaName: [
            { required: true, message: '请输入影院名', trigger: 'blur' }
          ],
          cinemaAddress: [
            { required: true, message: '请输入影院地址', trigger: 'blur' }
          ]
        },
        originUserInfo: {},
        labelPosition: 'right'
      }
    },
    methods: {
      //确认添加
      doSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = this.$store.state.globalSettings.apiUrl + 'managemodule/cinema/addCinema';
            this.axios.post(url, this.userInfo)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.data.msg);
                  this.userInfo = {};
                }
              })
              .catch(err => {
                console.log(err);
              })
          }
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