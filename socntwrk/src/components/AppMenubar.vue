<template>
    <Menubar :model="menuItems" class="simple-header">
      <template #start>
          <span class="text-xl font-bold ml-4">Socntwrk</span>
      </template>
      
      <template #end>
        <div class="flex items-center gap-4 mr-4">
            <div v-if="isAuthenticated && user" class="flex items-center gap-3">
                <span class="pi pi-user mr-1"></span> 
                <span class="font-medium">{{ user.name }}</span>
                <Button @click="logout" severity="secondary" size="small">Выйти</Button>
            </div>
            <div v-else class="flex items-center gap-2">
                <form @submit.prevent="login" class="flex items-center gap-2">
                    <InputText v-model="email" type="email" required placeholder="Email" 
                              size="small" class="w-32" />
                    <InputText v-model="password" required placeholder="Пароль" 
                             size="small" class="w-32" :feedback="false" toggleMask />
                    <Button type="submit" label="Войти" size="small" />
                </form>
                <small v-if="authError" class="error">{{ authError }}</small>
            </div>
        </div>
      </template>
    </Menubar>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {
    components: {
        Menubar,
        InputText,
        Password,
        Button
    },
    data() {
        return {
            email: '',
            password: '',
            authStore: useAuthStore(),
            menuItems: [
                {
                    label: 'Главная',
                    icon: 'pi pi-home',
                    command: () => this.$router.push('/')
                },
                {
                    label: 'Посты',
                    icon: 'pi pi-file',
                    command: () => this.$router.push('/posts')
                },
                {
                    label: 'Сообщения',
                    icon: 'pi pi-envelope',
                    command: () => this.$router.push('/messages')
                },
                {
                    label: 'Профиль',
                    icon: 'pi pi-user',
                    command: () => this.$router.push('/user')
                }
            ]
        };
    },
    computed: {
        isAuthenticated() {
            return this.authStore.isAuthenticated;
        },
        user() {
            return this.authStore.user;
        },
        authError() {
            return this.authStore.errorMessage;
        },
    },
    methods: {
        logout() {
            this.authStore.logout();
        },
        login() {
            this.authStore.login({
                email: this.email,
                password: this.password
            });
        },
    },
    mounted() {
        const token = localStorage.getItem('token');
        if (token) {
            this.authStore.isAuthenticated = true;
            this.authStore.getUser();
        }
    },
};
</script>

<style>
.simple-header {
    padding: 1.5rem 0;
    background-color: #f5f5f5 !important;
    min-height: 80px;
    font-size: large;
}

.simple-header .p-menubar-root-list {
    gap: 2rem;
    margin-left: 3rem; /* Отступ между логотипом и элементами меню */
}

.error {
    color: red;
}
</style>