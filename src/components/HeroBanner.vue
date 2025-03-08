<script setup lang="ts">
</script>

<template>
  <div class="relative bg-gray-900 text-white">
    <div class="absolute inset-0 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
        alt="Hero Banner" 
        class="w-full h-full object-cover opacity-60"
      />
    </div>
    
    <div class="container-custom relative z-10 py-24 md:py-32">
      <div class="max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Summer Collection 2025</h1>
        <p class="text-xl mb-8">Discover the latest trends and styles for the summer season.</p>
        <div class="flex flex-wrap gap-4">
          <router-link to="/products" class="btn btn-primary">
            Shop Now
          </router-link>
          <button class="btn bg-white text-gray-900 hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>