import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductListing from '../views/ProductListing.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: ProductListing
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetail,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    }
  ]
})

export default router