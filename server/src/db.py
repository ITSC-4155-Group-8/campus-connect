import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

# database setup
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]