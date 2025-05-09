#AI generated Need to be checked for errors
def create_user_event_collection(db, collection_name):
    result = db.create_collection(collection_name, validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["_id", "user_id", "event_name", "event_datetime", "location", "event_description", "poster_url", "rating_value", "ticket_price", "total_seats", "available_seats"],
            "properties": {
                "_id": {
                    "bsonType": "int",
                    "description": "Event ID must be a valid ObjectId and is required"
                },
                "user_id": {
                    "bsonType": "int",
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
                "event_description": {
                    "bsonType": "string",
                    "description": "Event description must be a string and is required"
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
                "ticket_price": {
                    "bsonType": "int",
                    "minimum": 1,
                    "description": "Price of the ticket must be a positive integer and is required"
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