# Main api server made using fast api

from fastapi import FastAPI, status
from pydantic import BaseModel
from contextlib import asynccontextmanager
import secrets
from mailer import sendEmail
from database import disconnect, verifyUser, updateSessionKey, get_random_movie

class Email(BaseModel):
    email: str

class Auth(BaseModel):
    email: str
    sessionKey: str

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    
    disconnect()

app = FastAPI()


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
    
    return status.HTTP_202_ACCEPTED, "Email sent successfully"

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

@app.get("/movieAiringNow/")
async def getRandomRovie():
    return get_random_movie()