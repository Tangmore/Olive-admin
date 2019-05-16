<template>
  <div class="main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">电影管理</el-breadcrumb-item>
      <el-breadcrumb-item>电影类型</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button style="margin-bottom:10px;margin-top:20px" type='primary' size='small' plain @click="addtype">添加新的电影类型</el-button>

    <el-table :data='currentPageData' style="width:80%" stripe border>
      <!-- <el-table-column label='编号' prop='id'>
      </el-table-column> -->
      <el-table-column label='编号'
      type="index"
      width="50">
    </el-table-column>
      <el-table-column label='名称' prop='typeName'>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width='136px'>
        <!-- 插槽作用域的解构 -->
        <template slot-scope="{row,$index}">
          <span @click="updateTypeInfo(row,$index)" class='copBtn'>编辑</span>
          <span @click="deleteType(row,$index)" class='copBtn'>删除</span>
        </template>
      </el-table-column>
    </el-table>
    <!--类型列表分页显示 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10,16,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        typeList: [],
        // 当前页信息
        currentPageData: [],
        searchContnt: "",
        // 总页数
        // totalPage: 0,
        total: 0,
        // 每页显示条数
        pageSize: 10,
        // 当前页
        currentPage: 1,
        // 总条数
        // infoLength: 0
      }
    },
    mounted() {
      this.initType(this.pageSize, this.currentPage);
    },
    methods: {
      //分页

      handleSizeChange(val) {
        this.currentPageData = []
        this.page = 0;
        this.total = 0;
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.initType(val, this.currentPage);
      },
      handleCurrentChange(val) {
        this.currentPageData = []
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.initType(this.pageSize, val);
      },

      initType(pageSize, currentPage) {
        // console.log(pageSize)
        var url = this.$store.state.globalSettings.apiUrl
          + 'managemodule/type/selectPageType';
        this.axios({
          method: 'GET',
          url: url,
          params: { pageSize: pageSize, currentPage: currentPage },
          headers: { 'TLADMIN': sessionStorage.getItem('token') }
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
      addtype() {
        this.$prompt('请输入新的电影类别名', '提示', { type: 'info' })
          .then(({ value }) => {
            var url = this.$store.state.globalSettings.apiUrl + 'managemodule/type/addType';
            this.axios.post(url, { typeName: value })
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.data.msg);
                  //  this.typeList.push({ id:80, typeName: value });
                  this.initType(this.pageSize, this.currentPage);
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加!'
            })
          })
      },

      updateTypeInfo(c, index) {
        this.$prompt('请输入要更改的电影类型名', '提示', { inputValue: c.name })
          .then(({ value }) => {
            var url = this.$store.state.globalSettings.apiUrl + 'managemodule/type/updateType';
            var data = { id: c.id, typeName: value };
            this.axios.post(url, data)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.data.msg);
                  this.initType(this.pageSize, this.currentPage);
                }
              })
              .catch(err => {
                console.log(err);
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
      },

      deleteType(c, index) {
        this.$confirm('删除操作不可撤销，您确定吗？', '提示', { type: 'warning' })
          .then(() => {
            var url = this.$store.state.globalSettings.apiUrl + 'managemodule/type/deleteType';
            this.axios({
              method: 'POST',
              url: url,
              data: { id: c.id }
            })
              .then(res => {
                if (res.status == 200) {
                  this.typeList.splice(index, 1);
                  this.$message.success(res.data.msg);
                  this.initType();
                }
              })
              .catch(err => {
                console.log(res);
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },


  }
</script>
<style>
  @import url('../assets/scss/common.scss');
</style>