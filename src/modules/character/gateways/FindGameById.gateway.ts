import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const findCharacterByIdSchema = z.coerce.number();

export const FindCharacterByIdGateway = new ZodValidationPipe(
  findCharacterByIdSchema,
);
