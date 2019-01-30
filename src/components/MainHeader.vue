<template>
    <div class="mainHeader">
        <p>Olive后台管理系统</p>
        <div class="rightOut">
            <p>欢迎回来{{this.$store.state.adminName}} <el-button type="info" size="mini">退出</el-button></p>
           
        </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .mainHeader{
        display: flex;
        justify-content: space-between;
        .rightOut{
           
        }
    }
</style>