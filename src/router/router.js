import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    { 
        path: '/',
        name: 'Home', 
        component: () => import('../components/pages/Home/Home.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/authentication/Login/Login.vue')
    },
    {
      path: '/signUp',
      name: 'Registration',
      component: () => import('../components/authentication/SignUp/SignUp.vue')
    }
  ]

const router =createRouter({
    
    history: createWebHistory(),
    routes, 
  })

  export default router