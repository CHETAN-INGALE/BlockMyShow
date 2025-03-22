from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime
from database.model.user_data import create_user_data_collection

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
            create_user_data_collection(db,'user_data')
            print("Database initialization completed successfully.")
        
        if "event_data" in db.list_collection_names():
            print("user_data collection already exists. Skipping creation.")
        else:
            create_user_data_collection(db,'event_data')
            print("Database initialization completed successfully.")
    except Exception as e:
        print(f"Error during database initialization: {e}")


def disconnect():
    client.close()
    print("MongoDB connection closed!")
    
def checkUser(email):
    user = user_collection.find_one({"email": email})
    return user is not None

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







def disconnect():
    client.close()
    print("MongoDB connection closed!")

initialize_database()
db = client["BlockMyShow"]
user_collection = db["user_data"]
print("MongoDB connected to DB: BlockMyShow !!!")