from fastapi import APIRouter, Body, Request, status
from fastapi.encoders import jsonable_encoder
from typing import List
from models import Lobby, CreateLobbyResponse

import random
import string

router = APIRouter()

@router.post("/lobby", tags=["lobby"], response_description="Create a new lobby", status_code=status.HTTP_201_CREATED, response_model=CreateLobbyResponse)
def create_lobby(request: Request, lobby: Lobby = Body(...)):
    json_lobby = jsonable_encoder(lobby)
    code = random.choice(string.ascii_uppercase) + str(random.randint(0, 9)) + random.choice(string.ascii_uppercase) + str(random.randint(0, 9))
    json_lobby["code"] = code

    new_lobby = request.app.database["Lobby"].insert_one(json_lobby)

    return { "id": str(new_lobby.inserted_id), "code": code }
