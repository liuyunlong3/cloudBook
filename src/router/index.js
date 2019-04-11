import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    //[{},{}]没有tabbar页面
    {
      path: '/',
      name: 'layout',
      redirect: '/index',
      component: () => import('@/views/layout'),
      children:  [
        // [{},{}]这里是拥有tabbar的页面的地方
        {
        path: 'index',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/index')
       },
       {
         path: 'person',
         name: 'person',
         meta: {
           title: '个人中心'
         },
         component: () => import('@/views/person')
       }
    ]
    },
    {
      path: '/details/:id',//详情页面的动态路由
      name: 'details',//名称
      component: () => import('@/views/details'),//引用的视图文件
      meta: { 
        title: '书籍详情'
      }
    },
    {
      path:'/titles/:id', //目录的动态路由
      name: 'titles',//名称
      component: () => import('@/views/titles'),//引用目录的视图文件
      meta: {
        title: '目录'
      }
    },
    {
      path: '/article/:id',//文章的动态路由
      name: 'article',//这里可以和原生标签一样
      meta: {
        title: '文章详情'
      },
      component: () => import('@/views/article'),//引用文章详情的视图
    },
    {
      path: '/login', //登陆的动态路由,他是通过router-link中的to:'{name:login}'实现的
      name: 'login',
      meta: {
        title:'登陆'
      },
      component: () => import('@/views/login'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: () => import('@/views/register')
    },
    {
      path:'/changePerson',
      name: 'changePerson',
      meta: {
        title: '修改信息'
      },
      component: ()=> import('@/views/changePerson')
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        title: '测试'
      },
      component: ()=> import('@/views/test')
    }
  ]
})
router.beforeEach((to,from,next)=>{
  let title = to.meta.title;
  document.title = title
  next()
})
export default router