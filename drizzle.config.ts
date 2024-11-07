import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://postgres.vxadwwlgjrhoshndlxhu:E4R6s2i1G3$@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
  },
});