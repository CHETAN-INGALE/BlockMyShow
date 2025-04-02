from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
import random
import json
from bson import ObjectId
from database.model import user_data, event_data, blocks

load_dotenv()


MONGO_URI = os.getenv("MONGODB_CONN_STRING")
client = MongoClient(MONGO_URI)
print("MongoDB clinet created successfully!")

def initialize_database():
    print("Initializing database...")
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
            print("user_data collection created successfully.")
        
        if "event_data" in db.list_collection_names():
            print("event_data collection already exists. Skipping creation.")
        else:
            event_data.create_user_event_collection(db,'event_data')
            print("event_data collection created successfully.")
        
        if "blocks" in db.list_collection_names():
            print("blocks collection already exists. Skipping creation.")
        else:
            blocks.create_block_data_collection(db,'blocks')
            print("blocks collection created successfully.")
    except Exception as e:
        print(f"Error during database initialization: {e}")

def disconnect():
    client.close()
    print("MongoDB connection closed!")


# Used for counters
def get_next_user_id():
    counter = counters_collection.find_one_and_update(
        {"_id": "user_id"},
        {"$inc": {"seq": 1}},
        return_document=True
    )
    return counter["seq"]

def get_next_event_id():
    counter = counters_collection.find_one_and_update(
        {"_id": "event_id"},
        {"$inc": {"seq": 1}},
        return_document=True
    )
    return counter["seq"]


# User data managemnet functions
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
        user = user_collection.find_one({"email": email})
        if user:
            last_token_time = user.get("last_session_token_time")
            if last_token_time and datetime.now() - last_token_time < timedelta(minutes=2):
                return 429
            else:
                user_collection.update_one(
                    {"email": email},
                    {
                        "$set": {
                            "session_token": sessionKey,
                            "last_session_token_time": datetime.now()
                        }
                    }
                )
                return 200
        else:
            user_collection.update_one(
                {"email": email},
                {
                    "$set": {
                        "session_token": sessionKey,
                        "last_session_token_time": datetime.now(),
                        "_id": get_next_user_id()
                    }
                },
                upsert=True
            )
            return 201
    except Exception as e:
        print("An error occurred while updating session key:", str(e))
        return 500

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


# Movie data management functions
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
        # use this if user id is ObjectId
        # if 'user_id' in movie:
        #     movie['user_id'] = str(movie['user_id'])
        return movie
    except Exception as e:
        return e

def new_event(user_id, session_token, event_name, event_date_time, event_location, event_description, event_poster_url, event_rating, total_seats):
    verifyStatus = verifyUser(user_id, session_token)
    if verifyStatus == 200:
        try:
            event_collection.insert_one({
                "_id": get_next_event_id(),
                "user_id": user_id,
                "event_name": event_name,
                "event_datetime": event_date_time,
                "location": event_location,
                "event_description": event_description,
                "poster_url": event_poster_url,
                "rating_value": event_rating,
                "total_seats": total_seats,
                "available_seats": total_seats
            })
            return 200
        except Exception as e:
            print(f"Error creating new event: {e}")
            return 500
    else:
        return verifyStatus


# Block data management functions



# Initialization of MongoDB connection and collections
initialize_database()
db = client["BlockMyShow"]
user_collection = db["user_data"]
event_collection = db["event_data"]
blocks_collection = db["blocks"]
counters_collection = db["counters"]
print("MongoDB connected to DB: BlockMyShow !!!")