<template>
  <div class="grid grid-cols-3 gap-4 p-4">
    <div 
      v-for="(img, idx) in images" 
      :key="idx" 
      class="cursor-pointer"
      @click="$emit('open', idx)"
    >
      <img :src="img.url" :alt="img.name" class="rounded shadow hover:scale-105 transition-transform"/>
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: Array
})
</script>
