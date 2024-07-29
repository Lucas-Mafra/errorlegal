import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const updateCharacterSchema = z.object({
  nickname: z.string().trim().min(2).max(150),
});

export const UpdateCharacterGateway = new ZodValidationPipe(
  updateCharacterSchema,
);
