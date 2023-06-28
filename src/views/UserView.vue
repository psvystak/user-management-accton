<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import UserProfile from '@/components/UserProfile.vue';

const route = useRoute();
const userId = ref(route.params.id);
</script>

<template>
  <UserProfile :id="userId" />
</template>

<style lang="scss" scoped></style>
