from flask import render_template
from app import app


@app.get("/comments/")
def get_comments():
		return render_template("comments.html")