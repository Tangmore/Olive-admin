<template>
  <div class="cinemadetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>影厅详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-close' @click='changeIs'></el-button>
      </div>
      <div class="main">
        <!-- 修改表单 -->
        <div class='editBox' style='width:80%'>
          <el-form :label-position="labelPosition" label-width="90px">
            <el-form-item label="场次时间：">
              {{info.infoList.startTime}}~{{info.infoList.endTime}}
            </el-form-item>
            <el-form-item label="电影：">
              {{info.infoList.fkMovieName}}
            </el-form-item>
            <el-form-item label="影院：">
              {{info.infoList.fkCinemaName}}
            </el-form-item>
             <el-form-item label="影厅：">
              {{info.infoList.fkHallName}}
            </el-form-item>
          </el-form>
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
          infoList: { startTime: '',endTime:'', fkMovieName:'',fkCinemaName: '',fkHallName:'' },
        },
        labelPosition: 'right'
      }
    },
    props: ['id'],
    methods: {
      // 子传父----关闭弹出框
      changeIs() {
        this.info.infoList = {};
        this.$emit('tellShow', false);
      }
    },
    mounted() {
      // 初始化当前影院信息
      this.axios.get(this.$store.state.globalSettings.apiUrl + 
      'managemodule/scene/selectDetailScene?id=' + this.id)
        .then(res => {
          this.info.infoList = res.data.row;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>
<style lang="scss">

</style>