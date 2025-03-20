from fastapi import FastAPI
from pydantic import BaseModel
from database import get_database

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


app = FastAPI()


@app.post("/items/")
async def create_item(item: Item):
    return item

@app.get("/")
async def root():
    db = get_database()
    collection=db.get_collection('user')
    data=collection.find_one({'data':1})
    id=data["_id"]
    d=data["data"]
    return {"message": "Hello BlockMyShow Users","Database":d}