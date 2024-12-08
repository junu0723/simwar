# Docker Compose Commands
.PHONY: build up down restart logs

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose down && docker-compose up -d

logs:
	docker-compose logs -f

# Individual Service Commands
.PHONY: build-python build-nodejs
build-python:
	docker-compose build python-server

build-nodejs:
	docker-compose build nodejs-server