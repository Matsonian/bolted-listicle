import { builder } from '../schemabuilder';

export const UserUpdateInput = builder.inputType('UserUpdateInput', {
    fields: (t) => ({
      firstName: t.string(),
      lastName: t.string(),
      address1: t.string(),
      address2: t.string(),
      city: t.string(),
      state: t.string(),
      email: t.string(),
      isOnboarded: t.boolean(),
    }),
});

export const EmailPasswordInput = builder.inputType('EmailPasswordInput', {
    fields: (t) => ({
        email: t.string({ required: true }),
        password: t.string({ required: true }),
    }),
});
