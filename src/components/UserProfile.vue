<script setup>
import {
  computed, onMounted, reactive, ref, watch,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { copyObject } from '@/utils/composable/copyObject';
import { v, rules } from '@/utils/composable/validation';
import { generateUUID } from '@/utils/composable/idGenerator';

import HeadComponent from '@/components/inputs/HeadComponent.vue';

const route = useRoute();
const save = ref(false);

const propsList = defineProps({
  id: {
    type: String,
    required: false,
    default: '',
  },
});

const usersStore = useUsersStore();
const { getUsers, getEditMode } = storeToRefs(usersStore);
const {
  toggleStoreEditMode, enableStoreEditMode, updateStoreUser, addStoreUser,
} = usersStore;

const baseAvatarURL = 'https://i.pravatar.cc/434?u=';

const cleanData = reactive({
  id: '',
  name: '',
  email: '',
  avatar: baseAvatarURL,
  department: '',
  head: '',
});

const users = computed(() => getUsers.value);

const user = computed(() => getUsers.value.find((user) => user.id === propsList.id) || cleanData);

if (!propsList.id) {
  enableStoreEditMode();
}

const userCopy = ref({});

onMounted(() => {
  userCopy.value = copyObject(user.value);
});

const editMode = computed(() => getEditMode.value);

const v$ = v(rules, userCopy);

const makeStringMask = (event) => {
  const newValue = event.target.value;
  const lastDigits = newValue.match(/\d+$/);
  if (lastDigits) {
    userCopy.value.avatar = baseAvatarURL + lastDigits[0];
  } else {
    userCopy.value.avatar = baseAvatarURL;
  }
};

const updateHeadValue = (value) => {
  userCopy.value.head = value;
};

watch(
  () => editMode.value,
  (oldValue, newValue) => {
    if (newValue && !save.value) {
      userCopy.value = copyObject(user.value);
    }
  },
);

const isFormChanged = computed(() => Object.keys(userCopy.value).every((field) => userCopy.value[field] === user.value[field]));

const updateUser = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  // тут можна було б звернутися до бекенду і зробити post-запит
  if (propsList.id) {
    save.value = true;
    updateStoreUser(userCopy.value);
    toggleStoreEditMode();
    save.value = false;
  } else {
    userCopy.value.id = generateUUID(users.value);
    addStoreUser(userCopy.value);
    // eslint-disable-next-line no-alert
    alert(`User ${userCopy.value.name} was added`);
    userCopy.value = copyObject(user.value);
    v$.value.$reset();
  }
};
</script>

<template>
  <VCard
    class="mx-auto"
    max-width="434"
    tile
  >
    <VImg
      :src="userCopy.avatar"
      alt="Avatar"
    />
    <VCol>
      <VAvatar
        size="100"
        style="position: absolute; top: 130px; border: 2px solid white"
      >
        <VImg
          :src="userCopy.avatar"
          alt="Аватар"
          height="434"
        />
      </VAvatar>
    </VCol>
    <VForm
      id="form"
      ref="formData"
      class="px-5"
      @submit.prevent="updateUser"
    >
      <VTextField
        v-model="userCopy.avatar"
        :disabled="!editMode"
        :error="v$.avatar.$invalid && v$.avatar.$dirty"
        :error-messages="v$.avatar.$errors.map((e) => e.$message)"
        class="mb-1"
        hide-details="auto"
        label="Аватар"
        variant="solo"
        @keydown="makeStringMask"
        @keyup="makeStringMask"
        @input="v$.avatar.$touch"
        @blur="v$.avatar.$touch"
      />
      <VTextField
        v-model="userCopy.name"
        :disabled="!editMode"
        :error="v$.name.$invalid && v$.name.$dirty"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        class="mb-1"
        hide-details="auto"
        label="Ім'я"
        variant="solo"
        @input="v$.name.$touch"
        @blur="v$.name.$touch"
      />
      <VTextField
        v-model="userCopy.email"
        :disabled="!editMode"
        :error="v$.email.$invalid && v$.email.$dirty"
        :error-messages="v$.email.$errors.map((e) => e.$message)"
        class="mb-1"
        hide-details="auto"
        label="Емейл адреса"
        variant="solo"
        @input="v$.email.$touch"
        @blur="v$.email.$touch"
      />
      <VTextField
        v-model="userCopy.department"
        :disabled="!editMode"
        :error="v$.department.$invalid && v$.department.$dirty"
        :error-messages="v$.department.$errors.map((e) => e.$message)"
        class="mb-1"
        hide-details="auto"
        label="Департамент"
        variant="solo"
        @input="v$.department.$touch"
        @blur="v$.department.$touch"
      />
      <HeadComponent
        :current-user-head="userCopy.head"
        :current-user-id="userCopy.id"
        :disabled="!editMode"
        :users="users"
        @update:modelValue="updateHeadValue"
      />
      <VBtn
        v-if="editMode"
        :disabled="isFormChanged"
        color="primary"
        form="form"
        class="mb-4"
        type="submit"
      >
        {{ propsList.id ? 'Зберігти' : 'Додати' }}
      </VBtn>
    </VForm>
  </VCard>
</template>

<style lang="scss" scoped>
:deep(.v-input) {
  height: 86px;
  .v-field {
    border-radius: 0;

    &--disabled {
      opacity: 1;
      box-shadow: none;
    }
  }
  .v-input__details {
    padding: 4px 0 0 0;
    display: flex;
    align-items: center;
  }
}

:deep(.v-img) {
  height: 434px;
}
</style>
