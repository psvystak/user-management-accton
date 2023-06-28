import {
  describe, expect, it, vi, afterEach, beforeEach,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useUsersStore } from '@/stores/users';
import HomeView from '@/views/HomeView.vue';
import SearchBar from '@/components/inputs/SearchBar.vue';
import UsersTable from '@/components/UsersTable.vue';

vi.mock('@/store/users', () => ({
  useUsersStore: vi.fn(() => ({
    filterStoreUsers: vi.fn(),
  })),
}));

describe('HomeView.vue', () => {
  let wrapper;
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
  const headers = [{
    title: 'Аватар',
    key: 'avatar',
    sortable: false,
    align: 'center',
  },
  {
    title: 'Ім’я користувача',
    key: 'name',
    sortable: true,
    align: 'start',
  },
  {
    title: 'Email користувача',
    key: 'email',
    sortable: true,
    align: 'start',
  },
  {
    title: 'Email начальника',
    key: 'head',
    sortable: true,
    align: 'start',
  },
  {
    title: '', key: 'button', sortable: false, align: 'center',
  }];

  beforeEach(() => {
    wrapper = shallowMount(HomeView, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const usersStore = useUsersStore();
    usersStore.users = users;
    usersStore.headers = headers;
    usersStore.editMode = false;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders SearchBar and UsersTable components with correct props', () => {
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
    expect(wrapper.findComponent(UsersTable).exists()).toBe(true);

    const usersTableProps = wrapper.findComponent(UsersTable).props();
    expect(usersTableProps.users).toEqual(users);
    expect(usersTableProps.editMode).toBe(false);
    expect(usersTableProps.headers).toEqual(headers);
  });

  it('calls filterStoreUsers with an empty string on component unmount', () => {
    wrapper.unmount();
    const usersStore = useUsersStore();
    expect(usersStore.filterStoreUsers).toHaveBeenCalledWith('');
  });
});
