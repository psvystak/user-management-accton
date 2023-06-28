import {
  describe, expect, it,
} from 'vitest';
import { copyObject } from '@/utils/composable/copyObject.js';

describe('copyObject.js', () => {
  it('creates a deep copy of an object', () => {
    const originalObject = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA',
      },
    };

    const copiedObject = copyObject(originalObject);

    expect(copiedObject).not.toBe(originalObject);

    expect(copiedObject).toEqual(originalObject);

    copiedObject.name = 'Petro';
    copiedObject.address.city = 'Zhytomyr';

    expect(copiedObject.name).toBe('Petro');
    expect(copiedObject.address.city).toBe('Zhytomyr');

    expect(originalObject.name).toBe('John');
    expect(originalObject.address.city).toBe('New York');
  });
});
