import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime

load_dotenv()

MONGO_URI = os.getenv("MONGODB_CONN_STRING")
client = MongoClient(MONGO_URI)
db = client["BlockMyShow"]
user_collection = db["user"]
print("MongoDB connected to DB: BlockMyShow !!!")



def checkUser(email):
    user = user_collection.find_one({"email": email})
    return user is not None

def updateSessionKey(email, sessionKey):
    try:
        user_collection.update_one(
            {"email": email},
            {  # Update operation
                "$set": {
                    "sessionKey": sessionKey,
                    "lastSessionKeyTime": datetime.now()
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
