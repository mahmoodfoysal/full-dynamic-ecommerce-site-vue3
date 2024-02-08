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
    },
    {
      path: '/product-details',
      name: 'ProductDetails',
      component: () => import('../components/pages/ProductDetails/ProductDetails.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../components/pages/OrderSteps/ShoppingCart/ShoppingCart.vue')
    },
    {
      path: '/check-out',
      name: 'CheckOut',
      component: () => import('../components/pages/OrderSteps/CheckOut/CheckOut.vue')
    },
    {
      path: '/product-detail',
      name: 'ProductDetail',
      component: () => import('@/components/pages/ProductDetails/ProductDetails.vue')
    }

  ]

const router =createRouter({
    
    history: createWebHistory(),
    routes, 
    linkActiveClass: 'active-link'
  })

  export default router