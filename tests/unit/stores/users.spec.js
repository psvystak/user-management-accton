import { createPinia } from 'pinia';
import {
  beforeEach,
  describe, expect, it,
} from 'vitest';
import { useUsersStore } from '@/stores/users';
import { copyObject } from '@/utils/composable/copyObject';

describe('users', () => {
  let store;

  beforeEach(() => {
    const pinia = createPinia();
    store = useUsersStore(pinia);
  });

  it('sets and retrieves users', () => {
    const users = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];

    store.setStoreUsers(users);

    expect(store.getUsers).toEqual(users);
  });

  it('sets and retrieves users per page', () => {
    const count = 10;

    store.setStoreUsersPerPage(count);

    expect(store.getUsersPerPage).toBe(count);
  });

  it('filters users based on search value', () => {
    const users = [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' },
      { id: 3, name: 'User 3', email: 'user3@example.com' },
    ];
    store.setStoreUsers(users);

    store.filterStoreUsers('user1');
    expect(store.getUsers).toEqual([
      { id: 1, name: 'User 1', email: 'user1@example.com' },
    ]);

    store.filterStoreUsers('example');
    expect(store.getUsers).toEqual(users);

    store.filterStoreUsers('');
    expect(store.getUsers).toEqual(users);
  });

  it('removes a user from the store', () => {
    const users = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];
    store.setStoreUsers(users);

    store.removeStoreUser(1);

    expect(store.getUsers).toEqual([{ id: 2, name: 'User 2' }]);
  });

  it('updates a user in the store', () => {
    const users = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];
    store.setStoreUsers(users);

    const updatedUser = { id: 2, name: 'Updated User 2' };
    store.updateStoreUser(updatedUser);

    expect(store.getUsers).toEqual([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'Updated User 2' },
    ]);
  });

  it('adds a user to the store', () => {
    const users = [
      { id: 1, name: 'User 1' },
    ];
    store.setStoreUsers(users);

    const newUser = { id: 2, name: 'User 2' };
    store.addStoreUser(newUser);

    expect(store.getUsers).toEqual([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]);
  });

  it('toggles edit mode', () => {
    expect(store.getEditMode).toBe(false);

    store.toggleStoreEditMode();
    expect(store.getEditMode).toBe(true);

    store.toggleStoreEditMode();
    expect(store.getEditMode).toBe(false);
  });

  it('disables edit mode', () => {
    store.enableStoreEditMode();
    expect(store.getEditMode).toBe(true);

    store.disableStoreEditMode();
    expect(store.getEditMode).toBe(false);
  });

  it('enables edit mode', () => {
    expect(store.getEditMode).toBe(false);

    store.enableStoreEditMode();
    expect(store.getEditMode).toBe(true);
  });
});
