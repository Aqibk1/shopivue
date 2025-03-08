<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import type { Product } from '../types'

const props = defineProps<{
  products: Product[]
  title?: string
}>()

const displayTitle = computed(() => props.title || 'You May Also Like')
</script>

<template>
  <div class="mt-12">
    <h2 class="text-2xl font-bold mb-6">{{ displayTitle }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>