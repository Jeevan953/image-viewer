<template>
  <div id="gallery">
    <div v-for="img in images" :key="img._id" class="card">
      <img :src="`${API}/${img.path}`" :alt="img.filename" />
      <p>{{ img.filename }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: Array
})

const API = import.meta.env.VITE_API_URL
</script>

<style>
#gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.card {
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}
img {
  width: 100%;
  border-radius: 10px;
}
</style>
