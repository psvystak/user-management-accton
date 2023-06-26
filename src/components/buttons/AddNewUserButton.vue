<script setup>
import { computed, ref } from 'vue';
import { useUsersStore } from '@/stores/users.js';

const usersStore = useUsersStore();
const { toggleStoreEditMode } = usersStore;

const editMode = computed(() => usersStore.getEditMode);

const switchEditMode = () => {
  toggleStoreEditMode();
};
</script>

<template>
  <div>
    <VBtn
      class="mb-6"
      :active="editMode"
      @click="switchEditMode"
    >
      {{ editMode ? 'Return to view mode' : 'Edit' }}
    </VBtn>
  </div>
</template>

<style lang='scss' scoped>

</style>
