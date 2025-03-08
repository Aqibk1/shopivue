<script setup lang="ts">
import { onMounted } from 'vue'
import HeroBanner from '../components/HeroBanner.vue'
import ProductRecommendations from '../components/ProductRecommendations.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()

onMounted(() => {
  // Reset any filters when landing on home page
  productStore.searchQuery = ''
  productStore.selectedCategory = ''
})
</script>

<template>
  <div>
    <Header />
    
    <main>
      <HeroBanner />
      
      <div class="container-custom py-12">
        <!-- Featured Categories -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold mb-6">Shop by Category</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="(category, index) in ['clothing', 'footwear', 'accessories', 'electronics']" 
              :key="category"
              class="relative rounded-lg overflow-hidden h-64 cursor-pointer group"
              @click="() => { productStore.selectedCategory = category; $router.push('/products') }"
            >
              <img 
                :src="`https://source.unsplash.com/random/300x400?${category}&sig=${index}`" 
                :alt="category"
                class="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div class="p-6">
                  <h3 class="text-xl font-bold text-white capitalize">{{ category }}</h3>
                  <p class="text-white/80 mt-1">Shop Now</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Best Sellers -->
        <ProductRecommendations 
          :products="productStore.bestSellers" 
          title="Best Sellers"
        />
      </div>
    </main>
    
    <Footer />
  </div>
</template>