# 🚀 Wellness API

## 🤓 Developers Guide

### 🧐 .ENV

```sh
#crie um arquivo .env e preencha as variaveis abaixo
cp .env.example .env
nano .env

PORT=3333

# db connection
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=docker
DB_NAME=postgres

# jwt secrete key
JWT_SECRET=my-secret-key

# google cloud storage
# path to key.json
GOOGLE_APPLICATION_CREDENTIALS=google-cloud-key.json
# bucket name
GOOGLE_STORAGE_BUCKET=my-bucket-name
GOOGLE_STORAGE_BUCKET_FOLDER=dev
```

### 🤖 Generate hash password util

```sh
yarn pwd
```

### 🐋 Docker Compose

Execute the command below, this will raise postgres and nodejs.
Will automatically run migrations.

```sh
docker-compose up -d --build
```

To run seed in container, execute this command below,
this seed:up:all is require once time

```sh
docker exec wellness_api npm run seed:up:all
```

### 🐋 Docker postgres database

```sh
docker run \
--name postgres \
-e POSTGRES_PASSWORD=docker \
-p 5432:5432 \
-d postgres

# create database
psql# CREATE DATABASE wellness_dev;
# create user
psql# CREATE ROLE wellness WITH CREATEDB LOGIN PASSWORD wellness;
# activate uuid_generate_v4()
psql# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


# dump
pg_dump -U username -h host -p port -d dbname > dump.sql
# restore
psql -U username -d wellness_dev < dump.sql
# reassign owner
psql# REASSIGN OWNED BY usename TO wellness;
```

### 🤯 Migrations

```sh
npm run migration:status
npm run migration:up
npm run migration:down
```

### Sequelize

```sh
# sequelize reference

# create migration
yarn sequelize migration:create --name my-migration-name

# list migrations
yarn sequelize db:migrate:status

# run migrations
yarn sequelize db:migrate

# undo last migration
yarn sequelize db:migrate:undo

# undo all migrations
yarn sequelize db:migrate:undo:all
```

### 👨︎‍🔧︎ Seed

```sh
# create seed
yarn seed:create name-of-seed
# rename seed .js to .ts and tranforme in typescript module
# build seed - convert ts into js
yarn build:seed

# run specific seed
yarn seed:up 20201001143933-add-admin-user
# run all seed
yarn seed:up:all
# undo specific seed
yarn seed:down 20201001143933-add-admin-user
# undo all seed
yarn seed:down:all
```
