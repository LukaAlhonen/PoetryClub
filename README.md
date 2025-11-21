# PoetryClub

## a social media web app for poetry

<details>

<summary>About</summary>

### Why?

The point with this project was at first to simply refresh my knowledge on ts and graphql but quickly spiraled into a whole large thing. 

I ended up learning a whole lot more not just about typescript and graphql but also software development process itself, which is pretty cool I guess.

### How it works

This project is not very different from most social media sites. Users can sign up, post poems, view other peoples poems, like, save and comment on them and even follow other users.

The app is composed of a typescript graphql server with a postgresql database and a redis cache. The frontend uses typescript and react with apollo client to fetch data from the server. The frontend also uses an nginx reverse proxy to serve the static files and communicate with the backend.

I also implemented a "pretty much" full CI pipeline with github actions to test and build the code + build and publish the server and client containers to ghcr.

</details>

<details>
  <summary>Run the app</summary>
If you whish to try out this app you need to have git and docker installed.

Then just pull the repo, add a .env file (or modify the compose.yaml file) and add the following env vars:

```
POSTGRES_DB
POSTGRES_PASSWORD
POSTGRES_USER
REDIS_PASSWORD
```

Then start the postgres and redis with:
```bash
docker compose up
```

The server can be started with this command:
```bash
docker run \
--network=host \
-e DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<db_address>:5432/<POSTGRES_DB>?schema=public"\
-e REDIS_URL="redis://default:<REDIS_PASSWORD>@<redis_address>:6379" \
-e JWT_SECRET="JWT_SECRET" \
-e APOLLO_SERVER_PORT=4000 \
ghcr.io/lukaalhonen/poetryclub-server:latest
```

And the client:
```bash
docker run \
--network=host \
-e GRAPHQL_URL="http://<server_address>:4000/graphql" \
ghcr.io/lukaalhonen/poetryclub-client:latest
```
</details>
