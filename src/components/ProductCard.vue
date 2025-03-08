<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import type { Product } from '../types'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const selectedVariant = ref(props.product.variants.length > 0 ? props.product.variants[0].name : null)

function navigateToProduct() {
  router.push(`/products/${props.product.id}`)
}

function addToCart(event: Event) {
  event.stopPropagation()
  cartStore.addToCart(props.product, 1, selectedVariant.value, null)
}

function toggleWishlist(event: Event) {
  event.stopPropagation()
  wishlistStore.toggleWishlist(props.product)
}

function selectVariant(event: Event, variantName: string) {
  event.stopPropagation()
  selectedVariant.value = variantName
}
</script>

<template>
  <div 
    class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
    @click="navigateToProduct"
  >
    <div class="relative h-64 overflow-hidden">
      <img 
        :src="product.images[0] || 'https://via.placeholder.com/300x300?text=No+Image'" 
        :alt="product.name"
        class="w-full h-full object-cover"
      />
      <button 
        @click="toggleWishlist"
        class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5" 
          :class="wishlistStore.isInWishlist(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'"
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      </button>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-1 text-gray-800">{{ product.name }}</h3>
      <p class="text-primary font-bold mb-2">${{ product.price.toFixed(2) }}</p>
      
      <!-- Color Swatches -->
      <div v-if="product.variants.length > 0" class="flex space-x-2 mb-3">
        <button
          v-for="variant in product.variants"
          :key="variant.name"
          @click="(e) => selectVariant(e, variant.name)"
          class="w-6 h-6 rounded-full border-2 transition-all"
          :class="selectedVariant === variant.name ? 'border-primary' : 'border-gray-300'"
          :style="{ backgroundColor: variant.color }"
          :title="variant.name"
        ></button>
      </div>
      
      <div class="flex justify-between items-center mt-3">
        <button 
          @click="addToCart"
          class="btn btn-primary flex items-center"
          :disabled="!product.inStock"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>