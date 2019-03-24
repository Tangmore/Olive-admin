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
                <el-form-item label="用户名:">
                    {{info.infoList.username}}
                </el-form-item>
                <el-form-item label="电影名:">
                    {{info.infoList.moviename}}
                </el-form-item>
                <el-form-item label="数量:">
                    {{info.infoList.num}}
                </el-form-item>
                <el-form-item label="下单时间:">
                    {{info.infoList.ordertime | dataTime}}
                </el-form-item>
                <el-form-item label="影院:">
                    {{info.infoList.cinemaname}}
                </el-form-item>
                <el-form-item label="总价:">
                  {{info.infoList.total_price}}￥
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
            infoList: { username: '',moviename:'',cinemaname:'',ordertime:'',num:'', total_price: '' },
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
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'orders/getById?id=' + this.id)
          .then(res => {
            this.info.infoList = res.data.data;
            console.log(res)
          })
          .catch(err => {
            this.$message.error('获取影院信息失败');
          })
      }
    }
  </script>
  <style lang="scss">
  
  </style>