import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const createGameSchema = z.object({
  name: z.string().trim().min(4).max(255),
  description: z.string().min(4).max(1000),
  imageUrl: z.string().url().nullable(),
});

export const CreateGameGateway = new ZodValidationPipe(createGameSchema);
