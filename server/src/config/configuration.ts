export default () => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '4000', 10),
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    corsOrigin: process.env.CORS_ORIGIN || '*',
  },
  supabase: {
    url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  minecraft: {
    host: process.env.MINECRAFT_HOST || 'play.eclipsemc.me',
    port: parseInt(process.env.MINECRAFT_PORT || '26048', 10),
  },
});
