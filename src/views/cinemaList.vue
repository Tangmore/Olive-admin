<template>
  <div class="contentDomain">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">影院管理</el-breadcrumb-item>
      <el-breadcrumb-item>影院列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 条件查询 -->
    <div class="searchBtn">
      <el-input placeholder="请输入影院名" v-model="searchContnt" size="small" clearable>
        <el-button slot="append" size="small" @click='cinemanameSearch'>搜索</el-button>
      </el-input>
    </div>
    <!-- 影院列表 -->
    <el-table :data='currentPageData' style="width:100%" stripe border>
      <!-- <el-table-column label='id' prop='id' sortable>
      </el-table-column> -->
      <el-table-column label='编号'
      type="index"
      width="50">
    </el-table-column>
      <el-table-column label='影院名' prop='cinemaName'>
      </el-table-column>
      <el-table-column label='影院地址' prop='cinemaAddress'>
      </el-table-column>

      <!-- <el-table-column label='评分' prop='praise' sortable>
      </el-table-column> -->

      <el-table-column fixed="right" label="操作" width='136px'>
        <!-- 插槽作用域的解构  -->
        <template slot-scope="{row,$index}">
          <span @click="cinemaInfoDetail(row,$index)" class='copBtn'>详情</span>
          <span @click="updatecinemaInfo(row,$index)" class='copBtn'>编辑</span>
          <span @click="deletecinema(row,$index)" class='copBtn'>删除</span>

        </template>
      </el-table-column>
    </el-table>

    <!-- 影院列表分页显示 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 影院详情模态框 -->
    <CinemaInfoModel class="cinemaInfoModal" v-if='iscinemaInfoModal' :id='thiscinemaID' @tellShow='changeInfoShow' />

    <!-- 影院信息编辑模态框 -->
    <CinemaInfoEdit class="cinemaInfoEdit" v-if='iscinemaInfoEdit' :id='thiscinemaID' @tellEditShow='changeEditShow' />

  </div>

  </div>
</template>
<script>
  import CinemaInfoModel from '../components/cinema-admin/CinemaInfoModel.vue'
  import CinemaInfoEdit from '../components/cinema-admin/CinemaInfoEdit.vue'
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
        total: 0,
        // 影院详情
        iscinemaInfoModal: false,
        thiscinemaDetail: {},
        // 影院信息编辑
        iscinemaInfoEdit: false,
        thiscinemaID: ""
      }
    },
    components: {
      CinemaInfoModel,
      CinemaInfoEdit
    },
    mounted() {
      this.$bus.$on('changeCinemaInfo', () => {
        this.infoInit();
      })
      this.infoInit();
    },
    methods: {
      infoInit(pageSize, currentPage) {
        var url = this.$store.state.globalSettings.apiUrl
          + 'managemodule/cinema/selectPageAdmin';
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
      //编辑影院信息
      updatecinemaInfo(c, index) {
        if (this.iscinemaInfoModal) {
          this.$message({
            message: '一次只能打开一个弹出窗，请先关闭其他弹出框！',
            type: 'warning'
          });
          return;
        }
        console.log(this.iscinemaInfoModal);
        this.iscinemaInfoEdit = true;
        this.thiscinemaID = c.id;
      },
      // 获取当前影院信息
      cinemaInfoDetail(c, index) {
        if (this.iscinemaInfoEdit) {
          this.$message({
            message: '一次只能打开一个弹出窗，请先关闭其他弹出框！',
            type: 'warning'
          });
          return;
        }
        this.iscinemaInfoModal = true;
        this.thiscinemaID = c.id;


      },
      //删除当前行影院
      deletecinema(c, index) {
        this.$confirm('删除操作不可撤销，您确定吗？', '提示', { type: 'warning' })
          .then(() => {
            var that = this;
            var url = this.$store.state.globalSettings.apiUrl + 'managemodule/cinema/deleteCinema';
            this.axios.post(url,{id:c.id})
              .then(res => {
                this.$message.success(res.data.msg);
                this.infoInit(this.pageSize, this.currentPage);
              })
              .catch(err => {
                console.log(err);            
                })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },

      //根据影院名查找影院
      cinemanameSearch() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/cinema/selectPageAdmin?map[cinemaName-like]=' + this.searchContnt)
          .then(res => {
            if (res.status == 200) {
              if (res.data.rows) {
                this.page = res.data.page;
                this.total = res.data.total;
                this.currentPageData = res.data.rows;
              } else {
                this.$message.error(res.data.msg);
              }

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
        this.iscinemaInfoModal = flag;
      },
      // 编辑弹出框
      changeEditShow(flag) {
        this.iscinemaInfoEdit = flag;
      }
    }
  }
</script>
<style lang='scss'>
  @import url('../assets/scss/common.scss');
  /*影院详情弹出框*/

  .cinemaInfoModal {
    width: 600px;
    height: auto;
  }

  .cinemaInfoEdit {
    width: 600px;
    height: auto;
  }

  /* 弹出框*/

  .cinemaInfoModal,
  .cinemaInfoEdit {
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>