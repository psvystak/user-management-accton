<script setup>
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users.js';

const router = useRouter();

const goToAddUserPage = (userId) => {
  router.push('/user/add');
};
</script>

<template>
  <div>
    <VBtn
      class="mb-6"
      prepend-icon="mdi-account-plus"
      @click="goToAddUserPage"
    >
      Створити
    </VBtn>
  </div>
</template>

<style lang='scss' scoped>

</style>
