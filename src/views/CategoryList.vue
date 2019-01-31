<template>
  <div class="main">
     <!-- 面包屑导航 -->
       <el-breadcrumb separator='/'>
          <el-breadcrumb-item :to="{path:'/main'}">首页</el-breadcrumb-item>
           <el-breadcrumb-item >菜品类别管理</el-breadcrumb-item>          
           <el-breadcrumb-item >类别列表</el-breadcrumb-item>          
       </el-breadcrumb>
    
    <el-button style="margin-bottom:10px;" type='primary' size='small' plain @click="addCategory">添加新的菜品类别</el-button>
     
    <el-table 
    :data='categoryList'
    style="width:100%"
    stripe border>
        <el-table-column label='编号' prop='cid'>
        </el-table-column>
        <el-table-column label='名称' prop='cname'>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽作用域的解构 -->
          <template slot-scope="{row,$index}">
            <el-button type='success' size='mini' plain @click="updateCategory(row,$index)">修改</el-button>
            <el-button type='danger' size='mini' plain @click="deleteCategory(row,$index)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return{
      categoryList:[]
    }
  },
  mounted() {
    var url=this.$store.state.globalSettings.apiUrl+'/admin/category';
    this.axios.get(url)
    .then(res=>{
      this.categoryList=res.data;
    })
    .catch(err=>{
      console.log(err)
    })
  },
  methods: {
    addCategory(){
      this.$prompt('请输入新的菜品类别名','提示',{type:'info'})
      .then(({value})=>{
          var url=this.$store.state.globalSettings.apiUrl+'/admin/category';
          this.axios.post(url,{cname:value})
              .then(res=>{
                  if(res.data.code==200){
                    this.$message.success('添加菜品类别成功！');              
                    this.categoryList.push({cid:res.data.cid,cname:value});
                  }else{
                    this.$message.error('新的类别添加出错！');
                  } 
              })
      })
       this.$message({
           type:'info',
           message:'已取消添加'
        })
    },

    updateCategory(c,index){
      this.$prompt('请输入要更改的菜品类别名','提示',{inputValue:c.cname})
      .then(({value})=>{
          var url=this.$store.state.globalSettings.apiUrl+'/admin/category';
          var data={cid:c.cid,cname:value};
                  this.axios.put(url,data)
                    .then(res=>{
                        this.$message.success('菜品修改成功！')
                    })
                    .catch(err=>{
                       this.$message.error('菜品修改出错'+res.data.msg)
                    })
      })
      .catch(()=>{
           this.$message({
           type:'info',
           message:'已取消修改'
        })
      })
    },   

    deleteCategory(c,index){
      this.$confirm('删除操作不可撤销，您确定吗？','提示',{type:'warning'})
      .then(()=>{
           var url=this.$store.state.globalSettings.apiUrl+'/admin/category/'+c.cid;
           this.axios.delete(url)
              .then(res=>{
                    this.categoryList.splice(index,1);
                    this.$message.success('删除菜品成功！')
              })
              .catch(err=>{
                  this.$message.error('类别删除出错'+res.data.msg)
              })  
      }).catch(()=>{
        this.$message({
           type:'info',
           message:'已取消删除'
        })
      })
    }
  },


}
</script>