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

    html_body = f"""
    <html>
        <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
            <div style="text-align: center;">
                <h2>Welcome to BlockMyShow!</h2>
                <p>Click the button below to login:</p>
                <a href="https://blockmyshow.pages.dev/auth/?sessionKey={sessionKey}" 
                   style="display:inline-block; padding:10px 20px; font-size:16px; text-align:center; 
                          text-decoration:none; background-color:#007bff; color:white; 
                          border-radius:5px;">
                   Login Now
                </a>
            </div>
        </body>
    </html>
    """

    message.attach(MIMEText(html_body, "html"))

    try:
        # Connect securely to SMTP using SSL
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, password)
            server.send_message(message)
            return True
    except Exception as e:
        print("Error sending email via SSL: \n", e)
        return False