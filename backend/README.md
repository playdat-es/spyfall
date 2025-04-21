## Development Setup
### Requirements:
- uv ([installation instructions](https://docs.astral.sh/uv/getting-started/installation/))
- set up mongodb with a `Spyfall` database and a `Lobby` collection
- make a copy of `.env.template`, rename it to `.env`, and fill out `URI` and `DB_NAME`

### Run dev server:
```
uv run fastapi dev
```

### Deployment ([fly.io](https://fly.io/)):

- set `URI` and `DB_NAME` secrets

```
fly deploy
```
