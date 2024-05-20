import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';

const routes = [
    { 
      path: '/',
      name: 'Home', 
      component: () => import('../components/pages/Home/Home.vue'),
      // meta: { requiresAuth: true },
      
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../components/pages/Products/AllProducts/AllProducts.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/authentication/Login/Login.vue'),
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import('../components/authentication/SignUp/SignUp.vue')
    },
    {
      path: '/categorys/:id/:slug',
      name: 'CategoryProducts',
      component: () => import('../components/pages/ProductsByCategoryWise/CategoryWiseProduct.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../components/pages/OrderSteps/ShoppingCart/ShoppingCart.vue'),
    },
    {
      path: '/check-out',
      name: 'CheckOut',
      component: () => import('../components/pages/OrderSteps/CheckOut/CheckOut.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/product-detail/:id/:slug',
      name: 'ProductDetail',
      component: () => import('@/components/pages/Products/ProductDetails/ProductDetails.vue')
    },
    {
      path: '/buy-product/:id',
      name: 'BuyProduct',
      component: () => import('/src/components/pages/OrderSteps/BuyProduct/BuyProduct.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../components/pages/NotFound/NotFound.vue')
    }
  ]

const router =createRouter({
    history: createWebHistory(),
    routes, 
    linkActiveClass: 'active-link'
  })

  router.beforeEach((to, from, next) => {
    const auth = getAuth();
    if (to.meta.requiresAuth) {
      if (auth.currentUser) {
        next();
      } 
      else {
        next('/login');
      }
    } else {
      next();
    }
  });

  export default router