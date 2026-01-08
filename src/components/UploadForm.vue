<template>
  <form @submit.prevent="uploadImage" class="text-center my-4">
    <input type="file" @change="onFileSelect" />
    <button type="submit">Upload</button>
  </form>
</template>

<script setup>
import { ref } from "vue"

const emit = defineEmits(["uploaded"])
const file = ref(null)
const API = import.meta.env.VITE_API_URL

function onFileSelect(event) {
  file.value = event.target.files[0]
}

async function uploadImage() {
  if (!file.value) return alert("Choose an image!")

  const formData = new FormData()
  formData.append("image", file.value)

  await fetch(`${API}/upload`, {
    method: "POST",
    body: formData
  })

  file.value = null
  emit("uploaded")
}
</script>
