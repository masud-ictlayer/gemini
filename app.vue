<template>
  <div class="google-ai-page">
    <h1>Ask Gemini</h1>
    <div>
      <textarea v-model="question" id="question" placeholder="Type your question"></textarea>
    </div>
    <button @click="sendQuestion">Send</button>
    <div v-if="response">
      <h2>Response:</h2>
      <p v-html="response"></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const { $googleGenerativeAI } = useNuxtApp()

const question = ref('')
const response = ref('')

const sendQuestion = async () => {
  if (!question.value) {
    alert('Please provide a question.')
    return
  }

  try {
    const result = await $googleGenerativeAI.generateContent(question.value)
    response.value = result // Assuming the response follows this structure
  } catch (error) {
    response.value = 'An error occurred: ' + error.message
  }
}
</script>

<style scoped>
.google-ai-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

textarea {
  width: 100%;
  margin-bottom: 10px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
