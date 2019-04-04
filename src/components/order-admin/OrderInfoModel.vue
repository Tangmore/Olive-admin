<template>
  <div class="orderdetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
      </div>
      <div class="main">
        <!-- 修改表单 -->
        <div class='editBox' style='width:80%'>
          <el-form :label-position="labelPosition" label-width="90px" class="moviedetail">
            <el-form-item label="订单编号:">
              {{info.infoList.orderNum}}
            </el-form-item>
            <el-form-item label="用户名:">
              {{info.infoList.name}}
            </el-form-item>
            <el-form-item label="评分:">
              {{info.infoList.score}}
            </el-form-item>
            <el-form-item label="影院地址:">
              {{info.infoList.cinemaAddress}}
            </el-form-item>
            <el-form-item label="影院影厅:">
              {{info.infoList.cinemaName}}-{{info.infoList.hallName}}
            </el-form-item>
            <el-form-item label="下单时间:">
              {{info.infoList.createTime}}
            </el-form-item>
            <el-form-item label="电影开场:">
              {{info.infoList.startTime}}
            </el-form-item>
            <el-form-item label="折扣:">
              {{info.infoList.discount}}
            </el-form-item>
            <el-form-item label="原价:">
              {{info.infoList.originalPrice}}
            </el-form-item>
            <el-form-item label="现价:">
              {{info.infoList.presentPrice}}
            </el-form-item>
            <el-form-item label="订单状态:">
              {{info.infoList.isCancel}}
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
          infoList: {},
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
      this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/orders/adminSelectPageOrder?map[id]=' + this.id)
        .then(res => {
          this.info.infoList = res.data.rows[0];
          console.log(res)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>
<style lang="scss">
</style>