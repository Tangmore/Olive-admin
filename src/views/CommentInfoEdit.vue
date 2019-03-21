<template>
  <div class="userdetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论信息编辑</span>
        <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
      </div>
      <div class="main">
        <!-- 修改表单 -->
        <div class='editBox' style='width:80%'>
          <el-form :label-position="labelPosition" label-width="90px">
            <el-form-item label="用户名：">
                <el-input type="text" placeholder="请输入用户名" v-model="info.infoList.name"></el-input>
              </el-form-item>
       
            <el-form-item label="电影名：">
              <el-input type="text" placeholder="请输入电影名" v-model="info.infoList.name"></el-input>
            </el-form-item>
            <el-form-item label="评论：">
              <el-input type="text" placeholder="请输入评论" v-model="info.infoList.phone"></el-input>
            </el-form-item>
            <el-form-item label="爱好：">
              <el-input type="textarea" :autosize="{minRows:3}" resize='none' v-model="info.infoList.hobby" placeholder="请输入爱好..."></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align:center">
          <el-button type='primary' @click="doSubmit">保存</el-button>
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
          infoList: { name: '', phone: '', img: '', hobby: '' },
        },
        originUserInfo: [],
        labelPosition: 'right',
        uploadAction: this.$store.state.globalSettings.imgUrl + 'user/avatar',
        imageUrl: '',
        basePath: ""
      }
    },
    props: ['id'],
    methods: {
      // 验证上传图片的格式
      beforeImgUpload(file) {
        // console.log(file)
        var suffix = file.name.substring(file.name.lastIndexOf('.'));
        var isCorr = /\.(jpg|jpeg|png|gif)/.test(suffix);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isCorr) {
          this.$message.error('上传图片格式只能是gif、jpg、jpeg、png!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isCorr && isLt2M;
      },
      // 移除图片
      beforeRemove(file) {
        this.$confirm(`确定移除${file.name}`, '提示', { type: 'warning' })
          .then(() => {
            this.imageUrl = '';
            this.$message.success('图片删除成功，可重新选择！');
          })
          .catch(() => {
            this.$message.info('已经取消删除');
          })
      },
      //上传成功后 客户端得到响应消息
      handleSuccess(res, file) {
        this.basePath = res.fileName;
        this.info.infoList.img = res.fileName;
        //把上传的图片编码为DataURL字符串
        //  this.imageUrl=URL.createObjectURL(file.raw);
        this.imageUrl = this.$store.state.globalSettings.imgUrl + res.fileName;
      },
      //提交修改
      doSubmit() {
        var that=this;
        var url = this.$store.state.globalSettings.apiUrl + 'user/edit?id=' + this.id;
           this.axios.post(url,this.info.infoList)
              .then(res=>{
                this.$message.success('用户信息修改成功！');
                    this.changeIs();
                    this.$bus.$emit('changeUserInfo');
              })
              .catch(err=>{
                  this.$message.error('编辑用户失败！')
              })  
      },
      // 子传父----关闭弹出框
      changeIs() {
        this.info.infoList = {};
        this.$emit('tellEditShow', false);
      }
    },
    mounted() {
      // 初始化当前用户信息
      this.axios.get(this.$store.state.globalSettings.apiUrl + 'user/getById?id=' + this.id)
        .then(res => {

          let data = res.data.data;
          for (let i in data) {
            if (data[i] == null) {
              data[i] = '';
            }
          }
          this.info.infoList = data;
          // console.log(data.img)
          if (data.img) {
            this.imageUrl = this.$store.state.globalSettings.imgUrl + data.img;
          }
        })
        .catch(err => {
          this.$message.error('获取用户信息失败');
        })
    }
  }
</script>
<style lang="scss">
  .img-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409EFF;
      }
      .img {
        width: 170px;
        height: 170px;
        display: block;
      }
      .img-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 170px;
        height: 170px;
        line-height: 170px;
        text-align: center;
      }

    }
  }
</style>