import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const findGameByIdSchema = z.object({
  gameId: z.string(),
});

export const FindGameByIdGateway = new ZodValidationPipe(findGameByIdSchema);
