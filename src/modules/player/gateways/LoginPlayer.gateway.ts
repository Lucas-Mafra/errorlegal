import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const loginPlayerSchema = z.object({
  name: z.string().trim().min(4).max(20).max(255),
  password: z.string().trim().min(8).max(255),
});

export const LoginPlayerGateway = new ZodValidationPipe(loginPlayerSchema);
