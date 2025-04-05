from flask import render_template
from app import app


@app.get("/")
def default():
    return render_template("index.html")


@app.get("/about/")
def get_about():
    return render_template("about.html")