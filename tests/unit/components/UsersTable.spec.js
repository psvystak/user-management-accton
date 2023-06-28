import {
  afterEach,
  beforeEach,
  describe, expect, it, vi,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import * as vuetifyComponents from 'vuetify/components';
import { createVuetify } from 'vuetify';
import * as vuetifyDirectives from 'vuetify/directives';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useUsersStore } from '@/stores/users';
import UsersTable from '@/components/UsersTable.vue';

const vuetify = createVuetify({
  components: {
    ...vuetifyComponents,
    VDataTable,
  },
  directives: vuetifyDirectives,
});

vi.mock('@/store/users', () => ({
  useUsersStore: vi.fn(() => ({
    removeStoreUser: vi.fn(),
    setStoreUsersPerPage: vi.fn(),
    getUsersPerPage: 7,
  })),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));
const mockUsers = [
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
const headers = [
  {
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
  },
];
describe('UsersTable.vue', () => {
  let wrapper;
  let usersStore;
  beforeEach(() => {
    wrapper = mount(UsersTable, {
      global: {
        plugins: [createTestingPinia({ stubActions: false }), vuetify],
      },
      props: { users: mockUsers, headers },
    });
    usersStore = useUsersStore();
    usersStore.usersPerPage = 7;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders the table with users', async () => {
    expect(wrapper.find('.v-data-table').exists()).toBe(true);
    expect(wrapper.findAll('.v-data-table tbody tr').length).toBe(usersStore.usersPerPage);

    const pushSpy = vi.spyOn(wrapper.vm.router, 'push');
    await wrapper.find('.go-to-personal-page').trigger('click');
    expect(pushSpy).toHaveBeenCalledWith(`/user/${mockUsers[0].id}`);

    await wrapper.setProps({ editMode: true });
    const removedUser = vi.spyOn(wrapper.vm, 'removeUser');
    wrapper.vm.$nextTick();
    await wrapper.find('.account-remove').trigger('click');
    expect(removedUser).toHaveBeenCalledWith(mockUsers[0].id);
  });
  it('sets the number of users per page in the store', async () => {
    const setStoreUsersPerPageSpy = vi.spyOn(wrapper.vm, 'writeCountToStore');
    const newValue = 10;
    await wrapper.vm.writeCountToStore(newValue);
    expect(setStoreUsersPerPageSpy).toHaveBeenCalledWith(newValue);
  });
  it('displays "Пусто" when there are no users', async () => {
    await wrapper.setProps({ users: [] });
    expect(wrapper.find('.no-users').text()).toBe('Пусто');
  });
});
