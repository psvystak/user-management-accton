<script setup>
import {
  computed, ref, reactive, watch,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { copyObject } from '@/utils/composable/copyObject';
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
const { toggleStoreEditMode, enableStoreEditMode, updateStoreUser } = usersStore;

const users = computed(() => getUsers.value);

const cleanData = reactive({
  'id': '',
  'name': '',
  'email': '',
  'avatar': 'https://i.pravatar.cc/434?u=',
  'department': '',
  'head': '',
});

const formData = ref(null);

const user = computed(() => getUsers.value.find((user) => user.id === propsList.id) || cleanData);

if (!propsList.id) {
  enableStoreEditMode();
}

const userCopy = reactive(copyObject(user.value));

const editMode = computed(() => getEditMode.value);

const baseAvatarURL = 'https://i.pravatar.cc/434?u=';

const makeStringMask = (event) => {
  const newValue = event.target.value;
  const lastDigits = newValue.match(/\d+$/);
  if (lastDigits) {
    userCopy.avatar = baseAvatarURL + lastDigits[0];
  } else {
    userCopy.avatar = 'https://i.pravatar.cc/434?u=';
  }
};

const updateHeadValue = (value) => {
  userCopy.head = value;
};

const avatarValidation = computed(() => [
  (value) => (value.length <= 31 || '999 - це максимум'),
  (value) => {
    const urlRegex = /^https:\/\/i\.pravatar\.cc\/434\?u=\d{1,4}$/;
    return urlRegex.test(value) || 'Формат поля https://i.pravatar.cc/434?u=номер';
  },
]);

const nameValidation = computed(() => [
  (value) => (!!value || "Поле Ім'я є обов'язковим для заповнення"),
  (value) => (!/\d/.test(value) || "Ім'я не може містити цифри"),
  (value) => (!/[^A-Za-zА-Яа-яЁёІіЇїҐґ\s]/.test(value) || "Ім'я може містити лише літери та пробіли"),
  (value) => (value.length <= 23 || 'Максимальна кілкість символів - 23'),
  (value) => (!(/^\s+$/.test(value) || /\s\s/.test(value)) || "Ім'я не може складатись лише з пробілів або мати два пробіли підряд"),
  (value) => (!/[ЫыЁёЪъ]/.test(value) || 'Дякувати Богу, що я не москаль'),
]);

const departmentValidation = computed(() => [
  (value) => (!!value || "Поле Департамент є обов'язковим для заповнення"),
  (value) => (value.length <= 23 || 'Максимальна кілкість символів - 23'),
  (value) => (!(/^\s+$/.test(value) || /\s\s/.test(value))
    || 'Департамент не може складатися лише з пробілів або мати два пробіли підряд'),
  (value) => (!/[ЫыЁёЪъ]/.test(value) || 'Дякувати Богу, що я не москаль'),
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
    userCopy.head = user.value.head;
  }
});

const isFormValid = computed(() => {
  const isFieldChanged = userCopy.avatar !== user.value.avatar
    || userCopy.name !== user.value.name
    || userCopy.email !== user.value.email
    || userCopy.department !== user.value.department
    || userCopy.head !== user.value.head;

  const avatarErrors = avatarValidation.value.filter((rule) => typeof rule(userCopy.avatar) === 'string');
  const nameErrors = nameValidation.value.filter((rule) => typeof rule(userCopy.name) === 'string');
  const emailErrors = emailValidation.value.filter((rule) => typeof rule(userCopy.email) === 'string');
  const departamentErrors = departmentValidation.value.filter((rule) => typeof rule(userCopy.department) === 'string');
  const hasValidationErrors = !!(avatarErrors.length
    || nameErrors.length
    || emailErrors.length
    || departamentErrors.length);

  return (!isFieldChanged || hasValidationErrors);
});

const updateUser = (form) => {
  // тут можна було б звернутися до бекенду і зробити post-запит
  if (propsList.id) {
    save.value = true;
    updateStoreUser(userCopy);
    toggleStoreEditMode();
    save.value = false;
  } else {
    userCopy.id = Date.now();
    console.log(userCopy);
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
        style="position:absolute; top: 130px; border: 2px solid white;"
      >
        <VImg
          :src="userCopy.avatar"
          height="434"
        />
      </VAvatar>
    </VCol>
    <VForm
      id="form"
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
        :rules="departmentValidation"
        :disabled="!editMode"
        hide-details="auto"
        label="Департамент"
        variant="solo"
        class="mb-4"
      />
      <HeadComponent
        :users="users"
        :current-user-head="userCopy.head"
        :current-user-id="userCopy.id"
        :disabled="!editMode"
        @update:model-value="updateHeadValue"
      />
      <VBtn
        v-if="editMode"
        type="submit"
        :disabled="isFormValid"
        class="mb-4"
        color="primary"
        @click="updateUser"
      >
        {{ propsList.id ? 'Зберігти' : 'Додати' }}
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
