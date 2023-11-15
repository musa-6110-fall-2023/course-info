#!/usr/bin/env bash

# Create a new database if one doesn't exist
sqlite3 db.sqlite3 "
  CREATE TABLE IF NOT EXISTS trail_issue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    encountered_at TEXT,
    latitude REAL,
    longitude REAL,
    details TEXT,
    trail_id INTEGER,
    trail_label TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );
"
