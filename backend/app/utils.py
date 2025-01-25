import re

def sanitize_name(name):
    sanitized_name = re.sub(r'[^A-Za-zÀ-ÿ]+', '', name).strip()
    return sanitized_name[:16] if len(sanitized_name) > 16 else sanitized_name
