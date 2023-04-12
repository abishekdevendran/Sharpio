import * as z from 'zod';

export const loginFormSchema = z.object({
	username: z
		.string()
		.min(5, { message: 'Username must be minimum 5 characters long' })
		.max(20, { message: 'Username must be less than 20 characters long' }),
	password: z.string().min(5).max(20),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;
