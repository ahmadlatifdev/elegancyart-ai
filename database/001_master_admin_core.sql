CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS bossmind_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_key TEXT NOT NULL UNIQUE,
  project_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'stopped' CHECK (status IN ('running', 'stopped', 'retrying', 'failed')),
  queue_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  last_action TEXT NOT NULL DEFAULT 'init' CHECK (last_action IN ('init', 'start', 'stop', 'retry', 'sync')),
  last_action_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  worker_url TEXT,
  worker_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bossmind_project_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_key TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('init', 'start', 'stop', 'retry', 'sync')),
  result TEXT NOT NULL DEFAULT 'pending' CHECK (result IN ('pending', 'success', 'error')),
  source TEXT NOT NULL DEFAULT 'master-admin',
  message TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bossmind_projects_project_key
  ON bossmind_projects(project_key);

CREATE INDEX IF NOT EXISTS idx_bossmind_project_events_project_key
  ON bossmind_project_events(project_key);

CREATE INDEX IF NOT EXISTS idx_bossmind_project_events_created_at
  ON bossmind_project_events(created_at DESC);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_bossmind_projects_updated_at ON bossmind_projects;

CREATE TRIGGER trg_bossmind_projects_updated_at
BEFORE UPDATE ON bossmind_projects
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

INSERT INTO bossmind_projects (
  project_key,
  project_name,
  status,
  queue_count,
  failed_count,
  last_action,
  worker_enabled
)
VALUES
  ('ai-video-generator', 'AI Video Generator', 'running', 0, 0, 'init', FALSE),
  ('elegancyart-ai-builder', 'ElegancyArt AI Builder', 'running', 0, 0, 'init', FALSE),
  ('resumora', 'Resumora', 'running', 0, 0, 'init', FALSE),
  ('tiktok-ai', 'TikTok AI', 'running', 0, 0, 'init', FALSE),
  ('global-stock', 'Global Stock', 'running', 0, 0, 'init', FALSE)
ON CONFLICT (project_key) DO NOTHING;

INSERT INTO bossmind_project_events (
  project_key,
  action,
  result,
  source,
  message
)
VALUES
  ('ai-video-generator', 'init', 'success', 'master-admin', 'Initial project row created'),
  ('elegancyart-ai-builder', 'init', 'success', 'master-admin', 'Initial project row created'),
  ('resumora', 'init', 'success', 'master-admin', 'Initial project row created'),
  ('tiktok-ai', 'init', 'success', 'master-admin', 'Initial project row created'),
  ('global-stock', 'init', 'success', 'master-admin', 'Initial project row created');