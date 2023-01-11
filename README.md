# **ME HOUSE**

Webapp to manage your daily tasks

-- Personnal project to work on a docker based architecture with React, Node and Mongodb + experimenting with microservices

_Webapp running on docker_

- **Client** => React 18 App
- **API + Notifications** => Express servers
- **Nginx (via docker container)** as proxy
- **Docker** as orchestrator

#

# **APPLICATION CONTAINERS :**

## CLIENT

_React app client website_

**with Docker running** url : [client.localhost](client.localhost)

- PORT : **3000**
- PACKAGE MANAGER : **NPM**

**Run dev on local :**

```
npm ci
npm start
```

**On local** url : [localhost:3000](localhost:3000)

#

## API

_Node app with express server_

**with Docker running** url : [api.localhost/api](api.localhost/api)

- PORT : **3001**
- PACKAGE MANAGER : **NPM**

**Run dev on local :**

```
npm ci
npm run dev
```

**On local** url : [localhost:3001/api](localhost:3001/api)

#

## NOTIFICATIONS MS

_Microservice for handling notifications_

**with Docker running** url : [notifications.localhost](notifications.localhost)

- PORT : **3002**
- PACKAGE MANAGER : **NPM**

**Run dev on local :**

```
npm ci
npm run dev
```

**On local** url : [localhost:3002](localhost:3002)

#

## NGINX

_nginx proxy to orchestrate the above docker containers_

- PORT : **80**

#

# **RUNNING PROJECT LOCALLY WITH DOCKER :**

## INIT CONTAINERS :

**!! Require docker and docker compose !!**

```
CLIENT => cd /client && npm ci
```

```
API => cd /api && npm ci
```

```
NOTIFICATIONS => cd /notifications-service && npm ci
```

#

## RUNNING DEV ENVIRONMENT :

Starting containers :

```
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

Stopping containers :

```
docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

#

## BUILDING AND RUNNING PRODUCTION ENVIRONMENT :

Starting containers :

```
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Stopping containers :

```
docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v
```

#

## CLEANING IMAGES + CONTAINERS + VOLUMES :

```
docker image prune && docker container prune && docker volume prune
```

#

# **SIMPLIFIED PROCESS WITH MAKEFILE**

**!! Requires make !!**

Makefile available at the root of the project

#

## RUNNING DEV ENVIRONMENT :

**- Starting**

```
make docker-dev-up
```

**- Stopping**

```
make docker-dev-down
```

#

## BUILDING AND RUNNING PRODUCTION ENVIRONMENT :

**- Starting**

```
make docker-build-up
```

**- Stopping**

```
make docker-build-down
```

#

## CLEANING IMAGES + CONTAINERS + VOLUMES :

```
make docker-clean
```
