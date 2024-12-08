# Variables
DOCKER_COMPOSE = docker-compose
PYTHON_DIR = core
NODEJS_DIR = api
CLIENT_DIR = client
VENV = $(PYTHON_DIR)/.venv
VENV_PYTHON = $(VENV)/bin/python

# Docker Compose commands
.PHONY: build up down restart logs

build:
	$(DOCKER_COMPOSE) build

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

restart: down up

logs:
	$(DOCKER_COMPOSE) logs -f

# Python server commands
.PHONY: python-venv python-install python-lint python-run python-clean

python-venv:
	@echo "Setting up Python virtual environment..."
	rm -rf $(VENV)
	python3 -m venv $(VENV)

python-install: python-venv
	@echo "Installing Python dependencies..."
	. $(VENV)/bin/activate && pip install --upgrade pip && pip install -r $(PYTHON_DIR)/requirements.txt

python-lint:
	@echo "Linting Python code..."
	. $(VENV)/bin/activate && pip install flake8 --quiet && flake8 --config=$(PYTHON_DIR)/.flake8 $(PYTHON_DIR)

python-run:
	@echo "Running Python server locally..."
	. $(VENV)/bin/activate && python $(PYTHON_DIR)/app.py

python-clean:
	@echo "Cleaning Python environment..."
	rm -rf $(VENV)

# Node.js server commands
.PHONY: node-install node-build node-lint node-run node-clean

node-install:
	@echo "Installing Node.js dependencies for server..."
	cd $(NODEJS_DIR) && npm install

node-build:
	@echo "Building Node.js server..."
	cd $(NODEJS_DIR) && npx tsc

node-lint:
	@echo "Linting Node.js server code..."
	cd $(NODEJS_DIR) && npx eslint src

node-run:
	@echo "Running Node.js server locally..."
	cd $(NODEJS_DIR) && node dist/server.js

node-clean:
	@echo "Cleaning Node.js server dependencies..."
	rm -rf $(NODEJS_DIR)/node_modules $(NODEJS_DIR)/dist

# Client commands
.PHONY: client-install client-build client-run client-clean

client-install:
	@echo "Installing Node.js dependencies for client..."
	cd $(CLIENT_DIR) && npm install

client-build:
	@echo "Building client..."
	cd $(CLIENT_DIR) && npm run build

client-run:
	@echo "Running client locally..."
	cd $(CLIENT_DIR) && npx http-server -p 8080

client-clean:
	@echo "Cleaning client dependencies..."
	rm -rf $(CLIENT_DIR)/node_modules $(CLIENT_DIR)/dist

# Full setup
.PHONY: setup clean

setup: python-install node-install client-install
	@echo "Setup complete. Ready to build and run the application."

clean: python-clean node-clean client-clean
	@echo "Cleaned up all environments."
