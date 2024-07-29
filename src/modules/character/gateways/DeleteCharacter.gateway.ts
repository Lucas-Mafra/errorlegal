import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const deleteCharacterSchema = z.object({
  characterId: z.number(),
});

export const DeleteCharacterGateway = new ZodValidationPipe(
  deleteCharacterSchema,
);
