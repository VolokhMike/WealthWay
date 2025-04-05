CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      username TEXT NOT NULL UNIQUE,
      gmail TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS profile (
      profile_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      user_id INTEGER NOT NULL UNIQUE,
      photo TEXT,
      description TEXT,
      investments INTEGER,
      portfolio_value INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);