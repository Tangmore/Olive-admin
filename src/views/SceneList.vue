<template>
        <div class="movieEditmain">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator='/'>
            <el-breadcrumb-item :to="{path:'/main'}">电影场次</el-breadcrumb-item>
            <el-breadcrumb-item>电影场次信息</el-breadcrumb-item>
            <el-breadcrumb-item>电影场次列表</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 条件查询 -->
          <!-- <div class="searchBtn">
            <el-input placeholder="请输入电影场次名" v-model="searchContnt" size="small" clearable>
              <el-button slot="append" size="small" @click='movienameSearch'>搜索</el-button>
            </el-input>
          </div> -->
          <!-- 电影场次列表 -->
          <el-table :data='currentPageData' style="width:100%" stripe border>
            <el-table-column label='id' prop='id' sortable>
            </el-table-column>
            <el-table-column label='开始时间' prop='startTime'>
              </el-table-column>
              <el-table-column label='结束时间' prop='endTime'>
              </el-table-column>
              <el-table-column label='电影名' prop='fkMovieName'>
               </el-table-column>
               <el-table-column label='影院名' prop='fkCinemaName'>
               </el-table-column>
            <el-table-column label='影厅' prop='fkHallName'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width='136px'>
                  <!-- 插槽作用域的解构  -->
                  <template slot-scope="{row,$index}">
                    <span @click="cinemaInfoDetail(row,$index)" class='copBtn'>详情</span>
                    <span @click="updatecinemaInfo(row,$index)" class='copBtn'>编辑</span>
                    <span @click="deletecinema(row,$index)" class='copBtn'>删除</span>
                  </template>
            </el-table-column>
          </el-table>
      
          <!-- 电影场次列表分页显示 -->
          <div class="block">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
              :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
      
          <!-- 电影场次详情模态框 -->
          <sceneInfoModel class="movieInfoModal" 
          v-if='ismovieInfoModal' :id='thismovieID'
           @tellShow='changeInfoShow'
          />
      
          <!-- 电影场次信息编辑模态框 -->
          <!-- <MovieInfoEdit class="movieInfoEdit" v-if='ismovieInfoEdit' :id='thismovieID' @tellEditShow='changeEditShow' /> -->
      
        </div>
      
        </div>
      </template>
      <script>
        import sceneInfoModel from '../components/scene-admin/sceneInfoModel.vue'
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
              // 电影场次详情
              ismovieInfoModal: false,
              thismovieDetail: {},
              // 电影场次信息编辑
              // ismovieInfoEdit: false,
              thismovieID: ""
            }
          },
          components: {
            // MovieInfoModel,
            sceneInfoModel
          },
          mounted() {
            this.infoInit(this.pageSize, this.currentPage);
          },
          methods: {
      
            //电影场次列表初始化
            infoInit(pageSize, currentPage) {
              // console.log(pageSize)
              var url = this.$store.state.globalSettings.apiUrl
                + 'managemodule/scene/selectPageSceneAdmin';
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
      
            //编辑电影场次信息
            updatecinemaInfo(c, index) {
              this.$router.push('/scene/edit/' + c.id);
            },
            //场次详情
            cinemaInfoDetail(c,index){
                this.thismovieID=c.id;
                console.log(c.id)
                this.ismovieInfoModal=true;
            },
       
            //删除当前行电影场次
            deletecinema(c, index) {
              this.$confirm('删除操作不可撤销，您确定吗？', '提示', { type: 'warning' })
                .then(() => {
                  var that = this;
                  var url = this.$store.state.globalSettings.apiUrl + 'managemodule/scene/deleteScene';
                  this.axios.post(url, { id: c.id })
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
      
            //根据电影场次名查找电影场次
          //   movienameSearch() {
          //     this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/movie/selectPageAdmin?map[movieName-like]=' + this.searchContnt)
          //       .then(res => {
          //         console.log(res);
          //         if (res.status == 200) {
          //           if (res.data.rows) {
          //             this.page = res.data.page;
          //             this.total = res.data.total;
          //             this.currentPageData = res.data.rows;
          //           } else {
          //             this.$message.error(res.data.msg);
          //           }
      
          //         } 
                  
          //       })
          //       .catch(err => {
          //         console.log(err)
          //       })
          //   },
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
            changeEditShow(flag) {
              this.ismovieInfoEdit = flag;
            }
      
          }
        }
      </script>
      <style lang='scss'>
        @import url('../assets/scss/common.scss');
        /*电影场次详情弹出框*/
      
        .movieInfoModal {
          width: 600px;
          height: auto;
        }
      
      
        /* 弹出框*/
      
        .movieInfoModal {
          position: absolute;
          z-index: 99;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      </style>