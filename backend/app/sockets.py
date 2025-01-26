import time

from fastapi import APIRouter, WebSocket
from starlette.websockets import WebSocketDisconnect

from app.models import Player


class PlayerMetadata:
    def __init__(self, lobby_id: str, player_id: str):
        self.lobby_id = lobby_id
        self.player_id = player_id


class ConnectionManager:
    def __init__(self):
        self.lobby_to_connections: dict[str, list[WebSocket]] = {}
        self.connection_to_metadata: dict[WebSocket, PlayerMetadata] = {}

    async def connect(self, connection: WebSocket):
        await connection.accept()

    async def send_event(
        self, connection: WebSocket, event_type: str, data: dict[str, any]
    ):
        await connection.send_json({"type": event_type, "data": data})

    async def broadcast_event(
        self, lobby_id: str, event_type: str, data: dict[str, any]
    ):
        for connection in self.lobby_to_connections[lobby_id]:
            await self.send_event(connection, event_type, data)

    async def handle_player_join(
        self, connection: WebSocket, lobby_id: str, player_id: str, player_name: str
    ):
        database = connection.app.database["Lobby"]

        # todo: lobby id does not exist
        if (lobby := database.find_one({"_id": lobby_id})) is None:
            print(f"Lobby with code {lobby_id} not found")
            return

        dedupe_num = 0
        for player in lobby["players"]:
            if player["name"] == player_name:
                dedupe_num = max(player["dedupe"] + 1, dedupe_num)

        player = Player(id=player_id, name=player_name, dedupe=dedupe_num).model_dump(
            by_alias=True
        )
        database.update_one({"_id": lobby_id}, {"$push": {"players": player}})

        if lobby_id not in self.lobby_to_connections:
            self.lobby_to_connections[lobby_id] = []

        await self.broadcast_event(
            lobby_id,
            "PLAYER_JOIN",
            {"playerId": player_id, "playerName": player_name, "dedupe": dedupe_num},
        )

        self.lobby_to_connections[lobby_id].append(connection)
        self.connection_to_metadata[connection] = PlayerMetadata(lobby_id, player_id)

        lobby = database.find_one({"_id": lobby_id})
        await self.send_event(
            connection,
            "LOBBY_STATE",
            {"lobby": lobby},
        )

    async def handle_player_leave(self, connection: WebSocket):
        metadata = self.connection_to_metadata.pop(connection)
        self.lobby_to_connections[metadata.lobby_id].remove(connection)

        database = connection.app.database["Lobby"]
        database.update_one(
            {"_id": metadata.lobby_id},
            {"$pull": {"players": {"id": metadata.player_id}}},
        )

        await self.broadcast_event(
            metadata.lobby_id,
            "PLAYER_LEAVE",
            {
                "playerId": metadata.player_id,
            },
        )

    async def handle_player_rename(self, connection: WebSocket, player_name: str):
        database = connection.app.database["Lobby"]
        metadata = self.connection_to_metadata.get(connection)
        player_id = metadata.player_id
        lobby_id = metadata.lobby_id

        lobby = database.find_one({"_id": lobby_id})

        player_by_id = next(
            (player for player in lobby["players"] if player["id"] == player_id), None
        )

        if player_by_id["name"] != player_name:
            dedupe_num = 0
            for player in lobby["players"]:
                if player["name"] == player_name:
                    dedupe_num = max(player["dedupe"] + 1, dedupe_num)

            database.update_one(
                {"_id": lobby_id, "players.id": player_id},
                {
                    "$set": {
                        "players.$.name": player_name,
                        "players.$.dedupe": dedupe_num,
                    }
                },
            )

            await self.broadcast_event(
                lobby_id,
                "PLAYER_RENAME",
                {
                    "playerId": player_id,
                    "playerName": player_name,
                    "dedupe": dedupe_num,
                },
            )

    async def handle_start_game(self, connection: WebSocket):
        database = connection.app.database["Lobby"]
        metadata = self.connection_to_metadata.get(connection)
        lobby_id = metadata.lobby_id
        database.update_one(
            {"_id": lobby_id},
            {
                "$set": {
                    "start_time": time.time(),
                    "location": "sample location",
                    "players.$[].role": "sample role",
                }
            },
        )
        lobby = database.find_one({"_id": lobby_id})
        await self.broadcast_event(
            lobby_id,
            "LOBBY_STATE",
            {"lobby": lobby},
        )


websocket_router = APIRouter()
manager = ConnectionManager()


@websocket_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            event = await websocket.receive_json()
            event_type = event["type"]
            event_data = event["data"]

            match event_type:
                case "PLAYER_JOIN":
                    await manager.handle_player_join(
                        websocket,
                        event_data["lobbyId"],
                        event_data["playerId"],
                        event_data["playerName"],
                    )
                case "PLAYER_RENAME":
                    await manager.handle_player_rename(
                        websocket,
                        event_data["playerName"],
                    )
                case "START_GAME":
                    await manager.handle_start_game(websocket)
                case _:
                    print(f"Received event with unhandled type: {event}")

    except WebSocketDisconnect:
        await manager.handle_player_leave(websocket)
