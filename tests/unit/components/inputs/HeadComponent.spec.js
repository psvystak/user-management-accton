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
import HeadComponent from '@/components/inputs/HeadComponent.vue';
import { useUsersStore } from '@/stores/users';

const vuetify = createVuetify({
  components: {
    ...vuetifyComponents,
  },
  directives: vuetifyDirectives,
});

const users = [
  {
    'id': '62227404-8066-11ed-a1eb-0242ac120002',
    'name': 'William Dolores',
    'email': 'dolores.williams@example.com',
    'avatar': 'https://i.pravatar.cc/434?u=1',
    'department': 'Sales',
    'head': '69f01b0a-8066-11ed-a1eb-0242ac120002',
  },
  {
    'id': '69f01b0a-8066-11ed-a1eb-0242ac120002',
    'name': 'Ben George',
    'email': 'b.george@example.com',
    'avatar': 'https://i.pravatar.cc/434?u=12',
    'department': 'Sales',
    'head': null,
  },
  {
    'id': '722907f0-4066-11ed-a1eb-0242ac120002',
    'name': 'Robert Kim',
    'email': 'kim1987@example.com',
    'avatar': 'https://i.pravatar.cc/434?u=13',
    'department': 'Accountant',
    'head': '69f01b0a-8066-11ed-a1eb-0242ac120002',
  },
  {
    'id': '722907f0-5066-11ed-a1eb-0242ac120002',
    'name': 'Ben Sala',
    'email': 'b.sila@example.com',
    'avatar': 'https://i.pravatar.cc/434?u=14',
    'department': 'Sales',
    'head': '69f01b0a-8066-11ed-a1eb-0242ac120002',
  },
  {
    'id': '722907f0-6066-11ed-a1eb-0242ac120002',
    'name': 'Kerido Fado',
    'email': 'fadooo@example.com',
    'avatar': 'https://i.pravatar.cc/434?u=15',
    'department': 'Sales',
    'head': '69f01b0a-8066-11ed-a1eb-0242ac120002',
  },
  {
    'id': '722907f0-9066-11ed-a1eb-0242ac120002',
    'name': 'Ben Malta',
    'email': 'b.malta@example.com',
    'avatar': 'https://i.pravatar.cc/434?u=16',
    'department': 'Managers',
    'head': '69f01b0a-8066-11ed-a1eb-0242ac120002',
  },
  {
    'id': '734907f0-9066-11ed-a1eb-0242ac120002',
    'name': 'Ben Shapiro',
    'email': 'b.shapiro@example.com',
    'avatar': 'https://i.pravatar.cc/434?u=19',
    'department': 'Sales',
    'head': '722907f0-6066-11ed-a1eb-0242ac120002',
  },
  {
    'id': '722807f0-8066-11ed-a1eb-0242ac120002',
    'name': 'Balando Wholles',
    'email': 'balando@example.com',
    'avatar': 'https://i.pravatar.cc/434?u=17',
    'department': 'Accountant',
    'head': null,
  }];
const currentUserHead = '69f01b0a-8066-11ed-a1eb-0242ac120002';
const currentUserId = '722807f0-8066-11ed-a1eb-0242ac120002';
const disabled = true;
describe('HeadComponent', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(HeadComponent, {
      global: {
        plugins: [vuetify],
      },
      props: {
        users,
        currentUserId,
        currentUserHead,
        disabled,
      },
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('disables the autocomplete when disabled prop is true', () => {
    const autocomplete = wrapper.findComponent({ name: 'VAutocomplete' });

    expect(autocomplete.props('disabled')).toBe(true);
  });

  it('updates selectedUser when currentUserHead changes', async () => {
    await wrapper.setProps({ currentUserHead: '722807f0-8066-11ed-a1eb-0242ac120002' });

    const { selectedUser } = wrapper.vm;

    expect(selectedUser).toEqual(users[7]);
  });
  it('updates usersExcludeCurrent when currentUserId changes', async () => {
    await wrapper.setProps({ currentUserId: '69f01b0a-8066-11ed-a1eb-0242ac120002' });

    const { usersExcludeCurrent } = wrapper.vm;

    expect(usersExcludeCurrent).toEqual([users[6], users[7]]);
  });
  it('emits "update:modelValue" event with the provided value', () => {
    const value = 'example value';

    wrapper.vm.emitUpdateModelValue(value);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([value]);
  });
});
