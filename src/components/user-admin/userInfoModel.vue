<template>
    <div class="userdetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户详情</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
            </div>
            <el-form :label-position="labelPosition" label-width="90px">
                <el-form-item label="用户名：">
                    {{userDetail.name}}
                </el-form-item>
                <el-form-item label="头像：">
                    <img :src="userDetail.imgUrl?userDetail.imgUrl:''" alt="" style="width: 100px;height: 100px;vertical-align:top; "> 
                </el-form-item>
                <el-form-item label="手机号：">
                    {{userDetail.phone}}
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                labelPosition: 'right'
            }
        },
        props: ['userDetail'],
        methods: {

            changeIs() {
                this.$emit('tellShow', false);
            }
        },
        mounted(){
         
        }
    }
</script>
<style lang="scss">
    @import url('../../assets/scss/common.scss');
</style>