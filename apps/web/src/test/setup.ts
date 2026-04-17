import "@testing-library/jest-dom";

process.env.NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/retro_ai";
process.env.REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
process.env.GROQ_API_KEY = process.env.GROQ_API_KEY || "test-key";
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "test-secret";
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
