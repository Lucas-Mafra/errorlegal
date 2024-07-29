import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const createPlayerSchema = z.object({
  name: z.string().trim().min(4).max(20),
  password: z.string().trim().min(8).max(255),
});

export const CreatePlayerGateway = new ZodValidationPipe(createPlayerSchema);
