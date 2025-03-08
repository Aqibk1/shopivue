import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<Product[]>([])
  
  const isInWishlist = computed(() => {
    return (productId: string) => items.value.some(item => item.id === productId)
  })
  
  function addToWishlist(product: Product) {
    if (!isInWishlist.value(product.id)) {
      items.value.push(product)
    }
  }
  
  function removeFromWishlist(productId: string) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
  
  function toggleWishlist(product: Product) {
    if (isInWishlist.value(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }
  
  return {
    items,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist
  }
})