<template>
    <div class="cinemadetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>影厅信息编辑</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
            </div>
            <div class="main">
                <!-- 修改表单 -->
                <div class='editBox' style='width:80%'>
                    <el-form :label-position="labelPosition" 
                    label-width="90px" :model="info.infoList" :rules="rules" ref="ruleForm" center>
                        <el-form-item label="影厅名：" prop='hallName'>
                            <el-input type="text" placeholder="请输入影厅名" v-model="info.infoList.hallName"></el-input>
                        </el-form-item>

                        <el-form-item label="所属影院：">
                            {{info.infoList.fkCinemaName}}
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
        </el-card>
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
                    ]
                },
                labelPosition: 'right',
                type_options: [],
            }
        },
        props: ['id'],

        methods: {
            //提交修改
            doSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.info.infoList.line = Number(this.info.infoList.line);
                        this.info.infoList.col = Number(this.info.infoList.col);
                        var url = this.$store.state.globalSettings.apiUrl + 'managemodule/hall/updateHall?id=' + this.id;
                        this.axios.post(url, this.info.infoList)
                            .then(res => {
                                this.$message.success(res.data.msg);
                                this.$bus.$emit('changeCinemaInfo');
                                this.changeIs();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
            },
            // 子传父----关闭弹出框
            changeIs() {
                this.info.infoList = {};
                this.$emit('tellEditShow', false);
            }
        },
        mounted() {
            // 初始化当前影院信息
            this.axios.get(this.$store.state.globalSettings.apiUrl +
                'managemodule/hall/selectById?id=' + this.id)
                .then(res => {
                    console.log(res)
                    this.info.infoList = res.data.row;
                })
                .catch(err => {
                    console.log(err);
                }),

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