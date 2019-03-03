import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    adminName: sessionStorage.getItem('adminName') ?
      JSON.parse(sessionStorage.getItem('adminName')) : null, //当前登录的管理员名
    globalSettings: { //项目的全局设置信息
      apiUrl: 'http://127.0.0.1:82/' //初始默认值
    }
  },
  mutations: {
    signin(state, adminName) {
      state.islogin = true;
      state.adminName = adminName;
      window.sessionStorage.setItem('adminName', JSON.stringify(state.adminName));
    },
    signout() {
      this.state.islogin = false;
      this.state.adminName = null;
      window.sessionStorage.removeItem('adminName');
    },
    setGlobalSettings(state, value) {
      state.globalSettings = value;
    }
  },
  actions: {

  }
})
