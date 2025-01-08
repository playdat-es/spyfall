from typing import Union

from fastapi import FastAPI

from pymongo import MongoClient

from dotenv import dotenv_values

from contextlib import asynccontextmanager

import os

import sys

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
    if sys.prefix != sys.base_prefix:
        uri = config["URI"]
        database = config["DB_NAME"]
        print("Inside a virtual environment")
    else:
        os.environ["URI"]
        os.environ["DB_NAME"]
        print("Not in a virtual environment")
    app.mongodb_client = MongoClient(uri)
    app.database = app.mongodb_client[database]
    print("Connected to the MongoDB database!")
    yield
    print("Database shutdown")
    app.mongodb_client.close()

app = FastAPI(lifespan=lifespan)
