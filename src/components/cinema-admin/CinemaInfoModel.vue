<template>
  <div class="cinemadetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>影院详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
      </div>
      <div class="main">
        <!-- 修改表单 -->
        <div class='editBox' style='width:80%'>
          <el-form :label-position="labelPosition" label-width="90px">
            <el-form-item label="影院名：">
              {{info.infoList.cinemaName}}
            </el-form-item>
            <el-form-item label="地址：">
              {{info.infoList.cinemaAddress}}
            </el-form-item>
          </el-form>
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
        labelPosition: 'right'
      }
    },
    props: ['id'],
    methods: {
      // 子传父----关闭弹出框
      changeIs() {
        this.info.infoList = {};
        this.$emit('tellShow', false);
      }
    },
    mounted() {
      // 初始化当前影院信息
      this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/cinema/selectById?id=' + this.id)
        .then(res => {
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