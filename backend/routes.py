from bson import ObjectId
from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from typing import List
from models import Player, Lobby, CreateLobbyRequest, CreateLobbyResponse, JoinLobbyRequest, JoinLobbyResponse

import random
import string

router = APIRouter()

@router.post("/lobby", tags=["lobby"], response_description="Create a new lobby", status_code=status.HTTP_201_CREATED, response_model=CreateLobbyResponse)
def create_lobby(request: Request, body: CreateLobbyRequest = Body(...)):
    player = {
        "_id": ObjectId(),
        "name": body.playerName
    }
    code = random.choice(string.ascii_uppercase) + str(random.randint(0, 9)) + random.choice(string.ascii_uppercase) + str(random.randint(0, 9))
    lobby = {
        "code": code,
        "creator": player,
        "players": [player]
    }

    new_lobby = request.app.database["Lobby"].insert_one(lobby)
    print(f"Created a lobby with code {code}")
    return { "lobbyId": str(new_lobby.inserted_id), "lobbyCode": code, "playerId": str(player["_id"]) }

@router.post("/lobby/{code}", tags=["lobby"], response_description="Join a lobby", status_code=status.HTTP_200_OK, response_model=JoinLobbyResponse)
def join_lobby(code: str, request: Request, body: JoinLobbyRequest = Body(...)):
    lobby_database = request.app.database["Lobby"]
    if (lobby := lobby_database.find_one({"code": code})) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Lobby with code {code} not found")

    player = Player(_id=ObjectId(), name=body.playerName)
    player_dict = player.model_dump()

    lobby_database.update_one({"code": code}, {"$push": { "players": player_dict } })

    return { "playerId": str(player_dict["_id"]), "lobbyId": str(lobby["_id"]) }
