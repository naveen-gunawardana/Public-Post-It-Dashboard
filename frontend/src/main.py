from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials, firestore
from pydantic import BaseModel
import uvicorn

# Initialize Firebase
cred = credentials.Certificate("firebase-admin-sdk.json")  # Your Firebase Admin SDK JSON
firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()

# Pydantic model for request body
class PostIt(BaseModel):
    id: str
    text: str
    x: int
    y: int

@app.get("/postits")
def get_postits():
    docs = db.collection("postits").stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]

@app.post("/postits")
def add_postit(postit: PostIt):
    db.collection("postits").document(postit.id).set(postit.dict())
    return {"message": "Post-it added"}

@app.patch("/postits/{postit_id}")
def update_postit(postit_id: str, postit: PostIt):
    db.collection("postits").document(postit_id).update(postit.dict())
    return {"message": "Post-it updated"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
