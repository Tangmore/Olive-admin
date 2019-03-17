<template>
    <div class="main">
      <!-- 修改表单 -->
      <el-form :label-position="labelPosition" label-width="90px" style='width:80%;margin:30px auto;'>
        <el-form-item label="影名：">
          <!-- {{info.infoList.name}} -->
          <el-input type="text" style="width: 74%" placeholder="请输入电影名" v-model="info.infoList.name" ></el-input>
        </el-form-item>
  
        <el-form-item label="影片：">
          <el-upload class="img-uploader" :action="uploadAction" :show-file-list='true' :before-upload='beforeImgUpload' :before-remove='beforeRemove'
            :on-success='handleSuccess' name='dishImg' :limit='3'>
            <!-- <img  src="" class="img"> -->
            <i class="el-icon-plus img-uploader-icon"></i>
            <span slot="tip" class="el-upload__tip" style="margin-left: 20px">只能上传gif/jpg/jpeg/png,且不能超过500kb</span>
          </el-upload>
        </el-form-item>
    
  
        <el-form-item label="类型：">
          <!-- <el-radio-group @change="handleRadioChange" v-model="info.infoList.typename">
                      <el-radio v-for="(d,i) of dishList" :key="i" :label="d.cid">{{d.cname}}</el-radio>
                    </el-radio-group> -->
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="影院：" prop="type">
            <el-select v-model="value4" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
        </el-form-item>
  
        <el-form-item label="票价：">
          <!-- <el-input type="text" placeholder="请输入菜品价格" v-model="info.infoList.price"></el-input> -->
          <!-- <el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number> -->
          <el-input-number size="medium" v-model="num5"></el-input-number>
        </el-form-item>
        <el-form-item label="时间：">
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择日期" v-model='info.infoList.start_time' style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择日期" v-model='info.infoList.end_time' style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="主演：">
            <!-- {{info.infoList.starring}} -->
            <!-- <el-input type="text" placeholder="请输入电影主演" v-model="info.infoList.starring"></el-input> -->
            <el-input type="textarea" style="width:74%" :autosize="{minRows:3}" resize='none'
             v-model="info.infoList.starring" placeholder="请输入电影主演"></el-input>
        </el-form-item>
          </el-form-item>
        <el-form-item label="描述：">
          <el-input type="textarea" style="width:74%" :autosize="{minRows:3}" resize='none' v-model="info.infoList.describle" placeholder="请输入电影简介"></el-input>
        </el-form-item>
        <div style="text-align: center;margin-right: 100px;">
        <el-button type='primary' @click="doSubmit">提交</el-button>
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
              name: '', typename: '', describle: '', starring: '',
              price: '', start_time: '', end_time: ''
            },
          },
          cinemaObj: [],
          originmovieInfo: [],
          labelPosition: 'right',
          uploadAction: this.$store.state.globalSettings.imgUrl + 'movie/avatar',
          imageUrl: '',
          basePath: "",
          value4: "",
          options: [{
            value: '选项1',
            label: '黄金糕'
          }]
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
          var id = this.$route.params.id;
          // cnnsole.log(111111)
          var url = this.$store.state.globalSettings.apiUrl + 'movie/edit?id=' + id;
          this.axios.post(url, this.info.infoList)
            .then(res => {
              this.$message.success('电影信息修改成功！');
              this.$router.push('/movie/list');
            })
            .catch(err => {
              this.$message.error('编辑电影失败！')
            })
        }
      },
      mounted() {
        // 初始化当前电影信息
        var id = this.$route.params.id;
        this.axios.get(this.$store.state.globalSettings.apiUrl + 'movie/getById?id=' + id)
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
            this.$message.error('获取电影信息失败');
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
    .el-col-1{
      text-align: center
  }
  </style>