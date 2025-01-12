from bson import ObjectId
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List

class Player(BaseModel):
    _id: ObjectId
    name: str
    role: str = None

class Lobby(BaseModel):
    _id: ObjectId
    code: str
    creator: Player
    players: List[Player]
    location: Optional[str] = None
    start_time: Optional[int] = None
    duration: int = 480 # seconds

class CreateLobbyRequest(BaseModel):
    playerName: str

class CreateLobbyResponse(BaseModel):
    lobbyId: str
    lobbyCode: str
    playerId: str

class JoinLobbyRequest(BaseModel):
    playerName: str

class JoinLobbyResponse(BaseModel):
    playerId: str
    lobbyId: str

class PlayerJoinEvent(BaseModel):
    uuid: uuid.UUID
    name: str

class PlayerLeaveEvent(BaseModel):
    uuid: uuid.UUID
