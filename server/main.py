# Main api server made using fast api
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List
from contextlib import asynccontextmanager
from datetime import datetime
import secrets

from mailer import sendEmail
from database import disconnect, verifyUserWithData, updateSessionKey, getNMovies, update_user_details, get_movie_by_name, new_event, book_event_seats, get_booking, verify_booking



# Pydantic Models
class Email(BaseModel):
    email: EmailStr

class Auth(BaseModel):
    email: EmailStr
    sessionKey: str = '903c3dd2ce284119bb2a7ea28342395195794aa1d777523e54f15f10f6f46b3b6bbf436516310d12729791cec68ee416851a39e72136841a5c998be2c482d400'

class User(BaseModel):
    email: EmailStr
    sessionKey: str = '903c3dd2ce284119bb2a7ea28342395195794aa1d777523e54f15f10f6f46b3b6bbf436516310d12729791cec68ee416851a39e72136841a5c998be2c482d400'
    firstName: str = 'Jhon'
    lastName: str = 'Doe'
    mobileNumber: str = '1234567890'

class MovieData(BaseModel):
    movieName: str = 'Avengers: Endgame'

class EventData(BaseModel):
    userId: int = 1
    userSessionKey: str = '903c3dd2ce284119bb2a7ea28342395195794aa1d777523e54f15f10f6f46b3b6bbf436516310d12729791cec68ee416851a39e72136841a5c998be2c482d400'
    eventName: str = 'Avengers: Endgame'
    eventDateTime: datetime
    eventLocation: str = 'Miraj Cinemas'
    eventDescription: str = 'Avengers: Endgame is a 2019 American superhero film based on the Marvel Comics superhero team the Avengers. It is the direct sequel to 2018\'s Avengers: Infinity War and the 22nd film in the Marvel Cinematic Universe (MCU).'
    eventImageUrl: str = 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg'
    eventRating: float = 8.4
    ticketPrice: int = 500
    eventSeats: int = 120

class EventBooingData(BaseModel):
    userId: int = 1
    userSessionKey: str = '903c3dd2ce284119bb2a7ea28342395195794aa1d777523e54f15f10f6f46b3b6bbf436516310d12729791cec68ee416851a39e72136841a5c998be2c482d400'
    eventId: int = 3
    eventSeats: int = 2

class UserBookings(BaseModel):
    userId: int = 1
    userSessionKey: str = '903c3dd2ce284119bb2a7ea28342395195794aa1d777523e54f15f10f6f46b3b6bbf436516310d12729791cec68ee416851a39e72136841a5c998be2c482d400'

class QrData(BaseModel):
    userId: int = 1
    movieId: int = 3
    seatsBooked: List[int] = [5, 6, 7]

# FastAPI stuff
tags_metadata = [
    {
        "name": "users",
        "description": "Operations with users. The **login** logic is also here.",
    },
    {
        "name": "events",
        "description": "Manage operations with events.",
    },
    {
        "name": "bookings",
        "description": "Manage operations with bookings.",
    },
]

app = FastAPI(
    title="BlockMyShow",
    version="0.1",
    description="Hello, Welcome to our BlockMyShow",
    openapi_tags=tags_metadata
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("In Fastapi lifrspan start")
    yield
    
    disconnect()



# User related API
@app.post("/login/", tags=["users"])
async def Login(email: Email):
    newSessionKey = secrets.token_hex(64)
    # newUser = checkUser(email.email)
    
    addSKeyToDB = updateSessionKey(email.email, newSessionKey)
    if addSKeyToDB == 429:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    elif addSKeyToDB == 500:
        raise HTTPException(status_code=500, detail="Error updating session key")
    
    sendMail = sendEmail(email.email, newSessionKey)
    if sendMail == False:
        raise HTTPException(status_code=500, detail="Error sending email")
    raise HTTPException(status_code=200, detail="Email sent sucuessfully")

@app.post("/auth/", tags=["users"])
async def user_authentication(authData: Auth):
    authStatus = verifyUserWithData(authData.email, authData.sessionKey)
    if authStatus == 404:
        raise HTTPException(status_code=404, detail="User not found")
    elif authStatus == 401:
        raise HTTPException(status_code=401, detail="Unauthorized")
    elif authStatus == 201:
        raise HTTPException(status_code=201, detail="User data incomplete")
    else:
        return authStatus

@app.post("/updateUserDetails/", tags=["users"])
async def Update_User_Details(userData: User):
    verifyUserDetails = update_user_details(userData.email, userData.sessionKey, userData.firstName, userData.lastName, userData.mobileNumber)
    if verifyUserDetails == 404:
        raise HTTPException(status_code=404, detail="User not found")
    elif verifyUserDetails == 401:
        raise HTTPException(status_code=401, detail="Unauthorized")
    elif verifyUserDetails == 200:
        raise HTTPException(status_code=200, detail="User details updated successfully")
    else:
        raise HTTPException(status_code=500, detail="Error updating user details")



# Movie realted API
@app.get("/movieAiringNow/{numberOfMovies}", tags=["events"])
async def get_movies_airing_now(numberOfMovies: int):
    if numberOfMovies <= 0:
        raise HTTPException(status_code=400, detail="Number of movies must be greater than 0")
    nMovies = getNMovies(numberOfMovies)
    if nMovies == 404:
        raise HTTPException(status_code=404, detail="No movies found")
    elif nMovies == 500:
        raise HTTPException(status_code=500, detail="Error getting movies")
    else:
        # for movies in nMovies:
        #     movies['user_id'] = str(movies['user_id'])
        return nMovies

@app.post("/movieByName/", tags=["events"])
async def Get_Movie_By_Name(movieData: MovieData):
    movie = get_movie_by_name(movieData.movieName)
    if movie == 404:
        raise HTTPException(status_code=404, detail="Movie not found")
    elif movie == 500:
        raise HTTPException(status_code=500, detail="Error getting movie")
    else:
        return movie

@app.post("/newEvent/", tags=["events"])
async def Create_New_Event(eventData: EventData):
    newEvent = new_event(eventData.userId, eventData.userSessionKey, eventData.eventName, eventData.eventDateTime, eventData.eventLocation, eventData.eventDescription, eventData.eventImageUrl, eventData.eventRating, eventData.ticketPrice, eventData.eventSeats)
    if newEvent == 200:
        raise HTTPException(status_code=200, detail="Event added successfully")
    elif newEvent == 500:
        raise HTTPException(status_code=500, detail="Error creating event")
    elif newEvent == 404:
        raise HTTPException(status_code=404, detail="User not found")
    elif newEvent == 401:
        raise HTTPException(status_code=401, detail="Unauthorized")
    elif newEvent == 201:
        raise HTTPException(status_code=201, detail="User data incomplete")
    else:
        raise HTTPException(status_code=400, detail="Bad request")

@app.post("/bookEventTickets/", tags=["events"])
async def Book_Event_Tickets(eventData: EventBooingData):
    bookEvent = book_event_seats(eventData.userId, eventData.userSessionKey, eventData.eventId, eventData.eventSeats)
    if bookEvent == 200:
        raise HTTPException(status_code=200, detail="Event booked successfully")
    elif bookEvent == 500:
        raise HTTPException(status_code=500, detail="Error booking event")
    elif bookEvent == 404:
        raise HTTPException(status_code=404, detail="User not found")
    elif bookEvent == 401:
        raise HTTPException(status_code=401, detail="Unauthorized")
    elif bookEvent == 201:
        raise HTTPException(status_code=201, detail="User data incomplete")
    else:
        raise HTTPException(status_code=400, detail="Bad request")



# Booking related API
@app.post("/getBookingDetails/", tags=["bookings"])
async def Get_Booking_Details(userBookings: UserBookings):
    bookingDetails = get_booking(userBookings.userId, userBookings.userSessionKey)
    if bookingDetails == 500:
        raise HTTPException(status_code=500, detail="Error fetching booking details")
    elif bookingDetails == 404:
        raise HTTPException(status_code=404, detail="User not found")
    elif bookingDetails == 401:
        raise HTTPException(status_code=401, detail="Unauthorized")
    elif bookingDetails == 201:
        raise HTTPException(status_code=201, detail="User data incomplete")
    else:
        return bookingDetails

@app.post("/qrVerify", tags=["bookings"])
async def QR_Verify(qrData: QrData):
    verifyQr = verify_booking(qrData.userId, qrData.movieId, qrData.seatsBooked)
    if verifyQr == 404:
        raise HTTPException(status_code=404, detail="User or Movie not found")
    elif verifyQr == 400:
        raise HTTPException(status_code=400, detail="Seats Does not exist")
    else:
        raise HTTPException(status_code=200, detail="QR code verified successfully")