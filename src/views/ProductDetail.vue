<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProductRecommendations from '../components/ProductRecommendations.vue'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const productId = computed(() => route.params.id as string)
const product = computed(() => productStore.getProductById(productId.value))
const relatedProducts = computed(() => product.value ? productStore.getRelatedProducts(product.value) : [])

const selectedImage = ref(0)
const quantity = ref(1)
const selectedVariant = ref('')
const selectedSize = ref('')

onMounted(() => {
  if (!product.value) {
    router.push('/products')
    return
  }
  
  if (product.value.variants.length > 0) {
    selectedVariant.value = product.value.variants[0].name
  }
  
  if (product.value.sizes.length > 0) {
    selectedSize.value = product.value.sizes[0]
  }
})

function addToCart() {
  if (product.value) {
    cartStore.addToCart(
      product.value, 
      quantity.value, 
      selectedVariant.value || null, 
      selectedSize.value || null
    )
  }
}

function toggleWishlist() {
  if (product.value) {
    wishlistStore.toggleWishlist(product.value)
  }
}

function incrementQuantity() {
  quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}
</script>

<template>
  <div>
    <Header />
    
    <main v-if="product" class="container-custom py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Product Images -->
        <div class="lg:w-1/2">
          <div class="bg-white rounded-lg overflow-hidden mb-4">
            <img 
              :src="product.images[selectedImage] || 'https://via.placeholder.com/600x600?text=No+Image'" 
              :alt="product.name"
              class="w-full h-auto object-cover aspect-square"
            />
          </div>
          
          <div v-if="product.images.length > 1" class="flex space-x-2 overflow-x-auto pb-2">
            <button 
              v-for="(image, index) in product.images" 
              :key="index"
              @click="selectedImage = index"
              class="w-20 h-20 rounded-md overflow-hidden border-2 transition-colors"
              :class="selectedImage === index ? 'border-primary' : 'border-gray-200'"
            >
              <img 
                :src="image" 
                :alt="`${product.name} - Image ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
        
        <!-- Product Details -->
        <div class="lg:w-1/2">
          <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
          <p class="text-2xl font-bold text-primary mb-4">${{ product.price.toFixed(2) }}</p>
          
          <div class="mb-6">
            <p class="text-gray-700">{{ product.description }}</p>
          </div>
          
          <!-- Color Variants -->
          <div v-if="product.variants.length > 0" class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Color</h3>
            <div class="flex space-x-3">
              <button
                v-for="variant in product.variants"
                :key="variant.name"
                @click="selectedVariant = variant.name"
                class="w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center"
                :class="selectedVariant === variant.name ? 'border-primary' : 'border-gray-300'"
                :title="variant.name"
              >
                <span 
                  class="w-8 h-8 rounded-full" 
                  :style="{ backgroundColor: variant.color }"
                ></span>
              </button>
            </div>
            <p class="mt-1 text-sm text-gray-500">Selected: {{ selectedVariant }}</p>
          </div>
          
          <!-- Sizes -->
          <div v-if="product.sizes.length > 0" class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Size</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size"
                @click="selectedSize = size"
                class="w-12 h-12 flex items-center justify-center border rounded-md transition-colors"
                :class="selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300 text-gray-700'"
              >
                {{ size }}
              </button>
            </div>
          </div>
          
          <!-- Quantity -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
            <div class="flex items-center">
              <button 
                @click="decrementQuantity"
                class="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <input 
                v-model="quantity" 
                type="number" 
                min="1" 
                class="w-16 h-10 border-y border-gray-300 text-center focus:outline-none"
              />
              <button 
                @click="incrementQuantity"
                class="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 mb-6">
            <button 
              @click="addToCart"
              class="btn btn-primary flex-1 flex items-center justify-center"
              :disabled="!product.inStock"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
            
            <button 
              @click="toggleWishlist"
              class="btn border border-gray-300 flex-1 flex items-center justify-center hover:bg-gray-100"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 mr-2" 
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
              {{ wishlistStore.isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist' }}
            </button>
          </div>
          
          <!-- Product Info -->
          <div class="border-t border-gray-200 pt-4">
            <div class="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</span>
            </div>
            
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Products -->
      <ProductRecommendations 
        :products="relatedProducts" 
        title="You May Also Like"
      />
    </main>
    
    <div v-else class="container-custom py-16 text-center">
      <p class="text-xl text-gray-600">Product not found.</p>
      <router-link to="/products" class="mt-4 inline-block btn btn-primary">
        Back to Products
      </router-link>
    </div>
    
    <Footer />
  </div>
</template>