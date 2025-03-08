<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/products'

const router = useRouter()
const cartStore = useCartStore()
const productStore = useProductStore()

const searchInput = ref('')
const showMobileMenu = ref(false)

const categories = [
  { name: 'Clothing', value: 'clothing' },
  { name: 'Footwear', value: 'footwear' },
  { name: 'Accessories', value: 'accessories' },
  { name: 'Electronics', value: 'electronics' }
]

function handleSearch() {
  productStore.searchQuery = searchInput.value
  router.push('/products')
}

function selectCategory(category: string) {
  productStore.selectedCategory = category
  router.push('/products')
  showMobileMenu.value = false
}
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="container-custom py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-primary">
            ShopVue
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="hidden md:flex flex-1 max-w-xl mx-8">
          <form @submit.prevent="handleSearch" class="w-full">
            <div class="relative">
              <input
                v-model="searchInput"
                type="text"
                placeholder="Search for products..."
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <!-- Navigation -->
        <div class="flex items-center space-x-4">
          <router-link to="/cart" class="relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.itemCount > 0" class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </router-link>
          
          <button @click="showMobileMenu = !showMobileMenu" class="md:hidden p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search (visible on small screens) -->
      <div class="mt-4 md:hidden">
        <form @submit.prevent="handleSearch">
          <div class="relative">
            <input
              v-model="searchInput"
              type="text"
              placeholder="Search for products..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <!-- Category Navigation -->
      <nav class="hidden md:flex mt-4 space-x-6">
        <button
          v-for="category in categories"
          :key="category.value"
          @click="selectCategory(category.value)"
          class="text-gray-600 hover:text-primary font-medium"
        >
          {{ category.name }}
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden mt-4 bg-gray-50 rounded-md p-4">
        <div class="flex flex-col space-y-3">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectCategory(category.value)"
            class="text-gray-600 hover:text-primary font-medium py-2 border-b border-gray-200 last:border-0"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>