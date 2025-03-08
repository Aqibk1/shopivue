import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types'

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    price: 29.99,
    description: 'A comfortable and stylish t-shirt made from 100% cotton.',
    images: [
      '/images/tshirt-white-1.jpg',
      '/images/tshirt-white-2.jpg',
    ],
    variants: [
      { name: 'White', color: '#FFFFFF' },
      { name: 'Black', color: '#000000' },
      { name: 'Navy', color: '#000080' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'clothing',
    inStock: true,
    bestSeller: true,
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 59.99,
    description: 'Modern slim fit jeans with stretch for maximum comfort.',
    images: [
      '/images/jeans-blue-1.jpg',
      '/images/jeans-blue-2.jpg',
    ],
    variants: [
      { name: 'Light Blue', color: '#ADD8E6' },
      { name: 'Dark Blue', color: '#00008B' },
      { name: 'Black', color: '#000000' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    category: 'clothing',
    inStock: true,
    bestSeller: true,
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 89.99,
    description: 'Lightweight running shoes with cushioned soles for maximum comfort.',
    images: [
      '/images/shoes-1.jpg',
      '/images/shoes-2.jpg',
    ],
    variants: [
      { name: 'Red', color: '#FF0000' },
      { name: 'Blue', color: '#0000FF' },
      { name: 'Black', color: '#000000' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    category: 'footwear',
    inStock: true,
    bestSeller: false,
  },
  {
    id: '4',
    name: 'Leather Wallet',
    price: 39.99,
    description: 'Genuine leather wallet with multiple card slots and coin pocket.',
    images: [
      '/images/wallet-1.jpg',
      '/images/wallet-2.jpg',
    ],
    variants: [
      { name: 'Brown', color: '#8B4513' },
      { name: 'Black', color: '#000000' },
    ],
    sizes: [],
    category: 'accessories',
    inStock: true,
    bestSeller: true,
  },
  {
    id: '5',
    name: 'Wireless Headphones',
    price: 129.99,
    description: 'Noise-cancelling wireless headphones with 20-hour battery life.',
    images: [
      '/images/headphones-1.jpg',
      '/images/headphones-2.jpg',
    ],
    variants: [
      { name: 'Black', color: '#000000' },
      { name: 'White', color: '#FFFFFF' },
      { name: 'Silver', color: '#C0C0C0' },
    ],
    sizes: [],
    category: 'electronics',
    inStock: true,
    bestSeller: true,
  },
  {
    id: '6',
    name: 'Backpack',
    price: 49.99,
    description: 'Durable backpack with laptop compartment and multiple pockets.',
    images: [
      '/images/backpack-1.jpg',
      '/images/backpack-2.jpg',
    ],
    variants: [
      { name: 'Gray', color: '#808080' },
      { name: 'Blue', color: '#0000FF' },
      { name: 'Black', color: '#000000' },
    ],
    sizes: [],
    category: 'accessories',
    inStock: true,
    bestSeller: false,
  }
]

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>(mockProducts)
  const searchQuery = ref('')
  const selectedCategory = ref('')
  
  const filteredProducts = computed(() => {
    let result = products.value
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      )
    }
    
    if (selectedCategory.value) {
      result = result.filter(product => product.category === selectedCategory.value)
    }
    
    return result
  })
  
  const bestSellers = computed(() => {
    return products.value.filter(product => product.bestSeller)
  })
  
  function getProductById(id: string): Product | undefined {
    return products.value.find(product => product.id === id)
  }
  
  function getRelatedProducts(product: Product, limit: number = 4): Product[] {
    return products.value
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, limit)
  }
  
  return {
    products,
    searchQuery,
    selectedCategory,
    filteredProducts,
    bestSellers,
    getProductById,
    getRelatedProducts
  }
})