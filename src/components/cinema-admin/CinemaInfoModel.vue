<template>
    <div class="moviedetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>电影详情</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
            </div>
            <el-form :label-position="labelPosition" label-width="90px" class="moviedetail">
                <el-form-item label="影名:">
                    {{movieDetail.name}}
                </el-form-item>
                <el-form-item label="类型:">
                    {{movieDetail.typename}}
                </el-form-item>
                <el-form-item label="主演:">
                    {{movieDetail.starring}}
                </el-form-item>
                <el-form-item label="评分:">
                    {{movieDetail.praise}}
                </el-form-item>
                <el-form-item label="影院:">
                    {{movieDetail.cinemaname}}
                </el-form-item>
                <el-form-item label="票价:">
                    {{movieDetail.name}}
                </el-form-item>
                <el-form-item label="时间:">
                    {{movieDetail.start_time | date}}~{{movieDetail.end_time | date}}
                </el-form-item>
                <el-form-item label="描述:">
                    {{movieDetail.describle}}
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
    .moviedetail .el-form-item {
        margin-bottom: 0;
    }
</style>