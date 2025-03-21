import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()

sender_email = os.getenv("SENDER_EMAIL")
password = os.getenv("EMAIL_PASSWORD")

def sendEmail(receiverEmail, sessionKey):
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiverEmail
    message["Subject"] = "Login to BlockMyShow"

    # Email body
    body = "Welcome to BlockMyShow! Click to login: http://localhost:3000/?sessionKey=" + sessionKey
    message.attach(MIMEText(body, "plain"))

    try:
        # Connect to the SMTP server
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Secure the connection
            server.login(sender_email, password)
            server.send_message(message)
            return True
    except Exception as e:
        print("Error sending email: \n", e)
        return False