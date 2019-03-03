// import router from './router.js'; // 获取到路由列表
// import store from './store'; // 获取vuex中的store

// router.beforeEach((to, from, next)=>{
//     if(to.meta.requiresAuth){
//         // 若当前页面需要登录
//         if(store.state.adminName){
//             // 若vuex中存在用户的昵称，则说明当前有登录态
//             next();
//         } else {
//           // 去登录
//            router.push('/login');    
//          }
//     } else {
//         next();
//     }
// })