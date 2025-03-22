#User Handler

class UserHandler:

    def create_user(user_collection, user_data):
        try:
            result = user_collection.insert_one(user_data)
            return str(result.inserted_id)
        except Exception as e:
            print(f"Error creating user: {e}")
            return None

    def get_user(user_collection, email):
        try:
            user = user_collection.find_one({"email": email})
            return user
        except Exception as e:
            print(f"Error retrieving user: {e}")
            return None

    def delete_user(user_collection,email):
        try:
            result = user_collection.delete_one({"email": email})
            return result.deleted_count
        except Exception as e:
            print(f"Error deleting user: {e}")
            return 0
