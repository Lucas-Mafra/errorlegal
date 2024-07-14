import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const createGameSchema = z.object({
  name: z.string().trim().min(4).max(150),
  description: z.string().trim().min(4).max(255),
  imageUrl: z.string().url().nullable(),
  masterId: z.number(),
});

export const CreateGameGateway = new ZodValidationPipe(createGameSchema);
