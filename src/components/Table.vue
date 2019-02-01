<template>
    <div>
        <el-card shadow='hover'>
            <div class="o-table">
                <div class="tableTitle" :style="tableStyle">{{tableDetail.tid}}号位：{{tableDetail.status | tableStatus}}</div>
                <el-button type='success' plain size='mini' @click="showTableDetail">详情</el-button>
                <el-button type='danger' plain size='mini'>修改</el-button>
            </div>
        </el-card>

        <!-- 位置详情对话框 -->
        <el-dialog 
        :title="tableDetail.tid+'号位详情'" 
        :visible='dialogTableDetailVisible'
        :before-close='handleCloseDialog'
        >
        <el-tabs type='border-card' @tab-click='makeQrcode'>
            <el-tab-pane label='座位状态'>状态加载中...</el-tab-pane>
            <!-- 二维码 -->
            <el-tab-pane label='座位二维码'  class="qrCode">
                <!-- <canvas id="qrcanvas"></canvas> -->
                <img :src="qrcodeData"/>
            </el-tab-pane>
        </el-tabs>
            <div slot="footer">
                <el-button type='primary' @click="dialogTableDetailVisible=false">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              tableStyle:'border:2px solid ',
              dialogTableDetailVisible:false,
              qrcodeData:''
            }
        },
        props: ['tableDetail'],
        mounted() {
           this.getTableColor();
        },
        methods: {
            getTableColor(){
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
            showTableDetail(){
                this.dialogTableDetailVisible=true;
                //当前位置详情？？？？
            },
            //关闭对话框
            handleCloseDialog(){
                this.dialogTableDetailVisible=false;
            },
            // 绘制二维码 
            makeQrcode(){
                var qrcode=require('qrcode');
                //每个座位对应的url
                var tableUrl=this.$store.state.globalSettings.appUrl+'/#/'+this.tableDetail.tid;
                // 把绘制得到的图片二进制数据转换为base64字符编码
                qrcode.toDataURL(tableUrl,{
                   errorCorrectioinLevel:'H',
                   width:200 
                },(err,url)=>{
                    console.log('二维码数据绘制完成');
                    this.qrcodeData=url;
                })
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
            font-size: 14px;
        }
    }
    .el-dialog{
        .qrCode{
            text-align: center;
        }
    }
</style>