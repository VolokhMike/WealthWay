import smtplib
import logging
import random

from flask import render_template, request, url_for, redirect, session
from flask_login import login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from connection import get_db_connection
from app import app, login_manager
from ..config import TOKEN
from ..models import User


@app.get("/terms_of_service/")
def get_terms_of_service():
    return render_template("terms-of-service.html")


@app.get("/privacy_policy/")
def get_privacy_policy():   
    return render_template("privacy-policy.html")


@login_manager.user_loader
def load_user(user_id):
    conn = get_db_connection()
    curs = conn.cursor()
    curs.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
    user = curs.fetchone()
    conn.close()

    if user:
        return User(user_id=user[0], username=user[1], gmail=user[2], password=user[3], email_verified=user[4])
    return None


@app.get("/login/")
def get_login():
    return render_template("login.html")


@app.post("/login/")
def post_login():
    username = request.form["username"].strip()
    password = request.form["password"].strip()
    gmail = request.form["email"].strip()

    if not all([username, password, gmail]):
        logging.warning(f"Login attempt with missing fields")
        return render_template("login.html", error_message="All fields are required")

    if not gmail.endswith("@gmail.com"):
        logging.warning(f"Gmail validation failed: {gmail} (Invalid format)")
        return render_template("login.html", error_message="Please enter a valid Gmail address")
    
    conn = get_db_connection()
    curs = conn.cursor()
    curs.execute("SELECT * FROM users WHERE username = ? AND gmail = ?", (username, gmail))
    user = curs.fetchone()
    conn.close()
        
    if not user:
        logging.warning(f"Unsuccessful login attempt: {username} (User not found)")
        return render_template("login.html", error_message="User not found")
        
    if not check_password_hash(user[3], password):
        logging.warning(f"Unsuccessful login attempt: {username} (Incorect password)")
        return render_template("login.html", error_message="Invalid password")
        
    if not user[4]:
        logging.warning(f"Login attempt without email confirmation: {username}")
        return render_template("login.html", error_message="Please verify your email before logging in")
        
    user_obj = User(user_id=user[0], username=user[1], gmail=user[2], password=user[3], email_verified=user[4])
    login_user(user_obj, remember=True)
    session["user_id"] = user[0]            #? Load Session user_id
    session["username"] = user[1]             #?  Load Session username  
    session["gmail"] = user[2]                 #? Load Session gmail
    session.pop("verification_code", None)       #? Delete Session verification code

    logging.info(f"Successfully login: {username}")
    return redirect(url_for("default"))


@app.get("/signup/")
def get_signup():
    return render_template("signup.html")


@app.post("/signup/")
def post_signup():
    username = request.form["username"].strip()
    confirm_password = request.form["confirm-password"].strip()
    password = request.form["password"].strip()
    terms_accepted = request.form.get("terms")
    gmail = request.form["email"].strip()

    if not all([username, password, gmail, terms_accepted]):
        logging.warning(f"Sign up failed: {username} (All fields are required)")
        return render_template("signup.html", error_message="All fields are required")

    if len(username) < 3 or len(username) > 20:
        logging.warning(f"Sign up failed: {username} (Username must be between 3 and 20 characters)")
        return render_template("signup.html", error_message="Username must be between 3 and 20 characters")
    
    if password != confirm_password:
        logging.warning(f"Sign up failed: {username} (Passwords do not match)")
        return render_template("signup.html", error_message="Passwords do not match")

    if not gmail.endswith("@gmail.com"):
        logging.warning(f"Sign up failed: {username} (Please enter a valid Gmail address)")
        return render_template("signup.html", error_message="Please enter a valid Gmail address")

    if len(password) < 5:
        logging.warning(f"Sign up failed: {username} (Password must be at least 6 characters long)")
        return render_template("signup.html", error_message="Password must be at least 6 characters long")

    conn = get_db_connection()
    curs = conn.cursor()
    curs.execute("SELECT * FROM users WHERE username = ? OR gmail = ?", (username, gmail))
    existing_user = curs.fetchone()
    conn.close()

    if existing_user:
        if existing_user[1] == username:
            logging.warning(f"Sign up failed: {username} (Username already exists)")
            return render_template("signup.html", error_message="Username already exists")
        else:
            logging.warning(f"Sign up failed: {username} (Email already registered)")
            return render_template("signup.html", error_message="Email already registered")
        
    hashed_password = generate_password_hash(password)

    verification_code = generate_verification_code()
    send_email(to_addrs=gmail, code=verification_code)
    session["signup_data"] = {                          #? Save signup data in session
        "username": username,
        "password": hashed_password,
        "gmail": gmail
    }
    session["verification_code"] = verification_code

    logging.info(f"Sign up: {username} ({gmail}) - verification code sent")
    return redirect(url_for("get_verification"))


@app.get("/verification/")
def get_verification():
    return render_template("verification.html")


@app.post("/verify_code/")
def post_verify_code():
    entered_code = request.form["verification_code"]
    correct_code = session.get("verification_code")
    signup_data = session.get("signup_data")

    if entered_code == correct_code and signup_data:
        logging.info(f"Email confirmed: {signup_data["gmail"]} (User: {signup_data["username"]})")
        conn = get_db_connection()
        curs = conn.cursor()

        curs.execute("INSERT INTO users (username, password, gmail, email_verified) VALUES (?, ?, ?, 1)", 
                     (signup_data["username"], signup_data["password"], signup_data["gmail"]))
        conn.commit()
        user_id = curs.lastrowid

        curs.execute("INSERT INTO profile (user_id, photo, description) VALUES (?, ?, ?)", 
                     (user_id, "", ""))
        conn.commit()
        conn.close()

        session.pop("verification_code", None)
        session.pop("signup_data", None)

        return redirect(url_for("get_login"))
    else:
        logging.warning(f"Invalid confirmation code for {signup_data["gmail"]}")
        return render_template("verification.html", signup_data=signup_data, error_message="Incorrect verification code. Please try again.")
    

@app.post("/resend_code/")
def post_resend_code():
    gmail = session.get("signup_data", {}).get("gmail")
    
    if not gmail:
        return redirect(url_for("get_signup"))

    verification_code = generate_verification_code()
    send_email(to_addrs=gmail, code=verification_code)
    session["verification_code"] = verification_code

    logging.info(f"Resent verification code to: {gmail}")
    return render_template("verification.html")


def send_email(to_addrs, code):
    from_addrs = "hktnadm@gmail.com"
    subject = "Welcome to Our Service - Your Security Code"
    
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; text-align: center;">
        <h2 style="color: #00d1b2;">Welcome to Our Service!</h2>
        <p style="font-size: 18px;">Thank you for signing up! Your verification code is:</p>
        <p style="font-size: 22px; font-weight: bold; color: #000000;">{code}</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="border: 1px solid #ddd;">
        <p style="font-size: 12px; color: gray;">This is an automated message. Please do not reply.</p>
    </body>
    </html>
    """
    
    message = MIMEMultipart()
    message["From"] = from_addrs
    message["To"] = to_addrs
    message["Subject"] = subject
    message.attach(MIMEText(body, "html"))
    
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(from_addrs, TOKEN)
        server.send_message(message)
        server.quit()
    except Exception as e:
        print(f"Error sending email: {e}")


def generate_verification_code(length=6):
    return "".join(str(random.randint(0, 9)) for _ in range(length))


@app.get("/terms/")
def get_terms():
    return render_template("terms.html")


@app.get("/logout/")
def get_logout():
    logout_user()
    logging.info(f"Log out from: {session.get("username")}")
    session.clear()                                             #? Clear all session data
    return redirect(url_for("default"))