<template>
    <div>
        <el-card shadow='hover'>
            <div class="o-table">
                <div class="tableTitle" :style="tableStyle">{{tableDetail.tid}}号位：{{tableDetail.status | tableStatus}}</div>
                <el-button type='success' plain size='mini'>详情</el-button>
                <el-button type='danger' plain size='mini'>修改</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              tableStyle:'border:2px solid '
            }
        },
        props: ['tableDetail'],
        mounted() {
            if(this.tableDetail.status==1){
               this.tableStyle=this.tableStyle+'#67C23A';
            }else if(this.tableDetail.status==2){
               this.tableStyle=this.tableStyle+'#E6A23C';
            }else if(this.tableDetail.status==3){
               this.tableStyle=this.tableStyle+'#F56C6C';
            }else{
               this.tableStyle=this.tableStyle+'#909399';
            }
        },
    }
</script>
<style lang="scss">
    .el-card__body {
        text-align: center;
        .tableTitle {
            width: 70%;
            text-align: center;
            height: 40px;
            line-height: 40px;
            border: 1px solid #000;
            margin: 4px auto;
        }
    }
</style>