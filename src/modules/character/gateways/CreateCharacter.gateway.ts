import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const createCharacterSchema = z.object({
  nickname: z.string().trim().min(2).max(150),
  gameId: z.number(),
});

export const CreateCharacterGateway = new ZodValidationPipe(
  createCharacterSchema,
);
