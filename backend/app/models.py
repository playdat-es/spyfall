import random
import string
import uuid

from pydantic import BaseModel, Field
from typing import Optional, List


class Player(BaseModel):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex)
    name: str
    role: Optional[str] = None
    dedupe: Optional[int] = 0


class Lobby(BaseModel):
    @staticmethod
    def generate_id() -> str:
        characters = string.ascii_letters + string.digits
        return "".join(random.choice(characters) for _ in range(4)).upper()

    id: str = Field(alias="_id", default_factory=generate_id)
    creator: str = Field(default_factory=lambda: uuid.uuid4().hex)
    players: List[Player] = Field(default_factory=list)
    location: Optional[str] = None
    start_time: Optional[int] = None
    duration: int = Field(default=480)  # seconds


class CreateLobbyRequest(BaseModel):
    playerName: str


class CheckLobbyRequest(BaseModel):
    playerName: str


class CreateLobbyResponse(BaseModel):
    lobbyId: str
    playerId: str
    playerName: str


class CheckLobbyResponse(BaseModel):
    playerId: str
    lobbyId: str
    playerName: str
