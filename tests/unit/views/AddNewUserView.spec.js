import {
  describe, expect, it,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AddNewUserView from '@/views/AddNewUserView.vue';
import UserProfile from '@/components/UserProfile.vue';

describe('AddNewUserView.vue', () => {
  it('renders the UserProfile component', () => {
    const wrapper = shallowMount(AddNewUserView);

    expect(wrapper.findComponent(UserProfile).exists()).toBe(true);
  });
});
