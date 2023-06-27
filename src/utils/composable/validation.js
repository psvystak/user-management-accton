import {
  required, email, helpers, maxLength,
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

export const rules = {
  avatar: {
    maxLength: helpers.withMessage(
      '999 - це максимум',
      maxLength(31),
    ),
    urlRegex: helpers.withMessage(
      'Формат поля https://i.pravatar.cc/434?u=номер',
      helpers.regex(/^https:\/\/i\.pravatar\.cc\/434\?u=\d{1,4}$/),
    ),
  },
  name: {
    required: helpers.withMessage(
      'Поле ім\'я обов\'язкове',
      required,
    ),
    onlyLettersAndSpaces: helpers.withMessage(
      'Ім\'я може містити лише літери та пробіли',
      helpers.regex(/^[A-Za-zА-Яа-яЁёІіЇїҐґ\s]+$/),
    ),
    noConsecutiveSpaces: helpers.withMessage(
      'Ім\'я не може складатися лише з пробілів або мати два пробіли підряд',
      helpers.regex(/^(?!.*\s\s).*$/),
    ),
    noRussian: helpers.withMessage(
      'Дякувати Богу, що я не москаль',
      helpers.regex(/^[^ЫыЁёЪъ]+$/),
    ),
    noDigits: helpers.withMessage(
      'Ім\'я не може містити цифри',
      helpers.regex(/^[^0-9]+$/),
    ),
    maxLength: helpers.withMessage('Максимальна кілкість символів - 23', maxLength(23)),
  },
  email: {
    required: helpers.withMessage(
      'Поле Емейл адреса обов\'язкове',
      required,
    ),
    email: helpers.withMessage(
      'Невірний формат Емейл адреси',
      email,
    ),
    maxLength: helpers.withMessage('Максимальна кілкість символів - 23', maxLength(46)),
  },
  department: {
    required: helpers.withMessage(
      'Поле Департамент обов\'язкове',
      required,
    ),
    maxLength: helpers.withMessage('Максимальна кілкість символів - 23', maxLength(23)),
    noConsecutiveSpaces: helpers.withMessage(
      'Департамент не може складатися лише з пробілів або мати два пробіли підряд',
      helpers.regex(/^(?!.*\s\s).*$/),
    ),
    noRussian: helpers.withMessage(
      'Дякувати Богу, що я не москаль',
      helpers.regex(/^[^ЫыЁёЪъ]+$/),
    ),
  },
};

export const v = (rules, userCopy) => useVuelidate(rules, userCopy);
