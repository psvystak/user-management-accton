<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']); // Define emits

const propsList = defineProps({
  users: {
    type: Array,
    required: true,
  },
  currentUserHead: {
    type: String,
    required: false,
    default: '',
  },
  currentUserId: {
    type: String,
    required: false,
    default: '',
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});

const selectedUser = ref('');
const usersExcludeCurrent = ref([]);

selectedUser.value = propsList.users.find((user) => user.id === propsList.currentUserHead) || null;

// фільтрація для того, щоб юзер не міг бути сам собі начальником,
// і щоб його начальником не міг бути той, хто у нього вже є у підлеглих
usersExcludeCurrent.value = propsList.users.filter((user) => user.id !== propsList.currentUserId
  && user.head !== propsList.currentUserId);

const emitUpdateModelValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div>
    <VAutocomplete
      v-model="selectedUser"
      :items="usersExcludeCurrent"
      color="blue-grey-lighten-2"
      item-title="name"
      item-value="id"
      label="Начальник"
      variant="solo"
      :disabled="disabled"
      @update:modelValue="emitUpdateModelValue"
    >
      <template v-slot:chip="{ props, item }">
        <VChip
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :text="item.raw.name"
        />
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item?.raw?.avatar"
          :title="item?.raw?.name"
        />
      </template>
    </VAutocomplete>
  </div>
</template>

<style lang='scss' scoped>
:deep(.v-input--disabled) .v-field__append-inner {
  display: none;
}
</style>
