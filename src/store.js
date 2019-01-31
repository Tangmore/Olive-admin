import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminName:'',//当前登录的管理员名
    globalSettings:{ //项目的全局设置信息
      apiUrl:'http://127.0.0.1:8090'//初始默认值
    }
  },
  mutations: {
     setAdminName(state,value){
       state.adminName=value;
     },
     setGlobalSettings(state,value){
       state.globalSettings=value;
     }
  },
  actions: {

  }
})
