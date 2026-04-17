import { pgEnum, pgTable, text, timestamp, integer, boolean, uuid, jsonb } from "drizzle-orm/pg-core";

export const userTier = pgEnum("user_tier", ["free", "pro", "enterprise"]);
export const companionMood = pgEnum("companion_mood", ["happy", "neutral", "sad", "angry", "sleepy"]);
export const skinMode = pgEnum("skin_mode", ["modern", "retro80s"]);
export const actionType = pgEnum("action_type", ["feed", "play", "clean", "chat", "discipline", "heal"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url"),
  tier: userTier("tier").notNull().default("free"),
  credits: integer("credits").notNull().default(100),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const companions = pgTable("companions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  mood: companionMood("mood").notNull().default("neutral"),
  energy: integer("energy").notNull().default(70),
  hunger: integer("hunger").notNull().default(30),
  hygiene: integer("hygiene").notNull().default(70),
  evolutionStage: integer("evolution_stage").notNull().default(1),
  personalityEmbedding: jsonb("personality_embedding").notNull().default({}),
  skinMode: skinMode("skin_mode").notNull().default("modern"),
  isAlive: boolean("is_alive").notNull().default(true),
  lastInteractionAt: timestamp("last_interaction_at", { withTimezone: true }).notNull().defaultNow(),
  createdBy: uuid("created_by").notNull().references(() => users.id)
});

export const actionEvents = pgTable("action_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  companionId: uuid("companion_id").notNull().references(() => companions.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  actionType: actionType("action_type").notNull(),
  payload: jsonb("payload").notNull().default({}),
  aiReasoning: text("ai_reasoning"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const snapshots = pgTable("snapshots", {
  id: uuid("id").defaultRandom().primaryKey(),
  companionId: uuid("companion_id").notNull().references(() => companions.id),
  version: integer("version").notNull(),
  stateJson: jsonb("state_json").notNull(),
  createdBy: uuid("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});
