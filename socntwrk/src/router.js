import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Messages from '@/components/Messages.vue'
import Posts from '@/components/Posts.vue'
import User from '@/components/User.vue'
import CreateMessage from './components/CreateMessage.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/posts',
    component: Posts,
  },
  {
    path: '/messages',
    component: Messages,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/createPost',
    component: CreateMessage,
  },
]

const router = createRouter({
  history: createWebHistory(), // Используем режим истории HTML5
  routes, // Список маршрутов
})

export default router
