import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// axios.defaults.baseURL='http://127.0.0.1:8090/';

Vue.config.productionTip = false;
Vue.use(ElementUI)  //注册ElementUI
Vue.prototype.axios=axios;

//创建全局过滤器
function formatNumber(n){
  n=n.toString();
  return n[1]?n:'0'+n;
}
Vue.filter('date',(val)=>{
  //把bigint转换为yyyy-mm-dd
   var date=new Date(val);
   var yy=date.getFullYear();
   var mm=date.getMonth()+1;
   var dd=date.getDay();
  //  mm=mm>9?mm:'0'+mm;
  //  dd=dd>9?dd:'0'+dd;
  var formatdate=[mm,dd].map(formatNumber).join('-');
  return yy+'-'+formatdate;
})
Vue.filter('dataTime',(val)=>{
  //把bigint转换为yyyy-mm-dd hh:mm:ss
  var date=new Date(val);
  var yy=date.getFullYear();
  var mm=date.getMonth()+1;
  var dd=date.getDay();
  var hh=date.getHours();
  var mi=date.getMinutes();
  var ss=date.getSeconds();
  // mm=mm>9?mm:'0'+mm;
  // dd=dd>9?dd:'0'+dd;
  // hh=hh>9?hh:'0'+hh;
  // mi=mi>9?mi:'0'+mi;
  // ss=ss>9?ss:'0'+ss;
  var formatdate=[mm,dd].map(formatNumber).join('-');
  var formattime=[hh,mi,ss].map(formatNumber).join(':');
  return yy+'-'+formatdate+' '+formattime;
})
Vue.filter('currency',(val)=>{
  //把int转换为xx.yy
  return '￥'+ val.toFixed(2);
})
//座位状态转换
Vue.filter('tableStatus',(val)=>{
  if(val==1) return '空闲';
  if(val==2) return '预定';
  if(val==3) return '占用';
  else return '其他';
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
