from flask import render_template
from app import app


@app.get("/investments/")
def get_investments():
		return render_template("investments.html")