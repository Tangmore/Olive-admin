<template>
  <div class="cinemadetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>影院信息编辑</span>
        <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
      </div>
      <div class="main">
        <!-- 修改表单 -->
        <div class='editBox' style='width:80%'>
          <el-form :label-position="labelPosition" label-width="90px"
          :model="info.infoList" :rules="rules" ref="ruleForm" center>
            <el-form-item label="影院名：" prop="cinemaName">
              <el-input type="text" placeholder="请输入影院名" v-model="info.infoList.cinemaName"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop='cinemaAddress'>
              <el-input type="text" placeholder="请输入影院地址" v-model="info.infoList.cinemaAddress"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align:center">
          <el-button type='primary' @click="doSubmit('ruleForm')">保存</el-button>
          <el-button @click="changeIs" type='info' plain>取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        info: {
          infoList: { cinemaName: '', cinemaAddress: '' },
        },
          rules: {
          cinemaName: [
            { required: true, message: '请输入影院名', trigger: 'blur' }
          ],
          cinemaAddress: [
            { required: true, message: '请输入影院地址', trigger: 'blur' }
          ]
        },
        labelPosition: 'right'
      }
    },
    props: ['id'],
    methods: {
      //提交修改
      doSubmit(formName) {
             this.$refs[formName].validate((valid) => {
          if (valid) {
           var that = this;
        var url = this.$store.state.globalSettings.apiUrl + 'managemodule/cinema/updateCinema?id=' + this.id;
        this.axios.post(url, this.info.infoList)
          .then(res => {
            this.$message.success(res.data.msg);
            this.$bus.$emit('changeCinemaInfo');
            this.changeIs();
          })
          .catch(err => {
            this.$message.error('编辑影院失败！')
          })
          }
        })
      },
      // 子传父----关闭弹出框
      changeIs() {
        this.info.infoList = {};
        this.$emit('tellEditShow', false);
      }
    },
    mounted() {
      // 初始化当前影院信息
      this.axios.get(this.$store.state.globalSettings.apiUrl +
       'managemodule/cinema/selectById?id=' + this.id)
        .then(res => {
          console.log(res)
          this.info.infoList = res.data.row;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  

</script>
<style lang="scss">
</style>