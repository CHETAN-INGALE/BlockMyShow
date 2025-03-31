from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime
import random
import json
from bson import ObjectId
from database.model import user_data, event_data
from database.handler import UserHandler

load_dotenv()


MONGO_URI = os.getenv("MONGODB_CONN_STRING")
client = MongoClient(MONGO_URI)
print("MongoDB clinet created successfully!")


def initialize_database():
    try:
        if "BlockMyShow" in client.list_database_names():
            print("BlockMyShow database already exists. Skipping creation.")
        else:
            db=client["BlockMyShow"]
            print("BlockMyShow database does not exist. Creating...")

        db = client["BlockMyShow"]
        if "user_data" in db.list_collection_names():
            print("user_data collection already exists. Skipping creation.")
        else:
            user_data.create_user_data_collection(db,'user_data')
            print("Database initialization completed successfully.")
        
        if "event_data" in db.list_collection_names():
            print("user_data collection already exists. Skipping creation.")
        else:
            event_data.create_user_event_collection(db,'event_data')
            print("Database initialization completed successfully.")
    except Exception as e:
        print(f"Error during database initialization: {e}")


def disconnect():
    client.close()
    print("MongoDB connection closed!")
    
def verifyUser(email, session_token):
    user = user_collection.find_one({"email": email})
    if not user:
        return 404
    if user.get('session_token') != session_token:
        return 401
    if not user.get('first_name') or not user.get('last_name') or not user.get('mobile_number'):
        return 201
    return 200

def updateSessionKey(email, sessionKey):
    try:
        user_collection.update_one(
            {"email": email},
            {
                "$set": {
                    "session_token": sessionKey,
                    "last_session_token_time": datetime.now()
                }
            },
            upsert=True # used to create a new user if there is no user with the given email
        )
        return True
    except Exception as e:
        print("An error occurred while updating session key:", str(e))
        return False

def update_user_details(email, session_token, first_name, last_name, mobile_number):
    verifyStatus = verifyUser(email, session_token)
    if verifyStatus == 201:
        try:
            user_collection.update_one(
                {"email": email},
                {
                    "$set": {
                        "first_name": first_name,
                        "last_name": last_name,
                        "mobile_number": mobile_number
                    }
                }
            )
            return 200
        except Exception as e:
            print(f"Error updating user details: {e}")
            return 500
    else:
        return verifyStatus

def get_random_movie():
    try:
        all_movies = list(movies_collection.find())
        if not all_movies:
            return {"message": "No movies found in the database."}
        random_movie = random.choice(all_movies)
        random_movie["_id"] = str(random_movie["_id"])
        return random_movie
    except Exception as e:
        return {"error": str(e)}

def getNMovies(numberOfMovies):
    try:
        movies = event_collection.find({}, {"_id": 1, "event_name": 1, "poster_url": 1}).limit(numberOfMovies)
        if not movies:
            return 404
        movies_list = list(movies)
        return movies_list
    except Exception as e:
        print(f"Error getting movies: {e}")
        return 500


def get_movie_by_name(movie_name):
    try:
        movie = event_collection.find_one({"event_name": movie_name})
        if not movie:
            return 404
        if 'user_id' in movie:
            movie['user_id'] = str(movie['user_id'])
        return movie
    except Exception as e:
        return e

def disconnect():
    client.close()
    print("MongoDB connection closed!")

initialize_database()
db = client["BlockMyShow"]
user_collection = db["user_data"]
event_collection = db["event_data"]
print("MongoDB connected to DB: BlockMyShow !!!")