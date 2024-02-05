import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import SignupView from "@/views/login/SignupView.vue";
import FindPassView from "@/views/login/FindPassView.vue";
import {useMainStore} from "@/store/store";
import axios from "axios";
import {snackbar} from "mdui";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path:'/findpass',
      name:'findpass',
      component:FindPassView
    },
    {
      path:'/logout',
      name:'logout',
      component:()=>import('@/views/login/LogoutView.vue')
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:()=>import('@/views/dashboard/DashMainView.vue'),
      children:[
      ],
    },
    {
      path:'/search',
      name:'search',
      component:()=>import('@/views/search/SearchMainView.vue'),
      children:[
        {
          path: '/search/background_info',
          name: '背景挖掘',
          component: () => import('@/views/search/BackgroundInfoView.vue'),
          children:[
            {
                path:'/search/background_info/:keyword',
                name:'背景挖掘结果',
                component:()=>import('@/views/search/BackgroundInfoListView.vue')

            }
          ]
        },
        {
          path:'/search/events_analysis',
          name:'事件分析',
          component:()=>import('@/views/search/EventsAnalysisView.vue')
        }
      ]
    }
  ]
})

export default router

// 路由守卫实现登录验证
router.beforeEach((to, from, next) => {

  // 从store中获取用户信息
  const userInfo = useMainStore().userInfo;
  const userStatus = useMainStore().userStatus;


  if (userStatus.isLogin && userInfo.token) {
    // 若为登陆状态，不放行的页面有：登录、注册、找回密码，其他页面放行
    console.debug('路由守卫：登录状态')
    if (to.path === '/login' || to.path === '/signup' || to.path === '/findpass') {
      next('/dashboard');
    } else {
      next();
    }

  } else {
    // 没token或非登录状态（只有token也不行，必须store的userState.isLogin===true）
    // 将store中的用户信息清除
    userStatus.isLogin = false;
    userInfo.id = 0;
    userInfo.token = "";
    userInfo.username = "";
    userInfo.email = "";
    userInfo.isSuperuser = false;
    userInfo.isStaff = false;
    userInfo.isActive = false;
    userInfo.dateJoined = "";
    userInfo.lastLogin = "";
    // 清除localStorage中的用户信息
    localStorage.removeItem('token');
    // 对于没有token或非登录状态的情况，直接放行的页面有：登录、注册、找回密码，其他页面重定向到登录页
    console.debug('路由守卫：没有token或非登录状态')
    if (to.path === '/login' || to.path === '/signup' || to.path === '/findpass') {
      // 登录、注册、找回密码页面不需要登录，直接放行
      next();
    } else {
      // 其他页面需要登录，重定向到登录页
      next('/login');
    }
  }
});

