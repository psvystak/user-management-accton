<script setup>
import {
  computed, ref, reactive, watch, watchEffect,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { copyObject } from '../utils/composable/copyObject';

const route = useRoute();
const save = ref(false);
const userId = ref(route.params.id);

const propsList = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const usersStore = useUsersStore();
const { getUsers, getEditMode } = storeToRefs(usersStore);
const { toggleStoreEditMode, updateStoreUser } = usersStore;

const user = computed(() => getUsers.value.find((user) => user.id === propsList.id));

const userCopy = reactive(copyObject(user.value));

const editMode = computed(() => getEditMode.value);

const baseAvatarURL = 'https://i.pravatar.cc/434?u=';

const makeStringMask = (event) => {
  const newValue = event.target.value;
  const lastDigits = newValue.match(/\d+$/);
  console.log(lastDigits);
  if (lastDigits) {
    userCopy.avatar = baseAvatarURL + lastDigits[0];
  } else {
    userCopy.avatar = 'https://i.pravatar.cc/434?u=';
  }
};

const avatarValidation = computed(() => [
  (value) => (value.length <= 31 || '999 - це максимум'),
  (value) => {
    const urlRegex = /^https:\/\/i\.pravatar\.cc\/434\?u=\d{1,4}$/;
    return urlRegex.test(value) || 'Формат поля https://i.pravatar.cc/434?u=номер';
  },
]);

const nameValidation = computed(() => [
  (value) => (!!value || 'Поле ім\'я є обов\'язковим для заповнення'),
  (value) => (!/\d/.test(value) || 'Ім\'я не може містити цифри'),
  (value) => (!/[^A-Za-zА-Яа-яЁёІіЇї\s]/.test(value) || 'Ім\'я може містити лише літери та пробіли'),
  (value) => (value.length <= 23 || 'Максимальна кілкість символів - 23'),
  (value) => (!(/^\s+$/.test(value) || /\s\s/.test(value)) || 'Ім\'я не може складатись лише з пробілів або мати два пробіли підряд'),
]);

const emailValidation = computed(() => [
  (value) => (!!value || 'Поле email є обов\'язковим для заповнення'),
  (value) => (/.+@.+\..+/.test(value) || 'Невірний формат email'),
]);

watch(() => editMode.value, (oldValue, newValue) => {
  if (newValue && !save.value) {
    userCopy.avatar = user.value.avatar;
    userCopy.name = user.value.name;
    userCopy.email = user.value.email;
    userCopy.department = user.value.department;
  }
});

const isFormValid = computed(() => {
  const isFieldChanged = userCopy.avatar !== user.value.avatar
    || userCopy.name !== user.value.name
    || userCopy.email !== user.value.email
    || userCopy.department !== user.value.department;

  const avatarErrors = avatarValidation.value.filter((rule) => typeof rule(userCopy.avatar) === 'string');
  const nameErrors = nameValidation.value.filter((rule) => typeof rule(userCopy.name) === 'string');
  const emailErrors = emailValidation.value.filter((rule) => typeof rule(userCopy.email) === 'string');
  const hasValidationErrors = !!(avatarErrors.length || nameErrors.length || emailErrors.length);

  return (!isFieldChanged || hasValidationErrors);
});
function updateUser() {
  save.value = true;
  updateStoreUser(userCopy);
  toggleStoreEditMode();
  save.value = false;
}

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
        style="position:absolute; top: 130px; border: 2px solid white;"
      >
        <VImg
          :src="userCopy.avatar"
          height="434"
        />
      </VAvatar>
    </VCol>
    <VForm
      class="px-5"
      @submit.prevent
    >
      <VTextField
        v-model="userCopy.avatar"
        :disabled="!editMode"
        hide-details="auto"
        label="Аватар"
        variant="solo"
        class="mb-4"
        :rules="avatarValidation"
        @keyup="makeStringMask"
        @keydown="makeStringMask"
      />
      <VTextField
        v-model="userCopy.name"
        :disabled="!editMode"
        hide-details="auto"
        label="Ім'я"
        variant="solo"
        class="mb-4"
        :rules="nameValidation"
      />
      <VTextField
        v-model="userCopy.email"
        :disabled="!editMode"
        hide-details="auto"
        label="Емейл адреса"
        variant="solo"
        class="mb-4"
        :rules="emailValidation"
      />
      <VTextField
        v-model="userCopy.department"
        :disabled="!editMode"
        hide-details="auto"
        label="Департамент"
        variant="solo"
        class="mb-4"
      />
      <VBtn
        v-if="editMode"
        type="submit"
        :disabled="isFormValid"
        class="mb-4"
        color="primary"
        @click="updateUser"
      >
        Зберігти
      </VBtn>
    </VForm>
  </VCard>
</template>

<style lang='scss' scoped>
:deep(.v-input) {
  .v-field {
    border-radius: 0;
    &--disabled {
      opacity: 1;
      box-shadow: none;
    }
  }
}
</style>