import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(4000),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGIN: Joi.string().default('*'),

  SUPABASE_URL: Joi.string().uri().optional(),
  SUPABASE_ANON_KEY: Joi.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: Joi.string().optional(),
  VITE_SUPABASE_URL: Joi.string().uri().optional(),
  VITE_SUPABASE_ANON_KEY: Joi.string().optional(),

  DATABASE_URL: Joi.string().required(),

  MINECRAFT_HOST: Joi.string().hostname().default('play.eclipsemc.me'),
  MINECRAFT_PORT: Joi.number().default(26048),
});
