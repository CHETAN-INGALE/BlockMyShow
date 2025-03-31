# Main api server made using fast api

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from contextlib import asynccontextmanager
import secrets
import json

from mailer import sendEmail
from database import disconnect, verifyUser, updateSessionKey, getNMovies, update_user_details, get_movie_by_name

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

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    
    disconnect()

app = FastAPI(
    title="BlockMyShow",
    version="0.1",
    description="Hello, Welcome to our BlockMyShow"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/login/")
async def create_item(email: Email):
    newSessionKey = secrets.token_hex(64)
    # newUser = checkUser(email.email)
    
    addSKeyToDB = updateSessionKey(email.email, newSessionKey)
    if addSKeyToDB == False:
        raise HTTPException(status_code=500, detail="Error updating session key")
    
    sendMail = sendEmail(email.email, newSessionKey)
    if sendMail == False:
        raise HTTPException(status_code=500, detail="Error sending email")
    raise HTTPException(status_code=200, detail="Email sent sucuessfully")

@app.post("/auth/")
async def create_item(authData: Auth):
    authStatus = verifyUser(authData.email, authData.sessionKey)
    if authStatus == 404:
        raise HTTPException(status_code=404, detail="User not found")
    elif authStatus == 401:
        raise HTTPException(status_code=401, detail="Unauthorized")
    elif authStatus == 201:
        raise HTTPException(status_code=201, detail="User data incomplete")
    else:
        raise HTTPException(status_code=200, detail="User authenticated")

@app.post("/updateUserDetails/")
async def updateUserDetails(userData: User):
    verifyUserDetails = update_user_details(userData.email, userData.sessionKey, userData.firstName, userData.lastName, userData.mobileNumber)
    if verifyUserDetails == 404:
        raise HTTPException(status_code=404, detail="User not found")
    elif verifyUserDetails == 401:
        raise HTTPException(status_code=401, detail="Unauthorized")
    elif verifyUserDetails == 200:
        raise HTTPException(status_code=200, detail="User details updated successfully")
    else:
        raise HTTPException(status_code=500, detail="Error updating user details")
        
    

@app.get("/movieAiringNow/{numberOfMovies}")
async def getMoviesAiringNow(numberOfMovies: int):
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


@app.post("/movieByName/")
async def getMovieByName(movieData: MovieData):
    movie = get_movie_by_name(movieData.movieName)
    if movie == 404:
        raise HTTPException(status_code=404, detail="Movie not found")
    elif movie == 500:
        raise HTTPException(status_code=500, detail="Error getting movie")
    else:
        return movie
