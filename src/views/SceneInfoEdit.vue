<template>
    <div class="main">
        <!-- 修改表单 -->
        <el-form :label-position="labelPosition" label-width="100px" style='width:80%;margin:30px auto;' :model="info.infoList" :rules="rules"
            ref="ruleForm" center>
            <el-form-item label="时间：" prop='startTime'>
                <el-col :span="7">
                    <el-date-picker type="datetime" placeholder="开始时间" v-model='info.infoList.startTime' value-format='yyyy-MM-dd HH:mm:ss' :picker-options='pickerOption'
                        style="width: 100%;" @change='getMovieEnd'></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="电影：">
                {{info.infoList.fkMovieName}}
            </el-form-item>

            <el-form-item label="影院：" prop='fkCinemaId'>
                <el-select v-model="info.infoList.fkCinemaId" @change='initHall' clearable placeholder="请选择影院">
                    <el-option v-for="item in cinema_options" :key="item.id" :label="item.cinemaName" :value="item.id">
                        {{item.cinemaName}}
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="影厅：" prop='fkHallId'>
                <el-select v-model="info.infoList.fkHallId" clearable placeholder="请选择影厅">
                    <el-option v-for="item in hall_options" :key="item.id" :label="item.hallName" :value="item.id">
                        {{item.hallName}}
                    </el-option>
                </el-select>
            </el-form-item>

            <div style="text-align: center;margin-right: 100px;">
                <el-button type='primary' @click="doSubmit('ruleForm')">提交</el-button>
                <el-button @click="doCancel" type='info' plain>取消</el-button>
            </div>
        </el-form>

    </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                info: {
                    infoList: {

                    },
                },
                rules: {
                    startTime: [
                        { required: true, message: '请输入场次开始时间', trigger: 'blur' }
                    ],
                    fkCinemaId: [
                        { required: true, message: '请选择影院', trigger: 'blur' }
                    ],
                    fkHallId: [
                        { required: true, message: '请选择影厅', trigger: 'blur' }
                    ],
                },
                labelPosition: 'right',
                cinema_options: [],
                hall_options: [],
                pickerOption: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                }

            }
        },
        props: ['id'],
        mounted() {
            // 初始化当前电影信息     
            this.initTable();
            // this.initCinema();     
            //初始化影院
            this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/cinema/selectAllCinema')
                .then(res => {
                    console.log(res);
                    this.cinema_options = res.data.rows;

                })
                .catch(err => {
                    console.log(err);
                });
        },
        methods: {
            // initCinema() {

            // },
            // 获取电影结束时间
            getMovieEnd(val) {
                var startTime = String(val);
                var url = this.$store.state.globalSettings.apiUrl + 'managemodule/movie/resultEndTime';
                var id = this.$route.params.id;
                var data = { movieId: id, startTime: startTime };
                this.axios({
                    method: 'GET',
                    url: url,
                    params: data
                })
                    .then(res => {
                        this.info.infoList.endTime = res.data.row;
                        // console.log(res)
                    })
            },
            initHall(val) {
                //初始化影厅
                this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/hall/selectByCinemaId?map[fkCinemaId]=' + val)
                    .then(res => {
                        console.log(res);
                        this.hall_options = res.data.rows;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            initTable() {
                var id = this.$route.params.id;
                this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/scene/selectDetailScene?id=' + id)
                    .then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            this.info.infoList = res.data.row;
                            this.initHall(res.data.row.fkCinemaId);
                            //this.info.infoList.fkCinemaId=parseInt(this.info.infoList.fkCinemaId);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //提交修改
            doSubmit(formName) {
                var id = this.$route.params.id;
                var url = this.$store.state.globalSettings.apiUrl + 'managemodule/scene/updateScene?id=' + id;
                var data = {
                    startTime: this.info.infoList.startTime,
                    endTime: this.info.infoList.endTime,
                    fkMovieId: this.info.infoList.fkMovieId,
                    fkCinemaId: this.info.infoList.fkCinemaId,
                    fkHallId: this.info.infoList.fkHallId
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post(url, data)
                            .then(res => {
                                this.$message.success(res.data.msg);
                                this.$router.push('/scene/list');
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })

            },
            doCancel() {
                // this.initTable();
                this.$router.push('/scene/list');
            }
        }
    }
</script>
<style lang="scss">
    .el-col-1 {
        text-align: center
    }
</style>