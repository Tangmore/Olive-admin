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
      <el-table-column label='id' prop='id' sortable>
      </el-table-column>
      <el-table-column label='名称' prop='name' sortable>
      </el-table-column>
      <el-table-column label='头像' prop='img'>
      </el-table-column>
      <el-table-column label='手机号' prop='phone'>
      </el-table-column>
      <el-table-column label='爱好' prop='hobby'>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width='136px'>
        <!-- 插槽作用域的解构  -->
        <template slot-scope="{row,$index}">
          <span @click="UserInfoDetail(row,$index)" class='copBtn'>详情</span>
          <span @click="updateUserInfo(row,$index)" class='copBtn'>编辑</span>
          <span @click="deleteUser(row,$index)" class='copBtn'>删除</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 用户列表分页显示 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="infoLength">
      </el-pagination>
    </div>

    <!-- 用户详情模态框 -->
    <userInfoModal class="userInfoModal" v-show='isuserInfoModal' :userDetail='thisuserDetail' @tellShow='changeInfoShow' />

    <!-- 用户信息编辑模态框 -->
    <UserInfoEdit class="UserInfoEdit" v-if='isuserInfoEdit' :id='thisuserID' @tellEditShow='changeEditShow' />

  </div>

  </div>
</template>
<script>
  import userInfoModal from '../components/user-admin/userInfoModel.vue'
  import UserInfoEdit from '../components/user-admin/UserInfoEdit.vue'
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
        // 用户详情
        isuserInfoModal: false,
        thisuserDetail: {},
        // 用户信息编辑
        isuserInfoEdit: false,
        thisuserID: ""
      }
    },

    components: {
      userInfoModal,
      UserInfoEdit
    },
    mounted() {
      this.$bus.$on('changeInfo', () => {
        this.infoInit();
      })
      this.infoInit();
    },
    methods: {
      //用户列表初始化
      infoInit() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'user/getList')
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
      //编辑用户信息
      updateUserInfo(c, index) {
        if (this.isuserInfoModal) {
          this.$message({
            message: '一次只能打开一个弹出窗，请先关闭其他弹出框！',
            type: 'warning'
          });
          return;
        }
        this.isuserInfoEdit = true;
        this.thisuserID = c.id;
      },
      // 获取当前用户信息
      UserInfoDetail(c, index) {
        if (this.isuserInfoEdit) {
          this.$message({
            message: '一次只能打开一个弹出窗，请先关闭其他弹出框！',
            type: 'warning'
          });
          return;
        }
        this.isuserInfoModal = true;
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'user/getById?id=' + c.id)
          .then(res => {
            // console.log(res);
            if (res.status == 200) {
              if (res.data.rtnCode == 200) {
                this.thisuserDetail = res.data.data;
              }
            } else {
              this.$message.error('服务器内部错误！');
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      //删除当前行用户
      deleteUser(c, index) {
        this.$confirm('删除操作不可撤销，您确定吗？', '提示', { type: 'warning' })
          .then(() => {
            var that = this;
            var url = this.$store.state.globalSettings.apiUrl + 'user/delete?id=' + c.id;
            this.axios.get(url)
              .then(res => {
                that.infoAll.splice(index, 1);
                this.$message.success(res.data.msg);
                this.infoInit();
              })
              .catch(err => {
                this.$message.error('删除用户失败！')
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },

      //按用户名查找用户
      usernameSearch() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'user/getList?name=' + this.searchContnt)
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
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.infoInit();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.currentPageData = this.infoAll.slice((this.currentPage - 1) *
          this.pageSize, this.currentPage * this.pageSize);
          this.infoInit();
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