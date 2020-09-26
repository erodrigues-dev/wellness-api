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

### 🐋 Docker postgres database

```sh
docker run \
--name postgres \
-e POSTGRES_PASSWORD=docker \
-p 5432:5432 \
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

### 👨︎‍🔧︎ Insert Admin User

```sql
-- profile
INSERT INTO public.profiles (name,description,created_at,updated_at) VALUES
('admin','administrator profile','2020-08-03 20:45:03.174','2020-08-03 20:45:03.174')
;

-- functionalities
INSERT INTO public.functionalities ("name",actions,profile_id,created_at,updated_at) VALUES
('customers',7,1,'2020-09-23 12:57:27.559','2020-09-23 12:57:27.559')
,('employees',7,1,'2020-09-23 12:57:27.559','2020-09-23 12:57:27.559')
,('profiles',7,1,'2020-09-23 12:57:27.560','2020-09-23 12:57:27.560')
,('activities',7,1,'2020-09-23 12:57:27.560','2020-09-23 12:57:27.560')
,('schedules',7,1,'2020-09-23 12:57:27.560','2020-09-23 12:57:27.560')
,('packages',7,1,'2020-09-23 12:57:27.559','2020-09-23 12:57:27.559')
;

-- senha 12345678
INSERT INTO public.employees ("name",email,"password",created_at,updated_at,profile_id,specialty,image_url) VALUES
('Admin','admin@wellness.com','$2b$08$Of4U.C.tPvLvEgQ3XiDBvuqsF1JYZJRgQPD60ycM1bEN9qT6aMumK','2020-08-03 20:52:31.028','2020-08-03 20:52:31.028',1,'Admin',NULL)
;

```
