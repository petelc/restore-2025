import { z } from 'zod';

const passwordValidation = new RegExp(
  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
);

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(passwordValidation, {
    message:
      'Password must be between 6 and 10 characters, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
