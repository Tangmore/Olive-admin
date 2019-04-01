<template>
    <div class="moviedetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>电影详情</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
            </div>
            <el-form :label-position="labelPosition" label-width="90px" class="moviedetail">
                <el-form-item label="影名:">
                    {{movieDetail.movieName}}
                </el-form-item>
                <el-form-item label="评分:">
                    {{movieDetail.praise}}
                </el-form-item>
                <el-form-item label="电影类型:">
                    {{movieDetail.fkTypeName}}
                </el-form-item>
                <el-form-item label="主演:">
                    {{movieDetail.starring}}
                </el-form-item>
                  <el-form-item label="影片时长:">
                    {{movieDetail.filmLength}}
                </el-form-item>
                <el-form-item label="影片图片:">
                    {{movieDetail.imgUrl}}
                </el-form-item>    
                   <el-form-item label="预告片:">
                    {{movieDetail.trailerUrl}}
                </el-form-item>    
                <el-form-item label="折扣:">
                    {{movieDetail.discount}}
                </el-form-item>
                <el-form-item label="票价:">
                    {{movieDetail.price}}
                </el-form-item>
                <el-form-item label="时间:">
                    {{movieDetail.startTime}}~{{movieDetail.endTime}}
                </el-form-item>
                <el-form-item label="电影描述:">
                    <div class="discrible"> {{movieDetail.describle}}</div>
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
        props: ['movieDetail'],
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