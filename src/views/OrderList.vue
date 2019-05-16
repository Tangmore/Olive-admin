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
      <!-- <el-table-column label='id' prop='id' sortable>
      </el-table-column> -->
      <el-table-column label='编号'
      type="index"
      width="50">
    </el-table-column>
      <el-table-column label='订单编号' prop='orderNum'>
      </el-table-column>
      <el-table-column label='用户名' prop='name'>
      </el-table-column>
      <el-table-column label='电影名' prop='movieName'>
      </el-table-column>
      <el-table-column label='评分' prop='score'>
      </el-table-column>
      <el-table-column label='影院' prop='cinemaName'>
      </el-table-column>
      <el-table-column label='影厅' prop='hallName'>
      </el-table-column>
      <el-table-column label='影院地址' prop='cinemaAddress'>
      </el-table-column>
      <el-table-column label='下单时间' prop='createTime'  sortable>
      </el-table-column>
      <el-table-column label='电影开始时间' prop='startTime'>
      </el-table-column>
      <el-table-column label='折扣' prop='discount'>
      </el-table-column>
      <el-table-column label='原价' prop='originalPrice'>
      </el-table-column>
      <el-table-column label='现价' prop='presentPrice'>
      </el-table-column>
      <el-table-column label='订单状态' prop='isCancel'>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width='136px'>
        <!-- 插槽作用域的解构  -->
        <template slot-scope="{row,$index}">
          <span @click="orderInfoDetail(row,$index)" class='copBtn'>详情</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 订单列表分页显示 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 订单详情模态框 -->
    <OrderInfoModel class="orderInfoModal" v-if='isorderInfoModal' :id='thisorderID' @tellShow='changeInfoShow' />
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
        // 订单详情
        isorderInfoModal: false,
        thisorderDetail: {},
        thisorderID: "",
        total: 0
      }
    },
    components: {
      OrderInfoModel
    },
    mounted() {
      this.$bus.$on('changeorderInfo', () => {
        this.infoInit(this.pageSize, this.currentPage);
      })
      this.infoInit(this.pageSize, this.currentPage);
    },
    methods: {
      //订单列表初始化
      infoInit(pageSize, currentPage) {
        // console.log(pageSize)
        var url = this.$store.state.globalSettings.apiUrl
          + 'managemodule/orders/adminSelectPageOrder';
        this.axios({
          method: 'GET',
          url: url,
          params: { pageSize: pageSize, currentPage: currentPage }
        })
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              if (res.data.rows) {
                this.page = res.data.page;
                this.total = res.data.total;
                this.currentPageData = res.data.rows;
                return;
              } else {
                this.$message.error(res.data.msg);
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
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
      //根据订单名查找订单
      ordernameSearch() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/orders/adminSelectPageOrder?map[name]=' + this.searchContnt)
          .then(res => {
            console.log(res);
            if (res.status == 200) {
             this.currentPageData=res.data.rows;
            } 
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleSizeChange(val) {
        this.currentPageData = []
        this.page = 0;
        this.total = 0;
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.infoInit(val, this.currentPage);
      },
      handleCurrentChange(val) {
        this.currentPageData = []
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.infoInit(this.pageSize, val);
      },
      // 子传父isshow---详情弹出框
      changeInfoShow(flag) {
        this.isorderInfoModal = flag;
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