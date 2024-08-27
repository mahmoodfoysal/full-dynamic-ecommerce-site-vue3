import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

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
      path: '/dashboard/home',
      name: 'DashboardHome',
      component: () => import('/src/components/dashboard/index.vue'),
      redirect: '/dashboard/home/dashboard',
      // meta: { requiresAuth: true, requiresAdminCheck: true },
      children: [
        {
          path: 'dashboard',
          name: 'DashboardHomeDefault',
          component: () => import('/src/components/dashboard/Features/DashboardHome/DashboardHome.vue'),
        },
        {
          path: 'admin',
          name: 'Admin',
          component: () => import('/src/components/dashboard/Features/Admin/Admin.vue'),
          // meta: { requiresAuth: true },
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import('/src/components/dashboard/Features/Category/Category.vue'),
          // meta: { requiresAuth: true },
        },
        {
          path: 'image-category',
          name: 'ImageCategory',
          component: () => import('/src/components/dashboard/Features/ImageCategory/ImageCategory.vue'),
          // meta: { requiresAuth: true },
        }
      ]
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

  router.beforeEach(async (to, from, next) => {
    const auth = getAuth();

    if (to.meta.requiresAuth) {
        const user = auth.currentUser;

        if (user) {
            // Check if the route requires an admin check
            if (to.meta.requiresAdminCheck) {
                try {
                    // Make an API call to your backend to check if the user is an admin
                    const response = await axios.get(`http://localhost:5000/admin/${user.email}`);
                    if (response.data.admin) {
                        next(); // Allow access if user is an admin
                    } else {
                        next('/login'); // Redirect to login if not an admin
                    }
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    next('/login'); // Redirect to login if there's an error
                }
            } else {
                next(); // Allow access if no admin check is needed
            }
        } else {
            next('/login'); // Redirect to login if user is not authenticated
        }
    } else {
        next(); // Allow access to routes that don't require authentication
    }
});

  export default router