<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
    <div class="relative">
      <img :src="image.url" :alt="image.name" class="max-h-[80vh] max-w-[80vw] rounded"/>
      <button @click="$emit('close')" class="absolute top-2 right-2 text-white text-2xl">✖</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  image: Object
})
</script>
