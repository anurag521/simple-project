import { z } from 'zod';

export const userUpdateSchema = z.object({
    name: z.string(),
    email: z.email(),
    phone: z.string(),
    collegeName: z.string().optional(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        country: z.string()
    }),
    collegeAddress: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().optional()
    }).optional()
});
