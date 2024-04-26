from src.db import db
from flask_login import UserMixin

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
            return User(user["id"], user["name"], user["email"], user["profile_pic"])
        return None