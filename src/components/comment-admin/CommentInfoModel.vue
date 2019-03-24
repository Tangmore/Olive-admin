<template>
    <div class="moviedetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>电影详情</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
            </div>
            <el-form :label-position="labelPosition" label-width="90px" class="moviedetail">
                <el-form-item label="电影名:">
                    {{commentDetail.moviename}}
                </el-form-item>
                <el-form-item label="用户名:">
                    {{commentDetail.username}}
                </el-form-item>
                <el-form-item label="评分:">
                    {{commentDetail.score}}
                </el-form-item>
                <el-form-item label="评论:">
                   <div class="discrible"> {{commentDetail.comment}}</div>
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
        props: ['commentDetail'],
        methods: {
            changeIs() {
                this.$emit('tellShow', false);
            }
        }
    }
</script>
<style lang="scss" scoped>
  @import url('../../assets/scss/common.scss');   
.moviedetail .el-form-item {
        margin-bottom: 0;
    }
.el-col-1 {
    text-align: center
}
</style>