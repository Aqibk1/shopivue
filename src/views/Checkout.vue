<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useCartStore } from '../stores/cart'
import type { CheckoutInfo } from '../types'

const router = useRouter()
const cartStore = useCartStore()

const currentStep = ref(1)
const checkoutInfo = ref<CheckoutInfo>({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  paymentMethod: 'credit',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: '',
  shippingMethod: 'standard'
})

const shippingMethods = [
  { id: 'standard', name: 'Standard Shipping', price: 0, description: 'Delivery in 5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 9.99, description: 'Delivery in 2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 19.99, description: 'Next business day delivery' }
]

const subtotal = computed(() => cartStore.totalPrice)
const shipping = computed(() => {
  const method = shippingMethods.find(m => m.id === checkoutInfo.value.shippingMethod)
  return method ? method.price : 0
})
const tax = computed(() => subtotal.value * 0.1)
const total = computed(() => subtotal.value + shipping.value + tax.value)

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function placeOrder() {
  // In a real app, this would send the order to a backend
  alert('Order placed successfully!')
  cartStore.clearCart()
  router.push('/')
}

// Redirect to products if cart is empty
if (cartStore.items.length === 0) {
  router.push('/products')
}
</script>

<template>
  <div>
    <Header />
    
    <main class="container-custom py-8">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>
      
      <!-- Checkout Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div 
            class="flex flex-col items-center"
            :class="currentStep >= 1 ? 'text-primary' : 'text-gray-400'"
          >
            <div class="w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2"
              :class="currentStep >= 1 ? 'border-primary bg-primary/10' : 'border-gray-300'"
            >
              <span class="font-bold">1</span>
            </div>
            <span class="text-sm font-medium">Shipping</span>
          </div>
          
          <div class="flex-1 h-1 mx-4" :class="currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'"></div>
          
          <div 
            class="flex flex-col items-center"
            :class="currentStep >= 2 ? 'text-primary' : 'text-gray-400'"
          >
            <div class="w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2"
              :class="currentStep >= 2 ? 'border-primary bg-primary/10' : 'border-gray-300'"
            >
              <span class="font-bold">2</span>
            </div>
            <span class="text-sm font-medium">Payment</span>
          </div>
          
          <div class="flex-1 h-1 mx-4" :class="currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'"></div>
          
          <div 
            class="flex flex-col items-center"
            :class="currentStep >= 3 ? 'text-primary' : 'text-gray-400'"
          >
            <div class="w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2"
              :class="currentStep >= 3 ? 'border-primary bg-primary/10' : 'border-gray-300'"
            >
              <span class="font-bold">3</span>
            </div>
            <span class="text-sm font-medium">Review</span>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Checkout Form -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Step 1: Shipping Information -->
            <div v-if="currentStep === 1" class="p-6">
              <h2 class="text-xl font-semibold mb-6">Shipping Information</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    v-model="checkoutInfo.firstName"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    v-model="checkoutInfo.lastName"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    v-model="checkoutInfo.email"
                    type="email" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    v-model="checkoutInfo.address"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    v-model="checkoutInfo.city"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input 
                    v-model="checkoutInfo.state"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                  <input 
                    v-model="checkoutInfo.zipCode"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select 
                    v-model="checkoutInfo.country"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
              
              <div class="mt-8">
                <h3 class="text-lg font-medium mb-4">Shipping Method</h3>
                
                <div class="space-y-4">
                  <div 
                    v-for="method in shippingMethods" 
                    :key="method.id"
                    class="border rounded-md p-4 cursor-pointer"
                    :class="checkoutInfo.shippingMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'"
                    @click="checkoutInfo.shippingMethod = method.id"
                  >
                    <div class="flex items-center">
                      <input 
                        type="radio" 
                        :id="method.id" 
                        :value="method.id" 
                        v-model="checkoutInfo.shippingMethod"
                        class="mr-3"
                      />
                      <div class="flex-1">
                        <label :for="method.id" class="font-medium cursor-pointer">{{ method.name }}</label>
                        <p class="text-sm text-gray-600">{{ method.description }}</p>
                      </div>
                      <div class="font-medium">
                        {{ method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}` }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-8 flex justify-end">
                <button 
                  @click="nextStep"
                  class="btn btn-primary"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
            
            <!-- Step 2: Payment Information -->
            <div v-if="currentStep === 2" class="p-6">
              <h2 class="text-xl font-semibold mb-6">Payment Information</h2>
              
              <div class="mb-6">
                <div class="space-y-4">
                  <div 
                    class="border rounded-md p-4 cursor-pointer border-primary bg-primary/5"
                    @click="checkoutInfo.paymentMethod = 'credit'"
                  >
                    <div class="flex items-center">
                      <input 
                        type="radio" 
                        id="credit" 
                        value="credit" 
                        v-model="checkoutInfo.paymentMethod"
                        class="mr-3"
                      />
                      <div class="flex-1">
                        <label for="credit" class="font-medium cursor-pointer">Credit Card</label>
                        <p class="text-sm text-gray-600">Pay with Visa, Mastercard, or American Express</p>
                      </div>
                      <div class="flex space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8" viewBox="0 0 48 48">
                          <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                          <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"/>
                          <path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8" viewBox="0 0 48 48">
                          <path fill="#3F51B5" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                          <path fill="#FFC107" d="M30,24c0,3.314-2.686,6-6,6s-6-2.686-6-6s2.686-6,6-6S30,20.686,30,24z"/>
                          <path fill="#FF3D00" d="M22.319,24c0,0.74,0.599,1.339,1.339,1.339c0.74,0,1.339-0.599,1.339-1.339s-0.599-1.339-1.339-1.339 C22.917,22.661,22.319,23.26,22.319,24z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8" viewBox="0 0 48 48">
                          <path fill="#1976D2" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                          <path fill="#FFF" d="M22.255 20l-2.113 4.683L18.039 20h-2.695v6.726L12.341 20h-2.274L7 30h2.883l.437-1.487h2.512L13.356 30h5.337v-5.317L20.972 30h1.915l2.299-5.317V30h2.587v-10H22.255zM10.591 26.513l.785-2.77c.154-.551.309-1.268.309-1.268s.154.717.309 1.268l.785 2.77H10.591z"/>
                          <path fill="#FFF" d="M37.188 23.508c0-.861-.518-1.558-1.558-1.558h-3.915V30h2.587v-2.863h.601l1.814 2.863h3.129l-2.202-3.129C36.982 26.436 37.188 25.067 37.188 23.508zM34.302 25.067h-.602v-1.117h.602c.293 0 .586.207.586.586C34.888 24.86 34.595 25.067 34.302 25.067z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input 
                    v-model="checkoutInfo.cardNumber"
                    type="text" 
                    placeholder="1234 5678 9012 3456"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                  <input 
                    v-model="checkoutInfo.cardExpiry"
                    type="text" 
                    placeholder="MM/YY"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input 
                    v-model="checkoutInfo.cardCVC"
                    type="text" 
                    placeholder="123"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div class="mt-8 flex justify-between">
                <button 
                  @click="prevStep"
                  class="btn border border-gray-300 hover:bg-gray-100"
                >
                  Back to Shipping
                </button>
                
                <button 
                  @click="nextStep"
                  class="btn btn-primary"
                >
                  Review Order
                </button>
              </div>
            </div>
            
            <!-- Step 3: Review Order -->
            <div v-if="currentStep === 3" class="p-6">
              <h2 class="text-xl font-semibold mb-6">Review Your Order</h2>
              
              <div class="mb-6">
                <h3 class="text-lg font-medium mb-3">Shipping Information</h3>
                <div class="bg-gray-50 p-4 rounded-md">
                  <p><span class="font-medium">Name:</span> {{ checkoutInfo.firstName }} {{ checkoutInfo.lastName }}</p>
                  <p><span class="font-medium">Email:</span> {{ checkoutInfo.email }}</p>
                  <p><span class="font-medium">Address:</span> {{ checkoutInfo.address }}</p>
                  <p><span class="font-medium">City:</span> {{ checkoutInfo.city }}, {{ checkoutInfo.state }} {{ checkoutInfo.zipCode }}</p>
                  <p><span class="font-medium">Country:</span> {{ checkoutInfo.country }}</p>
                  <p><span class="font-medium">Shipping Method:</span> {{ shippingMethods.find(m => m.id === checkoutInfo.shippingMethod)?.name }}</p>
                </div>
              </div>
              
              <div class="mb-6">
                <h3 class="text-lg font-medium mb-3">Payment Information</h3>
                <div class="bg-gray-50 p-4 rounded-md">
                  <p><span class="font-medium">Payment Method:</span> Credit Card</p>
                  <p><span class="font-medium">Card Number:</span> **** **** **** {{ checkoutInfo.cardNumber.slice(-4) }}</p>
                </div>
              </div>
              
              <div class="mb-6">
                <h3 class="text-lg font-medium mb-3">Order Items</h3>
                <div class="bg-gray-50 p-4 rounded-md">
                  <div 
                    v-for="(item, index) in cartStore.items" 
                    :key="`${item.product.id}-${index}`"
                    class="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                  >
                    <div class="flex items-center">
                      <img 
                        :src="item.product.images[0] || 'https://via.placeholder.com/50x50?text=No+Image'" 
                        :alt="item.product.name"
                        class="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <p class="font-medium">{{ item.product.name }}</p>
                        <p class="text-sm text-gray-600">
                          {{ item.quantity }} x ${{ item.product.price.toFixed(2) }}
                          <span v-if="item.selectedVariant"> - {{ item.selectedVariant }}</span>
                           <span v-if="item.selectedSize"> - {{ item.selectedSize }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="font-medium">${{ (item.product.price * item.quantity).toFixed(2) }}</div>
                  </div>
                </div>
              </div>
              
              <div class="mt-8 flex justify-between">
                <button 
                  @click="prevStep"
                  class="btn border border-gray-300 hover:bg-gray-100"
                >
                  Back to Payment
                </button>
                
                <button 
                  @click="placeOrder"
                  class="btn btn-primary"
                >
                  Place Order
                </button>
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
                <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3 mt-3">
                <div class="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div 
                v-for="(item, index) in cartStore.items" 
                :key="`${item.product.id}-${index}`"
                class="flex items-center py-2 border-b border-gray-200 last:border-0"
              >
                <img 
                  :src="item.product.images[0] || 'https://via.placeholder.com/50x50?text=No+Image'" 
                  :alt="item.product.name"
                  class="w-10 h-10 object-cover rounded-md mr-3"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{{ item.product.name }}</p>
                  <p class="text-sm text-gray-600">{{ item.quantity }} x ${{ item.product.price.toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>