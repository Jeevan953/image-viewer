<template>
  <div class="p-4 bg-white shadow rounded w-full max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-3">Upload Image</h2>

    <input 
      type="file" 
      accept="image/*" 
      @change="handleFile" 
      class="mb-3"
    />

    <button 
      @click="uploadFile"
      class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
    >
      Upload
    </button>

    <p v-if="message" class="mt-2 text-green-600">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const file = ref(null)
const message = ref("")

function handleFile(e) {
  file.value = e.target.files[0]
}

async function uploadFile() {
  if (!file.value) {
    message.value = "Please select a file!"
    return
  }

  const formData = new FormData()
  formData.append("image", file.value)

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    message.value = "Uploaded Successfully!"
    console.log("Uploaded:", data)

  } catch (err) {
    console.error(err)
    message.value = "Upload failed!"
  }
}
</script>
