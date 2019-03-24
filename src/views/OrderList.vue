<template>
  <div class="orderEditmain">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 条件查询 -->
    <div class="searchBtn">
      <el-input placeholder="请输入用户名" v-model="searchContnt" size="small" clearable>
        <el-button slot="append" size="small" @click='ordernameSearch'>搜索</el-button>
      </el-input>
    </div>
    <!-- 订单列表 -->
    <el-table :data='currentPageData' style="width:100%" stripe border>
      <el-table-column label='id' prop='id' sortable>
      </el-table-column>
      <el-table-column label='用户名' prop='username'>
      </el-table-column>
      <el-table-column label='电影名' prop='moviename'>
      </el-table-column>
      <el-table-column label='数量' prop='num' sortable>
      </el-table-column>
      <el-table-column label='影院' prop='cinemaname'>
      </el-table-column>
      <el-table-column label='下单时间' prop='ordertime'  :formatter="dateFormat" sortable>
      </el-table-column>
      <el-table-column label='总价' prop='total_price' sortable>
        </el-table-column>
      <el-table-column fixed="right" label="操作" width='136px'>
        <!-- 插槽作用域的解构  -->
        <template slot-scope="{row,$index}">
          <span @click="orderInfoDetail(row,$index)" class='copBtn'>详情</span>
          <span @click="deleteorder(row,$index)" class='copBtn'>删除</span>
      
        </template>
      </el-table-column>
      </el-table>

    <!-- 订单列表分页显示 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="infoLength">
      </el-pagination>
    </div>

    <!-- 订单详情模态框 -->
    <OrderInfoModel class="orderInfoModal" v-if='isorderInfoModal' :id='thisorderID'  @tellShow='changeInfoShow'
    />
  </div>
  </div>
</template>
<script>
  import OrderInfoModel from '../components/order-admin/OrderInfoModel.vue'
  export default {
    data() {
      return {
        // 当前页信息
        currentPageData: [],
        //所有信息
        infoAll: [],
        searchContnt: "",
        // 总页数
        totalPage: 0,
        // 每页显示条数
        pageSize: 6,
        // 当前页
        currentPage: 1,
        // 总条数
        infoLength: 0,
        // 订单详情
        isorderInfoModal: false,
        thisorderDetail: {},
        // 订单信息编辑
        isorderInfoEdit: false,
        thisorderID: ""
      }
    },
    components: {
      OrderInfoModel
    },
    mounted() {
      this.$bus.$on('changeorderInfo', () => {
        this.infoInit();
      })
      this.infoInit();
    },
    methods: {

      //订单列表初始化
      infoInit() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'orders/getList')
          .then(res => {
            // console.log(res);
            if (res.status == 200) {
              if (res.data.rtnCode == 200) {
                this.infoAll = res.data.data;
                this.dividePage();
              }
            } else {
              this.$message.error('服务器内部错误！');
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //分页
      dividePage() {
        this.infoLength = this.infoAll.length;
        this.currentPageData = this.infoAll.slice((this.currentPage - 1) *
          this.pageSize, this.currentPage * this.pageSize);
        this.totalPage = Math.ceil(this.infoAll.length / this.pageSize);
      },
         // 表格时间内容格式化
         formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
      },
      dateFormat(row, column) {
        var val = row[column.property];
        if (val == undefined) {
          return "";
        }
        var date = new Date(val);
        var yy = date.getFullYear();
        var mm = date.getMonth() + 1;
        var dd = date.getDay();
        var hh = date.getHours();
        var mi = date.getMinutes();
        var ss = date.getSeconds();
        var formatdate = [mm, dd].map(this.formatNumber).join('-');
        var formattime = [hh, mi, ss].map(this.formatNumber).join(':');
        return yy + '-' + formatdate + ' ' + formattime;
      },
      //编辑订单信息
      updateorderInfo(c, index) {
        // this.$router.push('/order/edit/'+c.id);
        if (this.isorderInfoModal) {
          this.$message({
            message: '一次只能打开一个弹出窗，请先关闭其他弹出框！',
            type: 'warning'
          });
          return;
        }
        console.log(this.isorderInfoModal);
        this.isorderInfoEdit = true;
        this.thisorderID = c.id;
      },
      // 获取当前订单信息
      orderInfoDetail(c, index) {
        if (this.isorderInfoEdit) {
          this.$message({
            message: '一次只能打开一个弹出窗，请先关闭其他弹出框！',
            type: 'warning'
          });
          return;
        }
        this.isorderInfoModal = true;
        this.thisorderID = c.id;
        // console.log(this.thisorderID)

      },
      //删除当前行订单
      deleteorder(c, index) {
        this.$confirm('删除操作不可撤销，您确定吗？', '提示', { type: 'warning' })
          .then(() => {
            var that = this;
            var url = this.$store.state.globalSettings.apiUrl + 'orders/delete/?id=' + c.id;
            this.axios.get(url)
              .then(res => {
                that.infoAll.splice(index, 1);
                this.$message.success(res.data.msg);
                this.infoInit();
              })
              .catch(err => {
                this.$message.error('删除订单失败！')
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },

      //根据订单名查找订单
      ordernameSearch() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'orders/getList?username=' + this.searchContnt)
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              if (res.data.rtnCode == 200) {
                this.infoAll = res.data.data;
                this.dividePage();
              }
            } else {
              this.$message.error('服务器内部错误！');
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.currentPageData = this.infoAll.slice((this.currentPage - 1) *
          this.pageSize, this.currentPage * this.pageSize);
      },
      // 子传父isshow---详情弹出框
      changeInfoShow(flag) {
        this.isorderInfoModal = flag;
      },
      // 编辑弹出框
      changeEditShow(flag) {
        this.isorderInfoEdit = flag;
      }
    }
  }
</script>
<style lang='scss'>
  @import url('../assets/scss/common.scss');
  /*订单详情弹出框*/

  .orderInfoModal {
    width: 600px;
    height: auto;
  }

  .orderInfoEdit {
    width: 600px;
    height: auto;
  }

  /* 弹出框*/

  .orderInfoModal,
  .orderInfoEdit {
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>