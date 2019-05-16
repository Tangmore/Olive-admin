<template>
  <div class="userEditmain">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">用户</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 条件查询 -->
    <div class="searchBtn">
      <el-input placeholder="请输入用户名" v-model="searchContnt" size="small" clearable>
        <el-button slot="append" size="small" @click='usernameSearch'>搜索</el-button>
      </el-input>
    </div>
    <!-- 用户列表 -->
    <el-table :data='currentPageData' style="width:100%" stripe border>
      <!-- <el-table-column label='id' prop='id' sortable>
      </el-table-column> -->
      <el-table-column label='编号'
      type="index"
      width="50">
    </el-table-column>
      <el-table-column label='名称' prop='name' sortable>
      </el-table-column>
    
      <el-table-column label='手机号' prop='phone'>
      </el-table-column>
      <el-table-column label='余额' prop='balance'>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width='136px'>
        <!-- 插槽作用域的解构  -->
        <template slot-scope="{row,$index}">
          <span @click="UserInfoDetail(row,$index)" class='copBtn'>详情</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 用户列表分页显示 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 用户详情模态框 -->
    <userInfoModal class="userInfoModal" v-show='isuserInfoModal' :userDetail='thisuserDetail' @tellShow='changeInfoShow' />
  </div>

  </div>
</template>
<script>
  import userInfoModal from '../components/user-admin/userInfoModel.vue'
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
        // 用户详情
        isuserInfoModal: false,
        thisuserDetail: {},
        // 用户信息编辑
        isuserInfoEdit: false,
        thisuserID: "",
        total:0
      }
    },

    components: {
      userInfoModal
    },
    mounted() {
      this.$bus.$on('changeUserInfo', () => {
        this.infoInit(this.pageSize, this.currentPage);
      })
      this.infoInit(this.pageSize, this.currentPage);
    },
    methods: {
      //用户列表初始化
      infoInit(pageSize, currentPage) {
        // console.log(pageSize)
        var url = this.$store.state.globalSettings.apiUrl
          + 'managemodule/user/selectPageUser';
        this.axios({
          method: 'GET',
          url: url,
          params: { pageSize: pageSize, currentPage: currentPage }
        })
          .then(res => {
            // console.log(res);
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

      // 获取当前用户信息
      UserInfoDetail(c, index) {
        this.isuserInfoModal = true;
        var url = this.$store.state.globalSettings.apiUrl + 'managemodule/user/selectUserById?id=' + c.id;
        this.axios({
          method: 'GET',
          url: url
        })
          .then(res => {
            if (res.status == 200) {
              res.data.row.imgUrl=this.$store.state.globalSettings.apiUrl+res.data.row.imgUrl;
                console.log(res.data.row.imgUrl);
              this.thisuserDetail = res.data.row;
            }
          })
          .catch(res => {
            console.log(res);
          })
      },

      //按用户名查找用户
      usernameSearch() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/user/selectPageUser?map[name-like]=' + this.searchContnt)
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
      // 子传父isshow---个人详情弹出框
      changeInfoShow(flag) {
        this.isuserInfoModal = flag;
      },
      // 子传父isshow---个人详情编辑弹出框
      changeEditShow(flag) {
        this.isuserInfoEdit = flag;
      }

    }
  }
</script>
<style lang='scss'>
  @import url('../assets/scss/common.scss');
  /*用户详情弹出框*/

  .userInfoModal {
    width: 400px;
    height: auto;
  }

  .UserInfoEdit {
    width: 600px;
    height: auto;
  }

  /* 弹出框*/
  .userInfoModal,
  .UserInfoEdit {
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>