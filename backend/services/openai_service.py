import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def ask_about_resume(question, resume):
    prompt = f"Here is my resume:\n{json.dumps(resume, indent=2)}\n\nQuestion:\n{question}"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant who understands resumes."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.strip()
