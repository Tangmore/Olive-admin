<template>
  <div class="main">
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
      <el-table-column label='密码' prop='password'>
      </el-table-column>
      <el-table-column label='爱好' prop='hobby'>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
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
    <div class="userInfoModal" v-show=''>

    </div>
  </div>

  </div>
</template>
<script>
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
        userInfoModal:true
      }
    },
    mounted() {
      this.infoInit();
    },
    methods: {
      //用户列表初始化
      infoInit() {
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'user/getList')
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              if (res.data.rtnCode == 200) {
                this.infoAll = res.data.data;
                this.infoLength = this.infoAll.length;
                this.currentPageData = this.infoAll.slice((this.currentPage - 1) *
                  this.pageSize, this.currentPage * this.pageSize);
                this.totalPage = Math.ceil(this.infoAll.length / this.pageSize);
              }
            } else {
              this.$message.error('服务器内部错误！');
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //更新用户信息
      updateUserInfo(c, index) {
        this.$router.push('/user/edit/' + c.id);
      },
      // 获取当前用户信息
      UserInfoDetail(c, index){
        let userinfoDetail='';
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', '用户详情', {
          dangerouslyUseHTMLString: true
        });
      },
      //删除当前行用户
      deleteUser(c, index) {
        this.$confirm('删除操作不可撤销，您确定吗？', '提示', {
            type: 'warning'
          })
          .then(() => {
            var url = this.$store.state.globalSettings.apiUrl + 'user/delete/?id=' + c.id;
            this.axios.get(url)
              .then(res => {
                if (res.status == 200) {
                  if (res.data.rtnCode == 200) {
                    this.categoryList.splice(index, 1);
                    this.$message.success('删除用户成功！');
                  }
                } else {
                  this.$message.error('服务器内部错误！');
                }
              })
              .catch(err => {
                this.$message.error('用户删除出错');
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
      }
    }
  }
</script>
<style lang='scss'>
  .copBtn {
    color: #409EFF;
    margin-right: 20px;
    font-size: 14px;
  }

  .el-table,.el-pagination {
    margin-top: 10px;
  }

  .searchBtn {
    float: right;
    width: 260px;
    margin-bottom: 10px;
  }

  /*大屏幕*/
  @media screen and (min-width: 1200px) {
    .searchBtn {
      width: 260px;
    }
  }

  /*平板电脑与小屏电脑之间的分辨率*/
  @media screen and (min-width: 768px) and (max-width:1200px) {
    .searchBtn {
      width: 240px;
    }
  }

  /*横向放置的手机和竖向放置的平板之间的分辨率*/
  @media screen and (max-width:767px) {
    .searchBtn {
      width: 250px;
    }
  }

  /*竖向放置的手机以及分别率*/
  @media screen and (max-width: 480px) {
    .searchBtn {
      width: 220px;
    }
  }
</style>