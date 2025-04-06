# WealthWay - Personal Finance Management System

WealthWay is a comprehensive personal finance management system built with Python Flask. It helps users track their investments, manage budgets, set financial goals, and monitor their overall financial health.

## Features

- **User Management**
  - Secure user registration and authentication
  - Email verification system
  - User profile management

- **Investment Tracking**
  - Track various investment types
  - Monitor investment performance
  - Record transaction details including price, quantity, and commission

- **Budget Management**
  - Create and manage budgets
  - Track spending against budget categories
  - Monitor total and spent values

- **Financial Goals**
  - Set and track financial goals
  - Monitor progress towards targets
  - Categorize goals by type

- **User Feedback**
  - Submit and manage feedback
  - Rating system for user experience

## Project Structure

```
WealthWay/
├── app/
│   ├── models/         # Database models
│   ├── routes/         # API routes and endpoints
│   ├── templates/      # HTML templates
│   ├── static/         # Static files (CSS, JS, images)
│   ├── forms/          # Form definitions
│   ├── __init__.py     # Application initialization
│   └── config.py       # Configuration settings
├── instance/           # Instance-specific files
├── venv/               # Virtual environment
├── main.py            # Application entry point
├── schema.sql         # Database schema
├── connection.py      # Database connection
└── Dockerfile         # Container configuration
```

## Database Schema

The application uses SQLite with the following main tables:
- `users`: User account information
- `profile`: User profile details
- `budget`: Budget tracking
- `invest`: Investment records
- `finance-goals`: Financial goal setting
- `feedback`: User feedback system

## Setup and Installation

1. **Prerequisites**
   - Python 3.x
   - SQLite
   - Docker (optional)

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Create and activate virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

   # Install dependencies
   pip install -r requirements.txt

   # Initialize the database
   sqlite3 database.db < schema.sql
   ```

3. **Running the Application**
   ```bash
   # Development mode
   python main.py

   # Using Docker
   docker build -t wealthway .
   docker run -p 21435:21435 wealthway
   ```

## Configuration

The application runs on port 21435 by default. Configuration can be modified in:
- `app/config.py` for application settings
- `connection.py` for database settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Specify your license here]

## Contact

[Your contact information]
