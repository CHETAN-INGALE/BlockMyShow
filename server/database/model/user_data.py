def create_user_data_collection(db,collection_name):
    result = db.create_collection(collection_name, validator={
        '$jsonSchema': {
            'bsonType': 'object',
            'additionalProperties': False,
            'required': ['first_name', 'last_name', 'email'],
            'properties': {
                'first_name': {
                    'bsonType': 'string',
                    'description': 'First name of the user, required and max length 50'
                },
                'last_name': {
                    'bsonType': 'string',
                    'description': 'Last name of the user, required and max length 50'
                },
                'email': {
                    'bsonType': 'string',
                    'description': 'Email of the user, required and unique'
                },
                'session_token': {
                    'bsonType': 'string',
                    'description': 'Session token for the user'
                },
                'created_at': {
                    'bsonType': 'date',
                    'description': 'Timestamp when the user was created'
                }
            }
        }
    })
    print(f"Result: {result}")