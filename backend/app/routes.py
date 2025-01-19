from bson import ObjectId, json_util
from fastapi import APIRouter, Body, HTTPException, Request, status, WebSocket
from fastapi.encoders import jsonable_encoder
from typing import List
from app.models import Player, Lobby, CreateLobbyRequest, CreateLobbyResponse, JoinLobbyRequest, JoinLobbyResponse

import random
import string

router = APIRouter()

lobby_to_sockets = {}

@router.post("/lobby", tags=["lobby"], response_description="Create a new lobby", status_code=status.HTTP_201_CREATED, response_model=CreateLobbyResponse)
def create_lobby(request: Request, body: CreateLobbyRequest = Body(...)):
    player_id =  ObjectId()
    code = random.choice(string.ascii_uppercase) + str(random.randint(0, 9)) + random.choice(string.ascii_uppercase) + str(random.randint(0, 9))
    lobby = {
        "code": code,
        "creator": player_id,
        "players": []
    }

    new_lobby = request.app.database["Lobby"].insert_one(lobby)
    lobby_to_sockets[code] = []
    print(f"Created a lobby with code {code}")
    return { "lobbyId": str(new_lobby.inserted_id), "lobbyCode": code, "playerId": str(player_id) }

@router.post("/lobby/{code}", tags=["lobby"], response_description="Join a lobby", status_code=status.HTTP_200_OK, response_model=JoinLobbyResponse)
def join_lobby(code: str, request: Request, body: JoinLobbyRequest = Body(...)):
    lobby_database = request.app.database["Lobby"]
    if (lobby := lobby_database.find_one({"code": code})) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Lobby with code {code} not found")

    player_id =  ObjectId()
    return { "playerId": str(player_id), "lobbyId": str(lobby["_id"]) }

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        event = await websocket.receive_json()
        event_type = event["type"]
        event_data = event["data"]
        match event_type:
            case "PLAYER_JOIN":
                lobby_code = event_data["lobbyCode"]
                player_id = event_data["playerId"]
                player_name = event_data["playerName"]

                lobby_database = websocket.app.database["Lobby"]
                if (lobby := lobby_database.find_one({"code": lobby_code})) is None:
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Lobby with code {lobby_code} not found")
                
                player = {
                    "_id": ObjectId(player_id),
                    "name": player_name
                }
                lobby_database.update_one({"code": lobby_code}, {"$push": { "players": player } })

                for socket in lobby_to_sockets[lobby_code]:
                    print("sending player join event " + player_name)
                    await socket.send_json({
                        "type": "PLAYER_JOIN",
                        "data": {
                            "playerId": player_id,
                            "playerName": player_name
                        }
                    })
                lobby_to_sockets[lobby_code].append(websocket)
                lobby = lobby_database.find_one({"code": lobby_code})
                print(lobby['players'])
                await websocket.send_json({
                    "type": "LOBBY_STATE",
                    "data": {
                        "players": [{"id": str(player["_id"]), "name": player["name"]} for player in lobby['players']],
                        "creator": str(lobby['creator'])
                    }
                })
                
            case "PLAYER_LEAVE":
                player_id = event_data["player"]

            case _:
                print(f"Received event with unhandled type: {event}")
