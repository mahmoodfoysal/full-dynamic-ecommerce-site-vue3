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
      path: '/registration',
      name: 'Registration',
      component: () => import('../components/authentication/SignUp/SignUp.vue')
    },
    {
      path: '/products/:id/:slug',
      name: 'ParentCategoryProducts',
      component: () => import('../components/pages/ProductsByCategoryWise/ProductByParentCategory.vue')
    }
  ]

const router =createRouter({
    
    history: createWebHistory(),
    routes, 
  })

  export default router