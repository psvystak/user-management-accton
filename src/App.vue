<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import EditModeSwitcher from './components/buttons/EditModeSwitcherButton.vue';
import GoBackButton from './components/buttons/GoBackButton.vue';

import { useUsersStore } from './stores/users.js';

const usersStore = useUsersStore();
const { setStoreUsers } = usersStore;

const route = useRoute();
const routeName = ref(route.name);
const isHomePage = ref(false);

watch(() => route.name, (newRouteName) => {
  routeName.value = newRouteName;
  isHomePage.value = newRouteName === 'Home';
});

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/data');
    const originalData = await response.json();
    const { data } = originalData;
    setStoreUsers(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div>
    <VSheet class="d-flex justify-md-space-between bg-transparent">
      <EditModeSwitcher />
      <GoBackButton v-if="!isHomePage" />
    </VSheet>
    <router-view />
  </div>
</template>

<style lang='scss' scoped>
</style>
