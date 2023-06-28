import {
  describe, expect, it,
} from 'vitest';
import { generateUUID } from '@/utils/composable/idGenerator';

describe('generateUUID', () => {
  it('generates a unique UUID', () => {
    const users = [
      { id: 'abc123' },
      { id: 'def456' },
    ];

    const uuid = generateUUID(users);

    const arrayOfIds = users.map((user) => user.id);
    expect(arrayOfIds.includes(uuid)).toBe(false);
  });

  it('handles recursive generation of UUID', () => {
    const users = [
      { id: 'abc123' },
      { id: 'def456' },
    ];

    const duplicateUUID = generateUUID(users);
    users.push({ id: duplicateUUID });

    const uuid = generateUUID(users);

    expect(uuid).not.toBe(duplicateUUID);
  });
});
