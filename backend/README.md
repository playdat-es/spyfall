Create a virtual environment:
```
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install "fastapi[standard]"
```

Run dev server:
```
fastapi dev main.py
```
