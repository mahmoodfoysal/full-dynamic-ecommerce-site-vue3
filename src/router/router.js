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
      path: '/parent-category/:id/:slug',
      name: 'ParentCategoryProducts',
      component: () => import('../components/pages/ProductsByCategoryWise/ProductByParentCategory.vue')
    },
    {
      path: '/sub-category/:id/:slug',
      name: 'SubCategoryProducts',
      component: () => import('../components/pages/ProductsByCategoryWise/ProductBySubCategory.vue'),
    },
    {
      path: '/sub-sub-category/:id/:slug',
      name: 'SubSubCategoryProducts',
      component: () => import('../components/pages/ProductsByCategoryWise/ProductBySubSubCategory.vue'),
    },
    {
      path: '/sub-sub-sub-category/:id/:slug',
      name: 'SubSubSubCategoryProducts',
      component: () => import('../components/pages/ProductsByCategoryWise/ProductsBySubSubSubCategory.vue')
    }

  ]

const router =createRouter({
    
    history: createWebHistory(),
    routes, 
  })

  export default router