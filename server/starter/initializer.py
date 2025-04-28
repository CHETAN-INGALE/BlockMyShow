import json
import requests

def send_movies_from_file(filename, api_url):
    # Use session key for authentication (replace with your actual session key)
    user_session_key = "903c3dd2ce284119bb2a7ea28342395195794aa1d777523e54f15f10f6f46b3b6bbf436516310d12729791cec68ee416851a39e72136841a5c998be2c482d400"
    
    # Load the JSON document
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            movies = json.load(file)
    except Exception as e:
        print(f"Error reading file {filename}: {e}")
        return
    
    # Iterate over each movie event
    for movie in movies:
        # Convert the record to the API data format
        payload = {
            "userId": movie.get("user_id"),
            "userSessionKey": user_session_key,
            "eventName": movie.get("event_name", ""),
            # Access the nested "$date" entry within event_datetime
            "eventDateTime": movie.get("event_datetime", {}).get("$date", ""),
            "eventLocation": movie.get("location", ""),
            "eventDescription": movie.get("event_description", ""),
            "eventImageUrl": movie.get("poster_url", ""),
            "eventRating": movie.get("rating_value"),
            "ticketPrice": movie.get("ticket_price"),
            "eventSeats": movie.get("total_seats")
        }
        
        try:
            # Send POST request to the API endpoint
            response = requests.post(api_url, json=payload)
            if response.status_code == 200:
                print(f"Successfully sent event: {payload['eventName']}")
            else:
                print(f"Failed to send event: {payload['eventName']}\nStatus Code: {response.status_code}\nResponse: {response.text}")
        except Exception as e:
            print(f"Exception occurred while sending event {payload['eventName']}: {e}")

if __name__ == "__main__":
    # Specify the API endpoint URL (replace with your actual endpoint)
    API_ENDPOINT = "https://bms.bhagataraya.site/newEvent/"
    # The JSON file containing the movie events (update if necessary)
    FILENAME = "moviedb.json"
    
    send_movies_from_file(FILENAME, API_ENDPOINT)