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

Run Windows dev server:
```
uvicorn main:app --reload
```

Install dependencies:
`pipenv install` or `pipenv install --dev`

If virtual env is active: `pipenv sync` or `pipenv sync --dev`
