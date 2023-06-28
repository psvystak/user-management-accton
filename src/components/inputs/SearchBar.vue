<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users.js';

const usersStore = useUsersStore();
const { filterStoreUsers } = usersStore;

const searchValue = ref('');

const searchUser = () => {
  filterStoreUsers(searchValue.value);
};
</script>

<template>
  <div>
    <VTextField
      v-model="searchValue"
      label="Search"
      variant="solo"
      prepend-inner-icon="mdi-magnify"
      @keyup="searchUser"
    />
  </div>
</template>

<style lang="scss" scoped></style>
