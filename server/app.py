import os

from openai import OpenAI
from pinecone import Pinecone

from dotenv import load_dotenv

from flask import Flask, redirect
from flask_cors import CORS
from flask_login import LoginManager, current_user

from src.user import User

load_dotenv()

# frontend url
URL = os.getenv("URL")

# serve static files at the server route
app = Flask(__name__, static_url_path="", static_folder="static")

# secret key for built in https
SECRET_KEY = os.getenv("SECRET_KEY")
app.secret_key = SECRET_KEY or os.urandom(24)

# enable CORS
CORS(app, supports_credentials=True)

# require https for session cookies
app.config['SESSION_COOKIE_SECURE'] = True

# User session management setup
# https://flask-login.readthedocs.io/en/latest
login_manager = LoginManager()
login_manager.init_app(app)

# Flask-Login helper to retrieve a user from our db
@login_manager.user_loader
def load_user(user_id):
    return User.get_user_by_id(user_id)

# ROUTES -------------------------------

from routes.login import login_routes
app.register_blueprint(login_routes)

from routes.api import api_routes
app.register_blueprint(api_routes)

# redirect 404 errors to the index file to be handled by the client
@app.errorhandler(404)
def page_not_found(e):
    return redirect(URL)

# -------------------------------------

if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)
