<template>
    <div class="moviedetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户详情</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
            </div>
            <el-form :label-position="labelPosition" label-width="90px">
                <el-form-item label="用户名：">
                        {{movieDetail.name}}
                </el-form-item> 
                <el-form-item label="头像：">
                        <img :src="movieDetail.img?movieDetail.img:''" alt="" style="width: 100px;height: 100px;vertical-align:top; ">
                </el-form-item>
                <el-form-item label="手机号：">
                        {{movieDetail.phone}}
                </el-form-item> 
                <el-form-item label="爱好：">
                        {{movieDetail.hobby}}
                </el-form-item> 
            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                labelPosition:'right'
            }
        },
        props: ['movieDetail'],
        methods: {
            changeIs() {
                this.$emit('tellShow', false);
            }
        }
    }
</script>
<style lang="scss">
  
</style>