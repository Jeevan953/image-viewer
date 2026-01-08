<template>
  <div class="min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-blue-700 text-center mt-8">📸 Image Viewer</h1>

    <form @submit.prevent="uploadImage" class="text-center mt-4">
      <input type="file" ref="fileInput" />
      <button type="submit" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
    </form>

    <ImageGrid :images="images" @open="openModal" />
    <ImageModal v-if="showModal" :show="showModal" :image="images[currentIndex]" @close="closeModal"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ImageGrid from './components/ImageGrid.vue'
import ImageModal from './components/ImageModal.vue'

const API = import.meta.env.VITE_API_URL

const images = ref([])
const showModal = ref(false)
const currentIndex = ref(0)
const fileInput = ref(null)

async function loadImages() {
  try {
    const res = await fetch(`${API}/images`)
    images.value = await res.json()
  } catch (err) {
    console.error('Error fetching images:', err)
  }
}

async function uploadImage() {
  if (!fileInput.value.files.length) return alert('Choose an image!')

  const formData = new FormData()
  formData.append('image', fileInput.value.files[0])

  try {
    await fetch(`${API}/upload`, { method: 'POST', body: formData })
    fileInput.value.value = ''
    loadImages()
  } catch (err) {
    console.error('Upload failed:', err)
  }
}

function openModal(idx) {
  currentIndex.value = idx
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

onMounted(() => loadImages())
</script>
