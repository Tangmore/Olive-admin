<template>
    <div class="main">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator='/'>
            <el-breadcrumb-item :to="{path:'/main'}">管理员</el-breadcrumb-item>
            <el-breadcrumb-item>管理员添加</el-breadcrumb-item>

        </el-breadcrumb>
        <!-- <el-button style="margin-bottom:10px;margin-top:20px" :disabled='isadminAdd' type='primary' size='small' plain @click="Ackname">添加管理员信息</el-button> -->
        <!-- 修改表单 -->
        <div class='addForm' >
            <div class='editBox' style='width:70%;margin:30px auto;'>
                <el-form label-width="100px" class="demo-ruleForm"
                :model="userInfo" :rules="rules" ref="ruleForm" center >
                    <el-form-item label="管理员名：" prop="userName">
                        <el-input type="text" placeholder='请输入管理员名'  v-model="userInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop='password'>
                        <el-input type="password" placeholder="请输入密码" v-model="userInfo.password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align:center;margin-top: 40px;">
                <el-button type='primary' @click="doSubmit('ruleForm')">保存</el-button>
                <el-button @click="doCancel" type='info' plain>取消</el-button>
            </div>
        </div>
    </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                userInfo: {
                    userName: '',
                    password: ''
                },
                   rules: {
                    userName: [
                        { required: true, message: '请输入管理员名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入操作密码', trigger: 'blur' }
                    ]
                },
                originUserInfo: {},
                labelPosition: 'right',
            }
        },
        methods: {
            //确认添加
            doSubmit(formName) {
                  this.$refs[formName].validate((valid) => {
                    if (valid) {
                       var url = this.$store.state.globalSettings.apiUrl + 'managemodule/admin/addAdmin';
                        this.axios({
                            method: 'POST',
                            url: url,
                            headers: { 'TLADMIN': sessionStorage.getItem('token') },
                            data: this.userInfo
                        })
                            .then(res => {
                                // console.log(res);
                                if (res.status == 200) {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'success',
                                        duration: 1000
                                    });
                                    this.userInfo = {};
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
            },
            doCancel() {
                this.userInfo = {}
            },
        }
    }

</script>
<style lang="scss">
</style>