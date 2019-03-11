<template>
    <div class="userdetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户详情</span>
                <el-button 
                style="float: right; padding: 3px 0" 
                type="text"
                 icon='el-icon-close'
                 @click='changeIs'></el-button>
            </div>
            <div>
               <p><span>用户名：</span>{{userDetail.name}}</p> 
               <p><span>头像：</span>{{userDetail.img}}</p> 
               <p><span>手机号：</span>{{userDetail.phone}}</p> 
               <p><span>爱好：</span>{{userDetail.hobby}}</p> 
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: ['userDetail'],
        methods:{
            changeIs(){
               this.$emit('tellShow',false); 
            }
        }
    }
</script>
<style lang="scss">
    .userdetail p{
        margin-top: 10px;
    }
</style>