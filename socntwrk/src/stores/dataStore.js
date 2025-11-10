import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const backendUrl = 'http://127.0.0.1:8000/api';

export const useMessagesStore = defineStore('messages', {
    state: () => ({
        messages: [],
        messages_total: null,
        errorMessage: "",
        loading: false
    }),

    actions: {
        async get_messages(page = 0, perpage = 5) {
            this.loading = true;
            this.errorMessage = "";
            
            const authStore = useAuthStore();
            const token = authStore.token;
            
            if (!token) {
                this.errorMessage = "Требуется авторизация";
                this.loading = false;
                return;
            }
            
            try {
                const response = await axios.get(`${backendUrl}/messages`, {
                    params: {
                        page: page,
                        perpage: perpage
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.messages = response.data;
            } catch (error) {
                if (error.response?.status === 401) {
                    this.errorMessage = "Ошибка авторизации";
                    authStore.logout();
                } else if (error.response) {
                    this.errorMessage = error.response.data?.message || 'Server error';
                } else if (error.request) {
                    this.errorMessage = 'No response from server';
                } else {
                    this.errorMessage = error.message;
                }
                this.messages = [];
            } finally {
                this.loading = false;
            }
        },

        async get_messages_total() {
            this.errorMessage = "";
            
            const authStore = useAuthStore();
            const token = authStore.token;
            
            if (!token) {
                this.errorMessage = "Требуется авторизация";
                return;
            }
            
            try {
                const response = await axios.get(`${backendUrl}/messages_total`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.messages_total = response.data;
            } catch (error) {
                if (error.response?.status === 401) {
                    this.errorMessage = "Ошибка авторизации";
                    authStore.logout();
                } else if (error.response) {
                    this.errorMessage = error.response.data?.message || 'Server error';
                } else if (error.request) {
                    this.errorMessage = 'No response from server';
                } else {
                    this.errorMessage = error.message;
                }
                this.messages_total = 0;
            }
        }
    }
});