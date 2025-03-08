<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/products'

const route = useRoute()
const productStore = useProductStore()

const sortOption = ref('default')
const showFilters = ref(false)

// Get category from route if present
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    productStore.selectedCategory = newCategory as string
  }
}, { immediate: true })

const sortedProducts = computed(() => {
  const products = [...productStore.filteredProducts]
  
  switch (sortOption.value) {
    case 'price-low':
      return products.sort((a, b) => a.price - b.price)
    case 'price-high':
      return products.sort((a, b) => b.price - a.price)
    case 'name-asc':
      return products.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return products.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return products
  }
})

const categories = [
  { name: 'All Categories', value: '' },
  { name: 'Clothing', value: 'clothing' },
  { name: 'Footwear', value: 'footwear' },
  { name: 'Accessories', value: 'accessories' },
  { name: 'Electronics', value: 'electronics' }
]

function clearFilters() {
  productStore.searchQuery = ''
  productStore.selectedCategory = ''
  sortOption.value = 'default'
}
</script>

<template>
  <div>
    <Header />
    
    <main class="container-custom py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">
          {{ productStore.selectedCategory ? 
            `${productStore.selectedCategory.charAt(0).toUpperCase() + productStore.selectedCategory.slice(1)}` : 
            productStore.searchQuery ? `Search Results for "${productStore.searchQuery}"` : 'All Products' }}
        </h1>
        
        <div class="flex items-center space-x-4">
          <button 
            @click="showFilters = !showFilters"
            class="md:hidden flex items-center space-x-1 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
          </button>
          
          <div class="hidden md:block">
            <select 
              v-model="sortOption"
              class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Filters Sidebar (desktop) -->
        <aside class="hidden md:block w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-3">Categories</h3>
              <div class="space-y-2">
                <div 
                  v-for="category in categories" 
                  :key="category.value"
                  class="flex items-center"
                >
                  <label class="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      :value="category.value" 
                      v-model="productStore.selectedCategory" 
                      class="mr-2"
                    />
                    <span>{{ category.name }}</span>
                  </label>
                </div>
              </div>
            </div>
            
            <button 
              @click="clearFilters"
              class="w-full py-2 text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </aside>
        
        <!-- Mobile Filters (shown when toggle is clicked) -->
        <div 
          v-if="showFilters" 
          class="md:hidden bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Categories</h3>
            <div class="space-y-2">
              <div 
                v-for="category in categories" 
                :key="category.value"
                class="flex items-center"
              >
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    :value="category.value" 
                    v-model="productStore.selectedCategory" 
                    class="mr-2"
                  />
                  <span>{{ category.name }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Sort By</h3>
            <select 
              v-model="sortOption"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="clearFilters"
              class="flex-1 py-2 text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
            >
              Clear Filters
            </button>
            <button 
              @click="showFilters = false"
              class="flex-1 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
        
        <!-- Product Grid -->
        <div class="flex-1">
          <div v-if="sortedProducts.length === 0" class="text-center py-12">
            <p class="text-xl text-gray-600">No products found.</p>
            <button 
              @click="clearFilters"
              class="mt-4 btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
          
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard 
              v-for="product in sortedProducts" 
              :key="product.id" 
              :product="product" 
            />
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>