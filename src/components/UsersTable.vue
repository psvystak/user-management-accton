<script setup>
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users.js';

const router = useRouter();
const usersStore = useUsersStore();
const itemsPerPageOptions = [
  { value: 7, title: '7' },
  { value: 10, title: '10' },
  { value: 20, title: '20' },
  { value: 50, title: '50' },
  { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
];

const { removeStoreUser, filterStoreUsers } = usersStore;

const propsList = defineProps({
  users: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});

const findHeadEmailOfUser = (user) => propsList.users.find((currentUser) => currentUser.id === user?.head)?.email || 'Немає начальника';

const goToUserPersonalPage = (userId) => {
  router.push(`/users/${userId}`);
};

const removeUser = (userId) => {
  removeStoreUser(userId);
};

</script>

<template>
  <div>
    <template v-if="users.length === 0">
      <p class="no-users">
        Пусто
      </p>
    </template>
    <template v-else>
      <VDataTable
        :headers="headers"
        :items="users"
        :items-per-page="7"
        :items-per-page-options="itemsPerPageOptions"
        class="row-height-90 elevation-5"
      >
        <template #item.avatar="{ item }">
          <VAvatar>
            <img
              :src="item.columns.avatar"
              alt="Avatar"
            >
          </VAvatar>
        </template>
        <template #item.head="{ item }">
          {{ findHeadEmailOfUser(item.raw) }}
        </template>
        <template #item.button="{ item }">
          <VTooltip
            v-if="!editMode"
            text="Переглянути користувача"
            location="top"
          >
            <template v-slot:activator="{ props }">
              <VBtn
                v-bind="props"
                icon="mdi-account-arrow-right"
                @click="goToUserPersonalPage(item.value)"
              />
            </template>
          </VTooltip>
          <template v-else>
            <VTooltip
              text="Видалити користувача"
              location="top"
              class="warning-tooltip"
            >
              <template v-slot:activator="{ props }">
                <VBtn
                  v-bind="props"
                  icon="mdi-account-remove"
                  @click="removeUser(item.value)"
                />
              </template>
            </VTooltip>
          </template>
        </template>
      </VDataTable>
    </template>
  </div>
</template>

<style lang='scss' scoped>
:deep(.v-data-table) tr {
  height: 80px !important;
}
.no-users {
  background: white;
  text-align: center;
  padding: 18px;
  border-radius: 2px;
}
:deep(.v-data-table) .v-avatar.v-avatar--density-default img {
  width: 100%;
  height: 100%;
}
</style>
