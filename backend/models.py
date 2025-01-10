from pydantic import BaseModel

import uuid


PyObjectId = Annotated[str, BeforeValidator(str)]

class LobbyModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    code: str = Field(...)
    creator: Player = Field(...)
    players: List[Player] = Field(...)
    location: Optional[str] = Field(..., default=None)
    start_time: Optional[int] = Field(..., default=None)
    duration: int = Field(..., default=480) # seconds
    model_config = ConfigDict(
        populate_by_name=True
    )

class Player(BaseModel):
    uuid: uuid.UUID
    name: str
    role: str

class CreateLobbyModel(BaseModel):
