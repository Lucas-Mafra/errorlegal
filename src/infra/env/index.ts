import { config } from 'dotenv';
import { z } from 'zod';
config(); // Carrega as variáveis do arquivo .env

const envSchema = z.object({
  PORT: z.coerce.number().default(7777),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['dev', 'production']).default('production'),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  DAYS_TO_EXPIRES_REFRESH_TOKEN: z.coerce.number().default(7),
});

type EnvSchema = z.infer<typeof envSchema>;
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}
const env: EnvSchema = _env.data;
export { env };
