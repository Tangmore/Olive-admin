<template>
  <div class="main">
       <!-- 面包屑导航 -->
       <el-breadcrumb separator='/'>
          <el-breadcrumb-item :to="{path:'/main'}">首页</el-breadcrumb-item>
              <el-breadcrumb-item >菜品管理</el-breadcrumb-item>    
              <el-breadcrumb-item >所有菜品</el-breadcrumb-item>          
       </el-breadcrumb>

       <el-tabs type='border-card'>
         <el-tab-pane v-for="(d,i) in dishList" :key="i">
             <!--  -->
             <span slot="label">
               <el-badge :value='d.dishList.length' >{{d.cname}}</el-badge>
             </span>

             <el-row>
               <el-col v-for='(c,j) in d.dishList' :key="j" :xs='12' :sm='6' :md='4' :lg='3'>
                  {{c.title}}
                  <img :src="require('../assets/img/dish/'+c.imgUrl)" style="max-width:100%">
               </el-col>
             </el-row>
         </el-tab-pane>
       </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dishList:[]
    }
  },
  mounted() {
    this.getDishList()
  },
  methods: {
    getDishList(){
      this.axios.get(this.$store.state.globalSettings.apiUrl+'/admin/dish')
            .then(res=>{
                this.dishList=res.data;
                // console.log(dishList)
            })
            .catch(err=>{
                console.log(err)   
            })
    }
  },
}
</script>

<style lang="scss">
     .el-badge__content{
       margin-top: 10px;
     }
</style>