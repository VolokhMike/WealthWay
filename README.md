# 🚀 WealthWay - Your Personal Finance Management System

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-blue.svg" alt="Python Version">
  <img src="https://img.shields.io/badge/Flask-3.0.2-green.svg" alt="Flask Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</div>

## 🌟 Overview

WealthWay is a modern, user-friendly personal finance management system built with Python Flask. It helps you track your investments, manage budgets, set financial goals, and monitor your overall financial health.

## ✨ Key Features

### 👤 User Management
- 🔐 Secure user registration and authentication
- 📧 Email verification system
- 👤 User profile management with avatar support

### 💰 Investment Tracking
- 📈 Track various investment types
- 📊 Monitor investment performance
- 💹 Record transaction details (price, quantity, commission)

### 💵 Budget Management
- 📋 Create and manage budgets
- 📊 Track spending against categories
- 📉 Monitor total and spent values

### 🎯 Financial Goals
- 🎯 Set and track financial goals
- 📈 Monitor progress towards targets
- 📅 Goal deadline tracking

### 💬 User Feedback
- 📝 Submit and manage feedback
- ⭐ Rating system for user experience

## 🏗️ Project Structure

```
WealthWay/
├── 📁 app/
│   ├── 📁 models/         # Database models
│   ├── 📁 routes/         # API routes and endpoints
│   ├── 📁 templates/      # HTML templates
│   ├── 📁 static/         # Static files (CSS, JS, images)
│   ├── 📁 forms/          # Form definitions
│   ├── 📄 __init__.py     # Application initialization
│   └── 📄 config.py       # Configuration settings
├── 📁 instance/           # Instance-specific files
├── 📁 venv/               # Virtual environment
├── 📄 main.py            # Application entry point
├── 📄 schema.sql         # Database schema
├── 📄 connection.py      # Database connection
└── 📄 Dockerfile         # Container configuration
```

## 🛠️ Installation

### Prerequisites
- 🐍 Python 3.8 or higher
- 📦 SQLite
- 🐳 Docker (optional)

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/wealthway.git
   cd wealthway
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize Database**
   ```bash
   sqlite3 database.db < schema.sql
   ```

## 🚀 Running the Application

### Development Mode
```bash
python main.py
```

### Using Docker
```bash
docker build -t wealthway .
docker run -p 21435:21435 wealthway
```

## ⚙️ Configuration

The application runs on port 21435 by default. Configuration can be modified in:
- `app/config.py` for application settings
- `connection.py` for database settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- 📧 Email: mikimv09@gmail.com or ukr.vadya@gmail.com
- 🌐 Website: [yourwebsite.com](https://yourwebsite.com)

---

<div align="center">
  <sub>Built with ❤️ by Your Name</sub>
</div>
