<script setup>
import { storeToRefs } from 'pinia';
import { computed, onUnmounted } from 'vue';
import UsersTable from '@/components/UsersTable.vue';
import { useUsersStore } from '@/stores/users';
import SearchBar from '@/components/inputs/SearchBar.vue';

const usersStore = useUsersStore();

const { getUsers, getEditMode } = storeToRefs(usersStore);
const { filterStoreUsers } = usersStore;

const users = computed(() => getUsers.value);

const editMode = computed(() => getEditMode.value);

const headers = [
  {
    title: 'Аватар',
    key: 'avatar',
    sortable: false,
    align: 'center',
  },
  {
    title: 'Ім’я користувача',
    key: 'name',
    sortable: true,
    align: 'start',
  },
  {
    title: 'Email користувача',
    key: 'email',
    sortable: true,
    align: 'start',
  },
  {
    title: 'Email начальника',
    key: 'head',
    sortable: true,
    align: 'start',
  },
  {
    title: '',
    key: 'button',
    sortable: false,
    align: 'center',
  },
];

onUnmounted(() => {
  filterStoreUsers('');
});
</script>

<template>
  <SearchBar />
  <UsersTable
    :users="users"
    :edit-mode="editMode"
    :headers="headers"
  />
</template>

<style scoped>

</style>
