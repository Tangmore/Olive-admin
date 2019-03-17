<template>
  <div class="movieEditmain">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">影院</el-breadcrumb-item>
      <el-breadcrumb-item>影院信息</el-breadcrumb-item>
      <el-breadcrumb-item>影院列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 条件查询 -->
    <div class="searchBtn">
      <el-input placeholder="请输入影院名" v-model="searchContnt" size="small" clearable>
        <el-button slot="append" size="small" @click='movienameSearch'>搜索</el-button>
      </el-input>
    </div>
    <!-- 影院列表 -->
    <el-table :data='currentPageData' style="width:100%" stripe border>
      <el-table-column label='id' prop='id' sortable>
      </el-table-column>
      <el-table-column label='影院名' prop='name'>
      </el-table-column>
      <el-table-column label='影院地址' prop='typename'>
      </el-table-column>

      <el-table-column label='评分' prop='praise' sortable>
      </el-table-column>
     
      <el-table-column fixed="right" label="操作" width='136px'>
        <!-- 插槽作用域的解构  -->
        <template slot-scope="{row,$index}">
          <span @click="MovieInfoDetail(row,$index)" class='copBtn'>详情</span>
          <span @click="updateMovieInfo(row,$index)" class='copBtn'>编辑</span>
          <span @click="deleteMovie(row,$index)" class='copBtn'>删除</span>

        </template>
      </el-table-column>
    </el-table>

    <!-- 影院列表分页显示 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="infoLength">
      </el-pagination>
    </div>

    <!-- 影院详情模态框 -->
    <MovieInfoModel class="movieInfoModal" v-show='ismovieInfoModal' :movieDetail='thismovieDetail' @tellShow='changeInfoShow'
    />

    <!-- 影院信息编辑模态框 -->
    <!-- <MovieInfoEdit class="movieInfoEdit" v-if='ismovieInfoEdit' :id='thismovieID' @tellEditShow='changeEditShow' /> -->

  </div>

  </div>
</template>
<script>
  import MovieInfoModel from '../components/movie-admin/MovieInfoModel.vue'
  // import MovieInfoEdit from '../components/movie-admin/MovieInfoEdit.vue'
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
        // 影院详情
        ismovieInfoModal: false,
        thismovieDetail: {},
        // 影院信息编辑
        // ismovieInfoEdit: false,
        // thismovieID: ""
      }
    },
    components: {
      MovieInfoModel
      // MovieInfoEdit
    },
    mounted() {
      this.infoInit();
    },
    methods: {

      //影院列表初始化
      infoInit() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'movie/getList')
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

      //编辑影院信息
      updateMovieInfo(c, index) {
        // if (this.ismovieInfoModal) {
        //   this.$message({
        //     message: '一次只能打开一个弹出窗，请先关闭其他弹出框！',
        //     type: 'warning'
        //   });
        //   return;
        // }
        // this.ismovieInfoEdit = true;
        // this.thismovieID = c.id;


        this.$router.push('/movie/edit/'+c.id);
      },
      // 获取当前影院信息
      MovieInfoDetail(c, index) {
        // if (this.ismovieInfoEdit) {
        //   this.$message({
        //     message: '一次只能打开一个弹出窗，请先关闭其他弹出框！',
        //     type: 'warning'
        //   });
        //   return;
        // }
        this.ismovieInfoModal = true;
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'movie/getById?id=' + c.id)
          .then(res => {
            // console.log(res);
            if (res.status == 200) {
              if (res.data.rtnCode == 200) {
                this.thismovieDetail = res.data.data;
              }
            } else {
              this.$message.error('服务器内部错误！');
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      //删除当前行影院
      deleteMovie(c, index) {
         this.$confirm('删除操作不可撤销，您确定吗？', '提示', { type: 'warning' })
          .then(() => {
            var that = this;
            var url = this.$store.state.globalSettings.apiUrl + 'movie/delete/?id=' + c.id;
            this.axios.get(url)
              .then(res => {
                that.infoAll.splice(index, 1);
                this.$message.success(res.data.msg);
                this.infoInit();
              })
              .catch(err => {
                this.$message.error('删除影院失败！')
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },

      //根据影院名查找影院
      movienameSearch() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'movie/getList?name=' + this.searchContnt)
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
      // 子传父isshow---个人详情弹出框
      changeInfoShow(flag) {
        this.ismovieInfoModal = flag;
      },
      // 子传父isshow---个人详情编辑弹出框
      // changeEditShow(flag) {
      //   this.ismovieInfoEdit = flag;
      // }

    }
  }
</script>
<style lang='scss'>
  @import url('../assets/scss/common.scss');
  /*影院详情弹出框*/

  .movieInfoModal {
    width: 600px;
    height:auto;
  }

  /* .movieInfoEdit {
    width: 600px;
    height: auto;
  } */

  /* 弹出框*/

  .movieInfoModal {
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>