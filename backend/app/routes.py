from bson import ObjectId
from fastapi import APIRouter, Body, HTTPException, Request, status, WebSocket
from fastapi.encoders import jsonable_encoder
from typing import List
from app.models import Player, Lobby, CreateLobbyRequest, CreateLobbyResponse, JoinLobbyRequest, JoinLobbyResponse

import random
import string

router = APIRouter()

lobbies: dict[str, dict[str, WebSocket]] = {}

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

    player = {
        "_id": ObjectId(),
        "name": body.playerName
    }

    lobby_database.update_one({"code": code}, {"$push": { "players": player } })

    return { "playerId": str(player["_id"]), "lobbyId": str(lobby["_id"]) }

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        event = await websocket.receive_json()
        event_type = event["type"]
        event_data = event["data"]
        match event_type:
            case "PLAYER_JOIN":
                lobby_id = event_data["lobby"]
                player_id = event_data["player"]
                player_name = event_data["name"]

                for _, socket in lobbies[lobby_id]:
                    socket.send_json({
                        "type": "PLAYER_JOIN",
                        "data": {
                            "player": player_id,
                            "name": player_name
                        }
                    })
                
                lobbies[lobby_id][player_id] = websocket
            case "PLAYER_LEAVE":
                player_id = event_data["player"]
                

            case _:
                print(f"Received event with unhandled type: {event}")
