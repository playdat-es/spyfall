from bson import ObjectId, json_util
from fastapi import APIRouter, Body, HTTPException, Request, status, WebSocket
from fastapi.encoders import jsonable_encoder
from typing import List
from app.models import Player, Lobby, CreateLobbyRequest, CreateLobbyResponse, JoinLobbyRequest, JoinLobbyResponse
import uuid

from fastapi import APIRouter, HTTPException, Request, status
from models import CheckLobbyResponse, CreateLobbyResponse, Lobby

router = APIRouter()


@router.post("/lobby", tags=["lobby"], response_description="Create a new lobby", status_code=status.HTTP_201_CREATED, response_model=CreateLobbyResponse)
def create_lobby(request: Request):
    lobby = Lobby()
    # todo: handle id collision
    request.app.database["Lobby"].insert_one(lobby.model_dump(by_alias=True))
    print(f"Created a lobby with code {lobby.id}")
    return CreateLobbyResponse(lobbyId=lobby.id, playerId=lobby.creator)


@router.post("/lobby/{lobby_id}", tags=["lobby"], response_description="Check if lobby exists", status_code=status.HTTP_200_OK, response_model=CheckLobbyResponse)
def check_lobby(lobby_id: str, request: Request):
    database = request.app.database["Lobby"]
    if (database.find_one({"_id": lobby_id})) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Lobby with code {lobby_id} not found")

    return CheckLobbyResponse(lobbyId=lobby_id, playerId=uuid.uuid4().hex)
