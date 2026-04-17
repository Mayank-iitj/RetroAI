CREATE TYPE user_tier AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE companion_mood AS ENUM ('happy', 'neutral', 'sad', 'angry', 'sleepy');
CREATE TYPE skin_mode AS ENUM ('modern', 'retro80s');
CREATE TYPE action_type AS ENUM ('feed', 'play', 'clean', 'chat', 'discipline', 'heal');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  tier user_tier NOT NULL DEFAULT 'free',
  credits INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mood companion_mood NOT NULL DEFAULT 'neutral',
  energy INTEGER NOT NULL DEFAULT 70,
  hunger INTEGER NOT NULL DEFAULT 30,
  hygiene INTEGER NOT NULL DEFAULT 70,
  evolution_stage INTEGER NOT NULL DEFAULT 1,
  personality_embedding JSONB NOT NULL DEFAULT '{}',
  skin_mode skin_mode NOT NULL DEFAULT 'modern',
  is_alive BOOLEAN NOT NULL DEFAULT true,
  last_interaction_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID NOT NULL REFERENCES users(id)
);

CREATE TABLE action_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID NOT NULL REFERENCES companions(id),
  user_id UUID NOT NULL REFERENCES users(id),
  action_type action_type NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  ai_reasoning TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID NOT NULL REFERENCES companions(id),
  version INTEGER NOT NULL,
  state_json JSONB NOT NULL,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
