import { createRouter, createWebHashHistory } from 'vue-router'
import Blog from '../views/Blog.vue'
import Admin from '../views/Admin.vue'
import Auth from '../views/Auth'

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/:title',
    name: 'BlogView',
    component: () => import('../components/Blog/BlogView')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/login',
    name: 'Auth',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
