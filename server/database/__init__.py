from pymongo import MongoClient

def get_database():
    CONNECTION_STRING = "mongodb+srv://Admin:Admin@cluster0.7odts9s.mongodb.net/"
    client = MongoClient(CONNECTION_STRING)
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
    print(f"User inserted with ID: {result.inserted_id}")

# Example usage
if __name__ == "__main__":
    db = get_database()
    print("Database connection successful!")