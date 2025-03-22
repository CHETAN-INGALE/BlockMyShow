# Main api server made using fast api

from fastapi import FastAPI, status
from pydantic import BaseModel
from contextlib import asynccontextmanager
import secrets
from dbresponder import checkUser, updateSessionKey
from mailer import sendEmail
from database import connect,disconnect

class Email(BaseModel):
    email: str

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    
    disconnect()

app = FastAPI()


@app.post("/login/",  status_code=status.HTTP_202_ACCEPTED)
async def create_item(email: Email):
    newSessionKey = secrets.token_hex(64)
    # newUser = checkUser(email.email)
    
    sendMail = sendEmail(email.email, newSessionKey)
    if sendMail == False:
        return status.HTTP_500_INTERNAL_SERVER_ERROR, "Error sending email"
    
    addSKeyToDB = updateSessionKey(email.email, newSessionKey)
    if addSKeyToDB == False:
        return status.HTTP_500_INTERNAL_SERVER_ERROR, "Error updating session key"
    
    return status.HTTP_202_ACCEPTED, "Email sent successfully"