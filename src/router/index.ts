import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: "register",
      meta: {
        public: true
      },
      component: () => import('../views/Register.vue')
    },
    {
      path: '/login',
      name: "login",
      meta: {
        public: true
      },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (userStore.userStatus.phase === 'stale') {
    // no user api called
    // call user api
    await userStore.fetchAndStoreUser()
  }

  if (userStore.userStatus.phase === 'success') {
    // user already fetched successfully
    if(to.meta.public) {
      // for public pages, redirect to home page
      next('/')
    } else {
      // no need to redirect
      next();
    }
  } else if (userStore.userStatus.phase === 'error') {
    // user not logged in
    if(to.meta.public) {
      // no need to redirect
      next()
    } else {
      // redirect to login page
      next('/login')
    }
  }

})

export default router
