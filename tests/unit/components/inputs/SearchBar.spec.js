import { mount } from '@vue/test-utils';
import {
  afterEach,
  beforeEach,
  describe, expect, it, vi,
} from 'vitest';
import { createVuetify } from 'vuetify';
import * as vuetifyComponents from 'vuetify/components';
import * as vuetifyDirectives from 'vuetify/directives';
import { createTestingPinia } from '@pinia/testing';
import SearchBar from '@/components/inputs/SearchBar.vue';

const vuetify = createVuetify({
  components: {
    ...vuetifyComponents,
  },
  directives: vuetifyDirectives,
});

describe('SearchBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchBar, {
      global: {
        plugins: [createTestingPinia({ stubActions: true }), vuetify],
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls searchUser function on keyup event', async () => {
    const searchUserd = vi.spyOn(wrapper.vm, 'searchUser');

    const inputElement = wrapper.find('input');
    await inputElement.trigger('keyup');
    wrapper.vm.searchUser();
    expect(searchUserd).toHaveBeenCalled();
  });

  it('updates searchValue when input value changes', async () => {
    // Find the input element and set a value
    const inputElement = wrapper.find('input');
    await inputElement.setValue('example value');

    // Expect the searchValue to be updated accordingly
    expect(wrapper.vm.searchValue).toBe('example value');
  });
});
