import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const deleteGameSchema = z.object({
  gameId: z.number(),
});

export const DeleteGameGateway = new ZodValidationPipe(deleteGameSchema);
