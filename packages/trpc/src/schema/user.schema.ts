import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string(),
  name: z.string().min(3),
});

export const updateUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().min(3),
});

export const deleteUserSchema = z.object({
  id: z.string(),
});
