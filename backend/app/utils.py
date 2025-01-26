def sanitize_name(name):
    name = name.strip()
    return name[:16] if len(name) > 16 else name
