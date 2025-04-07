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
      investments INTEGER,
      portfolio_value INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS budget (
      budget_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      user_id INTEGER NOT NULL UNIQUE,
      total_value INTEGER NOT NULL,
      spent_value INTEGER NOT NULL,
      budget_category INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedback (
      feedback_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      user_id INTEGER NOT NULL UNIQUE,
      description TEXT,
      rating INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS invests (
      invest_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      user_id INTEGER NOT NULL UNIQUE,
      asset TEXT NOT NULL,
      type TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      date DATA NOT NULL,
      price INTEGER NOT NULL,
      current_price INTEGER NOT NULL,
      purchase_price INTEGER NOT NULL,
      current_value INTEGER NOT NULL,
      profit INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS finance_goals (
      finance_goals_id  INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      user_id INTEGER NOT NULL UNIQUE,
      goal_name TEXT,
      goal_price INTEGER,
      target TEXT,
      FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);