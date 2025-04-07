from flask import render_template, redirect, url_for, request
from flask_login import current_user, login_required
from werkzeug.security import check_password_hash

from app import app
from connection import get_db_connection


@app.get("/profile/")
@login_required
def get_profile():
    user_id = request.args.get("user_id", current_user.user_id)
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT users.username, profile.photo, profile.investments, profile.portfolio_value
        FROM users 
        LEFT JOIN profile ON users.user_id = profile.user_id 
        WHERE users.user_id = ?""", (user_id,))
    profile = cursor.fetchone()
    conn.close()
    
    if profile:
        username, photo, investments, portfolio_value = profile
    else:
        username, photo, investments, portfolio_value = current_user.username, "", ""
    
    
    return render_template("profile.html", username=username, photo=photo, investments=investments, portfolio_value=portfolio_value)


@app.get("/edit_profile/")
@login_required
def get_edit_profile():
    user_id = request.args.get("user_id", current_user.user_id)
    if str(user_id) != str(current_user.user_id):
        return redirect(url_for("get_profile", user_id=user_id))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT users.username, profile.photo, profile.investments, profile.portfolio_value
        FROM users 
        LEFT JOIN profile ON users.user_id = profile.user_id 
        WHERE users.user_id = ?""", (current_user.user_id,))
    profile = cursor.fetchone()
    conn.close()

    if profile:
        username, photo, investments, portfolio_value = profile
    else:
        username, photo, investments, portfolio_value = current_user.username, "", ""
    
    return render_template("edit-profile.html", username=username, photo=photo, investments=investments, portfolio_value=portfolio_value)


@app.post("/edit_profile/")
@login_required
def post_edit_profile():
    if "user_id" in request.form and str(request.form["user_id"]) != str(current_user.user_id):
        return redirect(url_for("get_profile"))

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET username = ? WHERE user_id = ?", 
                   (request.form["username"], current_user.user_id))
    cursor.execute("SELECT * FROM profile WHERE user_id = ?", (current_user.user_id,))
    profile_exists = cursor.fetchone()

    if profile_exists:
        cursor.execute("UPDATE profile SET photo = ?, investments = ?, portfolio_value = ? WHERE user_id = ?", 
                       (request.form["photo"], request.form["investments"], request.form["portfolio_value"], current_user.user_id))
    else:
        cursor.execute("INSERT INTO profile (user_id, photo, investments, portfolio_value) VALUES (?, ?, ?, ?)", 
                       (current_user.user_id, request.form["photo"], request.form["investments"], request.form["portfolio_value"]))
    conn.commit()
    conn.close()
    return redirect(url_for("get_profile"))

@app.post("/delete_account/<int:user_id>")
@login_required
def delete_account(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("PRAGMA foreign_keys = ON;")
    cursor.execute("DELETE FROM users WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    
    if current_user.is_authenticated and current_user.username == "root" and \
        current_user.gmail == "hktnadm@gmail.com" and \
        check_password_hash(current_user.password, "@dm1n"):
        return redirect(url_for("get_admin"))
    return redirect(url_for("get_admin"))