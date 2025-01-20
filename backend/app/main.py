import os
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import dotenv_values
from contextlib import asynccontextmanager
from app.routes import router
from app.sockets import websocket_router


config = dotenv_values(".env")
if "URI" not in config:
    raise Exception(".env is not properly configured")

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

app.include_router(router)
app.include_router(websocket_router)

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
