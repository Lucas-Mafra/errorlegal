import { ZodValidationPipe } from '@shared/pipes/ZodValidation';
import { z } from 'zod';

const updateMasterNameSchema = z.object({
  masterName: z.string().trim().min(2).max(125),
});

export const UpdateMasterNameGateway = new ZodValidationPipe(
  updateMasterNameSchema,
);
