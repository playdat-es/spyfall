import os

import motor.motor_asyncio
from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from contextlib import asynccontextmanager

from app.models import Player, Lobby
from app.routes import router
from app.sockets import websocket_router


load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    uri = os.environ.get("DB_URI", None)
    database = os.environ.get("DB_NAME", None)
    if uri is None or database is None:
        raise Exception(".env is not properly configured")
    app.mongodb_client = motor.motor_asyncio.AsyncIOMotorClient(uri)
    database = app.mongodb_client.get_database(database)
    await init_beanie(
        database=database,
        document_models=[
            Player,
            Lobby,
        ],
    )
    print("Connected to the MongoDB database!")
    yield
    print("Database shutdown")
    app.mongodb_client.close()


app = FastAPI(lifespan=lifespan)

app.include_router(router)
app.include_router(websocket_router)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://spyfall.playdat.es",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
