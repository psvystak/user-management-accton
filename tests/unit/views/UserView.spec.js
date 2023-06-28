import { describe, expect, it } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { shallowMount } from '@vue/test-utils';
import UserView from '@/views/UserView.vue';
import UserProfile from '@/components/UserProfile.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/user/:id', component: UserView }],
});

describe('UserView.vue', () => {
  it('sends the id parameter to UserProfile', async () => {
    const testId = 'test-id';

    router.push(`/user/${testId}`);
    await router.isReady();

    const wrapper = shallowMount(UserView, {
      global: {
        plugins: [router],
      },
    });

    const userProfile = wrapper.findComponent(UserProfile);
    expect(userProfile.props('id')).toBe(testId);
  });
});
