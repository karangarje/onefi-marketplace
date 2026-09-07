import { z } from 'zod';

export const slugSchema = z
  .string()
  .min(1, 'Slug cannot be empty')
  .max(100, 'Slug is too long')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens');

export const productQuerySchema = z.object({
  brand: z.string().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});
