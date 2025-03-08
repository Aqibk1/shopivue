import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CartItem } from '../types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  })
  
  function addToCart(product: Product, quantity: number = 1, selectedVariant: string | null = null, selectedSize: string | null = null) {
    const existingItem = items.value.find(item => 
      item.product.id === product.id && 
      item.selectedVariant === selectedVariant && 
      item.selectedSize === selectedSize
    )
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        product,
        quantity,
        selectedVariant,
        selectedSize
      })
    }
  }
  
  function removeFromCart(index: number) {
    items.value.splice(index, 1)
  }
  
  function updateQuantity(index: number, quantity: number) {
    if (quantity > 0) {
      items.value[index].quantity = quantity
    } else {
      removeFromCart(index)
    }
  }
  
  function clearCart() {
    items.value = []
  }
  
  return {
    items,
    itemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})