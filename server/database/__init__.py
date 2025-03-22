from pymongo import MongoClient
import os
from dotenv import load_dotenv
from database.model.user_data import create_user_data_collection
load_dotenv()

def connect():
    MONGO_URI = os.getenv("CONNECTION_STRING")
    client = MongoClient(MONGO_URI)
    print("Connected to MongoDB")
    return client

def disconnect(client):
    client.close()
    print("MongoDB connection closed!")

def initialize_database():
    try:
        # Initialize the user_data collection
        client= connect()

        if "BlockMyShow" in client.list_database_names():
            print("BlockMyShow database already exists. Skipping creation.")
        else:
            db=client["BlockMyShow"]
            print("BlockMyShow database does not exist. Creating...")

        db = client["BlockMyShow"]
        if "user_data" in db.list_collection_names():
            print("user_data collection already exists. Skipping creation.")
        else:
            create_user_data_collection(db,'user_data')
            print("Database initialization completed successfully.")
        
        if "event_data" in db.list_collection_names():
            print("user_data collection already exists. Skipping creation.")
        else:
            create_user_data_collection(db,'event_data')
            print("Database initialization completed successfully.")
    except Exception as e:
        print(f"Error during database initialization: {e}")
    disconnect(client)

initialize_database()

# def create_user(name: str, email: str, password: str):
#     user_data = {
#         "name": name,
#         "email": email,
#         "password": password
#     }
#     result = user_collection.insert_one(user_data)
#     print(f"User inserted with ID: {result.inserted_id}")


