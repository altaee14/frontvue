<template>
  <div class="min-h-screen bg-gray-50">
    <Toast />
    <AppMenubar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppMenubar from './components/AppMenubar.vue'
import { useAuthStore } from '@/stores/authStore'
import Toast from 'primevue/toast'

export default {
  components: {
    Toast,
    AppMenubar,
  },
  async mounted() {
    const authStore = useAuthStore()
    await authStore.initializeAuth()
  },
}
</script>