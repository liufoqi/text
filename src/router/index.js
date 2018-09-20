import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const components= {
  login: () => import('../views/login/login'),
  layout:()=>import('../views/layout/layout'),
  index:()=>import('../views/layout/index/index'),
  users:()=>import('../views/user/users/index'),
  usersDetail:()=>import ('../views/user/details/index'),
  addUsers:()=>import('../views/user/addUsers/index'),
  bookSoltList:()=>import('../views/book/bookSoltList/index'),
  addBookList:()=>import('../views/book/addBookList/index'),
  bookList:()=>import('../views/book/bookList/index'),
  addBook:()=>import('../views/book/addBook/index'),
  changeBookList:()=>import('../views/book/changeBookList/index'),
  readBook:()=>import('../views/book/readBook/index'),
  requestSwiper:()=>import('../views/swipers/requestSwiper'),
  addSwipers:()=>import('../views/Swipers/addSwipers'),
  changeSwiper:()=>import('../views/Swipers/changeSwiper'),
  changeBook:()=>import('../views/book/readBook/changeBook'),
  addSlotBook:()=>import('../views/book/addBook/addSlotBook')
}
 const Router=new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: components.login,
      // path:'/',
      // redirect:'/login',

    },
    // {
    // path:'/login',
    //   component: components.login
    // },
    {
      path:'/layout',
      component:components.layout,
      redirect:'/layout/index',
      meta:{
        title:'首页'
      },
      children:[
        {
          path:'index',
          component:components.index
        },
        {
          path:'users',
          meta:{
            title:'用户管理'
          },
          component:components.users
        },
        {
          meta:{
            title:'个人详情列表'
          },
          path:'usersDetail',
          component:components.usersDetail
        },{
          path:'addUsers',
          component:components.addUsers
        },{
          path:'bookSoltList',
          component:components.bookSoltList
        },{
        path:'addBookList',
          component:components.addBookList
        },{
         path:'bookList',
          component:components.bookList
        },{
          path:'addBook',
          component:components.addBook
        },{
           path:'changeBookList',
          component:components.changeBookList
          },
        {
          path:'readBook',
          component:components.readBook
        },{
             path:'requestSwiper',
          component:components.requestSwiper
        },{
          path:'addSwipers',
          name:'addSwipers',
          component:components.addSwipers
        },{
        path:'changeSwiper',
          component:components.changeSwiper
        },{
          name:'changeBook',
          path:'changeBook',
          component:components.changeBook
        },{
          name:'addSlotBook',
          path:'addSlotBook',
          component:components.addSlotBook
        }
        ]
    }
  ]
})
export default Router
