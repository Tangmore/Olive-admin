<template>
  <div class="main">
       <!-- 面包屑导航 -->
       <el-breadcrumb separator='/'>
          <el-breadcrumb-item :to="{path:'/main'}">首页</el-breadcrumb-item>
           <el-breadcrumb-item >桌台管理</el-breadcrumb-item>          
           <el-breadcrumb-item >桌台列表</el-breadcrumb-item>          
       </el-breadcrumb>
    
      <el-row>
        <el-col v-for="(t,i) in tableList" :key="i" :xs='12' :sm='8' :md='6' :lg='4'>
          <Table :tableDetail='t'/>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
import Table from '../components/Table.vue'
export default {
  data(){
    return{
      tableList:[]
    }
  },
  components:{
    Table
  },
  methods: {
    getTableList(){
      var url=this.$store.state.globalSettings.apiUrl+'/admin/table';
      this.axios.get(url)
      .then(res=>{
         this.tableList=res.data;
      })
      .catch(err=>{
         console.log(err)
      })
      }
  },
  mounted() {
    this.getTableList();
  },
}
</script>


