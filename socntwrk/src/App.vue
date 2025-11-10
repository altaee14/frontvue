<template>
  <div>
    <AppMenubar />
    <main>
      <router-view></router-view>
    </main>

  </div>
</template>

<script>
import AppMenubar from './components/AppMenubar.vue';
import { useAuthStore } from '@/stores/authStore';

export default {
    components: {
        AppMenubar
    },
    async mounted() {
        const authStore = useAuthStore();
        await authStore.initializeAuth();
    }
};
</script>