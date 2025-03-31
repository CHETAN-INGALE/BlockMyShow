#AI generated Need to be checked for errors
def create_user_event_collection(db, collection_name):
    result = db.create_collection(collection_name, validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["_id", "user_id", "event_name", "event_datetime", "location", "poster_url", "rating_value", "total_seats", "available_seats"],
            "properties": {
                "_id": {
                    "bsonType": "int",
                    "description": "Event ID must be a valid ObjectId and is required"
                },
                "user_id": {
                    "bsonType": "objectId",
                    "description": "User ID must be a valid ObjectId and is required"
                },
                "event_name": {
                    "bsonType": "string",
                    "description": "Event name must be a string and is required"
                },
                "event_datetime": {
                    "bsonType": "date",
                    "description": "Event date and time must be a valid date and is required"
                },
                "location": {
                    "bsonType": "string",
                    "description": "Event location must be a string and is required"
                },
                "poster_url": {
                    "bsonType": "string",
                    "description": "Poster URL must be a string and is required"
                },
                "rating_value": {
                    "bsonType": "double",
                    "minimum": 0.0,
                    "maximum": 10.0,
                    "description": "Rating off the Event"
                },
                "total_seats": {
                    "bsonType": "int",
                    "minimum": 0,
                    "description": "Total number of seats must be a non-negative integer and is required"
                },
                "available_seats": {
                    "bsonType": "int",
                    "minimum": 0,
                    "description": "Available number of seats must be a non-negative integer and is required"
                }
            }
        }
    })
    #print(f"Result: {result}")