# DEV UP
docker-dev-up:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
.PHONY: docker-dev-up

# DEV UP
docker-dev-down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
.PHONY: docker-dev-down

# build UP
docker-build-up:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
.PHONY: docker-build-up

# build UP
docker-build-down:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v
.PHONY: docker-build-down

# PRUNE EVERYTHING
docker-clean:
	docker image prune && docker container prune && docker volume prune
.PHONY: docker-clean
