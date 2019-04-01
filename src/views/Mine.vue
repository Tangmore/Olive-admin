<template>
    <div class="userdetail">
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item :to="{path:'/main'}">管理员</el-breadcrumb-item>
                <el-breadcrumb-item>我的</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form :label-position="labelPosition" label-width="90px">
                <el-form-item label="用户名：">
                    {{userInfo.userName}}
                </el-form-item>
            </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                labelPosition: 'right',
                userInfo: {}
            }
        },
        mounted() {
            var url = this.$store.state.globalSettings.apiUrl + 'managemodule/admin/selectMyInfo';
            this.axios({
                method: 'GET',
                url: url,
                headers: { 'TLADMIN': sessionStorage.getItem('token') }
            })
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        //   this.$message({
                        //         message: res.data.msg,
                        //         type: 'success',
                        //         duration:1000
                        //       });
                        this.userInfo = res.data.row;
                    }
                })
        }
    }
</script>
<style lang="scss">
</style>