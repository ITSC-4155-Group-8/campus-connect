import os
import json
import requests
from dotenv import load_dotenv
from flask import Flask, request, redirect, send_file
from flask_cors import CORS
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient

from flask_pymongo import PyMongo
from flask_login import UserMixin

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

# frontend url for login redirect
URL = os.getenv("URL")

# https://realpython.com/flask-google-login/
SECRET_KEY = os.getenv("SECRET_KEY")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

# serve static files at the server route
app = Flask(__name__, static_url_path="", static_folder="static")
# database setup
app.config["MONGO_URI"] = MONGO_URI
# secret key for built in https
app.secret_key = SECRET_KEY or os.urandom(24)
db = PyMongo(app).db
# enable CORS
CORS(app, supports_credentials=True)

# User session management setup
# https://flask-login.readthedocs.io/en/latest
login_manager = LoginManager()
login_manager.init_app(app)
# require https for session cookies
app.config['SESSION_COOKIE_SECURE'] = True

# OAuth 2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

# Flask-Login helper to retrieve a user from our db
@login_manager.user_loader
def load_user(user_id):
    return User.get_user_by_id(user_id)

# MODELS ------------------------------

class User(UserMixin):
    def __init__(self, id, name, email, profile_pic):
        self.id = id
        self.name = name
        self.email = email
        self.profile_pic = profile_pic

    @staticmethod
    def get_user_by_id(id):
        user = db.users.find_one({"id": id})
        if user:
            print(user)
            return User(user["id"], user["name"], user["email"], user["profile_pic"])
        return None

# ROUTES ------------------------------

@app.route("/login")
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)


@app.route("/login/callback")
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")
    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]
    # Prepare and send a request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400
    # Create a user in your db with the information provided
    # by Google
    user = User(
        id=unique_id, name=users_name, email=users_email, profile_pic=picture
    )
    
    # Doesn't exist? Add it to the database.
    if not User.get_user_by_id(unique_id):
        print(vars(user))
        db.users.insert_one(vars(user))
    
    # Begin user session by logging the user in
    login_user(user)
    
    # Send user back to homepage
    return redirect(URL)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/api")


@app.route("/api")
def get_api():
    if current_user.is_authenticated:
        return "Campus Connect API v0.1.0 - Logged In!"
    return "Campus Connect API v0.1.0"


# redirect 404 errors to the index file to be handled by the client
@app.errorhandler(404)
def page_not_found(e):
    return redirect(URL)
#    return send_file("static/index.html"), 200

# -------------------------------------

if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)
