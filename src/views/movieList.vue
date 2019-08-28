<template>
  <div class="contentDomain">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">电影</el-breadcrumb-item>
      <el-breadcrumb-item>电影信息</el-breadcrumb-item>
      <el-breadcrumb-item>电影列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 条件查询 -->
    <div class="searchBtn">
      <el-input placeholder="请输入电影名" v-model="searchContnt" size="small" clearable>
        <el-button slot="append" size="small" @click='movienameSearch'>搜索</el-button>
      </el-input>
    </div>
    <!-- 电影列表 -->
    <el-table :data='currentPageData' style="width:100%" stripe border>
      <el-table-column label='编号'
      type="index"
      width="50">
    </el-table-column>
      <el-table-column label='电影名' prop='movieName'>
      </el-table-column>
      <el-table-column label='评分' prop='praise'>
      </el-table-column>
      <el-table-column label='电影类型' prop='fkTypeName'>
      </el-table-column>
      <el-table-column label='主演' prop='starring'>
      </el-table-column>
      <el-table-column label='影片时长' prop='filmLength' sortable>
      </el-table-column>
      <el-table-column label='折扣' prop='discount'>
      </el-table-column>
      <!-- <el-table-column label='浏览量' prop='browseNum'>
      </el-table-column> -->
      <el-table-column label='票价' prop='price' sortable>
      </el-table-column>
      <el-table-column label='上映时间' prop='startTime' sortable>
      </el-table-column>
      <el-table-column label='下架时间' prop='endTime' sortable>
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

    <!-- 电影列表分页显示 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 电影详情模态框 -->
    <MovieInfoModel class="movieInfoModal" v-show='ismovieInfoModal' :movieDetail='thismovieDetail' @tellShow='changeInfoShow'
    />
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
        total: 0,
        // 电影详情
        ismovieInfoModal: false,
        thismovieDetail: {},
        // 电影信息编辑
        // ismovieInfoEdit: false,
        // thismovieID: ""
      }
    },
    components: {
      MovieInfoModel
      // MovieInfoEdit
    },
    mounted() {
      this.infoInit(this.pageSize, this.currentPage);
    },
    methods: {

      //电影列表初始化
      infoInit(pageSize, currentPage) {
        // console.log(pageSize)
        var url = this.$store.state.globalSettings.apiUrl
          + 'managemodule/movie/selectPageMovie';
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

      //编辑电影信息
      updateMovieInfo(c, index) {
        this.$router.push('/movie/edit/' + c.id);
      },
      // 获取当前电影信息
      MovieInfoDetail(c, index) {
        this.ismovieInfoModal = true;
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/movie/selectPageMovie?map[id]=' + c.id)
          .then(res => {
            console.log(res);
            if (res.status == 200) {
                 res.data.rows[0].imgUrl=this.$store.state.globalSettings.apiUrl+res.data.rows[0].imgUrl;
                // console.log(res.data.row.imgUrl);
                // console.log(res.data.rows[0].imgUrl)
              this.thismovieDetail = res.data.rows[0];
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      //删除当前行电影
      deleteMovie(c, index) {
        this.$confirm('删除操作不可撤销，您确定吗？', '提示', { type: 'warning' })
          .then(() => {
            var that = this;
            var url = this.$store.state.globalSettings.apiUrl + 'managemodule/movie/deleteMovie';
            this.axios.post(url, { id: c.id })
              .then(res => {
                // that.infoAll.splice(index, 1);
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

      //根据电影名查找电影
      movienameSearch() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/movie/selectPageMovie?map[movieName-like]=' + this.searchContnt+'&map[comment-like]=' + this.searchContnt)
          .then(res => {
            console.log(res);
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
  /*电影详情弹出框*/

  .movieInfoModal {
    width: 600px;
    height: auto;
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