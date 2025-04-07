from flask import render_template
from flask_login import current_user, login_required
from app import app


@app.get("/comments/")
@login_required
def get_comments():
		return render_template("comments.html")