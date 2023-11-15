CREATE TABLE IF NOT EXISTS trail_issue (
  id SERIAL PRIMARY KEY,
  category TEXT,
  encountered_at TEXT,
  latitude REAL,
  longitude REAL,
  details TEXT,
  trail_id INTEGER,
  trail_label TEXT,
  created_at TEXT DEFAULT (to_char(now()::timestamp at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))
);
