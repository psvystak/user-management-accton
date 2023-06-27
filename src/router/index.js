import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/user/:id',
      name: 'User',
      component: () => import('@/views/UserView.vue'),
    },
    {
      path: '/user/add',
      name: 'Add',
      component: () => import('@/views/AddNewUserView.vue'),
    },
  ],
});

export default router;
