<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useUsersStore } from '@/stores/users.js';

const route = useRoute();
const usersStore = useUsersStore();
const { toggleStoreEditMode } = usersStore;

const { getEditMode } = storeToRefs(usersStore);

const editMode = computed(() => getEditMode.value);

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
      {{ editMode ? 'Повернутися у режим перегляду' : 'Редагувати' }}
    </VBtn>
  </div>
</template>

<style lang="scss" scoped></style>
