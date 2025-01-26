import time


def get_lobby_status(lobby):
    start_time = lobby["start_time"]
    duration = lobby["duration"]
    current_time = time.time()

    if start_time is None:
        return "CREATED"
    if start_time + duration <= current_time:
        return "IN_PROGRESS"
    if start_time + duration > current_time:
        return "COMPLETED"
