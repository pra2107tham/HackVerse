from pymongo import MongoClient
import certifi
import os
from dotenv import load_dotenv

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
mongo_client = MongoClient(MONGODB_URI,tlsCAFile=certifi.where())
db = mongo_client.hackverse  # Replace `smartgen` with your database name
