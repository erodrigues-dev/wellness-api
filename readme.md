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
```

### 🤖 Generate hash password util

```sh
yarn pwd
```

### 🐋 Docker postgres database

```sh
docker run \
--name postgres \
-e POSTGRES_PASSWORD=docker
-p 5432:5432
-d postgres
```

### 🤯 Sequelize

```sh
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
