<template>
  <div class="contentDomain">
    <!-- 面包屑导航 -->
        <el-breadcrumb separator='/'>
            <el-breadcrumb-item :to="{path:'/main'}">电影管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加电影</el-breadcrumb-item>
        </el-breadcrumb>

    <!-- 修改表单 -->
    <el-form :label-position="labelPosition" label-width="100px" 
    style='width:80%;margin:30px auto;' :model="info.infoList" 
    :rules="rules" ref="ruleForm" center>
      <el-form-item label="影名：" prop="movieName">
        <el-input type="text" placeholder="请输入电影名称" v-model="info.infoList.movieName"></el-input>
      </el-form-item>

      <el-form-item label="主演：" prop='starring'>
        <el-input type="text" placeholder="请输入电影主演" v-model="info.infoList.starring"></el-input>
      </el-form-item>
      <el-form-item label="电影类型：" prop="fkTypeId">
        <el-select v-model="info.infoList.fkTypeId" clearable placeholder="请选择电影类型">
          <el-option v-for="item in type_options" :key="item.id" :label="item.typeName" :value="item.id">
            {{item.typeName}}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="影片图片：" prop='imgUrl'>
        <el-upload class="img-uploader" :action="uploadAction" :show-file-list='true' :before-upload='beforeImgUpload' :before-remove='beforeRemove'
          :on-success='handleSuccess' :limit='1'>
          <i class="el-icon-plus img-uploader-icon"></i>
          <!-- <span slot="tip" class="el-upload__tip" style="margin-left: 20px">只能上传gif/jpg/jpeg/png,且不能超过500kb</span> -->
        </el-upload>
      </el-form-item>

      <el-form-item label="预告片：" prop='trailerUrl'>
        <el-upload class="avatar-uploader" :action="videoUrl" accept='.mp4,.ogg,.webm' :show-file-list="true" :before-upload="beforeUploadVideo"
          :on-success="handleVideoSuccess" :on-progress="uploadVideoProcess">
          <video v-if="Video !='' && videoFlag == false" :src="Video" width="350" height="180" controls="controls"></video>
          <i class="el-icon-plus avatar-uploader-icon"></i>
         <!-- <span slot="tip" class="el-upload__tip" style="margin-left: 20px">（可选）</span> -->
        </el-upload>
      </el-form-item>

      <el-form-item label="影片时长:" prop='filmLength'>
        <el-input-number size="medium" controls-position="right" 
        v-model="info.infoList.filmLength" :min='0'></el-input-number>
      </el-form-item>
      <el-form-item label="折扣：" prop='discount'>
        <el-input-number size="medium" controls-position="right" 
        v-model="info.infoList.discount" 
        :step='0.1' :min='0' :max='1'></el-input-number>
      </el-form-item>
      <el-form-item label="票价：" prop='price'>
          <el-input-number size="medium" controls-position="right" 
          v-model="info.infoList.price"
           :min='0' :step='2'></el-input-number>
      </el-form-item>
      <el-form-item label="时间：" prop='startTime'>
        <el-col :span="7">
          <el-date-picker type="datetime" placeholder="选择日期" v-model='info.infoList.startTime' 
          value-format='yyyy-MM-dd HH:mm:ss' 
          :picker-options="satrtpickerOption"
          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="7">
          <el-date-picker type="datetime" placeholder="选择日期" v-model='info.infoList.endTime' value-format='yyyy-MM-dd HH:mm:ss'
          :picker-options="endpickerOption"
           style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="电影描述：" prop='describle'>
        <el-input type="textarea" style="width:74%" :autosize="{minRows:3}" resize='none' v-model="info.infoList.describle" placeholder="请输入电影简介"></el-input>
      </el-form-item>
      <!-- <div style="text-align: center;margin-right: 100px;">
        <el-button type='primary' @click="doSubmit">提交</el-button>
        <el-button @click="doCancel" type='info' plain>取消</el-button>
      </div> -->
    <el-form-item>
      <el-button type='primary' @click="doSubmit('ruleForm')">提交</el-button>
      <el-button @click="doCancel" type='info' plain>取消</el-button>
    </el-form-item>
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
            movieName: '',
            fkTypeId: '', starring: '',
            filmLength: '', imgUrl: '',
            trailerUrl: '', discount: '',
            price: '', startTime: '',
            endTime: '', describle: ''
          },

        },
        rules: {
          movieName: [
            { required: true, message: '请输入电影名称', trigger: 'blur' }
          ], 
          // fkTypeId: [
          //   { required: true, message: '请输入电影类型', trigger: 'blur' }
          // ],
          starring: [
            { required: true, message: '请输入电影主演', trigger: 'blur' }
          ],   
          filmLength: [
            { required: true, message: '请输入电影时长', trigger: 'blur' }
          ], 
          imgUrl: [
            { required: true, message: '请输入电影图片', trigger: 'blur' }
          ],
          discount: [
            { required: true, message: '请输入电影折扣', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入电影价格', trigger: 'blur' }
          ],
          describle: [
            { required: true, message: '请输入电影描述', trigger: 'blur' }
          ],
        },
        videoFlag: false,      //刚开始的时候显示为flase
        videoUploadPercent: '0%',  //进度条刚开始的时候为0%
        Video: '',

        labelPosition: 'right',
        uploadAction: this.$store.state.globalSettings.apiUrl + 'filemodule/file/uploadFile',
        videoUrl: this.$store.state.globalSettings.apiUrl + 'filemodule/file/uploadVideo',
        basePath: "",
        // value4: "",
        type_options: [],
        cinema_options: [],
        cinemaArr: [],
        imgArr: [],

          satrtpickerOption: {
          disabledDate:(time)=> {
            if (this.info.infoList.endtTime) {
              return (time.getTime() >new Date(this.info.infoList.endtTime).getTime() );
            }
            return time.getTime() < Date.now();
          }
        },
        endpickerOption: {
          disabledDate:(time)=> {
            if (this.info.infoList.startTime) {
              return (time.getTime() <new Date( this.info.infoList.startTime).getTime());
            }
          }
        }
      }
    },
    props: ['id'],
    mounted() {
      //初始化电影类型下拉
      this.axios.get(this.$store.state.globalSettings.apiUrl + 'managemodule/type/selectAllType')
        .then(res => {
          console.log(res);
          this.type_options = res.data.rows;

        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      beforeUploadVideo(file) {          //视频上传之前判断他的大小
        const isLt10M = file.size / 1024 / 1024 < 2000;
        if (!isLt10M) {
          this.$message.error('上传视频大小不能超过2000MB哦!');
          return false;
        }
      },
      uploadVideoProcess(event, file, fileList) {    //视频上传的时候获取上传进度传给进度条
        this.videoFlag = true;
        this.videoUploadPercent = parseInt(file.percentage);
        console.log(this.videoUploadPercent)
      },
      handleVideoSuccess(res, file) {           //视频上传成功之后返回视频地址
        console.log(res.row)
        this.$message.success(res.msg);
        this.info.infoList.trailerUrl = res.row;
      },

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
            this.$message.success('图片删除成功，可重新选择！');
          })
          .catch(() => {
            this.$message.info('已经取消删除');
          })
      },
      //上传成功后 客户端得到响应消息
      handleSuccess(res, file) {
        // console.log(res)
        this.$message.success(res.msg);
        this.info.infoList.imgUrl = res.row;
      },
      //提交修改
      doSubmit(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            // alert('submit');
              var id = this.$route.params.id;
              var url = this.$store.state.globalSettings.apiUrl + 'managemodule/movie/addMovie';
              this.axios.post(url, this.info.infoList)
                .then(res => {
                  this.$message.success(res.data.msg);
                  this.$router.push('/movie/list');
                })
                .catch(err => {
                  console.log(err);
                })
          }
        })
       
      },
      doCancel() {
        this.initTable();
      }
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
      .img-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }

      .el-upload__tip {
        margin-top: 0 !important;
      }
    }
  }

  .el-col-1 {
    text-align: center
  }
</style>