<script setup lang="ts">
import { computed } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProductRecommendations from '../components/ProductRecommendations.vue'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/products'

const cartStore = useCartStore()
const productStore = useProductStore()

const recommendedProducts = computed(() => {
  return productStore.bestSellers.slice(0, 4)
})

function updateQuantity(index: number, newQuantity: number) {
  cartStore.updateQuantity(index, newQuantity)
}

function removeItem(index: number) {
  cartStore.removeFromCart(index)
}
</script>

<template>
  <div>
    <Header />
    
    <main class="container-custom py-8">
      <h1 class="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div v-if="cartStore.items.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-xl text-gray-600 mb-4">Your cart is empty</p>
        <router-link to="/products" class="btn btn-primary">
          Continue Shopping
        </router-link>
      </div>
      
      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold">Cart Items ({{ cartStore.itemCount }})</h2>
            </div>
            
            <div class="divide-y divide-gray-200">
              <div 
                v-for="(item, index) in cartStore.items" 
                :key="`${item.product.id}-${index}`"
                class="p-6 flex flex-col sm:flex-row"
              >
                <div class="sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0">
                  <img 
                    :src="item.product.images[0] || 'https://via.placeholder.com/100x100?text=No+Image'" 
                    :alt="item.product.name"
                    class="w-full h-full object-cover rounded-md"
                  />
                </div>
                
                <div class="sm:ml-6 flex-1">
                  <div class="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 class="text-lg font-medium text-gray-800">
                        <router-link :to="`/products/${item.product.id}`" class="hover:text-primary">
                          {{ item.product.name }}
                        </router-link>
                      </h3>
                      
                      <div class="mt-1 text-sm text-gray-600 space-y-1">
                        <p v-if="item.selectedVariant">Color: {{ item.selectedVariant }}</p>
                        <p v-if="item.selectedSize">Size: {{ item.selectedSize }}</p>
                        <p>Price: ${{ item.product.price.toFixed(2) }}</p>
                      </div>
                    </div>
                    
                    <div class="mt-4 sm:mt-0">
                      <div class="flex items-center">
                        <button 
                          @click="updateQuantity(index, item.quantity - 1)"
                          class="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <input 
                          :value="item.quantity" 
                          @change="(e) => updateQuantity(index, parseInt((e.target as HTMLInputElement).value))"
                          type="number" 
                          min="1" 
                          class="w-12 h-8 border-y border-gray-300 text-center focus:outline-none"
                        />
                        <button 
                          @click="updateQuantity(index, item.quantity + 1)"
                          class="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      
                      <div class="mt-2 text-right">
                        <span class="font-medium">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-4 flex justify-end">
                    <button 
                      @click="removeItem(index)"
                      class="text-sm text-red-500 hover:text-red-700 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">$0.00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ (cartStore.totalPrice * 0.1).toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3 mt-3">
                <div class="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${{ (cartStore.totalPrice * 1.1).toFixed(2) }}</span>
                </div>
              </div>
            </div>
            
            <router-link 
              to="/checkout"
              class="w-full btn btn-primary flex items-center justify-center"
            >
              Proceed to Checkout
            </router-link>
            
            <div class="mt-4">
              <router-link 
                to="/products"
                class="w-full block text-center text-primary hover:underline"
              >
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recommended Products -->
      <div v-if="cartStore.items.length > 0">
        <ProductRecommendations 
          :products="recommendedProducts" 
          title="You Might Also Like"
        />
      </div>
    </main>
    
    <Footer />
  </div>
</template>