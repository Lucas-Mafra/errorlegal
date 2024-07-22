import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const updateGameSchema = z.object({
  name: z.string().trim().min(4).max(20),
  description: z.string().trim().min(4).max(255),
  imageUrl: z.string().url().nullable(),
});

export const UpdateGameGateway = new ZodValidationPipe(updateGameSchema);
