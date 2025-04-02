def create_block_data_collection(db, collection_name):
    result = db.create_collection(
        collection_name,
        validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'additionalProperties': False,
                'required': ['_id', 'data', 'data_hash', 'previous_block_hash'],
                'properties': {
                    '_id': {
                        'bsonType': 'int',
                        'description': 'Block number'
                    },
                    'data': {
                        'bsonType': 'object',
                        'required': ['date_time', 'event_id', 'seat_array', 'previous_owner_id', 'new_owner_id'],
                        'properties': {
                            'date_time': {
                                'bsonType': 'string',
                                'description': 'Date and time in ISO 8601 format, required'
                            },
                            'event_id': {
                                'bsonType': 'int',
                                'description': 'Unique identifier for the event, required'
                            },
                            'seat_array': {
                                'bsonType': 'array',
                                'items': {
                                    'bsonType': 'int',
                                    'description': 'Each item in the array must be a int'
                                },
                                'description': 'Array of seat identifiers, required'
                            },
                            'previous_owner_id': {
                                'bsonType': 'int',
                                'description': 'ID of the previous owner, required'
                            },
                            'new_owner_id': {
                                'bsonType': 'int',
                                'description': 'ID of the new owner, required'
                            }
                        },
                        'description': 'Data object containing transaction details, required'
                    },
                    'data_hash': {
                        'bsonType': 'string',
                        'description': 'Hash of the data object, required'
                    },
                    'previous_block_hash': {
                        'bsonType': 'string',
                        'description': 'Hash of the previous block, required'
                    }
                }
            }
        }
    )
    
    print(f"Collection created with result: {result}")