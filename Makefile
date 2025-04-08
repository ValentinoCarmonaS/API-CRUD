# Makefile

DOCKER_COMPOSE = docker-compose
NPM = npm

.PHONY: help build up down test format

build: ## Builds the Docker image.
	$(DOCKER_COMPOSE) build

up: ## Starts the containers.
	$(DOCKER_COMPOSE) up -d

down: ## Stops and removes the containers.
	$(DOCKER_COMPOSE) down

test: ## Runs the tests.
	$(DOCKER_COMPOSE) run --rm api npm test

format: ## Formats the code using Prettier.
	$(NPM) run format
