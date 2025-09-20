import { builder } from '../schemabuilder';
import { DenominationEnum } from './types';

export const UserUpdateInput = builder.inputType('UserUpdateInput', {
    fields: (t) => ({
      church: t.string(),
      denomination: t.field({ type: DenominationEnum }),
      firstName: t.string(),
      lastName: t.string(),
      address1: t.string(),
      address2: t.string(),
      city: t.string(),
      state: t.string(),
      email: t.string(),
      isOnboarded: t.boolean(),
      otherDenomination: t.string(),
    }),
});

export const EmailPasswordInput = builder.inputType('EmailPasswordInput', {
    fields: (t) => ({
        email: t.string({ required: true }),
        password: t.string({ required: true }),
    }),
});
