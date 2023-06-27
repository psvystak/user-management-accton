<script setup>
import {
  onMounted, ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import EditModeSwitcher from './components/buttons/EditModeSwitcherButton.vue';
import GoBackButton from './components/buttons/GoBackButton.vue';
import AddNewUserButton from './components/buttons/AddNewUserButton.vue';

import { useUsersStore } from './stores/users.js';

const usersStore = useUsersStore();
const { setStoreUsers } = usersStore;

const route = useRoute();
const routeName = ref(route.name);
const isHomePage = ref(false);
const isAddNewUserPage = ref(false);

watch(() => route.name, (newRouteName) => {
  routeName.value = newRouteName;
  isHomePage.value = newRouteName === 'Home';
  isAddNewUserPage.value = newRouteName === 'Add';
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
    <VSheet
      class="d-flex bg-transparent"
      :class="{'justify-md-end': isAddNewUserPage, 'justify-md-space-between': !isAddNewUserPage}"
    >
      <EditModeSwitcher v-if="!isAddNewUserPage" />
      <GoBackButton v-if="!isHomePage" />
      <AddNewUserButton v-if="isHomePage" />
    </VSheet>
    <router-view />
  </div>
</template>

<style lang='scss' scoped>
</style>
