# Main api server made using fast api

from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
import secrets
from mailer import sendEmail
import json
from database import disconnect, verifyUser, updateSessionKey, get_random_movie, update_user_details, get_movie_by_name
class Email(BaseModel):
    email: str

class Auth(BaseModel):
    email: str
    sessionKey: str

class User(BaseModel):
    email: str
    sessionKey: str
    firstName: str
    lastName: str
    mobileNumber: str

class MovieData(BaseModel):
    movieName: str

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
        return status.HTTP_500_INTERNAL_SERVER_ERROR, "Error updating session key"
    
    sendMail = sendEmail(email.email, newSessionKey)
    if sendMail == False:
        return status.HTTP_500_INTERNAL_SERVER_ERROR, "Error sending email"
    raise HTTPException(status_code=200, detail="Email sent sucuessfully")

@app.post("/auth/")
async def create_item(authData: Auth):
    authStatus = verifyUser(authData.email, authData.sessionKey)
    if authStatus == 404:
        return status.HTTP_404_NOT_FOUND, "User not found"
    elif authStatus == 401:
        return status.HTTP_401_UNAUTHORIZED, "Unauthorized"
    elif authStatus == 201:
        return status.HTTP_201_CREATED, "User data incomplete"
    else:
        return status.HTTP_200_OK, "User authenticated"

@app.post("/updateUserDetails/")
async def updateUserDetails(userData: User):
    verifyUserDetails = update_user_details(userData.email, userData.sessionKey, userData.firstName, userData.lastName, userData.mobileNumber)
    if verifyUserDetails == 404:
        return status.HTTP_404_NOT_FOUND, "User not found"
    elif verifyUserDetails == 401:
        return status.HTTP_401_UNAUTHORIZED, "Unauthorized"
    elif verifyUserDetails == 200:
        return status.HTTP_200_OK, "User details updated successfully"
    else:
        return status.HTTP_500_INTERNAL_SERVER_ERROR, "Error updating user details"
        
    

@app.get("/movieAiringNow/")
async def getRandomMovie():
    return get_random_movie()

@app.post("/movieByName/")
async def getMovieByName(movieData: MovieData):
    movie = get_movie_by_name(movieData.movieName)
    # print(movie)
    # print(json.dumps(movie))
    if movie == 404:
        return status.HTTP_404_NOT_FOUND, "Movie not found"
    elif movie == 500:
        return status.HTTP_500_INTERNAL_SERVER_ERROR, "Error getting movie"
    else:
        return movie
