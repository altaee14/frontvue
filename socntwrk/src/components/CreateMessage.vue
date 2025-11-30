<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createPost" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Новый пост</h2>
      <div class="flex flex-col">
        <InputText
          type="text"
          placeholder="Введите текст поста"
          v-model="postText"
          required
        />
      </div>
      <div class="mb-4 mb-4">
        <label
  for="file"
  id="file-label"
  class="flex items-center w-full p-4 text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200 min-h-[30px] text-lg"
>
  <span class="pi pi-upload mr-3 text-gray-500 text-xl"></span>
  <span class="text-gray-500">Выбрать изображение</span>
</label>
        <input
          type="file"
          hidden
          id="file"
          name="file"
          v-on:change="changeCaption"
          required
          accept="image/*"
        />
      </div>

      <div class="flex flex-col mt-6">
        <PrimeButton type="submit" label="Создать пост" />
      </div>
    </form>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import PrimeButton from 'primevue/button'
import { useMessagesStore } from '@/stores/dataStore.js'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'CreateMessage',
  components: { InputText, PrimeButton },
  data() {
    return {
      messagesStore: useMessagesStore(),
      authStore: useAuthStore(),
      postText: '',
      postImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.messagesStore.errorMessage
    },
    errorCode() {
      return this.messagesStore.errorCode
    },
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0]
      if (file) {
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-file mx-3"></span>' + file.name
        this.postImage = file
      } else {
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-upload mx-3"></span>Выбрать изображение'
        this.postImage = null
      }
    },
    async createPost() {
      const formData = new FormData()
      formData.append('text', this.postText)
      formData.append('user_id', this.authStore.user?.id)
      formData.append('image', this.postImage)

      await this.messagesStore.create_post(formData)

      if (this.errorCode > 0) {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка создания поста',
          detail: this.errorMessage,
          life: 4000,
        })
      } else {
        this.$toast.add({
          severity: 'success',
          summary: 'Пост успешно создан',
          detail: this.errorMessage,
          life: 4000,
        })

        this.postText = ''
        this.postImage = null
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-upload mx-3"></span>Выбрать изображение'
      }
    },
  },
}
</script>

<style></style>