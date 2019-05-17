<template>
    <div class="cinemadetail">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator='/'>
            <el-breadcrumb-item :to="{path:'/hall/list'}">影厅管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加影厅</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">

            <!-- 修改表单 -->
            <div class='editBox' style='width:70%;margin:30px auto;'>
                <el-form :label-position="labelPosition" label-width="100px" :model="info.infoList" :rules="rules" ref="ruleForm" center>
                    <el-form-item label="影厅名：" prop='hallName'>
                        <el-input type="text" placeholder="请输入影厅名" v-model="info.infoList.hallName"></el-input>
                    </el-form-item>

                    <el-form-item label="所属影院：" prop='fkCinemaId'>
                        <el-select v-model="info.infoList.fkCinemaId" clearable placeholder="请选择影院">
                            <el-option v-for="item in type_options" :key="item.id" :label="item.cinemaName" :value="item.id">
                                {{item.cinemaName}}
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="影厅座位：">
                        <el-col :span='9'>
                            <el-input type="text" placeholder="输入行数" v-model="info.infoList.line"></el-input>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span='9'>
                            <el-input type="text" placeholder="输入列数" v-model="info.infoList.col"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align:center">
                <el-button type='primary' @click="doSubmit('ruleForm')">保存</el-button>
                <el-button @click="changeIs" type='info' plain>取消</el-button>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info: {
                    infoList: { hallName: '', fkCinemaId: '', line: '', col: '' },
                },
                rules: {
                    hallName: [
                        { required: true, message: '请输入影厅名', trigger: 'blur' }
                    ],
                    fkCinemaId: [
                        { required: true, message: '请输入影院', trigger: 'blur' }
                    ],
                },
                labelPosition: 'right',
                type_options: [],
            }
        },
        props: ['id'],

        methods: {
            //提交
            doSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.info.infoList.line = Number(this.info.infoList.line);
                        this.info.infoList.col = Number(this.info.infoList.col);
                        var url = this.$store.state.globalSettings.apiUrl + 'managemodule/hall/addHall';
                        this.axios.post(url, this.info.infoList)
                            .then(res => {
                                this.$message.success(res.data.msg);
                                // this.$bus.$emit('changeCinemaInfo');
                                this.$router.push('/hall/list');
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
            },
            changeIs() {
                this.info.infoList = {};
            }

        },
        mounted() {
            //初始化影院下拉
            this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/cinema/selectAllCinema')
                .then(res => {
                    console.log(res);
                    this.type_options = res.data.rows;
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }


</script>
<style lang="scss">
</style>