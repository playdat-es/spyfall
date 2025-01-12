from bson import ObjectId
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List

class Player(BaseModel):
    _id: ObjectId
    name: str
    role: str

class Lobby(BaseModel):
    code: str = Field(...)
    creator: Player = Field(...)
    players: List[Player] = Field(...)
    location: Optional[str] = Field(...)
    start_time: Optional[int] = Field(...)
    duration: int = Field(default=480) # seconds
    model_config = ConfigDict(
        populate_by_name=True
    )

class CreateLobbyResponse(BaseModel):
    id: str = Field(...)
    code: str = Field(...)

class JoinLobbyResponse(BaseModel):
    playerId: str = Field(...)
    lobbyId: str = Field(...)