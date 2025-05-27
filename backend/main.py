from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json

from services.openai_service import ask_about_resume
from services.email_service import send_email

import os
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

load_dotenv()
origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load resume at startup
with open("resume.json") as f:
    resume_data = json.load(f)

class ChatRequest(BaseModel):
    question: str

class EmailRequest(BaseModel):
    recipient: str
    subject: str
    body: str

@app.post("/api/chat")
async def chat_endpoint(data: ChatRequest):
    try:
        answer = await ask_about_resume(data.question, resume_data)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/send-email")
def send_email_endpoint(data: EmailRequest):
    try:
        send_email(data.recipient, data.subject, data.body)
        return {"status": "Email sent"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"Hello": "World"}
    
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
