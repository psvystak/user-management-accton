<script setup>
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users.js';

const usersStore = useUsersStore();
const { disableStoreEditMode } = usersStore;

const router = useRouter();
const goBack = () => {
  disableStoreEditMode();
  router.go(-1);
};
</script>

<template>
  <div>
    <VBtn
      class="mb-6"
      prepend-icon="mdi-arrow-left"
      @click="goBack"
    >
      Повернутися на попередню сторінку
    </VBtn>
  </div>
</template>

<style lang="scss" scoped></style>
