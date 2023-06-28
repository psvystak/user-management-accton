import {
  describe, expect, it,
} from 'vitest';
import { v, rules } from '@/utils/composable/validation';

describe('validationdisableStoreEditMode', () => {
  it('validates avatar maxLength rule', () => {
    const avatar = 'https://i.pravatar.cc/1234567890abcdef1234567890abcdef';

    const validation = v({ avatar: rules.avatar }, { avatar });

    expect(validation.value.avatar.$invalid).toBe(true);
  });

  it('validates avatar urlRegex rule', () => {
    const avatar = 'https://i.pravatar.cc/434?u=12345';

    const validation = v({ avatar: rules.avatar }, { avatar });

    expect(validation.value.avatar.$invalid).toBe(true);
  });

  it('validates name required rule', () => {
    const name = '';

    const validation = v({ name: rules.name }, { name });

    expect(validation.value.name.$invalid).toBe(true);
  });

  it('validates name onlyLettersAndSpaces rule', () => {
    const name = 'John123';

    const validation = v({ name: rules.name }, { name });

    expect(validation.value.name.$invalid).toBe(true);
  });

  it('validates name noConsecutiveSpaces rule', () => {
    const name = 'John  Doe';

    const validation = v({ name: rules.name }, { name });

    expect(validation.value.name.$invalid).toBe(true);
  });

  it('validates name noDigits rule', () => {
    const name = 'John123';

    const validation = v({ name: rules.name }, { name });

    expect(validation.value.name.$invalid).toBe(true);
  });

  it('validates name maxLength rule', () => {
    const name = 'This is a very long name that exceeds the maximum character limit';

    const validation = v({ name: rules.name }, { name });

    expect(validation.value.name.$invalid).toBe(true);
  });

  it('validates email required rule', () => {
    const email = '';

    const validation = v({ email: rules.email }, { email });

    expect(validation.value.email.$invalid).toBe(true);
  });

  it('validates email email rule', () => {
    const email = 'invalid-email';

    const validation = v({ email: rules.email }, { email });

    expect(validation.value.email.$invalid).toBe(true);
  });

  it('validates email maxLength rule', () => {
    const email = 'very-long-email-address-that-exceeds-the-maximum-character-limit@example.com';

    const validation = v({ email: rules.email }, { email });

    expect(validation.value.email.$invalid).toBe(true);
  });

  it('validates department required rule', () => {
    const department = '';

    const validation = v({ department: rules.department }, { department });

    expect(validation.value.department.$invalid).toBe(true);
  });

  it('validates department maxLength rule', () => {
    const department = 'This is a very long department name that exceeds the maximum character limit';

    const validation = v({ department: rules.department }, { department });

    expect(validation.value.department.$invalid).toBe(true);
  });

  it('validates department noConsecutiveSpaces rule', () => {
    const department = 'Department  Name';

    const validation = v({ department: rules.department }, { department });

    expect(validation.value.department.$invalid).toBe(true);
  });

  it('validates department noRussian rule', () => {
    const department = 'Ы';

    const validation = v({ department: rules.department }, { department });

    expect(validation.value.department.$invalid).toBe(true);
  });
});
