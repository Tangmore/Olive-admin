<template>
  <div class="main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{path:'/main'}">电影管理</el-breadcrumb-item>
      <el-breadcrumb-item>电影类型</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button style="margin-bottom:10px;" type='primary' size='small' plain @click="addtype">添加新的电影类型</el-button>

    <el-table :data='currentPageData' style="width:80%" stripe border>
      <el-table-column label='编号' prop='id'>
      </el-table-column>
      <el-table-column label='名称' prop='name'>
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
        :page-sizes="[6, 8, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="infoLength">
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
        totalPage: 0,
        // 每页显示条数
        pageSize: 6,
        // 当前页
        currentPage: 1,
        // 总条数
        infoLength: 0
      }
    },
    mounted() {
      this.initType();
    },
    methods: {
      //分页
      dividePage() {
        this.infoLength = this.typeList.length;
        this.currentPageData = this.typeList.slice((this.currentPage - 1) *
          this.pageSize, this.currentPage * this.pageSize);
        this.totalPage = Math.ceil(this.typeList.length / this.pageSize);
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.initType();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.currentPageData = this.typeList.slice((this.currentPage - 1) *
          this.pageSize, this.currentPage * this.pageSize);
          this.initType();
      },
      initType() {
        var url = this.$store.state.globalSettings.apiUrl + 'type/getList';
        this.axios.get(url)
          .then(res => {
            this.typeList = res.data.data;
            this.dividePage();
          })
          .catch(err => {
            console.log(err)
          })
      },
      addtype() {
        this.$prompt('请输入新的电影类别名', '提示', { type: 'info' })
          .then(({ value }) => {
            var url = this.$store.state.globalSettings.apiUrl + 'type/add';
            this.axios.post(url, { name: value })
              .then(res => {
                if (res.status == 200) {
                  if (res.data.rtnCode == 200) {
                    this.$message.success('添加电影类型成功！');
                    this.typeList.push({ id: res.data.id, name: value });
                    this.initType();
                  } else {
                    this.$message.error('新的类别添加出错！');
                  }
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
            var url = this.$store.state.globalSettings.apiUrl + 'type/edit';
            var data = { id: c.id, name: value };
            this.axios.post(url, data)
              .then(res => {
                this.$message.success('电影类型修改成功！');
                this.initType();
              })
              .catch(err => {
                this.$message.error('电影类型修改出错' + res.data.msg)
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
            var url = this.$store.state.globalSettings.apiUrl + 'type/delete?id=' + c.id;
            this.axios.get(url)
              .then(res => {
                this.typeList.splice(index, 1);
                this.$message.success('删除电影类型成功！')
                this.initType();
              })
              .catch(err => {
                this.$message.error('类别删除出错' + res.data.msg);
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