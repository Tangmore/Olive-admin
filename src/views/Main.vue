<template>
  <div class="main">
    <el-container>
      <el-aside width='200px'>
        
      </el-aside>
    <el-container>
      <el-header height='60px'>
        <MainHeader/>
      </el-header>
      <el-main>
        tablist
        <router-view></router-view>
      </el-main>
    </el-container>
    </el-container>

  </div>
</template>
<script>
import MainHeader from '../components/MainHeader.vue'
export default {
  methods:{
      
  },
  beforeCreate(){
      if(!this.$store.state.adminName){
        this.$router.push('/login')
      }
  },
  mounted(){
    
  },
  components:{
    MainHeader
  }
}
</script>
<style lang="scss">
  
</style>