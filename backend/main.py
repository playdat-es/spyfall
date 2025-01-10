import os
import sys
import uuid

from typing import Union
from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import dotenv_values
from contextlib import asynccontextmanager


config = dotenv_values("vars/.env")

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

@app.post("/lobby")
async def create_lobby(player: Player):
    lobby_id = uuid.uuid4()
    
    return lobby_id

@app.post("/lobby/{id}")
async def join_lobby():
    pass
