#AI generated Need to be checked for errors
def create_user_event_collection(db, collection_name):
    result = db.create_collection(collection_name, validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "date", "location", "price"],
            "properties": {
                "name": {
                    "bsonType": "string",
                    "description": "Event name must be a string and is required"
                },
                "date": {
                    "bsonType": "date",
                    "description": "Event date must be a valid date and is required"
                },
                "location": {
                    "bsonType": "string",
                    "description": "Event location must be a string and is required"
                },
                "price": {
                    "bsonType": "double",
                    "minimum": 0,
                    "description": "Event price must be a non-negative number and is required"
                },
                "description": {
                    "bsonType": "string",
                    "description": "Event description is optional but must be a string if provided"
                }
            }
        }
    })
    #print(f"Result: {result}")