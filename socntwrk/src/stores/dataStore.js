import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const backendUrl = 'http://127.0.0.1:8000/api'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
    messages_total: null,
    posts: [],
    posts_total: null,
    errorMessage: '',
    loading: false,
    errorCode: '',
  }),

  actions: {
    async get_messages(page = 0, perpage = 5) {
      this.loading = true
      this.errorMessage = ''

      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        this.errorMessage = 'Требуется авторизация'
        this.loading = false
        return
      }

      try {
        const response = await axios.get(`${backendUrl}/messages`, {
          params: {
            page: page,
            perpage: perpage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.messages = response.data
      } catch (error) {
        if (error.response?.status === 401) {
          this.errorMessage = 'Ошибка авторизации'
          authStore.logout()
        } else if (error.response) {
          this.errorMessage = error.response.data?.message || 'Server error'
        } else if (error.request) {
          this.errorMessage = 'No response from server'
        } else {
          this.errorMessage = error.message
        }
        this.messages = []
      } finally {
        this.loading = false
      }
    },

    async get_messages_total() {
      this.errorMessage = ''

      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        this.errorMessage = 'Требуется авторизация'
        return
      }

      try {
        const response = await axios.get(`${backendUrl}/messages_total`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.messages_total = response.data
      } catch (error) {
        if (error.response?.status === 401) {
          this.errorMessage = 'Ошибка авторизации'
          authStore.logout()
        } else if (error.response) {
          this.errorMessage = error.response.data?.message || 'Server error'
        } else if (error.request) {
          this.errorMessage = 'No response from server'
        } else {
          this.errorMessage = error.message
        }
        this.messages_total = 0
      }
    },

    async get_posts(page = 0, perpage = 5) {
      this.loading = true
      this.errorMessage = ''

      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        this.errorMessage = 'Требуется авторизация'
        this.loading = false
        return
      }

      try {
        const response = await axios.get(`${backendUrl}/allposts`, {
          params: {
            page: page,
            perpage: perpage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.posts = response.data
      } catch (error) {
        if (error.response?.status === 401) {
          this.errorMessage = 'Ошибка авторизации'
          authStore.logout()
        } else if (error.response) {
          this.errorMessage = error.response.data?.message || 'Server error'
        } else if (error.request) {
          this.errorMessage = 'No response from server'
        } else {
          this.errorMessage = error.message
        }
        this.posts = []
      } finally {
        this.loading = false
      }
    },

    async get_posts_total() {
      this.errorMessage = ''

      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        this.errorMessage = 'Требуется авторизация'
        return
      }

      try {
        const response = await axios.get(`${backendUrl}/posts_total`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.posts_total = response.data
      } catch (error) {
        if (error.response?.status === 401) {
          this.errorMessage = 'Ошибка авторизации'
          authStore.logout()
        } else if (error.response) {
          this.errorMessage = error.response.data?.message || 'Server error'
        } else if (error.request) {
          this.errorMessage = 'No response from server'
        } else {
          this.errorMessage = error.message
        }
        this.posts_total = 0
      }
    },

    async create_post(formData) {
      this.errorMessage = ''
      try {
        const response = await axios.post(`${backendUrl}/addpost`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        this.errorCode = response.data.code
        this.errorMessage = response.data.message
      } catch (error) {
        if (error.response) {
          this.errorCode = 11
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorCode = 12
          this.errorMessage = error.message
          console.log(error)
        } else {
          this.errorCode = 13
          console.log(error)
        }
      }
    },
  },
})
