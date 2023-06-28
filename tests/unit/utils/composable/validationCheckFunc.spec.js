import {
  describe, expect, it, vi,
} from 'vitest';
import { useVuelidate } from '@vuelidate/core';
import { v } from '@/utils/composable/validation';

describe('check v', () => {
  it('calls useVuelidate with correct arguments', () => {
    vi.mock('@vuelidate/core', () => ({
      useVuelidate: vi.fn(),
    }));
    const rules = {
      name: {
        required: true,
      },
    };
    const userCopy = {
      name: 'Petro',
    };

    const validationResult = { $invalid: false };
    useVuelidate.mockReturnValue(validationResult);

    const result = v(rules, userCopy);

    expect(useVuelidate).toHaveBeenCalledWith(rules, userCopy);
    expect(result).toBe(validationResult);
    vi.clearAllMocks();
  });
});
