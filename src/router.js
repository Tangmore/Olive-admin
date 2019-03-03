import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import NotFound from './views/NotFound.vue'
// 用户
import UserList from './views/UserList.vue'
import UserAdd from './views/UserAdd.vue'
import UserDetail from './views/UserDetail.vue'

// 电影信息
import movieList from './views/movieList.vue'
import movieAdd from './views/movieAdd.vue'
import movieDetail from './views/movieDetail.vue'

// 电影类型
import typeList from './views/typeList.vue'
import typeAdd from './views/typeAdd.vue'

// 影院
import cinemaList from './views/cinemaList.vue'
import cinemaAdd from './views/cinemaAdd.vue'

//评论
import commentList from './views/commentList.vue'
import commentDetail from './views/commentDetail.vue'

//订单管理
import orderList from './views/orderList.vue'
import orderDetail from './views/orderDetail.vue'

//管理员
import admin from './views/admin.vue'

Vue.use(Router)
//路由词典
export default new Router({
  routes: [
    { path: '/', redirect: '/main' },
    { path: '/login', component: Login },
    { 
      path: '/main', 
      component: Main,
      children: [
        {path:'',redirect:'/user/list'},        
        {path:'/user/list',component:UserList},
        {path:'/user/add',component:UserAdd},
        {path:'/user/detail',component:UserDetail},

        {path:'/movie/list',component:movieList},
        {path:'/movie/add',component:movieAdd},
        {path:'/movie/detail',component:movieDetail},

        {path:'/type/list',component:typeList},
        {path:'/type/add',component:typeAdd},

        {path:'/cinema/list',component:cinemaList},
        {path:'/cinema/add',component:cinemaAdd},

        {path:'/comment/list',component:commentList},
        {path:'/comment/detail',component:commentDetail},

        {path:'/orders/list',component:orderList},
        {path:'/orders/detail',component:orderDetail},

        {path:'/admin',component:admin}
      ]
    },
    { path: '*', component: NotFound },
  ]
})
