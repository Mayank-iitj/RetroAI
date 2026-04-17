import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  GROQ_API_KEY: z.string().min(1),
  AI_MODEL: z.string().default("llama-3.3-70b-versatile"),
  AI_COST_INPUT_PER_1M: z.coerce.number().default(3),
  AI_COST_OUTPUT_PER_1M: z.coerce.number().default(15),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url()
});

export const env = envSchema.parse(process.env);
