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

# INIT FOR DEPLOYMENT WITH SSL CERTIFICATE CREATION
docker-init:
	@echo 'initiate ssl + certbot'
	docker compose -f docker-compose.init.yml up -d nginx
	docker compose -f docker-compose.init.yml up certbot
	docker compose -f docker-compose.init.yml down

	@echo 'container built => configure lets encrypt'
	curl -L --create-dirs -o /etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
	openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
	@echo 'config lets encrypt done setup crontab'
	crontab ./crontab

	@echo 'make docker deploy'
	make docker-deploy
.PHONY: docker-init

# DEPLOY
docker-deploy:
	@echo 'building docker'
	docker compose -f docker-compose.yml -f docker-compose.deploy.yml up -d --build
	@echo 'docker built and running'
.PHONY: docker-deploy

# DOWN PROD
docker-deploy-down:
	docker compose -f docker-compose.yml -f docker-compose.deploy.yml down -v
.PHONY: docker-deploy-down