import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import NotFound from './views/NotFound.vue'
// 用户
import UserList from './views/UserList.vue'
import UserAdd from './views/UserAdd.vue'
// import UserDetail from './views/UserDetail.vue'
// import UserInfoEdit from './views/UserInfoEdit.vue'

// 电影信息
import movieList from './views/movieList.vue'
import movieAdd from './views/movieAdd.vue'
import MovieInfoEdit from './views/MovieInfoEdit.vue'

// 电影类型
import typeList from './views/typeList.vue'

// 影院
import cinemaList from './views/cinemaList.vue'
import cinemaAdd from './views/cinemaAdd.vue'

//评论
import commentList from './views/commentList.vue'

//订单管理
import orderList from './views/OrderList.vue'

// //管理员
import admin from './views/AdminAdd.vue'
import adminReset from './views/adminReset.vue'
import AdminList from './views/AdminList.vue'

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
      
        {path:'/movie/list',component:movieList},
        {path:'/movie/add',component:movieAdd},
        {path:'/movie/edit/:id',component:MovieInfoEdit},

        {path:'/movie/type',component:typeList},

        {path:'/cinema/list',component:cinemaList},
        {path:'/cinema/add',component:cinemaAdd},

        {path:'/comment/list',component:commentList},

        {path:'/orders/list',component:orderList},

        {path:'/admin',component:admin},
        {path:'/Admin/list',component:AdminList},
        {path:'/admin/reset',component:adminReset}
      ]
    },
    { path: '*', component: NotFound },
  ]
})
