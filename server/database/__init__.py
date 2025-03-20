from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

def get_database():
    client = MongoClient(os.getenv("CONNECTION_STRING"))
    return client['BlockMyShow']

def create_user(name:str,email:str,password:str): 
    db = get_database()
    user_collection = db['user']
    user_data = {
        "name": name,
        "email": email,
        "password": password
    }
    result = user_collection.insert_one(user_data)
    #print(f"User inserted with ID: {result.inserted_id}")

