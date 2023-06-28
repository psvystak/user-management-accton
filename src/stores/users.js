import { defineStore } from 'pinia';
import { copyObject } from '@/utils/composable/copyObject';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    originalUsers: [],
    editMode: false,
    usersPerPage: 7,
  }),

  getters: {
    getUsers(state) {
      return [...state.users];
    },
    getEditMode(state) {
      return state.editMode;
    },
    getUsersPerPage(state) {
      return state.usersPerPage;
    },
  },

  actions: {
    setStoreUsers(users) {
      this.users = users;
      this.originalUsers = copyObject(users);
    },
    setStoreUsersPerPage(count) {
      this.usersPerPage = count;
    },
    filterStoreUsers(searchValue) {
      if (!searchValue) {
        this.users = copyObject(this.originalUsers);
      } else {
        this.users = this.originalUsers.filter(
          (user) => user.name.toLowerCase().includes(searchValue.toLowerCase())
            || user.email.toLowerCase().includes(searchValue.toLowerCase()),
        );
      }
    },
    removeStoreUser(id) {
      const index = this.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
      this.originalUsers = copyObject(this.users);
    },
    updateStoreUser(updatedUser) {
      const index = this.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = copyObject(updatedUser);
      }
      this.originalUsers = copyObject(this.users);
    },
    addStoreUser(user) {
      this.users.push(copyObject(user));
      this.originalUsers = copyObject(this.users);
    },
    toggleStoreEditMode() {
      this.editMode = !this.editMode;
    },
    disableStoreEditMode() {
      this.editMode = false;
    },
    enableStoreEditMode() {
      this.editMode = true;
    },
  },
});
