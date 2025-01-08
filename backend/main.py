from typing import Union

from fastapi import FastAPI

from pymongo import MongoClient

from dotenv import dotenv_values

from contextlib import asynccontextmanager

config = dotenv_values(".env")

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.mongodb_client = MongoClient(config["URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("Connected to the MongoDB database!")
    yield
    print("Database shutdown")
    app.mongodb_client.close()

app = FastAPI(lifespan=lifespan)
