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
          <el-form :label-position="labelPosition" label-width="90px">
            <el-form-item label="影院名：">
              <el-input type="text" placeholder="请输入影院名" v-model="info.infoList.name"></el-input>
            </el-form-item>
            <el-form-item label="地址：">
              <el-input type="text" placeholder="请输入影院地址" v-model="info.infoList.addr"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align:center">
          <el-button type='primary' @click="doSubmit">保存</el-button>
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
          infoList: { name: '', addr: '' },
        },
        labelPosition: 'right'
      }
    },
    props: ['id'],
    methods: {
      //提交修改
      doSubmit() {
        var that = this;
        var url = this.$store.state.globalSettings.apiUrl + 'cinema/edit?id=' + this.id;
        this.axios.post(url, this.info.infoList)
          .then(res => {
            this.$message.success('影院信息修改成功！');
            this.$bus.$emit('changeCinemaInfo');
            this.changeIs();

          })
          .catch(err => {
            this.$message.error('编辑影院失败！')
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
      this.axios.get(this.$store.state.globalSettings.apiUrl + 'cinema/getById?id=' + this.id)
        .then(res => {
          this.info.infoList = res.data.data;
        })
        .catch(err => {
          this.$message.error('获取影院信息失败');
        })
    }
  }
</script>
<style lang="scss">
 
</style>